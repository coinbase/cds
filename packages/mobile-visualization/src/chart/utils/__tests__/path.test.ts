import {
  type ChartPathCurveType,
  getArcPath,
  getAreaPath,
  getBarPath,
  getDottedAreaPath,
  getLinePath,
  getPathCurveFunction,
  lineToPath,
} from '../path';
import { getCategoricalScale, getNumericScale } from '../scale';

describe('getPathCurveFunction', () => {
  it('should return curveLinear for "linear" curve type', () => {
    const curveFunction = getPathCurveFunction('linear');
    expect(curveFunction).toBeDefined();
    expect(typeof curveFunction).toBe('function');
  });

  it('should return curveLinear as default when no curve type provided', () => {
    const curveFunction = getPathCurveFunction();
    expect(curveFunction).toBeDefined();
    expect(typeof curveFunction).toBe('function');
  });

  it('should return appropriate curve functions for all supported types', () => {
    const curveTypes: ChartPathCurveType[] = [
      'bump',
      'catmullRom',
      'linear',
      'linearClosed',
      'monotone',
      'natural',
      'step',
      'stepBefore',
      'stepAfter',
    ];

    curveTypes.forEach((curveType) => {
      const curveFunction = getPathCurveFunction(curveType);
      expect(curveFunction).toBeDefined();
      expect(typeof curveFunction).toBe('function');
    });
  });

  it('should return curveLinear for unknown curve type', () => {
    const curveFunction = getPathCurveFunction('unknown' as ChartPathCurveType);
    expect(curveFunction).toBeDefined();
    expect(typeof curveFunction).toBe('function');
  });
});

describe('getLinePath', () => {
  let xScale: ReturnType<typeof getNumericScale>;
  let yScale: ReturnType<typeof getNumericScale>;

  beforeEach(() => {
    xScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 10 },
      range: { min: 0, max: 100 },
    });

    yScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 10 },
      range: { min: 100, max: 0 }, // Inverted for SVG coordinates
    });
  });

  it('should return empty string for empty data array', () => {
    const result = getLinePath({
      data: [],
      xScale,
      yScale,
    });
    expect(result).toBe('');
  });

  it('should generate path for numeric data array', () => {
    const result = getLinePath({
      data: [1, 2, 3],
      curve: 'linear',
      xScale,
      yScale,
    });
    expect(result).toBe('M0,90L10,80L20,70');
  });

  it('should handle null values in data (gaps)', () => {
    const result = getLinePath({
      data: [1, null, 3],
      xScale,
      yScale,
    });
    expect(result).toBe('M0,90ZM20,70Z');
  });

  it('should connect across null values when connectNulls is true', () => {
    const result = getLinePath({
      data: [1, null, 3],
      curve: 'linear',
      xScale,
      yScale,
      connectNulls: true,
    });
    // When connectNulls is true, it should create a continuous line from point 1 to point 3
    expect(result).toBe('M0,90L20,70');
  });

  it('should handle multiple consecutive nulls with connectNulls', () => {
    const result = getLinePath({
      data: [1, null, null, 4],
      curve: 'linear',
      xScale,
      yScale,
      connectNulls: true,
    });
    // Should connect from first to last point, skipping all nulls
    expect(result).toBe('M0,90L30,60');
  });

  it('should handle object data with x and y properties', () => {
    const result = getLinePath({
      data: [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ],
      curve: 'linear',
      xScale,
      yScale,
    });
    expect(result).toBe('M10,80L30,60');
  });

  it('should handle mixed data types', () => {
    const result = getLinePath({
      data: [1, { x: 2, y: 3 }, null, 4],
      curve: 'linear',
      xScale,
      yScale,
    });
    expect(result).toBe('M0,90L20,70M30,60Z');
  });

  it('should use custom xData when provided', () => {
    const result = getLinePath({
      data: [1, 2, 3],
      xData: [0, 5, 10],
      curve: 'linear',
      xScale,
      yScale,
    });
    expect(result).toBe('M0,90L50,80L100,70');
  });

  it('should handle different curve types', () => {
    const linearResult = getLinePath({
      data: [1, 2, 1],
      curve: 'linear',
      xScale,
      yScale,
    });
    expect(linearResult).toBe('M0,90L10,80L20,90');

    // Just verify other curve types return valid paths
    const stepResult = getLinePath({
      data: [1, 2, 1],
      curve: 'step',
      xScale,
      yScale,
    });
    expect(stepResult).toBeTruthy();
    expect(stepResult.startsWith('M')).toBe(true);
  });

  it('should handle single data point', () => {
    const result = getLinePath({
      data: [5],
      xScale,
      yScale,
    });
    expect(result).toBe('M0,50Z');
  });
});

describe('getAreaPath', () => {
  let xScale: ReturnType<typeof getNumericScale>;
  let yScale: ReturnType<typeof getNumericScale>;

  beforeEach(() => {
    xScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 10 },
      range: { min: 0, max: 100 },
    });

    yScale = getNumericScale({
      scaleType: 'linear',
      domain: { min: 0, max: 10 },
      range: { min: 100, max: 0 }, // Inverted for SVG coordinates
    });
  });

  it('should return empty string for empty data array', () => {
    const result = getAreaPath({
      data: [],
      curve: 'linear',
      xScale,
      yScale,
    });
    expect(result).toBe('');
  });

  it('should generate area path for numeric data array', () => {
    const result = getAreaPath({
      data: [1, 2, 3],
      curve: 'linear',
      xScale,
      yScale,
    });
    expect(result).toBe('M0,90L10,80L20,70L20,100L10,100L0,100Z');
  });

  it('should generate area path for tuple data array', () => {
    const result = getAreaPath({
      data: [
        [1, 3],
        [2, 4],
      ],
      curve: 'linear',
      xScale,
      yScale,
    });
    expect(result).toBe('M0,70L10,60L10,80L0,90Z');
  });

  it('should handle null values in data', () => {
    const result = getAreaPath({
      data: [1, null, 3],
      curve: 'linear',
      xScale,
      yScale,
    });
    expect(result).toBe('M0,90L0,100ZM20,70L20,100Z');
  });

  it('should connect across null values when connectNulls is true', () => {
    const result = getAreaPath({
      data: [1, null, 3],
      curve: 'linear',
      xScale,
      yScale,
      connectNulls: true,
    });
    // When connectNulls is true, it should create a continuous area from point 1 to point 3
    expect(result).toBe('M0,90L20,70L20,100L0,100Z');
  });

  it('should handle multiple consecutive nulls with connectNulls', () => {
    const result = getAreaPath({
      data: [1, null, null, 4],
      curve: 'linear',
      xScale,
      yScale,
      connectNulls: true,
    });
    // Should connect from first to last point, skipping all nulls
    expect(result).toBe('M0,90L30,60L30,100L0,100Z');
  });

  it('should handle tuple data with connectNulls', () => {
    const result = getAreaPath({
      data: [[1, 3], null, [2, 4]],
      curve: 'linear',
      xScale,
      yScale,
      connectNulls: true,
    });
    // Should connect from first tuple to last tuple, skipping the null
    expect(result).toBe('M0,70L20,60L20,80L0,90Z');
  });

  it('should use custom xData when provided', () => {
    const result = getAreaPath({
      data: [1, 2, 3],
      xData: [0, 5, 10],
      curve: 'linear',
      xScale,
      yScale,
    });
    expect(result).toBe('M0,90L50,80L100,70L100,100L50,100L0,100Z');
  });

  it('should work with categorical x-scale', () => {
    const categoricalXScale = getCategoricalScale({
      domain: { min: 0, max: 2 },
      range: { min: 0, max: 100 },
      padding: 0.1,
    });

    const result = getAreaPath({
      data: [1, 2, 3],
      curve: 'linear',
      xScale: categoricalXScale,
      yScale,
    });
    // Just verify it returns a valid path since categorical positioning is complex
    expect(result).toBeTruthy();
    expect(result.startsWith('M')).toBe(true);
    expect(result.endsWith('Z')).toBe(true);
  });

  it('should handle single data point', () => {
    const result = getAreaPath({
      data: [5],
      curve: 'linear',
      xScale,
      yScale,
    });
    expect(result).toBe('M0,50L0,100Z');
  });
});

describe('getBarPath', () => {
  it('should generate basic rectangle path', () => {
    const result = getBarPath(10, 20, 30, 40, 0, false, false);
    expect(result).toBe(
      'M 10 20 L 40 20 A 0 0 0 0 1 40 20 L 40 60 A 0 0 0 0 1 40 60 L 10 60 A 0 0 0 0 1 10 60 L 10 20 A 0 0 0 0 1 10 20 Z',
    );
  });

  it('should generate path with rounded top corners', () => {
    const result = getBarPath(10, 20, 30, 40, 5, true, false);
    expect(result).toBe(
      'M 15 20 L 35 20 A 5 5 0 0 1 40 25 L 40 60 A 0 0 0 0 1 40 60 L 10 60 A 0 0 0 0 1 10 60 L 10 25 A 5 5 0 0 1 15 20 Z',
    );
  });

  it('should generate path with all corners rounded', () => {
    const result = getBarPath(0, 0, 50, 100, 8, true, true);
    expect(result).toBe(
      'M 8 0 L 42 0 A 8 8 0 0 1 50 8 L 50 92 A 8 8 0 0 1 42 100 L 8 100 A 8 8 0 0 1 0 92 L 0 8 A 8 8 0 0 1 8 0 Z',
    );
  });

  it('should handle zero radius', () => {
    const result = getBarPath(0, 0, 50, 100, 0, true, true);
    expect(result).toBe(
      'M 0 0 L 50 0 A 0 0 0 0 1 50 0 L 50 100 A 0 0 0 0 1 50 100 L 0 100 A 0 0 0 0 1 0 100 L 0 0 A 0 0 0 0 1 0 0 Z',
    );
  });

  it('should handle large radius (should be clamped)', () => {
    const result = getBarPath(0, 0, 20, 40, 100, true, true);
    // Radius should be clamped to min(width/2, height/2) = min(10, 20) = 10
    expect(result).toBeTruthy();
    expect(result.startsWith('M')).toBe(true);
    expect(result.endsWith('Z')).toBe(true);
  });

  it('should handle fractional values', () => {
    const result = getBarPath(10.5, 20.25, 30.75, 40.125, 2.5, true, true);
    expect(result).toBeTruthy();
    expect(result.startsWith('M')).toBe(true);
    expect(result.endsWith('Z')).toBe(true);
  });

  it('should generate different paths for different rounding combinations', () => {
    const noRounding = getBarPath(0, 0, 50, 100, 10, false, false);
    const topRounding = getBarPath(0, 0, 50, 100, 10, true, false);
    const bottomRounding = getBarPath(0, 0, 50, 100, 10, false, true);
    const bothRounding = getBarPath(0, 0, 50, 100, 10, true, true);

    expect(noRounding).not.toBe(topRounding);
    expect(topRounding).not.toBe(bottomRounding);
    expect(bottomRounding).not.toBe(bothRounding);
    expect(noRounding).not.toBe(bothRounding);
  });
});

describe('lineToPath', () => {
  it('should generate a simple line path', () => {
    const result = lineToPath(0, 0, 100, 100);
    expect(result).toBe('M 0 0 L 100 100');
  });

  it('should handle negative coordinates', () => {
    const result = lineToPath(-50, -25, 50, 25);
    expect(result).toBe('M -50 -25 L 50 25');
  });

  it('should handle fractional coordinates', () => {
    const result = lineToPath(10.5, 20.25, 30.75, 40.125);
    expect(result).toBe('M 10.5 20.25 L 30.75 40.125');
  });

  it('should handle horizontal lines', () => {
    const result = lineToPath(0, 50, 100, 50);
    expect(result).toBe('M 0 50 L 100 50');
  });

  it('should handle vertical lines', () => {
    const result = lineToPath(50, 0, 50, 100);
    expect(result).toBe('M 50 0 L 50 100');
  });

  it('should handle zero-length lines (same start and end)', () => {
    const result = lineToPath(25, 25, 25, 25);
    expect(result).toBe('M 25 25 L 25 25');
  });
});

describe('getDottedAreaPath', () => {
  it('should generate dotted pattern within bounds', () => {
    const result = getDottedAreaPath({ x: 0, y: 0, width: 100, height: 50 }, 10, 2);

    expect(result).toBeTruthy();
    // Should contain multiple circles (arc commands)
    expect(result).toContain('a');
    expect(result).toContain('M');
  });

  it('should return empty string for zero width', () => {
    const result = getDottedAreaPath({ x: 0, y: 0, width: 0, height: 50 }, 10, 2);
    expect(result).toBe('');
  });

  it('should return empty string for zero height', () => {
    const result = getDottedAreaPath({ x: 0, y: 0, width: 100, height: 0 }, 10, 2);
    expect(result).toBe('');
  });

  it('should return empty string for zero pattern size', () => {
    const result = getDottedAreaPath({ x: 0, y: 0, width: 100, height: 50 }, 0, 2);
    expect(result).toBe('');
  });

  it('should return empty string for zero dot size', () => {
    const result = getDottedAreaPath({ x: 0, y: 0, width: 100, height: 50 }, 10, 0);
    expect(result).toBe('');
  });

  it('should return empty string for negative dimensions', () => {
    const result = getDottedAreaPath({ x: 0, y: 0, width: -100, height: 50 }, 10, 2);
    expect(result).toBe('');
  });

  it('should handle offset bounds', () => {
    const result = getDottedAreaPath({ x: 50, y: 25, width: 100, height: 50 }, 10, 2);

    expect(result).toBeTruthy();
    // Should have paths starting at offset positions
    expect(result).toContain('M');
  });

  it('should scale with pattern size', () => {
    const smallPattern = getDottedAreaPath({ x: 0, y: 0, width: 100, height: 100 }, 10, 2);
    const largePattern = getDottedAreaPath({ x: 0, y: 0, width: 100, height: 100 }, 50, 2);

    // Smaller pattern size should create more dots (longer path)
    expect(smallPattern.length).toBeGreaterThan(largePattern.length);
  });
});

describe('getArcPath', () => {
  it('should generate arc path for pie slice', () => {
    const result = getArcPath({
      startAngle: 0,
      endAngle: Math.PI / 2,
      innerRadius: 0,
      outerRadius: 100,
    });

    expect(result).toBeTruthy();
    expect(result.startsWith('M')).toBe(true);
    // Arc should contain arc commands
    expect(result).toContain('A');
  });

  it('should generate arc path for donut slice', () => {
    const result = getArcPath({
      startAngle: 0,
      endAngle: Math.PI / 2,
      innerRadius: 50,
      outerRadius: 100,
    });

    expect(result).toBeTruthy();
    expect(result.startsWith('M')).toBe(true);
    // Should have different path than pie (has inner radius)
    expect(result).toContain('A');
  });

  it('should return empty string for zero outer radius', () => {
    const result = getArcPath({
      startAngle: 0,
      endAngle: Math.PI,
      innerRadius: 0,
      outerRadius: 0,
    });

    expect(result).toBe('');
  });

  it('should return empty string for negative outer radius', () => {
    const result = getArcPath({
      startAngle: 0,
      endAngle: Math.PI,
      innerRadius: 0,
      outerRadius: -100,
    });

    expect(result).toBe('');
  });

  it('should handle full circle (2π)', () => {
    const result = getArcPath({
      startAngle: 0,
      endAngle: Math.PI * 2,
      innerRadius: 0,
      outerRadius: 100,
    });

    expect(result).toBeTruthy();
    expect(result.startsWith('M')).toBe(true);
  });

  it('should handle corner radius', () => {
    const withoutCorners = getArcPath({
      startAngle: 0,
      endAngle: Math.PI / 2,
      innerRadius: 50,
      outerRadius: 100,
      cornerRadius: 0,
    });

    const withCorners = getArcPath({
      startAngle: 0,
      endAngle: Math.PI / 2,
      innerRadius: 50,
      outerRadius: 100,
      cornerRadius: 8,
    });

    expect(withoutCorners).toBeTruthy();
    expect(withCorners).toBeTruthy();
    // Paths should be different
    expect(withCorners).not.toBe(withoutCorners);
  });

  it('should handle pad angle', () => {
    const withoutPadding = getArcPath({
      startAngle: 0,
      endAngle: Math.PI / 2,
      innerRadius: 50,
      outerRadius: 100,
      paddingAngle: 0,
    });

    const withPadding = getArcPath({
      startAngle: 0,
      endAngle: Math.PI / 2,
      innerRadius: 50,
      outerRadius: 100,
      paddingAngle: 0.05,
    });

    expect(withoutPadding).toBeTruthy();
    expect(withPadding).toBeTruthy();
    // Paths should be different when padding is applied
    expect(withPadding).not.toBe(withoutPadding);
  });

  it('should handle collapsed arc (same start and end angle)', () => {
    const result = getArcPath({
      startAngle: Math.PI / 4,
      endAngle: Math.PI / 4, // Same as start
      innerRadius: 0,
      outerRadius: 100,
    });

    // Should return empty string for collapsed arc (no area to draw)
    expect(result).toBe('');
  });

  it('should handle negative inner radius (clamps to 0)', () => {
    const result = getArcPath({
      startAngle: 0,
      endAngle: Math.PI,
      innerRadius: -50,
      outerRadius: 100,
    });

    expect(result).toBeTruthy();
    expect(result.startsWith('M')).toBe(true);
  });

  it('should generate different paths for different angles', () => {
    const quarterCircle = getArcPath({
      startAngle: 0,
      endAngle: Math.PI / 2,
      innerRadius: 0,
      outerRadius: 100,
    });

    const halfCircle = getArcPath({
      startAngle: 0,
      endAngle: Math.PI,
      innerRadius: 0,
      outerRadius: 100,
    });

    expect(quarterCircle).not.toBe(halfCircle);
  });
});
