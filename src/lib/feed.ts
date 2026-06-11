import type { APIContext } from 'astro'
import type { ChannelInfo, Post } from '../types'
import { getChannelInfo } from './telegram'

export interface FeedData {
  channel: ChannelInfo
  posts: Post[]
  siteUrl: URL
  tag: string | null
  title: string
}

export async function getFeedData(context: APIContext): Promise<FeedData> {
  const tag = context.url.searchParams.get('tag')
  const channel = await getChannelInfo(context, {
    q: tag ? `#${tag}` : '',
  })
  const siteUrl = new URL(context.locals.SITE_URL, context.url.origin)
  siteUrl.search = ''

  return {
    channel,
    posts: channel.posts ?? [],
    siteUrl,
    tag,
    title: `${tag ? `${tag} | ` : ''}${channel.title}`,
  }
}
