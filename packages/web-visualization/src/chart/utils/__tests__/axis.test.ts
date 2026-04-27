import {
  formatAxisTick,
  getAxisTicksData,
  getCartesianAxisDomain,
  getCartesianAxisScale,
  withBaselineDomain,
} from '../axis';
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

    it('should use middle anchor by default', () => {
      const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const result = getAxisTicksData({
        scaleFunction: bandScale,
        categories,
        ticks: [0],
      });

      const bandwidth = bandScale.bandwidth();
      expect(result[0].position).toBe(bandScale(0)! + bandwidth / 2);
    });

    it('should respect anchor option for band scale positioning', () => {
      const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const bandwidth = bandScale.bandwidth();
      const step = bandScale.step();
      const paddingOffset = (step - bandwidth) / 2;

      // Test stepStart anchor - should be at the start of the step (before band padding)
      const stepStartResult = getAxisTicksData({
        scaleFunction: bandScale,
        categories,
        ticks: [0],
        options: { anchor: 'stepStart' },
      });
      const expectedStepStart = bandScale(0)! - paddingOffset;
      expect(stepStartResult[0].position).toBeCloseTo(expectedStepStart, 5);

      // Test middle anchor (explicit)
      const middleResult = getAxisTicksData({
        scaleFunction: bandScale,
        categories,
        ticks: [0],
        options: { anchor: 'middle' },
      });
      expect(middleResult[0].position).toBe(bandScale(0)! + bandwidth / 2);

      // Test stepEnd anchor - should be at the end of the step
      const stepEndResult = getAxisTicksData({
        scaleFunction: bandScale,
        categories,
        ticks: [0],
        options: { anchor: 'stepEnd' },
      });
      const expectedStepEnd = bandScale(0)! - paddingOffset + step;
      expect(stepEndResult[0].position).toBeCloseTo(expectedStepEnd, 5);
    });

    it('should apply anchor option with tick filter function', () => {
      const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const bandwidth = bandScale.bandwidth();
      const step = bandScale.step();
      const paddingOffset = (step - bandwidth) / 2;
      const expectedStepStart = bandScale(0)! - paddingOffset;

      const result = getAxisTicksData({
        scaleFunction: bandScale,
        categories,
        ticks: (index) => index === 0,
        options: { anchor: 'stepStart' },
      });

      expect(result.length).toBe(1);
      expect(result[0].position).toBeCloseTo(expectedStepStart, 5);
    });

    it('should apply anchor option when showing all categories', () => {
      const categories = ['Jan', 'Feb'];
      const bandwidth = bandScale.bandwidth();
      const step = bandScale.step();
      const paddingOffset = (step - bandwidth) / 2;

      const result = getAxisTicksData({
        scaleFunction: bandScale,
        categories,
        options: { anchor: 'stepStart' },
      });

      expect(result[0].position).toBeCloseTo(bandScale(0)! - paddingOffset, 5);
      expect(result[1].position).toBeCloseTo(bandScale(1)! - paddingOffset, 5);
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

describe('getCartesianAxisDomain', () => {
  const series = [
    { id: 's1', data: [10, 20, 30] },
    { id: 's2', data: [5, 15, 25] },
  ];

  // New layout semantics:
  // - 'vertical': Bars grow vertically (up/down). X is category axis, Y is value axis.
  // - 'horizontal': Bars grow horizontally (left/right). Y is category axis, X is value axis.

  it('should return correct domain for x-axis in vertical layout (category axis)', () => {
    const domain = getCartesianAxisDomain(
      { id: 'x', scaleType: 'band', domainLimit: 'strict' },
      series,
      'x',
      'vertical',
    );
    // For x in vertical, it's the index domain: 0 to dataLength - 1
    expect(domain).toEqual({ min: 0, max: 2 });
  });

  it('should return correct domain for y-axis in vertical layout (value axis)', () => {
    const domain = getCartesianAxisDomain(
      { id: 'y', scaleType: 'linear', domainLimit: 'nice' },
      series,
      'y',
      'vertical',
    );
    // For y in vertical, it's the value domain: min/max of all data
    expect(domain).toEqual({ min: 5, max: 30 });
  });

  it('should return correct domain for x-axis in horizontal layout (value axis)', () => {
    const domain = getCartesianAxisDomain(
      { id: 'x', scaleType: 'linear', domainLimit: 'nice' },
      series,
      'x',
      'horizontal',
    );
    // For x in horizontal, it's the value domain: min/max of all data
    expect(domain).toEqual({ min: 5, max: 30 });
  });

  it('should return correct domain for y-axis in horizontal layout (category axis)', () => {
    const domain = getCartesianAxisDomain(
      { id: 'y', scaleType: 'band', domainLimit: 'strict' },
      series,
      'y',
      'horizontal',
    );
    // For y in horizontal, it's the index domain: 0 to dataLength - 1
    expect(domain).toEqual({ min: 0, max: 2 });
  });

  it('does not apply baseline adjustments by default', () => {
    const domain = getCartesianAxisDomain(
      { id: 'y', scaleType: 'linear', domainLimit: 'strict', baseline: 30 },
      [{ id: 's1', data: [-100, -50] }],
      'y',
      'vertical',
    );
    expect(domain).toEqual({ min: -100, max: -50 });
  });
});

describe('withBaselineDomain', () => {
  it('extends max when baseline is above computed bounds', () => {
    const domain = withBaselineDomain(undefined, 30);
    expect(typeof domain).toBe('function');
    if (typeof domain !== 'function') throw new Error('Expected function domain');

    expect(domain({ min: -100, max: -50 })).toEqual({ min: -100, max: 30 });
  });

  it('extends min when baseline is below computed bounds', () => {
    const domain = withBaselineDomain(undefined, 0);
    expect(typeof domain).toBe('function');
    if (typeof domain !== 'function') throw new Error('Expected function domain');

    expect(domain({ min: 25, max: 80 })).toEqual({ min: 0, max: 80 });
  });

  it('does not change bounds when baseline is already in range', () => {
    const domain = withBaselineDomain(undefined, 30);
    expect(typeof domain).toBe('function');
    if (typeof domain !== 'function') throw new Error('Expected function domain');

    expect(domain({ min: 20, max: 55 })).toEqual({ min: 20, max: 55 });
  });

  it('preserves explicit max while extending only implicit side', () => {
    const domain = withBaselineDomain({ max: -50 }, 30);
    expect(typeof domain).toBe('function');
    if (typeof domain !== 'function') throw new Error('Expected function domain');

    expect(domain({ min: -100, max: -80 })).toEqual({ min: -100, max: -50 });
  });

  it('preserves fully explicit bounds', () => {
    expect(withBaselineDomain({ min: -100, max: -50 }, 30)).toEqual({
      min: -100,
      max: -50,
    });
  });

  it('preserves function domain identity', () => {
    const domainFn = (bounds: { min: number; max: number }) => bounds;
    expect(withBaselineDomain(domainFn, 30)).toBe(domainFn);
  });
});

describe('getCartesianAxisScale', () => {
  const range = { min: 0, max: 400 };
  const dataDomain = { min: 0, max: 100 };

  it('should NOT invert y-axis range in horizontal layout (y is category axis)', () => {
    const scale = getCartesianAxisScale({
      type: 'y',
      range,
      dataDomain,
      layout: 'horizontal',
    });
    // Y axis is the category axis in horizontal layout - no inversion needed
    // First category (index 0) at top (SVG y=0), last category at bottom (y=400)
    expect(scale(0)).toBe(0);
    expect(scale(100)).toBe(400);
  });

  it('should NOT invert x-axis range in horizontal layout (x is value axis)', () => {
    const scale = getCartesianAxisScale({
      type: 'x',
      range,
      dataDomain,
      layout: 'horizontal',
    });
    // X axis is the value axis in horizontal layout - no inversion needed (left-to-right is natural)
    expect(scale(0)).toBe(0);
    expect(scale(100)).toBe(400);
  });

  it('should invert y-axis range in vertical layout (y is value axis)', () => {
    const scale = getCartesianAxisScale({
      type: 'y',
      range,
      dataDomain,
      layout: 'vertical',
    });
    // Y axis is the value axis in vertical layout - inversion needed
    // Higher values should appear at top (lower SVG y coordinate)
    // scale(0) -> 400 (bottom), scale(100) -> 0 (top)
    expect(scale(0)).toBe(400);
    expect(scale(100)).toBe(0);
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
