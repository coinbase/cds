export type FilteredHTMLAttributes<Type, Properties extends keyof Type = never> = Omit<
  Type,
  'children' | 'className' | 'style' | 'dangerouslySetInnerHTML' | Properties
>;
