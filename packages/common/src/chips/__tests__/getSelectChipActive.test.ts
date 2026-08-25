import { getSelectChipActive, getSelectChipHasValue } from '../getSelectChipActive';

describe('getSelectChipHasValue', () => {
  it('returns false for null, undefined, and empty arrays', () => {
    expect(getSelectChipHasValue(null)).toBe(false);
    expect(getSelectChipHasValue(undefined)).toBe(false);
    expect(getSelectChipHasValue([])).toBe(false);
  });

  it('returns true for selected single and multi values', () => {
    expect(getSelectChipHasValue('option1')).toBe(true);
    expect(getSelectChipHasValue(['option1'])).toBe(true);
  });
});

describe('getSelectChipActive', () => {
  it('defaults to selection state when active is omitted and legacy invert props are unset', () => {
    expect(getSelectChipActive(undefined, null)).toBe(false);
    expect(getSelectChipActive(undefined, 'option1')).toBe(true);
  });

  it('respects explicit active overrides', () => {
    expect(getSelectChipActive(false, 'option1')).toBe(false);
    expect(getSelectChipActive(true, null)).toBe(true);
  });

  it('does not default active from selection when legacy invert props are set', () => {
    expect(getSelectChipActive(undefined, 'option1', false)).toBe(false);
    expect(getSelectChipActive(undefined, 'option1', true)).toBe(false);
    expect(getSelectChipActive(undefined, null, true)).toBe(false);
  });
});
