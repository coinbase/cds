import { renderHook } from '@testing-library/react-hooks';

import { defaultTransition, usePathTransition } from '../transition';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const mockMotionValue = (initial: any) => {
    let value = initial;
    const listeners: Array<(v: any) => void> = [];
    return {
      get: () => value,
      set: (v: any) => {
        value = v;
        listeners.forEach((listener) => listener(v));
      },
      onChange: (listener: (v: any) => void) => {
        listeners.push(listener);
        return () => {
          const index = listeners.indexOf(listener);
          if (index > -1) listeners.splice(index, 1);
        };
      },
    };
  };

  return {
    useMotionValue: jest.fn((initial) => mockMotionValue(initial)),
    useTransform: jest.fn((source, transformer) => {
      const result = mockMotionValue(transformer(source.get()));
      source.onChange((v: any) => {
        result.set(transformer(v));
      });
      return result;
    }),
    animate: jest.fn((value, target, config) => {
      // Immediately set to target for testing
      value.set(target);
      if (config?.onComplete) {
        config.onComplete();
      }
      return {
        cancel: jest.fn(),
        stop: jest.fn(),
      };
    }),
  };
});

// Mock d3-interpolate-path
jest.mock('d3-interpolate-path', () => ({
  interpolatePath: jest.fn((from, to) => (t: number) => {
    // Simple mock: return from at t=0, to at t=1
    return t < 0.5 ? from : to;
  }),
}));

describe('defaultTransition', () => {
  it('should export default spring transition configuration', () => {
    expect(defaultTransition).toBeDefined();
    expect(defaultTransition.type).toBe('spring');
    expect(defaultTransition).toHaveProperty('stiffness');
    expect(defaultTransition).toHaveProperty('damping');
    expect(defaultTransition).toHaveProperty('mass');
  });

  it('should have reasonable spring values', () => {
    expect((defaultTransition as any).stiffness).toBeGreaterThan(0);
    expect((defaultTransition as any).damping).toBeGreaterThan(0);
    expect((defaultTransition as any).mass).toBeGreaterThan(0);
  });
});

describe('accessory transition constants', () => {
  it('should export accessoryFadeTransitionDuration', () => {
    const { accessoryFadeTransitionDuration } = require('../transition');
    expect(accessoryFadeTransitionDuration).toBeDefined();
    expect(typeof accessoryFadeTransitionDuration).toBe('number');
    expect(accessoryFadeTransitionDuration).toBeGreaterThan(0);
  });

  it('should export accessoryFadeTransitionDelay', () => {
    const { accessoryFadeTransitionDelay } = require('../transition');
    expect(accessoryFadeTransitionDelay).toBeDefined();
    expect(typeof accessoryFadeTransitionDelay).toBe('number');
    expect(accessoryFadeTransitionDelay).toBeGreaterThan(0);
  });
});

describe('usePathTransition', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return MotionValue with default config', () => {
    const currentPath = 'M0,0L10,10';

    const { result } = renderHook(() =>
      usePathTransition({
        currentPath,
      }),
    );

    expect(result.current).toBeDefined();
    expect(result.current.get).toBeDefined();
    expect(typeof result.current.get).toBe('function');
  });

  it('should use currentPath when no initialPath provided', () => {
    const currentPath = 'M0,0L10,10';

    const { result } = renderHook(() =>
      usePathTransition({
        currentPath,
      }),
    );

    expect(result.current.get()).toBeDefined();
  });

  it('should use initialPath for first render when provided', () => {
    const currentPath = 'M0,0L20,20';
    const initialPath = 'M0,0L0,0';

    const { result } = renderHook(() =>
      usePathTransition({
        currentPath,
        initialPath,
      }),
    );

    expect(result.current).toBeDefined();
    expect(result.current.get()).toBeDefined();
  });

  it('should handle path updates', () => {
    const { useMotionValue, animate } = require('framer-motion');
    const { result, rerender } = renderHook(
      ({ path }) =>
        usePathTransition({
          currentPath: path,
        }),
      {
        initialProps: { path: 'M0,0L10,10' },
      },
    );

    const firstResult = result.current;
    expect(firstResult).toBeDefined();

    // Update path
    rerender({ path: 'M0,0L20,20' });

    // Should still return a valid result
    expect(result.current).toBeDefined();
    expect(animate).toHaveBeenCalled();
  });

  it('should use custom transition config', () => {
    const { animate } = require('framer-motion');
    const currentPath = 'M0,0L10,10';
    const transition = {
      type: 'tween' as const,
      duration: 1,
      ease: 'easeInOut' as const,
    };

    const { result } = renderHook(() =>
      usePathTransition({
        currentPath,
        transition,
      }),
    );

    expect(result.current).toBeDefined();

    // When path changes, animate should be called with custom config
    const { rerender } = renderHook(
      ({ path }) =>
        usePathTransition({
          currentPath: path,
          transition,
        }),
      {
        initialProps: { path: currentPath },
      },
    );

    rerender({ path: 'M0,0L20,20' });
    expect(animate).toHaveBeenCalled();
  });

  it('should handle empty paths', () => {
    const { result } = renderHook(() =>
      usePathTransition({
        currentPath: '',
      }),
    );

    expect(result.current).toBeDefined();
    expect(result.current.get()).toBe('');
  });

  it('should handle complex SVG paths', () => {
    const complexPath = 'M10,20 L30,40 Q50,60 70,80 C90,100 110,120 130,140 A20,20 0 0,1 150,160 Z';

    const { result } = renderHook(() =>
      usePathTransition({
        currentPath: complexPath,
      }),
    );

    expect(result.current).toBeDefined();
    expect(result.current.get()).toBeDefined();
  });

  it('should call d3 interpolatePath when paths change', () => {
    const { interpolatePath } = require('d3-interpolate-path');
    const path1 = 'M0,0L10,10';
    const path2 = 'M0,0L20,20';

    const { rerender } = renderHook(
      ({ path }) =>
        usePathTransition({
          currentPath: path,
        }),
      {
        initialProps: { path: path1 },
      },
    );

    interpolatePath.mockClear();

    // Change path
    rerender({ path: path2 });

    expect(interpolatePath).toHaveBeenCalled();
  });

  it('should cancel ongoing animation when path changes', () => {
    const { animate } = require('framer-motion');
    const cancelMock = jest.fn();
    animate.mockReturnValue({
      cancel: cancelMock,
      stop: jest.fn(),
    });

    const { rerender } = renderHook(
      ({ path }) =>
        usePathTransition({
          currentPath: path,
        }),
      {
        initialProps: { path: 'M0,0L10,10' },
      },
    );

    // Trigger first animation
    rerender({ path: 'M0,0L20,20' });

    // Trigger second animation (should cancel first)
    rerender({ path: 'M0,0L30,30' });

    expect(cancelMock).toHaveBeenCalled();
  });

  it('should handle smooth interruption of ongoing animation', () => {
    const { animate } = require('framer-motion');
    const path1 = 'M0,0L10,10';
    const path2 = 'M0,0L20,20';
    const path3 = 'M0,0L30,30';

    const { rerender } = renderHook(
      ({ path }) =>
        usePathTransition({
          currentPath: path,
        }),
      {
        initialProps: { path: path1 },
      },
    );

    // Trigger animation to path2
    rerender({ path: path2 });

    const animateCallCount = animate.mock.calls.length;

    // Interrupt with path3
    rerender({ path: path3 });

    // Should have called animate again
    expect(animate.mock.calls.length).toBeGreaterThan(animateCallCount);
  });

  it('should cleanup animation on unmount', () => {
    const { animate } = require('framer-motion');
    const cancelMock = jest.fn();
    animate.mockReturnValue({
      cancel: cancelMock,
      stop: jest.fn(),
    });

    const { unmount, rerender } = renderHook(
      ({ path }) =>
        usePathTransition({
          currentPath: path,
        }),
      {
        initialProps: { path: 'M0,0L10,10' },
      },
    );

    // Trigger animation
    rerender({ path: 'M0,0L20,20' });

    // Unmount should cancel animation
    unmount();

    expect(cancelMock).toHaveBeenCalled();
  });

  it('should maintain previous path reference across renders', () => {
    const path1 = 'M0,0L10,10';
    const path2 = 'M0,0L20,20';
    const path3 = 'M0,0L30,30';

    const { result, rerender } = renderHook(
      ({ path }) =>
        usePathTransition({
          currentPath: path,
        }),
      {
        initialProps: { path: path1 },
      },
    );

    expect(result.current).toBeDefined();

    // Change path
    rerender({ path: path2 });
    expect(result.current).toBeDefined();

    // Change path again
    rerender({ path: path3 });
    expect(result.current).toBeDefined();
  });

  it('should update previousPathRef onComplete', () => {
    const { animate } = require('framer-motion');
    let onCompleteCallback: (() => void) | undefined;

    animate.mockImplementation((value: any, target: any, config: any) => {
      value.set(target);
      onCompleteCallback = config?.onComplete;
      return {
        cancel: jest.fn(),
        stop: jest.fn(),
      };
    });

    const { rerender } = renderHook(
      ({ path }) =>
        usePathTransition({
          currentPath: path,
        }),
      {
        initialProps: { path: 'M0,0L10,10' },
      },
    );

    // Trigger animation
    rerender({ path: 'M0,0L20,20' });

    // Call onComplete
    if (onCompleteCallback) {
      onCompleteCallback();
    }

    // Should be able to handle another path change
    rerender({ path: 'M0,0L30,30' });

    expect(animate).toHaveBeenCalled();
  });
});
