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
 * Determines which side (primary/secondary) to place scrubber labels based on available space.
 * For horizontal layout, this is left/right.
 * For vertical layout, this could be top/bottom (though currently we prefer left/right).
 */
export const getLabelPosition = (
  beaconPos: number,
  maxLabelSize: number,
  drawingAreaSize: number,
  offset: number = 16,
): ScrubberLabelPosition => {
  if (drawingAreaSize <= 0) {
    return 'right';
  }

  const availableSpace = drawingAreaSize - beaconPos;
  const requiredSpace = maxLabelSize + offset;

  return requiredSpace <= availableSpace ? 'right' : 'left';
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
 * Calculates collision-free positions for labels along a single axis (stacking axis).
 */
export const calculateLabelStackedPositions = (
  dimensions: LabelDimension[],
  stackingStart: number,
  stackingSize: number,
  labelThickness: number,
  minGap: number,
): Map<string, number> => {
  if (dimensions.length === 0) {
    return new Map();
  }

  // Sort by preferred positions and create working labels
  const sortedLabels: LabelWithPosition[] = [...dimensions]
    .sort((a, b) => a.preferredY - b.preferredY)
    .map((dim) => ({
      seriesId: dim.seriesId,
      preferredY: dim.preferredY,
      finalY: dim.preferredY,
    }));

  // Initial bounds fitting
  const minPos = stackingStart + labelThickness / 2;
  const maxPos = stackingStart + stackingSize - labelThickness / 2;
  const requiredDistance = labelThickness + minGap;

  for (const label of sortedLabels) {
    // Clamp each label to the drawing area
    label.finalY = Math.max(minPos, Math.min(maxPos, label.preferredY));
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

  // Find collision groups - groups of labels that are tightly packed
  const collisionGroups: LabelWithPosition[][] = [];
  let currentGroup: LabelWithPosition[] = [sortedLabels[0]];

  for (let i = 1; i < sortedLabels.length; i++) {
    const prev = sortedLabels[i - 1];
    const current = sortedLabels[i];
    const gap = current.finalY - prev.finalY - labelThickness;

    if (gap < minGap + 0.01) {
      currentGroup.push(current);
    } else {
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
      groupLastLabel.finalY + labelThickness / 2 - (stackingStart + stackingSize);

    // Calculate the ideal center point for this group
    const groupPreferredCenter =
      group.reduce((sum, label) => sum + label.preferredY, 0) / group.length;
    const groupTotalNeeded = group.length * labelThickness + (group.length - 1) * minGap;

    if (groupOverflow <= 0) {
      // Group fits, but let's center it better if possible
      const currentCenter = (groupFirstLabel.finalY + groupLastLabel.finalY) / 2;
      const desiredShift = groupPreferredCenter - currentCenter;

      const maxShiftUp = groupFirstLabel.finalY - minPos;
      const maxShiftDown = maxPos - groupLastLabel.finalY;

      const actualShift = Math.max(-maxShiftUp, Math.min(maxShiftDown, desiredShift));

      if (Math.abs(actualShift) > 0.01) {
        for (const label of group) {
          label.finalY += actualShift;
        }
      }
    } else {
      // Group overflows - need to adjust
      const groupStartY = groupFirstLabel.finalY - labelThickness / 2;
      const availableSpace = stackingStart + stackingSize - groupStartY;
      const maxShiftUp = groupFirstLabel.finalY - minPos;

      if (maxShiftUp >= groupOverflow) {
        // Can shift entire group up to fit
        for (const label of group) {
          label.finalY -= groupOverflow;
        }
      } else if (groupTotalNeeded <= availableSpace) {
        // Can't shift enough, but there's room - redistribute with proper spacing
        let currentY = Math.max(minPos, groupFirstLabel.finalY - maxShiftUp);
        const gap =
          (availableSpace - group.length * labelThickness) / Math.max(1, group.length - 1);
        for (const label of group) {
          label.finalY = currentY;
          currentY += labelThickness + gap;
        }
      } else {
        // Not enough space even with compression - compress gaps and fit to bottom
        const compressedGap = Math.max(
          1,
          (availableSpace - group.length * labelThickness) / Math.max(1, group.length - 1),
        );
        // Position so last label is at maxPos
        let currentY = maxPos - (group.length - 1) * (labelThickness + compressedGap);
        currentY = Math.max(minPos, currentY);
        for (const label of group) {
          label.finalY = currentY;
          currentY += labelThickness + compressedGap;
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
