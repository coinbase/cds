# Radix Primitives: Chart Orientation Features

## Executive Summary

Radix Primitives does **not include any charting or data visualization components**. The library focuses exclusively on low-level UI primitives for accessibility-focused interface patterns (dialogs, menus, form controls, etc.). However, Radix implements a well-designed `orientation` pattern across multiple components that provides valuable insights for designing chart orientation APIs.

## Overview

Radix Primitives is described as "a low-level UI component library with a focus on accessibility, customization and developer experience." The library provides unstyled, accessible components that serve as building blocks for design systems.

**Available Components (as of December 2025):**
- Accordion, Alert Dialog, Aspect Ratio, Avatar, Checkbox, Collapsible
- Context Menu, Dialog, Dropdown Menu, Form, Hover Card, Label
- Menubar, Navigation Menu, One-Time Password Field, Password Toggle Field
- Popover, Progress, Radio Group, Scroll Area, Select, Separator
- Slider, Switch, Tabs, Toast, Toggle, Toggle Group, Toolbar, Tooltip

**Notably absent:** Any charting, graphing, or data visualization components.

## Key Findings

### 1. No Native Charting Components

After comprehensive analysis of the Radix Primitives repository:
- No chart, graph, bar chart, or visualization components exist
- No dependencies on charting libraries (D3, Recharts, Victory, Nivo, etc.)
- The library's scope is explicitly limited to UI primitives, not data visualization

**Implication:** If building charts with Radix-based design systems, developers must use external charting libraries.

### 2. Radix's Orientation Pattern (Transferable Insight)

While Radix lacks charts, it implements orientation across 10+ components using a consistent, well-designed pattern. This pattern offers valuable lessons for chart orientation APIs.

#### Components Using Orientation

| Component | Orientation Support | Purpose |
|-----------|-------------------|---------|
| Slider | `horizontal` / `vertical` | Value selection direction |
| Separator | `horizontal` / `vertical` | Visual divider orientation |
| Tabs | `horizontal` / `vertical` | Tab navigation direction |
| Toggle Group | `horizontal` / `vertical` | Button group layout |
| Toolbar | `horizontal` / `vertical` | Tool arrangement |
| Scroll Area | Both axes supported | Scroll direction |
| Radio Group | `horizontal` / `vertical` | Option layout |
| Roving Focus | `horizontal` / `vertical` | Keyboard navigation axis |

### 3. API Design Patterns

Radix uses consistent prop naming and TypeScript typing:

```typescript
// Orientation type definition (from separator.tsx)
const ORIENTATIONS = ['horizontal', 'vertical'] as const;
type Orientation = (typeof ORIENTATIONS)[number];

// Prop interface pattern
interface SeparatorProps {
  /**
   * Either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  orientation?: Orientation;
}
```

**Key observations:**
- **Prop name:** Always `orientation` (not `direction`, `layout`, or `axis`)
- **Values:** Strictly `'horizontal' | 'vertical'` (not `'h'`/`'v'` or `0`/`1`)
- **Default:** Consistently defaults to `'horizontal'`
- **Type safety:** Uses `as const` tuple with derived type for compile-time safety

### 4. Orientation-Based Behavioral Switching

Radix components conditionally render different internal implementations based on orientation. The Slider component demonstrates this pattern most clearly:

```typescript
// From slider.tsx - Component switching based on orientation
const Slider = React.forwardRef<SliderElement, SliderProps>((props, ref) => {
  const { orientation = 'horizontal', ...sliderProps } = props;
  const isHorizontal = orientation === 'horizontal';

  // Render completely different components based on orientation
  const SliderOrientation = isHorizontal ? SliderHorizontal : SliderVertical;

  return (
    <SliderOrientation
      data-orientation={orientation}
      {...sliderProps}
      ref={ref}
    />
  );
});
```

**SliderHorizontal vs SliderVertical differences:**
- Pointer event handling (`clientX` vs `clientY`)
- Dimension calculations (`width` vs `height`)
- CSS positioning (`left`/`right` vs `top`/`bottom`)
- Keyboard navigation (arrow key mapping)
- RTL support (horizontal only)

### 5. Data Attributes for CSS Styling

Radix exposes orientation via `data-orientation` attribute for CSS styling:

```typescript
// Consistent pattern across all orientation-aware components
<Primitive.div
  data-orientation={orientation}
  {...props}
  ref={forwardedRef}
/>
```

This enables CSS-based styling:

```css
[data-orientation="horizontal"] {
  flex-direction: row;
}

[data-orientation="vertical"] {
  flex-direction: column;
}
```

### 6. Keyboard Navigation Awareness

The `RovingFocusGroup` component shows how orientation affects keyboard behavior:

```typescript
// From roving-focus-group.tsx
function getFocusIntent(
  event: React.KeyboardEvent,
  orientation?: Orientation,
  dir?: Direction
) {
  const key = getDirectionAwareKey(event.key, dir);

  // Filter out irrelevant keys based on orientation
  if (orientation === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(key)) {
    return undefined;
  }
  if (orientation === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(key)) {
    return undefined;
  }

  return MAP_KEY_TO_FOCUS_INTENT[key];
}
```

### 7. Orientation Context Provider

For compound components, orientation is shared via React Context:

```typescript
// From slider.tsx
type SliderContextValue = {
  orientation: SliderProps['orientation'];
  // ... other values
};

const [SliderProvider, useSliderContext] = createSliderContext<SliderContextValue>(SLIDER_NAME);
```

Child components access orientation without prop drilling:

```typescript
const SliderTrack = React.forwardRef((props, ref) => {
  const context = useSliderContext(TRACK_NAME, props.__scopeSlider);
  return (
    <Primitive.span
      data-orientation={context.orientation}
      {...props}
      ref={ref}
    />
  );
});
```

## Technical Implementation Details

### Orientation-Specific Sub-Components (Slider Pattern)

Radix's Slider implements separate internal components for each orientation with an orientation-specific context:

```typescript
// Orientation context with axis-specific values
const [SliderOrientationProvider, useSliderOrientationContext] = createSliderContext<{
  startEdge: 'top' | 'right' | 'bottom' | 'left';
  endEdge: 'top' | 'right' | 'bottom' | 'left';
  size: 'width' | 'height';
  direction: number; // 1 or -1
}>(SLIDER_NAME);

// SliderHorizontal provides horizontal-specific values
<SliderOrientationProvider
  startEdge={isSlidingFromLeft ? 'left' : 'right'}
  endEdge={isSlidingFromLeft ? 'right' : 'left'}
  direction={isSlidingFromLeft ? 1 : -1}
  size="width"
>
  <SliderImpl data-orientation="horizontal" />
</SliderOrientationProvider>

// SliderVertical provides vertical-specific values
<SliderOrientationProvider
  startEdge={isSlidingFromBottom ? 'bottom' : 'top'}
  endEdge={isSlidingFromBottom ? 'top' : 'bottom'}
  size="height"
  direction={isSlidingFromBottom ? 1 : -1}
>
  <SliderImpl data-orientation="vertical" />
</SliderOrientationProvider>
```

### Inversion Support

The Slider supports an `inverted` prop that works with orientation:

```typescript
interface SliderProps {
  orientation?: 'horizontal' | 'vertical';
  inverted?: boolean;  // Reverses the direction within the orientation
  dir?: 'ltr' | 'rtl'; // Text direction (horizontal only)
}

// Horizontal: inverted affects left-to-right vs right-to-left
const isSlidingFromLeft = (isDirectionLTR && !inverted) || (!isDirectionLTR && inverted);

// Vertical: inverted affects bottom-to-top vs top-to-bottom
const isSlidingFromBottom = !inverted;
```

## Code Examples

### Simple Orientation Prop (Separator)

```tsx
import * as Separator from '@radix-ui/react-separator';

// Horizontal (default)
<Separator.Root orientation="horizontal" />

// Vertical
<Separator.Root orientation="vertical" />
```

### Compound Component with Orientation (Tabs)

```tsx
import * as Tabs from '@radix-ui/react-tabs';

// Horizontal tabs (default)
<Tabs.Root defaultValue="tab1" orientation="horizontal">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs.Root>

// Vertical tabs
<Tabs.Root defaultValue="tab1" orientation="vertical">
  {/* Same children - keyboard navigation adjusts automatically */}
</Tabs.Root>
```

### Slider with Orientation and Inversion

```tsx
import * as Slider from '@radix-ui/react-slider';

// Horizontal slider (left to right)
<Slider.Root orientation="horizontal" defaultValue={[50]}>
  <Slider.Track>
    <Slider.Range />
  </Slider.Track>
  <Slider.Thumb />
</Slider.Root>

// Vertical slider (bottom to top)
<Slider.Root orientation="vertical" defaultValue={[50]}>
  <Slider.Track>
    <Slider.Range />
  </Slider.Track>
  <Slider.Thumb />
</Slider.Root>

// Inverted vertical slider (top to bottom)
<Slider.Root orientation="vertical" inverted defaultValue={[50]}>
  <Slider.Track>
    <Slider.Range />
  </Slider.Track>
  <Slider.Thumb />
</Slider.Root>
```

## Strengths

- **Consistent API:** The `orientation` prop name is used uniformly across all applicable components
- **Type safety:** Strong TypeScript typing prevents invalid orientation values
- **Sensible defaults:** Horizontal is the default, matching natural reading direction
- **Separation of concerns:** Orientation-specific logic is encapsulated in sub-components
- **CSS styling support:** `data-orientation` attribute enables clean CSS targeting
- **Accessibility:** Keyboard navigation automatically adapts to orientation
- **Composability:** Context-based sharing enables compound component patterns

## Considerations & Trade-offs

- **No chart support:** Radix explicitly does not provide data visualization components
- **Binary orientation:** Only `horizontal`/`vertical` - no diagonal or custom angles
- **No orientation transitions:** Switching orientation is not animated by default
- **RTL complexity:** Horizontal orientation interacts with text direction in complex ways

## Relevance to CDS

### Applicable Patterns for Chart Components

1. **Prop naming:** Use `orientation` prop (not `layout` or `direction`) with `'horizontal' | 'vertical'` values for consistency with industry conventions

2. **Type definition pattern:**
   ```typescript
   const CHART_ORIENTATIONS = ['horizontal', 'vertical'] as const;
   type ChartOrientation = (typeof CHART_ORIENTATIONS)[number];
   ```

3. **Data attribute pattern:** Expose `data-orientation` for CSS-based styling of charts

4. **Component switching:** Consider separate internal components for horizontal vs vertical bar charts if the rendering logic differs significantly

5. **Context sharing:** For compound chart components (e.g., `<BarChart>` + `<Bar>` + `<Axis>`), share orientation via context

6. **Default value:** Default to `'vertical'` for bar charts (bars growing upward is the standard convention, unlike UI components where horizontal is default)

7. **Inversion support:** Consider an `inverted` prop for cases where bars should grow in the opposite direction

### Recommended API Design

Based on Radix patterns, a CDS bar chart orientation API might look like:

```tsx
interface BarChartProps {
  /**
   * The orientation of the bars.
   * - 'vertical': Bars grow upward from bottom axis (default)
   * - 'horizontal': Bars grow rightward from left axis
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * Whether to invert the growth direction.
   * - vertical + inverted: Bars grow downward
   * - horizontal + inverted: Bars grow leftward
   */
  inverted?: boolean;
}

// Usage
<BarChart orientation="horizontal" data={data} />
```

## References

- [Radix Primitives Documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Radix Primitives GitHub Repository](https://github.com/radix-ui/primitives)
- [Slider Component Source](https://github.com/radix-ui/primitives/blob/main/packages/react/slider/src/slider.tsx)
- [Separator Component Source](https://github.com/radix-ui/primitives/blob/main/packages/react/separator/src/separator.tsx)
- [Tabs Component Source](https://github.com/radix-ui/primitives/blob/main/packages/react/tabs/src/tabs.tsx)
- [Roving Focus Group Source](https://github.com/radix-ui/primitives/blob/main/packages/react/roving-focus/src/roving-focus-group.tsx)
