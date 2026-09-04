import { getRectWidthVariant } from '../getRectWidthVariant';

describe('getRectWidthVariant', () => {
  it('returns undefined when initial variant value is undefined', () => {
    const value = getRectWidthVariant(undefined, 1);
    expect(value).toBeUndefined();
  });

  it('returns an incremented variant value', () => {
    const value = getRectWidthVariant(2, 3);
    expect(value).toBe(5);
  });
});
