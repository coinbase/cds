import { renderHook } from '@testing-library/react-hooks';

import { useFallbackShape } from '../useFallbackShape';

describe('useFallbackShape()', () => {
  it('does not randomize rectangle shape width when disableRandomRectWidth is true', () => {
    const { result, rerender } = renderHook(() => {
      return useFallbackShape('rectangle', 100, { disableRandomRectWidth: true });
    });

    expect(result.current).toEqual({ borderRadius: 0, width: 100 });
    rerender();
    expect(result.current).toEqual({ borderRadius: 0, width: 100 });
  });

  it('does not randomize rectangle shape width when baseWidth is not a number', () => {
    const { result, rerender } = renderHook(() => {
      return useFallbackShape('rectangle', '100px');
    });

    expect(result.current).toEqual({ borderRadius: 0, width: '100px' });
    rerender();
    expect(result.current).toEqual({ borderRadius: 0, width: '100px' });
  });

  it('randomizes rectangle shape width', () => {
    process.env.NODE_ENV = 'production';
    process.env.STORYBOOK_SKIP_ANIMATION = '';

    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);

    const { result } = renderHook(() => {
      return useFallbackShape('rectangle', 100);
    });

    expect(result.current).toEqual({ borderRadius: 0, width: 81 });

    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('varies rectangle shape width deterministically when rectWidthVariant prop is set', () => {
    const { result, rerender } = renderHook(() => {
      return useFallbackShape('rectangle', 100, { rectWidthVariant: 3 });
    });

    expect(result.current).toEqual({ borderRadius: 0, width: 115 });
    rerender();
    expect(result.current).toEqual({ borderRadius: 0, width: 115 });
  });

  it('varies rectangle shape width deterministically when rectWidthVariant prop is set and disableRandomRectWidth is true', () => {
    const { result, rerender } = renderHook(() => {
      return useFallbackShape('rectangle', 100, {
        rectWidthVariant: 3,
        disableRandomRectWidth: true,
      });
    });

    expect(result.current).toEqual({ borderRadius: 0, width: 115 });
    rerender();
    expect(result.current).toEqual({ borderRadius: 0, width: 115 });
  });

  it('returns circle shape', () => {
    const { result } = renderHook(() => {
      return useFallbackShape('circle', 100);
    });

    expect(result.current).toEqual({ borderRadius: 50, width: 100 });
  });

  it('returns squircle shape', () => {
    const { result } = renderHook(() => {
      return useFallbackShape('squircle', 100);
    });

    expect(result.current).toEqual({ borderRadius: 8, width: 100 });
  });
});
