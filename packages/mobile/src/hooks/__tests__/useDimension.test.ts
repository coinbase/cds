import { renderHook } from '@testing-library/react-hooks';

import { useDimensions } from '../useDimensions';

describe('useDimensions.test', () => {
  it('returns screen dimensions', () => {
    const { result } = renderHook(() => useDimensions());

    expect(result.current.screenHeight).toBe(1334);
    expect(result.current.screenWidth).toBe(750);
    expect(result.current.statusBarHeight).toBe(20);
  });
});
