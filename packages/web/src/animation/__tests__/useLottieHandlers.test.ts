import { renderHook } from '@testing-library/react-hooks';

import { useLottieHandlers } from '../useLottieHandlers';

describe('useLottieHandlers.test', () => {
  it('returns handlers', () => {
    const mockHandlers = {
      error: jest.fn(),
      enterFrame: jest.fn(),
    };

    const { result } = renderHook(() => useLottieHandlers(mockHandlers));

    expect(result.current).toStrictEqual([
      { name: 'error', handler: mockHandlers.error },
      { name: 'enterFrame', handler: mockHandlers.enterFrame },
    ]);
  });

  it('returns empty array', () => {
    const { result } = renderHook(() => useLottieHandlers());

    expect(result.current).toStrictEqual([]);
  });
});
