# Mantine: Bar Chart Orientation Implementation

## Executive Summary

Mantine's BarChart component wraps [Recharts](https://recharts.org) and exposes chart orientation through a simple `orientation` prop with values `'horizontal'` (default) or `'vertical'`. The implementation handles the complexity of axis configuration internally, shielding developers from Recharts' counterintuitive naming conventions where `layout="vertical"` creates horizontal bars.

## Overview

Mantine Charts (`@mantine/charts`) is a charting package built on top of Recharts, providing React components that integrate with Mantine's theming system. The package supports various chart types including BarChart, AreaChart, LineChart, and more. This research focuses specifically on how Mantine implements horizontal bar chart support through orientation configuration.

## Key Findings

### 1. External Library Dependency

Mantine does **not** implement charting from scratch. Instead, it wraps Recharts (`recharts >= 2.13.3`) as a peer dependency:

```json
// package.json
{
  "peerDependencies": {
    "recharts": ">=2.13.3"
  }
}
```

The BarChart component imports directly from Recharts:

```tsx
import {
  Bar,
  BarProps,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  LabelListProps,
  Legend,
  BarChart as ReChartsBarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
```

### 2. Orientation Prop Design

The orientation prop is defined in a shared `GridChartBaseProps` interface, making it consistent across BarChart, AreaChart, and LineChart:

```tsx
// types.ts
export interface GridChartBaseProps {
  /** Chart orientation, `'horizontal'` by default */
  orientation?: 'horizontal' | 'vertical';
  // ... other props
}
```

**Important terminology clarification:**
- `orientation="horizontal"` = Standard vertical bars (bars grow upward from X-axis) - **DEFAULT**
- `orientation="vertical"` = Horizontal bars (bars grow rightward from Y-axis)

This naming aligns with Recharts' `layout` prop, which can be confusing. Mantine preserves this convention to maintain consistency with the underlying library.

### 3. Implementation Details

The orientation prop is passed directly to Recharts' `layout` prop:

```tsx
// BarChart.tsx
<ReChartsBarChart
  data={inputData}
  stackOffset={type === 'percent' ? 'expand' : undefined}
  layout={orientation}  // Direct pass-through
  maxBarSize={maxBarWidth}
  // ...
>
```

However, Mantine handles axis configuration automatically based on orientation:

#### XAxis Configuration

```tsx
<XAxis
  hide={!withXAxis}
  {...(orientation === 'vertical' ? { type: 'number' } : { dataKey })}
  // When vertical: XAxis becomes numeric (values)
  // When horizontal: XAxis uses dataKey (categories)
  tickFormatter={orientation === 'vertical' ? tickFormatter : undefined}
  // ...
/>
```

#### YAxis Configuration

```tsx
const sharedYAxisProps = {
  axisLine: false,
  ...(orientation === 'vertical'
    ? { dataKey, type: 'category' as const }
    : { type: 'number' as const }),
  // When vertical: YAxis becomes categorical (labels)
  // When horizontal: YAxis is numeric (values)
  tickFormatter: orientation === 'vertical' ? undefined : tickFormatter,
  // ...
};
```

### 4. Orientation-Aware Features

Several features adapt based on orientation:

#### Bar Value Labels

```tsx
{withBarValueLabel && (
  <LabelList
    position={orientation === 'vertical' ? 'right' : 'top'}
    // Labels appear on top for horizontal layout, right for vertical
    // ...
  />
)}
```

#### Tooltip Positioning

```tsx
<Tooltip
  position={orientation === 'vertical' ? {} : { y: 0 }}
  // Different positioning strategies per orientation
  // ...
/>
```

#### CSS Modifier

```tsx
<Box
  mod={[{ orientation }, mod]}
  // Adds data-orientation attribute for CSS targeting
  // ...
>
```

### 5. No Explicit Default in BarChart

Interestingly, the BarChart component does **not** set a default for orientation in its `defaultProps`:

```tsx
const defaultProps = {
  withXAxis: true,
  withYAxis: true,
  withTooltip: true,
  tooltipAnimationDuration: 0,
  fillOpacity: 1,
  tickLine: 'y',
  strokeDasharray: '5 5',
  gridAxis: 'x',
  type: 'default',
  // No orientation default - relies on undefined = horizontal behavior
} satisfies Partial<BarChartProps>;
```

In contrast, AreaChart explicitly sets the default:

```tsx
// AreaChart.tsx
const defaultProps = {
  orientation: 'horizontal',
  // ...
};
```

This is an inconsistency in Mantine's implementation.

## Code Examples

### Horizontal Bar Chart (orientation="vertical")

```tsx
import { BarChart } from '@mantine/charts';

const data = [
  { month: 'January', Smartphones: 120, Laptops: 150 },
  { month: 'February', Smartphones: 80, Laptops: 100 },
  { month: 'March', Smartphones: 50, Laptops: 60 },
];

function HorizontalBarChart() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      orientation="vertical"  // Creates horizontal bars
      yAxisProps={{ width: 80 }}  // Important: allocate space for labels
      series={[
        { name: 'Smartphones', color: 'violet.6' },
        { name: 'Laptops', color: 'blue.6' },
      ]}
    />
  );
}
```

### Vertical Bar Chart (Default)

```tsx
import { BarChart } from '@mantine/charts';

function VerticalBarChart() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      // orientation="horizontal" is the default (omitted)
      series={[
        { name: 'Smartphones', color: 'violet.6' },
        { name: 'Laptops', color: 'blue.6' },
      ]}
    />
  );
}
```

### Horizontal Stacked Bar Chart

```tsx
function HorizontalStackedBarChart() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      orientation="vertical"
      type="stacked"
      yAxisProps={{ width: 80 }}
      series={[
        { name: 'Smartphones', color: 'violet.6' },
        { name: 'Laptops', color: 'blue.6' },
      ]}
      withLegend
      withBarValueLabel
    />
  );
}
```

### With Value Formatter

```tsx
function FormattedHorizontalChart() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      orientation="vertical"
      valueFormatter={(value) => `${value}%`}
      yAxisProps={{ width: 80 }}
      series={[
        { name: 'Smartphones', color: 'violet.6' },
      ]}
    />
  );
}
```

## Strengths

- **Simple API**: Single prop (`orientation`) controls chart direction without requiring manual axis reconfiguration
- **Automatic axis type handling**: Mantine internally manages the XAxis/YAxis `type` and `dataKey` swapping that Recharts requires
- **Consistent across chart types**: Same `orientation` prop works for BarChart, AreaChart, and LineChart
- **Feature parity**: All features (stacking, legends, tooltips, value labels) work in both orientations
- **Theme integration**: Colors, fonts, and styles integrate with Mantine's theming system

## Considerations & Trade-offs

- **Confusing naming**: The `orientation="vertical"` name for horizontal bars inherits Recharts' counterintuitive terminology. This refers to the layout/coordinate system orientation, not the visual bar direction.
- **Missing default**: BarChart doesn't explicitly set `orientation: 'horizontal'` in defaultProps unlike AreaChart
- **External dependency**: Requires Recharts as a peer dependency, adding bundle size
- **Y-axis width**: Developers must manually set `yAxisProps={{ width: N }}` for horizontal bars to prevent label truncation
- **No `'left'` / `'right'` values**: Unlike some libraries, Mantine doesn't offer intuitive direction-based values

## Alternative Naming Approaches

For reference, some design systems use more intuitive naming:
- `direction="horizontal" | "vertical"` where value matches visual bar direction
- `layout="horizontal" | "vertical"` (same as Recharts, same confusion)
- `barOrientation="horizontal" | "vertical"`

## Relevance to CDS

If CDS implements charting components:

1. **Consider alternative naming**: A `direction` or `layout` prop with values like `"horizontal"` (bars go right) and `"vertical"` (bars go up) would be more intuitive than Mantine's inherited Recharts terminology.

2. **Automatic axis configuration**: Follow Mantine's pattern of handling axis type swapping internally rather than exposing this complexity to developers.

3. **Explicit defaults**: Always set explicit defaults in component defaultProps for clarity.

4. **Consider native implementation**: While Recharts integration is faster to build, a native D3 or Canvas-based implementation would provide more control and potentially smaller bundle size.

5. **Y-axis width automation**: Consider automatically calculating y-axis width based on label length for horizontal bar charts.

## References

- Source code: `/Users/erichkuerschner/workspace/cds-public/.claude/research/cache/mantine/packages/@mantine/charts/src/BarChart/BarChart.tsx`
- Types definition: `/Users/erichkuerschner/workspace/cds-public/.claude/research/cache/mantine/packages/@mantine/charts/src/types.ts`
- Story examples: `/Users/erichkuerschner/workspace/cds-public/.claude/research/cache/mantine/packages/@mantine/charts/src/BarChart/BarChart.story.tsx`
- [Mantine BarChart Documentation](https://mantine.dev/charts/bar-chart/)
- [Recharts Layout Issue #90](https://github.com/recharts/recharts/issues/90) - Discussion on confusing naming
- [Mantine Charts Package](https://github.com/mantinedev/mantine/tree/master/packages/@mantine/charts)
