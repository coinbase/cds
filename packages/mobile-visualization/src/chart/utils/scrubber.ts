import type { Rect } from '@coinbase/cds-common/types';

import type { AxisConfig } from './axis';
import { getPointOnSerializableScale } from './point';
import type { SerializableBandScale, SerializableScale } from './scale';

export type ScrubberLabelPosition = 'left' | 'right';

export type LabelPosition = {
  seriesId: string;
  x: number;
  y: number;
};

export type LabelDimensions = {
  width: number;
  height: number;
};

export const defaultScrubberAccessibilitySampleCount = 10;

/**
 * Calculates the fallback scrubber accessibility step based on data length.
 */
export const getDefaultScrubberAccessibilityStep = (
  dataLength: number,
  sampleCount: number = defaultScrubberAccessibilitySampleCount,
): number => {
  if (dataLength <= 0) return 1;
  return Math.max(1, Math.ceil(dataLength / sampleCount));
};

/**
 * Normalizes explicit scrubber accessibility step values.
 * Falls back to a provided default step when value is undefined.
 */
export const normalizeScrubberAccessibilityStep = (
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

/**
 * Builds sampled indices used by screen-reader scrubber navigation.
 * Always includes the first and last data indices.
 */
export const getScrubberSampledIndices = (dataLength: number, step: number): number[] => {
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

/**
 * Resolves the category value in scale domain for a given data index.
 * For band scales: uses index. For numeric scales with axis data: uses axis.data[index].
 */
function getCategoryValueForIndex(
  index: number,
  scale: SerializableScale,
  axis: AxisConfig | undefined,
): number {
  if (scale.type === 'band') {
    return index;
  }
  const axisData = axis?.data;
  if (axisData && Array.isArray(axisData) && typeof axisData[0] === 'number') {
    const numericData = axisData as number[];
    return numericData[index] ?? index;
  }
  return index;
}

export type ScrubberSegmentWeightsResult = {
  leading: number;
  segmentWeights: number[];
  trailing: number;
};

export type ScrubberSegmentOrientation = 'horizontal' | 'vertical';

/**
 * Computes segment weights for scrubber accessibility view based on the chart's category axis scale.
 * For band scales: each segment spans one band (stepStart to stepEnd) with leading/trailing
 * spacing for outer padding. For numeric scales: weights reflect actual pixel span.
 *
 * @param orientation - 'horizontal' for left-to-right (vertical chart layout), 'vertical' for top-to-bottom (horizontal chart layout)
 */
export const getScrubberSegmentWeights = (
  sampledIndices: number[],
  dataLength: number,
  categoryScale: SerializableScale | undefined,
  categoryAxis: AxisConfig | undefined,
  drawingArea: Rect,
  orientation: ScrubberSegmentOrientation = 'horizontal',
): ScrubberSegmentWeightsResult => {
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

/**
 * Determines which side (left/right) to place scrubber labels based on available space.
 * Honors the preferred side when there's enough space, otherwise switches to the opposite side.
 */
export const getLabelPosition = (
  beaconX: number,
  maxLabelWidth: number,
  drawingArea: Rect,
  xOffset: number = 16,
  preferredSide: ScrubberLabelPosition = 'right',
): ScrubberLabelPosition => {
  'worklet'; // any regular functions in ui thread must be marked with 'worklet'

  if (drawingArea.width <= 0 || drawingArea.height <= 0) {
    return preferredSide;
  }

  const requiredSpace = maxLabelWidth + xOffset;

  if (preferredSide === 'right') {
    const availableSpace = drawingArea.x + drawingArea.width - beaconX;
    return requiredSpace <= availableSpace ? 'right' : 'left';
  }

  const availableSpace = beaconX - drawingArea.x;
  return requiredSpace <= availableSpace ? 'left' : 'right';
};

type LabelWithPosition = {
  seriesId: string;
  preferredY: number;
  finalY: number;
};

type LabelDimension = {
  seriesId: string;
  width: number;
  height: number;
  preferredX: number;
  preferredY: number;
};

/**
 * Calculates Y positions for all labels avoiding overlaps while maintaining order.
 */
export const calculateLabelYPositions = (
  dimensions: LabelDimension[],
  drawingArea: Rect,
  labelHeight: number,
  minGap: number,
): Map<string, number> => {
  'worklet';

  if (dimensions.length === 0) {
    return new Map();
  }

  // Sort by preferred Y values and create working labels
  const sortedLabels: LabelWithPosition[] = [...dimensions]
    .sort((a, b) => a.preferredY - b.preferredY)
    .map((dim) => ({
      seriesId: dim.seriesId,
      preferredY: dim.preferredY,
      finalY: dim.preferredY,
    }));

  // Initial bounds fitting
  const minY = drawingArea.y + labelHeight / 2;
  const maxY = drawingArea.y + drawingArea.height - labelHeight / 2;
  const requiredDistance = labelHeight + minGap;

  for (const label of sortedLabels) {
    // Clamp each label to the drawing area
    label.finalY = Math.max(minY, Math.min(maxY, label.preferredY));
  }

  // First pass: push down any overlapping labels
  for (let i = 1; i < sortedLabels.length; i++) {
    const prev = sortedLabels[i - 1];
    const current = sortedLabels[i];
    const minAllowedY = prev.finalY + requiredDistance;

    if (current.finalY < minAllowedY) {
      current.finalY = minAllowedY;
    }
  }

  // Find collision groups - groups of labels that are tightly packed (gap < minGap between them)
  const collisionGroups: LabelWithPosition[][] = [];
  let currentGroup: LabelWithPosition[] = [sortedLabels[0]];

  for (let i = 1; i < sortedLabels.length; i++) {
    const prev = sortedLabels[i - 1];
    const current = sortedLabels[i];
    const gap = current.finalY - prev.finalY - labelHeight;

    if (gap < minGap + 0.01) {
      // Labels are touching or very close - part of same collision group
      currentGroup.push(current);
    } else {
      // Gap is large enough - start new group
      collisionGroups.push(currentGroup);
      currentGroup = [current];
    }
  }
  collisionGroups.push(currentGroup);

  // Process each collision group - optimize positioning to minimize displacement
  for (const group of collisionGroups) {
    if (group.length === 1) {
      // Single label, already at best position
      continue;
    }

    const groupLastLabel = group[group.length - 1];
    const groupFirstLabel = group[0];
    const groupOverflow =
      groupLastLabel.finalY + labelHeight / 2 - (drawingArea.y + drawingArea.height);

    // Calculate the ideal center point for this group
    const groupPreferredCenter =
      group.reduce((sum, label) => sum + label.preferredY, 0) / group.length;
    const groupTotalNeeded = group.length * labelHeight + (group.length - 1) * minGap;

    if (groupOverflow <= 0) {
      // Group fits, but let's center it better if possible
      // Calculate how much we can shift up/down to center around preferred positions
      const currentCenter = (groupFirstLabel.finalY + groupLastLabel.finalY) / 2;
      const desiredShift = groupPreferredCenter - currentCenter;

      // Calculate max shift in each direction
      const maxShiftUp = groupFirstLabel.finalY - minY;
      const maxShiftDown = maxY - groupLastLabel.finalY;

      // Apply the shift, constrained by boundaries
      const actualShift = Math.max(-maxShiftUp, Math.min(maxShiftDown, desiredShift));

      if (Math.abs(actualShift) > 0.01) {
        for (const label of group) {
          label.finalY += actualShift;
        }
      }
    } else {
      // Group overflows - need to adjust
      const groupStartY = groupFirstLabel.finalY - labelHeight / 2;
      const availableSpace = drawingArea.y + drawingArea.height - groupStartY;
      const maxShiftUp = groupFirstLabel.finalY - minY;

      if (maxShiftUp >= groupOverflow) {
        // Can shift entire group up to fit
        for (const label of group) {
          label.finalY -= groupOverflow;
        }
      } else if (groupTotalNeeded <= availableSpace) {
        // Can't shift enough, but there's room - redistribute with proper spacing
        let currentY = Math.max(minY, groupFirstLabel.finalY - maxShiftUp);
        const gap = (availableSpace - group.length * labelHeight) / Math.max(1, group.length - 1);
        for (const label of group) {
          label.finalY = currentY;
          currentY += labelHeight + gap;
        }
      } else {
        // Not enough space even with compression - compress gaps and fit to bottom
        const compressedGap = Math.max(
          1,
          (availableSpace - group.length * labelHeight) / Math.max(1, group.length - 1),
        );
        // Position so last label is at maxY
        let currentY = maxY - (group.length - 1) * (labelHeight + compressedGap);
        currentY = Math.max(minY, currentY);
        for (const label of group) {
          label.finalY = currentY;
          currentY += labelHeight + compressedGap;
        }
      }
    }
  }

  const result = new Map<string, number>();
  for (const label of sortedLabels) {
    result.set(label.seriesId, label.finalY);
  }

  return result;
};
