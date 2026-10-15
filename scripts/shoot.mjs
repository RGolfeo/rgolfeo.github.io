// Captures every page at desktop and phone sizes for visual review.
// Used by .github/workflows/preview.yml. Writes PNGs + console log to shots/.
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = process.env.BASE || 'http://localhost:4173'
const ROUTES = (process.env.ROUTES || '/,/projects,/services,/showcase,/testimonials,/about,/contact,/privacy,/terms,/thank-you,/missing-page').split(',')
mkdirSync('shots', { recursive: true })
const log = []

const VIEWS = [
  { tag: 'desk', viewport: { width: 1440, height: 900 }, scheme: 'light' },
  { tag: 'desk-dark', viewport: { width: 1440, height: 900 }, scheme: 'dark' },
  { tag: 'lap', viewport: { width: 1280, height: 720 }, scheme: 'light' },
  { tag: 'phone', viewport: { width: 390, height: 844 }, scheme: 'light', mobile: true },
  { tag: 'phone-dark', viewport: { width: 390, height: 844 }, scheme: 'dark', mobile: true },
]

const browser = await chromium.launch()
for (const v of VIEWS) {
  const ctx = await browser.newContext({
    viewport: v.viewport,
    deviceScaleFactor: v.mobile ? 2 : 1,
    isMobile: !!v.mobile,
    hasTouch: !!v.mobile,
    colorScheme: v.scheme,
    reducedMotion: 'reduce',
  })
  for (const r of ROUTES) {
    const page = await ctx.newPage()
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') log.push(`[${v.tag} ${r}] ${m.type()}: ${m.text()}`) })
    page.on('pageerror', (e) => log.push(`[${v.tag} ${r}] pageerror: ${e.message}`))
    page.on('requestfailed', (q) => log.push(`[${v.tag} ${r}] failed: ${q.url()}`))
    page.on('response', (q) => { if (q.status() >= 400) log.push(`[${v.tag} ${r}] ${q.status()}: ${q.url()}`) })
    await page.goto(BASE + r, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1200)
    const name = (r === '/' ? 'home' : r.slice(1)).replace(/\//g, '_')
    await page.screenshot({ path: `shots/${v.tag}-${name}.png` })
    // Full scroll height of the panel, for pages that scroll.
    const tall = await page.evaluate(() => {
      const p = document.getElementById('main') || document.querySelector('.shell__panel')
      return p ? p.scrollHeight > p.clientHeight + 40 : document.body.scrollHeight > innerHeight + 40
    })
    if (tall) {
      const steps = await page.evaluate(() => {
        const p = document.querySelector('.shell__panel')
        const el = p && p.scrollHeight > p.clientHeight ? p : document.scrollingElement
        return Math.min(6, Math.ceil(el.scrollHeight / el.clientHeight) - 1)
      })
      for (let i = 1; i <= steps; i++) {
        await page.evaluate((i) => {
          const p = document.querySelector('.shell__panel')
          const el = p && p.scrollHeight > p.clientHeight ? p : document.scrollingElement
          el.scrollTo(0, el.clientHeight * i * 0.9)
        }, i)
        await page.waitForTimeout(500)
        await page.screenshot({ path: `shots/${v.tag}-${name}-s${i}.png` })
      }
    }
    await page.close()
  }
  await ctx.close()
}

// One run with motion on, to see the intro hand-off and the live background.
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' })
const page = await ctx.newPage()
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
for (const t of [600, 1800, 3200, 7000]) {
  await page.waitForTimeout(t === 600 ? 600 : t - [600, 1800, 3200, 7000][[600, 1800, 3200, 7000].indexOf(t) - 1])
  await page.screenshot({ path: `shots/motion-${t}.png` })
}
await page.emulateMedia({ colorScheme: 'dark' })
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(7000)
await page.screenshot({ path: 'shots/motion-dark.png' })
await browser.close()
writeFileSync('shots/console.txt', log.join('\n') || 'no errors')
console.log(log.join('\n') || 'no errors')
