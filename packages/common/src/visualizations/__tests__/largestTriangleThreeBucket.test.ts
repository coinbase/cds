import { largestTriangleThreeBucket } from '../largestTriangleThreeBucket';

describe('largestTriangleThreeBucket', () => {
  it('enforces threshold', () => {
    expect(largestTriangleThreeBucket([0, 1, 2, 3], 2)).toHaveLength(2);
  });

  it('downsamples correctly', () => {
    expect(largestTriangleThreeBucket([0, 10, 5, 40], 3)).toEqual([0, 5, 40]);
  });
});
