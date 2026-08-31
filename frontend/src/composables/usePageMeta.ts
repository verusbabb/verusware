import { watchEffect, onUnmounted } from 'vue'
import { site } from '@/content/site'

export interface PageMetaOptions {
  title?: string
  description?: string
}

function setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function usePageMeta(options: () => PageMetaOptions) {
  const stop = watchEffect(() => {
    const { title, description } = options()
    const pageTitle = title ? `${title} · ${site.name}` : `${site.owner.name} · ${site.name}`
    document.title = pageTitle

    const desc = description ?? site.description
    setMetaTag('description', desc)
    setMetaTag('og:title', pageTitle, 'property')
    setMetaTag('og:description', desc, 'property')
    setMetaTag('og:url', site.url, 'property')
    setMetaTag('twitter:card', 'summary', 'name')
    setMetaTag('twitter:title', pageTitle, 'name')
    setMetaTag('twitter:description', desc, 'name')
  })

  onUnmounted(() => stop())
}
