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
  /** Optional hero accent for project cards (CSS gradient class key) */
  accent: 'indigo' | 'slate' | 'warm'
}

export interface Post {
  slug: string
  title: string
  summary: string
  publishedAt: string
  tags: string[]
  /** Markdown body — populated when posts are added */
  body?: string
}
