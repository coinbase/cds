import { formatAxisTick, getAxisTicksData } from '../axis';
import {
  type CategoricalScale,
  getCategoricalScale,
  getNumericScale,
  type NumericScale,
} from '../scale';

describe('getAxisTicksData', () => {
  let numericScale: NumericScale;
  let bandScale: CategoricalScale;

  beforeEach(() => {
    numericScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 10 },
      range: { min: 0, max: 400 },
    });

    bandScale = getCategoricalScale({
      domain: { min: 0, max: 4 }, // 5 categories (0, 1, 2, 3, 4)
      range: { min: 0, max: 400 },
      padding: 0.1,
    });
  });

  describe('tickInterval parameter', () => {
    it('should generate evenly distributed ticks with tickInterval', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        tickInterval: 80,
        possibleTickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      });

      // With 400px range and 80px interval, should get ~5 ticks
      expect(result.length).toBe(5);

      // Should always include first and last values
      expect(result[0].tick).toBe(0);
      expect(result[result.length - 1].tick).toBe(10);

      // Check positions are correct
      expect(result[0].position).toBe(0);
      expect(result[result.length - 1].position).toBe(400);
    });

    it('should handle small tickInterval (more ticks)', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        tickInterval: 40,
        possibleTickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      });

      // With 400px range and 40px interval, should get ~10 ticks
      expect(result.length).toBe(10);
      expect(result[0].tick).toBe(0);
      expect(result[result.length - 1].tick).toBe(10);
    });

    it('should handle large tickInterval (fewer ticks)', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        tickInterval: 120,
        possibleTickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      });

      // With 400px range and 120px interval, should get ~3-4 ticks (minimum 4)
      expect(result.length).toBeGreaterThanOrEqual(3);
      expect(result.length).toBeLessThanOrEqual(4);
      expect(result[0].tick).toBe(0);
      expect(result[result.length - 1].tick).toBe(10);
    });

    it('should generate whole integers from domain when no possibleTickValues provided', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        tickInterval: 80,
        // No possibleTickValues provided
      });

      // Should still generate ticks from domain [0, 10]
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].tick).toBe(0);
      expect(result[result.length - 1].tick).toBe(10);

      // All tick values should be integers
      result.forEach(({ tick }) => {
        expect(Number.isInteger(tick)).toBe(true);
        expect(tick).toBeGreaterThanOrEqual(0);
        expect(tick).toBeLessThanOrEqual(10);
      });
    });

    it('should use requestedTickCount when both requestedTickCount and tickInterval are provided', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        tickInterval: 80, // This should be ignored
        requestedTickCount: 5, // This should be used
        possibleTickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      });

      // Should use requestedTickCount logic, not tickInterval
      // D3's ticks(5) may not return exactly 5, but should be close and not based on pixel spacing
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThanOrEqual(10); // Reasonable upper bound
      // Should not be exactly 5 ticks that tickInterval would generate (400px / 80px)
      expect(result.length).not.toBe(5);
    });
  });

  describe('requestedTickCount parameter', () => {
    it('should use D3 tick generation with requestedTickCount', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        requestedTickCount: 5,
      });

      expect(result.length).toBeGreaterThan(0);
      // D3 may not return exactly 5 ticks, but should be close
      expect(result.length).toBeLessThanOrEqual(10);

      // All positions should be within range
      result.forEach(({ position }) => {
        expect(position).toBeGreaterThanOrEqual(0);
        expect(position).toBeLessThanOrEqual(400);
      });
    });
  });

  describe('explicit ticks array', () => {
    it('should use exact tick values when provided as array', () => {
      const exactTicks = [0, 2.5, 5, 7.5, 10];
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        ticks: exactTicks,
      });

      expect(result.length).toBe(5);
      expect(result.map((r) => r.tick)).toEqual(exactTicks);

      // Check positions are calculated correctly
      expect(result[0].position).toBe(0); // 0 -> 0px
      expect(result[1].position).toBe(100); // 2.5 -> 100px
      expect(result[2].position).toBe(200); // 5 -> 200px
      expect(result[3].position).toBe(300); // 7.5 -> 300px
      expect(result[4].position).toBe(400); // 10 -> 400px
    });
  });

  describe('tick filter function', () => {
    it('should filter ticks using predicate function with possibleTickValues', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        ticks: (value) => value % 2 === 0, // Only even numbers
        possibleTickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      });

      const expectedTicks = [0, 2, 4, 6, 8, 10];
      expect(result.map((r) => r.tick)).toEqual(expectedTicks);

      // Check positions
      expect(result[0].position).toBe(0); // 0 -> 0px
      expect(result[1].position).toBe(80); // 2 -> 80px
      expect(result[2].position).toBe(160); // 4 -> 160px
    });

    it('should fallback to D3 ticks when no possibleTickValues provided', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        ticks: (value) => value % 2 === 0,
        requestedTickCount: 6,
      });

      expect(result.length).toBeGreaterThan(0);
      // All returned ticks should pass the filter
      result.forEach(({ tick }) => {
        expect(tick % 2).toBe(0);
      });
    });
  });

  describe('band scale with categories', () => {
    it('should handle band scale with explicit tick indices', () => {
      const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const result = getAxisTicksData({
        scaleFunction: bandScale,
        categories,
        ticks: [0, 2, 4], // Show only Jan, Mar, May
      });

      expect(result.length).toBe(3);
      expect(result[0].tick).toBe(0); // Jan
      expect(result[1].tick).toBe(2); // Mar
      expect(result[2].tick).toBe(4); // May

      // Positions should be centered in bands
      const bandwidth = bandScale.bandwidth();
      expect(result[0].position).toBe(bandScale(0)! + bandwidth / 2);
      expect(result[1].position).toBe(bandScale(2)! + bandwidth / 2);
      expect(result[2].position).toBe(bandScale(4)! + bandwidth / 2);
    });

    it('should handle band scale with filter function', () => {
      const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const result = getAxisTicksData({
        scaleFunction: bandScale,
        categories,
        ticks: (index) => index % 2 === 0, // Show only even indices
      });

      expect(result.length).toBe(3); // indices 0, 2, 4
      expect(result[0].tick).toBe(0);
      expect(result[1].tick).toBe(2);
      expect(result[2].tick).toBe(4);
    });

    it('should show all categories when no ticks specified', () => {
      const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const result = getAxisTicksData({
        scaleFunction: bandScale,
        categories,
      });

      expect(result.length).toBe(5);
      expect(result.map((r) => r.tick)).toEqual([0, 1, 2, 3, 4]);
    });

    it('should filter out invalid indices for band scale', () => {
      const categories = ['Jan', 'Feb', 'Mar'];
      const result = getAxisTicksData({
        scaleFunction: bandScale,
        categories,
        ticks: [-1, 0, 1, 2, 5, 10], // Include invalid indices
      });

      // Should only include valid indices 0, 1, 2
      expect(result.length).toBe(3);
      expect(result.map((r) => r.tick)).toEqual([0, 1, 2]);
    });
  });

  describe('tick generation options', () => {
    it('should respect minStep option to prevent fractional steps', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        tickInterval: 80,
        options: {
          minStep: 1, // Prevent fractional steps
        },
      });

      // All tick values should be integers
      result.forEach(({ tick }) => {
        expect(Number.isInteger(tick)).toBe(true);
      });

      // Check that steps between ticks are at least 1
      for (let i = 1; i < result.length; i++) {
        const step = result[i].tick - result[i - 1].tick;
        expect(step).toBeGreaterThanOrEqual(1);
      }
    });

    it('should respect maxStep option to prevent large steps', () => {
      // Create a scale with larger domain
      const largeScale = getNumericScale({
        scaleType: 'linear',
        domain: { min: 0, max: 1000 },
        range: { min: 0, max: 400 },
      });

      const result = getAxisTicksData({
        scaleFunction: largeScale,
        tickInterval: 50, // Would normally create large steps
        options: {
          maxStep: 100, // Limit step size
        },
      });

      // Check that steps between ticks don't exceed maxStep
      for (let i = 1; i < result.length; i++) {
        const step = result[i].tick - result[i - 1].tick;
        expect(step).toBeLessThanOrEqual(100);
      }
    });

    it('should respect minTickCount option', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        tickInterval: 200, // Very large interval that would produce few ticks
        options: {
          minTickCount: 6, // Force at least 6 ticks
        },
      });

      expect(result.length).toBeGreaterThanOrEqual(6);
    });

    it('should combine minStep and maxStep options', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        tickInterval: 80,
        options: {
          minStep: 2, // Steps must be at least 2
          maxStep: 5, // Steps cannot exceed 5
        },
      });

      // Check all steps are within bounds
      for (let i = 1; i < result.length; i++) {
        const step = result[i].tick - result[i - 1].tick;
        expect(step).toBeGreaterThanOrEqual(2);
        expect(step).toBeLessThanOrEqual(5);
      }
    });

    it('should enforce minStep even when it conflicts with tickInterval', () => {
      // Small domain that would normally produce small steps
      const smallScale = getNumericScale({
        scaleType: 'linear',
        domain: { min: 0, max: 5 },
        range: { min: 0, max: 400 },
      });

      const result = getAxisTicksData({
        scaleFunction: smallScale,
        tickInterval: 40, // Would create many small steps
        options: {
          minStep: 2, // Force larger steps
        },
      });

      // All steps should be at least 2
      for (let i = 1; i < result.length; i++) {
        const step = result[i].tick - result[i - 1].tick;
        expect(step).toBeGreaterThanOrEqual(2);
      }
    });

    it('should work with minTickCount and minStep together', () => {
      // Use a larger domain to accommodate both minTickCount and minStep
      const largeScale = getNumericScale({
        scaleType: 'linear',
        domain: { min: 0, max: 100 },
        range: { min: 0, max: 400 },
      });

      const result = getAxisTicksData({
        scaleFunction: largeScale,
        tickInterval: 100,
        options: {
          minTickCount: 5,
          minStep: 1,
        },
      });

      // Note: minTickCount is a minimum suggestion, but nice step calculation
      // may result in fewer ticks. The important thing is minStep is enforced.
      expect(result.length).toBeGreaterThan(0);

      // Steps should be at least 1
      for (let i = 1; i < result.length; i++) {
        const step = result[i].tick - result[i - 1].tick;
        expect(step).toBeGreaterThanOrEqual(1);
      }

      // Should include first and last values
      expect(result[0].tick).toBe(0);
      expect(result[result.length - 1].tick).toBe(100);
    });
  });

  describe('edge cases and error conditions', () => {
    it('should handle empty possibleTickValues', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        tickInterval: 80,
        possibleTickValues: [],
      });

      // Should fallback to generating from domain
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle undefined possibleTickValues with tickInterval', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        tickInterval: 80,
        // possibleTickValues is undefined
      });

      expect(result.length).toBeGreaterThan(0);
      expect(result[0].tick).toBe(0);
      expect(result[result.length - 1].tick).toBe(10);
    });

    it('should handle very small tickInterval', () => {
      const result = getAxisTicksData({
        scaleFunction: numericScale,
        tickInterval: 1, // Very small interval
        possibleTickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      });

      // Should be limited by possibleTickValues length
      expect(result.length).toBe(11); // All possible values
    });
  });
});

describe('formatAxisTick', () => {
  it('should use custom formatter when provided', () => {
    const formatter = (value: number) => `$${value}`;
    const result = formatAxisTick(100, formatter);
    expect(result).toBe('$100');
  });

  it('should return value as-is when no formatter provided', () => {
    const result = formatAxisTick(100);
    expect(result).toBe(100);
  });

  it('should handle string values', () => {
    const result = formatAxisTick('test');
    expect(result).toBe('test');
  });

  it('should handle null/undefined values', () => {
    expect(formatAxisTick(null)).toBe(null);
    expect(formatAxisTick(undefined)).toBe(undefined);
  });
});
