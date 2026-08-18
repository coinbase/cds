/**
 * Derives the accepted `name` union from an icon component's props.
 *
 * Components that render an icon by name take an optional `IconComponent` prop;
 * their `name` prop is typed as `IconNameOf<typeof IconComponent>` so it narrows
 * to whatever icon set was passed, and to the built-in `IconName` when omitted.
 *
 * The `(props: infer Props) => any` pattern reads through the wrappers
 * `createIcon` applies — `memo(forwardRef(...))` on web and `memo(...)` on
 * mobile both expose a call signature, so the props are recoverable from either.
 */
export type IconNameOf<IconComponentType> = IconComponentType extends (props: infer Props) => any
  ? Props extends { name: infer Name }
    ? Name
    : never
  : never;
