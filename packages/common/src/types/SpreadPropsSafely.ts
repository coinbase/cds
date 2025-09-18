/**
 * Use this type to ensure that spread props do not contain unwanted keys. This is useful when you're
 * working on a component whose props extend multiple other component prop types. Thisutility  helps
 * ensure all necessary props are destructured and passed to the correct components.
 * @example
 * ```tsx
 * type BoxProps = {
 *   color: 'red' | 'blue';
 *   padding: number;
 * }
 * type LinkProps = { href: string; }
 * type MyComponentBaseProps = { label: string; }
 *
 * type MyComponentProps = BoxProps & LinkProps & MyComponentBaseProps;
 *
 * const MyComponent = ({ href, label, ...props }: MyComponentProps) => (
 *   <Box
 *      {...(props satisfies ValidateProps<typeof props, LinkProps & MyComponentBaseProps>)}
 *   >
 *     <Link href={href}>{label}</Link>
 *   </Box>
 * )
 * ```
 */
export type ValidateProps<ActualPropType, ExpectedPropType> = {
  [key in keyof ActualPropType]: key extends keyof ExpectedPropType ? never : ActualPropType[key];
};
