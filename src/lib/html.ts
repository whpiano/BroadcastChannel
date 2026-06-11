import sanitizeHtml from 'sanitize-html'

const mediaTags = ['img', 'video', 'audio', 'source']
const interactiveTags = ['button', 'input', 'label']
const telegramTags = ['tg-spoiler']
const contentSanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(mediaTags, interactiveTags, telegramTags),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    '*': [
      'aria-controls',
      'aria-hidden',
      'aria-label',
      'class',
      'id',
      'popover',
      'role',
      'style',
      'title',
    ],
    'a': ['href', 'name', 'target', 'rel', 'title', 'class'],
    'audio': ['src', 'controls', 'preload'],
    'button': ['type', 'class', 'popovertarget', 'popovertargetaction', 'aria-label'],
    'img': ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading', 'class'],
    'input': ['type', 'id', 'class', 'aria-label', 'aria-controls'],
    'label': ['for', 'class'],
    'source': ['src', 'srcset', 'type'],
    'video': [
      'src',
      'width',
      'height',
      'poster',
      'controls',
      'preload',
      'muted',
      'autoplay',
      'loop',
      'playsinline',
      'webkit-playsinline',
      'disablepictureinpicture',
      'aria-label',
    ],
  },
}

export function sanitizeContentHtml(content: string): string {
  return sanitizeHtml(content, contentSanitizeOptions)
}

export function sanitizeFeedHtml(content: string): string {
  return sanitizeHtml(content, {
    ...contentSanitizeOptions,
    exclusiveFilter(frame) {
      return frame.tag === 'img' && frame.attribs.class?.includes('modal-img')
    },
  })
}
