import { minMax } from '../chart';

describe('minMax tests', () => {
  it('handles empty list', () => {
    expect(minMax([], (d) => d)).toEqual([undefined, undefined]);
  });

  it('handles duplicates', () => {
    expect(minMax([2, 1, 1, 3, 4, 4, 4, 5], (d) => d)).toEqual([1, 5]);
  });

  it('handles negative numbers', () => {
    expect(minMax([-1, -2, -3, 5, 0], (d) => d)).toEqual([-3, 5]);
  });

  it('handles function extract', () => {
    const data = [{ value: 3 }, { value: 100 }, { value: 1 }];
    expect(minMax<{ value: number }>(data, (d) => d.value)).toEqual([{ value: 1 }, { value: 100 }]);
  });
});
