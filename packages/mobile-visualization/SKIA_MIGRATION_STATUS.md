# Skia Migration - Current Status

## ✅ Phase 1: Foundation Complete!

### What's Done

#### 1. **Skia Utilities** (`src/chart/utils/skia/`)

Created theme-integrated utility functions for Skia rendering:

**`fonts.ts`**:

```typescript
export const useChartFont = (fontFamily?: ThemeVars.FontFamily): SkFont
```

- Leverages existing CDS theme fonts (same as `Text` component)
- Defaults to `'label2'` (12px) - perfect for axes and labels
- Automatically handles font weight conversion for Skia compatibility
- Works with all theme font families: `'headline'`, `'label1'`, `'caption'`, etc.

**`text.ts`**:

```typescript
// Text measurement (easier than SVG!)
export const measureText = (font: SkFont, text: string)

// Text positioning helpers
export const calculateTextBaseline(y, fontSize, verticalAlign)
export const calculateTextX(x, textWidth, align)
export const calculateTextPosition(x, y, font, text, options)
```

**Key Benefits**:

- ✅ **Zero breaking changes** - uses theme defaults
- ✅ **Consistent with CDS** - same font system as `Text`
- ✅ **Easier than SVG** - built-in text measurement via `font.measureText()`
- ✅ **Fully tested** - 8 passing unit tests

#### 2. **Updated PerformanceDemo**

The interactive chart demo now uses `useChartFont()`:

**Before**:

```typescript
const labelFont = useMemo(() => {
  const fontFamily = Platform.select({ ios: 'Helvetica', default: 'sans-serif' });
  return matchFont({
    fontFamily,
    fontSize: 13,
    fontWeight: 'bold',
  });
}, []);
```

**After**:

```typescript
const labelFont = useChartFont('label2'); // That's it!
```

### Testing Status

✅ **Type checking**: All passing  
✅ **Unit tests**: 8/8 passing (text utilities)  
✅ **Demo working**: PerformanceDemo using new utilities

---

## 📋 Next Steps: Component Migration

Following the migration plan in `SKIA_MIGRATION_PLAN.md`:

### Phase 2: Core Components (Week 1)

**Priority**: Foundation components that everything else depends on

#### 2.1 CartesianChart ← Canvas Container

- [ ] Replace `<Svg>` with `<Canvas>`
- [ ] Keep existing provider/context system
- [ ] Maintain all props (series, height, padding, etc.)
- [ ] Timeline: 2-3 days

#### 2.2 Path ← Basic Rendering Primitive

- [ ] Replace SVG Path with `Skia.Path.MakeFromSVGString()`
- [ ] Keep all existing props (d, fill, stroke, strokeWidth)
- [ ] Timeline: 1 day

#### 2.3 Line/SolidLine/DottedLine/GradientLine

- [ ] Replace implementations with Skia Paths
- [ ] Keep all props (seriesId, curve, type, stroke, etc.)
- [ ] Optional (Phase 2): Add `pointLabelFont?: ThemeVars.FontFamily`
- [ ] Timeline: 2-3 days

### Phase 3: Interactive Components (Week 2)

#### 3.1 Scrubber

- [ ] Replace SVG with Skia (Circle, RoundedRect, Text)
- [ ] Use existing PerformanceDemo as reference
- [ ] Use `useChartFont()` for labels
- [ ] Use `font.measureText()` for dynamic sizing
- [ ] Timeline: 2-3 days

#### 3.2 Point

- [ ] Replace SVG Circle with Skia Circle
- [ ] Keep all existing props
- [ ] Timeline: 1 day

### Phase 4: Axes & Text (Week 2-3)

#### 4.1 XAxis/YAxis

- [ ] Replace SVG with Skia Path + Text
- [ ] Use `useChartFont()` for tick labels
- [ ] Use `font.measureText()` for label positioning
- [ ] Optional: Add `tickLabelFont`, `axisLabelFont` props
- [ ] Timeline: 3-4 days per axis

#### 4.2 ChartText

- [ ] Replace SVG Text with Skia Text
- [ ] Use `useChartFont()` for theme fonts
- [ ] Use `calculateTextPosition()` for alignment
- [ ] Timeline: 2 days

### Phase 5: Specialized Components (Week 3)

- [ ] Area/SolidArea/GradientArea
- [ ] Bar/BarChart
- [ ] ReferenceLine
- [ ] Other specialty components

---

## 🎯 Migration Strategy

### Core Principles

1. **Keep component names** - `Line`, `CartesianChart`, `Scrubber` (not `SkiaLine`, etc.)
2. **Replace implementations** - Swap SVG for Skia under the hood
3. **Breaking changes OK** - We're in beta
4. **Theme fonts first** - Use `useChartFont()` without props initially
5. **Font customization later** - Add optional font props in Phase 2

### Developer Experience

**Phase 1 (Now)** - Works automatically:

```typescript
<CartesianChart series={data} height={200}>
  <Line seriesId="price" stroke="#0052FF" strokeWidth={2} />
  <Scrubber /> {/* Uses theme fonts automatically */}
  <XAxis /> {/* Uses theme fonts automatically */}
</CartesianChart>
```

**Phase 2 (Later)** - Optional customization:

```typescript
<CartesianChart series={data} height={200}>
  <Line seriesId="price" stroke="#0052FF" strokeWidth={2} />
  <Scrubber labelFont="label1" /> {/* Customize if needed */}
  <XAxis tickLabelFont="caption" /> {/* Customize if needed */}
</CartesianChart>
```

---

## 🧪 Testing Approach

- **Keep existing tests** - Logic tests stay the same
- **Add Skia-specific tests** - Font handling, path generation, measurement
- **Mock Skia in tests** - Use jest mocks for `@shopify/react-native-skia`
- **Visual regression** - Compare SVG vs Skia rendered outputs

---

## 📊 Progress Tracker

- [x] **Foundation**: Skia utilities + tests (Phase 1) ✅
- [ ] **Core Components**: CartesianChart, Path, Line (Phase 2)
- [ ] **Interactive**: Scrubber, Point (Phase 3)
- [ ] **Axes**: XAxis, YAxis, ChartText (Phase 4)
- [ ] **Specialized**: Area, Bar, etc. (Phase 5)

---

## 🔗 Related Documents

- **`SKIA_MIGRATION_PLAN.md`** - Complete migration strategy and component breakdown
- **`SKIA_WORKING.md`** - Working examples and learnings
- **`SKIA_QUICK_START.md`** - Quick reference for using Skia utilities

---

## 🚀 Ready to Continue!

The foundation is solid. All utilities are:

- ✅ Type-safe
- ✅ Tested
- ✅ Theme-integrated
- ✅ Working in PerformanceDemo

Ready to start Phase 2: **CartesianChart migration**! 🎉
