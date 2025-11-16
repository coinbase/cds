import type { Rect } from '@coinbase/cds-common/types';

export type ScrubberLabelPosition = 'left' | 'right';

type LabelDimension = {
  id: string;
  width: number;
  height: number;
  preferredX: number;
  preferredY: number;
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
  boundedY: number;
  finalY: number;
};

const getConnectedScrubberLabels = (
  labels: LabelWithPosition[],
  labelHeight: number,
  minGap: number,
): LabelWithPosition[][] => {
  'worklet';

  const requiredDistance = labelHeight + minGap;
  const sortedLabels = [...labels].sort((a, b) => a.boundedY - b.boundedY);

  console.log('  getConnectedScrubberLabels - requiredDistance:', requiredDistance);

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
    console.log(
      `  Checking ${current.id} (${current.boundedY.toFixed(2)}) vs ${next.id} (${next.boundedY.toFixed(2)}): distance=${distance.toFixed(2)}, required=${requiredDistance.toFixed(2)}, collision=${distance < requiredDistance}`,
    );

    if (distance < requiredDistance) {
      // Union: connect these labels
      const rootA = findRoot(current.id);
      const rootB = findRoot(next.id);
      if (rootA !== rootB) {
        console.log(`    -> Connecting ${current.id} and ${next.id} (roots: ${rootA}, ${rootB})`);
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
};

const redistributeGroup = (
  group: LabelWithPosition[],
  drawingArea: Rect,
  labelHeight: number,
  minGap: number,
) => {
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

  console.log('=== calculateLabelYPositions START ===');
  console.log('Input dimensions:', JSON.stringify(dimensions, null, 2));
  console.log('drawingArea:', JSON.stringify(drawingArea));
  console.log('labelHeight:', labelHeight, 'minGap:', minGap);

  // Step 1: Sort by preferred Y values and create working labels
  const sortedLabels: LabelWithPosition[] = [...dimensions]
    .sort((a, b) => a.preferredY - b.preferredY)
    .map((dim) => ({
      id: dim.id,
      preferredY: dim.preferredY,
      boundedY: dim.preferredY,
      finalY: dim.preferredY,
    }));

  console.log('Step 1 - Sorted labels:', JSON.stringify(sortedLabels, null, 2));

  // Step 2: Initial bounds fitting
  const minY = drawingArea.y + labelHeight / 2;
  const maxY = drawingArea.y + drawingArea.height - labelHeight / 2;

  console.log('Step 2 - Bounds:', JSON.stringify({ minY, maxY }));

  for (const label of sortedLabels) {
    // Clamp each label to the drawing area
    label.finalY = Math.max(minY, Math.min(maxY, label.preferredY));
    // Update boundedY to reflect the clamped position for collision detection
    label.boundedY = label.finalY;
  }

  console.log('Step 2 - After clamping:', JSON.stringify(sortedLabels, null, 2));

  // Step 3: Sequential spacing enforcement - ensure no overlaps by processing labels in order
  console.log('\n--- Step 3: Sequential spacing enforcement ---');
  const requiredDistance = labelHeight + minGap;

  // First pass: push down any overlapping labels
  for (let i = 1; i < sortedLabels.length; i++) {
    const prev = sortedLabels[i - 1];
    const current = sortedLabels[i];
    const minAllowedY = prev.finalY + requiredDistance;

    if (current.finalY < minAllowedY) {
      console.log(
        `  Adjusting ${current.id}: ${current.finalY.toFixed(2)} -> ${minAllowedY.toFixed(2)} (too close to ${prev.id})`,
      );
      current.finalY = minAllowedY;
    }
  }

  // Check if labels overflow the bottom boundary
  const lastLabel = sortedLabels[sortedLabels.length - 1];
  const bottomOverflow = lastLabel.finalY + labelHeight / 2 - (drawingArea.y + drawingArea.height);

  if (bottomOverflow > 0) {
    console.log(`  Bottom overflow detected: ${bottomOverflow.toFixed(2)}px`);

    // Calculate total space needed and available
    const totalNeeded = sortedLabels.length * labelHeight + (sortedLabels.length - 1) * minGap;
    const totalAvailable = drawingArea.height;

    if (totalNeeded > totalAvailable) {
      // Not enough space - compress gaps uniformly
      console.log('  Not enough space - compressing gaps uniformly');
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
      console.log('  Enough space - shifting all labels up');
      const shiftAmount = bottomOverflow;
      for (const label of sortedLabels) {
        label.finalY -= shiftAmount;
      }
    }
  }

  console.log('Step 3 - After spacing enforcement:', JSON.stringify(sortedLabels, null, 2));

  // Return final positions
  const result = new Map<string, number>();
  for (const label of sortedLabels) {
    result.set(label.id, label.finalY);
  }

  console.log('Final result:', Array.from(result.entries()));
  console.log('=== calculateLabelYPositions END ===\n');

  return result;
};
