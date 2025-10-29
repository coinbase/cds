import React, { useCallback, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Haptics } from '@coinbase/cds-mobile/utils/haptics';

import { useCartesianChartContext } from '../ChartProvider';
import { isCategoricalScale, ScrubberContext, type ScrubberContextValue } from '../utils';

export type ScrubberProviderProps = Partial<
  Pick<ScrubberContextValue, 'enableScrubbing' | 'onScrubberPositionChange'>
> & {
  children: React.ReactNode;
  /**
   * Allows continuous gestures on the chart to continue outside the bounds of the chart element.
   */
  allowOverflowGestures?: boolean;
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

  const { getXScale, getXAxis, series } = chartContext;
  const [scrubberPosition, setScrubberPosition] = useState<number | undefined>(undefined);

  const getDataIndexFromX = useCallback(
    (touchX: number): number => {
      const xScale = getXScale();
      const xAxis = getXAxis();

      if (!xScale || !xAxis) return 0;

      if (isCategoricalScale(xScale)) {
        const categories = xScale.domain?.() ?? xAxis.data ?? [];
        const bandwidth = xScale.bandwidth?.() ?? 0;
        let closestIndex = 0;
        let closestDistance = Infinity;
        for (let i = 0; i < categories.length; i++) {
          const xPos = xScale(i);
          if (xPos !== undefined) {
            const distance = Math.abs(touchX - (xPos + bandwidth / 2));
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
          // We have numeric axis data - find the closest data point
          const numericData = axisData as number[];
          let closestIndex = 0;
          let closestDistance = Infinity;

          for (let i = 0; i < numericData.length; i++) {
            const xValue = numericData[i];
            const xPos = xScale(xValue);
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
          const xValue = xScale.invert(touchX);
          const dataIndex = Math.round(xValue);
          const domain = xAxis.domain;
          return Math.max(domain.min ?? 0, Math.min(dataIndex, domain.max ?? 0));
        }
      }
    },
    [getXScale, getXAxis],
  );

  const handlePositionUpdate = useCallback(
    (x: number) => {
      if (!enableScrubbing || !series || series.length === 0) return;

      const dataIndex = getDataIndexFromX(x);
      if (dataIndex !== scrubberPosition) {
        setScrubberPosition(dataIndex);
        onScrubberPositionChange?.(dataIndex);
      }
    },
    [enableScrubbing, series, getDataIndexFromX, scrubberPosition, onScrubberPositionChange],
  );

  const handleInteractionEnd = useCallback(() => {
    if (!enableScrubbing) return;
    setScrubberPosition(undefined);
    onScrubberPositionChange?.(undefined);
  }, [enableScrubbing, onScrubberPositionChange]);

  // Gesture handler callbacks
  const handleOnStartJsThread = useCallback(() => {
    void Haptics.lightImpact();
    // Could add onScrubStart callback here if needed
  }, []);

  const handleOnEndOrCancelledJsThread = useCallback(() => {
    handleInteractionEnd();
  }, [handleInteractionEnd]);

  const handleOnUpdateJsThread = useCallback(
    (x: number) => {
      handlePositionUpdate(x);
    },
    [handlePositionUpdate],
  );

  const handleOnEndJsThread = useCallback(() => {
    void Haptics.lightImpact();
    handleOnEndOrCancelledJsThread();
  }, [handleOnEndOrCancelledJsThread]);

  // Create the long press pan gesture
  const longPressGesture = useMemo(
    () =>
      Gesture.Pan()
        .activateAfterLongPress(110)
        .shouldCancelWhenOutside(!allowOverflowGestures)
        .onStart(function onStart(event) {
          runOnJS(handleOnStartJsThread)();

          // Android does not trigger onUpdate when the gesture starts. This achieves consistent behavior across both iOS and Android
          if (Platform.OS === 'android') {
            runOnJS(handleOnUpdateJsThread)(event.x);
          }
        })
        .onUpdate(function onUpdate(event) {
          runOnJS(handleOnUpdateJsThread)(event.x);
        })
        .onEnd(function onEnd() {
          runOnJS(handleOnEndJsThread)();
        })
        .onTouchesCancelled(function onTouchesCancelled() {
          runOnJS(handleOnEndOrCancelledJsThread)();
        }),
    [
      allowOverflowGestures,
      handleOnStartJsThread,
      handleOnUpdateJsThread,
      handleOnEndJsThread,
      handleOnEndOrCancelledJsThread,
    ],
  );

  const contextValue: ScrubberContextValue = useMemo(
    () => ({
      enableScrubbing: !!enableScrubbing,
      scrubberPosition,
      onScrubberPositionChange: setScrubberPosition,
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
