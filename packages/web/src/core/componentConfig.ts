import type { ButtonBaseProps } from '../buttons/Button';

/**
 * Config resolver that supports either static partial props object
 * or a function that receives component props and returns partial props.
 */
export type ConfigResolver<P> = Partial<P> | ((props: P) => Partial<P>);

/**
 * Component config for customization of default component props.
 * Use base props for config resolver typing so defaults are element-agnostic.
 */
export type ComponentConfig = {
  Button?: ConfigResolver<ButtonBaseProps>;
};
