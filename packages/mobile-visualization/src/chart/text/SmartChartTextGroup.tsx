import { memo, useEffect, useMemo, useState } from 'react';
import { G } from 'react-native-svg';
import type { Rect } from '@coinbase/cds-common/types';

import { ChartText, type ChartTextChildren, type ChartTextProps } from './ChartText';

/**
 * Configuration for a single text label in the display list
 */
export type TextLabelData = {
  /**
   * The text content to display
   */
  label: ChartTextChildren;
  /**
   * X coordinate where the text should be positioned
   */
  x: number;
  /**
   * Y coordinate where the text should be positioned
   */
  y: number;
  /**
   * Additional props to pass to the ChartText component for this specific label
   */
  chartTextProps?: Partial<ChartTextProps>;
};

export type TextLabelDataWithKey = TextLabelData & { key: string };

export type SmartChartTextGroupProps = {
  /**
   * Array of text labels to display
   */
  labels: TextLabelData[];
  /**
   * Minimum gap between labels
   * @default 8
   */
  minGap?: number;
  /**
   * Whether to always show first and last labels
   * @default true
   */
  prioritizeEndLabels?: boolean;
  /**
   * Common props to apply to all ChartText components
   */
  chartTextProps?: Partial<ChartTextProps>;
};

/**
 * Overlap check that enforces a minimum pixel gap between two rectangles.
 * We inflate each rect by gap/2 on all sides so two neighbors must be at
 * least `gap` pixels apart to be considered non-overlapping.
 */
function doRectsOverlapWithGap(a: Rect, b: Rect, gap: number): boolean {
  const g = gap / 2;
  const overlapX = a.x - g < b.x + b.width + g && a.x + a.width + g > b.x - g;
  const overlapY = a.y - g < b.y + b.height + g && a.y + a.height + g > b.y - g;
  return overlapX && overlapY;
}

// Suppress state churn due to sub-pixel jitter in measurements
const EPSILON_PX = 0.5;

/**
 * A smart text display component that prevents label overlap through collision detection.
 *
 * This component renders a list of ChartText components and automatically hides overlapping elements
 * to ensure readability.
 *
 * The component focuses solely on overlap prevention logic for better separation of concerns.
 */
export const SmartChartTextGroup = memo<SmartChartTextGroupProps>(
  ({ labels, minGap = 8, prioritizeEndLabels = true, chartTextProps }) => {
    const [boundingBoxes, setBoundingBoxes] = useState<Map<string, Rect>>(new Map());
    const { onDimensionsChange: propsOnDimensionsChange, ...restChartTextProps } =
      chartTextProps ?? {};

    // Generate a unique key to reference each label with.
    const labelsWithKeys: Array<TextLabelDataWithKey> = useMemo(() => {
      return labels.map((labelData, index) => ({
        ...labelData,
        key: `${labelData.label}-${index}`,
      }));
    }, [labels]);

    // Cleans up `boundingBoxes` state so that it only includes entries for the current set of labels
    useEffect(() => {
      const allLabelsKeys = new Set(labelsWithKeys.map((l) => l.key));
      setBoundingBoxes((prev) => {
        let changed = false;
        const next = new Map<string, Rect>();
        for (const [k, v] of prev) {
          if (allLabelsKeys.has(k)) next.set(k, v);
          else changed = true;
        }
        return changed ? next : prev;
      });
    }, [labelsWithKeys]);

    // Build stable per-label measurement callbacks that recreate when labels change
    const onDimensionsChangeByKey = useMemo(() => {
      const map = new Map<string, (bounds: Rect) => void>();
      for (const labelData of labelsWithKeys) {
        const { key, chartTextProps: labelChartTextProps } = labelData;
        map.set(key, (bounds: Rect) => {
          labelChartTextProps?.onDimensionsChange?.(bounds);
          propsOnDimensionsChange?.(bounds);
          // Ignore zero-sized bounds and no-op updates (epsilon compare)
          if (bounds.width === 0 || bounds.height === 0) return;
          setBoundingBoxes((prev) => {
            const prevRect = prev.get(key);
            const nearlyEqual = (a: number, b: number) => Math.abs(a - b) <= EPSILON_PX;
            const isSame =
              prevRect !== undefined &&
              nearlyEqual(prevRect.x, bounds.x) &&
              nearlyEqual(prevRect.y, bounds.y) &&
              nearlyEqual(prevRect.width, bounds.width) &&
              nearlyEqual(prevRect.height, bounds.height);
            if (isSame) return prev;
            const newMap = new Map(prev);
            newMap.set(key, bounds);
            return newMap;
          });
        });
      }
      return map;
    }, [labelsWithKeys, propsOnDimensionsChange]);

    // Determine readiness: all current labels have measured bounding boxes
    const isReady = useMemo(
      () => labelsWithKeys.every((l) => boundingBoxes.has(l.key)),
      [labelsWithKeys, boundingBoxes],
    );

    // Compute visible keys using stride attempts then greedy fallback
    const visibleKeySet = useMemo(() => {
      // Build ordered set of labels with rects for collision detection algorithm
      const orderedWithRects = labelsWithKeys
        .map((l, idx) => ({ ...l, rect: boundingBoxes.get(l.key) }))
        .filter((x) => x.rect !== undefined) as Array<TextLabelDataWithKey & { rect: Rect }>;

      // 1) Sort by horizontal position so neighbor checks are O(1)
      //    For ties, sort bottom-to-top (higher y first) to get stable ordering
      orderedWithRects.sort((a, b) => (a.x === b.x ? b.y - a.y : a.x - b.x));

      // 2) Defer selection until all labels have measured to avoid flicker and early hiding
      if (!isReady) return null;
      const n = orderedWithRects.length;
      // 3) Trivial cases
      if (n === 0) return new Set<string>();
      if (n === 1) return new Set<string>([orderedWithRects[0].key]);

      // 4) Two-label rule: if overlapping, prefer the first label (original order)
      if (n === 2) {
        const a = orderedWithRects[0];
        const b = orderedWithRects[1];
        const overlap = doRectsOverlapWithGap(a.rect, b.rect, minGap);
        if (overlap) {
          const firstOriginal = labelsWithKeys[0]?.key;
          return new Set<string>([firstOriginal ?? a.key]);
        }
        return new Set<string>([a.key, b.key]);
      }

      // 5) Utility: check only adjacent neighbors in x-order for overlap with gap
      const hasNeighborOverlap = (keysOrdered: string[]) => {
        for (let i = 0; i < keysOrdered.length - 1; i++) {
          const ra = boundingBoxes.get(keysOrdered[i])!;
          const rb = boundingBoxes.get(keysOrdered[i + 1])!;
          if (doRectsOverlapWithGap(ra, rb, minGap)) return true;
        }
        return false;
      };

      // 6) Fast path: if every label fits, show them all without reduction
      const allKeys = orderedWithRects.map((l) => l.key);
      if (!hasNeighborOverlap(allKeys)) {
        return new Set<string>(allKeys);
      }

      // 7) Try stride patterns: every 2nd, every 3rd, ... while ensuring ends when prioritized
      const tryStride = (stride: number): Set<string> => {
        const selected: string[] = [];
        for (let i = 0; i < n; i += stride) selected.push(orderedWithRects[i].key);
        if (prioritizeEndLabels) {
          const firstKey = orderedWithRects[0].key;
          const lastKey = orderedWithRects[n - 1].key;
          if (selected[0] !== firstKey) selected.unshift(firstKey);
          if (selected[selected.length - 1] !== lastKey) selected.push(lastKey);
        }
        // Deduplicate while preserving order
        const unique = Array.from(new Set(selected));
        return hasNeighborOverlap(unique) ? new Set<string>() : new Set<string>(unique);
      };

      // 8) Increase stride until something fits or we exhaust options
      for (let stride = 2; stride <= n; stride++) {
        const attempt = tryStride(stride);
        if (attempt.size > 0) return attempt;
      }

      // 9) Greedy fallback: walk left-to-right and keep a label only if it
      //    does not overlap the previously accepted label. Optionally ensure last.
      const greedy: string[] = [];
      const firstKey = orderedWithRects[0].key;
      const lastKey = orderedWithRects[n - 1].key;
      greedy.push(firstKey);
      for (let i = 1; i < n - 1; i++) {
        const k = orderedWithRects[i].key;
        const prevKey = greedy[greedy.length - 1];
        const ra = boundingBoxes.get(prevKey)!;
        const rb = boundingBoxes.get(k)!;
        if (!doRectsOverlapWithGap(ra, rb, minGap)) {
          greedy.push(k);
        }
      }
      // Ensure last key when prioritized
      if (prioritizeEndLabels) {
        const lastIncluded = greedy[greedy.length - 1];
        const ra = boundingBoxes.get(lastIncluded)!;
        const rb = boundingBoxes.get(lastKey)!;
        if (doRectsOverlapWithGap(ra, rb, minGap)) {
          // Replace the last conflicting with the lastKey
          greedy[greedy.length - 1] = lastKey;
        } else if (lastIncluded !== lastKey) {
          greedy.push(lastKey);
        }
      }

      return new Set<string>(greedy);
    }, [isReady, boundingBoxes, minGap, prioritizeEndLabels, labelsWithKeys]);

    return (
      <G>
        {labelsWithKeys.map((labelData) => {
          const hasMeasurement = boundingBoxes.has(labelData.key);
          const isVisible = hasMeasurement && isReady && visibleKeySet?.has(labelData.key);

          return (
            <ChartText
              key={labelData.key}
              opacity={isVisible ? 1 : 0}
              x={labelData.x}
              y={labelData.y}
              {...restChartTextProps}
              {...labelData.chartTextProps}
              onDimensionsChange={onDimensionsChangeByKey.get(labelData.key)}
            >
              {labelData.label}
            </ChartText>
          );
        })}
      </G>
    );
  },
);
