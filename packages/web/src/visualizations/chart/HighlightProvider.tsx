import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  HighlightContext,
  type HighlightContextValue,
  ScrubberContext,
  type ScrubberContextValue,
} from './utils/context';
import type { HighlightedItem, HighlightScope } from './utils/highlight';
import { type ChartScaleFunction, isCategoricalScale } from './utils/scale';
import { useCartesianChartContext } from './ChartProvider';

export type HighlightProviderProps = {
  children: React.ReactNode;
  /**
   * A reference to the root SVG element, where interaction event handlers will be attached.
   */
  svgRef: React.RefObject<SVGSVGElement | null> | null;
  /**
   * Whether highlighting is enabled.
   */
  enableHighlighting?: boolean;
  /**
   * Controls what aspects of the data can be highlighted.
   */
  highlightScope?: HighlightScope;
  /**
   * Pass a value to override the internal highlight state.
   */
  highlight?: HighlightedItem[];
  /**
   * Callback fired when the highlight changes during interaction.
   */
  onHighlightChange?: (items: HighlightedItem[]) => void;
  /**
   * Accessibility label for the chart.
   * - When a string: Used as a static label for the chart element
   * - When a function: Called with the highlighted item to generate dynamic labels during interaction
   */
  accessibilityLabel?: string | ((items: HighlightedItem[]) => string);
};

/**
 * HighlightProvider manages chart highlight state and input handling.
 */
export const HighlightProvider = memo(
  ({
    children,
    svgRef,
    enableHighlighting: enableHighlightingProp,
    highlightScope: scopeProp,
    highlight: controlledHighlight,
    onHighlightChange,
    accessibilityLabel,
  }: HighlightProviderProps) => {
    const chartContext = useCartesianChartContext();

    if (!chartContext) {
      throw new Error('HighlightProvider must be used within a ChartContext');
    }

    const { layout, getXScale, getYScale, getXAxis, getYAxis, series } = chartContext;

    const enabled = enableHighlightingProp ?? false;

    const scope: HighlightScope = useMemo(
      () => ({
        dataIndex: scopeProp?.dataIndex ?? false,
        series: scopeProp?.series ?? false,
      }),
      [scopeProp],
    );

    const isControlled = controlledHighlight !== undefined;

    // Per-pointer state keyed by pointerId.
    // Each pointer event (mouse or touch) independently tracks its own HighlightedItem entry.
    // The functional updater bails out (returns prev) when nothing changed, so React
    // skips re-renders for redundant pointermove events within the same data index.
    const [pointerMap, setPointerMap] = useState<Record<number, HighlightedItem>>({});

    // Derived array from per-pointer map
    const internalHighlight = useMemo(() => Object.values(pointerMap), [pointerMap]);

    /**
     * Highlights for context, SVG a11y, and keyboard scrubbing: empty while interaction is off so
     * the chart behaves as if nothing is selected (internal pointer map is unchanged).
     */
    const highlight = useMemo(() => {
      const items: HighlightedItem[] = isControlled
        ? (controlledHighlight ?? [])
        : internalHighlight;
      return enabled ? items : [];
    }, [enabled, isControlled, controlledHighlight, internalHighlight]);

    // Fire onHighlightChange when internal highlight state changes.
    // Uses ref comparison to skip the initial render and avoid firing when
    // onHighlightChange itself changes.
    const prevInternalHighlightRef = useRef(internalHighlight);
    useEffect(() => {
      if (prevInternalHighlightRef.current === internalHighlight) return;
      prevInternalHighlightRef.current = internalHighlight;
      onHighlightChange?.(internalHighlight);
    }, [internalHighlight, onHighlightChange]);

    // Full replacement of highlight state.
    // Used by keyboard navigation, ScrubberContext bridge, and external consumers.
    const setHighlight = useCallback((items: HighlightedItem[]) => {
      const newMap: Record<number, HighlightedItem> = {};
      items.forEach((item, i) => {
        newMap[i] = item;
      });
      setPointerMap(newMap);
    }, []);

    // Partial merge into a specific pointer's entry.
    // Only re-renders when the values actually change for that pointer.
    const updatePointerHighlight = useCallback(
      (pointerId: number, partial: Partial<HighlightedItem>) => {
        setPointerMap((prev) => {
          const current = prev[pointerId];
          const updated: HighlightedItem = { ...current, ...partial };
          if (current?.dataIndex === updated.dataIndex && current?.seriesId === updated.seriesId) {
            return prev;
          }
          return { ...prev, [pointerId]: updated };
        });
      },
      [],
    );

    // Remove a pointer entirely from highlight state.
    const removePointer = useCallback((pointerId: number) => {
      setPointerMap((prev) => {
        if (!(pointerId in prev)) return prev;
        const { [pointerId]: _, ...rest } = prev;
        return rest;
      });
    }, []);

    const getDataIndexFromCategoryAxisPosition = useCallback(
      (mousePosition: number): number => {
        const categoryAxisIsX = layout !== 'horizontal';
        const categoryScale = (categoryAxisIsX ? getXScale() : getYScale()) as ChartScaleFunction;
        const categoryAxis = categoryAxisIsX ? getXAxis() : getYAxis();

        if (!categoryScale || !categoryAxis) return 0;

        if (isCategoricalScale(categoryScale)) {
          const categories = categoryScale.domain?.() ?? categoryAxis.data ?? [];
          const bandwidth = categoryScale.bandwidth?.() ?? 0;
          let closestIndex = 0;
          let closestDistance = Infinity;
          for (let i = 0; i < categories.length; i++) {
            const pos = categoryScale(i);
            if (pos !== undefined) {
              const distance = Math.abs(mousePosition - (pos + bandwidth / 2));
              if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
              }
            }
          }
          return closestIndex;
        }

        const axisData = categoryAxis.data;
        if (axisData && Array.isArray(axisData) && typeof axisData[0] === 'number') {
          const numericData = axisData as number[];
          let closestIndex = 0;
          let closestDistance = Infinity;

          for (let i = 0; i < numericData.length; i++) {
            const dataValue = numericData[i];
            const pos = categoryScale(dataValue);
            if (pos !== undefined) {
              const distance = Math.abs(mousePosition - pos);
              if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
              }
            }
          }
          return closestIndex;
        }

        const dataValue = categoryScale.invert(mousePosition);
        const dataIndexVal = Math.round(dataValue);
        const domain = categoryAxis.domain;
        return Math.max(domain.min ?? 0, Math.min(dataIndexVal, domain.max ?? 0));
      },
      [layout, getXScale, getYScale, getXAxis, getYAxis],
    );

    // --- Pointer Event handlers ---

    const handlePointerDown = useCallback(
      (event: PointerEvent) => {
        if (!enabled) return;
        // Release pointer capture so pointerenter/pointerleave fire on bar elements
        // as the touch drags across them (same technique used by MUI X Charts).
        if (event.target instanceof Element) {
          try {
            event.target.releasePointerCapture(event.pointerId);
          } catch {
            // releasePointerCapture throws if the element doesn't have capture — safe to ignore
          }
        }
      },
      [enabled],
    );

    const handlePointerMove = useCallback(
      (event: PointerEvent) => {
        if (!enabled || !series || series.length === 0) return;
        const svg = event.currentTarget as SVGSVGElement;
        const rect = svg.getBoundingClientRect();
        const position =
          layout === 'horizontal' ? event.clientY - rect.top : event.clientX - rect.left;
        const dataIndex = scope.dataIndex
          ? getDataIndexFromCategoryAxisPosition(position)
          : undefined;
        updatePointerHighlight(event.pointerId, { dataIndex });
      },
      [
        enabled,
        series,
        layout,
        scope.dataIndex,
        getDataIndexFromCategoryAxisPosition,
        updatePointerHighlight,
      ],
    );

    const handlePointerUp = useCallback(
      (event: PointerEvent) => {
        if (!enabled) return;
        removePointer(event.pointerId);
      },
      [enabled, removePointer],
    );

    const handlePointerLeave = useCallback(
      (event: PointerEvent) => {
        if (!enabled) return;
        removePointer(event.pointerId);
      },
      [enabled, removePointer],
    );

    // --- Keyboard navigation ---

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (!enabled) return;

        // Series-only: cycle series ids in the order they were listed on the chart.
        if (scope.series && !scope.dataIndex) {
          const seriesIds = series.map((item) => item.id);
          if (seriesIds.length === 0) return;

          const currentSeriesId = highlight[0]?.seriesId;
          const currentSeriesIndex =
            typeof currentSeriesId === 'string' ? seriesIds.indexOf(currentSeriesId) : -1;
          const lastSeriesIndex = seriesIds.length - 1;

          let newSeriesIndex: number | undefined;

          switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
              event.preventDefault();
              newSeriesIndex = currentSeriesIndex === -1 ? 0 : Math.max(0, currentSeriesIndex - 1);
              break;
            case 'ArrowRight':
            case 'ArrowDown':
              event.preventDefault();
              newSeriesIndex =
                currentSeriesIndex === -1 ? 0 : Math.min(lastSeriesIndex, currentSeriesIndex + 1);
              break;
            case 'Home':
              event.preventDefault();
              newSeriesIndex = 0;
              break;
            case 'End':
              event.preventDefault();
              newSeriesIndex = lastSeriesIndex;
              break;
            case 'Escape':
              event.preventDefault();
              setHighlight([]);
              return;
            default:
              return;
          }

          const nextSeriesId = seriesIds[newSeriesIndex];
          if (nextSeriesId !== currentSeriesId) {
            setHighlight([{ seriesId: nextSeriesId }]);
          }
          return;
        }

        if (!scope.dataIndex) return;

        const categoryAxisIsX = layout !== 'horizontal';
        const categoryScale = (categoryAxisIsX ? getXScale() : getYScale()) as ChartScaleFunction;
        const categoryAxis = categoryAxisIsX ? getXAxis() : getYAxis();

        if (!categoryScale || !categoryAxis) return;

        const isBand = isCategoricalScale(categoryScale);

        let minIndex: number;
        let maxIndex: number;

        if (isBand) {
          const categories = categoryScale.domain?.() ?? categoryAxis.data ?? [];
          minIndex = 0;
          maxIndex = Math.max(0, categories.length - 1);
        } else {
          const axisData = categoryAxis.data;
          if (axisData && Array.isArray(axisData)) {
            minIndex = 0;
            maxIndex = Math.max(0, axisData.length - 1);
          } else {
            const domain = categoryAxis.domain;
            minIndex = domain.min ?? 0;
            maxIndex = domain.max ?? 0;
          }
        }

        const currentItem = highlight[0];
        const currentDataIndex = currentItem?.dataIndex;
        const hasDataIndex = typeof currentDataIndex === 'number';
        const currentIndex = hasDataIndex ? currentDataIndex : minIndex;
        const dataRange = maxIndex - minIndex;

        const multiSkip = event.shiftKey;
        const stepSize = multiSkip ? Math.min(10, Math.max(1, Math.floor(dataRange * 0.1))) : 1;

        // Both scopes: Left/Right walk cells in series order within each data index,
        // then wrap to the next index. Up/Down move one data index, keeping series.
        if (scope.series) {
          const seriesIds = series.map((item) => item.id);
          if (seriesIds.length === 0) return;

          const lastSeriesIndex = seriesIds.length - 1;
          const currentSeriesIndex =
            typeof currentItem?.seriesId === 'string'
              ? seriesIds.indexOf(currentItem.seriesId)
              : -1;
          const hasSeriesId = currentSeriesIndex !== -1;

          let newIndex = currentIndex;
          let newSeriesIndex = hasSeriesId ? currentSeriesIndex : 0;

          switch (event.key) {
            case 'ArrowRight': {
              event.preventDefault();
              newSeriesIndex += 1;
              if (newSeriesIndex > lastSeriesIndex) {
                newSeriesIndex = 0;
                newIndex += 1;
              }
              if (newIndex > maxIndex) {
                newIndex = maxIndex;
                newSeriesIndex = lastSeriesIndex;
              }
              break;
            }
            case 'ArrowLeft': {
              event.preventDefault();
              newSeriesIndex -= 1;
              if (newSeriesIndex < 0) {
                newSeriesIndex = lastSeriesIndex;
                newIndex -= 1;
              }
              if (newIndex < minIndex) {
                newIndex = minIndex;
                newSeriesIndex = 0;
              }
              break;
            }
            case 'ArrowDown':
              event.preventDefault();
              newIndex = Math.min(maxIndex, currentIndex + 1);
              break;
            case 'ArrowUp':
              event.preventDefault();
              newIndex = Math.max(minIndex, currentIndex - 1);
              break;
            case 'Home':
              event.preventDefault();
              newIndex = minIndex;
              newSeriesIndex = 0;
              break;
            case 'End':
              event.preventDefault();
              newIndex = maxIndex;
              newSeriesIndex = lastSeriesIndex;
              break;
            case 'Escape':
              event.preventDefault();
              setHighlight([]);
              return;
            default:
              return;
          }

          if (!hasDataIndex || !hasSeriesId) {
            setHighlight([{ dataIndex: minIndex, seriesId: seriesIds[0] }]);
            return;
          }

          const nextSeriesId = seriesIds[newSeriesIndex];
          if (newIndex !== currentItem?.dataIndex || nextSeriesId !== currentItem?.seriesId) {
            setHighlight([{ dataIndex: newIndex, seriesId: nextSeriesId }]);
          }
          return;
        }

        let newIndex: number | undefined;

        switch (event.key) {
          case categoryAxisIsX ? 'ArrowLeft' : 'ArrowUp':
            event.preventDefault();
            newIndex = Math.max(minIndex, currentIndex - stepSize);
            break;
          case categoryAxisIsX ? 'ArrowRight' : 'ArrowDown':
            event.preventDefault();
            newIndex = Math.min(maxIndex, currentIndex + stepSize);
            break;
          case 'Home':
            event.preventDefault();
            newIndex = minIndex;
            break;
          case 'End':
            event.preventDefault();
            newIndex = maxIndex;
            break;
          case 'Escape':
            event.preventDefault();
            setHighlight([]);
            return;
          default:
            return;
        }

        if (newIndex !== currentItem?.dataIndex) {
          setHighlight([
            {
              dataIndex: newIndex,
              seriesId: currentItem?.seriesId,
            },
          ]);
        }
      },
      [
        enabled,
        scope.dataIndex,
        scope.series,
        series,
        layout,
        getXScale,
        getYScale,
        getXAxis,
        getYAxis,
        highlight,
        setHighlight,
      ],
    );

    const handleBlur = useCallback(() => {
      if (highlight.length === 0) return;
      setHighlight([]);
    }, [highlight, setHighlight]);

    // --- Attach event listeners ---

    useEffect(() => {
      if (!svgRef?.current || !enabled) return;

      const svg = svgRef.current;

      svg.addEventListener('pointerdown', handlePointerDown);
      svg.addEventListener('pointermove', handlePointerMove);
      svg.addEventListener('pointerup', handlePointerUp);
      svg.addEventListener('pointercancel', handlePointerUp);
      svg.addEventListener('pointerleave', handlePointerLeave);
      svg.addEventListener('keydown', handleKeyDown);
      svg.addEventListener('blur', handleBlur);

      return () => {
        svg.removeEventListener('pointerdown', handlePointerDown);
        svg.removeEventListener('pointermove', handlePointerMove);
        svg.removeEventListener('pointerup', handlePointerUp);
        svg.removeEventListener('pointercancel', handlePointerUp);
        svg.removeEventListener('pointerleave', handlePointerLeave);
        svg.removeEventListener('keydown', handleKeyDown);
        svg.removeEventListener('blur', handleBlur);
      };
    }, [
      svgRef,
      enabled,
      handlePointerDown,
      handlePointerMove,
      handlePointerUp,
      handlePointerLeave,
      handleKeyDown,
      handleBlur,
    ]);

    // --- Accessibility ---

    useEffect(() => {
      if (!svgRef?.current || !accessibilityLabel) return;

      const svg = svgRef.current;

      if (typeof accessibilityLabel === 'string') {
        svg.setAttribute('aria-label', accessibilityLabel);
        return;
      }

      if (!enabled) {
        svg.removeAttribute('aria-label');
        return;
      }

      const label = accessibilityLabel(highlight);
      if (label) {
        svg.setAttribute('aria-label', label);
      } else {
        svg.removeAttribute('aria-label');
      }
    }, [svgRef, enabled, highlight, accessibilityLabel]);

    // --- Context values ---

    const contextValue: HighlightContextValue = useMemo(
      () => ({
        enabled,
        scope,
        highlight,
        setHighlight,
        updatePointerHighlight,
        removePointer,
      }),
      [enabled, scope, highlight, setHighlight, updatePointerHighlight, removePointer],
    );

    // ScrubberContext bridge for backwards compatibility
    const scrubberPosition = useMemo(() => {
      const idx = highlight[0]?.dataIndex;
      return typeof idx === 'number' ? idx : undefined;
    }, [highlight]);

    const scrubberContextValue: ScrubberContextValue = useMemo(
      () => ({
        enableScrubbing: enabled,
        scrubberPosition,
        onScrubberPositionChange: (index: number | undefined) => {
          if (!enabled) return;
          if (index === undefined) {
            setHighlight([]);
          } else {
            setHighlight([{ dataIndex: index }]);
          }
        },
      }),
      [enabled, scrubberPosition, setHighlight],
    );

    return (
      <HighlightContext.Provider value={contextValue}>
        <ScrubberContext.Provider value={scrubberContextValue}>{children}</ScrubberContext.Provider>
      </HighlightContext.Provider>
    );
  },
);
