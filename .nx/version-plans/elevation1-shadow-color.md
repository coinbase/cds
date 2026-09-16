---
cds: patch
---

Fix: the `shadow.elevation1` token now uses a lighter color than `shadow.elevation2` across every built-in theme on web and mobile. Elevation 1 is meant to read lighter than elevation 2, but the themes shipped the same pure black for both.

Mobile `shadow.elevation1.shadowColor` moves from `#000000` to `#5B616E`, and web `shadow.elevation1` moves from `rgba(0, 0, 0, 0.12)` to `rgba(91, 97, 110, 0.12)` — the same color. `shadow.elevation2` is unchanged.
