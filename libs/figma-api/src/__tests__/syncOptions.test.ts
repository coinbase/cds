import { FULL_COMPARE_FLAG, hasFullCompare } from '../syncOptions';

describe('hasFullCompare', () => {
  it('is on only when the flag is given', () => {
    expect(hasFullCompare([FULL_COMPARE_FLAG])).toBe(true);
    expect(hasFullCompare(['--dry-run'])).toBe(false);
    expect(hasFullCompare([])).toBe(false);
  });

  it('still accepts the old --sync-all flag and says it is deprecated', () => {
    const warn = jest.fn();
    expect(hasFullCompare(['--sync-all'], warn)).toBe(true);
    expect(warn).toHaveBeenCalledWith('--sync-all is deprecated; use --full-compare.');
  });

  it('does not warn for the new flag', () => {
    const warn = jest.fn();
    hasFullCompare([FULL_COMPARE_FLAG], warn);
    expect(warn).not.toHaveBeenCalled();
  });
});
