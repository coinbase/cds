---
mobile: patch
---

Improve `Carousel` drag performance by running the pan gesture and snap animation on the UI thread with Reanimated instead of the JS thread with `@react-spring/native`, so dragging stays smooth when the JS thread is busy.
