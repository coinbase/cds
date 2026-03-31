/**
 * The result of merging two sets of props
 */
export type MergedProps<Target, Source> = Source & Target;

/**
 * Merges two sets of component props where source overrides target.
 *
 * This merge is shallow by design and applies to any BaseProps keys, not only
 * style-like props. This allows component config defaults such as `compact`,
 * `variant`, `height`, and `font` to flow through alongside style props.
 *
 * @param target - Base set of props (e.g., from component config defaults)
 * @param source - Overriding set of props (e.g., from local component props)
 * @returns Merged props with source values taking precedence
 *
 * @example
 * ```tsx
 * const merged = mergeComponentProps(
 *   { compact: false, variant: 'secondary', height: 32, font: 'headline' },
 *   { compact: true, variant: 'primary' }
 * );
 * // Result: {
 * //   compact: true,        // local override
 * //   variant: 'primary',   // local override
 * //   height: 32,           // preserved from defaults
 * //   font: 'headline'      // preserved from defaults
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
