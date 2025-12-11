import { getArcPath } from '../path';
import {
  calculateArcData,
  degreesToRadians,
  getAngularAxisRadians,
  getRadialAxisPixels,
  radiansToDegrees,
} from '../polar';

describe('degreesToRadians', () => {
  it('should convert 0 degrees to 0 radians', () => {
    expect(degreesToRadians(0)).toBe(0);
  });

  it('should convert 90 degrees to π/2 radians', () => {
    expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
  });

  it('should convert 180 degrees to π radians', () => {
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
  });

  it('should convert 360 degrees to 2π radians', () => {
    expect(degreesToRadians(360)).toBeCloseTo(2 * Math.PI);
  });

  it('should handle negative degrees', () => {
    expect(degreesToRadians(-90)).toBeCloseTo(-Math.PI / 2);
  });
});

describe('radiansToDegrees', () => {
  it('should convert 0 radians to 0 degrees', () => {
    expect(radiansToDegrees(0)).toBe(0);
  });

  it('should convert π/2 radians to 90 degrees', () => {
    expect(radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
  });

  it('should convert π radians to 180 degrees', () => {
    expect(radiansToDegrees(Math.PI)).toBeCloseTo(180);
  });

  it('should convert 2π radians to 360 degrees', () => {
    expect(radiansToDegrees(2 * Math.PI)).toBeCloseTo(360);
  });

  it('should handle negative radians', () => {
    expect(radiansToDegrees(-Math.PI / 2)).toBeCloseTo(-90);
  });
});

describe('getAngularAxisRadians', () => {
  it('should return full circle defaults when no config provided', () => {
    const result = getAngularAxisRadians();

    expect(result.startAngle).toBe(0);
    expect(result.endAngle).toBeCloseTo(2 * Math.PI);
    expect(result.paddingAngle).toBe(0);
  });

  it('should use custom range values', () => {
    const result = getAngularAxisRadians({
      range: { min: Math.PI / 4, max: Math.PI },
    });

    expect(result.startAngle).toBeCloseTo(Math.PI / 4);
    expect(result.endAngle).toBeCloseTo(Math.PI);
  });

  it('should convert paddingAngle from degrees to radians', () => {
    const result = getAngularAxisRadians({
      paddingAngle: 5, // 5 degrees
    });

    expect(result.paddingAngle).toBeCloseTo(degreesToRadians(5));
  });

  it('should handle partial range config', () => {
    const result = getAngularAxisRadians({
      range: { min: Math.PI, max: 2 * Math.PI },
    });

    expect(result.startAngle).toBeCloseTo(Math.PI);
    expect(result.endAngle).toBeCloseTo(2 * Math.PI);
  });
});

describe('getRadialAxisPixels', () => {
  it('should return full radius when no config provided', () => {
    const result = getRadialAxisPixels(100);

    expect(result.innerRadius).toBe(0);
    expect(result.outerRadius).toBe(100);
  });

  it('should calculate radii as percentage of maxRadius', () => {
    const result = getRadialAxisPixels(100, {
      range: { min: 0.3, max: 0.8 },
    });

    expect(result.innerRadius).toBe(30);
    expect(result.outerRadius).toBe(80);
  });

  it('should handle donut configuration', () => {
    const result = getRadialAxisPixels(200, {
      range: { min: 0.5, max: 1 },
    });

    expect(result.innerRadius).toBe(100);
    expect(result.outerRadius).toBe(200);
  });

  it('should handle zero maxRadius', () => {
    const result = getRadialAxisPixels(0, {
      range: { min: 0.5, max: 1 },
    });

    expect(result.innerRadius).toBe(0);
    expect(result.outerRadius).toBe(0);
  });
});

describe('calculateArcData', () => {
  it('should return empty array for empty values', () => {
    const result = calculateArcData([], 0, 100, 0, 2 * Math.PI, 0);
    expect(result).toEqual([]);
  });

  it('should calculate single slice as full circle', () => {
    // Input: degrees (0 to 360), Output: radians
    const result = calculateArcData([100], 0, 100, 0, 360, 0);

    expect(result).toHaveLength(1);
    expect(result[0].startAngle).toBe(0);
    expect(result[0].endAngle).toBeCloseTo(2 * Math.PI);
    expect(result[0].innerRadius).toBe(0);
    expect(result[0].outerRadius).toBe(100);
    expect(result[0].index).toBe(0);
    expect(result[0].value).toBe(100);
  });

  it('should divide circle equally for equal values', () => {
    // Input: degrees (0 to 360), Output: radians
    const result = calculateArcData([25, 25, 25, 25], 0, 100, 0, 360, 0);

    expect(result).toHaveLength(4);

    // Each slice should be approximately π/2 radians (90 degrees)
    result.forEach((arc, index) => {
      const expectedStart = (index * Math.PI) / 2;
      const expectedEnd = ((index + 1) * Math.PI) / 2;
      expect(arc.startAngle).toBeCloseTo(expectedStart, 1);
      expect(arc.endAngle).toBeCloseTo(expectedEnd, 1);
      expect(arc.index).toBe(index);
    });
  });

  it('should handle unequal values proportionally', () => {
    // 30% + 50% + 20% = 100%
    // Input: degrees (0 to 360), Output: radians
    const result = calculateArcData([30, 50, 20], 0, 100, 0, 360, 0);

    expect(result).toHaveLength(3);

    // First slice: 30% of 2π
    expect(result[0].startAngle).toBe(0);
    expect(result[0].endAngle).toBeCloseTo(0.3 * 2 * Math.PI);

    // Second slice: 50% of 2π
    expect(result[1].startAngle).toBeCloseTo(0.3 * 2 * Math.PI);
    expect(result[1].endAngle).toBeCloseTo(0.8 * 2 * Math.PI);

    // Third slice: 20% of 2π
    expect(result[2].startAngle).toBeCloseTo(0.8 * 2 * Math.PI);
    expect(result[2].endAngle).toBeCloseTo(2 * Math.PI);
  });

  it('should account for padding angle', () => {
    // Padding angle in degrees, converted internally to radians
    const paddingAngleDegrees = 5;
    const paddingAngleRadians = (paddingAngleDegrees * Math.PI) / 180;
    const result = calculateArcData([50, 50], 0, 100, 0, 360, paddingAngleDegrees);

    expect(result).toHaveLength(2);
    // Output paddingAngle is in radians
    expect(result[0].paddingAngle).toBeCloseTo(paddingAngleRadians);
    expect(result[1].paddingAngle).toBeCloseTo(paddingAngleRadians);

    // D3's pie generator stores the padAngle in the result
    // The arc path rendering uses this to create visual gaps between slices
    expect(result[0].endAngle).toBeCloseTo(Math.PI);
    expect(result[1].startAngle).toBeCloseTo(Math.PI);
  });

  it('should respect custom start and end angles (semicircle)', () => {
    // Input: degrees (-90 to 90), Output: radians
    const result = calculateArcData([50, 50], 0, 100, -90, 90, 0);

    expect(result).toHaveLength(2);

    // First slice should start at -π/2 and end near 0
    expect(result[0].startAngle).toBeCloseTo(-Math.PI / 2);
    expect(result[0].endAngle).toBeCloseTo(0);

    // Second slice should start near 0 and end at π/2
    expect(result[1].startAngle).toBeCloseTo(0);
    expect(result[1].endAngle).toBeCloseTo(Math.PI / 2);
  });

  it('should preserve inner and outer radius', () => {
    const result = calculateArcData([100], 50, 150, 0, 360, 0);

    expect(result[0].innerRadius).toBe(50);
    expect(result[0].outerRadius).toBe(150);
  });

  it('should preserve value in output', () => {
    const result = calculateArcData([30, 70], 0, 100, 0, 360, 0);

    expect(result[0].value).toBe(30);
    expect(result[1].value).toBe(70);
  });

  it('should handle negative values by using absolute value', () => {
    const result = calculateArcData([-30, 70], 0, 100, 0, 360, 0);

    expect(result).toHaveLength(2);
    // D3's pie uses Math.abs for the angle calculation
    // First slice: 30% of total (30 + 70 = 100)
    expect(result[0].endAngle - result[0].startAngle).toBeCloseTo(0.3 * 2 * Math.PI);
  });
});

describe('calculateArcData + getArcPath integration', () => {
  it('should generate valid SVG paths for calculated arcs', () => {
    // Input: degrees (0 to 360)
    const arcs = calculateArcData([30, 40, 30], 0, 100, 0, 360, 0);

    arcs.forEach((arc) => {
      const path = getArcPath({
        startAngle: arc.startAngle,
        endAngle: arc.endAngle,
        innerRadius: arc.innerRadius,
        outerRadius: arc.outerRadius,
        paddingAngle: arc.paddingAngle,
      });

      expect(path).toBeTruthy();
      expect(path.startsWith('M')).toBe(true);
      expect(path).toContain('A'); // Should contain arc commands
    });
  });

  it('should generate donut arc paths with inner radius', () => {
    // Input: degrees (0 to 360)
    const arcs = calculateArcData([50, 50], 50, 100, 0, 360, 0);

    arcs.forEach((arc) => {
      const path = getArcPath({
        startAngle: arc.startAngle,
        endAngle: arc.endAngle,
        innerRadius: arc.innerRadius,
        outerRadius: arc.outerRadius,
      });

      expect(path).toBeTruthy();
      expect(path.startsWith('M')).toBe(true);
    });
  });

  it('should generate semicircle arc paths', () => {
    // Input: degrees (-90 to 90)
    const arcs = calculateArcData(
      [25, 50, 25],
      0,
      100,
      -90, // -90 degrees
      90, // 90 degrees
      0,
    );

    expect(arcs).toHaveLength(3);

    arcs.forEach((arc) => {
      const path = getArcPath({
        startAngle: arc.startAngle,
        endAngle: arc.endAngle,
        innerRadius: arc.innerRadius,
        outerRadius: arc.outerRadius,
      });

      expect(path).toBeTruthy();
      expect(path.startsWith('M')).toBe(true);
    });
  });

  it('should generate padded arc paths', () => {
    const paddingAngle = degreesToRadians(3); // 3 degrees
    const arcs = calculateArcData([33, 33, 34], 0, 100, 0, 2 * Math.PI, paddingAngle);

    const paths = arcs.map((arc) =>
      getArcPath({
        startAngle: arc.startAngle,
        endAngle: arc.endAngle,
        innerRadius: arc.innerRadius,
        outerRadius: arc.outerRadius,
        paddingAngle: arc.paddingAngle,
      }),
    );

    // All paths should be valid
    paths.forEach((path) => {
      expect(path).toBeTruthy();
      expect(path.startsWith('M')).toBe(true);
    });
  });

  it('should generate corner-radiused arc paths', () => {
    const arcs = calculateArcData([50, 50], 50, 100, 0, 2 * Math.PI, 0);

    arcs.forEach((arc) => {
      const pathWithCorners = getArcPath({
        startAngle: arc.startAngle,
        endAngle: arc.endAngle,
        innerRadius: arc.innerRadius,
        outerRadius: arc.outerRadius,
        cornerRadius: 8,
      });

      const pathWithoutCorners = getArcPath({
        startAngle: arc.startAngle,
        endAngle: arc.endAngle,
        innerRadius: arc.innerRadius,
        outerRadius: arc.outerRadius,
        cornerRadius: 0,
      });

      expect(pathWithCorners).toBeTruthy();
      expect(pathWithoutCorners).toBeTruthy();
      // Corner radius should produce different paths
      expect(pathWithCorners).not.toBe(pathWithoutCorners);
    });
  });
});
