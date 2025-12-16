# Ant Design: Chart Orientation Implementation

## Executive Summary

Ant Design does not include native charting components in its core library. Instead, it officially recommends **Ant Design Charts** (@ant-design/charts), which is built on top of **G2Plot** from the AntV visualization ecosystem. For horizontal vs vertical bar chart orientation, Ant Design Charts uses a **distinct component approach**: `Bar` for horizontal bars and `Column` for vertical bars, rather than a single component with an orientation prop.

## Overview

This research investigates how the Ant Design ecosystem handles bar chart orientation, specifically the ability to render bar charts horizontally instead of vertically. The analysis covers the recommended charting solution (Ant Design Charts) and its underlying implementation (G2Plot).

## Key Findings

### 1. Ant Design Core Has No Native Charting Components

The core `antd` package (version 6.x) does not include any charting or visualization components. The official components list shows data display components like Tables, Progress bars, and Statistic, but no chart components.

The official recommendation documentation explicitly directs users to external libraries:

> **Visualization and charts**: Ant Design Charts, AntV Data Visualization, reactflow

### 2. Ant Design Charts Uses Separate Components for Orientation

Rather than a single chart component with an `orientation` or `layout` prop, Ant Design Charts provides distinct components:

| Component | Orientation | Bars Extend |
|-----------|-------------|-------------|
| `Column` | Vertical | Upward from X-axis |
| `Bar` | Horizontal | Rightward from Y-axis |
| `BidirectionalBar` | Symmetric | Both directions |

This is a deliberate design choice that aligns with charting terminology conventions where "column chart" and "bar chart" are distinct visual types.

### 3. Under the Hood: Coordinate Transformation

The underlying G2Plot library implements horizontal bars by reusing the column chart implementation with coordinate transformations:

```typescript
// From G2Plot bar/adaptor.ts
// The bar adaptor applies two key transformations:
coordinate: [
  { type: 'transpose' },  // Swap X and Y axes
  { type: 'reflectY' }    // Mirror along Y-axis
]
```

**Field Swapping**: The adaptor swaps the `xField` and `yField` assignments:
- Column: xField = categories (horizontal), yField = values (vertical)
- Bar: xField = values (horizontal), yField = categories (vertical)

**Axis Repositioning**: Axes are remapped:
- Left becomes bottom
- Right becomes top
- Top becomes left
- Bottom becomes right

### 4. API Design Pattern

**Column Chart (Vertical)**:
```tsx
import { Column } from '@ant-design/charts';

const VerticalChart = () => {
  const data = [
    { category: 'Product A', sales: 38 },
    { category: 'Product B', sales: 52 },
    { category: 'Product C', sales: 61 },
  ];

  const config = {
    data,
    xField: 'category',  // Categories on horizontal axis
    yField: 'sales',     // Values on vertical axis
    height: 400,
  };

  return <Column {...config} />;
};
```

**Bar Chart (Horizontal)**:
```tsx
import { Bar } from '@ant-design/charts';

const HorizontalChart = () => {
  const data = [
    { category: 'Product A', sales: 38 },
    { category: 'Product B', sales: 52 },
    { category: 'Product C', sales: 61 },
  ];

  const config = {
    data,
    xField: 'sales',     // Values on horizontal axis
    yField: 'category',  // Categories on vertical axis
    height: 400,
  };

  return <Bar {...config} />;
};
```

### 5. TypeScript Type Definitions

The `BarOptions` interface extends `ColumnOptions` with renamed properties:

```typescript
export interface BarOptions
  extends Omit<
    ColumnOptions,
    'columnStyle' | 'columnWidthRatio' | 'minColumnWidth' | 'maxColumnWidth'
  > {
  readonly barStyle?: ColumnOptions['columnStyle'];
  readonly barWidthRatio?: ColumnOptions['columnWidthRatio'];
  readonly minBarWidth?: ColumnOptions['minColumnWidth'];
  readonly maxBarWidth?: ColumnOptions['maxColumnWidth'];
  readonly barBackground?: ColumnOptions['columnBackground'];
}
```

**Shared Configuration Options** (from ColumnOptions):
- `xField: string` - X-axis data field
- `yField: string` - Y-axis data field
- `seriesField?: string` - Field for series grouping
- `isGroup?: boolean` - Enable grouped bars
- `isStack?: boolean` - Enable stacked bars
- `isPercent?: boolean` - Enable percentage display
- `isRange?: boolean` - Enable range bars

## Technical Implementation Details

### Architecture Stack

```
@ant-design/charts (React wrapper)
        |
        v
    @antv/g2plot (Plot-level abstraction)
        |
        v
      @antv/g2 (Grammar of graphics)
        |
        v
      @antv/g (Rendering engine)
```

### Adaptor Pattern

G2Plot uses an adaptor pattern with flow-based composition:

```typescript
export function adaptor(params: Params<BarOptions>): Params<BarOptions> {
  return flow<Params<BarOptions>>(
    defaultOptions,  // Swap fields and axis positions
    label,           // Adjust label positioning to 'left'
    legend,          // Configure legend placement
    tooltip,         // Setup tooltip behavior
    coordinate,      // Apply transpose + reflectY
    geometry         // Delegate to interval geometry
  )(params);
}
```

### React Component Generation

The React components are generated using a factory pattern:

```typescript
// From @ant-design/charts
import { makeChartComp } from '../core';

export type BarConfig = CommonConfig<BarOptions>;

export const Bar = makeChartComp<BarConfig>('Bar');
```

## Code Examples

### Basic Horizontal Bar Chart

```tsx
import { Bar } from '@ant-design/charts';

const BasicBar = () => {
  const data = [
    { country: 'China', population: 1439 },
    { country: 'India', population: 1380 },
    { country: 'USA', population: 331 },
    { country: 'Indonesia', population: 274 },
    { country: 'Pakistan', population: 221 },
  ];

  return (
    <Bar
      data={data}
      xField="population"
      yField="country"
      height={300}
      barStyle={{
        radius: [4, 4, 0, 0],
      }}
    />
  );
};
```

### Stacked Horizontal Bar Chart

```tsx
import { Bar } from '@ant-design/charts';

const StackedBar = () => {
  const data = [
    { year: '2020', type: 'Sales', value: 120 },
    { year: '2020', type: 'Profit', value: 80 },
    { year: '2021', type: 'Sales', value: 150 },
    { year: '2021', type: 'Profit', value: 95 },
  ];

  return (
    <Bar
      data={data}
      xField="value"
      yField="year"
      seriesField="type"
      isStack={true}
      height={200}
    />
  );
};
```

### Grouped Vertical Column Chart

```tsx
import { Column } from '@ant-design/charts';

const GroupedColumn = () => {
  const data = [
    { year: '2020', type: 'Sales', value: 120 },
    { year: '2020', type: 'Profit', value: 80 },
    { year: '2021', type: 'Sales', value: 150 },
    { year: '2021', type: 'Profit', value: 95 },
  ];

  return (
    <Column
      data={data}
      xField="year"
      yField="value"
      seriesField="type"
      isGroup={true}
      height={300}
    />
  );
};
```

## Strengths

- **Clear semantic distinction**: Using separate `Bar` and `Column` components makes the intended visualization immediately clear from the component name, reducing confusion.

- **Strong TypeScript support**: Well-defined interfaces with proper type inheritance between Bar and Column options.

- **Code reuse without duplication**: The adaptor pattern allows Bar to reuse Column implementation while maintaining distinct APIs.

- **Comprehensive feature parity**: Both components support grouping, stacking, percentage mode, and range display with identical configuration patterns.

- **Progressive disclosure**: Simple use cases require minimal configuration, while advanced customization is available through the full options interface.

## Considerations & Trade-offs

- **Two components instead of one**: Developers who want to toggle orientation programmatically must conditionally render different components or swap xField/yField values, rather than changing a single prop.

- **Field semantics change**: The meaning of `xField` and `yField` changes between Bar and Column, which could cause confusion when switching between them.

- **External dependency**: Charting functionality requires installing a separate package (@ant-design/charts), increasing bundle size and maintenance surface.

- **Learning curve**: Understanding the relationship between Ant Design Charts, G2Plot, and G2 can be challenging for developers who need to debug or extend functionality.

## Relevance to CDS

For the Coinbase Design System's charting implementation, the Ant Design approach offers several insights:

1. **Component-per-orientation pattern**: Consider whether separate `BarChart` and `ColumnChart` components provide clearer API semantics than a single component with an `orientation` prop.

2. **Field swapping pattern**: If using a single component with orientation toggle, the xField/yField swap pattern is well-established and documented.

3. **Coordinate transformation**: The `transpose` + `reflectY` approach is the canonical way to convert vertical intervals to horizontal in grammar-of-graphics systems.

4. **Type inheritance**: The pattern of extending base options while renaming properties (columnStyle -> barStyle) maintains type safety while providing semantic clarity.

5. **External library strategy**: Ant Design's approach of recommending external chart libraries rather than building native components reduces core library maintenance burden but increases integration complexity for users.

## References

- [Ant Design Charts Documentation](https://ant-design-charts.antgroup.com)
- [Ant Design Third-Party Library Recommendations](https://ant.design/docs/react/recommendation)
- [G2Plot GitHub Repository - Bar Implementation](https://github.com/antvis/G2Plot/tree/master/src/plots/bar)
- [G2Plot GitHub Repository - Column Implementation](https://github.com/antvis/G2Plot/tree/master/src/plots/column)
- [AntV Visualization Ecosystem](https://antv.vision)
- [Ant Design Charts GitHub Repository](https://github.com/ant-design/ant-design-charts)
