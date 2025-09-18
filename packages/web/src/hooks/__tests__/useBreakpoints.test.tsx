import { act, renderHook } from '@testing-library/react-hooks';

import { media } from '../../styles/media';
import { MediaQueryContext } from '../../system/MediaQueryProvider';
import { useBreakpoints } from '../useBreakpoints';

const mockSubscribe = jest.fn();
const mockGetSnapshot = jest.fn();
const mockMatchMedia = jest.fn();
const mockGetServerSnapshot = jest.fn();

const mockMediaQueryContext = {
  subscribe: mockSubscribe,
  getSnapshot: mockGetSnapshot,
  getServerSnapshot: mockGetServerSnapshot,
};

describe('useBreakpoints hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.matchMedia = mockMatchMedia;
    mockSubscribe.mockReturnValue(jest.fn());
  });

  it('throws an error if used outside of MediaQueryProvider', () => {
    const { result } = renderHook(() => useBreakpoints());
    expect(() => result.current).toThrow('useBreakpoints must be used within a MediaQueryProvider');
  });

  it('returns initial matches based on getSnapshot', () => {
    mockGetSnapshot.mockImplementation((query) => query === media.phone);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MediaQueryContext.Provider value={mockMediaQueryContext}>
        {children}
      </MediaQueryContext.Provider>
    );
    const { result } = renderHook(() => useBreakpoints(), { wrapper });

    expect(result.current).toStrictEqual({
      isPhone: true,
      isPhonePortrait: false,
      isPhoneLandscape: false,
      isTablet: false,
      isTabletPortrait: false,
      isTabletLandscape: false,
      isDesktop: false,
      isDesktopSmall: false,
      isDesktopLarge: false,
      isExtraWide: false,
    });
  });

  it('subscribes to media queries on mount', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MediaQueryContext.Provider value={mockMediaQueryContext}>
        {children}
      </MediaQueryContext.Provider>
    );

    renderHook(() => useBreakpoints(), { wrapper });

    Object.values(media).forEach((query) => {
      expect(mockSubscribe).toHaveBeenCalledWith(query, expect.any(Function));
    });
  });

  it('updates matches when media query changes', () => {
    const mockSetMatches = jest.fn();
    mockSubscribe.mockImplementation((_, callback) => {
      mockSetMatches.mockImplementation(callback);
      return jest.fn();
    });

    mockGetSnapshot.mockImplementation((query) => query === media.phone);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MediaQueryContext.Provider value={mockMediaQueryContext}>
        {children}
      </MediaQueryContext.Provider>
    );

    const { result } = renderHook(() => useBreakpoints(), { wrapper });

    expect(result.current.isPhone).toBe(true);
    expect(result.current.isTablet).toBe(false);

    mockGetSnapshot.mockImplementation((query) => query === media.tablet);

    act(() => {
      if (typeof mockSetMatches === 'function') {
        mockSetMatches();
      } else {
        throw new Error('mockSetMatches was not assigned the update callback');
      }
    });

    expect(result.current).toEqual({
      isPhone: false,
      isPhonePortrait: false,
      isPhoneLandscape: false,
      isTablet: true,
      isTabletPortrait: false,
      isTabletLandscape: false,
      isDesktop: false,
      isDesktopSmall: false,
      isDesktopLarge: false,
      isExtraWide: false,
    });
  });
});
