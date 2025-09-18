import { renderHook } from '@testing-library/react-hooks';

import { useIsBrowser } from '../useIsBrowser';

describe('useIsBrowser', () => {
  it('returns true if it is browser', () => {
    const { result } = renderHook(() => useIsBrowser());

    expect(result.current).toBe(true);
  });
});
