export interface SiteConfig {
  name: string
  tagline: string
  description: string
  owner: {
    name: string
    title: string
    email: string
    linkedin: string
    profileImage: string
  }
  url: string
}

export interface ProjectHighlight {
  title: string
  description: string
}

export interface ProjectStat {
  value: string
  label: string
}

export interface ProjectScreenshot {
  /** Image path under public/. Omit or set placeholder for backfill later. */
  src?: string
  alt: string
  caption: string
  placeholder?: boolean
}

export interface ProjectScreenshotGroup {
  title: string
  description?: string
  shots: ProjectScreenshot[]
}

export interface ProjectCapability {
  icon: string
  title: string
  summary: string
  details: string[]
}

export interface ProjectPlatformSection {
  headline: string
  paragraphs: string[]
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  summary: string
  description: string
  url?: string
  year: string
  status: 'live' | 'in-progress' | 'archived'
  tags: string[]
  featured: boolean
  highlights: ProjectHighlight[]
  stack: string[]
  accent: 'indigo' | 'slate' | 'warm'
  /** Rich case study content — optional for simpler projects */
  stats?: ProjectStat[]
  capabilities?: ProjectCapability[]
  screenshotGroups?: ProjectScreenshotGroup[]
  platform?: ProjectPlatformSection
  accessControl?: ProjectPlatformSection
  vision?: ProjectPlatformSection
  contactCta?: {
    headline: string
    body: string
  }
}

export interface Post {
  slug: string
  title: string
  summary: string
  publishedAt: string
  tags: string[]
  body?: string
}
