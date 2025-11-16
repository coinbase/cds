import type { Rect } from '@coinbase/cds-common/types';

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
