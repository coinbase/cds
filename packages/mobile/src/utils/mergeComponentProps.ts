import type { ViewStyle } from 'react-native';

/**
 * The result of merging two sets of props
 */
export type MergedProps<Target, Source> = Source & Target;

/**
 * Merges two sets of component props with optional special handling for style and styles.
 *
 * @param target - Base set of props (e.g., from theme config)
 * @param source - Overriding set of props (e.g., from local props)
 * @param mergeStyleProps - Controls merging behavior for style/styles
 *   - When `false` or `undefined`:
 *     - All props: Source simply overrides target (standard object spread)
 *   - When `true`:
 *     - `style`: Shallow merge (source overrides target)
 *     - `styles`: Object keys merged, each value shallow merged (source overrides target)
 *     - All other props: Source overrides target
 * @returns Merged props with special fields combined (if enabled) and others overridden
 *
 * @example With merging disabled (default):
 * ```tsx
 * const merged = mergeComponentProps(
 *   { style: { color: 'red' }, size: 'md' },
 *   { style: { color: 'blue' }, variant: 'primary' }
 * );
 * // Result: {
 * //   style: { color: 'blue' },  // Simple override
 * //   size: 'md',
 * //   variant: 'primary'
 * // }
 * ```
 *
 * @example With merging enabled:
 * ```tsx
 * const merged = mergeComponentProps(
 *   { style: { color: 'red', fontSize: 14 }, size: 'md' },
 *   { style: { color: 'blue', padding: 8 }, variant: 'primary' },
 *   true
 * );
 * // Result: {
 * //   style: { color: 'blue', fontSize: 14, padding: 8 },  // Shallow merged
 * //   size: 'md',
 * //   variant: 'primary'
 * // }
 * ```
 */
export function mergeComponentProps<
  Target extends Record<string, any>,
  Source extends Record<string, any>,
>(
  target: Target | undefined,
  source: Source | undefined,
  mergeStyleProps?: boolean,
): MergedProps<Target, Source> {
  if (!target) return source as MergedProps<Target, Source>;
  if (!source) return target as MergedProps<Target, Source>;

  // If mergeStyleProps is false, simple spread merge (source overrides target)
  if (!mergeStyleProps) {
    return {
      ...target,
      ...source,
    } as MergedProps<Target, Source>;
  }

  // Extract special fields that need custom merging
  const targetStyle = target.style as ViewStyle | undefined;
  const sourceStyle = source.style as ViewStyle | undefined;
  const targetStyles = target.styles as Record<string, ViewStyle> | undefined;
  const sourceStyles = source.styles as Record<string, ViewStyle> | undefined;

  // Merge style objects (shallow merge, source overrides)
  const mergedStyle = targetStyle || sourceStyle ? { ...targetStyle, ...sourceStyle } : undefined;

  // Merge styles objects - each key's styles merged (shallow)
  let mergedStyles: Record<string, ViewStyle> | undefined;
  if (targetStyles && sourceStyles) {
    const allStyleKeys = new Set([...Object.keys(targetStyles), ...Object.keys(sourceStyles)]);
    mergedStyles = {};
    allStyleKeys.forEach((key) => {
      const targetValue = targetStyles?.[key];
      const sourceValue = sourceStyles?.[key];
      if (targetValue || sourceValue) {
        mergedStyles![key] = { ...targetValue, ...sourceValue };
      }
    });
    if (Object.keys(mergedStyles).length === 0) {
      mergedStyles = undefined;
    }
  } else {
    mergedStyles = sourceStyles || targetStyles;
  }

  // Merge all other props (source overrides target)
  return {
    ...target,
    ...source,
    ...(mergedStyle && { style: mergedStyle }),
    ...(mergedStyles && { styles: mergedStyles }),
  } as MergedProps<Target, Source>;
}
