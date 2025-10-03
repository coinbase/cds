import { getBarSizeAdjustment } from '../bar';

describe('getBarSizeAdjustment', () => {
  it('should return 0 when barCount is 0', () => {
    const result = getBarSizeAdjustment(0, 10);
    expect(result).toBe(0);
  });

  it('should return 0 when barCount is 1', () => {
    const result = getBarSizeAdjustment(1, 10);
    expect(result).toBe(0);
  });

  it('should calculate correct adjustment for 2 bars', () => {
    const result = getBarSizeAdjustment(2, 10);
    // (10 * (2 - 1)) / 2 = 10 / 2 = 5
    expect(result).toBe(5);
  });

  it('should calculate correct adjustment for 3 bars', () => {
    const result = getBarSizeAdjustment(3, 12);
    // (12 * (3 - 1)) / 3 = 24 / 3 = 8
    expect(result).toBe(8);
  });

  it('should calculate correct adjustment for 4 bars', () => {
    const result = getBarSizeAdjustment(4, 15);
    // (15 * (4 - 1)) / 4 = 45 / 4 = 11.25
    expect(result).toBe(11.25);
  });

  it('should handle zero gap size', () => {
    const result = getBarSizeAdjustment(3, 0);
    expect(result).toBe(0);
  });

  it('should handle negative gap size', () => {
    const result = getBarSizeAdjustment(3, -6);
    // (-6 * (3 - 1)) / 3 = -12 / 3 = -4
    expect(result).toBe(-4);
  });

  it('should handle fractional bar count', () => {
    const result = getBarSizeAdjustment(2.5, 10);
    // (10 * (2.5 - 1)) / 2.5 = 15 / 2.5 = 6
    expect(result).toBe(6);
  });

  it('should handle large numbers', () => {
    const result = getBarSizeAdjustment(100, 1000);
    // (1000 * (100 - 1)) / 100 = 99000 / 100 = 990
    expect(result).toBe(990);
  });
});
