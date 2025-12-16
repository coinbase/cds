# Material UI (MUI X Charts): Bar Chart Orientation Implementation

## Executive Summary

Material UI's core library (`@mui/material`) does not include native charting components. Charting functionality is provided by a separate premium package called **MUI X Charts** (`@mui/x-charts`). The library implements horizontal bar chart orientation through a simple `layout` prop that accepts either `"vertical"` (default) or `"horizontal"`, with the orientation affecting axis configuration, bar dimension calculations, and animation behavior.

## Overview

MUI X Charts is a separate package in the MUI ecosystem that provides data visualization components built on D3.js. The BarChart component supports both vertical (default) and horizontal orientations through a declarative `layout` prop. This research examines the implementation details of how orientation is handled throughout the component architecture.

## Key Findings

### 1. Package Architecture

MUI X Charts is a standalone package separate from Material UI core:

- **Package**: `@mui/x-charts`
- **Repository**: https://github.com/mui/mui-x
- **Import**: `import { BarChart } from '@mui/x-charts/BarChart'`

The charts package has no external charting library dependency (like Recharts or Victory). It is built directly on D3.js utilities, vendored as `@mui/x-charts-vendor`.

### 2. Layout Prop API Design

The orientation is controlled through a `layout` prop with a simple string union type:

```typescript
// From packages/x-charts/src/models/seriesType/bar.ts
export interface BarSeriesType {
  /**
   * Layout of the bars. All bar should have the same layout.
   * @default 'vertical'
   */
  layout?: 'horizontal' | 'vertical';
  // ... other properties
}
```

The prop can be applied at two levels:

1. **Chart level**: Apply to the entire BarChart component
2. **Series level**: Apply to individual series objects (for composition)

```tsx
// Chart-level layout (recommended for BarChart component)
<BarChart
  layout="horizontal"
  series={[{ data: [1, 2, 3] }]}
  yAxis={[{ scaleType: 'band', data: ['A', 'B', 'C'] }]}
/>

// Series-level layout (for composition with ChartContainer)
<ChartDataProvider
  series={[
    { type: 'bar', data: [1, 2, 3], layout: 'horizontal' }
  ]}
>
  <BarPlot />
</ChartDataProvider>
```

### 3. Axis Configuration Changes

When switching between layouts, the axis roles are swapped:

| Aspect | Vertical (default) | Horizontal |
|--------|-------------------|------------|
| Category axis | X-axis (`scaleType: 'band'`) | Y-axis (`scaleType: 'band'`) |
| Value axis | Y-axis (linear/numeric) | X-axis (linear/numeric) |
| Bar direction | Bottom to top | Left to right |

The `useBarChartProps` hook automatically configures axis defaults based on layout:

```typescript
// From packages/x-charts/src/BarChart/useBarChartProps.ts
const hasHorizontalSeries =
  layout === 'horizontal' ||
  (layout === undefined && series.some((item) => item.layout === 'horizontal'));

const defaultBandXAxis: AxisConfig<'band'>[] = React.useMemo(() => [{
  id: DEFAULT_X_AXIS_KEY,
  scaleType: 'band',
  data: Array.from({ length: maxDataLength }, (_, i) => i),
}], [series]);

// For horizontal: use band scale on Y-axis, linear on X-axis
const defaultXAxis = hasHorizontalSeries ? undefined : defaultBandXAxis;
const defaultYAxis = hasHorizontalSeries ? defaultBandYAxis : undefined;
```

### 4. Bar Dimension Calculation

The `getBarDimensions` function in `internals/getBarDimensions.ts` calculates bar positioning based on the `verticalLayout` flag:

```typescript
export function getBarDimensions(params: {
  verticalLayout: boolean;
  xAxisConfig: ComputedAxis;
  yAxisConfig: ComputedAxis;
  series: ChartSeriesDefaultized<'bar'>;
  dataIndex: number;
  numberOfGroups: number;
  groupIndex: number;
}) {
  const { verticalLayout, xAxisConfig, yAxisConfig } = params;

  // The "base" axis (categorical) switches based on layout
  const baseScaleConfig = (verticalLayout ? xAxisConfig : yAxisConfig) as ComputedAxis<'band'>;

  // ... calculate bar dimensions

  return {
    // Vertical: x from category, y from value
    // Horizontal: y from category, x from value
    x: verticalLayout ? xScale(baseValue)! + barOffset : startCoordinate,
    y: verticalLayout ? startCoordinate : yScale(baseValue)! + barOffset,
    height: verticalLayout ? barSize : barWidth,
    width: verticalLayout ? barWidth : barSize,
  };
}
```

Key insight: The function swaps which axis provides the bar's position vs. length based on layout orientation.

### 5. Animation Behavior

The `useAnimateBar` hook handles different animation start positions based on layout:

```typescript
// From packages/x-charts/src/hooks/animation/useAnimateBar.ts
export function useAnimateBar(props: UseAnimateBarParams): UseAnimateBarReturnValue {
  const initialProps = {
    // For vertical: bars grow from bottom (yOrigin) upward
    // For horizontal: bars grow from left (xOrigin) rightward
    x: props.layout === 'vertical' ? props.x : props.xOrigin,
    y: props.layout === 'vertical' ? props.yOrigin : props.y,
    width: props.layout === 'vertical' ? props.width : 0,
    height: props.layout === 'vertical' ? 0 : props.height,
  };
  // ... animation logic
}
```

### 6. Axis Highlight Behavior

The axis highlight adapts to the layout for proper hover effects:

```typescript
// From useBarChartProps.ts
const axisHighlightProps: ChartsAxisHighlightProps = {
  // Highlight band on the categorical axis
  ...(hasHorizontalSeries ? ({ y: 'band' } as const) : ({ x: 'band' } as const)),
  ...axisHighlight,
};
```

## Technical Implementation Details

### Component Hierarchy

```
BarChart
  -> useBarChartProps() - Processes layout, configures axes
  -> ChartDataProvider - Provides series data to children
  -> ChartsWrapper
    -> ChartsLegend
    -> ChartsSurface
      -> ChartsGrid
      -> BarPlot - Renders bar elements
        -> useBarPlotData() - Calculates bar dimensions
        -> BarElement - Individual bar rendering
          -> AnimatedBarElement - Handles animation
            -> useAnimateBar() - Layout-aware animation
      -> ChartsAxis
    -> ChartsTooltip
```

### Data Flow for Layout

1. **Input**: `layout="horizontal"` prop on BarChart
2. **Props Processing**: `useBarChartProps` detects horizontal layout
3. **Axis Defaults**: Y-axis gets `scaleType: 'band'`, X-axis gets numeric scale
4. **Series Transform**: All series get `layout: 'horizontal'` added
5. **Bar Calculation**: `getBarDimensions` uses `verticalLayout: false`
6. **Animation**: `useAnimateBar` animates from `xOrigin` rightward

### TypeScript Types

```typescript
// Layout type is defined inline in BarSeriesType
layout?: 'horizontal' | 'vertical';

// Processed bar data includes layout
export interface ProcessedBarSeriesData {
  seriesId: SeriesId;
  data: ProcessedBarData[];
  layout: 'vertical' | 'horizontal';
  xOrigin: number;
  yOrigin: number;
}

// BarElement requires layout prop
export type BarElementProps = {
  layout: 'horizontal' | 'vertical';
  // ...
};
```

## Code Examples

### Basic Horizontal Bar Chart

```tsx
import { BarChart } from '@mui/x-charts/BarChart';

const dataset = [
  { month: 'Jan', value: 21 },
  { month: 'Feb', value: 28 },
  { month: 'Mar', value: 41 },
];

export default function HorizontalBars() {
  return (
    <BarChart
      dataset={dataset}
      layout="horizontal"
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      xAxis={[{ label: 'Value' }]}
      series={[{ dataKey: 'value', label: 'Monthly Values' }]}
      height={300}
    />
  );
}
```

### Vertical Bar Chart (Default)

```tsx
import { BarChart } from '@mui/x-charts/BarChart';

export default function VerticalBars() {
  return (
    <BarChart
      // layout="vertical" is the default, can be omitted
      xAxis={[{ scaleType: 'band', data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
      series={[{ data: [35, 44, 24, 34] }]}
      height={300}
    />
  );
}
```

### Using Composition with Horizontal Layout

```tsx
import { ChartDataProvider } from '@mui/x-charts/ChartDataProvider';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsAxis } from '@mui/x-charts/ChartsAxis';

export default function ComposedHorizontalBars() {
  return (
    <ChartDataProvider
      series={[
        { type: 'bar', data: [1, 2, 3], layout: 'horizontal' }
      ]}
      yAxis={[{ scaleType: 'band', data: ['A', 'B', 'C'] }]}
      xAxis={[{}]}
    >
      <BarPlot />
      <ChartsAxis />
    </ChartDataProvider>
  );
}
```

## Strengths

- **Simple API**: Single `layout` prop with clear `'horizontal' | 'vertical'` values
- **Automatic axis configuration**: Library handles axis role swapping automatically
- **Consistent behavior**: All bar chart features (stacking, labels, borders, animations) work identically in both orientations
- **TypeScript support**: Strong typing with clear prop types and documentation
- **Composable**: Layout can be set at chart level or per-series for composition scenarios
- **Animation-aware**: Bars animate from the correct origin (left for horizontal, bottom for vertical)

## Considerations & Trade-offs

- **Mixed layouts not supported**: All bar series in a chart must share the same layout orientation
- **Axis reconfiguration required**: Switching layout requires understanding that the categorical axis moves from X to Y
- **No "direction" alias**: Uses `layout` not `orientation` or `direction` which might be more intuitive to some developers
- **Composition complexity**: When using composition, layout must be set on each series object rather than a container prop

## Relevance to CDS

This research provides insights for implementing horizontal bar chart orientation in CDS:

1. **Prop naming**: The `layout` prop with `'horizontal' | 'vertical'` values is clear and intuitive. CDS could adopt this pattern or use an alternative like `orientation`.

2. **Default behavior**: Vertical is a sensible default as it's the most common bar chart orientation.

3. **Axis handling**: The automatic swapping of categorical/value axes based on layout reduces developer cognitive load. CDS should consider similar automatic axis configuration.

4. **Animation consideration**: Layout should affect animation origin (bars should grow from the axis baseline regardless of orientation).

5. **Composition support**: If CDS supports chart composition, consider how layout propagates through the component tree.

6. **Type safety**: The strict TypeScript typing (`'horizontal' | 'vertical'`) prevents invalid values and provides good IDE autocomplete support.

## References

- Source code: `.claude/research/cache/mui-x/packages/x-charts/src/BarChart/`
- BarChart component: `BarChart.tsx`
- Layout prop handling: `useBarChartProps.ts`
- Bar dimension calculation: `../internals/getBarDimensions.ts`
- Animation: `../hooks/animation/useAnimateBar.ts`
- Series type definition: `../models/seriesType/bar.ts`
- Documentation: https://mui.com/x/react-charts/bars/
- Horizontal bars demo: `.claude/research/cache/mui-x/docs/data/charts/bars/HorizontalBars.tsx`
