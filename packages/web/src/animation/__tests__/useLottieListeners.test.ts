import { renderHook } from '@testing-library/react-hooks';

import type { LottieAnimationRef, LottieListener } from '../types';
import { useLottieListeners } from '../useLottieListeners';

const mockAnimationRef = {
  current: { addEventListener: jest.fn(), removeEventListener: jest.fn() },
};

const mockListeners = [
  { name: 'enterFrame', handler: jest.fn() },
  { name: 'error', handler: jest.fn() },
];

describe('useLottieListeners.test', () => {
  beforeEach(() => jest.clearAllMocks());

  it('triggers event listeners', () => {
    const { result, unmount } = renderHook(() =>
      useLottieListeners(
        mockAnimationRef as unknown as LottieAnimationRef,
        mockListeners as LottieListener[],
      ),
    );

    unmount();

    expect(result.current).toBeUndefined();
    expect(mockAnimationRef.current.addEventListener).toHaveBeenCalledTimes(2);
    expect(mockAnimationRef.current.removeEventListener).toHaveBeenCalledTimes(2);
  });

  it('does not trigger when listeners are not provided', () => {
    const { unmount } = renderHook(() =>
      useLottieListeners(mockAnimationRef as unknown as LottieAnimationRef, []),
    );

    unmount();

    expect(mockAnimationRef.current.addEventListener).toHaveBeenCalledTimes(0);
    expect(mockAnimationRef.current.removeEventListener).toHaveBeenCalledTimes(0);
  });
});
