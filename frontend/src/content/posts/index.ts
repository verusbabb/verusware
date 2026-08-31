import type { Post } from '../types'

/**
 * Writing posts — add markdown-backed entries here as the site grows.
 * Future: load from API or import .md files at build time.
 */
export const posts: Post[] = []

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
