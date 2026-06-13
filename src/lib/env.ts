import type { AstroEnvContext, NavItem } from '../types'

interface RuntimeProcess {
  env?: Record<string, string | undefined>
}

function getProcessEnv(name: string): string | undefined {
  const runtimeProcess = Reflect.get(globalThis, 'process') as RuntimeProcess | undefined
  return runtimeProcess?.env?.[name]
}

/**
 * Runtime envs must win over Vite's build-time import.meta.env values.
 */
export function getEnv(
  env: Record<string, string | undefined>,
  Astro: AstroEnvContext,
  name: string,
): string | undefined {
  return Astro.locals?.runtime?.env?.[name] ?? getProcessEnv(name) ?? env[name]
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
