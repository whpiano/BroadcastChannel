import type { NavItem } from '../types'

type Env = Record<string, string | undefined>

export const DEFAULT_TELEGRAM_HOST = 'telegram.me'

function getProcessEnv(name: string): string | undefined {
  return (Reflect.get(globalThis, 'process') as { env?: Env } | undefined)?.env?.[name]
}

/**
 * Runtime envs must win over Vite's build-time import.meta.env values.
 */
export function getEnv(env: Env, name: string): string | undefined {
  return getProcessEnv(name) ?? env[name]
}

export function getStaticProxy(env: Env): string {
  return getEnv(env, 'STATIC_PROXY') ?? '/static/'
}

export function getTelegramHost(env: Env): string {
  return getEnv(env, 'TELEGRAM_HOST') ?? DEFAULT_TELEGRAM_HOST
}

export function getBooleanEnv(env: Env, name: string): boolean | undefined {
  const value = getEnv(env, name)
  return value === undefined ? undefined : value === 'true' || value === '1'
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
