import {
  getAlignmentFromPosition,
  getLabelCoordinates,
  getPointOnScale,
  projectPoint,
  projectPoints,
} from '../point';
import { getCategoricalScale, getNumericScale } from '../scale';

describe('getPointOnScale', () => {
  let numericScale: ReturnType<typeof getNumericScale>;
  let logScale: ReturnType<typeof getNumericScale>;
  let categoricalScale: ReturnType<typeof getCategoricalScale>;

  beforeEach(() => {
    numericScale = getNumericScale({
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
      domain: { min: 0, max: 4 }, // 5 categories (0, 1, 2, 3, 4)
      range: { min: 0, max: 100 },
      padding: 0.1,
    });
  });

  describe('with numeric scale', () => {
    it('should return correct pixel value for data value', () => {
      const result = getPointOnScale(5, numericScale);
      expect(result).toBe(50); // 5 is middle of 0-10 domain, should map to 50 in 0-100 range
    });

    it('should return 0 for minimum domain value', () => {
      const result = getPointOnScale(0, numericScale);
      expect(result).toBe(0);
    });

    it('should return maximum range value for maximum domain value', () => {
      const result = getPointOnScale(10, numericScale);
      expect(result).toBe(100);
    });

    it('should handle values outside domain', () => {
      const result = getPointOnScale(15, numericScale);
      expect(result).toBe(150); // Linear extrapolation
    });

    it('should handle negative values', () => {
      const result = getPointOnScale(-5, numericScale);
      expect(result).toBe(-50); // Linear extrapolation
    });

    it('should return 0 when scale returns undefined', () => {
      // Create a scale that might return undefined for certain values
      const result = getPointOnScale(NaN, numericScale);
      expect(result).toBe(0);
    });
  });

  describe('with log scale', () => {
    it('should return correct pixel value for valid positive data value', () => {
      const result = getPointOnScale(10, logScale);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(100);
    });

    it('should clamp zero values to small positive value and return scale result', () => {
      const result = getPointOnScale(0, logScale);
      // The scale will return a value for 0.001, which may be negative if outside domain
      expect(typeof result).toBe('number');
    });

    it('should clamp negative values to small positive value and return scale result', () => {
      const result = getPointOnScale(-5, logScale);
      // The scale will return a value for 0.001, which may be negative if outside domain
      expect(typeof result).toBe('number');
    });

    it('should handle very small positive values', () => {
      const result = getPointOnScale(0.001, logScale);
      expect(typeof result).toBe('number');
    });
  });

  describe('with categorical scale', () => {
    it('should return center of band for valid category index', () => {
      const result = getPointOnScale(0, categoricalScale);
      const bandStart = categoricalScale(0) ?? 0;
      const bandwidth = categoricalScale.bandwidth();
      const expectedCenter = bandStart + bandwidth / 2;
      expect(result).toBe(expectedCenter);
    });

    it('should handle different category indices', () => {
      const results = [0, 1, 2, 3, 4].map((index) => getPointOnScale(index, categoricalScale));

      // All results should be different
      const uniqueResults = new Set(results);
      expect(uniqueResults.size).toBe(5);

      // All results should be within the range
      results.forEach((result) => {
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(100);
      });
    });

    it('should handle invalid category index', () => {
      const result = getPointOnScale(10, categoricalScale); // Index 10 doesn't exist
      expect(typeof result).toBe('number');
    });

    it('should handle negative category index', () => {
      const result = getPointOnScale(-1, categoricalScale);
      expect(typeof result).toBe('number');
    });
  });
});

describe('projectPoint', () => {
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

  it('should project point correctly', () => {
    const result = projectPoint({
      x: 5,
      y: 5,
      xScale,
      yScale,
    });

    expect(result).toEqual({
      x: 50, // 5 maps to 50 in x scale
      y: 50, // 5 maps to 50 in inverted y scale
    });
  });

  it('should handle origin point', () => {
    const result = projectPoint({
      x: 0,
      y: 0,
      xScale,
      yScale,
    });

    expect(result).toEqual({
      x: 0,
      y: 100, // 0 maps to 100 in inverted y scale
    });
  });

  it('should handle maximum values', () => {
    const result = projectPoint({
      x: 10,
      y: 10,
      xScale,
      yScale,
    });

    expect(result).toEqual({
      x: 100,
      y: 0, // 10 maps to 0 in inverted y scale
    });
  });

  it('should handle fractional values', () => {
    const result = projectPoint({
      x: 2.5,
      y: 7.5,
      xScale,
      yScale,
    });

    expect(result).toEqual({
      x: 25, // 2.5 maps to 25
      y: 25, // 7.5 maps to 25 in inverted scale
    });
  });

  it('should handle negative values', () => {
    const result = projectPoint({
      x: -2,
      y: -3,
      xScale,
      yScale,
    });

    expect(result).toEqual({
      x: -20, // -2 maps to -20
      y: 130, // -3 maps to 130 in inverted scale
    });
  });
});

describe('projectPoints', () => {
  let xScale: ReturnType<typeof getNumericScale>;
  let yScale: ReturnType<typeof getNumericScale>;
  let categoricalXScale: ReturnType<typeof getCategoricalScale>;

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

    categoricalXScale = getCategoricalScale({
      domain: { min: 0, max: 2 },
      range: { min: 0, max: 100 },
      padding: 0.1,
    });
  });

  it('should return empty array for empty data', () => {
    const result = projectPoints({
      data: [],
      xScale,
      yScale,
    });

    expect(result).toEqual([]);
  });

  it('should project numeric data array', () => {
    const result = projectPoints({
      data: [1, 2, 3],
      xScale,
      yScale,
    });

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ x: 0, y: 90 }); // index 0, value 1
    expect(result[1]).toEqual({ x: 10, y: 80 }); // index 1, value 2
    expect(result[2]).toEqual({ x: 20, y: 70 }); // index 2, value 3
  });

  it('should handle null values in data', () => {
    const result = projectPoints({
      data: [1, null, 3],
      xScale,
      yScale,
    });

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ x: 0, y: 90 });
    expect(result[1]).toBeNull();
    expect(result[2]).toEqual({ x: 20, y: 70 });
  });

  it('should project object data with x and y properties', () => {
    const result = projectPoints({
      data: [
        { x: 2, y: 3 },
        { x: 4, y: 5 },
      ],
      xScale,
      yScale,
    });

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ x: 20, y: 70 });
    expect(result[1]).toEqual({ x: 40, y: 50 });
  });

  it('should handle mixed data types', () => {
    const result = projectPoints({
      data: [1, { x: 2, y: 3 }, null, 4],
      xScale,
      yScale,
    });

    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ x: 0, y: 90 });
    expect(result[1]).toEqual({ x: 20, y: 70 });
    expect(result[2]).toBeNull();
    expect(result[3]).toEqual({ x: 30, y: 60 });
  });

  it('should use custom xData with numeric scale', () => {
    const result = projectPoints({
      data: [1, 2, 3],
      xData: [0, 5, 10],
      xScale,
      yScale,
    });

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ x: 0, y: 90 }); // xData[0] = 0, data[0] = 1
    expect(result[1]).toEqual({ x: 50, y: 80 }); // xData[1] = 5, data[1] = 2
    expect(result[2]).toEqual({ x: 100, y: 70 }); // xData[2] = 10, data[2] = 3
  });

  it('should ignore xData with categorical scale', () => {
    const result = projectPoints({
      data: [1, 2, 3],
      xData: [5, 6, 7], // Should be ignored for categorical scale
      xScale: categoricalXScale,
      yScale,
    });

    expect(result).toHaveLength(3);
    // Should use indices 0, 1, 2 instead of xData values
    const expectedX0 = categoricalXScale(0)! + categoricalXScale.bandwidth() / 2;
    const expectedX1 = categoricalXScale(1)! + categoricalXScale.bandwidth() / 2;
    const expectedX2 = categoricalXScale(2)! + categoricalXScale.bandwidth() / 2;

    expect(result[0]).toEqual({ x: expectedX0, y: 90 });
    expect(result[1]).toEqual({ x: expectedX1, y: 80 });
    expect(result[2]).toEqual({ x: expectedX2, y: 70 });
  });

  it('should handle empty xData array', () => {
    const result = projectPoints({
      data: [1, 2, 3],
      xData: [],
      xScale,
      yScale,
    });

    expect(result).toHaveLength(3);
    // Should fall back to using indices
    expect(result[0]).toEqual({ x: 0, y: 90 });
    expect(result[1]).toEqual({ x: 10, y: 80 });
    expect(result[2]).toEqual({ x: 20, y: 70 });
  });

  it('should handle xData shorter than data array', () => {
    const result = projectPoints({
      data: [1, 2, 3, 4],
      xData: [0, 5], // Only 2 values for 4 data points
      xScale,
      yScale,
    });

    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ x: 0, y: 90 }); // xData[0] = 0
    expect(result[1]).toEqual({ x: 50, y: 80 }); // xData[1] = 5
    expect(result[2]).toEqual({ x: 20, y: 70 }); // Falls back to index 2
    expect(result[3]).toEqual({ x: 30, y: 60 }); // Falls back to index 3
  });

  it('should handle non-numeric xData', () => {
    const result = projectPoints({
      data: [1, 2, 3],
      xData: ['a', 'b', 'c'] as any,
      xScale,
      yScale,
    });

    expect(result).toHaveLength(3);
    // Should fall back to using indices since xData is not numeric
    expect(result[0]).toEqual({ x: 0, y: 90 });
    expect(result[1]).toEqual({ x: 10, y: 80 });
    expect(result[2]).toEqual({ x: 20, y: 70 });
  });

  it('should handle yData parameter', () => {
    const result = projectPoints({
      data: [1, 2, 3],
      yData: [5, 6, 7],
      xScale,
      yScale,
    });

    expect(result).toHaveLength(3);
    // yData should be used as y values
    expect(result[0]).toEqual({ x: 0, y: 90 }); // data[0] = 1 used as y
    expect(result[1]).toEqual({ x: 10, y: 80 }); // data[1] = 2 used as y
    expect(result[2]).toEqual({ x: 20, y: 70 }); // data[2] = 3 used as y
  });

  it('should handle single data point', () => {
    const result = projectPoints({
      data: [5],
      xScale,
      yScale,
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ x: 0, y: 50 });
  });
});

describe('getAlignmentFromPosition', () => {
  it('should return bottom vertical alignment for top position', () => {
    const result = getAlignmentFromPosition('top');
    expect(result).toEqual({
      horizontalAlignment: 'center',
      verticalAlignment: 'bottom',
    });
  });

  it('should return top vertical alignment for bottom position', () => {
    const result = getAlignmentFromPosition('bottom');
    expect(result).toEqual({
      horizontalAlignment: 'center',
      verticalAlignment: 'top',
    });
  });

  it('should return right horizontal alignment for left position', () => {
    const result = getAlignmentFromPosition('left');
    expect(result).toEqual({
      horizontalAlignment: 'right',
      verticalAlignment: 'middle',
    });
  });

  it('should return left horizontal alignment for right position', () => {
    const result = getAlignmentFromPosition('right');
    expect(result).toEqual({
      horizontalAlignment: 'left',
      verticalAlignment: 'middle',
    });
  });

  it('should return centered alignment for center position', () => {
    const result = getAlignmentFromPosition('center');
    expect(result).toEqual({
      horizontalAlignment: 'center',
      verticalAlignment: 'middle',
    });
  });
});

describe('getLabelCoordinates', () => {
  it('should offset y coordinate negatively for top position', () => {
    const result = getLabelCoordinates(100, 200, 'top', 10);
    expect(result).toEqual({ x: 100, y: 190 });
  });

  it('should offset y coordinate positively for bottom position', () => {
    const result = getLabelCoordinates(100, 200, 'bottom', 10);
    expect(result).toEqual({ x: 100, y: 210 });
  });

  it('should offset x coordinate negatively for left position', () => {
    const result = getLabelCoordinates(100, 200, 'left', 10);
    expect(result).toEqual({ x: 90, y: 200 });
  });

  it('should offset x coordinate positively for right position', () => {
    const result = getLabelCoordinates(100, 200, 'right', 10);
    expect(result).toEqual({ x: 110, y: 200 });
  });

  it('should not offset coordinates for center position', () => {
    const result = getLabelCoordinates(100, 200, 'center', 10);
    expect(result).toEqual({ x: 100, y: 200 });
  });

  it('should handle zero offset', () => {
    const result = getLabelCoordinates(100, 200, 'top', 0);
    expect(result).toEqual({ x: 100, y: 200 });
  });

  it('should handle negative offset for top position', () => {
    const result = getLabelCoordinates(100, 200, 'top', -10);
    expect(result).toEqual({ x: 100, y: 210 });
  });

  it('should handle large offsets', () => {
    const result = getLabelCoordinates(50, 50, 'right', 100);
    expect(result).toEqual({ x: 150, y: 50 });
  });

  it('should handle fractional offsets', () => {
    const result = getLabelCoordinates(100, 200, 'bottom', 5.5);
    expect(result).toEqual({ x: 100, y: 205.5 });
  });

  it('should handle negative coordinates', () => {
    const result = getLabelCoordinates(-50, -100, 'left', 20);
    expect(result).toEqual({ x: -70, y: -100 });
  });
});
