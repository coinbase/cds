import type { Rect } from '@coinbase/cds-common/types';

export type ScrubberBeaconLabelGroupLabel = {
  /**
   * Id of the label.
   */
  id: string;
  /**
   * Label to be displayed.
   */
  label: string;
  /**
   * Color of the label.
   * @default theme.color.fgPrimary
   */
  color?: string;
};

export type ScrubberLabelPosition = 'left' | 'right';

export type LabelPosition = {
  id: string;
  x: number;
  y: number;
};

export type LabelDimensions = {
  width: number;
  height: number;
};

/**
 * Determines which side (left/right) to place scrubber labels based on available space.
 * Prefers right side, switches to left when labels would overflow.
 */
export const getLabelPosition = (
  beaconX: number,
  maxLabelWidth: number,
  drawingArea: Rect,
  xOffset: number = 16,
): ScrubberLabelPosition => {
  'worklet'; // any regular functions in ui thread must be marked with 'worklet'

  if (drawingArea.width <= 0 || drawingArea.height <= 0) {
    return 'right';
  }

  const availableRightSpace = drawingArea.x + drawingArea.width - beaconX;
  const requiredSpace = maxLabelWidth + xOffset;

  return requiredSpace <= availableRightSpace ? 'right' : 'left';
};

type LabelWithPosition = {
  id: string;
  preferredY: number;
  finalY: number;
};

type LabelDimension = {
  id: string;
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
      id: dim.id,
      preferredY: dim.preferredY,
      finalY: dim.preferredY,
    }));

  // Initial bounds fitting
  const minY = drawingArea.y + labelHeight / 2;
  const maxY = drawingArea.y + drawingArea.height - labelHeight / 2;

  for (const label of sortedLabels) {
    // Clamp each label to the drawing area
    label.finalY = Math.max(minY, Math.min(maxY, label.preferredY));
  }

  // Ensure no overlaps by processing labels in order
  const requiredDistance = labelHeight + minGap;

  // First pass: push down any overlapping labels
  for (let i = 1; i < sortedLabels.length; i++) {
    const prev = sortedLabels[i - 1];
    const current = sortedLabels[i];
    const minAllowedY = prev.finalY + requiredDistance;

    if (current.finalY < minAllowedY) {
      current.finalY = minAllowedY;
    }
  }

  // Check if labels overflow the bottom boundary
  const lastLabel = sortedLabels[sortedLabels.length - 1];
  const bottomOverflow = lastLabel.finalY + labelHeight / 2 - (drawingArea.y + drawingArea.height);

  if (bottomOverflow > 0) {
    // Calculate total space needed and available
    const totalNeeded = sortedLabels.length * labelHeight + (sortedLabels.length - 1) * minGap;
    const totalAvailable = drawingArea.height;

    if (totalNeeded > totalAvailable) {
      // Not enough space - compress gaps uniformly
      const compressedGap = Math.max(
        1,
        (totalAvailable - sortedLabels.length * labelHeight) / Math.max(1, sortedLabels.length - 1),
      );
      let currentY = minY;
      for (const label of sortedLabels) {
        label.finalY = currentY;
        currentY += labelHeight + compressedGap;
      }
    } else {
      // Enough space - shift everything up to fit
      const shiftAmount = bottomOverflow;
      for (const label of sortedLabels) {
        label.finalY -= shiftAmount;
      }
    }
  }

  // Return final positions
  const result = new Map<string, number>();
  for (const label of sortedLabels) {
    result.set(label.id, label.finalY);
  }

  return result;
};
