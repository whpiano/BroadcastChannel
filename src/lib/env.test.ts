import type { AstroEnvContext } from '../types'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getEnv, parseCsvList, parseDelimitedItems } from './env'

function astroWithRuntimeEnv(env: Record<string, string | undefined>): AstroEnvContext {
  return {
    locals: {
      runtime: { env },
    } as AstroEnvContext['locals'],
  }
}

describe('getEnv', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('prefers Astro runtime env over process.env and import.meta.env', () => {
    vi.stubEnv('TEST_ENV_PRIORITY', 'process-value')

    expect(
      getEnv(
        { TEST_ENV_PRIORITY: 'import-value' },
        astroWithRuntimeEnv({ TEST_ENV_PRIORITY: 'runtime-value' }),
        'TEST_ENV_PRIORITY',
      ),
    ).toBe('runtime-value')
  })

  it('falls back to process.env before import.meta.env when runtime env is missing', () => {
    vi.stubEnv('TEST_ENV_PRIORITY', 'process-value')

    expect(
      getEnv(
        { TEST_ENV_PRIORITY: 'import-value' },
        astroWithRuntimeEnv({}),
        'TEST_ENV_PRIORITY',
      ),
    ).toBe('process-value')
  })

  it('falls back to import.meta.env when runtime and process env are missing', () => {
    expect(
      getEnv(
        { TEST_ENV_PRIORITY: 'import-value' },
        astroWithRuntimeEnv({}),
        'TEST_ENV_PRIORITY',
      ),
    ).toBe('import-value')
  })
})

describe('env parsing helpers', () => {
  it('parses semicolon-delimited nav items and ignores empty entries', () => {
    expect(parseDelimitedItems('Home,/; ; Blog,/blog; Invalid; About,/about')).toEqual([
      { title: 'Home', href: '/' },
      { title: 'Blog', href: '/blog' },
      { title: 'About', href: '/about' },
    ])
  })

  it('parses comma-delimited lists and ignores empty entries', () => {
    expect(parseCsvList('alpha, , beta,, gamma ')).toEqual(['alpha', 'beta', 'gamma'])
  })
})
