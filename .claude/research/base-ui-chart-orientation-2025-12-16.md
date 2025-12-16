# Base UI: Chart Orientation Features

## Executive Summary

Base UI does not include any charting or data visualization components. It is a headless, unstyled UI component library focused on accessible primitives for common UI patterns like dialogs, menus, and form controls. For chart components within the MUI ecosystem, developers must use the separate MUI X Charts package.

## Overview

Base UI (formerly MUI Base) is an unstyled UI component library created by the team behind Radix, Floating UI, and Material UI. The library provides approximately 43 accessible, headless components that give developers complete control over styling while handling complex accessibility and interaction patterns.

The research goal was to investigate how Base UI implements bar chart orientation (horizontal vs. vertical). This investigation revealed that Base UI does not provide chart components at all.

## Key Findings

### No Native Chart Components

A comprehensive analysis of Base UI's source code reveals zero chart-related components:

- No `Chart`, `BarChart`, `LineChart`, or similar components exist
- No visualization utilities or hooks are provided
- No dependencies on charting libraries (D3, Recharts, Victory, etc.)
- The package.json shows only UI-focused dependencies like `@floating-ui/react-dom` and `tabbable`

### Complete Component Inventory

Base UI's `@base-ui/react` package exports the following components:

**Form & Input Components:**
- `accordion`, `autocomplete`, `button`, `checkbox`, `checkbox-group`
- `combobox`, `field`, `fieldset`, `form`, `input`
- `number-field`, `radio`, `radio-group`, `select`, `slider`
- `switch`, `toggle`, `toggle-group`

**Layout & Navigation:**
- `collapsible`, `menu`, `menubar`, `navigation-menu`
- `scroll-area`, `separator`, `tabs`, `toolbar`

**Overlays & Feedback:**
- `alert-dialog`, `context-menu`, `dialog`, `popover`
- `preview-card`, `tooltip`, `toast`

**Data Display:**
- `avatar`, `meter`, `progress`

**Utilities:**
- `direction-provider`, `merge-props`, `use-render`
- `unstable-use-media-query`

### MUI Ecosystem Chart Solution

Within the broader MUI ecosystem, charts are provided by **MUI X Charts**, a separate commercial package. Key differences:

| Aspect | Base UI | MUI X Charts |
|--------|---------|--------------|
| Package | `@base-ui/react` | `@mui/x-charts` |
| Focus | Headless UI primitives | Data visualization |
| Styling | Completely unstyled | Material Design styled |
| License | MIT | Commercial (with community tier) |
| Charts | None | Bar, Line, Pie, Scatter, etc. |

### MUI X Charts Orientation API (for reference)

While outside Base UI's scope, MUI X Charts handles bar chart orientation via a `layout` prop:

```tsx
// Vertical bars (default)
<BarChart
  xAxis={[{ scaleType: 'band', data: ['A', 'B', 'C'] }]}
  series={[{ data: [1, 2, 3] }]}
  width={500}
  height={300}
/>

// Horizontal bars
<BarChart
  layout="horizontal"
  yAxis={[{ scaleType: 'band', data: ['A', 'B', 'C'] }]}
  series={[{ data: [1, 2, 3] }]}
  width={500}
  height={300}
/>
```

## Technical Implementation Details

### Base UI Architecture

Base UI is designed as a headless component library with these characteristics:

1. **Unstyled by Design**: Components ship with zero CSS, allowing complete styling freedom
2. **Accessibility First**: Built-in ARIA patterns and keyboard navigation
3. **Composition Pattern**: Uses compound components (e.g., `Menu.Root`, `Menu.Item`, `Menu.Trigger`)
4. **Render Props**: The `useRender` hook enables flexible rendering patterns

From `packages/react/package.json`:
```json
{
  "name": "@base-ui/react",
  "description": "Base UI is a library of headless ('unstyled') React components and low-level hooks. You gain complete control over your app's CSS and accessibility features.",
  "keywords": ["react", "react-component", "mui", "unstyled", "a11y"]
}
```

### Why No Charts?

The architectural decision to exclude charts aligns with Base UI's mission:

1. **Scope Focus**: Charts require specialized rendering (SVG/Canvas) and complex math that differs from typical UI components
2. **Styling Complexity**: "Unstyled" charts present unique challenges - data visualization semantics are tightly coupled with visual representation
3. **Existing Solutions**: The MUI ecosystem already provides MUI X Charts as a dedicated solution
4. **Third-Party Ecosystem**: Libraries like Recharts, Victory, Nivo, and visx handle visualization well

## Code Examples

### Base UI's Meter Component (Closest to Data Visualization)

The `Meter` component is Base UI's closest offering to data representation:

```tsx
import { Meter } from '@base-ui/react/meter';

function StorageUsage() {
  return (
    <Meter.Root value={75} min={0} max={100}>
      <Meter.Label>Storage</Meter.Label>
      <Meter.Track>
        <Meter.Indicator />
      </Meter.Track>
      <Meter.Value />
    </Meter.Root>
  );
}
```

This is a single-value indicator, not a multi-data-point chart.

### Progress Component

Similarly, `Progress` shows completion status:

```tsx
import { Progress } from '@base-ui/react/progress';

function FileUpload() {
  return (
    <Progress.Root value={50}>
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  );
}
```

## Strengths

- **Clear Scope Boundaries**: Base UI maintains focus on UI primitives rather than attempting to cover all use cases
- **Modularity**: Developers can combine Base UI with any charting library without conflicts
- **Bundle Size**: No chart code means smaller bundles for apps that don't need visualization
- **Flexibility**: Teams can choose specialized charting solutions that fit their needs

## Considerations & Trade-offs

- **Fragmented Solution**: Projects needing both UI components and charts must integrate multiple libraries
- **No Headless Chart Primitives**: Unlike some competitors, there's no "unstyled chart" offering
- **Ecosystem Complexity**: Developers must navigate multiple MUI packages (Base UI, Material UI, MUI X) to understand what's available
- **Missing Opportunity**: A headless chart primitive could be valuable for design systems wanting full styling control

## Relevance to CDS

For the Coinbase Design System, this research reveals:

1. **Base UI Cannot Inform Chart Orientation**: Since Base UI lacks charts, it provides no patterns for horizontal/vertical bar chart APIs
2. **Alternative Research Needed**: For chart orientation patterns, investigate:
   - MUI X Charts (`layout` prop approach)
   - Recharts (`layout="vertical" | "horizontal"`)
   - Victory Charts (`horizontal` boolean prop)
   - Nivo (`layout` or `direction` props)
3. **CDS Web Visualization**: The existing `@coinbase/cds-web-visualization` package (built with D3) should be referenced for current CDS patterns
4. **Headless Chart Opportunity**: If CDS wants unstyled chart primitives, this would be a novel contribution since Base UI doesn't offer this

## References

- Base UI Documentation: https://base-ui.com/react/overview/quick-start
- Base UI GitHub Repository: https://github.com/mui/base-ui
- Base UI Package Source: `packages/react/src/` in the repository
- MUI X Charts (separate package): https://mui.com/x/react-charts/
- Base UI README: States it's "an unstyled UI component library for building accessible user interfaces"
