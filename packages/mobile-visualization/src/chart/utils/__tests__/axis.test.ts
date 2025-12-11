import {
  formatAxisTick,
  getAngularAxisConfig,
  getAxisRange,
  getAxisTicksData,
  getCartesianAxisConfig,
  getCartesianAxisDomain,
  getCartesianAxisScale,
  getPolarAxisDomain,
  getPolarAxisRange,
  getPolarAxisScale,
  getRadialAxisConfig,
} from '../axis';
import { type CartesianSeries, type PolarSeries } from '../chart';
import {
  type CategoricalScale,
  getCategoricalScale,
  getNumericScale,
  type NumericScale,
} from '../scale';

describe('getCartesianAxisScale', () => {
  it('should create a linear scale for x-axis', () => {
    const scale = getCartesianAxisScale({
      type: 'x',
      range: { min: 0, max: 400 },
      dataDomain: { min: 0, max: 100 },
    });

    expect(scale(0)).toBe(0);
    expect(scale(50)).toBe(200);
    expect(scale(100)).toBe(400);
  });

  it('should create an inverted linear scale for y-axis', () => {
    const scale = getCartesianAxisScale({
      type: 'y',
      range: { min: 0, max: 400 },
      dataDomain: { min: 0, max: 100 },
    });

    // Y-axis is inverted for SVG coordinates
    expect(scale(0)).toBe(400);
    expect(scale(100)).toBe(0);
  });

  it('should use config domain when provided', () => {
    const scale = getCartesianAxisScale({
      config: {
        domain: { min: 10, max: 90 },
        range: { min: 0, max: 400 },
        scaleType: 'linear',
        domainLimit: 'strict',
      },
      type: 'x',
      range: { min: 0, max: 400 },
      dataDomain: { min: 0, max: 100 },
    });

    expect(scale(10)).toBe(0);
    expect(scale(90)).toBe(400);
  });

  it('should apply nice() when domainLimit is nice', () => {
    const scale = getCartesianAxisScale({
      config: {
        domain: { min: 0, max: 100 },
        range: { min: 0, max: 400 },
        scaleType: 'linear',
        domainLimit: 'nice',
      },
      type: 'x',
      range: { min: 0, max: 400 },
      dataDomain: { min: 3, max: 97 },
    });

    // Scale should be created successfully
    expect(scale).toBeDefined();
    expect(typeof scale).toBe('function');
  });

  it('should create band scale when scaleType is band', () => {
    const scale = getCartesianAxisScale({
      config: {
        domain: { min: 0, max: 4 },
        range: { min: 0, max: 400 },
        scaleType: 'band',
        domainLimit: 'strict',
        categoryPadding: 0.1,
      },
      type: 'x',
      range: { min: 0, max: 400 },
      dataDomain: { min: 0, max: 4 },
    });

    expect(scale).toBeDefined();
    // Band scale should have bandwidth method
    expect((scale as any).bandwidth).toBeDefined();
  });

  it('should throw error for invalid domain bounds', () => {
    expect(() =>
      getCartesianAxisScale({
        type: 'x',
        range: { min: 0, max: 400 },
        dataDomain: { min: undefined as any, max: undefined as any },
      }),
    ).toThrow('Invalid domain bounds');
  });
});

describe('getPolarAxisScale', () => {
  it('should create a linear scale for radial axis', () => {
    const scale = getPolarAxisScale({
      range: { min: 0, max: 100 },
      dataDomain: { min: 0, max: 50 },
    });

    expect(scale(0)).toBe(0);
    expect(scale(25)).toBe(50);
    expect(scale(50)).toBe(100);
  });

  it('should use config domain when provided', () => {
    const scale = getPolarAxisScale({
      config: {
        domain: { min: 10, max: 40 },
        range: { min: 0, max: 100 },
        scaleType: 'linear',
      },
      range: { min: 0, max: 100 },
      dataDomain: { min: 0, max: 50 },
    });

    expect(scale(10)).toBe(0);
    expect(scale(40)).toBe(100);
  });

  it('should throw error for invalid domain bounds', () => {
    expect(() =>
      getPolarAxisScale({
        range: { min: 0, max: 100 },
        dataDomain: { min: undefined as any, max: undefined as any },
      }),
    ).toThrow('Invalid polar axis domain bounds');
  });
});

describe('getCartesianAxisConfig', () => {
  it('should return default config when no axes provided', () => {
    const result = getCartesianAxisConfig('x', undefined);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('DEFAULT_AXIS_ID');
    expect(result[0].scaleType).toBe('linear');
    expect(result[0].domainLimit).toBe('strict'); // x-axis default
  });

  it('should use nice domainLimit for y-axis by default', () => {
    const result = getCartesianAxisConfig('y', undefined);

    expect(result[0].domainLimit).toBe('nice');
  });

  it('should handle single axis config object', () => {
    const result = getCartesianAxisConfig('x', { scaleType: 'log' });

    expect(result).toHaveLength(1);
    expect(result[0].scaleType).toBe('log');
  });

  it('should handle array of axis configs', () => {
    const result = getCartesianAxisConfig('y', [
      { id: 'left', scaleType: 'linear' },
      { id: 'right', scaleType: 'log' },
    ]);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('left');
    expect(result[1].id).toBe('right');
  });

  it('should throw error when multiple axes lack ids', () => {
    expect(() =>
      getCartesianAxisConfig('y', [{ scaleType: 'linear' }, { scaleType: 'log' }]),
    ).toThrow('When defining multiple axes, each must have a unique id');
  });
});

describe('getAngularAxisConfig', () => {
  it('should return default config when no axes provided', () => {
    const result = getAngularAxisConfig(undefined);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('DEFAULT_AXIS_ID');
    expect(result[0].scaleType).toBe('linear');
  });

  it('should handle single axis config object', () => {
    const result = getAngularAxisConfig({ paddingAngle: 5 });

    expect(result).toHaveLength(1);
    expect(result[0].paddingAngle).toBe(5);
  });

  it('should handle array of axis configs', () => {
    const result = getAngularAxisConfig([{ id: 'angular1' }, { id: 'angular2' }]);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('angular1');
    expect(result[1].id).toBe('angular2');
  });

  it('should throw error when multiple axes lack ids', () => {
    expect(() => getAngularAxisConfig([{}, {}])).toThrow(
      'When defining multiple angular axes, each must have a unique id',
    );
  });
});

describe('getRadialAxisConfig', () => {
  it('should return default config when no axes provided', () => {
    const result = getRadialAxisConfig(undefined);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('DEFAULT_AXIS_ID');
    expect(result[0].scaleType).toBe('linear');
  });

  it('should handle single axis config object', () => {
    const result = getRadialAxisConfig({ scaleType: 'log' });

    expect(result).toHaveLength(1);
    expect(result[0].scaleType).toBe('log');
  });

  it('should handle array of axis configs', () => {
    const result = getRadialAxisConfig([{ id: 'radial1' }, { id: 'radial2' }]);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('radial1');
    expect(result[1].id).toBe('radial2');
  });

  it('should throw error when multiple axes lack ids', () => {
    expect(() => getRadialAxisConfig([{}, {}])).toThrow(
      'When defining multiple radial axes, each must have a unique id',
    );
  });
});

describe('getCartesianAxisDomain', () => {
  it('should calculate domain from series data for x-axis', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [1, 2, 3, 4, 5] },
      { id: 'series2', data: [10, 20, 30] },
    ];

    const result = getCartesianAxisDomain(
      { id: 'x', scaleType: 'linear', domainLimit: 'strict' },
      series,
      'x',
    );

    expect(result.min).toBe(0);
    expect(result.max).toBe(4); // Longest series has 5 items (indices 0-4)
  });

  it('should calculate domain from series data for y-axis', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [1, 5, 3] },
      { id: 'series2', data: [2, 8, 4] },
    ];

    const result = getCartesianAxisDomain(
      { id: 'y', scaleType: 'linear', domainLimit: 'nice' },
      series,
      'y',
    );

    expect(result.min).toBe(1);
    expect(result.max).toBe(8);
  });

  it('should use explicit domain bounds when provided', () => {
    const series: CartesianSeries[] = [{ id: 'series1', data: [1, 2, 3] }];

    const result = getCartesianAxisDomain(
      { id: 'y', scaleType: 'linear', domainLimit: 'nice', domain: { min: 0, max: 100 } },
      series,
      'y',
    );

    expect(result.min).toBe(0);
    expect(result.max).toBe(100);
  });

  it('should handle domain function', () => {
    const series: CartesianSeries[] = [{ id: 'series1', data: [10, 20, 30] }];

    const result = getCartesianAxisDomain(
      {
        id: 'y',
        scaleType: 'linear',
        domainLimit: 'nice',
        domain: (bounds) => ({ min: bounds.min - 5, max: bounds.max + 5 }),
      },
      series,
      'y',
    );

    expect(result.min).toBe(5); // 10 - 5
    expect(result.max).toBe(35); // 30 + 5
  });

  it('should use data array for categorical domain', () => {
    const series: CartesianSeries[] = [{ id: 'series1', data: [1, 2, 3] }];

    const result = getCartesianAxisDomain(
      { id: 'x', scaleType: 'band', domainLimit: 'strict', data: ['Jan', 'Feb', 'Mar', 'Apr'] },
      series,
      'x',
    );

    expect(result.min).toBe(0);
    expect(result.max).toBe(3); // 4 categories
  });
});

describe('getPolarAxisDomain', () => {
  it('should calculate angular domain for pie chart data', () => {
    const series: PolarSeries[] = [
      { id: 'slice1', data: 10 },
      { id: 'slice2', data: 20 },
      { id: 'slice3', data: 30 },
    ];

    const result = getPolarAxisDomain({ id: 'angular' }, series, 'angular');

    expect(result.min).toBe(0);
    expect(result.max).toBe(2); // 3 slices
  });

  it('should calculate radial domain for radar chart data', () => {
    const series: PolarSeries[] = [
      { id: 'series1', data: [1, 5, 3, 8, 2] },
      { id: 'series2', data: [2, 4, 6] },
    ];

    const result = getPolarAxisDomain({ id: 'radial' }, series, 'radial');

    expect(result.min).toBe(0);
    expect(result.max).toBe(8);
  });

  it('should use explicit domain bounds when provided', () => {
    const series: PolarSeries[] = [{ id: 'series1', data: 50 }];

    const result = getPolarAxisDomain(
      { id: 'radial', domain: { min: 0, max: 100 } },
      series,
      'radial',
    );

    expect(result.min).toBe(0);
    expect(result.max).toBe(100);
  });
});

describe('getPolarAxisRange', () => {
  it('should return default angular range in degrees', () => {
    const result = getPolarAxisRange({ id: 'angular' }, 'angular', 100);

    // Default is 0° to 360° (full circle starting at 3 o'clock)
    expect(result.min).toBe(0);
    expect(result.max).toBe(360);
  });

  it('should return default radial range in pixels', () => {
    const result = getPolarAxisRange({ id: 'radial' }, 'radial', 150);

    expect(result.min).toBe(0);
    expect(result.max).toBe(150); // outerRadius in pixels
  });

  it('should return angular range in degrees (no conversion)', () => {
    // User specifies degrees, output is degrees
    const result = getPolarAxisRange(
      { id: 'angular', range: { min: 0, max: 180 } }, // semicircle in degrees
      'angular',
      100,
    );

    // Output remains in degrees
    expect(result.min).toBe(0);
    expect(result.max).toBe(180);
  });

  it('should handle radial range function with pixels', () => {
    // User can do percentage-based donut
    const result = getPolarAxisRange(
      { id: 'radial', range: (bounds) => ({ min: bounds.max * 0.5, max: bounds.max }) },
      'radial',
      100,
    );

    expect(result.min).toBe(50); // 50% of 100px
    expect(result.max).toBe(100);
  });

  it('should handle radial range function with pixel offset', () => {
    // User can do pixel-based thickness
    const result = getPolarAxisRange(
      { id: 'radial', range: (bounds) => ({ min: bounds.max - 6, max: bounds.max }) },
      'radial',
      100,
    );

    expect(result.min).toBe(94); // 100 - 6 = 94px inner radius
    expect(result.max).toBe(100);
  });

  it('should handle angular range function with degrees', () => {
    // User specifies function that works with degrees
    const result = getPolarAxisRange(
      { id: 'angular', range: (bounds) => ({ min: bounds.min + 45, max: bounds.max - 45 }) },
      'angular',
      100,
    );

    // Default base is 0° to 360°, so result is 45° to 315° (still in degrees)
    expect(result.min).toBe(45);
    expect(result.max).toBe(315);
  });
});

describe('getAxisRange', () => {
  it('should calculate range for x-axis', () => {
    const chartRect = { x: 50, y: 20, width: 400, height: 300 };
    const result = getAxisRange({ id: 'x' }, chartRect, 'x');

    expect(result.min).toBe(50);
    expect(result.max).toBe(450); // x + width
  });

  it('should calculate range for y-axis', () => {
    const chartRect = { x: 50, y: 20, width: 400, height: 300 };
    const result = getAxisRange({ id: 'y' }, chartRect, 'y');

    expect(result.min).toBe(20);
    expect(result.max).toBe(320); // y + height
  });

  it('should use explicit range when provided', () => {
    const chartRect = { x: 0, y: 0, width: 400, height: 300 };
    const result = getAxisRange({ id: 'x', range: { min: 100, max: 300 } }, chartRect, 'x');

    expect(result.min).toBe(100);
    expect(result.max).toBe(300);
  });

  it('should handle range function', () => {
    const chartRect = { x: 0, y: 0, width: 400, height: 300 };
    const result = getAxisRange(
      { id: 'x', range: (bounds) => ({ min: bounds.min + 20, max: bounds.max - 20 }) },
      chartRect,
      'x',
    );

    expect(result.min).toBe(20);
    expect(result.max).toBe(380);
  });
});

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
