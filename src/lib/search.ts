import type { SeoMeta } from '../types'

interface SearchContext {
  params: Record<string, string | undefined>
  url: URL
}

export function getSearchQuery(context: SearchContext): string {
  return context.url.searchParams.get('q') || context.params.q || ''
}

export function getSearchSeo(query: string): SeoMeta {
  return {
    title: query,
    noindex: true,
  }
}
