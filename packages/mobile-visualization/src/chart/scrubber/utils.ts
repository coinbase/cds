import { runOnJS } from 'react-native-reanimated';
import type { Rect } from '@coinbase/cds-common/types';

type LabelDimension = {
  id: string;
  width: number;
  height: number;
  preferredX: number;
  preferredY: number;
};

/**
 * Determines which side (left/right) to place labels based on available space.
 * Prefers right side, switches to left when labels would overflow.
 */
export function calculateLabelSideStrategy(
  beaconX: number,
  maxLabelWidth: number,
  drawingArea: Rect,
  xOffset: number = 16,
): 'left' | 'right' {
  'worklet';

  // Safety check for valid bounds
  if (drawingArea.width <= 0 || drawingArea.height <= 0) {
    return 'right'; // Default to right if bounds are invalid
  }

  // Calculate available space on the right side
  const availableRightSpace = drawingArea.x + drawingArea.width - beaconX;

  // Check if longest label + offset fits on the right side
  const requiredSpace = maxLabelWidth + xOffset;

  // Prefer right side, switch to left only if it doesn't fit
  return requiredSpace <= availableRightSpace ? 'right' : 'left';
}

type LabelWithPosition = {
  id: string;
  preferredY: number;
  boundedY: number;
  finalY: number;
};

/**
 * Simple approach: Find all connected overlapping labels in one pass using Union-Find
 */
function findConnectedGroups(
  labels: LabelWithPosition[],
  labelHeight: number,
  minGap: number,
): LabelWithPosition[][] {
  'worklet';

  const requiredDistance = labelHeight + minGap;
  const sortedLabels = [...labels].sort((a, b) => a.boundedY - b.boundedY);

  // Union-Find to group connected overlapping labels
  const parent = new Map<string, string>();
  const findRoot = (id: string): string => {
    if (parent.get(id) !== id) {
      parent.set(id, findRoot(parent.get(id)!));
    }
    return parent.get(id)!;
  };

  // Initialize each label as its own parent
  for (const label of sortedLabels) {
    parent.set(label.id, label.id);
  }

  // Connect overlapping labels
  for (let i = 0; i < sortedLabels.length - 1; i++) {
    const current = sortedLabels[i];
    const next = sortedLabels[i + 1];

    const distance = next.boundedY - current.boundedY;
    if (distance < requiredDistance) {
      // Union: connect these labels
      const rootA = findRoot(current.id);
      const rootB = findRoot(next.id);
      if (rootA !== rootB) {
        parent.set(rootB, rootA);
      }
    }
  }

  // Group labels by their root parent
  const groups = new Map<string, LabelWithPosition[]>();
  for (const label of sortedLabels) {
    const root = findRoot(label.id);
    if (!groups.has(root)) {
      groups.set(root, []);
    }
    groups.get(root)!.push(label);
  }

  return Array.from(groups.values());
}

/**
 * Redistributes labels in a group to avoid overlaps while maintaining relative order.
 */
function redistributeGroup(
  group: LabelWithPosition[],
  drawingArea: Rect,
  labelHeight: number,
  minGap: number,
): void {
  'worklet';

  if (group.length === 1) {
    // Single label - just ensure it's within bounds
    const label = group[0];
    const minY = drawingArea.y + labelHeight / 2;
    const maxY = drawingArea.y + drawingArea.height - labelHeight / 2;
    label.finalY = Math.max(minY, Math.min(maxY, label.boundedY));
    return;
  }

  // Sort group by original preferred Y to maintain relative order
  group.sort((a, b) => a.preferredY - b.preferredY);

  // Calculate total space needed
  const totalLabelSpace = group.length * labelHeight;
  const totalGapSpace = (group.length - 1) * minGap;
  const totalNeeded = totalLabelSpace + totalGapSpace;

  if (totalNeeded > drawingArea.height) {
    // Not enough space - compress gaps if necessary
    const availableGapSpace = drawingArea.height - totalLabelSpace;
    const compressedGap = Math.max(1, availableGapSpace / Math.max(1, group.length - 1));

    let currentY = drawingArea.y + labelHeight / 2;
    for (const label of group) {
      label.finalY = currentY;
      currentY += labelHeight + compressedGap;
    }
  } else {
    // Enough space - center the group around the collective preferred position
    const groupCenter = group.reduce((sum, l) => sum + l.preferredY, 0) / group.length;

    // Calculate ideal positioning - center the label centers around the group center
    const totalSpanBetweenCenters = (group.length - 1) * (labelHeight + minGap);
    const firstLabelCenterY = groupCenter - totalSpanBetweenCenters / 2;
    const lastLabelCenterY = groupCenter + totalSpanBetweenCenters / 2;

    // Calculate drawing area bounds for label centers
    const drawingAreaTop = drawingArea.y + labelHeight / 2;
    const drawingAreaBottom = drawingArea.y + drawingArea.height - labelHeight / 2;

    // Check if ideal positioning fits within bounds
    let finalFirstCenterY: number;

    if (firstLabelCenterY >= drawingAreaTop && lastLabelCenterY <= drawingAreaBottom) {
      // Perfect fit - use ideal positions
      finalFirstCenterY = firstLabelCenterY;
    } else if (firstLabelCenterY < drawingAreaTop) {
      // Group extends above bounds - shift down minimally
      finalFirstCenterY = drawingAreaTop;
    } else {
      // Group extends below bounds - shift up so last label center is at drawingAreaBottom
      finalFirstCenterY = drawingAreaBottom - totalSpanBetweenCenters;
    }

    // Distribute labels with proper center positioning
    let currentCenterY = finalFirstCenterY;
    for (const label of group) {
      label.finalY = currentCenterY;
      currentCenterY += labelHeight + minGap;
    }
  }
}

/**
 * Calculates Y positions for all labels avoiding overlaps while maintaining order.
 */
export function calculateLabelYPositions(
  dimensions: LabelDimension[],
  drawingArea: Rect,
  labelHeight: number,
  minGap: number = 2,
): Map<string, number> {
  'worklet';

  if (dimensions.length === 0) {
    return new Map();
  }

  // Step 1: Sort by preferred Y values and create working labels
  const sortedLabels: LabelWithPosition[] = [...dimensions]
    .sort((a, b) => a.preferredY - b.preferredY)
    .map((dim) => ({
      id: dim.id,
      preferredY: dim.preferredY,
      boundedY: dim.preferredY,
      finalY: dim.preferredY,
    }));

  // Step 2: Initial bounds fitting
  const minY = drawingArea.y + labelHeight / 2;
  const maxY = drawingArea.y + drawingArea.height - labelHeight / 2;

  for (const label of sortedLabels) {
    // Clamp each label to the drawing area
    label.finalY = Math.max(minY, Math.min(maxY, label.preferredY));
  }

  // Step 3: Find connected groups and redistribute in ONE pass
  const connectedGroups = findConnectedGroups(sortedLabels, labelHeight, minGap);

  // Process each group once
  for (const group of connectedGroups) {
    redistributeGroup(group, drawingArea, labelHeight, minGap);
  }

  // Return final positions
  const result = new Map<string, number>();
  for (const label of sortedLabels) {
    result.set(label.id, label.finalY);
  }

  return result;
}
