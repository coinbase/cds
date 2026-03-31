import {
  evaluateGradientAtValue,
  getGradientConfig,
  getGradientStops,
  type GradientDefinition,
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

describe('getGradientConfig with band scale', () => {
  it('should process gradient with band scale', () => {
    const xScale = getCategoricalScale({
      domain: { min: 0, max: 6 }, // [0, 1, 2, 3, 4, 5, 6]
      range: { min: 0, max: 200 },
    });

    const yScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 100 },
      range: { min: 0, max: 400 },
    });

    const gradient: GradientDefinition = {
      axis: 'x',
      stops: [
        { offset: 0, color: 'red' },
        { offset: 6, color: 'blue' },
      ],
    };

    const result = getGradientConfig(gradient, xScale, yScale);
    expect(result).toBeTruthy();
    expect(result).toHaveLength(2);
  });
});

describe('evaluateGradientAtValue with band scale', () => {
  it('should evaluate gradient with band scale indices', () => {
    const bandScale = getCategoricalScale({
      domain: { min: 0, max: 6 }, // [0, 1, 2, 3, 4, 5, 6]
      range: { min: 0, max: 200 },
    });

    const gradient: GradientDefinition = {
      stops: [
        { offset: 0, color: 'red' },
        { offset: 6, color: 'blue' },
      ],
    };

    const stops = getGradientConfig(gradient, bandScale, bandScale) ?? [];

    // First index should be closer to red
    const color0 = evaluateGradientAtValue(stops, 0, bandScale);
    expect(color0).toBeTruthy();

    // Middle index should be a blend
    const color3 = evaluateGradientAtValue(stops, 3, bandScale);
    expect(color3).toBeTruthy();

    // Last index should be closer to blue
    const color6 = evaluateGradientAtValue(stops, 6, bandScale);
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
    const gradient: GradientDefinition = {
      stops: [
        { offset: 0, color: 'red', opacity: 0.5 },
        { offset: 100, color: 'blue', opacity: 0.3 },
      ],
    };

    const domain = { min: 0, max: 100 };
    const stops = getGradientStops(gradient.stops, domain);
    const color = evaluateGradientAtValue(stops, 50, linearScale);
    expect(color).toBeTruthy();
    // Should have alpha of 1 (full opacity)
    expect(color).toMatch(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*1\s*\)/);
  });

  it('should ignore opacity values from stops', () => {
    const gradient: GradientDefinition = {
      stops: [
        { offset: 0, color: 'red', opacity: 0.5 },
        { offset: 100, color: 'blue', opacity: 0.5 },
      ],
    };

    const domain = { min: 0, max: 100 };
    const stops = getGradientStops(gradient.stops, domain);
    const color = evaluateGradientAtValue(stops, 50, linearScale);
    expect(color).toBeTruthy();
    // Opacity is always ignored for point evaluation, so alpha should be 1
    expect(color).toMatch(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*1\s*\)/);
  });

  it('should handle string colors and always return full opacity', () => {
    const gradient: GradientDefinition = {
      stops: [
        { offset: 0, color: 'red' },
        { offset: 100, color: 'blue' },
      ],
    };

    const domain = { min: 0, max: 100 };
    const stops = getGradientStops(gradient.stops, domain);
    const color = evaluateGradientAtValue(stops, 50, linearScale);
    expect(color).toBeTruthy();
    // Should have alpha of 1 since no opacity was specified
    expect(color).toMatch(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*1\s*\)/);
  });

  it('should handle string colors (no opacity specified) with includeAlpha = true', () => {
    const gradient: GradientDefinition = {
      stops: [
        { offset: 0, color: 'red' },
        { offset: 100, color: 'blue' },
      ],
    };

    const domain = { min: 0, max: 100 };
    const stops = getGradientStops(gradient.stops, domain);
    const color = evaluateGradientAtValue(stops, 50, linearScale);
    expect(color).toBeTruthy();
    // Opacity is always ignored for point evaluation, so alpha should be 1
    expect(color).toMatch(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*1\s*\)/);
  });
});

describe('getGradientConfig with numeric scale', () => {
  const xScale = getNumericScale({
    scaleType: 'linear',
    domain: { min: 0, max: 100 },
    range: { min: 0, max: 400 },
  });

  const yScale = getNumericScale({
    scaleType: 'linear',
    domain: { min: 0, max: 100 },
    range: { min: 400, max: 0 },
  });

  it('should process gradient with linear scale', () => {
    const gradient: GradientDefinition = {
      stops: [
        { offset: 0, color: 'red' },
        { offset: 50, color: 'yellow' },
        { offset: 100, color: 'green' },
      ],
    };

    const result = getGradientConfig(gradient, xScale, yScale);
    expect(result).toBeTruthy();
    expect(result).toHaveLength(3);
    expect(result?.[0].offset).toBe(0);
    expect(result?.[1].offset).toBeCloseTo(0.5);
    expect(result?.[2].offset).toBe(1);
  });

  it('should handle gradient with custom stops', () => {
    const gradient: GradientDefinition = {
      stops: [
        { offset: 0, color: 'red' },
        { offset: 30, color: 'yellow' },
        { offset: 100, color: 'green' },
      ],
    };

    const result = getGradientConfig(gradient, xScale, yScale);
    expect(result).toBeTruthy();
    expect(result?.[0].offset).toBe(0);
    expect(result?.[1].offset).toBeCloseTo(0.3);
    expect(result?.[2].offset).toBe(1);
  });

  it('should handle function form stops', () => {
    const gradient: GradientDefinition = {
      stops: ({ min, max }: { min: number; max: number }) => [
        { offset: min, color: 'red' },
        { offset: max, color: 'green' },
      ],
    };

    const result = getGradientConfig(gradient, xScale, yScale);
    expect(result).toBeTruthy();
    expect(result).toHaveLength(2);
    expect(result?.[0].offset).toBe(0);
    expect(result?.[1].offset).toBe(1);
  });
});
