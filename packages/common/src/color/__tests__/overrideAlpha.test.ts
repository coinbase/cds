import { overrideAlpha } from '../overrideAlpha';

describe('overrideAlpha', () => {
  it('correctly replaces alpha for rgba color', () => {
    expect(overrideAlpha('rgba(255,255,255,1)', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
    expect(overrideAlpha('rgba(0,0,0,1)', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
  });

  it('correctly replaces alpha for hex color', () => {
    expect(overrideAlpha('#ffffff', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
    expect(overrideAlpha('#000000', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
  });

  it('correctly replaces alpha for rgb color', () => {
    expect(overrideAlpha('rgb(255,255,255)', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
    expect(overrideAlpha('rgb(0,0,0)', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
  });

  it('returns the value passed in if the color is invalid', () => {
    expect(overrideAlpha('', 0.5)).toBe('');
    expect(overrideAlpha('rgba()', 0.5)).toBe('rgba()');
  });
});
