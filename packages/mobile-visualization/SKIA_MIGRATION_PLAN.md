# Skia Migration Plan for Mobile Visualization

## Executive Summary

This plan outlines the strategy to **completely replace** the existing `mobile-visualization` chart components from `react-native-svg` to `@shopify/react-native-skia` for improved performance. Since we're in beta, we'll do a **clean replacement** with the same component names.

### Key Strategy Decisions

✅ **Same Names**: `Line`, `CartesianChart`, etc. (NOT `SkiaLine`)
✅ **Direct Replacement**: No "deprecated" versions, just replace implementations
✅ **Breaking Changes OK**: Beta status means we can break APIs if needed
✅ **3-Week Timeline**: Complete migration in phases
✅ **Font Customization**: New capability to customize fonts per-component

### Why This Approach?

- **Beta Status**: We can make breaking changes now
- **Simpler Codebase**: No dual SVG/Skia maintenance
- **Better DX**: Clean API without "Skia" prefix everywhere
- **Faster Migration**: No deprecation warnings, just do it

## Goals

1. **Performance**: Replace SVG rendering with hardware-accelerated Skia (~2x FPS improvement)
2. **API Compatibility**: Keep prop APIs as similar as possible
3. **Customization**: Add font/styling customization (NEW capability!)
4. **Feature Parity**: Match and exceed web component capabilities
5. **Clean Migration**: 3 weeks to complete replacement

---

## What Changes for Developers?

### ✅ Stays the Same

- Component names: `Line`, `CartesianChart`, `Scrubber`, etc.
- Most props: `seriesId`, `stroke`, `strokeWidth`, `curve`, etc.
- Context providers: `CartesianChartProvider`, `ScrubberProvider`
- Utility functions: scale functions, axis helpers, etc.

### ⚠️ Breaking Changes

- **Style prop removed**: `<Line style={{...}} />` → use component props

  ```typescript
  // ❌ OLD
  <Line style={{ strokeWidth: 3 }} />

  // ✅ NEW
  <Line strokeWidth={3} />
  ```

### ✨ New Capabilities

- **Theme-based fonts**: Uses CDS theme fonts (same as `Text` component)
- **Font customization (Phase 2)**: Control fonts per-component via `ThemeVars.FontFamily`
- **Built-in text measurement**: `font.measureText()` makes layout easier than SVG!
- **Better performance**: 60 FPS animations, smooth scrubbing
- **Hardware acceleration**: Leverages GPU for rendering
- **Side-positioned labels**: Like web (already working in PerformanceDemo!)

### 📝 Migration Example

**Before (SVG)**:

```typescript
<CartesianChart series={data} height={200}>
  <Line seriesId="price" stroke="#0052FF" strokeWidth={2} />
  <Scrubber />
  <XAxis />
</CartesianChart>
```

**After (Skia - Phase 1, same props!)**:

```typescript
<CartesianChart series={data} height={200}>
  <Line seriesId="price" stroke="#0052FF" strokeWidth={2} />
  <Scrubber /> {/* Uses theme.fontFamily['label2'] automatically */}
  <XAxis /> {/* Uses theme fonts automatically */}
</CartesianChart>
```

**After (Skia - Phase 2, with font customization)**:

```typescript
<CartesianChart series={data} height={200}>
  <Line seriesId="price" stroke="#0052FF" strokeWidth={2} />
  <Scrubber labelFont="label1" /> {/* Optional: customize like Text component */}
  <XAxis tickLabelFont="caption" /> {/* Optional: customize per component */}
</CartesianChart>
```

---

## Architecture Overview

### Current Architecture (SVG-based)

```
CartesianChart (SVG container)
├── CartesianChartProvider (context)
├── ScrubberProvider (gesture handling)
└── Svg (react-native-svg)
    ├── Line/Area/Bar components
    ├── Axes components
    ├── Scrubber components
    └── Text components
```

### Target Architecture (Skia-based)

```
CartesianChart (Canvas container)
├── CartesianChartProvider (context - UNCHANGED)
├── ScrubberProvider (gesture handling - UNCHANGED)
└── Canvas (@shopify/react-native-skia)
    ├── Line/Area/Bar components (Skia Path) - SAME NAMES
    ├── Axes components (Skia primitives + Text) - SAME NAMES
    ├── Scrubber components (Skia Circle + RoundedRect + Text) - SAME NAMES
    └── Text components (Skia Text with matchFont) - SAME NAMES
```

---

## Migration Strategy: Direct Replacement

**Approach**: Replace SVG implementations with Skia implementations file-by-file, keeping the same names and API surface as much as possible.

### Phase 1: Foundation (✅ COMPLETE)

- [x] Add `@shopify/react-native-skia` dependency
- [x] Create basic Skia examples (SkiaChart.stories.tsx)
- [x] Establish font handling pattern (platform-specific fonts)
- [x] Create initial proof-of-concept components
- [x] Validate interactive scrubbing performance

### Phase 2: Core Components (NEXT - Week 1)

Priority: High-impact, frequently used components

#### 2.1 CartesianChart ← Replace SVG with Canvas

- **File**: `CartesianChart.tsx` (replace implementation)
- **Changes**:
  - Replace `<Svg>` with `<Canvas>`
  - Keep CartesianChartProvider (no changes)
  - Keep ScrubberProvider (no changes)
- **Props**: Keep all existing props (series, animate, xAxis, yAxis, inset, etc.)
- **Timeline**: 1-2 days

#### 2.2 Path ← Replace SVG Path with Skia Path

- **File**: `Path.tsx` (replace implementation)
- **Changes**: Use `Skia.Path.MakeFromSVGString()` instead of SVG Path
- **Props**: Keep all existing props (d, fill, stroke, strokeWidth, etc.)
- **Timeline**: 1 day

#### 2.3 Line/SolidLine/DottedLine/GradientLine ← Replace implementations

- **Files**: `line/Line.tsx`, `line/SolidLine.tsx`, etc. (replace implementations)
- **Changes**: Use Skia Path instead of SVG Path
- **Props to Keep**: All existing (seriesId, curve, type, stroke, etc.)
- **New Props (Optional - Phase 2)**:
  - `pointLabelFont?: ThemeVars.FontFamily` (defaults to 'label2')
- **Timeline**: 2-3 days
- **Notes**: Most complex due to points, gradients, area fills. Use `useChartFont()` for defaults.

### Phase 3: Interactive Components (Week 2)

Priority: User-facing interaction components

#### 3.1 Scrubber ← Replace SVG with Skia

- **File**: `scrubber/Scrubber.tsx` (replace implementation)
- **Changes**: Replace SVG Circle + Rect + Text with Skia equivalents
- **Props to Keep**: All existing (seriesIds, hideLine, label, etc.)
- **New Props (Optional - Phase 2)**:
  ```typescript
  labelFont?: ThemeVars.FontFamily; // Defaults to 'label2'
  ```
- **Timeline**: 2-3 days
- **Key Features**:

  ```typescript
  // Use measureText for label sizing (from PerformanceDemo!)
  const font = useChartFont(labelFont);
  const labelText = `Bitcoin ${formatPrice(value)}`;
  const { width } = font.measureText(labelText);

  const labelWidth = width + labelPadding.horizontal * 2;
  const labelSide = touchX > chartWidth / 2 ? 'left' : 'right';

  <RoundedRect
    width={labelWidth}
    height={labelHeight}
    x={labelSide === 'right' ? touchX + offset : touchX - offset - labelWidth}
  />
  ```

- **Notes**: Already have working example from PerformanceDemo! Use `useChartFont()` for defaults.

#### 3.2 Point ← Replace SVG Circle with Skia Circle

- **File**: `Point.tsx` (replace implementation)
- **Changes**: Replace SVG Circle with Skia Circle
- **Props to Keep**: All existing (dataX, dataY, radius, fill, stroke, etc.)
- **Timeline**: 1 day

### Phase 4: Axes & Text (Week 2-3)

Priority: Essential for complete charts

#### 4.1 XAxis/YAxis ← Replace SVG with Skia

- **Files**: `axis/XAxis.tsx`, `axis/YAxis.tsx` (replace implementations)
- **Changes**: Replace SVG Line + Text + Grid with Skia Path + Text
- **Props to Keep**: All existing (position, showGrid, ticks, etc.)
- **New Props (Optional - Phase 2)**:
  ```typescript
  tickLabelFont?: ThemeVars.FontFamily;  // Defaults to 'label2'
  axisLabelFont?: ThemeVars.FontFamily;  // Defaults to 'label1'
  ```
- **Timeline**: 3-4 days per axis
- **Key Features**:
  ```typescript
  // Measure tick labels for proper positioning
  const tickFont = useChartFont(tickLabelFont);
  ticks.forEach((tick) => {
    const { width, height } = tickFont.measureText(tick.label);
    // Position based on measured dimensions
    const x = tick.position - width / 2; // Center align
    const y = axisY + height + tickPadding;
  });
  ```
- **Notes**: Use `useChartFont()` for defaults. Text measurement simplifies label positioning!

#### 4.2 ChartText ← Replace SVG Text with Skia Text

- **File**: `text/ChartText.tsx` (replace implementation)
- **Changes**: Use Skia Text with matchFont + theme fonts + built-in measurement
- **Props to Keep**: x, y, content, alignment
- **New Props (Optional - Phase 2)**:
  ```typescript
  fontFamily?: ThemeVars.FontFamily; // Defaults to 'label2'
  ```
- **Timeline**: 2 days
- **Key Features**:

  ```typescript
  // Use built-in text measurement for positioning!
  const font = useChartFont();
  const { width, height } = font.measureText(content);

  // Calculate alignment-based positioning
  const adjustedX = align === 'center' ? x - width / 2 :
                    align === 'end' ? x - width : x;

  <SkiaText font={font} text={content} x={adjustedX} y={y} />
  ```

- **Notes**: Use `useChartFont()` for defaults. Text measurement simplifies positioning!

### Phase 5: Specialized Components (Week 3)

Priority: Complete the ecosystem

#### 5.1 Area ← Replace SVG Path with Skia Path

- **Files**: `area/Area.tsx`, `area/GradientArea.tsx`, etc. (replace implementations)
- **Changes**: Use Skia Path with gradient or solid fill
- **Props to Keep**: All existing (seriesId, baseline, etc.)
- **Timeline**: 2 days

#### 5.2 Bar/BarChart ← Replace SVG Rect with Skia Rect

- **Files**: `bar/Bar.tsx`, `bar/BarChart.tsx`, etc. (replace implementations)
- **Changes**: Replace SVG Rect with Skia Rect or RoundedRect
- **Props to Keep**: All existing
- **Timeline**: 2-3 days

#### 5.3 ReferenceLine ← Replace SVG Line with Skia Path

- **File**: `line/ReferenceLine.tsx` (replace implementation)
- **Changes**: Use Skia Path + Text
- **Props to Keep**: All existing (dataX, dataY, label, etc.)
- **Timeline**: 1 day

---

## API Design Principles

### 1. Prop Compatibility

**Goal**: Keep APIs as similar as possible, breaking changes OK for beta

**Strategy**:

- Keep all existing props that make sense
- Add font customization props (new capability!)
- Remove/change props that don't work with Skia
- Use sensible defaults (platform-specific fonts)

**Example**:

```typescript
export type LineProps = {
  // Existing props - KEEP ALL
  seriesId: string;
  curve?: ChartPathCurveType;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  // ... all other existing props

  // NEW: Font customization for point labels
  pointLabelFont?: Font;
};
```

### 2. Style Props Changes

**Breaking Change**: Skia doesn't support React Native StyleSheet

**Before (SVG)**:

```typescript
<Line style={{ opacity: 0.5 }} />
```

**After (Skia)**:

```typescript
<Line opacity={0.5} />
```

**Migration**:

- Style prop values → component props
- Document in migration guide
- Provide codemod if needed

### 3. Font Strategy: Use Theme System!

**Key Insight**: Leverage existing CDS theme fonts instead of adding new props

```typescript
// NEW: Theme-aware font utility
export const useChartFont = (fontFamily?: ThemeVars.FontFamily): Font => {
  const theme = useTheme();

  return useMemo(() => {
    // Default to 'label2' for chart text (12px, good for axes/labels)
    const font = fontFamily ?? 'label2';

    // Get font properties from theme (same as Text component)
    const config = {
      fontFamily: theme.fontFamily[font],
      fontSize: theme.fontSize[font],
      fontWeight: theme.fontWeight[font],
    };

    return matchFont(config);
  }, [fontFamily, theme]);
};

// Usage in components - NO PROPS NEEDED!
const XAxis = () => {
  const tickFont = useChartFont(); // Uses theme default
  // ... render with tickFont
};

// OR with customization (later phase)
const XAxis = ({ tickLabelFont }: { tickLabelFont?: ThemeVars.FontFamily }) => {
  const tickFont = useChartFont(tickLabelFont); // Allow override
  // ... render with tickFont
};
```

#### Benefits of This Approach

1. **✅ No prop changes needed initially** - works with defaults
2. **✅ Consistent with CDS** - uses same theme as Text component
3. **✅ Customizable later** - can add font props in Phase 2
4. **✅ Type-safe** - uses existing `ThemeVars.FontFamily` type
5. **✅ Familiar API** - developers already know `fontFamily: 'label1'`, etc.

#### Colors

```typescript
// Leverage existing theme system - NO CHANGE
const theme = useTheme();

<Line
  stroke={theme.color.accentBoldBlue} // theme-aware
  strokeWidth={2}
  opacity={0.8}
/>
```

#### Gradients

```typescript
// Skia gradient support - NEW CAPABILITY
<Area
  fill="linear-gradient"
  gradientColors={[
    theme.color.accentBoldBlue,
    theme.color.accentSubtleBlue,
  ]}
  gradientOpacity={[1, 0.2]}
/>
```

---

## Key Technical Challenges & Solutions

### Challenge 1: Animation API Differences

**SVG Approach**:

```typescript
// Uses d3-interpolate-path
const interpolator = interpolatePath(fromPath, toPath);
animationProgress.value = withTiming(1);
```

**Skia Approach**:

```typescript
// Uses Skia's built-in path trimming
<Path
  path={skiaPath}
  start={0}
  end={animationProgress} // Animated from 0 to 1
/>
```

**Solution**: Maintain both APIs, use appropriate one per component

---

### Challenge 2: Text Rendering & Measurement

**SVG**: Easy text positioning, automatic baseline (but hard to measure!)
**Skia**: Manual baseline calculation, but built-in measurement! 🎉

**Solution**: Use Skia's `font.measureText()` for layout + helper utilities for baseline

```typescript
// 1. Built-in measurement (much easier than SVG!)
const font = useChartFont();
const { width, height } = font.measureText(text);

// 2. Calculate alignment-based position
const adjustedX = align === 'center' ? x - width / 2 :
                  align === 'end' ? x - width : x;

// 3. Calculate baseline for vertical alignment
export const calculateTextBaseline = (
  y: number,
  fontSize: number,
  verticalAlign: 'top' | 'middle' | 'bottom' = 'middle',
): number => {
  switch (verticalAlign) {
    case 'top':
      return y + fontSize;
    case 'middle':
      return y + fontSize / 2.5; // Empirically determined
    case 'bottom':
      return y;
  }
};

// 4. Render
<SkiaText
  font={font}
  text={text}
  x={adjustedX}
  y={calculateTextBaseline(y, font.getSize(), 'middle')}
/>
```

**Result**: Text measurement is actually **easier in Skia** than SVG!

---

### Challenge 3: Gesture Handling

**Issue**: Skia Canvas gestures vs SVG element gestures

**Solution**: Keep existing ScrubberProvider pattern

```typescript
// Wraps the entire chart
<ScrubberProvider
  enableScrubbing={true}
  onScrubberPositionChange={callback}
>
  <Canvas>
    {/* Skia content */}
  </Canvas>
</ScrubberProvider>
```

---

### Challenge 4: Clipping

**SVG**: Uses `<ClipPath>` and `clipPath` prop
**Skia**: Uses `clip` operations

**Solution**:

```typescript
<Canvas>
  <Group clip={clipPath}>
    <Path path={linePath} />
  </Group>
</Canvas>
```

---

## Testing Strategy

### Unit Tests

- **Keep existing tests**: Test logic separately from rendering
- **Add Skia-specific tests**: Font handling, path generation
- **Mock Skia**: Use jest mocks for `@shopify/react-native-skia`

### Visual Regression Tests

- **Screenshot comparison**: SVG vs Skia rendered outputs
- **Tools**: Detox + pixel-perfect comparison
- **Critical paths**: Line charts, scrubbing, animations

### Performance Tests

- **Metrics**: FPS during animation, scrubbing smoothness
- **Profiling**: React DevTools Profiler
- **Benchmarks**: 100 points, 1000 points, 10000 points

---

## Migration Checklist per Component

### For Each Component:

- [ ] **1. Replace implementation** (e.g., `Line.tsx`)
  - [ ] Implement with Skia primitives (Canvas, Path, Circle, Text, etc.)
  - [ ] Keep existing prop interface as much as possible
  - [ ] Add new font customization props
  - [ ] Remove/adapt SVG-specific props

- [ ] **2. Update stories** (`__stories__/*.stories.tsx`)
  - [ ] Update examples to show new features
  - [ ] Add font customization example
  - [ ] Add performance comparison note

- [ ] **3. Write/update tests**
  - [ ] Keep existing unit tests for logic
  - [ ] Update rendering tests for Skia
  - [ ] Add visual regression tests

- [ ] **4. Update documentation**
  - [ ] Update component API docs
  - [ ] Document new font props
  - [ ] Add migration notes for breaking changes

---

## File Organization

**Strategy**: Replace implementations in-place, keep same file names

```
packages/mobile-visualization/src/chart/
├── index.ts                          # Export all components
├── CartesianChart.tsx                # REPLACE: Canvas instead of Svg
├── line/
│   ├── Line.tsx                      # REPLACE: Skia implementation
│   ├── SolidLine.tsx                 # REPLACE: Skia implementation
│   ├── DottedLine.tsx                # REPLACE: Skia implementation
│   ├── GradientLine.tsx              # REPLACE: Skia implementation
│   ├── __stories__/
│   │   └── LineChart.stories.tsx     # UPDATE: Show new features
│   └── index.ts                      # No changes
├── utils/
│   ├── skia/                         # NEW: Skia-specific utilities
│   │   ├── fonts.ts                  # Font helpers (useChartFont hook)
│   │   ├── paths.ts                  # Path conversion helpers
│   │   ├── text.ts                   # Text positioning & measurement
│   │   └── index.ts
│   └── ...existing utils             # Keep all existing (scale, axis, etc.)
```

**Note**: Remove `SkiaCartesianChart.tsx` and `SkiaPath.tsx` once we migrate the main files.

---

## Utility Implementations

### New File: `utils/skia/fonts.ts`

````typescript
import { useMemo } from 'react';
import type { Font } from '@shopify/react-native-skia';
import { matchFont } from '@shopify/react-native-skia';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTheme } from '@coinbase/cds-mobile';

/**
 * Hook to create a Skia Font from CDS theme font families
 * @param fontFamily - Optional CDS font family key. Defaults to 'label2'
 * @returns Skia Font object ready for rendering
 *
 * @example
 * ```tsx
 * const font = useChartFont(); // Uses 'label2' default
 * const customFont = useChartFont('headline'); // Uses 'headline'
 * ```
 */
export const useChartFont = (fontFamily?: ThemeVars.FontFamily): Font => {
  const theme = useTheme();

  return useMemo(() => {
    // Default to 'label2' for chart text (12px, good for axes/labels)
    const font = fontFamily ?? 'label2';

    // Get font properties from theme (same as Text component)
    const config = {
      fontFamily: theme.fontFamily[font],
      fontSize: theme.fontSize[font],
      fontWeight: theme.fontWeight[font],
    };

    return matchFont(config);
  }, [fontFamily, theme]);
};
````

### New File: `utils/skia/text.ts`

```typescript
import type { Font } from '@shopify/react-native-skia';

/**
 * Measure text dimensions using Skia font
 */
export const measureText = (font: Font, text: string) => {
  return font.measureText(text);
};

/**
 * Calculate baseline-adjusted Y position for text
 * Skia positions text by baseline, this helper adjusts for visual alignment
 */
export const calculateTextBaseline = (
  y: number,
  fontSize: number,
  verticalAlign: 'top' | 'middle' | 'bottom' = 'middle',
): number => {
  switch (verticalAlign) {
    case 'top':
      return y + fontSize;
    case 'middle':
      return y + fontSize / 2.5; // Empirically determined
    case 'bottom':
      return y;
  }
};

/**
 * Calculate horizontally aligned X position based on text width
 */
export const calculateTextX = (
  x: number,
  textWidth: number,
  align: 'start' | 'center' | 'end' = 'start',
): number => {
  switch (align) {
    case 'center':
      return x - textWidth / 2;
    case 'end':
      return x - textWidth;
    default:
      return x;
  }
};

/**
 * Helper to calculate both X and Y positions with alignment
 */
export const calculateTextPosition = (
  x: number,
  y: number,
  font: Font,
  text: string,
  options: {
    horizontalAlign?: 'start' | 'center' | 'end';
    verticalAlign?: 'top' | 'middle' | 'bottom';
  } = {},
) => {
  const { width } = font.measureText(text);
  const fontSize = font.getSize();

  return {
    x: calculateTextX(x, width, options.horizontalAlign),
    y: calculateTextBaseline(y, fontSize, options.verticalAlign),
    width,
    height: fontSize,
  };
};
```

---

## Potential Issues & Mitigation

### Issue 1: Font Rendering Differences

**Risk**: Text might look different between SVG and Skia
**Mitigation**:

- Use platform-specific system fonts
- Provide font matching guide
- Allow exact font customization

### Issue 2: Animation Timing

**Risk**: Skia animations might feel different
**Mitigation**:

- Match easing curves exactly
- Tune durations to feel equivalent
- A/B test with users

### Issue 3: Bundle Size

**Risk**: Adding Skia increases bundle size
**Mitigation**:

- Make Skia optional peer dependency
- Tree-shake unused components
- Document bundle impact

### Issue 4: Learning Curve

**Risk**: Developers unfamiliar with Skia API
**Mitigation**:

- Comprehensive documentation
- Migration examples
- Office hours / support

### Issue 5: Platform Compatibility

**Risk**: Skia might have platform-specific bugs
**Mitigation**:

- Extensive device testing
- Fallback to SVG if Skia fails
- Clear platform support matrix

---

## Success Metrics

### Performance

- [ ] 60 FPS during animations (vs 30-45 FPS with SVG)
- [ ] Scrubbing latency < 16ms (vs 50+ms with SVG)
- [ ] Chart mount time < 200ms

### Adoption

- [ ] 80% of new charts use Skia
- [ ] 50% of existing charts migrated in 6 months
- [ ] Zero P0 bugs related to Skia

### Developer Experience

- [ ] < 5 minute migration for simple chart
- [ ] < 1 day migration for complex chart
- [ ] Positive feedback from 90% of developers

---

## Next Steps

### Immediate (This Week)

1. Complete SkiaCartesianChart base implementation
2. Migrate Line component to SkiaLine
3. Create comprehensive Scrubber example

### Short-term (This Month)

1. Complete Phase 2 components
2. Add comprehensive tests
3. Write migration guide

### Long-term (This Quarter)

1. Complete all Phase 3-5 components
2. Performance benchmarking
3. Community feedback & iteration

---

## Decisions Made ✅

1. **✅ Naming Convention**: Keep same names (`Line`, not `SkiaLine`)
   - Beta status allows breaking changes
   - Cleaner API
   - No dual-version maintenance

2. **Font Customization**: Both global and per-component
   - Global defaults (platform-specific)
   - Optional per-component overrides
   - Falls back to sensible defaults

3. **Animation Strategy**: Optimize for Skia
   - Use Skia's native path trimming (`end` prop)
   - Better performance than d3-interpolate
   - Simpler implementation

4. **Backward Compatibility**: N/A - Complete replacement
   - Beta status = breaking changes OK
   - Document changes in migration guide
   - Provide before/after examples

## Open Questions

1. **Component Priority**: Which components do you use most?
   - Helps prioritize migration order
   - Focus on high-impact components first

2. **Web Feature Parity**: Any specific web features you want?
   - Side-positioned labels ✅ (already done in PerformanceDemo)
   - Multi-axis support?
   - Advanced gradients?
   - Custom animations?

3. **Testing Strategy**: What's your testing setup?
   - Do you have visual regression tests?
   - Performance benchmarks?
   - E2E tests we should maintain?

---

## Resources

- [Skia Documentation](https://shopify.github.io/react-native-skia/)
- [Web Scrubber Reference](packages/web-visualization/src/chart/scrubber/Scrubber.tsx)
- [Performance Demo Example](packages/mobile-visualization/src/chart/__stories__/SkiaChart.stories.tsx)
- [Migration Guide](packages/mobile-visualization/SKIA_MIGRATION.md)
