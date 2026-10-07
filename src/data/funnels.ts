export type FunnelTag = 'Dashboard' | 'Pipeline' | 'Outreach' | 'Research' | 'Case study' | 'Document'

export type Funnel = {
  file: string
  label: string
  tag: FunnelTag
  desc: string
  /** Public subfolder the HTML + thumbnail live under. Default 'funnels'. */
  dir?: 'funnels' | 'samples'
}

/**
 * Ryan's work gallery: sanitized client screens and sample documents.
 *
 * Each page lives in public/samples/, its 3:4 thumbnail in public/samples/thumbs/
 * and a small copy for Home in public/home/samples-<name>.jpeg.
 */

const item = (n: string, label: string, tag: FunnelTag, desc: string): Funnel => ({
  file: `gallery-${n}.html`,
  label,
  tag,
  desc,
  dir: 'samples',
})

const dashboard = item('01', 'Lead-generation dashboard', 'Dashboard', 'A command view for pipeline health: lead stages, source mix, daily targets, and next actions.')
const pipeline = item('02', 'Master prospect pipeline', 'Pipeline', 'Research organized by record type, specialty, location, source, and the next outreach step.')
const linkedin = item('03', 'LinkedIn outreach dashboard', 'Outreach', 'Qualified leads, requests sent, priority prospects, and the next action for every record.')
const salesNav = item('04', 'Sales Navigator research', 'Research', 'Filter-driven sourcing by title, seniority, geography, and industry before outreach begins.')
const caseStudy = item('05', 'Healthcare outreach system', 'Case study', '287 tracked leads, 170 outreach-ready, and 57 high-priority opportunities for a credentialing firm.')
const sop = item('06', 'Prospect sourcing SOP', 'Document', 'The rules behind every clean, verified, duplicate-free prospect batch.')

export const gymFunnel: Funnel[] = [dashboard, pipeline]

export const bookingFunnel: Funnel[] = [linkedin, salesNav]

export const websiteFunnel: Funnel[] = [caseStudy, dashboard, pipeline, linkedin, salesNav, sop]

/**
 * Tag -> color map. Brand-external colors that identify the page type, passed
 * to CSS via an inline --tag-color custom property.
 */
export const tagColors: Record<FunnelTag, string> = {
  Dashboard: '#0A66C2',
  Pipeline: '#16A34A',
  Outreach: '#8b5cf6',
  Research: '#0891B2',
  'Case study': '#FF7A1A',
  Document: '#ec4899',
}
