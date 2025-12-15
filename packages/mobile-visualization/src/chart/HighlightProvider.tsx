import React, { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { Haptics } from '@coinbase/cds-mobile/utils/haptics';

import { getPointOnSerializableScale } from './utils/point';
import { useCartesianChartContext } from './ChartProvider';
import {
  HighlightContext,
  type HighlightContextValue,
  type HighlightedItemData,
  invertSerializableScale,
} from './utils';

export type HighlightProviderBaseProps = {
  /**
   * Whether highlighting is enabled.
   * @default false
   */
  enableHighlighting?: boolean;
  /**
   * Allows continuous gestures on the chart to continue outside the bounds of the chart element.
   */
  allowOverflowGestures?: boolean;
  /**
   * Callback when highlighted item changes.
   */
  onHighlightChange?: (item: HighlightedItemData | undefined) => void;
};

export type HighlightProviderProps = HighlightProviderBaseProps & {
  children: React.ReactNode;
};

/**
 * A component which encapsulates the HighlightContext.
 * Provides unified highlight state management for both Cartesian and Polar charts on mobile.
 *
 * Uses SharedValue for smooth animations with react-native-reanimated.
 * Handles gesture detection when enableHighlighting is true.
 */
export const HighlightProvider: React.FC<HighlightProviderProps> = ({
  children,
  enableHighlighting = false,
  allowOverflowGestures,
  onHighlightChange,
}) => {
  const chartContext = useCartesianChartContext();
  const highlightedItem = useSharedValue<HighlightedItemData | undefined>(undefined);

  const setHighlightedItem = useCallback(
    (item: HighlightedItemData | undefined) => {
      highlightedItem.value = item;
      onHighlightChange?.(item);
    },
    [highlightedItem, onHighlightChange],
  );

  const contextValue: HighlightContextValue = useMemo(
    () => ({
      enableHighlighting,
      highlightedItem,
      setHighlightedItem,
    }),
    [enableHighlighting, highlightedItem, setHighlightedItem],
  );

  // Get scale info for gesture handling (only available in Cartesian charts)
  const xAxis = useMemo(() => chartContext?.getXAxis?.(), [chartContext]);
  const xScale = useMemo(() => chartContext?.getXSerializableScale?.(), [chartContext]);

  const getDataIndexFromX = useCallback(
    (touchX: number): number => {
      'worklet';

      if (!xScale || !xAxis) return 0;

      if (xScale.type === 'band') {
        const [domainMin, domainMax] = xScale.domain;
        const categoryCount = domainMax - domainMin + 1;
        let closestIndex = 0;
        let closestDistance = Infinity;

        for (let i = 0; i < categoryCount; i++) {
          const xPos = getPointOnSerializableScale(i, xScale);
          if (xPos !== undefined) {
            const distance = Math.abs(touchX - xPos);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = i;
            }
          }
        }
        return closestIndex;
      } else {
        // For numeric scales with axis data, find the nearest data point
        const axisData = xAxis.data;
        if (axisData && Array.isArray(axisData) && typeof axisData[0] === 'number') {
          const numericData = axisData as number[];
          let closestIndex = 0;
          let closestDistance = Infinity;

          for (let i = 0; i < numericData.length; i++) {
            const xValue = numericData[i];
            const xPos = getPointOnSerializableScale(xValue, xScale);
            if (xPos !== undefined) {
              const distance = Math.abs(touchX - xPos);
              if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
              }
            }
          }
          return closestIndex;
        } else {
          const xValue = invertSerializableScale(touchX, xScale);
          const dataIndex = Math.round(xValue);
          const domain = xAxis.domain;
          return Math.max(domain.min ?? 0, Math.min(dataIndex, domain.max ?? 0));
        }
      }
    },
    [xAxis, xScale],
  );

  const handleStartEndHaptics = useCallback(() => {
    void Haptics.lightImpact();
  }, []);

  // Notify callback when highlighted item changes
  useAnimatedReaction(
    () => highlightedItem.value,
    (currentValue, previousValue) => {
      if (onHighlightChange !== undefined && currentValue !== previousValue) {
        runOnJS(onHighlightChange)(currentValue);
      }
    },
    [onHighlightChange],
  );

  // Create the long press pan gesture for highlighting
  const longPressGesture = useMemo(
    () =>
      Gesture.Pan()
        .activateAfterLongPress(110)
        .shouldCancelWhenOutside(!allowOverflowGestures)
        .onStart(function onStart(event) {
          runOnJS(handleStartEndHaptics)();

          // Android does not trigger onUpdate when the gesture starts
          if (Platform.OS === 'android') {
            const dataIndex = getDataIndexFromX(event.x);
            const current = highlightedItem.value;
            if (current?.dataIndex !== dataIndex) {
              highlightedItem.value = { ...current, dataIndex };
            }
          }
        })
        .onUpdate(function onUpdate(event) {
          const dataIndex = getDataIndexFromX(event.x);
          const current = highlightedItem.value;
          if (current?.dataIndex !== dataIndex) {
            highlightedItem.value = { ...current, dataIndex };
          }
        })
        .onEnd(function onEnd() {
          if (enableHighlighting) {
            runOnJS(handleStartEndHaptics)();
            highlightedItem.value = undefined;
          }
        })
        .onTouchesCancelled(function onTouchesCancelled() {
          if (enableHighlighting) {
            highlightedItem.value = undefined;
          }
        }),
    [
      allowOverflowGestures,
      handleStartEndHaptics,
      getDataIndexFromX,
      highlightedItem,
      enableHighlighting,
    ],
  );

  const content = (
    <HighlightContext.Provider value={contextValue}>{children}</HighlightContext.Provider>
  );

  // Wrap with gesture handler only if highlighting is enabled and we have chart context
  if (enableHighlighting && chartContext) {
    return <GestureDetector gesture={longPressGesture}>{content}</GestureDetector>;
  }

  return content;
};
