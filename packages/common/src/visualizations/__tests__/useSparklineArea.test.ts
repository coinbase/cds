import { renderHook } from '@testing-library/react-hooks';

import { useSparklineArea } from '../useSparklineArea';
import type { UseSparklinePathParams } from '../useSparklinePathGenerator';

const sharedProps = {
  width: 440,
  height: 320,
};

const mockData1: UseSparklinePathParams = {
  ...sharedProps,
  data: [100, 200],
};

const mockData2: UseSparklinePathParams = {
  ...sharedProps,
  data: [500, 400],
};

describe('useSparklineArea', () => {
  it('returns the correct path', () => {
    const { result, rerender } = renderHook((props: UseSparklinePathParams = mockData1) => {
      return useSparklineArea(props);
    });
    expect(result.current).toBe('M2,318L220,2L220,320L2,320Z');
    rerender(mockData2);
    expect(result.current).toBe('M2,2L220,318L220,320L2,320Z');
  });
});
