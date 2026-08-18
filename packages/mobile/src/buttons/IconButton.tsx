import { memo } from 'react';
import { type StyleProp, type TextStyle, type View, type ViewStyle } from 'react-native';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import type { IconButtonVariant } from '@coinbase/cds-common/types/IconButtonBaseProps';
import type { IconNameOf } from '@coinbase/cds-common/types/IconComponent';
import type { IconSize } from '@coinbase/cds-common/types/IconSize';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { NegativeSpace } from '@coinbase/cds-common/types/SpacingProps';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import type { IconLike } from '../icons/createIcon';
import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import { ProgressCircle } from '../visualizations/ProgressCircle';

import { type ButtonBaseProps } from './Button';

export type IconButtonSize = 'xs' | 's' | 'm' | 'l';

const iconButtonSizes = {
  xs: { padding: 1, iconSize: 's', feedback: 'light' },
  s: { padding: 1.5, iconSize: 's', feedback: 'light' },
  m: { padding: 1.5, iconSize: 'm', feedback: 'normal' },
  l: { padding: 2, iconSize: 'm', feedback: 'normal' },
} as const satisfies Record<
  IconButtonSize,
  Pick<IconButtonBaseProps, 'padding' | 'feedback'> & {
    iconSize: Extract<IconSize, 's' | 'm'>;
  }
>;

const defaultIconButtonSize: IconButtonSize = 'l';

export type IconButtonBaseProps<IconComponentType extends IconLike = typeof Icon> = SharedProps &
  Omit<PressableBaseProps, 'children'> &
  Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'flush' | 'loading' | 'progressCircleSize'> & {
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
    /** Custom styles for individual elements of the IconButton component */
    styles?: {
      /** Root Pressable element */
      root?: StyleProp<ViewStyle>;
      /** Inner icon glyph Text element */
      icon?: StyleProp<TextStyle>;
      /** Loading progress circle element */
      progressCircle?: StyleProp<ViewStyle>;
    };
  };

export type IconButtonProps<IconComponentType extends IconLike = typeof Icon> =
  IconButtonBaseProps<IconComponentType>;

/**
 * `memo` erases type parameters — it takes a concrete props type, so a generic
 * render function collapses to one instantiation and `name` stops tracking
 * `IconComponent`. The generic therefore lives only here, in the exported call
 * signature, and the memoized component is cast to it. The implementation below
 * is deliberately left non-generic and sees the default instantiation; it only
 * needs to forward `name` to whichever component it was handed.
 */
type IconButtonComponent = (<IconComponentType extends IconLike = typeof Icon>(
  props: IconButtonProps<IconComponentType> & { ref?: React.Ref<View> },
) => React.ReactNode) & { displayName?: string };

export const IconButton = memo(
  ({
    ref,
    ..._props
  }: IconButtonProps & {
    ref?: React.Ref<View>;
  }) => {
    const mergedProps = useComponentConfig('IconButton', _props);
    const {
      name,
      IconComponent,
      active,
      variant = 'secondary',
      alignSelf = 'flex-start', // prevents stretching when placed in a flex container
      transparent,
      compact = true,
      size,
      background,
      color,
      borderColor,
      iconSize: iconSizeProp,
      borderWidth = 0, // remove Pressable's default transparent border
      borderRadius = 1000, // fully rounded at every size
      feedback: feedbackProp,
      flush,
      padding: paddingProp,
      loading,
      progressCircleSize,
      style,
      styles,
      accessibilityHint,
      accessibilityLabel,
      ...props
    } = mergedProps;

    const ResolvedIcon: IconLike = IconComponent ?? Icon;

    // `size` wins when both `size` and `compact` are set. IconButton defaults `compact`
    // to `true`, so with no explicit `size` the button resolves to `s`. The resolved size
    // also drives haptic `feedback` (xs/s -> light, m/l -> normal).
    const resolvedSize = size ?? (compact ? 's' : defaultIconButtonSize);
    const sizeConfig = iconButtonSizes[resolvedSize];
    const padding = paddingProp ?? sizeConfig.padding;
    const iconSize = iconSizeProp ?? sizeConfig.iconSize;
    const feedback = feedbackProp ?? sizeConfig.feedback;
    const theme = useTheme();
    const iconSizeValue = theme.iconSize[iconSize];
    const variantMap = transparent ? transparentVariants : variants;
    const variantStyle = variantMap[variant];

    const colorValue = color ?? variantStyle.color;
    const backgroundValue = background ?? variantStyle.background;
    const borderColorValue = borderColor ?? variantStyle.borderColor;

    const flushMargin = flush ? (-padding as NegativeSpace) : undefined;

    return (
      <Pressable
        ref={ref}
        accessibilityHint={accessibilityHint}
        accessibilityLabel={loading ? `${accessibilityLabel ?? ''}, loading` : accessibilityLabel}
        alignItems="center"
        alignSelf={alignSelf}
        background={backgroundValue}
        borderColor={borderColorValue}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        feedback={feedback}
        flexDirection="column"
        justifyContent="center"
        loading={loading}
        marginEnd={flush === 'end' ? flushMargin : undefined}
        marginStart={flush === 'start' ? flushMargin : undefined}
        padding={padding}
        style={styles?.root}
        transparentWhileInactive={transparent}
        {...props}
      >
        {loading ? (
          <ProgressCircle
            indeterminate
            color={colorValue}
            size={progressCircleSize ?? iconSizeValue}
            style={styles?.progressCircle}
            testID={props.testID ? `${props.testID}-progress-circle` : undefined}
            weight="thin"
          />
        ) : (
          /* TO DO: test using currentColor like web does on Icon here */
          <ResolvedIcon
            active={active}
            color={colorValue}
            name={name}
            size={iconSize}
            styles={{ icon: styles?.icon }}
          />
        )}
      </Pressable>
    );
  },
) as unknown as IconButtonComponent;

IconButton.displayName = 'IconButton';
