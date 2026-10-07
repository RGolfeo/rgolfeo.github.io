export type AppStat = { value: string; label: string }

export type AppProject = {
  name: string
  tagline: string
  description: string
  /** Optional - omit for gradient placeholder cards */
  imageSrc?: string
  /** CSS object-position override. Defaults to 'top center'. */
  imagePosition?: string
  /** External brand color - not a site token. Passed via --app-color inline prop. */
  accentColor: string
  stats: AppStat[]
  badge: string
}

/** @deprecated use AppProject */
export type MobileApp = AppProject

/**
 * Ryan's roles and engagements, shown as cards in the Projects "Experience"
 * window. Images live in public/placeholders/ (sanitized client screens).
 */
export const mobileApps: MobileApp[] = [
  {
    name: 'Lead Generation VA',
    tagline: 'Healthcare credentialing firm · 2026 to present',
    description: 'Research and verify qualified healthcare providers, keep outreach-ready records, run LinkedIn and email outreach, and send clear daily reports.',
    imageSrc: '/placeholders/app-1.jpg',
    accentColor: '#0A66C2',
    stats: [
      { value: '287', label: 'Leads tracked' },
      { value: '170', label: 'Outreach-ready' },
      { value: '57', label: 'High priority' },
    ],
    badge: 'Current',
  },
  {
    name: 'Growth & Outreach Specialist',
    tagline: 'Project-based · 2026 to present',
    description: 'Multichannel lead generation, appointment setting, market research, and CRM pipeline organization for small teams.',
    imageSrc: '/placeholders/app-2.jpg',
    accentColor: '#7C3AED',
    stats: [
      { value: '149', label: 'Tier A prospects' },
      { value: '78', label: 'Tier B prospects' },
      { value: '50', label: 'Requests sent' },
    ],
    badge: 'Current',
  },
  {
    name: 'Client & Financial Operations',
    tagline: 'Cognizant, TaskUs, Verizon, Sutherland · 2018 to 2025',
    description: 'Seven years of high-volume, compliance-driven client work across billing, trades, refunds, fraud prevention, and documentation.',
    imageSrc: '/placeholders/app-3.jpg',
    accentColor: '#16A34A',
    stats: [
      { value: '7+', label: 'Years' },
      { value: '4', label: 'Companies' },
      { value: 'US', label: 'Clients served' },
    ],
    badge: 'Foundation',
  },
]

export const webApps: AppProject[] = [
  {
    name: 'Cognizant',
    tagline: 'Senior Process Executive · 2024 to 2025',
    description: 'Supported stock-market and account inquiries, trade requests, statements, tax forms, transfers, and sensitive financial documentation.',
    accentColor: '#0EA5E9',
    stats: [
      { value: '1 yr', label: 'Tenure' },
      { value: 'Finance', label: 'Focus' },
      { value: 'US', label: 'Clients' },
    ],
    badge: 'Financial ops',
  },
  {
    name: 'TaskUs Phoenix',
    tagline: 'Teammate, Customer Support · 2023 to 2024',
    description: 'Handled high-volume order, refund, account, promotion, and technical concerns while documenting updates accurately.',
    accentColor: '#EF4444',
    stats: [
      { value: '1 yr', label: 'Tenure' },
      { value: 'CX', label: 'Focus' },
      { value: 'US', label: 'Clients' },
    ],
    badge: 'Customer support',
  },
  {
    name: 'GC Services / Verizon',
    tagline: 'Customer Service Ambassador · 2019 to 2023',
    description: 'Billing, payments, account security, fraud prevention, technical support, and needs-based product recommendations.',
    imageSrc: '/placeholders/project-3.jpg',
    accentColor: '#0891B2',
    stats: [
      { value: '4 yrs', label: 'Tenure' },
      { value: 'Telecom', label: 'Focus' },
      { value: 'US', label: 'Clients' },
    ],
    badge: 'Customer support',
  },
  {
    name: 'Sutherland',
    tagline: 'Customer Service Representative · 2018 to 2019',
    description: 'Billing, account-management, and technical-support inquiries in a fast-paced contact-center environment.',
    imageSrc: '/placeholders/project-4.jpg',
    accentColor: '#F59E0B',
    stats: [
      { value: '1 yr', label: 'Tenure' },
      { value: 'CX', label: 'Focus' },
      { value: 'US', label: 'Clients' },
    ],
    badge: 'Customer support',
  },
]
