---
version: beta
name: BroadcastChannel Theme Architecture
description: "Bear-compatible Base with an optional BroadcastChannel Sepia override."
defaultTheme: Base
optionalThemes:
  sepia: /themes/sepia.css
publicVariables:
  width: 800px
  font-main: "Verdana, sans-serif"
  font-secondary: "Verdana, sans-serif"
  font-scale: 1em
  background-color: "#fff"
  heading-color: "#222"
  text-color: "#444"
  link-color: "#3273dc"
  visited-color: "#8b6fcb"
  code-background-color: "#f2f2f2"
  code-color: "#222"
  blockquote-color: "#222"
sepia:
  paper: "#f4f1ec"
  ink: "#181513"
  heading: "#333333"
  accent: "#b23b00"
  surface: "#ffffff"
  muted: "#706862"
  link: "#5a6570"
  link-hover: "#3f4850"
  line: "rgba(0, 0, 0, 0.07)"
---

# BroadcastChannel Design System

## Theme architecture

BroadcastChannel always ships a small, first-party **Base** theme. Base is the complete default experience: plain, single-column, content-first, and behaviorally compatible with Bear themes where the product structures overlap.

Themes are CSS overrides, not application state:

- No additional stylesheet means **Base**.
- Loading `/themes/sepia.css` after Base means **Base + Sepia**.
- Loading a user stylesheet such as `xyz.css` through `HEADER_INJECT` means **Base + xyz**.
- There is no theme provider, theme environment variable, browser-side switch, registry, or upstream CSS synchronization.

CSS overrides only affect the rendered document. Non-CSS metadata such as `site.webmanifest` colors and the browser `theme-color` keep their Base defaults and do not automatically follow Sepia or user stylesheets.

First-party themeable rules live in named cascade layers. `HEADER_INJECT` is trusted raw HTML in `<head>`; Astro may emit its bundled stylesheet link later in the rendered head, but a normal unlayered user stylesheet still takes precedence over the named first-party layers. Prism is also included in a named first-party layer.

Sepia is intentionally distributed as an unlayered static override. It is not loaded by default. Deployments opt into it with a stylesheet link in `HEADER_INJECT` or another equivalent head injection.

## Public compatibility contract

Base defines and uses these public variables:

```css
:root {
  --width: 800px;
  --font-main: Verdana, sans-serif;
  --font-secondary: Verdana, sans-serif;
  --font-scale: 1em;
  --background-color: #fff;
  --heading-color: #222;
  --text-color: #444;
  --link-color: #3273dc;
  --visited-color: #8b6fcb;
  --code-background-color: #f2f2f2;
  --code-color: #222;
  --blockquote-color: #222;
}
```

`--width` controls the rendered body width. Following Bear's variable semantics, body text and Tailwind's `font-sans` bridge use `--font-secondary`, while `h1`–`h6` use `--font-main`. Link and visited states use their respective variables. Headings, code, and blockquotes also consume the matching public variables rather than fixed project colors.

Base follows Bear's dark-mode convention under `prefers-color-scheme: dark`: background `#01242e`, heading `#eee`, text `#ddd`, links `#8cc2dd`, visited links `#8b6fcb`, code background `#000`, code text `#ddd`, and blockquotes `#ccc`.

The public shell uses real site-level elements:

```text
header.site-header
  > a.avatar-link
    > img.channel-avatar
  > a.title
    > h1
  > nav.social-links
nav.site-navigation
main#main-content
footer.site-footer
```

Rendered HTML routes set an explicit body page class:

- `/` → `home`
- `/before/**`, `/after/**`, and search results → `blog`
- `/posts/[id]` → `post`
- `/tags` and `/links` → `page`

The timeline exposes `.post-entry`, `.post-meta`, `.post-content`, `.post-reactions`, `.reaction-paid`, `.tags`, `.post-tags`, and `.post-comments`. Telegram code blocks have the stable shape `pre.code > code.language-*`; Prism adds nested `.token` spans when a grammar is available. Base also styles `.highlight` as an inbound compatibility hook, but the Telegram renderer does not synthesize that class.

`--code-color` controls plain code text and participates in the first-party Prism token palette. Syntax tokens also derive from other public theme colors so they remain distinguishable; `--code-color` is not an override for every token category. All first-party token rules remain in a named cascade layer, allowing ordinary unlayered user CSS to override them.

The home page remains a full Telegram content stream. It does not output or imitate Bear's `.blog-posts` date-and-title list, so themes that only style that list are outside the compatibility promise.

## Base direction

Base should feel close to an uncustomized personal Bear blog without reproducing Bear's stylesheet:

- one readable column controlled by `--width`;
- Verdana defaults and modest heading scale;
- direct links, simple rules, and restrained controls;
- no Sepia timeline rail, burnt-orange accents, paper shadows, or card styling;
- responsive navigation and search without a public sidebar;
- complete Telegram text, media, previews, reactions, tags, comments, pagination, and back-to-top behavior.

Base supports light and dark system preferences. It keeps keyboard focus visible, provides a skip link, honors reduced motion, and avoids requiring browser JavaScript for layout or theme behavior.

## Optional Sepia direction

Sepia preserves BroadcastChannel's original identity as an override rather than the platform default. It uses warm paper, dark ink, restrained burnt orange, quiet white surfaces, soft separators, and the timeline rail/dot treatment.

- **Paper:** `#f4f1ec`
- **Ink:** `#181513`
- **Heading:** `#333333`
- **Accent:** `#b23b00`
- **Muted:** `#706862`
- **Links:** `#5a6570` to `#3f4850`
- **Surface:** `#ffffff`

The optional theme may use BroadcastChannel-specific selectors for the Telegram stream, but it should drive ordinary typography and colors through the same public variables whenever possible. It keeps the single-column shell; the former desktop sidebar is not part of the public theme architecture.

Sepia's character comes from the accent timestamp and dot, soft vertical rail, paper-on-paper media depth, compact tag and reaction treatments, and small navigation surfaces. Avoid large rounded cards, loud gradients, excessive motion, or app-like chrome.

## Accessibility and content rules

- First-party controls and project-owned palette choices target WCAG AA contrast. Exact compatibility defaults such as Bear's `--visited-color`, and any third-party theme overrides, remain the theme author's responsibility.
- Preserve visible keyboard focus, the skip link, semantic landmarks, and usable mobile targets.
- Honor `prefers-reduced-motion` in Base and optional themes.
- Do not place article metadata or tags in bare `header`, `footer`, or `nav` elements that broad third-party theme selectors could accidentally restyle.
- Keep Telegram comments as the deliberate browser-script exception.
- Sanitize external Telegram HTML before rendering it. `HEADER_INJECT` and `FOOTER_INJECT` are the only intentional trusted raw HTML paths.
