import type { ChannelInfo, Post } from '../../types'
import { LRUCache } from 'lru-cache'

export type CacheValue = ChannelInfo | Post

export const cache = new LRUCache<string, CacheValue>({
  ttl: 1000 * 60 * 5,
  maxSize: 50 * 1024 * 1024,
  sizeCalculation: item => JSON.stringify(item).length,
})

export function cloneCacheValue<T extends CacheValue>(value: T): T {
  return structuredClone(value)
}

export function isChannelInfo(value: CacheValue): value is ChannelInfo {
  return 'posts' in value
}
