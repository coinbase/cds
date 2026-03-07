# Mobile Chart Scrubber Accessibility Proposal

## Context

Goal: support screen-reader users with a clear chart summary first, then swipe-based point-by-point scrubber announcements, with minimal API surface and predictable defaults per chart type.

## Current State

- `Scrubber` currently exposes:
  - `accessibilityLabel?: string | ((dataIndex: number) => string)`
  - `scrubberAccessibilityStep?: number`
- `Scrubber` currently announces labels via `AccessibilityInfo.announceForAccessibility(...)` when `scrubberPosition` changes.
- Announcement sampling is derived from `scrubberAccessibilityStep` (or auto-computed `ceil(dataLength / 10)` when undefined).
- `scrubberPosition` is driven by pan/long-press gesture logic in `ScrubberProvider`.

### Current gaps

- Screen reader swipe navigation does not have native focus targets for each scrubber step.
- `announceForAccessibility` can speak updates, but does not create interactive/focusable swipe targets.
- Current default step behavior is global and not aligned with desired line vs bar behavior.

## Proposed API

Use chart-level accessibility props:

- `accessibilityLabel?: string | ((dataIndex?: number) => string)`
- `accessibilityStep?: number`

### Semantics

- `accessibilityLabel` string:
  - Used as the chart summary label.
  - Also used for swipe target labels unless a function is provided.
- `accessibilityLabel` function:
  - Called with `undefined` for summary/overview label.
  - Called with `dataIndex` for each swipe target label.
- `accessibilityStep`:
  - Controls how many points are skipped between swipe targets.

## Default Step Behavior

- Base default (when `accessibilityStep` is not provided): `1` (one focus target per data index).
- `LineChart` behavior:
  - Set `accessibilityStep` to `ceil(dataLength / 10)` as a chart-specific default.
- `BarChart` behavior:
  - Do not set step by default.
  - It naturally uses base default `1`.

## Proposed Interaction Model

1. Focus chart:
   - Screen reader announces summary label (`accessibilityLabel(undefined)` or string).
   - Optional hint: "Swipe left or right to hear more points."
2. Swipe:
   - Focus moves across scrubber segments generated from sampled indices.
   - Each segment announces `accessibilityLabel(dataIndex)` (or string fallback).
   - Focusing a segment updates `scrubberPosition`.

## Implementation Notes

### Why this cannot live only inside Skia `Scrubber`

`Scrubber` renders Skia primitives. Native screen-reader focus targets must be React Native accessibility elements (`View`/`Pressable`). Therefore, swipe targets need an RN overlay.

### Minimal architecture

- Add a small RN overlay component in `src/chart/scrubber/`. similar to SparklineAccessibilityView called ScrubberAccessibilityView.
- Overlay renders focusable segments using sampled indices from `accessibilityStep`.
- Overlay segment focus/press updates `scrubberPosition`.
- To wire this cleanly, use minimal scrubber context additions:
  - read/write scrubber position from JS-side
  - pass scrubber accessibility config from `Scrubber` to overlay

## Behavior Alignment

- Keep a clear distinction:
  - Summary label for initial chart focus.
  - Per-index labels for swipe navigation.
- Avoid duplicate announcements:
  - If overlay focus targets are active, prefer segment label speech over extra `announceForAccessibility` calls.

## Migration Notes

- Existing `Scrubber.accessibilityLabel` usage with `(dataIndex: number) => string` remains compatible.
- New optional `dataIndex?: number` function signature enables summary + per-index behavior in one prop.
