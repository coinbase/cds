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

type IconButtonFeedback = 'light' | 'normal';

type IconButtonSizeConfig = {
  padding: number;
  iconSize: 's' | 'm';
  borderRadius: number;
  feedback: IconButtonFeedback;
};

const iconButtonSizes = {
  xs: { padding: 1, iconSize: 's', borderRadius: 1000, feedback: 'light' },
  s: { padding: 1.5, iconSize: 's', borderRadius: 1000, feedback: 'light' },
  m: { padding: 1.5, iconSize: 'm', borderRadius: 1000, feedback: 'normal' },
  l: { padding: 2, iconSize: 'm', borderRadius: 1000, feedback: 'normal' },
} as const satisfies Record<IconButtonSize, IconButtonSizeConfig>;

/**
 * Nominal default of the size scale. NOTE: this only takes effect when `compact` is
 * explicitly `false`. IconButton defaults `compact` to `true`, so the *effective* default
 * size is `s` — see the `compact`/`size` prop docs and the `resolvedSize` logic below.
 */
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
     * Reduce the inner padding within the button itself.
     *
     * NOTE: unlike most CDS components, IconButton defaults `compact` to `true`, so an
     * IconButton with no `size` prop renders at `size="s"`. Pass `compact={false}` (or an
     * explicit `size`) to opt out of the compact default.
     * @deprecated Use `size="s"` instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v10
     */
    compact?: boolean;
    /**
     * Sets the size of the button.
     *
     * IconButton is a special case: because `compact` defaults to `true`, an IconButton
     * with no `size` (and no `compact={false}`) resolves to `s`, NOT `l`. An explicit
     * `size` always wins over `compact` when both are provided.
     * @default 's' (because `compact` defaults to `true`; resolves to `l` only when `compact={false}`)
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
      borderRadius: borderRadiusProp,
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

    // IconButton is a special case: `compact` defaults to `true` (see the prop default
    // above), so with no explicit `size` the button resolves to `s` rather than the `l`
    // nominal default of the size scale. `compact={false}` yields `defaultIconButtonSize`
    // (`l`). An explicit `size` always wins over `compact` when both are provided. The
    // resolved size also drives haptic `feedback` (xs/s -> light, m/l -> normal).
    const resolvedSize = size ?? (compact ? 's' : defaultIconButtonSize);
    const cfg = iconButtonSizes[resolvedSize];
    const padding = paddingProp ?? cfg.padding;
    const iconSize = iconSizeProp ?? cfg.iconSize;
    const borderRadius = borderRadiusProp ?? cfg.borderRadius;
    const feedback = feedbackProp ?? cfg.feedback;
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
