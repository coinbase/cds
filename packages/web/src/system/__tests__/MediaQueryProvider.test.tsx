import React, { useContext, useEffect, useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

// Mock the listener utilities
import * as MediaQueryListenerUtils from '../../utils/mediaQueryListener';
import {
  createMediaQueryStore,
  MediaQueryContext,
  MediaQueryProvider,
} from '../MediaQueryProvider';

jest.mock('../../utils/mediaQueryListener', () => ({
  addMediaQueryListener: jest.fn(),
  removeMediaQueryListener: jest.fn(),
}));

// Type for the mocked matchMedia
type MockMediaQueryList = Pick<
  MediaQueryList,
  'media' | 'addListener' | 'removeListener' | 'addEventListener' | 'removeEventListener'
> & {
  _matches: boolean;
  readonly matches: boolean;
  changelisteners: Set<() => void>;
  _setMatches: (newMatches: boolean) => void;
};

// Store mock instances to simulate changes
const mockMediaQueries: Record<string, MockMediaQueryList> = {};

// Helper to create or get a mock MediaQueryList instance
const getMockMediaQueryList = (query: string, initialMatches: boolean): MockMediaQueryList => {
  if (!mockMediaQueries[query]) {
    mockMediaQueries[query] = {
      _matches: initialMatches,
      get matches() {
        return this._matches;
      },
      media: query,
      changelisteners: new Set<() => void>(),
      _setMatches(newMatches: boolean) {
        if (this._matches !== newMatches) {
          this._matches = newMatches;
        }
      },
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
  }
  return mockMediaQueries[query];
};

// Helper to simulate a media query change event
const simulateChange = (query: string, newMatches: boolean) => {
  // Find the specific mock MediaQueryList instance for the given query
  const mql = mockMediaQueries[query];

  if (mql) {
    // Access the mock of the 'addMediaQueryListener' utility function
    const addListenerMock = MediaQueryListenerUtils.addMediaQueryListener as jest.Mock;

    // Search through calls to find the listener registered for this mql instance
    const relevantCall = addListenerMock.mock.calls.find((call) => call[0] === mql);
    const storeListener = relevantCall ? relevantCall[1] : null;

    if (storeListener) {
      // Update the internal state first
      mql._setMatches(newMatches);
      // Invoke the found listener, wrapped in act()
      act(() => {
        storeListener();
      });
    } else {
      // Fallback/Warning if listener wasn't found via the mock
      console.warn(
        `[TEST WARN] Could not find store listener for query: ${query} during simulateChange`,
      );
      // Still update the internal state even if listener wasn't found
      mql._setMatches(newMatches);
    }
  } else {
    // Warning if MQL instance itself wasn't found
    console.warn(`[TEST WARN] Could not find mock MQL for query: ${query} during simulateChange`);
  }
};

// Global mock for window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn((query) => getMockMediaQueryList(query, false)), // Default to false
});

describe('MediaQueryProvider', () => {
  // Helper component to consume context
  const ContextReader: React.FC = () => {
    const context = useContext(MediaQueryContext);
    return <div>Context Provided: {context ? 'Yes' : 'No'}</div>;
  };

  // Reset modules before each test in this block to isolate the singleton store
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    for (const key in mockMediaQueries) {
      delete mockMediaQueries[key];
    }
  });

  it('should render children', () => {
    render(
      <MediaQueryProvider>
        <div>Child Content</div>
      </MediaQueryProvider>,
    );
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('should provide MediaQueryContext with store functions', () => {
    render(
      <MediaQueryProvider>
        <ContextReader />
      </MediaQueryProvider>,
    );
    expect(screen.getByText('Context Provided: Yes')).toBeInTheDocument();
  });
});

// --- Store Client-Side Logic Tests ---
describe('createMediaQueryStore client-side logic', () => {
  // Hook to test store interactions via Context
  const useStoreTester = (query: string) => {
    const store = useContext(MediaQueryContext);
    if (!store) {
      throw new Error('useStoreTester must be used within a MediaQueryProvider');
    }

    const [matches, setMatches] = useState(() => store.getSnapshot(query));

    useEffect(() => {
      const callback = () => {
        act(() => {
          setMatches(store.getSnapshot(query));
        });
      };
      const unsubscribe = store.subscribe(query, callback);
      callback();
      return unsubscribe;
    }, [store, query]); // Ensure store dependency is included

    return matches;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    for (const key in mockMediaQueries) {
      delete mockMediaQueries[key];
    }
    // Reset window.matchMedia mock implementation before each client test
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn((query) => getMockMediaQueryList(query, false)),
    });
  });

  it('subscribe should call matchMedia and addMediaQueryListener', () => {
    const query = '(min-width: 500px)';
    renderHook(() => useStoreTester(query), { wrapper: MediaQueryProvider });

    expect(window.matchMedia).toHaveBeenCalledWith(query);
    expect(MediaQueryListenerUtils.addMediaQueryListener).toHaveBeenCalledTimes(1);
    const mqlInstance = (window.matchMedia as jest.Mock).mock.results[0].value;
    expect(MediaQueryListenerUtils.addMediaQueryListener).toHaveBeenCalledWith(
      mqlInstance,
      expect.any(Function),
    );
  });

  it('getSnapshot should return current match state', () => {
    const query = '(max-width: 600px)';
    getMockMediaQueryList(query, true);
    const { result } = renderHook(() => useStoreTester(query), { wrapper: MediaQueryProvider });
    expect(result.current).toBe(true);
  });

  it('should update when media query state changes', () => {
    const query = '(prefers-color-scheme: dark)';
    getMockMediaQueryList(query, false);
    const { result } = renderHook(() => useStoreTester(query), { wrapper: MediaQueryProvider });

    expect(result.current).toBe(false);

    simulateChange(query, true);

    expect(result.current).toBe(true);
  });

  it('unsubscribe should call removeMediaQueryListener', () => {
    const query = '(min-height: 300px)';
    const { unmount } = renderHook(() => useStoreTester(query), { wrapper: MediaQueryProvider });

    const mqlInstance = (window.matchMedia as jest.Mock).mock.results[0].value;
    const addListenerMock = MediaQueryListenerUtils.addMediaQueryListener as jest.Mock;
    const relevantCall = addListenerMock.mock.calls.find((call) => call[0] === mqlInstance);
    const listener = relevantCall ? relevantCall[1] : undefined;

    expect(listener).toBeDefined();
    expect(MediaQueryListenerUtils.removeMediaQueryListener).not.toHaveBeenCalled();

    unmount();

    expect(MediaQueryListenerUtils.removeMediaQueryListener).toHaveBeenCalledTimes(1);
    expect(MediaQueryListenerUtils.removeMediaQueryListener).toHaveBeenCalledWith(
      mqlInstance,
      expect.any(Function),
    );
  });

  it('should handle multiple subscribers to the same query and cleanup correctly', () => {
    const query = '(hover: hover)';
    const hook1 = renderHook(() => useStoreTester(query), { wrapper: MediaQueryProvider });
    const hook2 = renderHook(() => useStoreTester(query), { wrapper: MediaQueryProvider });

    expect(window.matchMedia).toHaveBeenCalledTimes(1);
    expect(MediaQueryListenerUtils.addMediaQueryListener).toHaveBeenCalledTimes(1);
    const mqlInstance = (window.matchMedia as jest.Mock).mock.results[0].value;

    hook1.unmount();
    expect(MediaQueryListenerUtils.removeMediaQueryListener).not.toHaveBeenCalled();

    hook2.unmount();
    expect(MediaQueryListenerUtils.removeMediaQueryListener).toHaveBeenCalledTimes(1);
    expect(MediaQueryListenerUtils.removeMediaQueryListener).toHaveBeenCalledWith(
      mqlInstance,
      expect.any(Function),
    );
  });
});

// --- Direct getServerSnapshot Tests ---
// These tests verify the server-side snapshot logic (`getServerSnapshot`).
// This logic is used for initial rendering (SSR/hydration) and relies solely on
// the `defaultValues` passed during initialization, without involving
// browser APIs (matchMedia) or client-side listeners.
// We test this by creating a fresh store instance (`createMediaQueryStore()`) for each test
// and calling `store.getServerSnapshot()` directly. This is necessary because the actual
// `<MediaQueryProvider>` uses a singleton store that is initialized only *once*.
// Attempting to test different `defaultValues` by rendering the Provider multiple times
// across tests would fail, as subsequent renders wouldn't re-initialize the singleton store.
describe('getServerSnapshot logic', () => {
  it('returns correct snapshot based on defaultValues (width)', () => {
    const store = createMediaQueryStore();
    store.init({ defaultValues: { width: 1200 } });
    expect(store.getServerSnapshot('(min-width: 1024px)')).toBe(true);
    expect(store.getServerSnapshot('(max-width: 768px)')).toBe(false);
    expect(store.getServerSnapshot('(width: 1200px)')).toBe(true);
    // Test invalid pixel value - should throw an error
    expect(() => store.getServerSnapshot('(min-width: invalid-unit)')).toThrow(
      'getPixelValue failed to parse value: "invalid-unit',
    );
  });

  it('returns correct snapshot based on defaultValues (colorScheme dark)', () => {
    const store = createMediaQueryStore();
    store.init({ defaultValues: { colorScheme: 'dark' } });
    expect(store.getServerSnapshot('(prefers-color-scheme: dark)')).toBe(true);
    expect(store.getServerSnapshot('(prefers-color-scheme: light)')).toBe(false);
  });

  it('returns correct snapshot based on defaultValues (colorScheme light)', () => {
    const store = createMediaQueryStore();
    store.init({ defaultValues: { colorScheme: 'light' } });
    expect(store.getServerSnapshot('(prefers-color-scheme: dark)')).toBe(false);
    expect(store.getServerSnapshot('(prefers-color-scheme: light)')).toBe(true);
  });

  it('returns correct snapshot based on defaultValues (contrast)', () => {
    const store = createMediaQueryStore();
    store.init({ defaultValues: { contrast: 'more' } });
    expect(store.getServerSnapshot('(prefers-contrast: more)')).toBe(true);
    expect(store.getServerSnapshot('(prefers-contrast: less)')).toBe(false);
  });

  it('returns correct snapshot based on defaultValues (height)', () => {
    const store = createMediaQueryStore();
    store.init({ defaultValues: { height: 800 } });

    // Exact height
    expect(store.getServerSnapshot('(height: 800px)')).toBe(true);
    expect(store.getServerSnapshot('(height: 799px)')).toBe(false);

    // Min height
    expect(store.getServerSnapshot('(min-height: 700px)')).toBe(true);
    expect(store.getServerSnapshot('(min-height: 801px)')).toBe(false);

    // Max height
    expect(store.getServerSnapshot('(max-height: 900px)')).toBe(true);
    expect(store.getServerSnapshot('(max-height: 799px)')).toBe(false);

    // Check case where defaultValues.height is undefined
    const store2 = createMediaQueryStore();
    store2.init({ defaultValues: { width: 1000 } }); // No height default
    expect(store2.getServerSnapshot('(height: 800px)')).toBe(false);
    expect(store2.getServerSnapshot('(min-height: 700px)')).toBe(false);
    expect(store2.getServerSnapshot('(max-height: 900px)')).toBe(false);
  });

  it('returns default snapshot when defaultValues are not provided (uses browser defaults)', () => {
    const store = createMediaQueryStore();
    store.init({});
    expect(store.getServerSnapshot('(prefers-color-scheme: light)')).toBe(true);
    expect(store.getServerSnapshot('(prefers-color-scheme: dark)')).toBe(false);
    expect(store.getServerSnapshot('(prefers-contrast: no-preference)')).toBe(true);
    expect(store.getServerSnapshot('(prefers-contrast: more)')).toBe(false);
    expect(store.getServerSnapshot('(min-width: 1024px)')).toBe(false);
  });

  it('handles complex queries with "and" correctly', () => {
    const store = createMediaQueryStore();
    store.init({ defaultValues: { width: 1200, colorScheme: 'dark' } });
    expect(store.getServerSnapshot('(min-width: 1024px) and (prefers-color-scheme: dark)')).toBe(
      true,
    );
    expect(store.getServerSnapshot('(min-width: 1024px) and (prefers-color-scheme: light)')).toBe(
      false,
    );
  });
});
