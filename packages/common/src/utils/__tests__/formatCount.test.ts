import { formatCount } from '../formatCount';

describe('formatCount', () => {
  it('formats numbers less than 1000 correctly', () => {
    expect(formatCount(999)).toBe('999');
  });

  it('formats numbers in thousands correctly', () => {
    expect(formatCount(1000)).toBe('1K');
    expect(formatCount(1500)).toBe('1.5K');
  });

  it('formats numbers in millions correctly', () => {
    expect(formatCount(1000000)).toBe('1M');
    expect(formatCount(1500000)).toBe('1.5M');
  });

  it('formats numbers in billions correctly', () => {
    expect(formatCount(1000000000)).toBe('1B');
    expect(formatCount(1500000000)).toBe('1.5B');
  });

  it('formats numbers in trillions correctly', () => {
    expect(formatCount(1000000000000)).toBe('1T');
    expect(formatCount(1500000000000)).toBe('1.5T');
  });

  it('removes unnecessary decimal point', () => {
    expect(formatCount(2000)).toBe('2K');
    expect(formatCount(2000000)).toBe('2M');
  });

  it('handles zero correctly', () => {
    expect(formatCount(0)).toBe('0');
  });

  it('rounds numbers correctly', () => {
    expect(formatCount(1500.5)).toBe('1.5K');
    expect(formatCount(1501.45)).toBe('1.5K');
  });
});
