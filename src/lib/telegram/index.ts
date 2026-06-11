import type { ChannelInfo, GetChannelInfoParams, Post } from '../../types'
import type { RequestContext } from './types'
import { modifyHTMLContent } from './content'
import { extractPost } from './parse'
import { loadChannelDocument } from './request'
import { normalizeUrlAttribute } from './url'

export async function getChannelPost(context: RequestContext, id: string): Promise<Post> {
  const { $, channel, staticProxy, reactionsEnabled } = await loadChannelDocument(context, { id })
  const post = await extractPost($, null, { channel, staticProxy, reactionsEnabled })

  return post
}

export async function getChannelInfo(context: RequestContext, params: GetChannelInfoParams = {}): Promise<ChannelInfo> {
  const { before = '', after = '', q = '' } = params
  const { $, channel, staticProxy, reactionsEnabled } = await loadChannelDocument(context, { before, after, q })
  const postNodes = $('.tgme_channel_history .tgme_widget_message_wrap').toArray()
  const avatar = $('.tgme_page_photo_image img').attr('src')
  const posts = (await Promise.all(
    postNodes.map((item, index) => extractPost($, item, { channel, staticProxy, index, reactionsEnabled })),
  ))
    .reverse()
    .filter(post => post.type === 'text' && Boolean(post.id) && Boolean(post.content))

  const channelInfo: ChannelInfo = {
    posts,
    title: $('.tgme_channel_info_header_title').text(),
    description: $('.tgme_channel_info_description').text(),
    descriptionHTML: (await modifyHTMLContent($, $('.tgme_channel_info_description'), { staticProxy })).html(),
    avatar: avatar ? normalizeUrlAttribute(avatar) : avatar,
  }

  return channelInfo
}
