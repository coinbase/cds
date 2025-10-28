import { useMemo } from 'react';
import {
  type ExtrapolationType,
  type SharedValue,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import { notifyChange, Skia, type SkPath } from '@shopify/react-native-skia';
import * as interpolate from 'd3-interpolate-path';

/**
 * Custom hook that uses d3-interpolate-path for more robust path interpolation.
 * This follows the Flubber pattern: we pre-compute intermediate paths on the JS thread,
 * then use Skia's native interpolation in the worklet.
 *
 * @param progress - Shared value between 0 and 1
 * @param fromPath - Starting path as SVG string
 * @param toPath - Ending path as SVG string
 * @returns Interpolated SkPath as a shared value
 */
export const useD3PathInterpolation = (
  progress: SharedValue<number>,
  fromPath: string,
  toPath: string,
): SharedValue<SkPath> => {
  // Pre-compute intermediate paths on JS thread using d3-interpolate-path
  const { fromSkiaPath, i0, i1, toSkiaPath } = useMemo(() => {
    const pathInterpolator = interpolate.interpolatePath(fromPath, toPath);
    const d = 1e-3;

    return {
      fromSkiaPath: Skia.Path.MakeFromSVGString(fromPath) ?? Skia.Path.Make(),
      i0: Skia.Path.MakeFromSVGString(pathInterpolator(d)) ?? Skia.Path.Make(),
      i1: Skia.Path.MakeFromSVGString(pathInterpolator(1 - d)) ?? Skia.Path.Make(),
      toSkiaPath: Skia.Path.MakeFromSVGString(toPath) ?? Skia.Path.Make(),
    };
  }, [fromPath, toPath]);

  const result = useSharedValue(fromSkiaPath);

  useAnimatedReaction(
    () => progress.value,
    (t) => {
      'worklet';
      const d = 1e-3;

      // Handle edge cases
      if (t < d) {
        result.value = fromSkiaPath;
      } else if (1 - t < d) {
        result.value = toSkiaPath;
      } else {
        // Use Skia's native interpolation between the pre-computed paths
        result.value = i1.interpolate(i0, t) ?? toSkiaPath;
      }

      notifyChange(result);
    },
    [fromSkiaPath, i0, i1, toSkiaPath],
  );

  return result;
};

/**
 * @worklet
 */
type Interpolator<T> = (
  value: number,
  input: number[],
  output: T[],
  options: ExtrapolationType,
  result: T,
) => T;

// Brought over from https://sourcegraph.com/github.com/Shopify/react-native-skia/-/blob/packages/skia/src/external/reanimated/interpolators.ts
export const useInterpolator = <T>(
  factory: () => T,
  value: SharedValue<number>,
  interpolator: Interpolator<T>,
  input: number[],
  output: T[],
  options?: ExtrapolationType,
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const init = useMemo(() => factory(), []);
  const result = useSharedValue(init);
  useAnimatedReaction(
    () => value.value,
    (val) => {
      result.value = interpolator(val, input, output, options, result.value);
      notifyChange(result);
    },
    [input, output, options],
  );
  return result;
};
