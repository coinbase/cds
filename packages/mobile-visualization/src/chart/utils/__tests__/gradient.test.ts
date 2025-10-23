import {
  evaluateGradientAtValue,
  getGradientScale,
  type Gradient,
  normalizeGradientStop,
  parseColor,
  processGradient,
  resolveGradientStops,
} from '../gradient';
import { getCategoricalScale, getNumericScale } from '../scale';

// Mock Skia for the test environment
jest.mock('@shopify/react-native-skia', () => ({
  Skia: {
    Color: (colorStr: string) => {
      // Simple color parsing for common formats
      // Returns Float32Array [r, g, b, a] with values 0-1
      const hexMatch = colorStr.match(/^#([0-9a-f]{6})$/i);
      if (hexMatch) {
        const hex = hexMatch[1];
        return new Float32Array([
          parseInt(hex.substr(0, 2), 16) / 255,
          parseInt(hex.substr(2, 2), 16) / 255,
          parseInt(hex.substr(4, 2), 16) / 255,
          1,
        ]);
      }

      const rgbaMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (rgbaMatch) {
        return new Float32Array([
          parseInt(rgbaMatch[1]) / 255,
          parseInt(rgbaMatch[2]) / 255,
          parseInt(rgbaMatch[3]) / 255,
          rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
        ]);
      }

      // Named colors mapping
      const namedColors: Record<string, Float32Array> = {
        red: new Float32Array([1, 0, 0, 1]),
        green: new Float32Array([0, 1, 0, 1]),
        blue: new Float32Array([0, 0, 1, 1]),
        yellow: new Float32Array([1, 1, 0, 1]),
        white: new Float32Array([1, 1, 1, 1]),
        black: new Float32Array([0, 0, 0, 1]),
      };

      return namedColors[colorStr.toLowerCase()] || new Float32Array([0, 0, 0, 1]);
    },
  },
}));

describe('normalizeGradientStop', () => {
  it('should handle gradient stops with opacity', () => {
    const result = normalizeGradientStop({ offset: 0, color: 'red', opacity: 0.5 });
    expect(result).toEqual({ color: 'red', opacity: 0.5 });
  });

  it('should default opacity to 1 when not provided', () => {
    const result = normalizeGradientStop({ offset: 0, color: 'green' });
    expect(result).toEqual({ color: 'green', opacity: 1 });
  });
});

describe('parseColor', () => {
  it('should parse hex colors', () => {
    const result = parseColor('#FF0000', 1);
    expect(result).toMatch(/rgba\(\s*255,\s*0,\s*0,\s*1\s*\)/);
  });

  it('should apply opacity', () => {
    const result = parseColor('#FF0000', 0.5);
    expect(result).toMatch(/rgba\(\s*255,\s*0,\s*0,\s*0\.5\s*\)/);
  });
});

describe('resolveGradientStops', () => {
  const linearScale = getNumericScale({
    scaleType: 'linear',
    domain: { min: 0, max: 100 },
    range: { min: 0, max: 400 },
  });

  it('should return static stops array as-is', () => {
    const stops = [
      { offset: 0, color: 'red' },
      { offset: 100, color: 'blue' },
    ];
    const result = resolveGradientStops(stops, linearScale);
    expect(result).toEqual(stops);
  });

  it('should resolve function form with domain bounds', () => {
    const stopsFn = ({ min, max }: { min: number; max: number }) => [
      { offset: min, color: 'red' },
      { offset: max, color: 'blue' },
    ];
    const result = resolveGradientStops(stopsFn, linearScale);
    expect(result).toEqual([
      { offset: 0, color: 'red' },
      { offset: 100, color: 'blue' },
    ]);
  });

  it('should resolve function form with calculated offsets', () => {
    const stopsFn = ({ min, max }: { min: number; max: number }) => [
      { offset: min, color: 'red' },
      { offset: (min + max) / 2, color: 'yellow' },
      { offset: max, color: 'green' },
    ];
    const result = resolveGradientStops(stopsFn, linearScale);
    expect(result).toEqual([
      { offset: 0, color: 'red' },
      { offset: 50, color: 'yellow' },
      { offset: 100, color: 'green' },
    ]);
  });
});

describe('getGradientScale', () => {
  it('should return yScale by default when no gradient provided', () => {
    const yScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 100 },
      range: { min: 0, max: 400 },
    });

    const result = getGradientScale(undefined, undefined, yScale);
    expect(result).toBe(yScale);
  });

  it('should return correct scale based on gradient axis', () => {
    const xScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 10 },
      range: { min: 0, max: 200 },
    });
    const yScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 100 },
      range: { min: 0, max: 400 },
    });

    const gradient: Gradient = {
      axis: 'x',
      stops: [
        { offset: 0, color: 'red' },
        { offset: 10, color: 'blue' },
      ],
    };

    const result = getGradientScale(gradient, xScale, yScale);
    expect(result).toBe(xScale);
  });

  it('should support band scales', () => {
    const bandScale = getCategoricalScale({
      domain: { min: 0, max: 6 },
      range: { min: 0, max: 200 },
    });
    const yScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 100 },
      range: { min: 0, max: 400 },
    });

    const gradient: Gradient = {
      axis: 'x',
      stops: [
        { offset: 0, color: 'red' },
        { offset: 6, color: 'blue' },
      ],
    };

    const result = getGradientScale(gradient, bandScale, yScale);
    expect(result).toBe(bandScale);
  });

  it('should return undefined for missing scale', () => {
    const gradient: Gradient = {
      axis: 'x',
      stops: [
        { offset: 0, color: 'red' },
        { offset: 10, color: 'blue' },
      ],
    };

    const result = getGradientScale(gradient, undefined, undefined);
    expect(result).toBeUndefined();
  });
});

describe('processGradient with band scale', () => {
  it('should process gradient with band scale', () => {
    const bandScale = getCategoricalScale({
      domain: { min: 0, max: 6 }, // [0, 1, 2, 3, 4, 5, 6]
      range: { min: 0, max: 200 },
    });

    const gradient: Gradient = {
      stops: [
        { offset: 0, color: 'red' },
        { offset: 6, color: 'blue' },
      ],
    };

    const result = processGradient(gradient, bandScale);
    expect(result).not.toBeNull();
    expect(result?.colors).toHaveLength(2);
    expect(result?.positions).toHaveLength(2);
  });
});

describe('evaluateGradientAtValue with band scale', () => {
  it('should evaluate gradient with band scale indices', () => {
    const bandScale = getCategoricalScale({
      domain: { min: 0, max: 6 }, // [0, 1, 2, 3, 4, 5, 6]
      range: { min: 0, max: 200 },
    });

    const gradient: Gradient = {
      stops: [
        { offset: 0, color: 'red' },
        { offset: 6, color: 'blue' },
      ],
    };

    // First index should be closer to red
    const color0 = evaluateGradientAtValue(gradient, 0, bandScale);
    expect(color0).toBeTruthy();

    // Middle index should be a blend
    const color3 = evaluateGradientAtValue(gradient, 3, bandScale);
    expect(color3).toBeTruthy();

    // Last index should be closer to blue
    const color6 = evaluateGradientAtValue(gradient, 6, bandScale);
    expect(color6).toBeTruthy();
  });
});

describe('evaluateGradientAtValue includeAlpha parameter', () => {
  const linearScale = getNumericScale({
    scaleType: 'linear',
    domain: { min: 0, max: 100 },
    range: { min: 0, max: 400 },
  });

  it('should exclude alpha by default (includeAlpha = false)', () => {
    const gradient: Gradient = {
      stops: [
        { offset: 0, color: 'red', opacity: 0.5 },
        { offset: 100, color: 'blue', opacity: 0.3 },
      ],
    };

    const color = evaluateGradientAtValue(gradient, 50, linearScale);
    expect(color).toBeTruthy();
    // Should have alpha of 1 (full opacity)
    expect(color).toMatch(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*1\s*\)/);
  });

  it('should ignore opacity values from stops', () => {
    const gradient: Gradient = {
      stops: [
        { offset: 0, color: 'red', opacity: 0.5 },
        { offset: 100, color: 'blue', opacity: 0.5 },
      ],
    };

    const color = evaluateGradientAtValue(gradient, 50, linearScale);
    expect(color).toBeTruthy();
    // Opacity is always ignored for point evaluation, so alpha should be 1
    expect(color).toMatch(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*1\s*\)/);
  });

  it('should handle string colors and always return full opacity', () => {
    const gradient: Gradient = {
      stops: [
        { offset: 0, color: 'red' },
        { offset: 100, color: 'blue' },
      ],
    };

    const color = evaluateGradientAtValue(gradient, 50, linearScale);
    expect(color).toBeTruthy();
    // Should have alpha of 1 since no opacity was specified
    expect(color).toMatch(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*1\s*\)/);
  });

  it('should handle string colors (no opacity specified) with includeAlpha = true', () => {
    const gradient: Gradient = {
      stops: [
        { offset: 0, color: 'red' },
        { offset: 100, color: 'blue' },
      ],
    };

    const color = evaluateGradientAtValue(gradient, 50, linearScale);
    expect(color).toBeTruthy();
    // Opacity is always ignored for point evaluation, so alpha should be 1
    expect(color).toMatch(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*1\s*\)/);
  });
});

describe('processGradient with numeric scale', () => {
  it('should process gradient with linear scale', () => {
    const linearScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 100 },
      range: { min: 0, max: 400 },
    });

    const gradient: Gradient = {
      stops: [
        { offset: 0, color: 'red' },
        { offset: 50, color: 'yellow' },
        { offset: 100, color: 'green' },
      ],
    };

    const result = processGradient(gradient, linearScale);
    expect(result).not.toBeNull();
    expect(result?.colors).toHaveLength(3);
    expect(result?.positions).toEqual([0, 0.5, 1]);
  });

  it('should handle gradient with custom stops', () => {
    const linearScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 100 },
      range: { min: 0, max: 400 },
    });

    const gradient: Gradient = {
      stops: [
        { offset: 0, color: 'red' },
        { offset: 30, color: 'yellow' },
        { offset: 100, color: 'green' },
      ],
    };

    const result = processGradient(gradient, linearScale);
    expect(result).not.toBeNull();
    expect(result?.positions).toEqual([0, 0.3, 1]); // These get normalized to 0-1
  });

  it('should handle function form stops', () => {
    const linearScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 100 },
      range: { min: 0, max: 400 },
    });

    const gradient: Gradient = {
      stops: ({ min, max }) => [
        { offset: min, color: 'red' },
        { offset: max, color: 'green' },
      ],
    };

    const result = processGradient(gradient, linearScale);
    expect(result).not.toBeNull();
    expect(result?.colors).toHaveLength(2);
    expect(result?.positions).toEqual([0, 1]);
  });
});
