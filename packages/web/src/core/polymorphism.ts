/**
 * Prior art:
 * https://www.benmvp.com/blog/polymorphic-react-components-typescript/
 * https://github.com/DefinitelyTyped/DefinitelyTyped/pull/70361
 */

export namespace Polymorphic {
  export type ExtendableProps<BaseProps, OverrideProps> = OverrideProps &
    Omit<BaseProps, keyof OverrideProps>;

  export type InheritableElementProps<
    Component extends React.ElementType,
    Props,
  > = Polymorphic.ExtendableProps<React.ComponentPropsWithoutRef<Component>, Props>;

  export type Ref<AsComponent extends React.ElementType> =
    React.ComponentPropsWithRef<AsComponent>['ref'];

  export type Props<
    AsComponent extends React.ElementType,
    Props,
  > = Polymorphic.InheritableElementProps<
    AsComponent,
    Props & {
      /**
       * Polymorphic render target. Controls which underlying element/component gets rendered.
       *
       * Changing `as` also changes the inherited native props (e.g. `href` for `as="a"`) and the
       * expected `ref` type.
       */
      as?: AsComponent;
    } & { ref?: Polymorphic.Ref<AsComponent> }
  >;

  export type ReactReturn = ReturnType<React.ExoticComponent>;

  export type ReactNamed = {
    [k in keyof React.NamedExoticComponent]: React.NamedExoticComponent[k];
  };
}
