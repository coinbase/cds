import React from 'react';
import { renderHook } from '@testing-library/react';

import { media } from '../../styles/media';
import { MediaQueryContext } from '../../system/MediaQueryProvider';
import { useResolveResponsiveProp } from '../useResolveResponsiveProp';

const createMediaContext = (width: number) => ({
  subscribe: () => () => {},
  getServerSnapshot: (query: string) => {
    if (query === media.phone) return width <= 767;
    if (query === media.tablet) return width >= 768 && width <= 1279;
    if (query === media.desktop) return width >= 1280;
    return false;
  },
  getSnapshot: (query: string) => {
    if (query === media.phone) return width <= 767;
    if (query === media.tablet) return width >= 768 && width <= 1279;
    if (query === media.desktop) return width >= 1280;
    return false;
  },
});

const responsiveValue = {
  base: 'base',
  phone: 'phone',
  tablet: 'tablet',
  desktop: 'desktop',
} as const;

const wrapper = (width: number) =>
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MediaQueryContext.Provider value={createMediaContext(width)}>
        {children}
      </MediaQueryContext.Provider>
    );
  };

describe('useResolveResponsiveProp', () => {
  it('returns scalar value unchanged', () => {
    const { result } = renderHook(() => useResolveResponsiveProp('scalar'), {
      wrapper: wrapper(500),
    });
    expect(result.current).toBe('scalar');
  });

  it('returns undefined for undefined input', () => {
    const { result } = renderHook(() => useResolveResponsiveProp(undefined), {
      wrapper: wrapper(500),
    });
    expect(result.current).toBeUndefined();
  });

  it.each([
    ['phone', 500, 'phone'],
    ['tablet', 900, 'tablet'],
    ['desktop', 1400, 'desktop'],
  ])('resolves responsive object for %s viewport', (_, width, expected) => {
    const { result } = renderHook(() => useResolveResponsiveProp(responsiveValue), {
      wrapper: wrapper(width),
    });
    expect(result.current).toBe(expected);
  });

  it('falls back to base when outside MediaQueryProvider', () => {
    const { result } = renderHook(() => useResolveResponsiveProp(responsiveValue));
    expect(result.current).toBe('base');
  });
});
