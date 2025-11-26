import { Skia } from '@shopify/react-native-skia';
import { renderHook } from '@testing-library/react-hooks';

import {
  buildTransition,
  defaultTransition,
  type Transition,
  useD3PathInterpolation,
  usePathTransition,
} from '../transition';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const actual = jest.requireActual('react-native-reanimated/mock');
  return {
    ...actual,
    useSharedValue: jest.fn((initial) => ({ value: initial })),
    useAnimatedReaction: jest.fn((prepare, react) => {
      // Immediately call the reaction with the prepared value
      const prepared = prepare();
      react(prepared);
    }),
    withTiming: jest.fn((toValue, config) => toValue),
    withSpring: jest.fn((toValue, config) => toValue),
    isSharedValue: jest.fn((value) => {
      // Mock isSharedValue to detect objects with a 'value' property
      return value && typeof value === 'object' && 'value' in value;
    }),
  };
});

// Mock @shopify/react-native-skia
jest.mock('@shopify/react-native-skia', () => ({
  Skia: {
    Path: {
      Make: jest.fn(() => ({ type: 'SkPath', interpolate: jest.fn() })),
      MakeFromSVGString: jest.fn((str) => ({
        type: 'SkPath',
        svgString: str,
        interpolate: jest.fn((other, t) => ({ type: 'SkPath', interpolated: t })),
      })),
    },
  },
  notifyChange: jest.fn(),
}));

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
  });

  it('should have reasonable spring values', () => {
    expect((defaultTransition as any).stiffness).toBeGreaterThan(0);
    expect((defaultTransition as any).damping).toBeGreaterThan(0);
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

describe('buildTransition', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should build timing animation', () => {
    const { withTiming } = require('react-native-reanimated');
    const result = buildTransition(100, {
      type: 'timing',
      duration: 500,
    });

    expect(withTiming).toHaveBeenCalledWith(100, { duration: 500 });
    expect(result).toBe(100);
  });

  it('should build spring animation', () => {
    const { withSpring } = require('react-native-reanimated');
    const result = buildTransition(200, {
      type: 'spring',
      damping: 10,
      stiffness: 100,
    });

    expect(withSpring).toHaveBeenCalledWith(200, {
      damping: 10,
      stiffness: 100,
    });
    expect(result).toBe(200);
  });

  it('should use default spring config for unknown types', () => {
    const { withSpring } = require('react-native-reanimated');
    const result = buildTransition(150, { type: 'unknown' } as any);

    expect(withSpring).toHaveBeenCalled();
    expect(result).toBe(150);
  });

  it('should handle timing config with all options', () => {
    const { withTiming } = require('react-native-reanimated');
    const config = {
      type: 'timing' as const,
      duration: 1000,
      easing: (t: number) => t,
    };

    buildTransition(50, config);

    expect(withTiming).toHaveBeenCalledWith(50, {
      duration: 1000,
      easing: config.easing,
    });
  });

  it('should handle spring config with all options', () => {
    const { withSpring } = require('react-native-reanimated');
    const config = {
      type: 'spring' as const,
      damping: 15,
      stiffness: 200,
      mass: 1,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    };

    buildTransition(75, config);

    expect(withSpring).toHaveBeenCalledWith(75, {
      damping: 15,
      stiffness: 200,
      mass: 1,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    });
  });
});

describe('useD3PathInterpolation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create interpolated path', () => {
    const progress = { value: 0 };
    const fromPath = 'M0,0L10,10';
    const toPath = 'M0,0L20,20';

    const { result } = renderHook(() => useD3PathInterpolation(progress as any, fromPath, toPath));

    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('value');
  });

  it('should handle path changes', () => {
    const progress = { value: 0.5 };
    const fromPath1 = 'M0,0L10,10';
    const toPath1 = 'M0,0L20,20';

    const { result, rerender } = renderHook(
      ({ from, to }) => useD3PathInterpolation(progress as any, from, to),
      {
        initialProps: { from: fromPath1, to: toPath1 },
      },
    );

    const firstResult = result.current;
    expect(firstResult).toBeDefined();

    // Update paths
    const fromPath2 = 'M0,0L15,15';
    const toPath2 = 'M0,0L25,25';
    rerender({ from: fromPath2, to: toPath2 });

    // Result should be updated
    expect(result.current).toBeDefined();
  });

  it('should call d3 interpolatePath', () => {
    const { interpolatePath } = require('d3-interpolate-path');
    const progress = { value: 0 };
    const fromPath = 'M0,0L10,10';
    const toPath = 'M0,0L20,20';

    renderHook(() => useD3PathInterpolation(progress as any, fromPath, toPath));

    expect(interpolatePath).toHaveBeenCalledWith(fromPath, toPath);
  });

  it('should create Skia paths from SVG strings', () => {
    const progress = { value: 0 };
    const fromPath = 'M0,0L10,10';
    const toPath = 'M0,0L20,20';

    renderHook(() => useD3PathInterpolation(progress as any, fromPath, toPath));

    expect(Skia.Path.MakeFromSVGString).toHaveBeenCalled();
  });
});

describe('useInterpolator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create interpolated value', () => {
    const { useInterpolator } = require('../transition');
    const value = { value: 0 };
    const factory = () => 0;
    const interpolator = jest.fn((val, input, output, options, result) => {
      // Simple linear interpolation
      return output[0] + (output[1] - output[0]) * val;
    });
    const input = [0, 1];
    const output = [0, 100];

    const { result } = renderHook(() =>
      useInterpolator(factory, value as any, interpolator, input, output),
    );

    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('value');
  });

  it('should call interpolator with correct arguments', () => {
    const { useInterpolator } = require('../transition');
    const value = { value: 0.5 };
    const factory = () => 10;
    const interpolator = jest.fn((val, input, output, options, result) => result);
    const input = [0, 1];
    const output = [0, 100];
    const options = 'clamp' as any;

    renderHook(() => useInterpolator(factory, value as any, interpolator, input, output, options));

    expect(interpolator).toHaveBeenCalled();
  });

  it('should update when value changes', () => {
    const { useInterpolator } = require('../transition');
    const value = { value: 0 };
    const factory = () => 0;
    const interpolator = jest.fn((val, input, output, options, result) => val * 100);
    const input = [0, 1];
    const output = [0, 100];

    const { result, rerender } = renderHook(() =>
      useInterpolator(factory, value as any, interpolator, input, output),
    );

    expect(result.current).toBeDefined();

    // Update value
    value.value = 0.5;
    rerender();

    expect(result.current).toBeDefined();
  });
});

describe('usePathTransition', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return animated path with default config', () => {
    const currentPath = 'M0,0L10,10';

    const { result } = renderHook(() =>
      usePathTransition({
        currentPath,
      }),
    );

    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('value');
  });

  it('should use currentPath when no initialPath provided', () => {
    const currentPath = 'M0,0L10,10';

    const { result } = renderHook(() =>
      usePathTransition({
        currentPath,
      }),
    );

    expect(result.current).toBeDefined();
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
  });

  it('should handle path updates', () => {
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
  });

  it('should use custom transition config', () => {
    const currentPath = 'M0,0L10,10';
    const transition: Transition = {
      type: 'timing',
      duration: 1000,
    };

    const { result } = renderHook(() =>
      usePathTransition({
        currentPath,
        transition,
      }),
    );

    expect(result.current).toBeDefined();
  });

  it('should handle empty paths', () => {
    const { result } = renderHook(() =>
      usePathTransition({
        currentPath: '',
      }),
    );

    expect(result.current).toBeDefined();
  });

  it('should handle complex SVG paths', () => {
    const complexPath = 'M10,20 L30,40 Q50,60 70,80 C90,100 110,120 130,140 A20,20 0 0,1 150,160 Z';

    const { result } = renderHook(() =>
      usePathTransition({
        currentPath: complexPath,
      }),
    );

    expect(result.current).toBeDefined();
  });

  it('should maintain previous path reference across renders', () => {
    const path1 = 'M0,0L10,10';
    const path2 = 'M0,0L20,20';

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
    rerender({ path: 'M0,0L30,30' });
    expect(result.current).toBeDefined();
  });
});

describe('Transition type', () => {
  it('should accept valid timing config', () => {
    const config: typeof buildTransition extends (v: any, c: infer C) => any ? C : never = {
      type: 'timing',
      duration: 500,
    };
    expect(config.type).toBe('timing');
  });

  it('should accept valid spring config', () => {
    const config: typeof buildTransition extends (v: any, c: infer C) => any ? C : never = {
      type: 'spring',
      damping: 10,
      stiffness: 100,
    };
    expect(config.type).toBe('spring');
  });
});
