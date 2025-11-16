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
    // Find the collision group causing the overflow (labels that were moved from their preferred positions)
    const collisionGroup: LabelWithPosition[] = [];
    for (let i = sortedLabels.length - 1; i >= 0; i--) {
      const label = sortedLabels[i];
      // Include labels that were moved or are adjacent to moved labels
      if (Math.abs(label.finalY - label.preferredY) > 0.01 || collisionGroup.length > 0) {
        collisionGroup.unshift(label);
      } else {
        // Stop when we find a label at its preferred position with space below it
        break;
      }
    }

    // Calculate total space needed for collision group
    const groupTotalNeeded =
      collisionGroup.length * labelHeight + (collisionGroup.length - 1) * minGap;
    const firstLabel = collisionGroup[0];
    const availableSpace =
      drawingArea.y + drawingArea.height - (firstLabel.finalY - labelHeight / 2);

    if (groupTotalNeeded > availableSpace) {
      // Not enough space - compress gaps within collision group
      const compressedGap = Math.max(
        1,
        (availableSpace - collisionGroup.length * labelHeight) /
          Math.max(1, collisionGroup.length - 1),
      );
      let currentY = firstLabel.finalY;
      for (const label of collisionGroup) {
        label.finalY = currentY;
        currentY += labelHeight + compressedGap;
      }
    } else {
      // Enough space - shift only the collision group up to fit
      for (const label of collisionGroup) {
        label.finalY -= bottomOverflow;
      }
    }
  }

  const result = new Map<string, number>();
  for (const label of sortedLabels) {
    result.set(label.id, label.finalY);
  }

  return result;
};
