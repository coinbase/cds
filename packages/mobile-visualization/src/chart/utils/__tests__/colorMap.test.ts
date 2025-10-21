import {
  type ColorMap,
  evaluateColorMapAtValue,
  getColorMapScale,
  normalizeColorStop,
  parseColor,
  processColorMap,
} from '../colorMap';
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

describe('normalizeColorStop', () => {
  it('should handle string colors', () => {
    const result = normalizeColorStop('red');
    expect(result).toEqual({ color: 'red', opacity: 1 });
  });

  it('should handle color objects with opacity', () => {
    const result = normalizeColorStop({ color: 'blue', opacity: 0.5 });
    expect(result).toEqual({ color: 'blue', opacity: 0.5 });
  });

  it('should default opacity to 1 when not provided', () => {
    const result = normalizeColorStop({ color: 'green' });
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

describe('getColorMapScale', () => {
  it('should return yScale by default when no colorMap provided', () => {
    const yScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 100 },
      range: { min: 0, max: 400 },
    });

    const result = getColorMapScale(undefined, undefined, yScale);
    expect(result).toBe(yScale);
  });

  it('should return correct scale based on colorMap axis', () => {
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

    const colorMap: ColorMap = {
      type: 'continuous',
      axis: 'x',
      colors: ['red', 'blue'],
    };

    const result = getColorMapScale(colorMap, xScale, yScale);
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

    const colorMap: ColorMap = {
      type: 'continuous',
      axis: 'x',
      colors: ['red', 'blue'],
    };

    const result = getColorMapScale(colorMap, bandScale, yScale);
    expect(result).toBe(bandScale);
  });

  it('should return null for missing scale', () => {
    const colorMap: ColorMap = {
      type: 'continuous',
      axis: 'x',
      colors: ['red', 'blue'],
    };

    const result = getColorMapScale(colorMap, undefined, undefined);
    expect(result).toBeNull();
  });
});

describe('processColorMap with band scale', () => {
  it('should process continuous colorMap with band scale', () => {
    const bandScale = getCategoricalScale({
      domain: { min: 0, max: 6 }, // [0, 1, 2, 3, 4, 5, 6]
      range: { min: 0, max: 200 },
    });

    const colorMap: ColorMap = {
      type: 'continuous',
      colors: ['red', 'blue'],
    };

    const result = processColorMap(colorMap, bandScale);
    expect(result).not.toBeNull();
    expect(result?.colors).toHaveLength(2);
    expect(result?.positions).toHaveLength(2);
  });

  it('should process discrete colorMap with band scale', () => {
    const bandScale = getCategoricalScale({
      domain: { min: 0, max: 6 }, // [0, 1, 2, 3, 4, 5, 6]
      range: { min: 0, max: 200 },
    });

    const colorMap: ColorMap = {
      type: 'discrete',
      colors: ['red', 'yellow', 'green'],
      stops: [2, 4], // At indices 2 and 4
    };

    const result = processColorMap(colorMap, bandScale);
    expect(result).not.toBeNull();
    expect(result?.colors.length).toBeGreaterThan(0);
  });
});

describe('evaluateColorMapAtValue with band scale', () => {
  it('should evaluate discrete colorMap with band scale indices', () => {
    const bandScale = getCategoricalScale({
      domain: { min: 0, max: 6 }, // [0, 1, 2, 3, 4, 5, 6]
      range: { min: 0, max: 200 },
    });

    const colorMap: ColorMap = {
      type: 'discrete',
      colors: ['red', 'yellow', 'green'],
      stops: [2, 4],
    };

    // Index 0 and 1 should be red
    const color0 = evaluateColorMapAtValue(colorMap, 0, bandScale);
    expect(color0).toBeTruthy();

    // Index 3 should be yellow
    const color3 = evaluateColorMapAtValue(colorMap, 3, bandScale);
    expect(color3).toBeTruthy();

    // Index 5 and 6 should be green
    const color6 = evaluateColorMapAtValue(colorMap, 6, bandScale);
    expect(color6).toBeTruthy();
  });

  it('should evaluate continuous colorMap with band scale indices', () => {
    const bandScale = getCategoricalScale({
      domain: { min: 0, max: 6 }, // [0, 1, 2, 3, 4, 5, 6]
      range: { min: 0, max: 200 },
    });

    const colorMap: ColorMap = {
      type: 'continuous',
      colors: ['red', 'blue'],
    };

    // First index should be closer to red
    const color0 = evaluateColorMapAtValue(colorMap, 0, bandScale);
    expect(color0).toBeTruthy();

    // Middle index should be a blend
    const color3 = evaluateColorMapAtValue(colorMap, 3, bandScale);
    expect(color3).toBeTruthy();

    // Last index should be closer to blue
    const color6 = evaluateColorMapAtValue(colorMap, 6, bandScale);
    expect(color6).toBeTruthy();
  });
});

describe('processColorMap with numeric scale', () => {
  it('should process continuous colorMap with linear scale', () => {
    const linearScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 100 },
      range: { min: 0, max: 400 },
    });

    const colorMap: ColorMap = {
      type: 'continuous',
      colors: ['red', 'yellow', 'green'],
    };

    const result = processColorMap(colorMap, linearScale);
    expect(result).not.toBeNull();
    expect(result?.colors).toHaveLength(3);
    expect(result?.positions).toEqual([0, 0.5, 1]);
  });

  it('should process discrete colorMap with thresholds', () => {
    const linearScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 100 },
      range: { min: 0, max: 400 },
    });

    const colorMap: ColorMap = {
      type: 'discrete',
      colors: ['red', 'yellow', 'green'],
      stops: [30, 70],
    };

    const result = processColorMap(colorMap, linearScale);
    expect(result).not.toBeNull();
    // Discrete colorMaps duplicate colors at boundaries for hard edges
    expect(result?.colors.length).toBeGreaterThan(3);
  });

  it('should handle continuous colorMap with custom stops', () => {
    const linearScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 100 },
      range: { min: 0, max: 400 },
    });

    const colorMap: ColorMap = {
      type: 'continuous',
      colors: ['red', 'yellow', 'green'],
      stops: [0, 0.3, 1],
    };

    const result = processColorMap(colorMap, linearScale);
    expect(result).not.toBeNull();
    expect(result?.positions).toEqual([0, 0.3, 1]);
  });
});
