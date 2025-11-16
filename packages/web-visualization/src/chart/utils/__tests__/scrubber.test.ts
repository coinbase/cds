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
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 150 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);
      expect(result.get('label1')).toBe(150);
    });

    it('should clamp label to minimum bound', () => {
      const dimensions = [
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 5 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);
      // minY = 0 + 24/2 = 12
      expect(result.get('label1')).toBe(12);
    });

    it('should clamp label to maximum bound', () => {
      const dimensions = [
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 295 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);
      // maxY = 0 + 300 - 24/2 = 288
      expect(result.get('label1')).toBe(288);
    });
  });

  describe('with multiple non-overlapping labels', () => {
    it('should keep all labels at their preferred positions', () => {
      const dimensions = [
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { seriesId: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 100 },
        { seriesId: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 150 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);
      expect(result.get('label1')).toBe(50);
      expect(result.get('label2')).toBe(100);
      expect(result.get('label3')).toBe(150);
    });

    it('should keep four evenly spaced labels at their preferred positions', () => {
      const dimensions = [
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { seriesId: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 100 },
        { seriesId: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 150 },
        { seriesId: 'label4', width: 50, height: 24, preferredX: 100, preferredY: 200 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);

      // All labels should stay at their exact preferred positions
      expect(result.get('label1')).toBe(50);
      expect(result.get('label2')).toBe(100);
      expect(result.get('label3')).toBe(150);
      expect(result.get('label4')).toBe(200);
    });
  });

  describe('with overlapping labels', () => {
    it('should push down overlapping labels', () => {
      const dimensions = [
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { seriesId: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 60 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);

      // Labels form collision group and are centered around their average (50+60)/2 = 55
      // With spacing of 28, they're positioned at 55-14=41 and 55+14=69
      expect(result.get('label1')).toBe(41);
      expect(result.get('label2')).toBe(69);

      // Verify proper spacing
      expect(result.get('label2')! - result.get('label1')!).toBe(28);
    });

    it('should handle cascade of overlapping labels', () => {
      const dimensions = [
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { seriesId: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 55 },
        { seriesId: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 60 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);

      // Labels form collision group and are centered around their average (50+55+60)/3 = 55
      // Middle label at 55, others spaced 28 apart
      expect(result.get('label1')).toBe(27);
      expect(result.get('label2')).toBe(55);
      expect(result.get('label3')).toBe(83);

      // Verify proper spacing
      expect(result.get('label2')! - result.get('label1')!).toBe(28);
      expect(result.get('label3')! - result.get('label2')!).toBe(28);
    });

    it('should sort labels by preferredY before collision detection', () => {
      const dimensions = [
        { seriesId: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 60 },
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { seriesId: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 55 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);

      // Despite different input order, results should be same as cascade test
      expect(result.get('label1')).toBe(27);
      expect(result.get('label2')).toBe(55);
      expect(result.get('label3')).toBe(83);
    });
  });

  describe('with bottom overflow (collision group handling)', () => {
    it('should shift only collision group when overflowing', () => {
      const dimensions = [
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { seriesId: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 260 },
        { seriesId: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 270 },
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

    it('should handle one label at top and three labels grouped at bottom', () => {
      // Simulating: Boston at top (32), Miami/Denver/Phoenix grouped at bottom (234ish)
      // Drawing area: y=32, height=202, so maxY = 32 + 202 - 12 = 222
      const smallArea: Rect = { x: 16, y: 32, width: 662, height: 202 };
      const dimensions = [
        { seriesId: 'Boston', width: 100, height: 24, preferredX: 100, preferredY: 32 },
        { seriesId: 'Miami', width: 100, height: 24, preferredX: 100, preferredY: 234 },
        { seriesId: 'Denver', width: 100, height: 24, preferredX: 100, preferredY: 238 },
        { seriesId: 'Phoenix', width: 100, height: 24, preferredX: 100, preferredY: 242 },
      ];
      const result = calculateLabelYPositions(dimensions, smallArea, labelHeight, minGap);

      // Boston should stay at preferred position (clamped to minY = 44)
      expect(result.get('Boston')).toBe(44);

      // Bottom three labels should be grouped and fit within bounds
      const miamiY = result.get('Miami')!;
      const denverY = result.get('Denver')!;
      const phoenixY = result.get('Phoenix')!;

      // They should be in order
      expect(miamiY).toBeLessThan(denverY);
      expect(denverY).toBeLessThan(phoenixY);

      // All should be within bounds
      expect(miamiY).toBeGreaterThanOrEqual(44);
      expect(phoenixY).toBeLessThanOrEqual(222);

      // They should maintain proper spacing
      expect(denverY - miamiY).toBe(28);
      expect(phoenixY - denverY).toBe(28);

      // Phoenix should be at or very close to maxY
      expect(phoenixY).toBeCloseTo(222, 0);
    });

    it('should handle two grouped at bottom, two spaced out above', () => {
      const dimensions = [
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { seriesId: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 150 },
        { seriesId: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 260 },
        { seriesId: 'label4', width: 50, height: 24, preferredX: 100, preferredY: 265 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);

      // label1 and label2 should stay at preferred positions (not part of collision)
      expect(result.get('label1')).toBe(50);
      expect(result.get('label2')).toBe(150);

      // label3 and label4 form a collision group centered around (260+265)/2 = 262.5
      const label3Y = result.get('label3')!;
      const label4Y = result.get('label4')!;

      // They should maintain proper spacing
      expect(label4Y - label3Y).toBe(28);

      // Both should be within bounds (maxY = 288)
      expect(label3Y).toBeLessThanOrEqual(288);
      expect(label4Y).toBeLessThanOrEqual(288);

      // They should be centered around their preferred average
      expect(label3Y).toBeCloseTo(248.5, 1);
      expect(label4Y).toBeCloseTo(276.5, 1);
    });

    it('should compress gaps when not enough space for collision group', () => {
      const smallDrawingArea: Rect = { x: 0, y: 0, width: 500, height: 100 };
      const dimensions = [
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 60 },
        { seriesId: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 65 },
        { seriesId: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 70 },
        { seriesId: 'label4', width: 50, height: 24, preferredX: 100, preferredY: 75 },
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
        { seriesId: 'isolated', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { seriesId: 'group1', width: 50, height: 24, preferredX: 100, preferredY: 150 },
        { seriesId: 'group2', width: 50, height: 24, preferredX: 100, preferredY: 155 },
        { seriesId: 'group3', width: 50, height: 24, preferredX: 100, preferredY: 160 },
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
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: -10 },
        { seriesId: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 0 },
        { seriesId: 'label3', width: 50, height: 24, preferredX: 100, preferredY: 5 },
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
        { seriesId: 'wide', width: 100, height: 24, preferredX: 100, preferredY: 50 },
        { seriesId: 'narrow', width: 30, height: 24, preferredX: 100, preferredY: 60 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minGap);

      // Labels form collision group, centered around (50+60)/2 = 55
      expect(result.get('wide')).toBe(41);
      expect(result.get('narrow')).toBe(69);

      // Width doesn't affect Y positioning
      expect(result.get('narrow')! - result.get('wide')!).toBe(28);
    });
  });

  describe('with custom minGap', () => {
    it('should respect larger gap between labels', () => {
      const largeGap = 16;
      const dimensions = [
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { seriesId: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 60 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, largeGap);

      // Centered around (50+60)/2 = 55, with spacing of 24+16=40
      expect(result.get('label1')).toBe(35);
      expect(result.get('label2')).toBe(75);

      // Verify proper spacing with larger gap
      expect(result.get('label2')! - result.get('label1')!).toBe(40);
    });

    it('should respect smaller gap between labels', () => {
      const smallGap = 1;
      const dimensions = [
        { seriesId: 'label1', width: 50, height: 24, preferredX: 100, preferredY: 50 },
        { seriesId: 'label2', width: 50, height: 24, preferredX: 100, preferredY: 60 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, labelHeight, smallGap);

      // Centered around (50+60)/2 = 55, with spacing of 24+1=25
      expect(result.get('label1')).toBe(42.5);
      expect(result.get('label2')).toBe(67.5);

      // Verify proper spacing with smaller gap
      expect(result.get('label2')! - result.get('label1')!).toBe(25);
    });
  });

  describe('with custom labelHeight', () => {
    it('should respect larger label height', () => {
      const largeLabelHeight = 32;
      const dimensions = [
        { seriesId: 'label1', width: 50, height: 32, preferredX: 100, preferredY: 50 },
        { seriesId: 'label2', width: 50, height: 32, preferredX: 100, preferredY: 60 },
      ];
      const result = calculateLabelYPositions(dimensions, drawingArea, largeLabelHeight, minGap);

      // Centered around (50+60)/2 = 55, with spacing of 32+4=36
      expect(result.get('label1')).toBe(37);
      expect(result.get('label2')).toBe(73);

      // Verify proper spacing with larger label height
      expect(result.get('label2')! - result.get('label1')!).toBe(36);
    });
  });
});
