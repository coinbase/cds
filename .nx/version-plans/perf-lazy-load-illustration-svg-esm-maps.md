---
cds: minor
---

Perf: the web `HeroSquare`, `Pictogram`, `SpotIcon`, `SpotSquare`, and `SpotRectangle` components now load their generated `svgEsmMap` module lazily instead of importing it statically. These five maps are the largest generated modules in the package (~225 KB of source), and `createIllustration` only reads them inside a post-mount effect gated on `applyTheme`, so importing them statically pulled every entry into the initial bundle of any app using an illustration — including apps that never enable theming. Illustrations rendered without `applyTheme` use the CDN `<img>` path and are unchanged; a themed illustration now resolves one extra chunk fetch before its SVG appears, so pass a sized `fallback` to avoid layout shift on first use of a given variant.
