import type { CSSProperties } from 'react';

import { cx } from '../cx';

/**
 * The result of merging two sets of props
 */
export type MergedProps<Target, Source> = Source & Target;

/**
 * Merges two sets of component props with special handling for className, classNames, style, and styles.
 *
 * @param target - Base set of props (e.g., from parent ThemeProvider or theme config)
 * @param source - Overriding set of props (e.g., from child ThemeProvider or local props)
 * @param mergeClassNameAndStyle - Controls merging behavior
 *   - When `false` or `undefined`:
 *     - All props: Source simply overrides target (standard object spread)
 *   - When `true`:
 *     - `className`: Concatenated with cx() (deduplicates atomic styles)
 *     - `classNames`: Object keys merged, each value concatenated with cx()
 *     - `style`: Shallow merge (source overrides target)
 *     - `styles`: Object keys merged, each value shallow merged (source overrides target)
 *     - All other props: Source overrides target
 * @returns Merged props with special fields combined (if enabled) and others overridden
 *
 * @example With merging disabled (default):
 * ```tsx
 * const merged = mergeComponentProps(
 *   { className: 'base', size: 'md' },
 *   { className: 'themed', variant: 'primary' }
 * );
 * // Result: {
 * //   className: 'themed',  // Override only
 * //   size: 'md',
 * //   variant: 'primary'
 * // }
 * ```
 *
 * @example With merging enabled:
 * ```tsx
 * const merged = mergeComponentProps(
 *   { className: 'base', classNames: { root: 'base-root' }, size: 'md' },
 *   { className: 'themed', classNames: { root: 'themed-root' }, variant: 'primary' },
 *   true
 * );
 * // Result: {
 * //   className: 'base themed',
 * //   classNames: { root: 'base-root themed-root' },
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
  mergeClassNameAndStyle?: boolean,
): MergedProps<Target, Source> {
  if (!target) return source as MergedProps<Target, Source>;
  if (!source) return target as MergedProps<Target, Source>;

  // If mergeClassNameAndStyle is false, then we will not merge the className and style of the target and source.
  if (!mergeClassNameAndStyle) {
    return {
      ...target,
      ...source,
    } as MergedProps<Target, Source>;
  }
  // Extract special fields that need custom merging
  const targetClassName = target.className as string | undefined;
  const sourceClassName = source.className as string | undefined;
  const targetClassNames = target.classNames as Record<string, string> | undefined;
  const sourceClassNames = source.classNames as Record<string, string> | undefined;
  const targetStyle = target.style as CSSProperties | undefined;
  const sourceStyle = source.style as CSSProperties | undefined;
  const targetStyles = target.styles as Record<string, CSSProperties> | undefined;
  const sourceStyles = source.styles as Record<string, CSSProperties> | undefined;

  // Merge className with cx (concatenates and deduplicates)
  const mergedClassName = cx(targetClassName, sourceClassName);

  // Merge classNames objects - each key's values concatenated with cx
  let mergedClassNames: Record<string, string> | undefined;
  if (targetClassNames && sourceClassNames) {
    const allClassNameKeys = new Set([
      ...Object.keys(targetClassNames),
      ...Object.keys(sourceClassNames),
    ]);
    mergedClassNames = {};
    allClassNameKeys.forEach((key) => {
      const merged = cx(targetClassNames?.[key], sourceClassNames?.[key]);
      if (merged) {
        mergedClassNames![key] = merged;
      }
    });
    if (Object.keys(mergedClassNames).length === 0) {
      mergedClassNames = undefined;
    }
  } else {
    mergedClassNames = sourceClassNames || targetClassNames;
  }

  // Merge style objects (shallow merge, source overrides)
  const mergedStyle = targetStyle || sourceStyle ? { ...targetStyle, ...sourceStyle } : undefined;

  // Merge styles objects - each key's styles merged (shallow)
  let mergedStyles: Record<string, CSSProperties> | undefined;
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
    ...(mergedClassName && { className: mergedClassName }),
    ...(mergedClassNames && { classNames: mergedClassNames }),
    ...(mergedStyle && { style: mergedStyle }),
    ...(mergedStyles && { styles: mergedStyles }),
  } as MergedProps<Target, Source>;
}
