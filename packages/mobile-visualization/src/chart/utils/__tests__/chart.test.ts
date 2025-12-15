import {
  type AxisBounds,
  type CartesianSeries,
  type ChartInset,
  defaultCartesianChartInset,
  defaultPolarChartInset,
  defaultStackId,
  getCartesianDomain,
  getCartesianRange,
  getCartesianStackedSeriesData,
  getChartInset,
  getPolarAngularDomain,
  getPolarRadialRange,
  isValidBounds,
  type PolarSeries,
} from '../chart';

describe('getCartesianDomain', () => {
  it('should return provided min and max when both are specified', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [1, 2, 3, 4, 5] },
      { id: 'series2', data: [10, 20, 30] },
    ];

    const result = getCartesianDomain(series, 5, 15);
    expect(result).toEqual({ min: 5, max: 15 });
  });

  it('should calculate domain from series data when min/max not provided', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [1, 2, 3, 4, 5] }, // length 5, so max index = 4
      { id: 'series2', data: [10, 20, 30] }, // length 3, so max index = 2
    ];

    const result = getCartesianDomain(series);
    expect(result).toEqual({ min: 0, max: 4 }); // Uses longest series (5 items, indices 0-4)
  });

  it('should use provided min with calculated max', () => {
    const series: CartesianSeries[] = [{ id: 'series1', data: [1, 2, 3] }];

    const result = getCartesianDomain(series, 10);
    expect(result).toEqual({ min: 10, max: 2 });
  });

  it('should use calculated min with provided max', () => {
    const series: CartesianSeries[] = [{ id: 'series1', data: [1, 2, 3, 4] }];

    const result = getCartesianDomain(series, undefined, 10);
    expect(result).toEqual({ min: 0, max: 10 });
  });

  it('should handle empty series array', () => {
    const result = getCartesianDomain([]);
    expect(result).toEqual({ min: undefined, max: undefined });
  });

  it('should handle series with no data', () => {
    const series: CartesianSeries[] = [{ id: 'series1' }, { id: 'series2', data: undefined }];

    const result = getCartesianDomain(series);
    expect(result).toEqual({ min: undefined, max: undefined });
  });

  it('should handle series with empty data arrays', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [] },
      { id: 'series2', data: [] },
    ];

    const result = getCartesianDomain(series);
    expect(result).toEqual({ min: undefined, max: undefined });
  });

  it('should handle mixed series with and without data', () => {
    const series: CartesianSeries[] = [
      { id: 'series1' },
      { id: 'series2', data: [1, 2, 3, 4, 5, 6] },
      { id: 'series3', data: [] },
    ];

    const result = getCartesianDomain(series);
    expect(result).toEqual({ min: 0, max: 5 });
  });
});

describe('getCartesianStackedSeriesData', () => {
  it('should handle individual series without stacking', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [1, 2, 3] },
      { id: 'series2', data: [4, 5, 6] },
    ];

    const result = getCartesianStackedSeriesData(series);

    expect(result.size).toBe(2);
    expect(result.get('series1')).toEqual([
      [0, 1],
      [0, 2],
      [0, 3],
    ]);
    expect(result.get('series2')).toEqual([
      [0, 4],
      [0, 5],
      [0, 6],
    ]);
  });

  it('should handle series with tuple data', () => {
    const series: CartesianSeries[] = [
      {
        id: 'series1',
        data: [
          [1, 5],
          [2, 6],
          [3, 7],
        ],
      },
    ];

    const result = getCartesianStackedSeriesData(series);

    expect(result.size).toBe(1);
    expect(result.get('series1')).toEqual([
      [1, 5],
      [2, 6],
      [3, 7],
    ]);
  });

  it('should stack series with same stackId', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [1, 2, 3], stackId: 'stack1' },
      { id: 'series2', data: [4, 5, 6], stackId: 'stack1' },
    ];

    const result = getCartesianStackedSeriesData(series);

    expect(result.size).toBe(2);
    // D3 stack will create cumulative values
    const series1Data = result.get('series1');
    const series2Data = result.get('series2');

    expect(series1Data).toBeDefined();
    expect(series2Data).toBeDefined();
    expect(series1Data!.length).toBe(3);
    expect(series2Data!.length).toBe(3);
  });

  it('should not stack series with different yAxisId', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [1, 2, 3], stackId: 'stack1', yAxisId: 'left' },
      { id: 'series2', data: [4, 5, 6], stackId: 'stack1', yAxisId: 'right' },
    ];

    const result = getCartesianStackedSeriesData(series);

    expect(result.size).toBe(2);
    // Should be treated as individual series since they have different y-axes
    expect(result.get('series1')).toEqual([
      [0, 1],
      [0, 2],
      [0, 3],
    ]);
    expect(result.get('series2')).toEqual([
      [0, 4],
      [0, 5],
      [0, 6],
    ]);
  });

  it('should handle null values in data', () => {
    const series: CartesianSeries[] = [{ id: 'series1', data: [1, null, 3] }];

    const result = getCartesianStackedSeriesData(series);

    expect(result.get('series1')).toEqual([[0, 1], null, [0, 3]]);
  });

  it('should handle empty series array', () => {
    const result = getCartesianStackedSeriesData([]);
    expect(result.size).toBe(0);
  });

  it('should handle series without data', () => {
    const series: CartesianSeries[] = [{ id: 'series1' }, { id: 'series2', data: undefined }];

    const result = getCartesianStackedSeriesData(series);
    expect(result.size).toBe(0);
  });

  it('should handle mixed stacked and individual series', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [1, 2, 3], stackId: 'stack1' },
      { id: 'series2', data: [4, 5, 6], stackId: 'stack1' },
      { id: 'series3', data: [7, 8, 9] }, // No stackId
    ];

    const result = getCartesianStackedSeriesData(series);

    expect(result.size).toBe(3);
    expect(result.get('series3')).toEqual([
      [0, 7],
      [0, 8],
      [0, 9],
    ]);
  });
});

describe('getCartesianRange', () => {
  it('should return provided min and max when both are specified', () => {
    const series: CartesianSeries[] = [{ id: 'series1', data: [1, 2, 3] }];

    const result = getCartesianRange(series, -10, 20);
    expect(result).toEqual({ min: -10, max: 20 });
  });

  it('should calculate range from simple numeric data', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [1, 5, 3] },
      { id: 'series2', data: [2, 4, 6] },
    ];

    const result = getCartesianRange(series);
    expect(result).toEqual({ min: 1, max: 6 });
  });

  it('should calculate range from tuple data', () => {
    const series: CartesianSeries[] = [
      {
        id: 'series1',
        data: [
          [0, 5],
          [1, 3],
          [2, 7],
        ],
      },
      {
        id: 'series2',
        data: [
          [-1, 2],
          [0, 4],
        ],
      },
    ];

    const result = getCartesianRange(series);
    expect(result).toEqual({ min: -1, max: 7 });
  });

  it('should calculate range from stacked data', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [1, 2, 3], stackId: 'stack1' },
      { id: 'series2', data: [4, 5, 6], stackId: 'stack1' },
    ];

    const result = getCartesianRange(series);

    // Stacked values should be cumulative
    expect(result.min).toBeDefined();
    expect(result.max).toBeDefined();
    expect(result.min).toBeLessThanOrEqual(0);
    expect(result.max).toBeGreaterThanOrEqual(9); // 3 + 6 = 9 at minimum
  });

  it('should handle negative values', () => {
    const series: CartesianSeries[] = [{ id: 'series1', data: [-5, -2, 1, 3] }];

    const result = getCartesianRange(series);
    expect(result).toEqual({ min: -5, max: 3 });
  });

  it('should handle mixed positive and negative stacked values', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [2, -1, 3], stackId: 'stack1' },
      { id: 'series2', data: [-3, 4, -2], stackId: 'stack1' },
    ];

    const result = getCartesianRange(series);

    expect(result.min).toBeDefined();
    expect(result.max).toBeDefined();
    expect(typeof result.min).toBe('number');
    expect(typeof result.max).toBe('number');
  });

  it('should handle empty series array', () => {
    const result = getCartesianRange([]);
    expect(result).toEqual({ min: undefined, max: undefined });
  });

  it('should handle series with no data', () => {
    const series: CartesianSeries[] = [{ id: 'series1' }, { id: 'series2', data: undefined }];

    const result = getCartesianRange(series);
    expect(result).toEqual({ min: undefined, max: undefined });
  });

  it('should handle null values in data', () => {
    const series: CartesianSeries[] = [{ id: 'series1', data: [1, null, 5, null, 3] }];

    const result = getCartesianRange(series);
    expect(result).toEqual({ min: 1, max: 5 });
  });

  it('should use provided min with calculated max', () => {
    const series: CartesianSeries[] = [{ id: 'series1', data: [1, 2, 3] }];

    const result = getCartesianRange(series, -5);
    expect(result).toEqual({ min: -5, max: 3 });
  });

  it('should use calculated min with provided max', () => {
    const series: CartesianSeries[] = [{ id: 'series1', data: [1, 2, 3] }];

    const result = getCartesianRange(series, undefined, 10);
    expect(result).toEqual({ min: 1, max: 10 });
  });

  it('should handle series with different yAxisId in stacking', () => {
    const series: CartesianSeries[] = [
      { id: 'series1', data: [1, 2, 3], stackId: 'stack1', yAxisId: 'left' },
      { id: 'series2', data: [4, 5, 6], stackId: 'stack1', yAxisId: 'right' },
    ];

    const result = getCartesianRange(series);

    // Should treat as individual series, not stacked
    expect(result).toEqual({ min: 0, max: 6 });
  });
});

describe('getPolarAngularDomain', () => {
  it('should return provided min and max when both are specified', () => {
    const series: PolarSeries[] = [
      { id: 'series1', data: 10 },
      { id: 'series2', data: 20 },
    ];

    const result = getPolarAngularDomain(series, 0, 100);
    expect(result).toEqual({ min: 0, max: 100 });
  });

  it('should calculate domain for pie/donut charts (single number data)', () => {
    const series: PolarSeries[] = [
      { id: 'series1', data: 10 },
      { id: 'series2', data: 20 },
      { id: 'series3', data: 30 },
    ];

    const result = getPolarAngularDomain(series);
    expect(result).toEqual({ min: 0, max: 2 }); // 3 slices, indices 0-2
  });

  it('should calculate domain for radar charts (array data)', () => {
    const series: PolarSeries[] = [
      { id: 'series1', data: [1, 2, 3, 4, 5] },
      { id: 'series2', data: [5, 4, 3] },
    ];

    const result = getPolarAngularDomain(series);
    expect(result).toEqual({ min: 0, max: 4 }); // Longest array has 5 items
  });

  it('should handle empty series array', () => {
    const result = getPolarAngularDomain([]);
    expect(result).toEqual({ min: undefined, max: undefined });
  });

  it('should use provided min with calculated max', () => {
    const series: PolarSeries[] = [
      { id: 'series1', data: 10 },
      { id: 'series2', data: 20 },
    ];

    const result = getPolarAngularDomain(series, 5);
    expect(result).toEqual({ min: 5, max: 1 });
  });

  it('should use calculated min with provided max', () => {
    const series: PolarSeries[] = [
      { id: 'series1', data: 10 },
      { id: 'series2', data: 20 },
    ];

    const result = getPolarAngularDomain(series, undefined, 10);
    expect(result).toEqual({ min: 0, max: 10 });
  });
});

describe('getPolarRadialRange', () => {
  it('should return provided min and max when both are specified', () => {
    const series: PolarSeries[] = [
      { id: 'series1', data: 10 },
      { id: 'series2', data: 20 },
    ];

    const result = getPolarRadialRange(series, -5, 100);
    expect(result).toEqual({ min: -5, max: 100 });
  });

  it('should calculate range for pie/donut charts (single number data)', () => {
    const series: PolarSeries[] = [
      { id: 'series1', data: 10 },
      { id: 'series2', data: 20 },
      { id: 'series3', data: 5 },
    ];

    const result = getPolarRadialRange(series);
    expect(result).toEqual({ min: 0, max: 20 });
  });

  it('should calculate range for radar charts (array data)', () => {
    const series: PolarSeries[] = [
      { id: 'series1', data: [1, 5, 3] },
      { id: 'series2', data: [2, 8, 4] },
    ];

    const result = getPolarRadialRange(series);
    expect(result).toEqual({ min: 0, max: 8 });
  });

  it('should handle negative values', () => {
    const series: PolarSeries[] = [
      { id: 'series1', data: [-5, 10, 3] },
      { id: 'series2', data: [2, -2, 4] },
    ];

    const result = getPolarRadialRange(series);
    expect(result).toEqual({ min: -5, max: 10 });
  });

  it('should handle null values in array data', () => {
    const series: PolarSeries[] = [{ id: 'series1', data: [1, null, 5, null, 3] }];

    const result = getPolarRadialRange(series);
    expect(result).toEqual({ min: 0, max: 5 });
  });

  it('should handle empty series array', () => {
    const result = getPolarRadialRange([]);
    expect(result).toEqual({ min: undefined, max: undefined });
  });

  it('should use provided min with calculated max', () => {
    const series: PolarSeries[] = [{ id: 'series1', data: [1, 2, 3] }];

    const result = getPolarRadialRange(series, -10);
    expect(result).toEqual({ min: -10, max: 3 });
  });

  it('should use calculated min with provided max', () => {
    const series: PolarSeries[] = [{ id: 'series1', data: [1, 2, 3] }];

    const result = getPolarRadialRange(series, undefined, 100);
    expect(result).toEqual({ min: 0, max: 100 });
  });
});

describe('defaultStackId', () => {
  it('should be defined as a string constant', () => {
    expect(typeof defaultStackId).toBe('string');
    expect(defaultStackId).toBe('DEFAULT_STACK_ID');
  });
});

describe('isValidBounds', () => {
  it('should return true for complete bounds', () => {
    const bounds: AxisBounds = { min: 0, max: 10 };
    expect(isValidBounds(bounds)).toBe(true);
  });

  it('should return false when min is undefined', () => {
    const bounds = { max: 10 };
    expect(isValidBounds(bounds)).toBe(false);
  });

  it('should return false when max is undefined', () => {
    const bounds = { min: 0 };
    expect(isValidBounds(bounds)).toBe(false);
  });

  it('should return false when both min and max are undefined', () => {
    const bounds = {};
    expect(isValidBounds(bounds)).toBe(false);
  });

  it('should return true for negative bounds', () => {
    const bounds: AxisBounds = { min: -10, max: -5 };
    expect(isValidBounds(bounds)).toBe(true);
  });

  it('should return true when min equals max', () => {
    const bounds: AxisBounds = { min: 5, max: 5 };
    expect(isValidBounds(bounds)).toBe(true);
  });

  it('should return true when min is greater than max', () => {
    const bounds: AxisBounds = { min: 10, max: 0 };
    expect(isValidBounds(bounds)).toBe(true);
  });
});

describe('defaultCartesianChartInset', () => {
  it('should have correct default values', () => {
    expect(defaultCartesianChartInset).toEqual({
      top: 32,
      left: 16,
      bottom: 16,
      right: 16,
    });
  });
});

describe('defaultPolarChartInset', () => {
  it('should have correct default values', () => {
    expect(defaultPolarChartInset).toEqual({
      top: 8,
      left: 8,
      bottom: 8,
      right: 8,
    });
  });
});

describe('getChartInset', () => {
  describe('with numeric inset', () => {
    it('should apply same value to all sides when given a number', () => {
      const result = getChartInset(4);
      expect(result).toEqual({
        top: 4,
        left: 4,
        bottom: 4,
        right: 4,
      });
    });

    it('should handle zero inset', () => {
      const result = getChartInset(0);
      expect(result).toEqual({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      });
    });

    it('should handle fractional inset', () => {
      const result = getChartInset(1.5);
      expect(result).toEqual({
        top: 1.5,
        left: 1.5,
        bottom: 1.5,
        right: 1.5,
      });
    });
  });

  describe('with object inset', () => {
    it('should use provided values and fill missing with zero defaults', () => {
      const result = getChartInset({
        top: 4,
        right: 2,
      });
      expect(result).toEqual({
        top: 4,
        left: 0,
        bottom: 0,
        right: 2,
      });
    });

    it('should handle all sides specified', () => {
      const result = getChartInset({
        top: 1,
        left: 2,
        bottom: 3,
        right: 4,
      });
      expect(result).toEqual({
        top: 1,
        left: 2,
        bottom: 3,
        right: 4,
      });
    });

    it('should handle empty object', () => {
      const result = getChartInset({});
      expect(result).toEqual({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      });
    });

    it('should handle only one side specified', () => {
      const result = getChartInset({ bottom: 8 });
      expect(result).toEqual({
        top: 0,
        left: 0,
        bottom: 8,
        right: 0,
      });
    });
  });

  describe('with defaults parameter', () => {
    it('should use provided defaults instead of zero', () => {
      const customDefaults: ChartInset = {
        top: 5,
        left: 6,
        bottom: 7,
        right: 8,
      };

      const result = getChartInset(
        {
          top: 2,
          right: 3,
        },
        customDefaults,
      );

      expect(result).toEqual({
        top: 2,
        left: 6, // from defaults
        bottom: 7, // from defaults
        right: 3,
      });
    });

    it('should use defaults for all missing values', () => {
      const customDefaults: ChartInset = {
        top: 1,
        left: 2,
        bottom: 3,
        right: 4,
      };

      const result = getChartInset({}, customDefaults);
      expect(result).toEqual(customDefaults);
    });

    it('should override defaults when values are provided', () => {
      const customDefaults: ChartInset = {
        top: 5,
        left: 5,
        bottom: 5,
        right: 5,
      };

      const result = getChartInset(
        {
          top: 1,
          left: 2,
          bottom: 3,
          right: 4,
        },
        customDefaults,
      );

      expect(result).toEqual({
        top: 1,
        left: 2,
        bottom: 3,
        right: 4,
      });
    });

    it('should handle numeric inset with defaults (defaults should be ignored)', () => {
      const customDefaults: ChartInset = {
        top: 9,
        left: 9,
        bottom: 9,
        right: 9,
      };

      const result = getChartInset(5, customDefaults);
      expect(result).toEqual({
        top: 5,
        left: 5,
        bottom: 5,
        right: 5,
      });
    });
  });

  describe('with undefined inset', () => {
    it('should use zero defaults when inset is undefined', () => {
      const result = getChartInset(undefined);
      expect(result).toEqual({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      });
    });

    it('should use provided defaults when inset is undefined', () => {
      const customDefaults: ChartInset = {
        top: 5,
        left: 6,
        bottom: 7,
        right: 8,
      };

      const result = getChartInset(undefined, customDefaults);
      expect(result).toEqual(customDefaults);
    });
  });

  describe('edge cases', () => {
    it('should handle zero values in object inset', () => {
      const result = getChartInset({
        top: 0,
        left: 5,
        bottom: 0,
        right: 6,
      });
      expect(result).toEqual({
        top: 0,
        left: 5,
        bottom: 0,
        right: 6,
      });
    });

    it('should handle fractional values in object', () => {
      const result = getChartInset({
        top: 1.5,
        left: 0.75,
        bottom: 0.25,
        right: 0.5,
      });
      expect(result).toEqual({
        top: 1.5,
        left: 0.75,
        bottom: 0.25,
        right: 0.5,
      });
    });
  });
});
