export type FilteredHTMLAttributes<Type, Properties extends keyof Type = never> = Omit<
  Type,
  'children' | 'className' | 'style' | 'dangerouslySetInnerHTML' | Properties
>;

export type StylesAndClassNames<ComponentClassNamesMap extends Record<string, string>> = {
  classNames?: { [key in keyof ComponentClassNamesMap]?: string };
  styles?: { [key in keyof ComponentClassNamesMap]?: React.CSSProperties };
};
