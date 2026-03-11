import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useScreenReaderStatus } from '@coinbase/cds-mobile/hooks/useScreenReaderStatus';

import { useCartesianChartContext } from '../ChartProvider';
import {
  getScrubberSampledIndices,
  getScrubberSegmentWeights,
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
  },
});

const summaryHintHorizontal = 'Swipe left or right to hear more points.';
const summaryHintVertical = 'Swipe up or down to hear more points.';

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
  const shouldShow = isScreenReaderEnabled;
  const {
    dataLength,
    drawingArea,
    layout,
    getXAxis,
    getYAxis,
    getXSerializableScale,
    getYSerializableScale,
  } = useCartesianChartContext();
  const { enableScrubbing } = useScrubberContext();

  const isHorizontalLayout = layout === 'horizontal';
  const categoryAxis = useMemo(
    () => (isHorizontalLayout ? getYAxis() : getXAxis()),
    [isHorizontalLayout, getXAxis, getYAxis],
  );
  const categoryScale = useMemo(
    () => (isHorizontalLayout ? getYSerializableScale() : getXSerializableScale()),
    [isHorizontalLayout, getXSerializableScale, getYSerializableScale],
  );

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

  const segmentOrientation = isHorizontalLayout ? 'vertical' : 'horizontal';
  const { leading, segmentWeights, trailing } = useMemo(
    () =>
      getScrubberSegmentWeights(
        sampledIndices,
        dataLength,
        categoryScale,
        categoryAxis,
        drawingArea,
        segmentOrientation,
      ),
    [sampledIndices, dataLength, categoryScale, categoryAxis, drawingArea, segmentOrientation],
  );

  const sampledSegments = useMemo(() => {
    if (accessibilityLabel === undefined) return [];

    return sampledIndices.map((index, position) => {
      const weight = segmentWeights[position] ?? 1;
      const pointLabel =
        typeof accessibilityLabel === 'function' ? accessibilityLabel(index) : accessibilityLabel;

      return {
        index,
        weight,
        accessibilityLabel: pointLabel || `Data point ${index + 1}`,
      };
    });
  }, [accessibilityLabel, sampledIndices, segmentWeights]);

  const getSegmentStyle = useCallback((weight: number) => ({ flex: weight }), []);

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
    !shouldShow ||
    !enableScrubbing ||
    !accessibilityLabel ||
    dataLength <= 0 ||
    drawingArea.width <= 0 ||
    drawingArea.height <= 0 ||
    sampledSegments.length === 0
  ) {
    return null;
  }

  const summaryHint = isHorizontalLayout ? summaryHintVertical : summaryHintHorizontal;
  const segmentsFlexDirection = isHorizontalLayout ? 'column' : 'row';

  return (
    <View pointerEvents="box-none" style={[styles.container, overlayStyle]}>
      {summaryLabel && (
        <View
          accessible
          accessibilityHint={summaryHint}
          accessibilityLabel={summaryLabel}
          style={styles.summaryTarget}
        />
      )}
      <View style={[styles.segments, { flexDirection: segmentsFlexDirection }]}>
        {leading > 0 && <View style={getSegmentStyle(leading)} />}
        {sampledSegments.map((segment) => (
          <Pressable
            key={segment.index}
            accessible
            accessibilityLabel={segment.accessibilityLabel}
            style={getSegmentStyle(segment.weight)}
          />
        ))}
        {trailing > 0 && <View style={getSegmentStyle(trailing)} />}
      </View>
    </View>
  );
});
