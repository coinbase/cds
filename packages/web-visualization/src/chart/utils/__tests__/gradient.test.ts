import { scaleLinear } from 'd3-scale';

import { evaluateGradientAtValue, getGradientConfig, type GradientDefinition } from '../gradient';
import type { ChartScaleFunction } from '../scale';

describe('gradient utilities', () => {
  describe('getGradientConfig', () => {
    const xScale: ChartScaleFunction = scaleLinear().domain([0, 100]).range([0, 400]);
    const yScale: ChartScaleFunction = scaleLinear().domain([0, 100]).range([400, 0]);

    describe('static stops', () => {
      it('should generate gradient config from stops', () => {
        const gradient: GradientDefinition = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const result = getGradientConfig(gradient, xScale, yScale);
        expect(result).toHaveLength(2);
        expect(result?.[0]).toEqual({ offset: 0, color: '#ff0000', opacity: 1 });
        expect(result?.[1]).toEqual({ offset: 1, color: '#00ff00', opacity: 1 });
      });

      it('should handle CSS variables in gradient config', () => {
        const gradient: GradientDefinition = {
          stops: [
            { offset: 0, color: 'var(--color-fgNegative)' },
            { offset: 100, color: 'var(--color-fgPositive)' },
          ],
        };
        const result = getGradientConfig(gradient, xScale, yScale);
        expect(result?.[0].color).toBe('var(--color-fgNegative)');
        expect(result?.[1].color).toBe('var(--color-fgPositive)');
      });

      it('should handle custom stop positions', () => {
        const gradient: GradientDefinition = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 30, color: '#ffff00' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const result = getGradientConfig(gradient, xScale, yScale);
        expect(result).toHaveLength(3);
        expect(result?.[0].offset).toBe(0);
        expect(result?.[1].offset).toBeCloseTo(0.3);
        expect(result?.[2].offset).toBe(1);
      });

      it('should handle opacity in gradient stops', () => {
        const gradient: GradientDefinition = {
          stops: [
            { offset: 0, color: '#ff0000', opacity: 0.5 },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const result = getGradientConfig(gradient, xScale, yScale);
        expect(result?.[0].color).toBe('#ff0000');
        expect(result?.[1].color).toBe('#00ff00');
        expect(result?.[0].opacity).toBe(0.5);
        expect(result?.[1].opacity).toBe(1);
      });

      it('should warn when stops are not in ascending order', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const gradient: GradientDefinition = {
          stops: [
            { offset: 100, color: '#ff0000' },
            { offset: 0, color: '#00ff00' },
          ],
        };
        const result = getGradientConfig(gradient, xScale, yScale);
        expect(result).toBeUndefined();
        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining('stop offsets must be in ascending order'),
        );
        warnSpy.mockRestore();
      });

      it('should allow duplicate stops for hard transitions', () => {
        const gradient: GradientDefinition = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 50, color: '#ff0000' },
            { offset: 50, color: '#00ff00' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const result = getGradientConfig(gradient, xScale, yScale);
        expect(result).not.toBeUndefined();
        expect(result).toHaveLength(4);
        expect(result?.[1].offset).toBeCloseTo(0.5);
        expect(result?.[2].offset).toBeCloseTo(0.5);
      });
    });

    describe('function form stops', () => {
      it('should process gradient with function form stops', () => {
        const gradient: GradientDefinition = {
          stops: ({ min, max }: { min: number; max: number }) => [
            { offset: min, color: '#ff0000' },
            { offset: max, color: '#00ff00' },
          ],
        };
        const result = getGradientConfig(gradient, xScale, yScale);
        expect(result).toHaveLength(2);
        expect(result?.[0]).toEqual({ offset: 0, color: '#ff0000', opacity: 1 });
        expect(result?.[1]).toEqual({ offset: 1, color: '#00ff00', opacity: 1 });
      });

      it('should handle function form with calculated offsets', () => {
        const gradient: GradientDefinition = {
          stops: ({ min, max }: { min: number; max: number }) => [
            { offset: min, color: '#ff0000' },
            { offset: (min + max) / 2, color: '#ffff00' },
            { offset: max, color: '#00ff00' },
          ],
        };
        const result = getGradientConfig(gradient, xScale, yScale);
        expect(result).toHaveLength(3);
        expect(result?.[0].offset).toBe(0);
        expect(result?.[1].offset).toBeCloseTo(0.5);
        expect(result?.[2].offset).toBe(1);
      });

      it('should handle function form with opacity', () => {
        const gradient: GradientDefinition = {
          stops: ({ min, max }: { min: number; max: number }) => [
            { offset: min, color: '#ff0000', opacity: 0.3 },
            { offset: 0, color: '#ff0000', opacity: 0 },
            { offset: 0, color: '#00ff00', opacity: 0 },
            { offset: max, color: '#00ff00', opacity: 0.3 },
          ],
        };
        const result = getGradientConfig(gradient, xScale, yScale);
        expect(result).not.toBeUndefined();
        expect(result).toHaveLength(4);
        expect(result?.[0].opacity).toBe(0.3);
        expect(result?.[1].opacity).toBe(0);
        expect(result?.[2].opacity).toBe(0);
        expect(result?.[3].opacity).toBe(0.3);
      });
    });

    it('should return undefined for empty stops array', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const gradient: GradientDefinition = {
        stops: [],
      };
      const result = getGradientConfig(gradient, xScale, yScale);
      expect(result).toBeUndefined();
      expect(warnSpy).toHaveBeenCalledWith('Gradient has no stops - falling back to default');
      warnSpy.mockRestore();
    });
  });

  describe('evaluateGradientAtValue', () => {
    const scale: ChartScaleFunction = scaleLinear().domain([0, 100]).range([0, 400]);

    describe('static stops', () => {
      it('should return color-mix() string for continuous gradient', () => {
        const gradient: GradientDefinition = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const stops = getGradientConfig(gradient, scale, scale) ?? [];
        const result = evaluateGradientAtValue(stops, 50, scale);
        expect(result).toContain('color-mix(in srgb');
        expect(result).toContain('#ff0000');
        expect(result).toContain('#00ff00');
        expect(result).toContain('50%'); // Midpoint
      });

      it('should return first color for value at start of range', () => {
        const gradient: GradientDefinition = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const stops = getGradientConfig(gradient, scale, scale) ?? [];
        expect(evaluateGradientAtValue(stops, 0, scale)).toBe('#ff0000');
      });

      it('should return last color for value at end of range', () => {
        const gradient: GradientDefinition = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const stops = getGradientConfig(gradient, scale, scale) ?? [];
        expect(evaluateGradientAtValue(stops, 100, scale)).toBe('#00ff00');
      });

      it('should work with CSS variables', () => {
        const gradient: GradientDefinition = {
          stops: [
            { offset: 0, color: 'var(--color-fgNegative)' },
            { offset: 100, color: 'var(--color-fgPositive)' },
          ],
        };
        const stops = getGradientConfig(gradient, scale, scale) ?? [];
        const result = evaluateGradientAtValue(stops, 50, scale);
        expect(result).toContain('color-mix');
        expect(result).toContain('var(--color-fgNegative)');
        expect(result).toContain('var(--color-fgPositive)');
      });

      it('should handle custom stop offsets', () => {
        const gradient: GradientDefinition = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 30, color: '#ffff00' },
            { offset: 100, color: '#00ff00' },
          ],
        };
        // Value at 15 should be between red and yellow
        const stops = getGradientConfig(gradient, scale, scale) ?? [];
        const result = evaluateGradientAtValue(stops, 15, scale);
        expect(result).toContain('color-mix');
        expect(result).toContain('#ff0000');
        expect(result).toContain('#ffff00');
      });

      it('should ignore opacity in gradient stops (opacity only used in SVG rendering)', () => {
        const gradient: GradientDefinition = {
          stops: [
            { offset: 0, color: '#ff0000', opacity: 0.5 },
            { offset: 100, color: '#00ff00' },
          ],
        };
        const stops = getGradientConfig(gradient, scale, scale) ?? [];
        const result = evaluateGradientAtValue(stops, 50, scale);
        expect(result).toContain('color-mix');
        // Opacity should be ignored - no transparent mixing
        expect(result).not.toContain('transparent');
        expect(result).toContain('#ff0000');
        expect(result).toContain('#00ff00');
      });

      it('should handle hard transitions (duplicate offsets)', () => {
        const gradient: GradientDefinition = {
          stops: [
            { offset: 0, color: '#ff0000' },
            { offset: 0, color: '#00ff00' },
          ],
        };
        const stops = getGradientConfig(gradient, scale, scale) ?? [];
        // At exact boundary, should return the second color (upper bucket)
        expect(evaluateGradientAtValue(stops, 0, scale)).toBe('#00ff00');
      });
    });

    describe('function form stops', () => {
      it('should evaluate function form with domain bounds', () => {
        const gradient: GradientDefinition = {
          stops: ({ min, max }: { min: number; max: number }) => [
            { offset: min, color: '#ff0000' },
            { offset: max, color: '#00ff00' },
          ],
        };
        const stops = getGradientConfig(gradient, scale, scale) ?? [];
        const result = evaluateGradientAtValue(stops, 50, scale);
        expect(result).toContain('color-mix(in srgb');
        expect(result).toContain('#ff0000');
        expect(result).toContain('#00ff00');
      });

      it('should handle function form with zero crossover', () => {
        const gradient: GradientDefinition = {
          stops: ({ min, max }: { min: number; max: number }) => [
            { offset: min, color: '#ff0000', opacity: 0.3 },
            { offset: 0, color: '#ff0000', opacity: 0 },
            { offset: 0, color: '#00ff00', opacity: 0 },
            { offset: max, color: '#00ff00', opacity: 0.3 },
          ],
        };

        const stops = getGradientConfig(gradient, scale, scale) ?? [];

        // Test negative value
        const negResult = evaluateGradientAtValue(stops, 50, scale);
        expect(negResult).toBeTruthy();

        // Test at zero (hard transition)
        const zeroResult = evaluateGradientAtValue(stops, 0, scale);
        expect(zeroResult).toBeTruthy();

        // Test positive value
        const posResult = evaluateGradientAtValue(stops, 50, scale);
        expect(posResult).toBeTruthy();
      });
    });

    it('should return undefined for empty stops array', () => {
      // This shouldn't happen in practice, but test for robustness
      const stops: any[] = [];
      expect(evaluateGradientAtValue(stops, 50, scale)).toBeUndefined();
    });
  });
});
