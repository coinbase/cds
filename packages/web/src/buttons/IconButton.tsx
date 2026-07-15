import React, { forwardRef, memo, useMemo } from 'react';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import type { IconButtonVariant } from '@coinbase/cds-common/types/IconButtonBaseProps';
import type { IconName } from '@coinbase/cds-common/types/IconName';
import type { IconSize } from '@coinbase/cds-common/types/IconSize';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { useResolveResponsiveProp } from '../hooks/useResolveResponsiveProp';
import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import type { StylesAndClassNames } from '../types';
import { ProgressCircle } from '../visualizations/ProgressCircle';

import { type ButtonBaseProps } from './Button';

/**
 * Static class names for IconButton component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const iconButtonClassNames = {
  /** Root button element */
  root: 'cds-IconButton',
  /** Inner icon glyph element */
  icon: 'cds-IconButton-icon',
  /** Loading progress circle element */
  progressCircle: 'cds-IconButton-progressCircle',
} as const;

export const iconButtonDefaultElement = 'button';

export type IconButtonDefaultElement = typeof iconButtonDefaultElement;

export type IconButtonSize = 'xs' | 's' | 'm' | 'l';

type IconButtonSizeConfig = {
  padding: number;
  iconSize: 's' | 'm';
  borderRadius: number;
};

const iconButtonSizes = {
  xs: { padding: 1, iconSize: 's', borderRadius: 1000 },
  s: { padding: 1.5, iconSize: 's', borderRadius: 1000 },
  m: { padding: 1.5, iconSize: 'm', borderRadius: 1000 },
  l: { padding: 2, iconSize: 'm', borderRadius: 1000 },
} as const satisfies Record<IconButtonSize, IconButtonSizeConfig>;

const defaultIconButtonSize: IconButtonSize = 'l';

export type IconButtonBaseProps = Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'children'>,
  Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'flush'> & {
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /**
     * Size for the icon rendered inside the button.
     * @default 's' for size xs/s, 'm' for size m/l
     */
    iconSize?: IconSize;
    /** Whether the icon is active */
    active?: boolean;
    /**
     * Toggle design and visual variants.
     * @default primary
     */
    variant?: IconButtonVariant;
    /**
     * Reduce the inner padding within the button itself.
     * @deprecated Use `size="s"` instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v10
     */
    compact?: boolean;
    /**
     * Set the size of the button.
     * @default l
     */
    size?: IconButtonSize;
  }
>;

export type IconButtonProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  IconButtonBaseProps
> &
  StylesAndClassNames<typeof iconButtonClassNames>;

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
      _props: IconButtonProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const mergedProps = useComponentConfig('IconButton', _props);
      const {
        as,
        variant = 'secondary',
        transparent,
        compact = true,
        size,
        background,
        color,
        borderColor,
        borderRadius: borderRadiusProp,
        borderWidth = 0, // remove Pressable's default transparent border
        alignItems = 'center',
        justifyContent = 'center',
        className,
        style,
        padding: paddingProp,
        name,
        iconSize: iconSizeProp,
        active,
        flush,
        loading,
        progressCircleSize,
        accessibilityLabel,
        accessibilityHint,
        styles,
        classNames,
        ...props
      } = mergedProps;
      const Component = (as ?? iconButtonDefaultElement) satisfies React.ElementType;
      const theme = useTheme();

      // `size` wins when both `size` and `compact` are set; compact-only maps to `s`.
      const resolvedSize = size ?? (compact ? 's' : defaultIconButtonSize);
      const cfg = iconButtonSizes[resolvedSize];
      const padding = paddingProp ?? cfg.padding;
      const iconSize = iconSizeProp ?? cfg.iconSize;
      const borderRadius = borderRadiusProp ?? cfg.borderRadius;

      const iconSizeValue = theme.iconSize[iconSize];
      const spinnerSize = iconSizeValue / 10;

      const resolvedPadding = useResolveResponsiveProp(padding);

      const pressableStyle = useMemo(() => {
        if (!flush || !resolvedPadding) return style;
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
          className={cx(iconButtonClassNames.root, baseCss, classNames?.root, className)}
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
              className={cx(iconButtonClassNames.progressCircle, classNames?.progressCircle)}
              color="currentColor"
              size={progressCircleSize ?? iconSizeValue}
              style={styles?.progressCircle}
              testID={props.testID ? `${props.testID}-progress-circle` : undefined}
              weight="thin"
            />
          ) : (
            <Icon
              active={active}
              classNames={{ icon: cx(iconButtonClassNames.icon, classNames?.icon) }}
              color="currentColor"
              name={name}
              size={iconSize}
              styles={{ icon: styles?.icon }}
            />
          )}
        </Pressable>
      );
    },
  ),
);

IconButton.displayName = 'IconButton';
