import React from 'react';
import type { ReactNode } from 'react';
import { isDevelopment } from '@coinbase/cds-utils';
import { renderHook } from '@testing-library/react';

import { MediaQueryProvider } from '../../system/MediaQueryProvider';
import { useMediaQuery } from '../useMediaQuery';

// Mock isDevelopment
jest.mock('@coinbase/cds-utils', () => ({
  isDevelopment: jest.fn(),
}));
describe('useMediaQuery', () => {
  const mockMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  };

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    (isDevelopment as jest.Mock).mockReset();
    mockMatchMedia(false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('throws error when used outside MediaQueryProvider', () => {
    expect(() => renderHook(() => useMediaQuery('(min-width: 768px)'))).toThrow(
      'useMediaQuery must be used within a MediaQueryProvider',
    );
  });
  it('warns about complex queries in development', () => {
    mockMatchMedia(true);
    const warn = jest.spyOn(console, 'warn');
    (isDevelopment as jest.Mock).mockReturnValue(true);

    renderHook(() => useMediaQuery('(width<=768px)'), { wrapper: MediaQueryProvider });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('useMediaQuery received a complex query'),
    );
  });

  it('does not warn about complex queries in production', () => {
    mockMatchMedia(true);
    const warn = jest.spyOn(console, 'warn');
    (isDevelopment as jest.Mock).mockReturnValue(false);

    renderHook(() => useMediaQuery('(width<=768px)'), { wrapper: MediaQueryProvider });

    expect(warn).not.toHaveBeenCalled();
  });
  it('updates match state when query prop changes', () => {
    mockMatchMedia(true);
    const initialQuery = '(min-width: 768px)';
    const updatedQuery = '(max-width: 500px)';

    const { result, rerender } = renderHook(({ query }) => useMediaQuery(query), {
      wrapper: ({ children }) => <MediaQueryProvider>{children}</MediaQueryProvider>,
      initialProps: { query: initialQuery },
    });

    expect(result.current).toBe(true);

    mockMatchMedia(false);

    rerender({ query: updatedQuery });

    expect(result.current).toBe(false);
  });
});
