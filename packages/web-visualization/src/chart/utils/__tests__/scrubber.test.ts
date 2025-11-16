import type { Rect } from '@coinbase/cds-common/types';

import { calculateLabelYPositions, getLabelPosition } from '../scrubber';

describe('getLabelPosition', () => {
  const drawingArea: Rect = {
    x: 0,
    y: 0,
    width: 500,
    height: 300,
  };

  describe('with default xOffset (16)', () => {
    it('should return "right" when enough space is available on the right', () => {
      const result = getLabelPosition(100, 50, drawingArea);
      expect(result).toBe('right');
      // Available right space: 500 - 100 = 400
      // Required space: 50 + 16 = 66
      // 66 <= 400, so "right"
    });

    it('should return "left" when not enough space on the right', () => {
      const result = getLabelPosition(450, 50, drawingArea);
      expect(result).toBe('left');
      // Available right space: 500 - 450 = 50
      // Required space: 50 + 16 = 66
      // 66 > 50, so "left"
    });

    it('should return "right" at the beginning of drawing area', () => {
      const result = getLabelPosition(0, 50, drawingArea);
      expect(result).toBe('right');
    });

    it('should return "left" at the end of drawing area', () => {
      const result = getLabelPosition(500, 50, drawingArea);
      expect(result).toBe('left');
    });
  });

  describe('with custom xOffset', () => {
    it('should return "right" with larger offset when space available', () => {
      const result = getLabelPosition(100, 50, drawingArea, 32);
      expect(result).toBe('right');
      // Available right space: 500 - 100 = 400
      // Required space: 50 + 32 = 82
      // 82 <= 400, so "right"
    });

    it('should return "left" with larger offset when not enough space', () => {
      const result = getLabelPosition(430, 50, drawingArea, 32);
      expect(result).toBe('left');
      // Available right space: 500 - 430 = 70
      // Required space: 50 + 32 = 82
      // 82 > 70, so "left"
    });

    it('should handle zero offset', () => {
      const result = getLabelPosition(450, 50, drawingArea, 0);
      expect(result).toBe('right');
      // Available right space: 500 - 450 = 50
      // Required space: 50 + 0 = 50
      // 50 <= 50, so "right"
    });
  });

  describe('edge cases', () => {
    it('should return "right" when drawing area width is 0', () => {
      const emptyArea: Rect = { x: 0, y: 0, width: 0, height: 300 };
      const result = getLabelPosition(100, 50, emptyArea);
      expect(result).toBe('right');
    });

    it('should return "right" when drawing area height is 0', () => {
      const emptyArea: Rect = { x: 0, y: 0, width: 500, height: 0 };
      const result = getLabelPosition(100, 50, emptyArea);
      expect(result).toBe('right');
    });

    it('should return "right" when drawing area is negative', () => {
      const negativeArea: Rect = { x: 0, y: 0, width: -500, height: -300 };
      const result = getLabelPosition(100, 50, negativeArea);
      expect(result).toBe('right');
    });
  });
});

describe('calculateLabelYPositions', () => {
  const drawingArea: Rect = {
    x: 0,
    y: 0,
    width: 500,
    height: 300,
  };
  const labelHeight = 24;
  const minGap = 4;

  describe('with no labels', () => {
    it('should return empty map', () => {
      const result = calculateLabelYPositions([], drawingArea, labelHeight, minGap);
      expect(result.size).toBe(0);
    });
  });

  describe('with single label', () => {
    it('should return label at preferred position when within bounds', () => {
      const dimensions = [
        { id: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 150 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);
      expect(result.get('label1')).toBe(150);
    });

    it('should clamp label to minimum bound', () => {
      const dimensions = [{ id: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 5 }];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);
      // minY = 0 + 24/2 = 12
      expect(result.get('label1')).toBe(12);
    });

    it('should clamp label to maximum bound', () => {
      const dimensions = [
        { id: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 295 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);
      // maxY = 0 + 300 - 24/2 = 288
      expect(result.get('label1')).toBe(288);
    });
  });

  describe('with multiple non-overlapping labels', () => {
    it('should keep all labels at their preferred positions', () => {
      const dimensions = [
        { id: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { id: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 100 },
        { id: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 150 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);
      expect(result.get('label1')).toBe(50);
      expect(result.get('label2')).toBe(100);
      expect(result.get('label3')).toBe(150);
    });
  });

  describe('with overlapping labels', () => {
    it('should push down overlapping labels', () => {
      const dimensions = [
        { id: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { id: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 60 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);
      expect(result.get('label1')).toBe(50);
      // label2 should be pushed to label1 + labelHeight + minGap = 50 + 24 + 4 = 78
      expect(result.get('label2')).toBe(78);
    });

    it('should handle cascade of overlapping labels', () => {
      const dimensions = [
        { id: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { id: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 55 },
        { id: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 60 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);
      expect(result.get('label1')).toBe(50);
      // label2: 50 + 24 + 4 = 78
      expect(result.get('label2')).toBe(78);
      // label3: 78 + 24 + 4 = 106
      expect(result.get('label3')).toBe(106);
    });

    it('should sort labels by preferredY before collision detection', () => {
      const dimensions = [
        { id: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 60 },
        { id: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { id: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 55 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);
      expect(result.get('label1')).toBe(50);
      expect(result.get('label2')).toBe(78);
      expect(result.get('label3')).toBe(106);
    });
  });

  describe('with bottom overflow (collision group handling)', () => {
    it('should shift only collision group when overflowing', () => {
      const dimensions = [
        { id: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { id: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 260 },
        { id: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 270 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);

      // label1 should stay at preferred position (not part of collision)
      expect(result.get('label1')).toBe(50);

      // label2 and label3 form a collision group that overflows
      const label2Y = result.get('label2')!;
      const label3Y = result.get('label3')!;

      // They should maintain proper spacing
      expect(label3Y - label2Y).toBe(28); // labelHeight + minGap

      // label3 should be at or below maxY (288)
      expect(label3Y).toBeLessThanOrEqual(288);
    });

    it('should compress gaps when not enough space for collision group', () => {
      const smallDrawingArea: Rect = { x: 0, y: 0, width: 500, height: 100 };
      const dimensions = [
        { id: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 60 },
        { id: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 65 },
        { id: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 70 },
        { id: 'label4', width: 50, height: 24, preferredX: 100, preferredY: 75 },
      ];
      const result = calculateLabelYPositions(dimensions, smallDrawingArea, labelHeight, minGap);

      // All labels should fit within drawing area
      const positions = [
        result.get('label1')!,
        result.get('label2')!,
        result.get('label3')!,
        result.get('label4')!,
      ];

      // Check all labels are within bounds
      positions.forEach((pos) => {
        expect(pos).toBeGreaterThanOrEqual(12); // minY = 0 + 24/2
        expect(pos).toBeLessThanOrEqual(88); // maxY = 0 + 100 - 24/2
      });

      // Check labels are in order
      expect(positions[0]).toBeLessThan(positions[1]);
      expect(positions[1]).toBeLessThan(positions[2]);
      expect(positions[2]).toBeLessThan(positions[3]);
    });
  });

  describe('with mixed scenarios', () => {
    it('should handle isolated label with collision group below', () => {
      const dimensions = [
        { id: 'isolated', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { id: 'group1', width: 50, height: 24, preferredX: 100, preferredY: 150 },
        { id: 'group2', width: 50, height: 24, preferredX: 100, preferredY: 155 },
        { id: 'group3', width: 50, height: 24, preferredX: 100, preferredY: 160 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);

      // Isolated label should stay at preferred position
      expect(result.get('isolated')).toBe(50);

      // Collision group should be adjusted
      const group1Y = result.get('group1')!;
      const group2Y = result.get('group2')!;
      const group3Y = result.get('group3')!;

      // Group should maintain proper spacing
      expect(group2Y - group1Y).toBe(28);
      expect(group3Y - group2Y).toBe(28);
    });

    it('should handle all labels clamped to top boundary', () => {
      const dimensions = [
        { id: 'label1', width: 50, height: 24, preferredX: 100, preferredY: -10 },
        { id: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 0 },
        { id: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 5 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);

      const label1Y = result.get('label1')!;
      const label2Y = result.get('label2')!;
      const label3Y = result.get('label3')!;

      // All should be clamped and spaced properly
      expect(label1Y).toBe(12); // minY
      expect(label2Y).toBe(40); // 12 + 28
      expect(label3Y).toBe(68); // 40 + 28
    });

    it('should handle labels with different widths', () => {
      const dimensions = [
        { id: 'wide', width: 100, height: 24, preferredX: 100, preferredY: 50 },
        { id: 'narrow', width: 30, height: 24, preferredX: 100, preferredY: 60 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);

      expect(result.get('wide')).toBe(50);
      expect(result.get('narrow')).toBe(78);
    });
  });

  describe('with custom minGap', () => {
    it('should respect larger gap between labels', () => {
      const largeGap = 16;
      const dimensions = [
        { id: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { id: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 60 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, largeGap);

      expect(result.get('label1')).toBe(50);
      // label2: 50 + 24 + 16 = 90
      expect(result.get('label2')).toBe(90);
    });

    it('should respect smaller gap between labels', () => {
      const smallGap = 1;
      const dimensions = [
        { id: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { id: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 60 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, smallGap);

      expect(result.get('label1')).toBe(50);
      // label2: 50 + 24 + 1 = 75
      expect(result.get('label2')).toBe(75);
    });
  });

  describe('with custom labelHeight', () => {
    it('should respect larger label height', () => {
      const largeLabelHeight = 32;
      const dimensions = [
        { id: 'label1', width: 50, height: 32, preferredX: 100, preferredY: 50 },
        { id: 'label2', width: 50, height: 32, preferredX: 100, preferredY: 60 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, largeLabelHeight, minGap);

      expect(result.get('label1')).toBe(50);
      // label2: 50 + 32 + 4 = 86
      expect(result.get('label2')).toBe(86);
    });
  });
});
