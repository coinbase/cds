import { renderHook } from '@testing-library/react-hooks';

import { useSparklinePath } from '../useSparklinePath';
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

describe('useSparklinePath', () => {
  it('returns the correct path', () => {
    const { result, rerender } = renderHook((props: UseSparklinePathParams = mockData1) => {
      return useSparklinePath(props);
    });
    expect(result.current).toBe('M2,318L220,2');
    rerender(mockData2);
    expect(result.current).toBe('M2,2L220,318');
  });
});
