const isTypeAlias = require('../isTypeAlias');

describe('isTypeAlias', () => {
  function prop(raw: string, value: unknown[]) {
    return { type: { raw, value } };
  }

  it('returns true for uppercase raw name with 2+ values', () => {
    expect(isTypeAlias(prop('SpacingScale', [{ value: '0' }, { value: '1' }]))).toBe(true);
  });

  it('returns true for uppercase raw name with many values', () => {
    expect(
      isTypeAlias(prop('IconName', [{ value: 'add' }, { value: 'remove' }, { value: 'search' }])),
    ).toBe(true);
  });

  it('returns false when raw starts with lowercase', () => {
    expect(isTypeAlias(prop('spacingScale', [{ value: '0' }, { value: '1' }]))).toBe(false);
  });

  it('returns false when raw contains a pipe (union type literal)', () => {
    expect(isTypeAlias(prop('SpacingScale | number', [{ value: '0' }, { value: '1' }]))).toBe(
      false,
    );
  });

  it('returns false when value has fewer than 2 items', () => {
    expect(isTypeAlias(prop('SpacingScale', [{ value: '0' }]))).toBe(false);
  });

  it('returns false when value is empty', () => {
    expect(isTypeAlias(prop('SpacingScale', []))).toBe(false);
  });

  it('returns false when value is not an array', () => {
    expect(isTypeAlias({ type: { raw: 'SpacingScale', value: 'string' } })).toBe(false);
  });

  it('returns false for empty raw string', () => {
    expect(isTypeAlias(prop('', [{ value: '0' }, { value: '1' }]))).toBe(false);
  });

  it('returns false when raw is undefined', () => {
    expect(isTypeAlias({ type: { raw: undefined, value: [{ value: 'a' }, { value: 'b' }] } })).toBe(
      false,
    );
  });
});
