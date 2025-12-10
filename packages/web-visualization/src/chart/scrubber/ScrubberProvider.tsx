import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { isCategoricalScale, ScrubberContext, type ScrubberContextValue } from '../utils';

export type ScrubberProviderProps = Partial<
  Pick<ScrubberContextValue, 'enableScrubbing' | 'onScrubberPositionChange'>
> & {
  children: React.ReactNode;
};

/**
 * A component which encapsulates the ScrubberContext.
 * It depends on a ChartContext in order to provide accurate mouse tracking.
 */
export const ScrubberProvider: React.FC<ScrubberProviderProps> = ({
  children,
  enableScrubbing,
  onScrubberPositionChange,
}) => {
  const chartContext = useCartesianChartContext();

  if (!chartContext) {
    throw new Error('ScrubberProvider must be used within a ChartContext');
  }

  const { getXScale, getXAxis, series, ref } = chartContext;
  const [scrubberPosition, setScrubberPosition] = useState<number | undefined>(undefined);

  const getDataIndexFromX = useCallback(
    (mouseX: number): number => {
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
            const distance = Math.abs(mouseX - (xPos + bandwidth / 2));
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
              const distance = Math.abs(mouseX - xPos);
              if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
              }
            }
          }
          return closestIndex;
        } else {
          const xValue = xScale.invert(mouseX);
          const dataIndex = Math.round(xValue);
          const domain = xAxis.domain;
          return Math.max(domain.min ?? 0, Math.min(dataIndex, domain.max ?? 0));
        }
      }
    },
    [getXScale, getXAxis],
  );

  const handlePointerMove = useCallback(
    (clientX: number, target: SVGSVGElement) => {
      if (!enableScrubbing || !series || series.length === 0) return;

      const rect = target.getBoundingClientRect();
      const x = clientX - rect.left;

      const dataIndex = getDataIndexFromX(x);

      if (dataIndex !== scrubberPosition) {
        setScrubberPosition(dataIndex);
        onScrubberPositionChange?.(dataIndex);
      }
    },
    [enableScrubbing, series, getDataIndexFromX, scrubberPosition, onScrubberPositionChange],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const target = event.currentTarget as SVGSVGElement;
      handlePointerMove(event.clientX, target);
    },
    [handlePointerMove],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!event.touches.length) return;
      // Prevent scrolling while scrubbing
      event.preventDefault();
      const touch = event.touches[0];
      const target = event.currentTarget as SVGSVGElement;
      handlePointerMove(touch.clientX, target);
    },
    [handlePointerMove],
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (!enableScrubbing || !event.touches.length) return;
      // Handle initial touch
      const touch = event.touches[0];
      const target = event.currentTarget as SVGSVGElement;
      handlePointerMove(touch.clientX, target);
    },
    [enableScrubbing, handlePointerMove],
  );

  const handlePointerLeave = useCallback(() => {
    if (!enableScrubbing) return;
    setScrubberPosition(undefined);
    onScrubberPositionChange?.(undefined);
  }, [enableScrubbing, onScrubberPositionChange]);

  const handleMouseLeave = handlePointerLeave;
  const handleTouchEnd = handlePointerLeave;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enableScrubbing) return;

      const xScale = getXScale();
      const xAxis = getXAxis();

      if (!xScale || !xAxis) return;

      const isBand = isCategoricalScale(xScale);

      // Determine the actual data indices we can navigate to
      let minIndex: number;
      let maxIndex: number;
      let dataPoints: number | undefined;

      if (isBand) {
        // For categorical scales, use the categories
        const categories = xScale.domain?.() ?? xAxis.data ?? [];
        minIndex = 0;
        maxIndex = Math.max(0, categories.length - 1);
        dataPoints = categories.length;
      } else {
        // For numeric scales, check if we have specific data points
        const axisData = xAxis.data;
        if (axisData && Array.isArray(axisData)) {
          // We have specific data points - use their indices
          minIndex = 0;
          maxIndex = Math.max(0, axisData.length - 1);
          dataPoints = axisData.length;
        } else {
          // Fall back to domain-based navigation for continuous scales without specific data
          const domain = xAxis.domain;
          minIndex = domain.min ?? 0;
          maxIndex = domain.max ?? 0;
          dataPoints = maxIndex - minIndex + 1;
        }
      }

      const currentIndex = scrubberPosition ?? minIndex;
      const dataRange = maxIndex - minIndex;

      // Multi-step jump when shift is held (10% of data range, minimum 1, maximum 10)
      const multiSkip = event.shiftKey;
      const stepSize = multiSkip ? Math.min(10, Math.max(1, Math.floor(dataRange * 0.1))) : 1;

      let newIndex: number | undefined;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          newIndex = Math.max(minIndex, currentIndex - stepSize);
          break;
        case 'ArrowRight':
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
          newIndex = undefined; // Clear highlighting
          break;
        default:
          return; // Don't handle other keys
      }

      if (newIndex !== scrubberPosition) {
        setScrubberPosition(newIndex);
        onScrubberPositionChange?.(newIndex);
      }
    },
    [enableScrubbing, getXScale, getXAxis, scrubberPosition, onScrubberPositionChange],
  );

  const handleBlur = useCallback(() => {
    if (!enableScrubbing || scrubberPosition === undefined) return;
    setScrubberPosition(undefined);
    onScrubberPositionChange?.(undefined);
  }, [enableScrubbing, onScrubberPositionChange, scrubberPosition]);

  // Attach event listeners to SVG element
  useEffect(() => {
    if (!ref?.current || !enableScrubbing) return;

    const svg = ref.current;

    // Add event listeners
    svg.addEventListener('mousemove', handleMouseMove);
    svg.addEventListener('mouseleave', handleMouseLeave);
    svg.addEventListener('touchstart', handleTouchStart, { passive: false });
    svg.addEventListener('touchmove', handleTouchMove, { passive: false });
    svg.addEventListener('touchend', handleTouchEnd);
    svg.addEventListener('touchcancel', handleTouchEnd);
    svg.addEventListener('keydown', handleKeyDown);
    svg.addEventListener('blur', handleBlur);

    return () => {
      svg.removeEventListener('mousemove', handleMouseMove);
      svg.removeEventListener('mouseleave', handleMouseLeave);
      svg.removeEventListener('touchstart', handleTouchStart);
      svg.removeEventListener('touchmove', handleTouchMove);
      svg.removeEventListener('touchend', handleTouchEnd);
      svg.removeEventListener('touchcancel', handleTouchEnd);
      svg.removeEventListener('keydown', handleKeyDown);
      svg.removeEventListener('blur', handleBlur);
    };
  }, [
    ref,
    enableScrubbing,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
    handleBlur,
  ]);

  const contextValue: ScrubberContextValue = useMemo(
    () => ({
      enableScrubbing: !!enableScrubbing,
      scrubberPosition,
      onScrubberPositionChange: setScrubberPosition,
    }),
    [enableScrubbing, scrubberPosition],
  );

  return <ScrubberContext.Provider value={contextValue}>{children}</ScrubberContext.Provider>;
};
