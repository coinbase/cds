import React, { forwardRef, memo, useMemo } from 'react';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import type { IconButtonVariant, IconName, IconSize } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { useResolveResponsiveProp } from '../hooks/useResolveResponsiveProp';
import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import { ProgressCircle } from '../visualizations/ProgressCircle';

import { type ButtonBaseProps } from './Button';

const COMPONENT_STATIC_CLASSNAME = 'cds-IconButton';

export const iconButtonDefaultElement = 'button';

export type IconButtonDefaultElement = typeof iconButtonDefaultElement;

export type IconButtonBaseProps = Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'children'>,
  Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush'> & {
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /**
     * Size for the icon rendered inside the button.
     * @default compact ? 's' : 'm'
     */
    iconSize?: IconSize;
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

const baseCss = css`
  width: fit-content;
  height: fit-content;
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
        borderWidth = 0, // remove Pressable's default transparent border
        alignItems = 'center',
        justifyContent = 'center',
        className,
        style,
        padding = compact ? 1.5 : 2,
        name,
        iconSize = compact ? 's' : 'm',
        active,
        flush,
        loading,
        progressCircleSize,
        accessibilityLabel,
        accessibilityHint,
        ...props
      }: IconButtonProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? iconButtonDefaultElement) satisfies React.ElementType;
      const theme = useTheme();

      const iconSizeValue = theme.iconSize[iconSize];
      const spinnerSize = iconSizeValue / 10;

      const resolvedPadding = useResolveResponsiveProp(padding);

      const pressableStyle = useMemo(() => {
        if (!flush || !resolvedPadding) return undefined;
        const negativeMargin = -theme.space[resolvedPadding];
        return {
          ...style,
          ...(flush === 'start'
            ? { marginInlineStart: negativeMargin }
            : { marginInlineEnd: negativeMargin }),
        };
      }, [flush, resolvedPadding, theme.space, style]);

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
          className={cx(COMPONENT_STATIC_CLASSNAME, baseCss, className)}
          color={colorValue}
          data-compact={compact}
          data-flush={flush}
          data-transparent={transparent}
          data-variant={variant}
          justifyContent={justifyContent}
          loading={loading}
          padding={padding}
          style={pressableStyle}
          transparentWhileInactive={transparent}
          {...props}
        >
          {loading ? (
            <ProgressCircle
              indeterminate
              accessibilityLabel="Loading"
              color="currentColor"
              size={progressCircleSize ?? iconSizeValue}
              testID={props.testID ? `${props.testID}-progress-circle` : undefined}
              weight="thin"
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
