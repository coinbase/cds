import React, { forwardRef, memo, useMemo } from 'react';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import type { IconButtonVariant, IconName } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Spinner } from '../loaders/Spinner';
import { Pressable, type PressableBaseProps } from '../system/Pressable';

import { type ButtonBaseProps, spinnerHeight } from './Button';

const COMPONENT_STATIC_CLASSNAME = 'cds-IconButton';

const baseSpinnerCss = css`
  border: 2px solid;
  border-top-color: var(--color-transparent);
  border-right-color: var(--color-transparent);
  border-left-color: var(--color-transparent);
`;

export const iconButtonDefaultElement = 'button';

export type IconButtonDefaultElement = typeof iconButtonDefaultElement;

export type IconButtonBaseProps = Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'children'>,
  Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush'> & {
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /** Whether the icon is active */
    active?: boolean;
    /**
     * Toggle design and visual variants.
     * @default primary
     */
    variant?: IconButtonVariant;
  }
>;

export type IconButtonProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  IconButtonBaseProps
>;

type IconButtonComponent = (<AsComponent extends React.ElementType = IconButtonDefaultElement>(
  props: IconButtonProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

const flushSpaceCss = css`
  min-width: unset;
  padding-inline-start: var(--space-2);
  padding-inline-end: var(--space-2);
`;

const flushStartCss = css`
  margin-inline-start: calc(var(--space-2) * -1);
`;

const flushEndCss = css`
  margin-inline-end: calc(var(--space-2) * -1);
`;

export const IconButton: IconButtonComponent = memo(
  forwardRef<React.ReactElement<IconButtonBaseProps>, IconButtonBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        variant = 'secondary',
        transparent,
        compact = true,
        background,
        color,
        borderColor,
        borderRadius = 1000,
        borderWidth = 100,
        alignItems = 'center',
        justifyContent = 'center',
        // TO DO: fix this when removing interactableHeight
        height = compact ? 40 : 56,
        width = compact ? 40 : 56,
        className,
        name,
        active,
        flush,
        loading,
        accessibilityLabel,
        accessibilityHint,
        ...props
      }: IconButtonProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? iconButtonDefaultElement) satisfies React.ElementType;
      const theme = useTheme();

      const iconSize = compact ? 's' : 'm';
      const iconSizeValue = theme.iconSize[iconSize];

      const spinnerSizeStyles = useMemo(
        () => ({
          width: iconSizeValue,
          height: iconSizeValue,
        }),
        [iconSizeValue],
      );

      const variantMap = transparent ? transparentVariants : variants;
      const variantStyle = variantMap[variant];

      const colorValue = color ?? variantStyle.color;
      const backgroundValue = background ?? variantStyle.background;
      const borderColorValue = borderColor ?? variantStyle.borderColor;

      return (
        <Pressable
          ref={ref}
          accessibilityHint={accessibilityHint}
          accessibilityLabel={loading ? `${accessibilityLabel ?? ''}, loading` : accessibilityLabel}
          alignItems={alignItems}
          as={Component}
          background={backgroundValue}
          borderColor={borderColorValue}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          className={cx(
            COMPONENT_STATIC_CLASSNAME,
            flush && flushSpaceCss,
            flush === 'start' && flushStartCss,
            flush === 'end' && flushEndCss,
            className,
          )}
          color={colorValue}
          data-compact={compact}
          data-flush={flush}
          data-transparent={transparent}
          data-variant={variant}
          height={height}
          justifyContent={justifyContent}
          loading={loading}
          transparentWhileInactive={transparent}
          width={width}
          {...props}
        >
          {loading ? (
            <Spinner
              className={baseSpinnerCss}
              color="currentColor"
              size={spinnerHeight}
              style={spinnerSizeStyles}
              testID={props.testID ? `${props.testID}-spinner` : undefined}
            />
          ) : (
            <Icon active={active} color="currentColor" name={name} size={iconSize} />
          )}
        </Pressable>
      );
    },
  ),
);

IconButton.displayName = 'IconButton';
