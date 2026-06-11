import type { APIRoute } from 'astro'
import { getFeedData } from '../lib/feed'
import { sanitizeFeedHtml } from '../lib/sanitize'

export const GET: APIRoute = async (context) => {
  const { channel, posts, siteUrl, title } = await getFeedData(context)

  return Response.json({
    version: 'https://jsonfeed.org/version/1.1',
    title,
    description: channel.description,
    home_page_url: siteUrl.toString(),
    items: posts.map(item => ({
      url: new URL(`posts/${item.id}`, siteUrl).toString(),
      title: item.title,
      description: item.description,
      date_published: new Date(item.datetime),
      tags: item.tags,
      content_html: sanitizeFeedHtml(item.content),
    })),
  }, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
