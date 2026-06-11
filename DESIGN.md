---
version: alpha
name: BroadcastChannel Sepia
description: A warm, server-rendered Telegram microblog identity with a paper canvas, quiet navigation, and an accent-led timeline.
colors:
  primary: "#000000"
  secondary: "#706862"
  tertiary: "#B23B00"
  neutral: "#F4F1EC"
  surface: "#FFFFFF"
  surface-muted: "#F9F9F9"
  heading: "#333333"
  link: "#5A6570"
  link-hover: "#3F4850"
  line: "rgba(0, 0, 0, 0.05)"
  footer: "#666666"
  paid: "#9A6A00"
typography:
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.2
  body-md:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  meta:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
  caption:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
  content-h1:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.25
  content-h2:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.3
rounded:
  panel: 3px
  chip: 4px
  media: 8px
  full: 9999px
spacing:
  hairline-gap: 2px
  xs: 5px
  sm: 10px
  md: 15px
  lg: 20px
  xl: 30px
  2xl: 40px
  page-x: 20px
  content-indent: 30px
  sidebar: 200px
  content-max: 800px
components:
  nav-link:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.heading}"
    typography: "{typography.body-md}"
    rounded: "{rounded.panel}"
    padding: 10px
  nav-link-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.heading}"
    typography: "{typography.body-md}"
    rounded: "{rounded.panel}"
    padding: 10px
  link:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.link}"
    typography: "{typography.body-md}"
  link-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.link-hover}"
    typography: "{typography.body-md}"
  separator:
    backgroundColor: "{colors.line}"
    height: 2px
  search-input:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.panel}"
    padding: 10px
  timeline-dot:
    backgroundColor: "{colors.tertiary}"
    rounded: "{rounded.full}"
    size: 8px
  post-content:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    padding: 30px
  tag-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.chip}"
    padding: 10px
  reaction-pill:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.secondary}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 6px
  paid-reaction-pill:
    textColor: "{colors.paid}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 6px
  media:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.media}"
  footer:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.footer}"
    typography: "{typography.body-sm}"
  back-to-top:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.heading}"
    rounded: "{rounded.full}"
    size: 32px
---

## Overview

BroadcastChannel uses a Sepia-inspired microblog style: calm, readable, and deliberately low-tech. The interface should feel like a personal notebook generated from a Telegram channel, not like a social feed competing for attention.

The product personality is warm, utilitarian, and content-first. Server-rendered HTML, strong accessibility defaults, and nearly zero browser-side JavaScript are part of the visual identity: pages should load quietly, scroll predictably, and keep the message timeline as the primary focus.

## Colors

The palette is built from warm paper, high-contrast ink, muted utility greys, and one restrained rust accent.

- **Primary / Ink (`#000000`):** main reading text. Use it for long-form message content where contrast matters most.
- **Heading (`#333333`):** channel titles, navigation text, focus rings, and strong UI labels.
- **Secondary / Muted (`#706862`):** descriptions, chips, reaction pills, pagination, and secondary metadata.
- **Tertiary / Rust Accent (`#B23B00`):** timeline dots, timestamps, post permalinks, tag hover states, and blockquote/link-preview rails.
- **Neutral / Paper (`#F4F1EC`):** page background and the dominant canvas.
- **Surface (`#FFFFFF`):** active navigation, cards, quoted content, table rows, and preview blocks.
- **Surface Muted (`#F9F9F9`):** search fields, code blocks, reaction pills, and low-emphasis controls.
- **Line (`rgba(0, 0, 0, 0.05)`):** separators, timeline rails, borders, table grid lines, and media outlines.

Use the rust accent sparingly. It should mark chronology and intent, not decorate every interactive element.

## Typography

Typography uses the system sans stack only. This keeps the site fast, localizable, and consistent across serverless deployments without font loading dependencies.

- **Title:** 20px, semibold, compact line-height for channel names.
- **Body:** 16px with 1.6 line-height for posts and channel descriptions.
- **Metadata:** 14px medium for timestamps and compact navigation labels.
- **Caption:** 12px medium for pagination, reactions, and small utility text.
- **Content headings:** preserve familiar markdown hierarchy: 24px h1, 20px h2, then progressively smaller bold headings.

Prefer plain weights over typographic flourish. The content may include CJK, emoji, code, Telegram entities, and rich previews; the type system should make mixed content stable rather than branded.

## Layout

The layout is a compact two-column shell on wider screens and a single-column flow on mobile.

- The page shell uses 20px horizontal margins and an 800px maximum content width.
- On desktop, the main timeline and a 200px sticky sidebar sit in a reversed flex row, separated by a subtle right border on the main column.
- On mobile, navigation becomes a sticky top strip with wrapped links and a collapsible search affordance.
- Timeline items use a small accent dot, a muted vertical rail, and 15px–30px indentation to create chronological rhythm.
- Spacing intentionally favors 10px, 20px, and 30px steps, with small 2px–6px adjustments only for icon and pill alignment.

Keep layouts narrow and readable. Do not expand posts into magazine-style cards or dense dashboards unless the product goal changes.

## Elevation & Depth

Depth is quiet and functional. Most hierarchy comes from spacing, borders, color contrast, and the timeline rail.

The only standard shadow is a soft layered shadow with very low alpha, used on avatars, active navigation, media, code blocks, tables, and small floating controls. Avoid heavy elevation, glow, or material-style stacked cards.

Modal image preview is the exception: it may use a dark translucent backdrop and blur to isolate the image from the page.

## Shapes

The shape language mixes restrained rectangular panels with fully round identity and timeline elements.

- **3px panels:** navigation links, search fields, quote blocks, spoilers, and link previews.
- **4px chips:** tags and compact text chips.
- **8px media:** images, iframes, code blocks, and modal images.
- **Full radius:** avatars, timeline dots, reactions, and floating circular buttons.

Avoid introducing new radius values unless a new component truly needs a distinct shape role.

## Components

- **Channel header:** circular 40px avatar, 20px semibold title, compact social icon row, and optional description panel on muted surface.
- **Sidebar navigation:** plain text links with subtle active surface and soft shadow. Hover may add white translucency and underline only when useful.
- **Search:** hidden behind a small mobile toggle; visible in desktop sidebar. Inputs should stay muted and functional, not visually dominant.
- **Timeline post:** timestamp and permalink use the rust accent. Content is aligned to the vertical rail and should remain the main visual mass.
- **Content body:** support markdown-like prose, code, checklists, tables, Telegram emoji, spoilers, polls, location blocks, and media without changing the core rhythm.
- **Link preview and blockquote:** use white surface, a 3px rust left rail, compact padding, and the panel radius.
- **Tags and links:** render as small bordered chips or two-column tag clouds; hover changes border/text to the accent color.
- **Reactions:** use rounded muted pills with small emoji and tabular numeric counts.
- **Pagination:** rounded outline buttons with muted text; hover only shifts text to the accent.
- **Back to top:** 32px circular muted control with a small upward hover motion.

## Do's and Don'ts

- Do keep the page content-first, quiet, and server-rendered by default.
- Do reuse the existing `@theme` color, radius, shadow, and spacing values before adding new tokens.
- Do preserve WCAG AA contrast for normal text and visible focus rings for keyboard users.
- Do use the rust accent for chronology, primary hover feedback, and content emphasis.
- Don't add client-side JavaScript for visual polish unless the feature cannot work without it.
- Don't introduce heavy shadows, gradients, glassmorphism, or animated decoration into the main timeline.
- Don't widen the reading column or turn each post into a card grid; the current identity depends on a narrow chronological stream.
- Don't add custom webfonts unless there is a measured benefit that outweighs load cost and deployment complexity.
