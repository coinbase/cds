---
cds: minor
---

Perf: the web `ThemeProvider` now loads framer-motion's `domAnimation` feature bundle asynchronously through `LazyMotion`'s loader form instead of importing it statically. `ThemeProvider` always mounts `FramerMotionProvider` and consumers cannot opt out, so these features previously landed in the initial bundle of every app rendering a CDS theme, whether or not it ever rendered an `<m.*>` element — in a webpack 5 production build the initial chunk drops from 58,152 B to 19,060 B (-67%). There is no API change; the first `<m.*>` animation of a page load now resolves after one chunk fetch, and an app that needs the bundle synchronously can pass `motionFeatures={domAnimation}` to `ThemeProvider` to restore eager loading.
