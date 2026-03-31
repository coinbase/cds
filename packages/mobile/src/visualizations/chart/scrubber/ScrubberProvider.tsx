import React, { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { Haptics } from '@coinbase/cds-mobile/utils/haptics';

import { useCartesianChartContext } from '../ChartProvider';
import { invertSerializableScale, ScrubberContext, type ScrubberContextValue } from '../utils';
import { getPointOnSerializableScale } from '../utils/point';

export type ScrubberProviderProps = Partial<Pick<ScrubberContextValue, 'enableScrubbing'>> & {
  children: React.ReactNode;
  /**
   * Allows continuous gestures on the chart to continue outside the bounds of the chart element.
   */
  allowOverflowGestures?: boolean;
  /**
   * Callback fired when the scrubber position changes.
   * Receives the dataIndex of the scrubber or undefined when not scrubbing.
   */
  onScrubberPositionChange?: (index: number | undefined) => void;
};

/**
 * A component which encapsulates the ScrubberContext.
 * It depends on a ChartContext in order to provide accurate touch tracking.
 */
export const ScrubberProvider: React.FC<ScrubberProviderProps> = ({
  children,
  enableScrubbing,
  onScrubberPositionChange,
  allowOverflowGestures,
}) => {
  const chartContext = useCartesianChartContext();

  if (!chartContext) {
    throw new Error('ScrubberProvider must be used within a ChartContext');
  }

  const { layout, getXSerializableScale, getYSerializableScale, getXAxis, getYAxis } = chartContext;
  const scrubberPosition = useSharedValue<number | undefined>(undefined);

  const categoryAxisIsX = useMemo(() => layout !== 'horizontal', [layout]);
  const categoryAxis = useMemo(
    () => (categoryAxisIsX ? getXAxis() : getYAxis()),
    [categoryAxisIsX, getXAxis, getYAxis],
  );
  const categoryScale = useMemo(
    () => (categoryAxisIsX ? getXSerializableScale() : getYSerializableScale()),
    [categoryAxisIsX, getXSerializableScale, getYSerializableScale],
  );

  const getDataIndexFromPosition = useCallback(
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
      } else {
        // For numeric scales with axis data, find the nearest data point.
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
        } else {
          const dataValue = invertSerializableScale(touchPosition, categoryScale);
          const dataIndex = Math.round(dataValue);
          const domain = categoryAxis.domain;
          return Math.max(domain.min ?? 0, Math.min(dataIndex, domain.max ?? 0));
        }
      }
    },
    [categoryAxis, categoryScale],
  );

  const handleStartEndHaptics = useCallback(() => {
    void Haptics.lightImpact();
  }, []);

  useAnimatedReaction(
    () => scrubberPosition.value,
    (currentValue, previousValue) => {
      // Confirm changes here and inside of our gesture handler before calling JS thread
      // To prevent any rerenders
      if (onScrubberPositionChange !== undefined && currentValue !== previousValue) {
        runOnJS(onScrubberPositionChange)(currentValue);
      }
    },
    [onScrubberPositionChange],
  );

  // Create the long press pan gesture
  const longPressGesture = useMemo(
    () =>
      Gesture.Pan()
        .activateAfterLongPress(110)
        .shouldCancelWhenOutside(!allowOverflowGestures)
        .onStart(function onStart(event) {
          runOnJS(handleStartEndHaptics)();

          // Android does not trigger onUpdate when the gesture starts. This achieves consistent behavior across both iOS and Android
          if (Platform.OS === 'android') {
            const pointerPosition = categoryAxisIsX ? event.x : event.y;
            const newScrubberPosition = getDataIndexFromPosition(pointerPosition);
            if (newScrubberPosition !== scrubberPosition.value) {
              scrubberPosition.value = newScrubberPosition;
            }
          }
        })
        .onUpdate(function onUpdate(event) {
          const pointerPosition = categoryAxisIsX ? event.x : event.y;
          const newScrubberPosition = getDataIndexFromPosition(pointerPosition);
          if (newScrubberPosition !== scrubberPosition.value) {
            scrubberPosition.value = newScrubberPosition;
          }
        })
        .onEnd(function onEnd() {
          if (enableScrubbing) {
            runOnJS(handleStartEndHaptics)();
            scrubberPosition.value = undefined;
          }
        })
        .onTouchesCancelled(function onTouchesCancelled() {
          if (enableScrubbing) {
            scrubberPosition.value = undefined;
          }
        }),
    [
      allowOverflowGestures,
      handleStartEndHaptics,
      getDataIndexFromPosition,
      categoryAxisIsX,
      scrubberPosition,
      enableScrubbing,
    ],
  );

  const contextValue: ScrubberContextValue = useMemo(
    () => ({
      enableScrubbing: !!enableScrubbing,
      scrubberPosition,
    }),
    [enableScrubbing, scrubberPosition],
  );

  const content = (
    <ScrubberContext.Provider value={contextValue}>{children}</ScrubberContext.Provider>
  );

  // Wrap with gesture handler only if scrubbing is enabled
  if (enableScrubbing) {
    return <GestureDetector gesture={longPressGesture}>{content}</GestureDetector>;
  }

  return content;
};
