import {
  type CategoricalScale,
  type ChartScaleFunction,
  getCategoricalScale,
  getNumericScale,
  isCategoricalScale,
  isLogScale,
  isNumericScale,
  type NumericScale,
} from '../scale';

describe('getNumericScale', () => {
  describe('linear scale', () => {
    it('should create linear scale with correct domain and range', () => {
      const scale = getNumericScale({
        scaleType: 'linear',
        domain: { min: 0, max: 10 },
        range: { min: 0, max: 100 },
      });

      expect(scale).toBeDefined();
      expect(scale(0)).toBe(0);
      expect(scale(5)).toBe(50);
      expect(scale(10)).toBe(100);
    });

    it('should handle negative domain values', () => {
      const scale = getNumericScale({
        scaleType: 'linear',
        domain: { min: -10, max: 10 },
        range: { min: 0, max: 100 },
      });

      expect(scale(-10)).toBe(0);
      expect(scale(0)).toBe(50);
      expect(scale(10)).toBe(100);
    });

    it('should handle inverted range', () => {
      const scale = getNumericScale({
        scaleType: 'linear',
        domain: { min: 0, max: 10 },
        range: { min: 100, max: 0 },
      });

      expect(scale(0)).toBe(100);
      expect(scale(5)).toBe(50);
      expect(scale(10)).toBe(0);
    });

    it('should handle fractional values', () => {
      const scale = getNumericScale({
        scaleType: 'linear',
        domain: { min: 0, max: 1 },
        range: { min: 0, max: 100 },
      });

      expect(scale(0.25)).toBe(25);
      expect(scale(0.5)).toBe(50);
      expect(scale(0.75)).toBe(75);
    });

    it('should extrapolate beyond domain', () => {
      const scale = getNumericScale({
        scaleType: 'linear',
        domain: { min: 0, max: 10 },
        range: { min: 0, max: 100 },
      });

      expect(scale(-5)).toBe(-50);
      expect(scale(15)).toBe(150);
    });
  });

  describe('log scale', () => {
    it('should create log scale with correct domain and range', () => {
      const scale = getNumericScale({
        scaleType: 'log',
        domain: { min: 1, max: 100 },
        range: { min: 0, max: 100 },
      });

      expect(scale).toBeDefined();
      expect(scale(1)).toBe(0);
      expect(scale(100)).toBe(100);
      expect(scale(10)).toBeCloseTo(50, 1); // log10(10) is halfway between log10(1) and log10(100)
    });

    it('should handle different log base values', () => {
      const scale = getNumericScale({
        scaleType: 'log',
        domain: { min: 1, max: 1000 },
        range: { min: 0, max: 300 },
      });

      expect(scale(1)).toBe(0);
      expect(scale(10)).toBeCloseTo(100, 1); // 1/3 of the way
      expect(scale(100)).toBeCloseTo(200, 1); // 2/3 of the way
      expect(scale(1000)).toBe(300);
    });

    it('should handle inverted range with log scale', () => {
      const scale = getNumericScale({
        scaleType: 'log',
        domain: { min: 1, max: 100 },
        range: { min: 100, max: 0 },
      });

      expect(scale(1)).toBe(100);
      expect(scale(100)).toBe(0);
    });
  });
});

describe('getCategoricalScale', () => {
  it('should create categorical scale with correct domain and range', () => {
    const scale = getCategoricalScale({
      domain: { min: 0, max: 4 }, // 5 categories (0, 1, 2, 3, 4)
      range: { min: 0, max: 100 },
      padding: 0.1,
    });

    expect(scale).toBeDefined();
    expect(scale.domain()).toEqual([0, 1, 2, 3, 4]);
    expect(scale.range()).toEqual([0, 100]);
  });

  it('should handle different padding values', () => {
    const scale1 = getCategoricalScale({
      domain: { min: 0, max: 2 },
      range: { min: 0, max: 100 },
      padding: 0,
    });

    const scale2 = getCategoricalScale({
      domain: { min: 0, max: 2 },
      range: { min: 0, max: 100 },
      padding: 0.5,
    });

    expect(scale1.bandwidth()).toBeGreaterThan(scale2.bandwidth());
  });

  it('should use default padding when not specified', () => {
    const scale = getCategoricalScale({
      domain: { min: 0, max: 2 },
      range: { min: 0, max: 100 },
    });

    expect(scale).toBeDefined();
    expect(scale.paddingInner()).toBe(0.1);
  });

  it('should handle single category', () => {
    const scale = getCategoricalScale({
      domain: { min: 0, max: 0 }, // Single category
      range: { min: 0, max: 100 },
    });

    expect(scale.domain()).toEqual([0]);
    expect(scale(0)).toBeDefined();
  });

  it('should handle large number of categories', () => {
    const scale = getCategoricalScale({
      domain: { min: 0, max: 99 }, // 100 categories
      range: { min: 0, max: 1000 },
      padding: 0.1,
    });

    expect(scale.domain()).toHaveLength(100);
    expect(scale(0)).toBeDefined();
    expect(scale(99)).toBeDefined();
  });

  it('should return undefined for invalid category indices', () => {
    const scale = getCategoricalScale({
      domain: { min: 0, max: 2 },
      range: { min: 0, max: 100 },
    });

    expect(scale(5)).toBeUndefined(); // Index 5 doesn't exist
    expect(scale(-1)).toBeUndefined(); // Negative index
  });
});

describe('type guards', () => {
  let linearScale: NumericScale;
  let logScale: NumericScale;
  let categoricalScale: CategoricalScale;

  beforeEach(() => {
    linearScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 10 },
      range: { min: 0, max: 100 },
    });

    logScale = getNumericScale({
      scaleType: 'log',
      domain: { min: 1, max: 100 },
      range: { min: 0, max: 100 },
    });

    categoricalScale = getCategoricalScale({
      domain: { min: 0, max: 4 },
      range: { min: 0, max: 100 },
    });
  });

  describe('isCategoricalScale', () => {
    it('should return true for categorical scale', () => {
      expect(isCategoricalScale(categoricalScale)).toBe(true);
    });

    it('should return false for linear scale', () => {
      expect(isCategoricalScale(linearScale)).toBe(false);
    });

    it('should return false for log scale', () => {
      expect(isCategoricalScale(logScale)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isCategoricalScale(undefined as any)).toBe(false);
    });
  });

  describe('isNumericScale', () => {
    it('should return true for linear scale', () => {
      expect(isNumericScale(linearScale)).toBe(true);
    });

    it('should return true for log scale', () => {
      expect(isNumericScale(logScale)).toBe(true);
    });

    it('should return false for categorical scale', () => {
      expect(isNumericScale(categoricalScale)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isNumericScale(undefined as any)).toBe(false);
    });
  });

  describe('isLogScale', () => {
    it('should return true for log scale', () => {
      expect(isLogScale(logScale)).toBe(true);
    });

    it('should return false for linear scale', () => {
      expect(isLogScale(linearScale)).toBe(false);
    });

    it('should return false for categorical scale', () => {
      expect(isLogScale(categoricalScale)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isLogScale(undefined as any)).toBe(false);
    });
  });
});

describe('scale integration', () => {
  it('should work together with different scale types', () => {
    const scales: ChartScaleFunction[] = [
      getNumericScale({
        scaleType: 'linear',
        domain: { min: 0, max: 10 },
        range: { min: 0, max: 100 },
      }),
      getNumericScale({
        scaleType: 'log',
        domain: { min: 1, max: 100 },
        range: { min: 0, max: 100 },
      }),
      getCategoricalScale({
        domain: { min: 0, max: 4 },
        range: { min: 0, max: 100 },
      }),
    ];

    expect(scales).toHaveLength(3);

    // Test type guards work correctly
    expect(scales.filter(isNumericScale)).toHaveLength(2);
    expect(scales.filter(isCategoricalScale)).toHaveLength(1);
    expect(scales.filter(isLogScale)).toHaveLength(1);
  });

  it('should handle edge cases in domain/range', () => {
    // Zero-width domain
    const zeroWidthScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 5, max: 5 },
      range: { min: 0, max: 100 },
    });
    expect(zeroWidthScale(5)).toBeDefined();

    // Zero-width range
    const zeroWidthRange = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 10 },
      range: { min: 50, max: 50 },
    });
    expect(zeroWidthRange(5)).toBe(50);

    // Inverted domain
    const invertedDomain = getNumericScale({
      scaleType: 'linear',
      domain: { min: 10, max: 0 },
      range: { min: 0, max: 100 },
    });
    expect(invertedDomain(10)).toBe(0);
    expect(invertedDomain(0)).toBe(100);
  });
});
