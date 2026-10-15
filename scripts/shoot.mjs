// Captures every page at desktop and phone sizes for visual review.
// Used by .github/workflows/preview.yml. Writes PNGs + console log to shots/.
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = process.env.BASE || 'http://localhost:4173'
const ROUTES = (process.env.ROUTES || '/,/projects,/services,/showcase,/track-record,/about,/contact,/privacy,/terms,/thank-you,/missing-page').split(',')
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
  // The site defaults to light and remembers the toggle in localStorage.
  if (v.scheme === 'dark') await ctx.addInitScript(() => localStorage.setItem('theme', 'dark'))
  for (const r of ROUTES) {
    const page = await ctx.newPage()
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') log.push(`[${v.tag} ${r}] ${m.type()}: ${m.text()}`) })
    page.on('pageerror', (e) => log.push(`[${v.tag} ${r}] pageerror: ${e.message}`))
    page.on('requestfailed', (q) => log.push(`[${v.tag} ${r}] failed: ${q.url()}`))
    page.on('response', (q) => { if (q.status() >= 400) log.push(`[${v.tag} ${r}] ${q.status()}: ${q.url()}`) })
    await page.goto(BASE + r, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1200)
    const name = (r === '/' ? 'home' : r.slice(1)).replace(/\//g, '_')
    await page.screenshot({ path: `shots/${v.tag}-${name}.png`, fullPage: !!v.mobile })
    // Text that is cut off with an ellipsis, or anything poking past the right edge.
    const issues = await page.evaluate(() => {
      const out = []
      for (const el of document.querySelectorAll('body *')) {
        const cs = getComputedStyle(el)
        if (cs.display === 'none' || cs.visibility === 'hidden') continue
        const r = el.getBoundingClientRect()
        if (!r.width || !r.height) continue
        const label = (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : el.tagName) + ' "' + (el.textContent || '').trim().slice(0, 40) + '"'
        if (cs.textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 1) out.push('clipped ' + label)
        const marquee = el.closest('[class*="marquee"],[class*="track"],[class*="reel"],[class*="barrel"],[class*="chip-row"],.htiles,.hsec,.boot,[aria-hidden="true"]')
        if (!marquee && r.right > innerWidth + 2 && r.left < innerWidth) out.push('overflow-x ' + label + ' right=' + Math.round(r.right))
      }
      const t = document.querySelector('.home__title')
      if (t) out.push(`headline font ${getComputedStyle(t).fontSize} width ${Math.round(t.getBoundingClientRect().width)} scroll ${t.scrollWidth} line-em ${(t.querySelector('.home__line')?.scrollWidth / parseFloat(getComputedStyle(t).fontSize)).toFixed(2)}`)
      out.push('fonts ' + [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family + ' ' + f.weight).join(', '))
      return out.slice(0, 25)
    })
    for (const i of issues) log.push(`[${v.tag} ${r}] ${i}`)
    // Full scroll height of the panel, for pages that scroll.
    const tall = await page.evaluate(() => {
      const p = document.getElementById('main') || document.querySelector('.shell__panel')
      return p ? p.scrollHeight > p.clientHeight + 40 : document.body.scrollHeight > innerHeight + 40
    })
    if (tall && !v.mobile) {
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

// Proof redraws on their own, and fresh gallery thumbnails from the built pages.
{
  const page = await browser.newPage({ viewport: { width: 1200, height: 760 } })
  for (const f of ['dashboard', 'linkedin', 'pipeline', 'sales-navigator']) {
    await page.goto(`${BASE}/proof/${f}.svg`)
    await page.screenshot({ path: `shots/proof-${f}.png` })
  }
  await page.close()
  if (process.env.THUMBS) {
    const { pathToFileURL } = await import('node:url')
    const og = await browser.newPage({ viewport: { width: 1200, height: 630 } })
    await og.goto(pathToFileURL(process.cwd() + '/scripts/og/card.html').href, { waitUntil: 'networkidle' })
    await og.evaluate(() => document.fonts.ready)
    await og.screenshot({ path: 'public/og-image.jpg', type: 'jpeg', quality: 88 })
    await og.screenshot({ path: 'shots/og-image.png' })
    await og.close()
    const { readdirSync } = await import('node:fs')
    for (const f of readdirSync('public/samples').filter((x) => x.startsWith('gallery-') && x.endsWith('.html'))) {
      const base = f.replace('.html', '')
      for (const [out, scale] of [[`public/samples/thumbs/${base}.jpeg`, 1], [`public/home/samples-${base}.jpeg`, 400 / 1080]]) {
        const p = await browser.newPage({ viewport: { width: 1080, height: 1440 }, deviceScaleFactor: scale })
        await p.goto(`${BASE}/samples/${f}`, { waitUntil: 'networkidle' })
        await p.screenshot({ path: out, type: 'jpeg', quality: 86 })
        await p.close()
      }
    }
  }
}

// A few interactions: the dialogs and switches people actually use.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  page.on('pageerror', (e) => log.push(`[interact] pageerror: ${e.message}`))
  await page.goto(BASE + '/projects', { waitUntil: 'networkidle' })
  const cards = page.locator('.bento__card')
  const n = Math.min(await cards.count(), 6)
  for (let i = 0; i < n; i++) {
    try {
      await cards.nth(i).click({ timeout: 3000 })
      await page.waitForTimeout(900)
      await page.screenshot({ path: `shots/open-project-${i}.png` })
      await page.keyboard.press('Escape')
      await page.waitForTimeout(500)
    } catch (e) { log.push(`[interact] project card ${i}: ${e.message.split('\n')[0]}`) }
  }
  await page.goto(BASE + '/track-record', { waitUntil: 'networkidle' })
  await page.locator('.tgrid__pick').nth(2).click()
  await page.waitForTimeout(600)
  await page.screenshot({ path: 'shots/open-track-pipeline.png' })
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
await page.mouse.move(900, 300)
await page.mouse.move(1000, 420, { steps: 12 })
await page.waitForTimeout(2500)
await page.screenshot({ path: 'shots/motion-lantern.png' })
await page.goto(BASE + '/services', { waitUntil: 'networkidle' })
await page.waitForTimeout(5000)
await page.screenshot({ path: 'shots/motion-services.png' })
await page.evaluate(() => localStorage.setItem('theme', 'dark'))
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.mouse.move(700, 500)
await page.mouse.move(820, 560, { steps: 10 })
await page.waitForTimeout(7000)
await page.screenshot({ path: 'shots/motion-dark.png' })
await browser.close()
writeFileSync('shots/console.txt', log.join('\n') || 'no errors')
console.log(log.join('\n') || 'no errors')
