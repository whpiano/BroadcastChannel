import type { EnvCapableAstro, NavItem } from '../types'

/**
 * Reads an env variable from Vite's import.meta.env first, then falls back to
 * the Cloudflare/runtime env bindings exposed via Astro.locals.runtime.env.
 */
export function getEnv(
  env: Record<string, string | undefined>,
  Astro: EnvCapableAstro,
  name: string,
): string | undefined {
  return env[name] ?? Astro.locals?.runtime?.env?.[name]
}

export function getEnvFallback(
  env: Record<string, string | undefined>,
  Astro: EnvCapableAstro,
  names: string[],
): string | undefined {
  for (const name of names) {
    const value = getEnv(env, Astro, name)
    if (value !== undefined) {
      return value
    }
  }
}

export function getStaticProxy(
  env: Record<string, string | undefined>,
  Astro: EnvCapableAstro,
): string {
  return getEnv(env, Astro, 'STATIC_PROXY') ?? '/static/'
}

export function getPodcastUrl(
  env: Record<string, string | undefined>,
  Astro: EnvCapableAstro,
): string | undefined {
  return getEnvFallback(env, Astro, ['PODCAST', 'PODCASRT'])
}

export function isEnabled(value: string | boolean | undefined): boolean {
  return value === true || value === 'true' || value === '1'
}

export function getBooleanEnv(
  env: Record<string, string | undefined>,
  Astro: EnvCapableAstro,
  names: string | string[],
): boolean | undefined {
  const value = getEnvFallback(env, Astro, Array.isArray(names) ? names : [names])
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
