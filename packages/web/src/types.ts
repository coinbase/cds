export type FilteredHTMLAttributes<Type, Properties extends keyof Type = never> = Omit<
  Type,
  'children' | 'className' | 'style' | 'dangerouslySetInnerHTML' | Properties
>;

/**
 * Utility type that generates `classNames` and `styles` props from a component's
 * static classnames map. This ensures the classNames/styles props stay in sync with
 * the actual DOM structure.
 *
 * @example
 * ```tsx
 * export const myComponentClassNames = {
 *   root: 'cds-MyComponent',
 *   header: 'cds-MyComponent-header',
 *   content: 'cds-MyComponent-content',
 * } as const;
 *
 * type MyComponentProps = StylesAndClassNames<typeof myComponentClassNames> & {
 *   // other props...
 * };
 * ```
 */
export type StylesAndClassNames<ComponentClassNamesMap extends Record<string, string>> = {
  /**
   * Custom class names for component parts. Keys correspond to the component's
   * internal DOM structure.
   */
  classNames?: { [key in keyof ComponentClassNamesMap]?: string };
  /**
   * Custom inline styles for component parts. Keys correspond to the component's
   * internal DOM structure.
   */
  styles?: { [key in keyof ComponentClassNamesMap]?: React.CSSProperties };
};
