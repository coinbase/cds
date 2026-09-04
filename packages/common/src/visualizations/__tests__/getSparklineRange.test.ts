import { getSparklineRange } from '../getSparklineRange';

describe('getSparklineRange', () => {
  const mockParams = { width: 100, height: 200 };
  it('returns the correct xRange based on width', () => {
    expect(getSparklineRange(mockParams).xRange).toEqual([2, 98]);
  });

  it('returns the correct yRange based on height', () => {
    expect(getSparklineRange(mockParams).yRange).toEqual([198, 2]);
  });
});
