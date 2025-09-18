import React, { forwardRef, memo, useCallback } from 'react';
import { css } from '@linaria/core';

import { useSelectContext } from '../controls/selectContext';
import type { SelectOptionProps } from '../controls/SelectOption';
import type { Polymorphic } from '../core/polymorphism';
import {
  Pressable,
  type PressableBaseProps,
  type PressableDefaultElement,
  type PressableProps,
} from '../system/Pressable';

const insetFocusRingCss = css`
  position: relative;
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 0;
  }
`;

export const menuitemDefaultElement = 'button';

export type MenuitemDefaultElement = typeof menuitemDefaultElement;

export type MenuitemBaseProps = Polymorphic.ExtendableProps<
  PressableBaseProps,
  {
    children: NonNullable<React.ReactNode>;
  } & Pick<SelectOptionProps, 'disableCloseOnOptionChange' | 'value' | 'tabIndex'>
>;

export type MenuitemProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  MenuitemBaseProps
>;

type MenuitemComponent = (<AsComponent extends React.ElementType = MenuitemDefaultElement>(
  props: MenuitemProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const MenuItem: MenuitemComponent = memo(
  forwardRef<React.ReactElement<MenuitemBaseProps>, MenuitemBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        background = 'transparent',
        children,
        value,
        onClick,
        disableCloseOnOptionChange,
        tabIndex = -1,
        ...props
      }: MenuitemProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? menuitemDefaultElement) satisfies React.ElementType;

      const { onChange, handleCloseMenu } = useSelectContext();

      const handleClick: NonNullable<PressableProps<PressableDefaultElement>['onClick']> =
        useCallback(
          (event) => {
            onClick?.(event);
            onChange?.(value);
            if (!disableCloseOnOptionChange) {
              handleCloseMenu?.();
            }
          },
          [disableCloseOnOptionChange, handleCloseMenu, onChange, onClick, value],
        );
      return (
        <Pressable
          ref={ref}
          noScaleOnPress
          as={Component}
          background={background}
          className={insetFocusRingCss}
          onClick={handleClick}
          role="menuitem"
          tabIndex={tabIndex}
          {...props}
        >
          {children}
        </Pressable>
      );
    },
  ),
);
