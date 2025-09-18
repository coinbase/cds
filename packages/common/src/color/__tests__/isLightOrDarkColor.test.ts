import { isLightOrDarkColor } from '../isLightOrDarkColor';

describe('isLightOrDarkColor', () => {
  it('returns dark if color is black', () => {
    expect(isLightOrDarkColor('black')).toBe('dark');
    expect(isLightOrDarkColor('#000000')).toBe('dark');
    expect(isLightOrDarkColor('rgb(0,0,0)')).toBe('dark');
    expect(isLightOrDarkColor('rgba(0,0,0,1)')).toBe('dark');
  });

  it('returns light if color is gray', () => {
    expect(isLightOrDarkColor('#d8d8d8')).toBe('light');
    expect(isLightOrDarkColor('rgb(216,216,216)')).toBe('light');
    expect(isLightOrDarkColor('rgba(216,216,216,1)')).toBe('light');
  });

  it('returns light if color is white', () => {
    expect(isLightOrDarkColor('white')).toBe('light');
    expect(isLightOrDarkColor('#ffffff')).toBe('light');
    expect(isLightOrDarkColor('rgb(255,255,255)')).toBe('light');
    expect(isLightOrDarkColor('rgba(255,255,255,1)')).toBe('light');
  });

  it('returns dark if color is transparent', () => {
    expect(isLightOrDarkColor('transparent')).toBe('dark');
    expect(isLightOrDarkColor('rgba(0,0,0,0)')).toBe('dark');
    expect(isLightOrDarkColor('rgba(216,216,216,0)')).toBe('dark');
    expect(isLightOrDarkColor('rgba(255,255,255,0)')).toBe('dark');
  });

  it('returns light if color is invalid', () => {
    expect(isLightOrDarkColor('')).toBe('light');
    expect(isLightOrDarkColor('rgba()')).toBe('light');
    expect(isLightOrDarkColor('#')).toBe('light');
  });
});
