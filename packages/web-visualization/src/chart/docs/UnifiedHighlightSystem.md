# Unified Highlight System

A simplified highlighting architecture for CDS Charts that works across both Cartesian and Polar chart types.

## Goals

1. **Unified State** - Single context that tracks highlighted item
2. **Flexible Data** - Support index-only, series-only, or both
3. **Separation of Concerns** - Interaction handlers SET, display components READ
4. **ChartTooltip Integration** - Tooltip reads from unified highlight context

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        HighlightContext                         │
│              (Source of truth for highlight state)              │
│                                                                 │
│  • highlightedItem: { seriesId?, dataIndex? }                  │
│  • setHighlightedItem: (item) => void                          │
│  • enableHighlighting: boolean                                 │
└─────────────────────────────────────────────────────────────────┘
           │                                    │
           │ WRITE                              │ READ
           ▼                                    ▼
┌─────────────────────────┐        ┌─────────────────────────────┐
│   Interaction Handlers  │        │     Display Components      │
│                         │        │                             │
│  • Chart area mousemove │        │  • Scrubber (line at index) │
│  • Element hover        │        │  • ChartTooltip             │
│  • Touch handlers       │        │  • Point highlights         │
│                         │        │  • Series emphasis          │
│  Sets highlightedItem   │        │  Reads highlightedItem      │
└─────────────────────────┘        └─────────────────────────────┘
```

## Core Types

```typescript
/**
 * Data identifying a highlighted item.
 * Both fields are optional to support different interaction patterns.
 */
export type HighlightedItemData = {
  /**
   * The series ID of the highlighted item.
   * When undefined, the highlight applies to all series at the dataIndex.
   */
  seriesId?: string;
  /**
   * The index of the item within the series data.
   * When undefined, the highlight applies to the entire series.
   */
  dataIndex?: number;
};

/**
 * Context value for the highlight system.
 */
export type HighlightContextValue = {
  /**
   * Whether highlighting is enabled.
   */
  enableHighlighting: boolean;
  /**
   * The currently highlighted item, or undefined if nothing is highlighted.
   */
  highlightedItem: HighlightedItemData | undefined;
  /**
   * Set the highlighted item. Pass undefined to clear.
   */
  setHighlightedItem: (item: HighlightedItemData | undefined) => void;
};
```

## Scrubber: Display Only

The Scrubber component **only reads** from HighlightContext. It doesn't track mouse movements itself.

```typescript
/**
 * Scrubber - displays a vertical line at the highlighted dataIndex.
 * Does NOT handle interactions - just renders based on context.
 */
export const Scrubber = () => {
  const { highlightedItem, enableHighlighting } = useHighlightContext();
  const { getXScale, drawingArea } = useCartesianChartContext();

  // Only render if highlighting is enabled and we have a dataIndex
  if (!enableHighlighting || highlightedItem?.dataIndex === undefined) {
    return null;
  }

  const xScale = getXScale();
  const x = xScale(highlightedItem.dataIndex);

  return (
    <line
      x1={x}
      y1={drawingArea.top}
      x2={x}
      y2={drawingArea.top + drawingArea.height}
      stroke="var(--color-line)"
      strokeWidth={1}
    />
  );
};
```

## Interaction Layer: Sets Highlight

Mouse tracking happens via an interaction layer (transparent rect over chart area):

```typescript
/**
 * ChartInteractionLayer - handles mouse/touch events and sets highlight.
 * This is what actually tracks pointer position.
 */
export const ChartInteractionLayer = () => {
  const { setHighlightedItem, enableHighlighting } = useHighlightContext();
  const { getXScale, drawingArea, ref } = useCartesianChartContext();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!enableHighlighting) return;

    const xScale = getXScale();
    const dataIndex = getDataIndexFromPointer(e, xScale, drawingArea);

    setHighlightedItem((prev) => ({
      ...prev,        // Preserve seriesId if element is hovered
      dataIndex,      // Update position
    }));
  }, [enableHighlighting, getXScale, drawingArea, setHighlightedItem]);

  const handleMouseLeave = useCallback(() => {
    setHighlightedItem(undefined);  // Clear everything on leave
  }, [setHighlightedItem]);

  return (
    <rect
      x={drawingArea.x}
      y={drawingArea.y}
      width={drawingArea.width}
      height={drawingArea.height}
      fill="transparent"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};
```

## Element Interactions: Add seriesId

Individual elements (bars, lines, areas) add `seriesId` while preserving `dataIndex`:

```typescript
const Bar = ({ seriesId, dataIndex, ...props }) => {
  const { setHighlightedItem, highlightedItem } = useHighlightContext();

  const handleMouseEnter = () => {
    setHighlightedItem((prev) => ({
      ...prev,        // Keep dataIndex from interaction layer
      seriesId,       // Add this series
    }));
  };

  const handleMouseLeave = () => {
    setHighlightedItem((prev) => ({
      dataIndex: prev?.dataIndex,  // Keep position
      // seriesId removed
    }));
  };

  return (
    <rect
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};
```

## Data Flow

```
User moves mouse over chart
         │
         ▼
┌─────────────────────────┐
│  ChartInteractionLayer  │
│  calculates dataIndex   │
│  from x position        │
└───────────┬─────────────┘
            │ setHighlightedItem({ dataIndex: 3 })
            ▼
┌─────────────────────────┐
│    HighlightContext     │
│  { dataIndex: 3 }       │
└───────────┬─────────────┘
            │
    ┌───────┴───────┐
    ▼               ▼
┌─────────┐   ┌──────────────┐
│Scrubber │   │ ChartTooltip │
│ line    │   │ shows all    │
│ at x=3  │   │ series @ 3   │
└─────────┘   └──────────────┘

User hovers over specific bar
         │
         ▼
┌─────────────────────────┐
│  Bar onMouseEnter       │
│  adds seriesId          │
└───────────┬─────────────┘
            │ setHighlightedItem({ dataIndex: 3, seriesId: 'sales' })
            ▼
┌─────────────────────────┐
│    HighlightContext     │
│  { dataIndex: 3,        │
│    seriesId: 'sales' }  │
└───────────┬─────────────┘
            │
    ┌───────┴───────┐
    ▼               ▼
┌─────────┐   ┌──────────────┐
│Scrubber │   │ ChartTooltip │
│ line    │   │ emphasizes   │
│ at x=3  │   │ 'sales'      │
└─────────┘   └──────────────┘
```

## Polar Charts

For polar charts, there's no scrubbing - elements directly set both values:

```typescript
const Arc = ({ seriesId, dataIndex, ...props }) => {
  const { setHighlightedItem } = useHighlightContext();

  return (
    <path
      {...props}
      onMouseEnter={() => setHighlightedItem({ seriesId, dataIndex })}
      onMouseLeave={() => setHighlightedItem(undefined)}
    />
  );
};
```

## Component Responsibilities

| Component               | Reads             | Writes                            | Purpose                  |
| ----------------------- | ----------------- | --------------------------------- | ------------------------ |
| `ChartInteractionLayer` | -                 | `{ dataIndex }`                   | Track pointer x-position |
| `Bar`, `Line`, `Area`   | -                 | `{ seriesId }` (adds to existing) | Element hover            |
| `Arc` (polar)           | -                 | `{ seriesId, dataIndex }`         | Slice hover              |
| `Scrubber`              | `dataIndex`       | -                                 | Render vertical line     |
| `ChartTooltip`          | `highlightedItem` | -                                 | Show data                |
| `SeriesPath`            | `seriesId`        | -                                 | Visual emphasis          |

## Props

### CartesianChart

```typescript
type CartesianChartProps = {
  /**
   * Whether highlighting/scrubbing is enabled.
   * @default false
   */
  enableHighlighting?: boolean;

  /**
   * The highlighted item (controlled mode).
   */
  highlightedItem?: HighlightedItemData | null;

  /**
   * Callback when highlighted item changes.
   */
  onHighlightChange?: (item: HighlightedItemData | null) => void;
};
```

### PolarChart

```typescript
type PolarChartProps = {
  /**
   * Whether highlighting is enabled.
   * @default false
   */
  enableHighlighting?: boolean;

  /**
   * The highlighted item (controlled mode).
   */
  highlightedItem?: HighlightedItemData | null;

  /**
   * Callback when highlighted item changes.
   */
  onHighlightChange?: (item: HighlightedItemData | null) => void;
};
```

## Migration Summary

1. **HighlightContext** - Update types, make fields optional
2. **Scrubber** - Change from tracking to display-only
3. **Add ChartInteractionLayer** - Handles mouse tracking, sets `dataIndex`
4. **Element interactions** - Add/remove `seriesId`
5. **ChartTooltip** - Read from unified context
6. **Remove ScrubberContext** - No longer needed
