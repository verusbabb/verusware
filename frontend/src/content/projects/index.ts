import type { Project } from '../types'
import { kansasBeta } from './kansas-beta'

/** All projects — add new entries here or split into separate files */
export const projects: Project[] = [kansasBeta]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
