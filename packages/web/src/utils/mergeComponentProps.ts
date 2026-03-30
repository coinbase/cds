/**
 * The result of merging two sets of props
 */
export type MergedProps<Target, Source> = Source & Target;

/**
 * Merges two sets of component props where source overrides target.
 *
 * @param target - Base set of props (e.g., from parent ThemeProvider or theme config)
 * @param source - Overriding set of props (e.g., from child ThemeProvider or local props)
 * @returns Merged props with source values taking precedence
 *
 * @example
 * ```tsx
 * const merged = mergeComponentProps(
 *   { className: 'base', size: 'md' },
 *   { className: 'themed', variant: 'primary' }
 * );
 * // Result: {
 * //   className: 'themed',
 * //   size: 'md',
 * //   variant: 'primary'
 * // }
 * ```
 */
export function mergeComponentProps<
  Target extends Record<string, any>,
  Source extends Record<string, any>,
>(target: Target | undefined, source: Source | undefined): MergedProps<Target, Source> {
  if (!target) return source as MergedProps<Target, Source>;
  if (!source) return target as MergedProps<Target, Source>;

  return {
    ...target,
    ...source,
  } as MergedProps<Target, Source>;
}
