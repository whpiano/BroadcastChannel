import type { AstroEnvContext, NavItem } from '../types'

/**
 * Reads an env variable from Vite's import.meta.env first, then falls back to
 * the Cloudflare/runtime env bindings exposed via Astro.locals.runtime.env.
 */
export function getEnv(
  env: Record<string, string | undefined>,
  Astro: AstroEnvContext,
  name: string,
): string | undefined {
  return env[name] ?? Astro.locals?.runtime?.env?.[name]
}

export function getStaticProxy(
  env: Record<string, string | undefined>,
  Astro: AstroEnvContext,
): string {
  return getEnv(env, Astro, 'STATIC_PROXY') ?? '/static/'
}

export function getPodcastUrl(
  env: Record<string, string | undefined>,
  Astro: AstroEnvContext,
): string | undefined {
  return getEnv(env, Astro, 'PODCAST')
}

export function isEnabled(value: string | boolean | undefined): boolean {
  return value === true || value === 'true' || value === '1'
}

export function getBooleanEnv(
  env: Record<string, string | undefined>,
  Astro: AstroEnvContext,
  name: string,
): boolean | undefined {
  const value = getEnv(env, Astro, name)
  return value === undefined ? undefined : isEnabled(value)
}

export function parseDelimitedItems(value = ''): NavItem[] {
  return value
    .split(';')
    .map(item => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [title = '', href = ''] = item.split(',').map(part => part.trim())
      return { title, href }
    })
    .filter(item => item.title.length > 0 && item.href.length > 0)
}

export function parseCsvList(value = ''): string[] {
  return value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
}
