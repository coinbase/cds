import { forwardRef, memo } from 'react';
import { type StyleProp, type TextStyle, type View, type ViewStyle } from 'react-native';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import type {
  IconButtonVariant,
  IconName,
  IconSize,
  NegativeSpace,
  SharedProps,
} from '@coinbase/cds-common/types';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import { ProgressCircle } from '../visualizations/ProgressCircle';

import { type ButtonBaseProps } from './Button';

export type IconButtonBaseProps = SharedProps &
  Omit<PressableBaseProps, 'children'> &
  Pick<
    ButtonBaseProps,
    'disabled' | 'transparent' | 'compact' | 'flush' | 'loading' | 'progressCircleSize'
  > & {
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
  forwardRef<View, IconButtonProps>((_props, ref) => {
    const mergedProps = useComponentConfig('IconButton', _props);
    const {
      name,
      active,
      variant = 'secondary',
      alignSelf = 'flex-start', // prevents stretching when placed in a flex container
      transparent,
      compact = true,
      background,
      color,
      borderColor,
      iconSize = compact ? 's' : 'm',
      borderWidth = 0, // remove Pressable's default transparent border
      borderRadius = 1000,
      feedback = compact ? 'light' : 'normal',
      flush,
      padding = compact ? 1.5 : 2,
      loading,
      progressCircleSize,
      style,
      styles,
      accessibilityHint,
      accessibilityLabel,
      ...props
    } = mergedProps;
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
  }),
);

IconButton.displayName = 'IconButton';
