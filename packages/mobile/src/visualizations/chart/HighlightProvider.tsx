import React, { memo, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  runOnJS,
  type SharedValue,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { Haptics } from '../../utils/haptics';

import {
  HighlightContext,
  type HighlightContextValue,
  ScrubberContext,
  type ScrubberContextValue,
} from './utils/context';
import type { BarBounds, HighlightedItem, HighlightScope } from './utils/highlight';
import { getPointOnSerializableScale } from './utils/point';
import { invertSerializableScale } from './utils/scale';
import { useCartesianChartContext } from './ChartProvider';

export type HighlightProviderProps = {
  children: React.ReactNode;
  /**
   * Allows continuous gestures on the chart to continue outside the bounds of the chart element.
   */
  allowOverflowGestures?: boolean;
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
   * Callback fired when highlighting changes during interaction.
   */
  onHighlightChange?: (items: HighlightedItem[]) => void;
  /**
   * Accessibility label for the chart.
   * - When a string: Used as a static label for the chart element
   * - When a function: Called with the highlighted item to generate dynamic labels during interaction
   */
  accessibilityLabel?: string | ((items: HighlightedItem[]) => string);
  /**
   * The accessibility mode for the chart.
   * - 'chunked': Divides chart into N accessible regions (default for line charts)
   * - 'item': Each data point is an accessible region (default for bar charts)
   * @default 'chunked'
   */
  accessibilityMode?: 'chunked' | 'item';
  /**
   * Number of accessible chunks when accessibilityMode is 'chunked'.
   * @default 10
   */
  accessibilityChunkCount?: number;
};

const DEFAULT_ITEM: HighlightedItem = {};

/**
 * Sentinel pointer ID used in onStart (before real touch IDs are available from onTouchesMove).
 * Cleared once onTouchesMove fires with real IDs.
 */
const INITIAL_TOUCH_ID = -1;

/**
 * HighlightProvider manages chart highlighting state and gesture handling for mobile.
 * Uses per-pointer state tracking for multi-touch support.
 */
export const HighlightProvider = memo(
  ({
    children,
    allowOverflowGestures,
    enableHighlighting = false,
    highlightScope: scopeProp,
    highlight: controlledHighlight,
    onHighlightChange,
    accessibilityLabel,
    accessibilityMode = 'chunked',
    accessibilityChunkCount = 10,
  }: HighlightProviderProps) => {
    const chartContext = useCartesianChartContext();

    if (!chartContext) {
      throw new Error('HighlightProvider must be used within a ChartContext');
    }

    const { layout, getXSerializableScale, getYSerializableScale, getXAxis, getYAxis, dataLength } =
      chartContext;

    const categoryAxisIsX = useMemo(() => layout !== 'horizontal', [layout]);
    const categoryAxis = useMemo(
      () => (categoryAxisIsX ? getXAxis() : getYAxis()),
      [categoryAxisIsX, getXAxis, getYAxis],
    );
    const categoryScale = useMemo(
      () => (categoryAxisIsX ? getXSerializableScale() : getYSerializableScale()),
      [categoryAxisIsX, getXSerializableScale, getYSerializableScale],
    );

    const scope: HighlightScope = useMemo(
      () => ({
        dataIndex: scopeProp?.dataIndex ?? false,
        series: scopeProp?.series ?? false,
      }),
      [scopeProp],
    );

    // Bar registry for hit testing
    const barsRef = useRef<BarBounds[]>([]);

    const registerBar = useCallback((bounds: BarBounds) => {
      barsRef.current.push(bounds);
    }, []);

    const unregisterBar = useCallback((seriesId: string, dataIndex: number) => {
      barsRef.current = barsRef.current.filter(
        (bar) => !(bar.seriesId === seriesId && bar.dataIndex === dataIndex),
      );
    }, []);

    const findBarAtPoint = useCallback((touchX: number, touchY: number): BarBounds | null => {
      const bars = barsRef.current;
      for (let i = bars.length - 1; i >= 0; i--) {
        const bar = bars[i];
        if (
          touchX >= bar.x &&
          touchX <= bar.x + bar.width &&
          touchY >= bar.y &&
          touchY <= bar.y + bar.height
        ) {
          return bar;
        }
      }
      return null;
    }, []);

    const isControlled = controlledHighlight !== undefined;

    // Per-pointer state. Ref is used because updates come from gesture worklets via runOnJS.
    // The derived SharedValue (internalHighlight) drives Skia rendering reactively.
    const pointerMapRef = useRef<Record<number, HighlightedItem>>({});
    const internalHighlight = useSharedValue<HighlightedItem[]>([]);

    const syncInternalHighlight = useCallback(() => {
      internalHighlight.value = Object.values(pointerMapRef.current);
    }, [internalHighlight]);

    // The exposed highlight SharedValue
    const highlight: SharedValue<HighlightedItem[]> = useMemo(() => {
      if (isControlled) {
        return {
          get value() {
            return controlledHighlight ?? [];
          },
          set value(_newValue: HighlightedItem[]) {
            // In controlled mode, don't update internal state
          },
          addListener: internalHighlight.addListener.bind(internalHighlight),
          removeListener: internalHighlight.removeListener.bind(internalHighlight),
          modify: internalHighlight.modify.bind(internalHighlight),
        } as SharedValue<HighlightedItem[]>;
      }
      return internalHighlight;
    }, [isControlled, controlledHighlight, internalHighlight]);

    const getDataIndexFromCategoryAxisPosition = useCallback(
      (touchPosition: number): number => {
        'worklet';

        if (!categoryScale || !categoryAxis) return 0;

        if (categoryScale.type === 'band') {
          const [domainMin, domainMax] = categoryScale.domain;
          const categoryCount = domainMax - domainMin + 1;
          let closestIndex = 0;
          let closestDistance = Infinity;

          for (let i = 0; i < categoryCount; i++) {
            const categoryPos = getPointOnSerializableScale(i, categoryScale);
            if (categoryPos !== undefined) {
              const distance = Math.abs(touchPosition - categoryPos);
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
            const categoryPos = getPointOnSerializableScale(dataValue, categoryScale);
            if (categoryPos !== undefined) {
              const distance = Math.abs(touchPosition - categoryPos);
              if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
              }
            }
          }
          return closestIndex;
        }

        const dataValue = invertSerializableScale(touchPosition, categoryScale);
        const dataIndex = Math.round(dataValue);
        const domain = categoryAxis.domain;
        return Math.max(domain.min ?? 0, Math.min(dataIndex, domain.max ?? 0));
      },
      [categoryAxis, categoryScale],
    );

    // Haptic feedback
    const handleStartEndHaptics = useCallback(() => {
      void Haptics.lightImpact();
    }, []);

    // Fire onHighlightChange when highlight SharedValue changes
    const handleHighlightChangeJS = useCallback(
      (items: HighlightedItem[]) => {
        onHighlightChange?.(items);
      },
      [onHighlightChange],
    );

    useAnimatedReaction(
      () => highlight.value,
      (currentValue, previousValue) => {
        if (currentValue !== previousValue) {
          runOnJS(handleHighlightChangeJS)(currentValue);
        }
      },
      [handleHighlightChangeJS],
    );

    // Full replacement of highlight state (keyboard, accessibility, external)
    const setHighlight = useCallback(
      (newItems: HighlightedItem[]) => {
        const newMap: Record<number, HighlightedItem> = {};
        newItems.forEach((item, i) => {
          newMap[i] = item;
        });
        pointerMapRef.current = newMap;
        if (!isControlled) {
          syncInternalHighlight();
        }
        onHighlightChange?.(newItems);
      },
      [isControlled, syncInternalHighlight, onHighlightChange],
    );

    // Partial merge into one pointer's entry
    const updatePointerHighlight = useCallback(
      (pointerId: number, partial: Partial<HighlightedItem>) => {
        const current = pointerMapRef.current[pointerId] ?? DEFAULT_ITEM;
        const updated = { ...current, ...partial };
        if (current.dataIndex === updated.dataIndex && current.seriesId === updated.seriesId)
          return;
        pointerMapRef.current[pointerId] = updated;
        if (!isControlled) {
          syncInternalHighlight();
        }
      },
      [isControlled, syncInternalHighlight],
    );

    // Remove a pointer
    const removePointer = useCallback(
      (pointerId: number) => {
        if (!(pointerId in pointerMapRef.current)) return;
        delete pointerMapRef.current[pointerId];
        if (!isControlled) {
          syncInternalHighlight();
        }
      },
      [isControlled, syncInternalHighlight],
    );

    // Per-touch highlight handler (called from gesture worklets via runOnJS)
    const handleTouchHighlight = useCallback(
      (touchId: number, x: number, y: number, dataIndex: number | null | undefined) => {
        const seriesId = scope.series ? (findBarAtPoint(x, y)?.seriesId ?? null) : undefined;
        updatePointerHighlight(touchId, { dataIndex, seriesId });
      },
      [scope.series, findBarAtPoint, updatePointerHighlight],
    );

    const handleTouchRemove = useCallback(
      (touchId: number) => {
        removePointer(touchId);
      },
      [removePointer],
    );

    const handleGestureEnd = useCallback(() => {
      pointerMapRef.current = {};
      if (!isControlled) {
        internalHighlight.value = [];
      }
      onHighlightChange?.([]);
    }, [internalHighlight, isControlled, onHighlightChange]);

    const handleClearInitialTouch = useCallback(() => {
      if (INITIAL_TOUCH_ID in pointerMapRef.current) {
        removePointer(INITIAL_TOUCH_ID);
      }
    }, [removePointer]);

    // Gesture: Pan with activateAfterLongPress for the activation gate,
    // plus touch callbacks for per-pointer tracking.
    const isGestureActive = useSharedValue(false);

    const gesture = useMemo(
      () =>
        Gesture.Pan()
          .activateAfterLongPress(110)
          .shouldCancelWhenOutside(!allowOverflowGestures)
          .onStart(function onStart(event) {
            isGestureActive.value = true;
            runOnJS(handleStartEndHaptics)();

            // Process initial position with sentinel ID.
            // onTouchesDown already fired but was skipped (gesture wasn't active yet).
            // This entry will be replaced once onTouchesMove fires with real IDs.
            const pointerPosition = categoryAxisIsX ? event.x : event.y;
            const dataIndex = scope.dataIndex
              ? getDataIndexFromCategoryAxisPosition(pointerPosition)
              : undefined;
            runOnJS(handleTouchHighlight)(INITIAL_TOUCH_ID, event.x, event.y, dataIndex);
          })
          .onTouchesDown(function onTouchesDown(event) {
            if (!isGestureActive.value) return;
            for (let i = 0; i < event.changedTouches.length; i++) {
              const touch = event.changedTouches[i];
              const pointerPosition = categoryAxisIsX ? touch.x : touch.y;
              const dataIndex = scope.dataIndex
                ? getDataIndexFromCategoryAxisPosition(pointerPosition)
                : undefined;
              runOnJS(handleTouchHighlight)(touch.id, touch.x, touch.y, dataIndex);
            }
          })
          .onTouchesMove(function onTouchesMove(event) {
            if (!isGestureActive.value) return;
            // Clear the sentinel entry from onStart on first move
            runOnJS(handleClearInitialTouch)();
            for (let i = 0; i < event.allTouches.length; i++) {
              const touch = event.allTouches[i];
              const pointerPosition = categoryAxisIsX ? touch.x : touch.y;
              const dataIndex = scope.dataIndex
                ? getDataIndexFromCategoryAxisPosition(pointerPosition)
                : undefined;
              runOnJS(handleTouchHighlight)(touch.id, touch.x, touch.y, dataIndex);
            }
          })
          .onTouchesUp(function onTouchesUp(event) {
            if (!isGestureActive.value) return;
            for (let i = 0; i < event.changedTouches.length; i++) {
              const touch = event.changedTouches[i];
              runOnJS(handleTouchRemove)(touch.id);
            }
          })
          .onEnd(function onEnd() {
            isGestureActive.value = false;
            runOnJS(handleStartEndHaptics)();
            runOnJS(handleGestureEnd)();
          })
          .onTouchesCancelled(function onTouchesCancelled() {
            isGestureActive.value = false;
            runOnJS(handleGestureEnd)();
          }),
      [
        allowOverflowGestures,
        isGestureActive,
        handleStartEndHaptics,
        getDataIndexFromCategoryAxisPosition,
        categoryAxisIsX,
        scope.dataIndex,
        handleTouchHighlight,
        handleTouchRemove,
        handleClearInitialTouch,
        handleGestureEnd,
      ],
    );

    const contextValue: HighlightContextValue = useMemo(
      () => ({
        enabled: enableHighlighting,
        scope,
        highlight,
        setHighlight,
        updatePointerHighlight,
        removePointer,
        registerBar,
        unregisterBar,
      }),
      [
        enableHighlighting,
        scope,
        highlight,
        setHighlight,
        updatePointerHighlight,
        removePointer,
        registerBar,
        unregisterBar,
      ],
    );

    // ScrubberContext bridge for backwards compatibility
    const scrubberPosition = useDerivedValue<number | undefined>(() => {
      if (!enableHighlighting) return undefined;
      const items = internalHighlight.value;
      if (!items || items.length === 0) return undefined;
      const idx = items[0]?.dataIndex;
      return typeof idx === 'number' ? idx : undefined;
    }, [enableHighlighting, internalHighlight]);

    const scrubberContextValue: ScrubberContextValue = useMemo(
      () => ({
        enableScrubbing: enableHighlighting,
        scrubberPosition,
      }),
      [enableHighlighting, scrubberPosition],
    );

    // Accessibility
    const getAccessibilityLabelForItems = useCallback(
      (items: HighlightedItem[]): string => {
        if (typeof accessibilityLabel === 'string') {
          return accessibilityLabel;
        }
        if (typeof accessibilityLabel === 'function') {
          return accessibilityLabel(items);
        }
        return '';
      },
      [accessibilityLabel],
    );

    const accessibilityRegions = useMemo(() => {
      if (!enableHighlighting || !accessibilityLabel || typeof accessibilityLabel === 'string') {
        return null;
      }

      const regions: Array<{
        key: string;
        flex: number;
        label: string;
        highlightedItem: HighlightedItem;
      }> = [];

      if (accessibilityMode === 'chunked') {
        const chunkSize = Math.ceil(dataLength / accessibilityChunkCount);
        for (let i = 0; i < accessibilityChunkCount && i * chunkSize < dataLength; i++) {
          const startIndex = i * chunkSize;
          const endIndex = Math.min((i + 1) * chunkSize, dataLength);
          const chunkLength = endIndex - startIndex;
          const item: HighlightedItem = { dataIndex: startIndex };

          regions.push({
            key: `chunk-${i}`,
            flex: chunkLength,
            label: getAccessibilityLabelForItems([item]),
            highlightedItem: item,
          });
        }
      } else if (accessibilityMode === 'item') {
        for (let i = 0; i < dataLength; i++) {
          const item: HighlightedItem = { dataIndex: i };
          regions.push({
            key: `item-${i}`,
            flex: 1,
            label: getAccessibilityLabelForItems([item]),
            highlightedItem: item,
          });
        }
      }

      return regions;
    }, [
      enableHighlighting,
      accessibilityLabel,
      accessibilityMode,
      accessibilityChunkCount,
      dataLength,
      getAccessibilityLabelForItems,
    ]);

    const content = (
      <HighlightContext.Provider value={contextValue}>
        <ScrubberContext.Provider value={scrubberContextValue}>
          {children}
          {accessibilityRegions && (
            <View pointerEvents="box-none" style={styles.accessibilityContainer}>
              {accessibilityRegions.map((region) => (
                <View
                  key={region.key}
                  accessible
                  accessibilityLabel={region.label}
                  accessibilityRole="button"
                  onAccessibilityTap={() => {
                    setHighlight([region.highlightedItem]);
                    setTimeout(() => {
                      setHighlight([]);
                    }, 100);
                  }}
                  style={{ flex: region.flex }}
                />
              ))}
            </View>
          )}
        </ScrubberContext.Provider>
      </HighlightContext.Provider>
    );

    if (enableHighlighting) {
      return <GestureDetector gesture={gesture}>{content}</GestureDetector>;
    }

    return content;
  },
);

const styles = StyleSheet.create({
  accessibilityContainer: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});
