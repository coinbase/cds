import React, { forwardRef, memo, useMemo } from 'react';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import type { IconButtonVariant } from '@coinbase/cds-common/types/IconButtonBaseProps';
import type { IconNameOf } from '@coinbase/cds-common/types/IconComponent';
import type { IconSize } from '@coinbase/cds-common/types/IconSize';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { useResolveResponsiveProp } from '../hooks/useResolveResponsiveProp';
import { useTheme } from '../hooks/useTheme';
import type { IconLike } from '../icons/createIcon';
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

const iconButtonSizes = {
  xs: { padding: 1, iconSize: 's' },
  s: { padding: 1.5, iconSize: 's' },
  m: { padding: 1.5, iconSize: 'm' },
  l: { padding: 2, iconSize: 'm' },
} as const satisfies Record<
  IconButtonSize,
  Pick<IconButtonBaseProps, 'padding'> & {
    iconSize: Extract<IconSize, 's' | 'm'>;
  }
>;

const defaultIconButtonSize: IconButtonSize = 'l';

export type IconButtonBaseProps<IconComponentType extends IconLike = typeof Icon> =
  Polymorphic.ExtendableProps<
    Omit<PressableBaseProps, 'children'>,
    Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'flush'> & {
      /**
       * Name of the icon, as defined in Figma. Accepted values are derived from
       * `IconComponent`, so they narrow to a custom icon set's names when one is
       * passed and stay the built-in `IconName` otherwise.
       */
      name: IconNameOf<IconComponentType>;
      /**
       * Component used to render `name`. Pass an icon component built with
       * `createIcon` to render icons from a set CDS does not ship; `name` is then
       * type-checked against that set instead of the built-in names.
       * @default Icon
       */
      IconComponent?: IconComponentType;
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
       * Reduces the button's padding and icon size. Unlike most CDS components, IconButton
       * enables `compact` by default, so an IconButton with no `size` renders at `size="s"`.
       * Set `compact={false}` (or pass an explicit `size`) to opt out.
       * @deprecated Use `size="s"` instead. This will be removed in a future major release.
       * @deprecationExpectedRemoval v10
       */
      compact?: boolean;
      /**
       * Sets the size of the button. An explicit `size` always takes precedence over `compact`.
       * IconButton enables `compact` by default, so until `compact` is removed an IconButton
       * with no `size` renders at `s`.
       * @default l
       */
      size?: IconButtonSize;
    }
  >;

export type IconButtonProps<
  AsComponent extends React.ElementType,
  IconComponentType extends IconLike = typeof Icon,
> = Polymorphic.Props<AsComponent, IconButtonBaseProps<IconComponentType>> &
  StylesAndClassNames<typeof iconButtonClassNames>;

/**
 * `memo` and `forwardRef` both erase type parameters — they take a concrete props
 * type, so a generic render function collapses to one instantiation and `name`
 * stops tracking `IconComponent`. The generic therefore lives only here, in the
 * exported call signature, and the wrapped component is cast to it. The
 * implementation below is deliberately left non-generic and sees the default
 * instantiation; it only needs to forward `name` to whichever component it was
 * handed. `IconButton` already used this shape for `as`, so the icon set rides
 * along as a second type parameter.
 */
type IconButtonComponent = (<
  AsComponent extends React.ElementType = IconButtonDefaultElement,
  IconComponentType extends IconLike = typeof Icon,
>(
  props: IconButtonProps<AsComponent, IconComponentType>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

const baseCss = css`
  width: fit-content;
  height: fit-content;
`;

export const IconButton = memo(
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
        borderRadius = 1000, // fully rounded at every size
        borderWidth = 0, // remove Pressable's default transparent border
        alignItems = 'center',
        justifyContent = 'center',
        className,
        style,
        padding: paddingProp,
        name,
        IconComponent,
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
      const ResolvedIcon: IconLike = IconComponent ?? Icon;
      const theme = useTheme();

      // `size` wins when both `size` and `compact` are set. IconButton defaults `compact`
      // to `true`, so with no explicit `size` the button resolves to `s`.
      const resolvedSize = size ?? (compact ? 's' : defaultIconButtonSize);
      const sizeConfig = iconButtonSizes[resolvedSize];
      const padding = paddingProp ?? sizeConfig.padding;
      const iconSize = iconSizeProp ?? sizeConfig.iconSize;

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
            <ResolvedIcon
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
) as unknown as IconButtonComponent;

IconButton.displayName = 'IconButton';
