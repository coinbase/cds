import type { ButtonProps } from '../buttons/Button';

/**
 * A config resolver is either a static partial props object
 * or a function that receives component props and returns partial props.
 */
export type ConfigResolver<P> = Partial<P> | ((props: P) => Partial<P>);

/**
 * Component config for customization of default component props.
 */
export type ComponentConfig = {
  Button?: ConfigResolver<ButtonProps>;
};
