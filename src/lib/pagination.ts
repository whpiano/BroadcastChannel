import type { APIContext } from 'astro'
import type { ChannelInfo, SeoMeta } from '../types'
import { getChannelInfo } from './telegram'

export type CursorDirection = 'after' | 'before'

export const noIndexSeo: SeoMeta = {
  noindex: true,
}

export function getCursorParam(context: APIContext): string | undefined {
  return context.params.cursor
}

export function getCursorQuery(direction: CursorDirection, cursor: string | undefined) {
  return direction === 'before' ? { before: cursor } : { after: cursor }
}

export async function getCursorPageChannel(context: APIContext, direction: CursorDirection): Promise<ChannelInfo> {
  return getChannelInfo(context, getCursorQuery(direction, getCursorParam(context)))
}
