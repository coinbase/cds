import { calculateTextBaseline, calculateTextX } from '../text';

describe('Skia Text Utilities', () => {
  describe('calculateTextBaseline', () => {
    it('should calculate baseline for top alignment', () => {
      const result = calculateTextBaseline(100, 12, 'top');
      expect(result).toBe(112); // 100 + 12
    });

    it('should calculate baseline for middle alignment', () => {
      const result = calculateTextBaseline(100, 12, 'middle');
      expect(result).toBeCloseTo(104.8, 1); // 100 + 12 / 2.5
    });

    it('should calculate baseline for bottom alignment', () => {
      const result = calculateTextBaseline(100, 12, 'bottom');
      expect(result).toBe(100);
    });

    it('should default to middle alignment', () => {
      const result = calculateTextBaseline(100, 12);
      expect(result).toBeCloseTo(104.8, 1);
    });
  });

  describe('calculateTextX', () => {
    it('should calculate X for start alignment', () => {
      const result = calculateTextX(100, 50, 'start');
      expect(result).toBe(100);
    });

    it('should calculate X for center alignment', () => {
      const result = calculateTextX(100, 50, 'center');
      expect(result).toBe(75); // 100 - 50/2
    });

    it('should calculate X for end alignment', () => {
      const result = calculateTextX(100, 50, 'end');
      expect(result).toBe(50); // 100 - 50
    });

    it('should default to start alignment', () => {
      const result = calculateTextX(100, 50);
      expect(result).toBe(100);
    });
  });
});
