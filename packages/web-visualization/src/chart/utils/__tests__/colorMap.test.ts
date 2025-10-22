import { scaleLinear } from 'd3-scale';

import {
  type ColorMap,
  type ColorMapScale,
  evaluateColorMapAtValue,
  getColorMapScale,
  normalizeColorStop,
  processColorMap,
} from '../colorMap';

describe('colorMap utilities', () => {
  describe('normalizeColorStop', () => {
    it('should normalize string color stop', () => {
      const result = normalizeColorStop('#ff0000');
      expect(result).toEqual({ color: '#ff0000', opacity: 1 });
    });

    it('should normalize object color stop with opacity', () => {
      const result = normalizeColorStop({ color: '#ff0000', opacity: 0.5 });
      expect(result).toEqual({ color: '#ff0000', opacity: 0.5 });
    });

    it('should normalize object color stop without opacity', () => {
      const result = normalizeColorStop({ color: '#ff0000' });
      expect(result).toEqual({ color: '#ff0000', opacity: 1 });
    });

    it('should normalize CSS variable color stop', () => {
      const result = normalizeColorStop('var(--color-fgPositive)');
      expect(result).toEqual({ color: 'var(--color-fgPositive)', opacity: 1 });
    });
  });

  describe('processColorMap', () => {
    const scale: ColorMapScale = scaleLinear().domain([0, 100]).range([0, 400]);

    describe('continuous colorMap', () => {
      it('should generate gradient config for continuous colorMap', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['#ff0000', '#00ff00'],
        };
        const result = processColorMap(colorMap, scale);
        expect(result).toEqual({
          colors: ['#ff0000', '#00ff00'],
          positions: [0, 1],
          opacities: [1, 1],
        });
      });

      it('should handle CSS variables in gradient config', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['var(--color-fgNegative)', 'var(--color-fgPositive)'],
        };
        const result = processColorMap(colorMap, scale);
        expect(result?.colors).toContain('var(--color-fgNegative)');
        expect(result?.colors).toContain('var(--color-fgPositive)');
      });

      it('should handle custom stops', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['#ff0000', '#ffff00', '#00ff00'],
          stops: [0, 30, 100],
        };
        const result = processColorMap(colorMap, scale);
        expect(result).toEqual({
          colors: ['#ff0000', '#ffff00', '#00ff00'],
          positions: [0, 0.3, 1],
          opacities: [1, 1, 1],
        });
      });

      it('should handle opacity in color stops', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: [{ color: '#ff0000', opacity: 0.5 }, '#00ff00'],
        };
        const result = processColorMap(colorMap, scale);
        expect(result?.colors[0]).toBe('#ff0000');
        expect(result?.colors[1]).toBe('#00ff00');
        expect(result?.opacities).toEqual([0.5, 1]);
      });

      it('should warn when stops length does not match colors length', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['#ff0000', '#00ff00'],
          stops: [0, 50, 100], // Mismatch: 3 stops for 2 colors
        };
        const result = processColorMap(colorMap, scale);
        expect(result).toBeNull();
        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining('stops length (3) must match colors length (2)'),
        );
        warnSpy.mockRestore();
      });

      it('should warn when stops are not in ascending order', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['#ff0000', '#00ff00'],
          stops: [100, 0], // Descending - not allowed
        };
        const result = processColorMap(colorMap, scale);
        expect(result).toBeNull();
        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining('stops must be in ascending order'),
        );
        warnSpy.mockRestore();
      });

      it('should allow duplicate stops for hard transitions', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['#ff0000', '#ff0000', '#00ff00', '#00ff00'],
          stops: [0, 50, 50, 100], // Duplicate at 50 creates hard transition
        };
        const result = processColorMap(colorMap, scale);
        expect(result).not.toBeNull();
        expect(result?.colors).toHaveLength(4);
        expect(result?.positions[1]).toBe(0.5);
        expect(result?.positions[2]).toBe(0.5);
      });

      it('should require at least 2 colors', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['#ff0000'],
        };
        const result = processColorMap(colorMap, scale);
        expect(result).toBeNull();
        expect(warnSpy).toHaveBeenCalledWith('Continuous colorMap requires at least 2 colors');
        warnSpy.mockRestore();
      });
    });

    describe('discrete colorMap', () => {
      it('should generate gradient config for discrete colorMap', () => {
        const colorMap: ColorMap = {
          type: 'discrete',
          colors: ['#ff0000', '#00ff00'],
          stops: [50],
        };
        const result = processColorMap(colorMap, scale);
        // Discrete creates hard edges by duplicating colors at thresholds
        expect(result?.colors).toHaveLength(4); // [red, red, green, green]
        expect(result?.positions).toEqual([0, 0.5, 0.5, 1]);
      });

      it('should handle discrete colorMap with no stops', () => {
        const colorMap: ColorMap = {
          type: 'discrete',
          colors: ['#ff0000', '#00ff00'],
        };
        const result = processColorMap(colorMap, scale);
        expect(result).toEqual({
          colors: ['#ff0000', '#ff0000'],
          positions: [0, 1],
          opacities: [1, 1],
        });
      });

      it('should handle multiple thresholds', () => {
        const colorMap: ColorMap = {
          type: 'discrete',
          colors: ['#ff0000', '#ffff00', '#00ff00'],
          stops: [30, 70],
        };
        const result = processColorMap(colorMap, scale);
        // Should create hard edges at 0.3 and 0.7
        expect(result?.colors).toHaveLength(6); // [red, red, yellow, yellow, green, green]
        expect(result?.positions).toEqual([0, 0.3, 0.3, 0.7, 0.7, 1]);
      });

      it('should warn when colors length does not equal stops length + 1', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const colorMap: ColorMap = {
          type: 'discrete',
          colors: ['#ff0000', '#00ff00'],
          stops: [30, 70], // Need 3 colors for 2 stops
        };
        const result = processColorMap(colorMap, scale);
        expect(result).toBeNull();
        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining('colors length (2) must equal stops length + 1 (3)'),
        );
        warnSpy.mockRestore();
      });
    });
  });

  describe('evaluateColorMapAtValue', () => {
    const scale: ColorMapScale = scaleLinear().domain([0, 100]).range([0, 400]);

    describe('discrete colorMap', () => {
      it('should return correct color for discrete colorMap', () => {
        const colorMap: ColorMap = {
          type: 'discrete',
          colors: ['#ff0000', '#00ff00'],
          stops: [50],
        };
        expect(evaluateColorMapAtValue(colorMap, 25, scale)).toBe('#ff0000');
        expect(evaluateColorMapAtValue(colorMap, 75, scale)).toBe('#00ff00');
      });

      it('should return first color when value is below first threshold', () => {
        const colorMap: ColorMap = {
          type: 'discrete',
          colors: ['#ff0000', '#ffff00', '#00ff00'],
          stops: [30, 70],
        };
        expect(evaluateColorMapAtValue(colorMap, 10, scale)).toBe('#ff0000');
      });

      it('should return last color when value is above all thresholds', () => {
        const colorMap: ColorMap = {
          type: 'discrete',
          colors: ['#ff0000', '#ffff00', '#00ff00'],
          stops: [30, 70],
        };
        expect(evaluateColorMapAtValue(colorMap, 90, scale)).toBe('#00ff00');
      });

      it('should handle discrete colorMap with no stops', () => {
        const colorMap: ColorMap = {
          type: 'discrete',
          colors: ['#ff0000', '#00ff00'],
        };
        expect(evaluateColorMapAtValue(colorMap, 50, scale)).toBe('#ff0000');
      });
    });

    describe('continuous colorMap', () => {
      it('should return color-mix() string for continuous colorMap', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['#ff0000', '#00ff00'],
        };
        const result = evaluateColorMapAtValue(colorMap, 50, scale);
        expect(result).toContain('color-mix(in srgb');
        expect(result).toContain('#ff0000');
        expect(result).toContain('#00ff00');
        expect(result).toContain('50%'); // Midpoint
      });

      it('should return first color for value at start of range', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['#ff0000', '#00ff00'],
        };
        expect(evaluateColorMapAtValue(colorMap, 0, scale)).toBe('#ff0000');
      });

      it('should return last color for value at end of range', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['#ff0000', '#00ff00'],
        };
        expect(evaluateColorMapAtValue(colorMap, 100, scale)).toBe('#00ff00');
      });

      it('should work with CSS variables', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['var(--color-fgNegative)', 'var(--color-fgPositive)'],
        };
        const result = evaluateColorMapAtValue(colorMap, 50, scale);
        expect(result).toContain('color-mix');
        expect(result).toContain('var(--color-fgNegative)');
        expect(result).toContain('var(--color-fgPositive)');
      });

      it('should handle custom stops', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['#ff0000', '#ffff00', '#00ff00'],
          stops: [0, 30, 100],
        };
        // Value at 15 should be between red and yellow
        const result = evaluateColorMapAtValue(colorMap, 15, scale);
        expect(result).toContain('color-mix');
        expect(result).toContain('#ff0000');
        expect(result).toContain('#ffff00');
      });

      it('should handle opacity in color stops', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: [{ color: '#ff0000', opacity: 0.5 }, '#00ff00'],
        };
        const result = evaluateColorMapAtValue(colorMap, 50, scale);
        expect(result).toContain('color-mix');
        // First color should have opacity mixed in
        expect(result).toContain('transparent');
      });

      it('should respect colorSpace parameter', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['#ff0000', '#00ff00'],
          colorSpace: 'oklch',
        };
        const result = evaluateColorMapAtValue(colorMap, 50, scale);
        expect(result).toContain('color-mix(in oklch');
      });

      it('should default to srgb colorSpace', () => {
        const colorMap: ColorMap = {
          type: 'continuous',
          colors: ['#ff0000', '#00ff00'],
        };
        const result = evaluateColorMapAtValue(colorMap, 50, scale);
        expect(result).toContain('color-mix(in srgb');
      });
    });

    it('should return null for empty colors array', () => {
      const colorMap: ColorMap = {
        type: 'continuous',
        colors: [],
      };
      expect(evaluateColorMapAtValue(colorMap, 50, scale)).toBeNull();
    });
  });

  describe('getColorMapScale', () => {
    const xScale = scaleLinear().domain([0, 100]).range([0, 400]);
    const yScale = scaleLinear().domain([0, 50]).range([400, 0]);

    it('should return y-axis scale by default', () => {
      const colorMap: ColorMap = {
        type: 'continuous',
        colors: ['#ff0000', '#00ff00'],
      };
      const result = getColorMapScale(colorMap, xScale, yScale);
      expect(result).toBe(yScale);
    });

    it('should return x-axis scale when axis is x', () => {
      const colorMap: ColorMap = {
        type: 'continuous',
        colors: ['#ff0000', '#00ff00'],
        axis: 'x',
      };
      const result = getColorMapScale(colorMap, xScale, yScale);
      expect(result).toBe(xScale);
    });

    it('should return yScale when colorMap is undefined', () => {
      const result = getColorMapScale(undefined, xScale, yScale);
      expect(result).toBe(yScale);
    });

    it('should warn when scale is not available', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const colorMap: ColorMap = {
        type: 'continuous',
        colors: ['#ff0000', '#00ff00'],
        axis: 'x',
      };
      const result = getColorMapScale(colorMap, undefined, yScale);
      expect(result).toBeUndefined();
      expect(warnSpy).toHaveBeenCalledWith('ColorMap requires a scale on the x-axis');
      warnSpy.mockRestore();
    });
  });
});
