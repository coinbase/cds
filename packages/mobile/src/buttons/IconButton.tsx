import { memo } from 'react';
import { type StyleProp, type TextStyle, type View, type ViewStyle } from 'react-native';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import type { IconButtonVariant } from '@coinbase/cds-common/types/IconButtonBaseProps';
import type { IconName } from '@coinbase/cds-common/types/IconName';
import type { IconSize } from '@coinbase/cds-common/types/IconSize';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { NegativeSpace } from '@coinbase/cds-common/types/SpacingProps';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
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

export type IconButtonBaseProps = SharedProps &
  Omit<PressableBaseProps, 'children'> &
  Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'flush' | 'loading' | 'progressCircleSize'> & {
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
     * Reduces the button's padding and icon size. Unlike most CDS components, IconButton
     * enables `compact` by default, so an IconButton with no `size` renders at `size="s"`.
     * Set `compact={false}` (or pass an explicit `size`) to opt out.
     * @deprecated Use `size="s"` instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v11
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

export type IconButtonProps = IconButtonBaseProps;

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
          <Icon
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
);

IconButton.displayName = 'IconButton';
