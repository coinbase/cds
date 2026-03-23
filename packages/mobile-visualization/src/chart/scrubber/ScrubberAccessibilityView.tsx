import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { Rect } from '@coinbase/cds-common/types';
import { useScreenReaderStatus } from '@coinbase/cds-mobile/hooks/useScreenReaderStatus';

import { useCartesianChartContext } from '../ChartProvider';
import { useScrubberContext } from '../utils';
import type { AxisConfig } from '../utils/axis';
import { getPointOnSerializableScale } from '../utils/point';
import type { SerializableBandScale, SerializableScale } from '../utils/scale';

const normalizeScrubberAccessibilityStep = (
  step: number | undefined,
  defaultStep: number = 1,
): number => {
  const resolvedDefaultStep = Number.isFinite(defaultStep)
    ? Math.max(1, Math.floor(defaultStep))
    : 1;

  if (step === undefined || !Number.isFinite(step)) {
    return resolvedDefaultStep;
  }

  return Math.max(1, Math.floor(step));
};

const getScrubberSampledIndices = (dataLength: number, step: number): number[] => {
  if (dataLength <= 0) return [];

  const lastIndex = dataLength - 1;
  if (lastIndex === 0) return [0];

  const normalizedStep = Math.max(1, Math.floor(step));
  const sampledIndices = [0];

  for (let dataIndex = normalizedStep; dataIndex < lastIndex; dataIndex += normalizedStep) {
    sampledIndices.push(dataIndex);
  }

  sampledIndices.push(lastIndex);
  return sampledIndices;
};

const getCategoryValueForIndex = (
  index: number,
  scale: SerializableScale,
  axis: AxisConfig | undefined,
): number => {
  if (scale.type === 'band') {
    return index;
  }
  const axisData = axis?.data;
  if (axisData && Array.isArray(axisData) && typeof axisData[0] === 'number') {
    const numericData = axisData as number[];
    return numericData[index] ?? index;
  }
  return index;
};

type ScrubberSegmentOrientation = 'horizontal' | 'vertical';

const getScrubberSegmentWeights = (
  sampledIndices: number[],
  dataLength: number,
  categoryScale: SerializableScale | undefined,
  categoryAxis: AxisConfig | undefined,
  drawingArea: Rect,
  orientation: ScrubberSegmentOrientation = 'horizontal',
): { leading: number; segmentWeights: number[]; trailing: number } => {
  const dimensionSize = orientation === 'horizontal' ? drawingArea.width : drawingArea.height;
  const dimensionStart = orientation === 'horizontal' ? drawingArea.x : drawingArea.y;
  const dimensionEnd = dimensionStart + dimensionSize;

  if (sampledIndices.length === 0 || !categoryScale || !categoryAxis || dimensionSize <= 0) {
    const segmentWeights = sampledIndices.map((index, position) => {
      const nextIndex = sampledIndices[position + 1] ?? dataLength;
      return Math.max(1, nextIndex - index);
    });
    return { leading: 0, segmentWeights, trailing: 0 };
  }

  if (categoryScale.type === 'band') {
    const bandScale = categoryScale as SerializableBandScale;
    const segmentWeights: number[] = [];
    let leading = 0;
    let trailing = 0;

    for (let i = 0; i < sampledIndices.length; i++) {
      const categoryValue = getCategoryValueForIndex(
        sampledIndices[i],
        categoryScale,
        categoryAxis,
      );
      const posStart = getPointOnSerializableScale(categoryValue, bandScale, 'stepStart');
      const posEnd = getPointOnSerializableScale(categoryValue, bandScale, 'stepEnd');
      segmentWeights.push(Math.max(1, Math.abs(posEnd - posStart)));
      if (i === 0) {
        leading = Math.max(0, Math.min(posStart, posEnd) - dimensionStart);
      }
      if (i === sampledIndices.length - 1) {
        trailing = Math.max(0, dimensionEnd - Math.max(posStart, posEnd));
      }
    }

    return { leading, segmentWeights, trailing };
  }

  const segmentWeights = sampledIndices.map((index, position) => {
    const prevIndex = position > 0 ? sampledIndices[position - 1] : -1;
    const categoryValue = getCategoryValueForIndex(index, categoryScale, categoryAxis);
    const posEnd = getPointOnSerializableScale(categoryValue, categoryScale);
    const posStart =
      prevIndex < 0
        ? dimensionStart
        : getPointOnSerializableScale(
            getCategoryValueForIndex(prevIndex, categoryScale, categoryAxis),
            categoryScale,
          );
    return Math.max(1, Math.abs(posEnd - posStart));
  });

  return { leading: 0, segmentWeights, trailing: 0 };
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  segments: {
    flex: 1,
  },
});

export type ScrubberAccessibilityViewProps = {
  accessibilityLabel?: (dataIndex: number) => string;
  accessibilityStep?: number;
};

export const ScrubberAccessibilityView = memo(
  ({ accessibilityLabel, accessibilityStep }: ScrubberAccessibilityViewProps) => {
    const isScreenReaderEnabled = useScreenReaderStatus();
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
        const pointLabel = accessibilityLabel(index);

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

    const shouldHide = useMemo(
      () =>
        !isScreenReaderEnabled ||
        !enableScrubbing ||
        !accessibilityLabel ||
        dataLength <= 0 ||
        drawingArea.width <= 0 ||
        drawingArea.height <= 0 ||
        sampledSegments.length === 0,
      [
        isScreenReaderEnabled,
        enableScrubbing,
        accessibilityLabel,
        dataLength,
        drawingArea.width,
        drawingArea.height,
        sampledSegments.length,
      ],
    );

    if (shouldHide) return;

    const segmentsFlexDirection = isHorizontalLayout ? 'column' : 'row';

    return (
      <View pointerEvents="box-none" style={[styles.container, overlayStyle]}>
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
  },
);
