import {
  applySerializableScale,
  type CategoricalScale,
  type ChartScaleFunction,
  convertToSerializableScale,
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

describe('convertToSerializableScale and applySerializableScale', () => {
  describe('linear scale conversion', () => {
    it('should convert linear scale correctly', () => {
      const d3Scale = getNumericScale({
        scaleType: 'linear',
        domain: { min: 0, max: 10 },
        range: { min: 0, max: 100 },
      });

      const serialized = convertToSerializableScale(d3Scale);

      expect(serialized).toEqual({
        type: 'linear',
        domain: [0, 10],
        range: [0, 100],
      });
    });

    it('should produce identical results to D3 scale', () => {
      const d3Scale = getNumericScale({
        scaleType: 'linear',
        domain: { min: -5, max: 15 },
        range: { min: 50, max: 200 },
      });

      const serialized = convertToSerializableScale(d3Scale);
      expect(serialized?.type).toBe('linear');

      if (serialized?.type !== 'linear') return;

      const testValues = [-10, -5, 0, 5, 10, 15, 20];

      testValues.forEach((value) => {
        const d3Result = d3Scale(value);
        const serializableResult = applySerializableScale(value, serialized);

        expect(serializableResult).toBeCloseTo(d3Result ?? 0, 5);
      });
    });

    it('should handle inverted ranges', () => {
      const d3Scale = getNumericScale({
        scaleType: 'linear',
        domain: { min: 0, max: 10 },
        range: { min: 100, max: 0 }, // Inverted
      });

      const serialized = convertToSerializableScale(d3Scale);

      expect(serialized?.domain).toEqual([0, 10]);
      expect(serialized?.range).toEqual([100, 0]);

      if (serialized?.type !== 'linear') return;

      const testValues = [0, 5, 10];
      testValues.forEach((value) => {
        const d3Result = d3Scale(value);
        const serializableResult = applySerializableScale(value, serialized);

        expect(serializableResult).toBeCloseTo(d3Result ?? 0, 5);
      });
    });
  });

  describe('log scale conversion', () => {
    it('should convert log scale correctly', () => {
      const d3Scale = getNumericScale({
        scaleType: 'log',
        domain: { min: 1, max: 1000 },
        range: { min: 0, max: 300 },
      });

      const serialized = convertToSerializableScale(d3Scale);

      expect(serialized).toEqual({
        type: 'log',
        domain: [1, 1000],
        range: [0, 300],
        base: 10,
      });
    });

    it('should produce identical results to D3 scale', () => {
      const d3Scale = getNumericScale({
        scaleType: 'log',
        domain: { min: 1, max: 100 },
        range: { min: 0, max: 200 },
      });

      const serialized = convertToSerializableScale(d3Scale);
      expect(serialized?.type).toBe('log');

      if (serialized?.type !== 'log') return;

      const testValues = [0.1, 1, 2, 5, 10, 25, 50, 100, 200];

      testValues.forEach((value) => {
        const d3Result = d3Scale(value);
        const serializableResult = applySerializableScale(value, serialized);

        expect(serializableResult).toBeCloseTo(d3Result ?? 0, 5);
      });
    });
  });

  describe('band scale conversion', () => {
    it('should convert band scale correctly', () => {
      const d3Scale = getCategoricalScale({
        domain: { min: 0, max: 4 },
        range: { min: 0, max: 100 },
        padding: 0.2,
      });

      const serialized = convertToSerializableScale(d3Scale);

      expect(serialized?.type).toBe('band');
      expect(serialized?.domain).toEqual([0, 4]);
      expect(serialized?.range).toEqual([0, 100]);
      expect(serialized).toHaveProperty('bandwidth');

      expect(serialized?.type).toBe('band');
      if (serialized?.type !== 'band') {
        throw new Error('Expected band scale');
      }
      expect(serialized.bandwidth).toBeCloseTo(d3Scale.bandwidth(), 5);
    });

    it('should produce identical band start positions to D3 scale', () => {
      const d3Scale = getCategoricalScale({
        domain: { min: 0, max: 3 },
        range: { min: 0, max: 200 },
        padding: 0.1,
      });

      const serialized = convertToSerializableScale(d3Scale);
      expect(serialized?.type).toBe('band');

      if (serialized?.type !== 'band') return;

      // Test band start positions (not centers)
      for (let i = 0; i <= 3; i++) {
        const d3Result = d3Scale(i);
        const serializableResult = applySerializableScale(i, serialized);

        expect(serializableResult).toBeCloseTo(d3Result ?? 0, 5);
      }
    });

    it('should handle different padding values', () => {
      const paddings = [0, 0.1, 0.3, 0.5];

      paddings.forEach((padding) => {
        const d3Scale = getCategoricalScale({
          domain: { min: 0, max: 2 },
          range: { min: 0, max: 150 },
          padding,
        });

        const serialized = convertToSerializableScale(d3Scale);

        if (serialized?.type !== 'band') return;

        expect(serialized.bandwidth).toBeCloseTo(d3Scale.bandwidth(), 5);

        for (let i = 0; i <= 2; i++) {
          const d3Result = d3Scale(i);
          const serializableResult = applySerializableScale(i, serialized);

          expect(serializableResult).toBeCloseTo(d3Result ?? 0, 5);
        }
      });
    });

    it('should handle invalid indices correctly', () => {
      const d3Scale = getCategoricalScale({
        domain: { min: 0, max: 2 },
        range: { min: 0, max: 100 },
      });

      const serialized = convertToSerializableScale(d3Scale);

      if (serialized?.type !== 'band') return;

      const invalidIndices = [-1, 5, 10];

      invalidIndices.forEach((index) => {
        const d3Result = d3Scale(index); // Returns undefined for invalid
        const serializableResult = applySerializableScale(index, serialized);

        // Our implementation returns range start for invalid indices (D3 returns undefined)
        expect(d3Result).toBeUndefined();
        expect(serializableResult).toBe(serialized.range[0]);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle undefined scale', () => {
      const result = convertToSerializableScale(undefined as any);
      expect(result).toBeUndefined();
    });

    it('should handle single category band scale', () => {
      const d3Scale = getCategoricalScale({
        domain: { min: 0, max: 0 },
        range: { min: 0, max: 100 },
      });

      const serialized = convertToSerializableScale(d3Scale);

      expect(serialized?.type).toBe('band');
      expect(serialized?.domain).toEqual([0, 0]);

      if (serialized?.type !== 'band') return;

      const d3Result = d3Scale(0);
      const serializableResult = applySerializableScale(0, serialized);

      expect(serializableResult).toBeCloseTo(d3Result ?? 0, 5);
    });

    it('should handle zero width range', () => {
      const d3Scale = getNumericScale({
        scaleType: 'linear',
        domain: { min: 0, max: 10 },
        range: { min: 50, max: 50 },
      });

      const serialized = convertToSerializableScale(d3Scale);

      if (serialized?.type !== 'linear') return;

      const testValues = [0, 5, 10];
      testValues.forEach((value) => {
        const d3Result = d3Scale(value);
        const serializableResult = applySerializableScale(value, serialized);

        expect(serializableResult).toBe(50);
        expect(serializableResult).toBeCloseTo(d3Result ?? 0, 5);
      });
    });
  });
});
