# Chart Orientation Comparative Analysis
## How Component Libraries Implement Horizontal vs Vertical Bar Charts

**Research Date:** December 16, 2025
**Researcher:** Claude Code (design-system-researcher agents)
**Design Systems Analyzed:** Material UI, Base UI, Radix Primitives, Mantine, Ant Design

---

## Executive Summary

This research investigates how major open-source design systems implement the ability for bar charts to render horizontally (bars extending rightward) versus vertically (bars extending upward). The findings reveal two dominant approaches:

1. **Single Component with Orientation Prop** (Material UI, Mantine): Use a single chart component with an `orientation` or `layout` prop
2. **Separate Components** (Ant Design): Provide distinct `Bar` (horizontal) and `Column` (vertical) components

**Key Finding:** Of the five design systems investigated, **only three have charting capabilities** (Material UI via MUI X Charts, Mantine, and Ant Design Charts). Base UI and Radix Primitives do not provide chart components, though Radix's consistent `orientation` pattern across UI primitives offers valuable API design insights.

---

## System-by-System Breakdown

### 1. Material UI (MUI X Charts)

**Approach:** Single component with `layout` prop

**Status:** ✅ Has native charting (MUI X Charts package, built on D3)

**API Design:**
```tsx
<BarChart
  layout="horizontal" // or "vertical" (default)
  series={[{ data: [1, 2, 3] }]}
  yAxis={[{ scaleType: 'band', data: ['A', 'B', 'C'] }]}
/>
```

**Key Implementation Details:**
- Prop: `layout?: 'horizontal' | 'vertical'` (default: `'vertical'`)
- Automatically swaps axis types: categorical axis moves from X to Y when horizontal
- Animation origin adapts: bars grow from left (horizontal) or bottom (vertical)
- Type safety with strict TypeScript unions
- Built directly on D3 utilities without external chart library dependency

**Strengths:**
- Simple, single-prop API
- Automatic axis configuration
- Animation-aware
- Composable architecture

**Considerations:**
- Mixed layouts not supported (all bars must share same orientation)
- Requires understanding that categorical axis moves between X and Y

**Report:** `.claude/research/material-ui-bar-chart-orientation-2025-12-16.md`

---

### 2. Base UI

**Approach:** N/A - No charting components

**Status:** ❌ Does not have charting capabilities

**Key Findings:**
- Base UI is a headless UI component library focused on accessible primitives (dialogs, menus, forms)
- All 43 components are UI-focused: no visualization or chart components
- Closest to data representation: `Meter` and `Progress` (single-value indicators, not multi-point charts)
- Charts exist elsewhere in MUI ecosystem (MUI X Charts)

**Relevance to CDS:**
- Cannot inform chart orientation patterns
- Reinforces that headless UI libraries typically exclude visualization components
- Suggests keeping chart functionality separate from core UI primitives

**Report:** `.claude/research/base-ui-chart-orientation-2025-12-16.md`

---

### 3. Radix Primitives

**Approach:** N/A - No charting components, but offers transferable UI patterns

**Status:** ❌ Does not have charting capabilities

**Key Findings:**
- Radix focuses exclusively on UI primitives (28+ components), no data visualization
- However, Radix implements a **well-designed `orientation` pattern** across 10+ components (Slider, Separator, Tabs, Toggle Group, Toolbar, etc.)

**Radix's Orientation Pattern (Applicable to Charts):**

```typescript
// Consistent across all components
interface ComponentProps {
  orientation?: 'horizontal' | 'vertical'; // Default: 'horizontal'
}

// Always exposes data attribute for CSS
<Primitive.div data-orientation={orientation} />

// Type-safe definition pattern
const ORIENTATIONS = ['horizontal', 'vertical'] as const;
type Orientation = (typeof ORIENTATIONS)[number];
```

**Transferable Insights:**
- Component switching: Separate internal implementations for each orientation
- Context providers: Share orientation across compound components
- Keyboard navigation: Arrow keys adapt automatically to orientation
- Inversion support: `inverted` prop reverses direction within an orientation
- Data attributes: `data-orientation` enables CSS targeting

**Relevance to CDS:**
- Naming: Use `orientation` (not `layout` or `direction`) for consistency
- Default: Consider `'vertical'` for bar charts (upward growth is standard)
- Type pattern: `const ORIENTATIONS = ['horizontal', 'vertical'] as const`

**Report:** `.claude/research/radix-primitives-chart-orientation-2025-12-16.md`

---

### 4. Mantine

**Approach:** Single component with `orientation` prop (wraps Recharts)

**Status:** ✅ Has charting (via Recharts wrapper)

**API Design:**
```tsx
<BarChart
  orientation="vertical" // Creates horizontal bars (counterintuitive!)
  data={data}
  dataKey="month"
  yAxisProps={{ width: 80 }}
  series={[{ name: 'Sales', color: 'blue' }]}
/>
```

**Key Implementation Details:**
- Prop: `orientation?: 'horizontal' | 'vertical'` (default: `'horizontal'`)
- **Confusing naming inherited from Recharts:**
  - `orientation="horizontal"` = vertical bars (default)
  - `orientation="vertical"` = horizontal bars
- Wraps Recharts as peer dependency (`recharts >= 2.13.3`)
- Automatically handles axis type swapping (XAxis/YAxis roles switch)
- Passes orientation directly to Recharts' `layout` prop

**Orientation-Aware Features:**
- Bar value labels: Position `'right'` (vertical) or `'top'` (horizontal)
- Tooltip positioning: Adapts based on orientation
- CSS modifier: Adds `data-orientation` attribute

**Strengths:**
- Simple single-prop API
- Automatic axis configuration
- Feature parity in both orientations
- Theme integration with Mantine design system

**Considerations:**
- **Major UX issue:** Naming is counterintuitive (`orientation="vertical"` creates horizontal bars)
- External dependency adds bundle size
- Developers must manually set Y-axis width for horizontal bars
- Inconsistent defaults: BarChart doesn't explicitly set default, AreaChart does

**Report:** `.claude/research/mantine-bar-chart-orientation-2025-12-16.md`

---

### 5. Ant Design (Ant Design Charts)

**Approach:** Separate components (`Bar` vs `Column`)

**Status:** ✅ Has charting (via @ant-design/charts built on G2Plot)

**API Design:**
```tsx
// Vertical bars: Column component
<Column
  data={data}
  xField="category"  // Categories on horizontal axis
  yField="sales"     // Values on vertical axis
/>

// Horizontal bars: Bar component
<Bar
  data={data}
  xField="sales"     // Values on horizontal axis
  yField="category"  // Categories on vertical axis
/>
```

**Key Implementation Details:**
- **Two distinct components:** `<Bar>` (horizontal) and `<Column>` (vertical)
- No `orientation` or `layout` prop - orientation is implied by component choice
- Built on AntV ecosystem: @ant-design/charts → G2Plot → G2 → G rendering engine
- Field semantics change: `xField`/`yField` meanings swap between components
- Under the hood: Bar reuses Column via coordinate transformation (`transpose` + `reflectY`)

**TypeScript Pattern:**
```typescript
// Bar extends Column with renamed properties
interface BarOptions extends Omit<ColumnOptions, 'columnStyle' | 'columnWidthRatio'> {
  barStyle?: ColumnOptions['columnStyle'];
  barWidthRatio?: ColumnOptions['columnWidthRatio'];
  // ...
}
```

**Strengths:**
- Clear semantic distinction: Component name immediately indicates visual type
- Strong TypeScript support with proper inheritance
- Code reuse through adaptor pattern
- Comprehensive feature parity (grouping, stacking, percentage, range)

**Considerations:**
- Must conditionally render different components to toggle orientation programmatically
- Field semantics change between Bar and Column (cognitive overhead)
- External package required (@ant-design/charts separate from core antd)
- More complex debugging due to multi-layer architecture stack

**Report:** `.claude/research/ant-design-chart-orientation-2025-12-16.md`

---

## Comparative Analysis

### Approach Comparison

| Library | Has Charts? | Approach | Prop/Component | Default | External Dep |
|---------|------------|----------|----------------|---------|--------------|
| **Material UI** | ✅ (MUI X) | Single component | `layout` | `'vertical'` | D3 (vendored) |
| **Base UI** | ❌ | N/A | N/A | N/A | N/A |
| **Radix** | ❌ | N/A (but has UI orientation pattern) | `orientation` | `'horizontal'` (UI) | N/A |
| **Mantine** | ✅ | Single component | `orientation` | `'horizontal'`* | Recharts |
| **Ant Design** | ✅ (separate pkg) | Separate components | `<Bar>` vs `<Column>` | N/A | G2Plot |

*Naming is counterintuitive in Mantine

### API Patterns

#### Pattern 1: Single Component with Prop

**Advocates:** Material UI, Mantine

**Pros:**
- Simple API surface (one component to learn)
- Easy to toggle orientation programmatically
- Consistent feature set across orientations
- Natural for responsive designs

**Cons:**
- Requires understanding axis role swapping
- All bars must share same orientation (no mixed layouts)
- Potential for naming confusion (see Mantine)

**Code Example:**
```tsx
// Easy to make dynamic
const orientation = useMediaQuery('(min-width: 768px)') ? 'vertical' : 'horizontal';
<BarChart layout={orientation} {...config} />
```

#### Pattern 2: Separate Components

**Advocates:** Ant Design

**Pros:**
- Semantic clarity (component name = visual type)
- Aligns with traditional chart terminology ("bar chart" vs "column chart")
- Type safety: Distinct interfaces for each variant
- No prop confusion

**Cons:**
- More components in API surface
- Programmatic orientation toggle requires component switching
- Field semantic changes between components
- Potential code duplication without careful implementation

**Code Example:**
```tsx
// Requires conditional rendering
{isHorizontal ? (
  <Bar xField="value" yField="category" data={data} />
) : (
  <Column xField="category" yField="value" data={data} />
)}
```

### Naming Conventions

| Term | Material UI | Mantine | Ant Design | Radix (UI) |
|------|------------|---------|-----------|-----------|
| Prop name | `layout` | `orientation` | N/A | `orientation` |
| Vertical bars | `"vertical"` | `"horizontal"` ⚠️ | `<Column>` | N/A |
| Horizontal bars | `"horizontal"` | `"vertical"` ⚠️ | `<Bar>` | N/A |

⚠️ **Mantine's naming is counterintuitive**: Inherited from Recharts, where "orientation" refers to the coordinate system layout, not the visual bar direction.

### Implementation Strategies

#### Axis Swapping

All libraries that support orientation switching handle axis role swapping automatically:

**Material UI:**
```typescript
const defaultXAxis = hasHorizontalSeries ? undefined : defaultBandXAxis;
const defaultYAxis = hasHorizontalSeries ? defaultBandYAxis : undefined;
```

**Mantine:**
```tsx
<XAxis
  {...(orientation === 'vertical' ? { type: 'number' } : { dataKey })}
/>
<YAxis
  {...(orientation === 'vertical'
    ? { dataKey, type: 'category' }
    : { type: 'number' })}
/>
```

**Ant Design:**
```typescript
// Uses coordinate transformation instead
coordinate: [
  { type: 'transpose' },  // Swap X and Y
  { type: 'reflectY' }    // Mirror along Y
]
```

#### Animation Considerations

**Material UI** adapts animation origin:
```typescript
const initialProps = {
  x: layout === 'vertical' ? props.x : props.xOrigin,
  y: layout === 'vertical' ? props.yOrigin : props.y,
  width: layout === 'vertical' ? props.width : 0,
  height: layout === 'vertical' ? 0 : props.height,
};
```

Bars grow from:
- Vertical: Bottom upward
- Horizontal: Left rightward

---

## Key Insights & Patterns

### 1. Chart Orientation Is Not Universal in Design Systems

**Finding:** Only 60% (3/5) of surveyed design systems include charting capabilities.

**Implication:** Chart components are often treated as specialized, separate from core UI primitives. Base UI and Radix focus exclusively on UI controls, delegating visualization to external libraries or separate packages.

**For CDS:** CDS already follows industry best practice with separate `@coinbase/cds-web-visualization` and `@coinbase/cds-mobile-visualization` packages.

### 2. Two Dominant Philosophical Approaches

**Single Component Approach** (Material UI, Mantine):
- Treats orientation as a property/configuration of the chart
- Enables programmatic orientation switching
- Simpler API surface

**Separate Components Approach** (Ant Design):
- Treats bar and column charts as distinct visual types
- Aligns with traditional charting nomenclature
- Clearer semantic intent

### 3. Naming Matters Significantly

**Best Practice:** Use intuitive naming where the prop value matches visual appearance.

**Good:**
- Material UI: `layout="horizontal"` creates horizontal bars ✅
- Ant Design: `<Bar>` component creates horizontal bars ✅

**Confusing:**
- Mantine: `orientation="vertical"` creates horizontal bars ❌

**Recommendation for CDS:** If using prop-based orientation, choose names that match visual output:
- `orientation="horizontal"` → horizontal bars
- `direction="horizontal"` → horizontal bars
- `layout="horizontal"` → horizontal bars

### 4. Automatic Axis Configuration is Expected

All libraries handle the complexity of swapping axis types (categorical vs numeric) internally. Developers expect:
- **Vertical bars:** Categories on X-axis, values on Y-axis
- **Horizontal bars:** Values on X-axis, categories on Y-axis

**For CDS:** Automatic axis role swapping is table stakes. Don't require developers to manually reconfigure axes when changing orientation.

### 5. Radix's Transferable UI Patterns

Even though Radix doesn't have charts, its orientation implementation offers best practices:

```typescript
// Type-safe definition
const ORIENTATIONS = ['horizontal', 'vertical'] as const;
type Orientation = (typeof ORIENTATIONS)[number];

// Data attribute for CSS
<ChartRoot data-orientation={orientation} />

// Context sharing for compound components
const [ChartProvider, useChartContext] = createContext<{
  orientation: Orientation;
}>();
```

### 6. Animation Should Be Orientation-Aware

Charts should animate from the natural baseline:
- **Vertical bars:** Grow from bottom (Y=0) upward
- **Horizontal bars:** Grow from left (X=0) rightward

This creates intuitive visual feedback and maintains the perception of bars "growing" from their origin.

---

## Trade-offs Matrix

| Aspect | Single Component + Prop | Separate Components |
|--------|-------------------------|---------------------|
| **API Simplicity** | ✅ One component | ❌ Two components |
| **Semantic Clarity** | ⚠️ Requires docs | ✅ Self-documenting |
| **Programmatic Toggle** | ✅ Simple prop change | ❌ Component switching |
| **Type Safety** | ⚠️ Same interface | ✅ Distinct interfaces |
| **Feature Parity** | ✅ Natural | ⚠️ Requires discipline |
| **Learning Curve** | ✅ Lower | ⚠️ Higher (more to learn) |
| **Bundle Size** | ✅ Single implementation | ⚠️ Could be larger |
| **Traditional Nomenclature** | ❌ Doesn't align | ✅ Aligns with "bar" vs "column" |

---

## Recommendations for CDS

Based on this comparative analysis, here are actionable recommendations for the Coinbase Design System:

### 1. Choose the Single Component Approach

**Recommendation:** Implement a single `<BarChart>` component with an `orientation` prop.

**Rationale:**
- More flexible for responsive designs (easy to toggle based on viewport)
- Simpler API surface
- Aligns with CDS's D3-based architecture (Material UI also uses D3)
- Less code duplication
- Easier to ensure feature parity

### 2. Use Intuitive Prop Naming

**Recommendation:** Use `orientation` prop with intuitive values.

```tsx
interface BarChartProps {
  /**
   * The visual orientation of the bars.
   * - 'vertical': Bars extend upward from the bottom (default)
   * - 'horizontal': Bars extend rightward from the left
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
}
```

**Rationale:**
- `orientation` is more common than `layout` (3 out of 4 systems use it)
- Match visual appearance to prop value (avoid Mantine's confusion)
- Clear JSDoc explains the visual result

### 3. Default to Vertical Bars

**Recommendation:** Set `orientation="vertical"` as the default.

**Rationale:**
- Standard chart convention (bars grow upward)
- Matches Material UI's default
- Most common use case in financial/data visualization

### 4. Implement Automatic Axis Configuration

**Recommendation:** Automatically swap axis types based on orientation.

```typescript
// Pseudocode
if (orientation === 'horizontal') {
  xAxis = valueAxis;  // Numeric scale
  yAxis = categoryAxis;  // Band scale
} else {
  xAxis = categoryAxis;  // Band scale
  yAxis = valueAxis;  // Numeric scale
}
```

**Rationale:**
- Reduces developer cognitive load
- Matches expectations from other libraries
- Prevents common configuration errors

### 5. Support Orientation in Animation

**Recommendation:** Bars should animate from their natural baseline.

```typescript
// Pseudocode
const initialProps = orientation === 'horizontal'
  ? { width: 0, x: originX }  // Grow rightward
  : { height: 0, y: originY }; // Grow upward
```

**Rationale:**
- Creates intuitive visual feedback
- Matches Material UI's approach
- Maintains perception of growth from origin

### 6. Expose Data Attributes for Styling

**Recommendation:** Add `data-orientation` attribute to chart container.

```tsx
<svg data-orientation={orientation}>
  {/* chart content */}
</svg>
```

**Rationale:**
- Enables CSS-based styling (Radix pattern)
- Useful for responsive designs
- Follows web standards conventions

### 7. Consider Inversion Support (Future Enhancement)

**Recommendation:** Consider adding an `inverted` prop for reversing bar direction.

```tsx
interface BarChartProps {
  orientation?: 'vertical' | 'horizontal';
  /**
   * Reverses the direction of bar growth.
   * - vertical + inverted: Bars grow downward
   * - horizontal + inverted: Bars grow leftward
   */
  inverted?: boolean;
}
```

**Rationale:**
- Radix demonstrates this pattern well
- Useful for waterfall charts, diverging charts
- Common in financial visualizations (gains/losses)

### 8. Maintain Feature Parity Across Orientations

**Recommendation:** Ensure all chart features work identically in both orientations:
- Stacking (stacked bars)
- Grouping (grouped bars)
- Labels (data labels on bars)
- Tooltips
- Legends
- Animations
- Accessibility

**Rationale:**
- Prevents developer frustration
- Reduces bug surface area
- All successful implementations maintain parity

---

## Proposed CDS API Design

Based on all insights, here's a recommended API for CDS bar chart orientation:

```tsx
import { BarChart } from '@coinbase/cds-web-visualization';

// Example 1: Vertical bar chart (default)
<BarChart
  data={salesData}
  xField="month"
  yField="revenue"
  height={400}
/>

// Example 2: Horizontal bar chart
<BarChart
  data={salesData}
  orientation="horizontal"
  xField="revenue"
  yField="month"
  height={400}
/>

// Example 3: Responsive orientation
const orientation = useMediaQuery('(min-width: 768px)')
  ? 'vertical'
  : 'horizontal';

<BarChart
  data={salesData}
  orientation={orientation}
  xField={orientation === 'vertical' ? 'month' : 'revenue'}
  yField={orientation === 'vertical' ? 'revenue' : 'month'}
  height={400}
/>

// Example 4: Inverted bars (future)
<BarChart
  data={lossData}
  orientation="vertical"
  inverted
  // Bars grow downward for losses
  height={400}
/>
```

### Type Definitions

```typescript
export const CHART_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type ChartOrientation = (typeof CHART_ORIENTATIONS)[number];

export interface BarChartProps {
  /**
   * The visual orientation of the bars.
   *
   * - `'vertical'`: Bars extend upward from the bottom X-axis (default)
   * - `'horizontal'`: Bars extend rightward from the left Y-axis
   *
   * When switching orientation, you should also swap your `xField` and
   * `yField` values to maintain correct data mapping.
   *
   * @default 'vertical'
   *
   * @example
   * // Vertical bars
   * <BarChart orientation="vertical" xField="category" yField="value" />
   *
   * @example
   * // Horizontal bars
   * <BarChart orientation="horizontal" xField="value" yField="category" />
   */
  orientation?: ChartOrientation;

  /**
   * Reverses the direction of bar growth within the specified orientation.
   *
   * - `vertical + inverted`: Bars grow downward from the top
   * - `horizontal + inverted`: Bars grow leftward from the right
   *
   * Useful for waterfall charts, diverging charts, and financial
   * visualizations showing losses.
   *
   * @default false
   */
  inverted?: boolean;

  // ... other props
}
```

---

## Additional Resources

### Individual Research Reports

All detailed reports are available in `.claude/research/`:

1. **Material UI**: `material-ui-bar-chart-orientation-2025-12-16.md`
   - MUI X Charts implementation
   - `layout` prop with D3-based rendering

2. **Base UI**: `base-ui-chart-orientation-2025-12-16.md`
   - No charting capabilities
   - Headless UI library scope analysis

3. **Radix Primitives**: `radix-primitives-chart-orientation-2025-12-16.md`
   - No charting capabilities
   - Transferable `orientation` patterns from UI components

4. **Mantine**: `mantine-bar-chart-orientation-2025-12-16.md`
   - Recharts wrapper implementation
   - `orientation` prop (counterintuitive naming)

5. **Ant Design**: `ant-design-chart-orientation-2025-12-16.md`
   - Separate `<Bar>` and `<Column>` components
   - G2Plot coordinate transformation approach

### External Documentation Links

- [Material UI X Charts - Bar Charts](https://mui.com/x/react-charts/bars/)
- [Mantine Charts - BarChart](https://mantine.dev/charts/bar-chart/)
- [Ant Design Charts](https://ant-design-charts.antgroup.com)
- [Recharts Documentation](https://recharts.org)
- [G2Plot Documentation](https://g2plot.antv.antgroup.com)
- [Radix Primitives - Orientation Patterns](https://www.radix-ui.com/primitives)

### Related Topics for Further Research

1. **Bidirectional/Diverging Bar Charts**: How to handle bars extending in both directions from a center axis
2. **Mixed Orientation Support**: Whether to support different orientations within the same chart
3. **Accessibility**: ARIA patterns for oriented charts
4. **Animation Performance**: Performance comparison of different animation approaches
5. **Mobile Optimization**: Best orientation defaults for mobile viewports

---

## Conclusion

The research reveals that **single component with orientation prop** is the more common and flexible approach, used by Material UI and Mantine. While Ant Design's separate components approach has merit for semantic clarity, the programmatic flexibility and simpler API surface of the prop-based approach makes it a better fit for CDS.

Key success factors for implementation:
1. ✅ Use intuitive naming (`orientation="horizontal"` = horizontal bars)
2. ✅ Default to vertical bars (industry standard)
3. ✅ Handle axis configuration automatically
4. ✅ Make animations orientation-aware
5. ✅ Maintain feature parity across orientations
6. ✅ Expose data attributes for styling
7. ✅ Provide clear TypeScript types and documentation

The recommended API design balances developer ergonomics, industry conventions, and CDS's existing D3-based architecture to provide a best-in-class bar chart orientation implementation.
