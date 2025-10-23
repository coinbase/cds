import { scaleLinear } from 'd3-scale';

import {
  evaluateGradientAtValue,
  getGradientScale,
  type Gradient,
  type GradientScale,
  normalizeGradientStop,
  processGradient,
  resolveGradientStops,
} from '../gradient';

describe('gradient utilities', () => {
  describe('normalizeGradientStop', () => {
    it('should normalize gradient stop with opacity', () => {
      const result = normalizeGradientStop({ offset: 0, color: '#ff0000', opacity: 0.5 });
      expect(result).toEqual({ color: '#ff0000', opacity: 0.5 });
    });

    it('should normalize gradient stop without opacity (defaults to 1)', () => {
      const result = normalizeGradientStop({ offset: 0, color: '#ff0000' });
      expect(result).toEqual({ color: '#ff0000', opacity: 1 });
    });

    it('should normalize CSS variable gradient stop', () => {
      const result = normalizeGradientStop({ offset: 0, color: 'var(--color-fgPositive)' });
      expect(result).toEqual({ color: 'var(--color-fgPositive)', opacity: 1 });
    });
  });

  describe('resolveGradientStops', () => {
    const scale: GradientScale = scaleLinear().domain([0, 100]).range([0, 400]);

    it('should return static stops array as-is', () => {
      const stops = [
        { offset: 0, color: 'red' },
        { offset: 100, color: 'blue' },
      ];
      const result = resolveGradientStops(stops, scale);
      expect(result).toEqual(stops);
    });

    it('should resolve function form with domain bounds', () => {
      const stopsFn = ({ min, max }: { min: number; max: number }) => [
        { offset: min, color: 'red' },
        { offset: max, color: 'blue' },
      ];
      const result = resolveGradientStops(stopsFn, scale);
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
      const result = resolveGradientStops(stopsFn, scale);
      expect(result).toEqual([
        { offset: 0, color: 'red' },
        { offset: 50, color: 'yellow' },
        { offset: 100, color: 'green' },
      ]);
    });
  });

  describe('processGradient', () => {
    const scale: GradientScale = scaleLinear().domain([0, 100]).range([0, 400]);

    describe('static stops', () => {
      it('should generate gradient config from stops', () => {
        const gradient: Gradient = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const result = processGradient(gradient, scale);
        expect(result).toEqual({
          colors: ['#ff0000', '#00ff00'],
          positions: [0, 1],
          opacities: [1, 1],
        });
      });

      it('should handle CSS variables in gradient config', () => {
        const gradient: Gradient = {
          stops: [
            { offset: 0, color: 'var(--color-fgNegative)' },
            { offset: 100, color: 'var(--color-fgPositive)' },
          ],
        };
        const result = processGradient(gradient, scale);
        expect(result?.colors).toContain('var(--color-fgNegative)');
        expect(result?.colors).toContain('var(--color-fgPositive)');
      });

      it('should handle custom stop positions', () => {
        const gradient: Gradient = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 30, color: '#ffff00' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const result = processGradient(gradient, scale);
        expect(result).toEqual({
          colors: ['#ff0000', '#ffff00', '#00ff00'],
          positions: [0, 0.3, 1],
          opacities: [1, 1, 1],
        });
      });

      it('should handle opacity in gradient stops', () => {
        const gradient: Gradient = {
          stops: [
            { offset: 0, color: '#ff0000', opacity: 0.5 },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const result = processGradient(gradient, scale);
        expect(result?.colors[0]).toBe('#ff0000');
        expect(result?.colors[1]).toBe('#00ff00');
        expect(result?.opacities).toEqual([0.5, 1]);
      });

      it('should warn when stops are not in ascending order', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const gradient: Gradient = {
          stops: [
            { offset: 100, color: '#ff0000' },
            { offset: 0, color: '#00ff00' },
          ],
        };
        const result = processGradient(gradient, scale);
        expect(result).toBeNull();
        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining('stop offsets must be in ascending order'),
        );
        warnSpy.mockRestore();
      });

      it('should allow duplicate stops for hard transitions', () => {
        const gradient: Gradient = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 50, color: '#ff0000' },
            { offset: 50, color: '#00ff00' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const result = processGradient(gradient, scale);
        expect(result).not.toBeNull();
        expect(result?.colors).toHaveLength(4);
        expect(result?.positions[1]).toBe(0.5);
        expect(result?.positions[2]).toBe(0.5);
      });

      it('should require at least 2 stops', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const gradient: Gradient = {
          stops: [{ offset: 0, color: '#ff0000' }],
        };
        const result = processGradient(gradient, scale);
        expect(result).toBeNull();
        expect(warnSpy).toHaveBeenCalledWith('Gradient requires at least 2 stops');
        warnSpy.mockRestore();
      });
    });

    describe('function form stops', () => {
      it('should process gradient with function form stops', () => {
        const gradient: Gradient = {
          stops: ({ min, max }) => [
            { offset: min, color: '#ff0000' },
            { offset: max, color: '#00ff00' },
          ],
        };
        const result = processGradient(gradient, scale);
        expect(result).toEqual({
          colors: ['#ff0000', '#00ff00'],
          positions: [0, 1],
          opacities: [1, 1],
        });
      });

      it('should handle function form with calculated offsets', () => {
        const gradient: Gradient = {
          stops: ({ min, max }) => [
            { offset: min, color: '#ff0000' },
            { offset: (min + max) / 2, color: '#ffff00' },
            { offset: max, color: '#00ff00' },
          ],
        };
        const result = processGradient(gradient, scale);
        expect(result).toEqual({
          colors: ['#ff0000', '#ffff00', '#00ff00'],
          positions: [0, 0.5, 1],
          opacities: [1, 1, 1],
        });
      });

      it('should handle function form with opacity', () => {
        const gradient: Gradient = {
          stops: ({ min, max }) => [
            { offset: min, color: '#ff0000', opacity: 0.3 },
            { offset: 0, color: '#ff0000', opacity: 0 },
            { offset: 0, color: '#00ff00', opacity: 0 },
            { offset: max, color: '#00ff00', opacity: 0.3 },
          ],
        };
        const result = processGradient(gradient, scale);
        expect(result).not.toBeNull();
        expect(result?.colors).toHaveLength(4);
        expect(result?.opacities).toEqual([0.3, 0, 0, 0.3]);
      });
    });
  });

  describe('evaluateGradientAtValue', () => {
    const scale: GradientScale = scaleLinear().domain([0, 100]).range([0, 400]);

    describe('static stops', () => {
      it('should return color-mix() string for continuous gradient', () => {
        const gradient: Gradient = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const result = evaluateGradientAtValue(gradient, 50, scale);
        expect(result).toContain('color-mix(in srgb');
        expect(result).toContain('#ff0000');
        expect(result).toContain('#00ff00');
        expect(result).toContain('50%'); // Midpoint
      });

      it('should return first color for value at start of range', () => {
        const gradient: Gradient = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        expect(evaluateGradientAtValue(gradient, 0, scale)).toBe('#ff0000');
      });

      it('should return last color for value at end of range', () => {
        const gradient: Gradient = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        expect(evaluateGradientAtValue(gradient, 100, scale)).toBe('#00ff00');
      });

      it('should work with CSS variables', () => {
        const gradient: Gradient = {
          stops: [
            { offset: 0, color: 'var(--color-fgNegative)' },
            { offset: 100, color: 'var(--color-fgPositive)' },
          ],
        };
        const result = evaluateGradientAtValue(gradient, 50, scale);
        expect(result).toContain('color-mix');
        expect(result).toContain('var(--color-fgNegative)');
        expect(result).toContain('var(--color-fgPositive)');
      });

      it('should handle custom stop offsets', () => {
        const gradient: Gradient = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 30, color: '#ffff00' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        // Value at 15 should be between red and yellow
        const result = evaluateGradientAtValue(gradient, 15, scale);
        expect(result).toContain('color-mix');
        expect(result).toContain('#ff0000');
        expect(result).toContain('#ffff00');
      });

      it('should ignore opacity in gradient stops (opacity only used in SVG rendering)', () => {
        const gradient: Gradient = {
          stops: [
            { offset: 0, color: '#ff0000', opacity: 0.5 },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const result = evaluateGradientAtValue(gradient, 50, scale);
        expect(result).toContain('color-mix');
        // Opacity should be ignored - no transparent mixing
        expect(result).not.toContain('transparent');
        expect(result).toContain('#ff0000');
        expect(result).toContain('#00ff00');
      });

      it('should handle hard transitions (duplicate offsets)', () => {
        const gradient: Gradient = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 0, color: '#00ff00' },
          ],
        };
        // At exact boundary, should return the second color (upper bucket)
        expect(evaluateGradientAtValue(gradient, 0, scale)).toBe('#00ff00');
      });
    });

    describe('function form stops', () => {
      it('should evaluate function form with domain bounds', () => {
        const gradient: Gradient = {
          stops: ({ min, max }) => [
            { offset: min, color: '#ff0000' },
            { offset: max, color: '#00ff00' },
          ],
        };
        const result = evaluateGradientAtValue(gradient, 50, scale);
        expect(result).toContain('color-mix(in srgb');
        expect(result).toContain('#ff0000');
        expect(result).toContain('#00ff00');
      });

      it('should handle function form with zero crossover', () => {
        const gradient: Gradient = {
          stops: ({ min, max }) => [
            { offset: min, color: '#ff0000', opacity: 0.3 },
            { offset: 0, color: '#ff0000', opacity: 0 },
            { offset: 0, color: '#00ff00', opacity: 0 },
            { offset: max, color: '#00ff00', opacity: 0.3 },
          ],
        };

        // Test negative value
        const negResult = evaluateGradientAtValue(gradient, 50, scale);
        expect(negResult).toBeTruthy();

        // Test at zero (hard transition)
        const zeroResult = evaluateGradientAtValue(gradient, 0, scale);
        expect(zeroResult).toBeTruthy();

        // Test positive value
        const posResult = evaluateGradientAtValue(gradient, 50, scale);
        expect(posResult).toBeTruthy();
      });
    });

    it('should return null for empty stops array', () => {
      // This shouldn't happen in practice, but test for robustness
      const gradient: Gradient = {
        stops: [],
      };
      expect(evaluateGradientAtValue(gradient, 50, scale)).toBeNull();
    });
  });

  describe('getGradientScale', () => {
    const xScale = scaleLinear().domain([0, 100]).range([0, 400]);
    const yScale = scaleLinear().domain([0, 50]).range([400, 0]);

    it('should return y-axis scale by default', () => {
      const gradient: Gradient = {
        stops: [
          { offset: 0, color: '#ff0000' },
          { offset: 100, color: '#00ff00' },
        ],
      };
      const result = getGradientScale(gradient, xScale, yScale);
      expect(result).toBe(yScale);
    });

    it('should return x-axis scale when axis is x', () => {
      const gradient: Gradient = {
        axis: 'x',
        stops: [
          { offset: 0, color: '#ff0000' },
          { offset: 100, color: '#00ff00' },
        ],
      };
      const result = getGradientScale(gradient, xScale, yScale);
      expect(result).toBe(xScale);
    });

    it('should return yScale when gradient is undefined', () => {
      const result = getGradientScale(undefined, xScale, yScale);
      expect(result).toBe(yScale);
    });

    it('should warn when scale is not available', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const gradient: Gradient = {
        axis: 'x',
        stops: [
          { offset: 0, color: '#ff0000' },
          { offset: 100, color: '#00ff00' },
        ],
      };
      const result = getGradientScale(gradient, undefined, yScale);
      expect(result).toBeUndefined();
      expect(warnSpy).toHaveBeenCalledWith('Gradient requires a scale on the x-axis');
      warnSpy.mockRestore();
    });
  });
});
