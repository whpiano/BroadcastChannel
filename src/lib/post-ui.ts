import type { Reaction } from '../types'
import dayjs from './dayjs'

export const paidReactionClass = 'border-paid-line bg-paid-surface text-paid'

export function formatPostTime(datetime: string, timezone?: string, locale?: string): string {
  const postTime = dayjs(datetime).tz(timezone).locale(locale ?? 'en')
  const isOlderThanWeek = postTime.isBefore(dayjs().subtract(1, 'w'))

  return isOlderThanWeek ? postTime.format('HH:mm · ll · ddd') : postTime.fromNow()
}

export function getTagHref(tag: string): string {
  return `/search/result?q=${encodeURIComponent(`#${tag}`)}`
}

export function getReactionLabel(reaction: Reaction): string {
  const reactionName = reaction.isPaid ? 'Paid reaction' : `${reaction.emoji || 'Custom emoji'} reaction`

  return `${reactionName}, count ${reaction.count}`
}
