import { useMemo } from 'react';
import { colorToHex } from '@coinbase/cds-common/color/colorToHex';
import type { LottieSource } from '@coinbase/cds-common/types/LottieSource';

import { useTheme } from '../hooks/useTheme';

import type { LottieProps } from './types';

type AnyObject = Record<string, unknown>;
type StringKey<T> = T extends string ? T : string;

function mapKeys<
  T extends AnyObject,
  K extends (value: T[keyof T], key: keyof T, obj: T) => StringKey<unknown>,
>(obj: T, callbackFn: K) {
  return Object.keys(obj).reduce(
    (acc, key: keyof T) => {
      const newKey = callbackFn(obj[key], key, obj) as ReturnType<typeof callbackFn>;
      acc[newKey] = obj[key];
      return acc;
    },
    {} as { [key in ReturnType<K>]: T[keyof T] },
  );
}

/**
 * Override colors of Lottie layers.
 * Theme dependent layers should use PaletteAlias as layer name in After Effects i.e 'foreground' or 'primary'
 */
export function useLottieColorFilters(
  source: LottieSource,
  customColorFilters?: LottieProps['colorFilters'],
) {
  const theme = useTheme();
  // Layer names in AE will use palette_<PaletteAlias> format to avoid overriding layers not intended for overrides
  const paletteSnakeCased = useMemo(
    () => mapKeys(theme.color, (_, key) => `palette_${key}` as const),
    [theme.color],
  );

  const themeColorFilters = useMemo(() => {
    const filters: LottieProps['colorFilters'] = [];
    if (source?.layers) {
      for (const layer of source.layers) {
        if (layer.nm in paletteSnakeCased) {
          const keypath = layer.nm as keyof typeof paletteSnakeCased;
          filters.push({
            keypath,
            // Lottie cannot process rgba values so we convert to 8 digit hex
            color: colorToHex(paletteSnakeCased[keypath]),
          });
        }
      }
    }
    return filters;
  }, [paletteSnakeCased, source]);

  return useMemo(() => {
    if (customColorFilters) {
      return [...themeColorFilters, ...customColorFilters];
    }
    return themeColorFilters;
  }, [customColorFilters, themeColorFilters]);
}
