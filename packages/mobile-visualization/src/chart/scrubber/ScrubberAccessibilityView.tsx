import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useScreenReaderStatus } from '@coinbase/cds-mobile/hooks/useScreenReaderStatus';

import { useCartesianChartContext } from '../ChartProvider';
import {
  getScrubberSampledIndices,
  normalizeScrubberAccessibilityStep,
  useScrubberContext,
} from '../utils';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  summaryTarget: {
    opacity: 0,
    position: 'absolute',
    width: 1,
    height: 1,
    left: 0,
    top: 0,
  },
  segments: {
    flex: 1,
    flexDirection: 'row',
  },
});

const defaultSummaryHint = 'Swipe left or right to hear more points.';

export type ScrubberAccessibilityLabel = string | ((dataIndex?: number) => string);

export type ScrubberAccessibilityViewProps = {
  accessibilityLabel?: ScrubberAccessibilityLabel;
  accessibilityStep?: number;
};

export const ScrubberAccessibilityView = memo(function ScrubberAccessibilityView({
  accessibilityLabel,
  accessibilityStep,
}: ScrubberAccessibilityViewProps) {
  const isScreenReaderEnabled = useScreenReaderStatus();
  const { dataLength, drawingArea } = useCartesianChartContext();
  const { enableScrubbing, scrubberPosition } = useScrubberContext();

  const resolvedStep = useMemo(
    () => normalizeScrubberAccessibilityStep(accessibilityStep),
    [accessibilityStep],
  );

  const sampledIndices = useMemo(
    () => getScrubberSampledIndices(dataLength, resolvedStep),
    [dataLength, resolvedStep],
  );

  const summaryLabel = useMemo(() => {
    if (accessibilityLabel === undefined) return;
    const label =
      typeof accessibilityLabel === 'function' ? accessibilityLabel(undefined) : accessibilityLabel;
    return label || undefined;
  }, [accessibilityLabel]);

  const sampledSegments = useMemo(() => {
    if (accessibilityLabel === undefined) return [];

    return sampledIndices.map((index, position) => {
      const nextIndex = sampledIndices[position + 1] ?? dataLength;
      const weight = Math.max(1, nextIndex - index);

      const pointLabel =
        typeof accessibilityLabel === 'function' ? accessibilityLabel(index) : accessibilityLabel;

      return {
        index,
        weight,
        accessibilityLabel: pointLabel || `Data point ${index + 1}`,
      };
    });
  }, [accessibilityLabel, sampledIndices, dataLength]);

  const getSegmentStyle = useCallback((weight: number) => ({ flex: weight }), []);

  const handleActivate = useCallback(
    (index: number) => {
      scrubberPosition.value = index;
    },
    [scrubberPosition],
  );

  const overlayStyle = useMemo(
    () => ({
      left: drawingArea.x,
      top: drawingArea.y,
      width: drawingArea.width,
      height: drawingArea.height,
    }),
    [drawingArea.x, drawingArea.y, drawingArea.width, drawingArea.height],
  );

  if (
    !isScreenReaderEnabled ||
    !enableScrubbing ||
    !accessibilityLabel ||
    dataLength <= 0 ||
    drawingArea.width <= 0 ||
    drawingArea.height <= 0 ||
    sampledSegments.length === 0
  ) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={[styles.container, overlayStyle]}>
      {summaryLabel && (
        <View
          accessibilityHint={defaultSummaryHint}
          accessibilityLabel={summaryLabel}
          accessible
          style={styles.summaryTarget}
        />
      )}
      <View style={styles.segments}>
        {sampledSegments.map((segment) => (
          <Pressable
            key={segment.index}
            accessibilityLabel={segment.accessibilityLabel}
            accessible
            onFocus={() => handleActivate(segment.index)}
            onPress={() => handleActivate(segment.index)}
            style={getSegmentStyle(segment.weight)}
          />
        ))}
      </View>
    </View>
  );
});
