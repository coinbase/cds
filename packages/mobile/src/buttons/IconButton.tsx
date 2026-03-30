import { forwardRef, memo, useCallback, useMemo } from 'react';
import { type PressableStateCallbackType, type View, type ViewStyle } from 'react-native';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import { interactableHeight } from '@coinbase/cds-common/tokens/interactableHeight';
import type {
  IconButtonVariant,
  IconName,
  IconSize,
  SharedProps,
} from '@coinbase/cds-common/types';
import { getButtonSpacingProps } from '@coinbase/cds-common/utils/getButtonSpacingProps';

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
  };

export type IconButtonProps = IconButtonBaseProps;

export const IconButton = memo(
  forwardRef<View, IconButtonProps>(function IconButton(
    {
      name,
      active,
      variant = 'secondary',
      transparent,
      compact = true,
      background,
      color,
      borderColor,
      iconSize = compact ? 's' : 'm',
      borderWidth = 100,
      borderRadius = 1000,
      height = interactableHeight[compact ? 'compact' : 'regular'],
      width = interactableHeight[compact ? 'compact' : 'regular'],
      feedback = compact ? 'light' : 'normal',
      flush,
      loading,
      progressCircleSize,
      style,
      accessibilityHint,
      accessibilityLabel,
      ...props
    },
    ref,
  ) {
    const theme = useTheme();
    const iconSizeValue = theme.iconSize[iconSize];
    const variantMap = transparent ? transparentVariants : variants;
    const variantStyle = variantMap[variant];

    const colorValue = color ?? variantStyle.color;
    const backgroundValue = background ?? variantStyle.background;
    const borderColorValue = borderColor ?? variantStyle.borderColor;

    const { marginStart, marginEnd } = getButtonSpacingProps({ compact, flush });

    const sizingStyle = useMemo<ViewStyle>(
      () => ({
        height: height as ViewStyle['height'],
        width: width as ViewStyle['width'],
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }),
      [height, width],
    );

    const pressableStyle = useCallback(
      (state: PressableStateCallbackType) => [
        sizingStyle,
        typeof style === 'function' ? style(state) : style,
      ],
      [sizingStyle, style],
    );

    return (
      <Pressable
        ref={ref}
        accessibilityHint={accessibilityHint}
        accessibilityLabel={loading ? `${accessibilityLabel ?? ''}, loading` : accessibilityLabel}
        background={backgroundValue}
        borderColor={borderColorValue}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        feedback={feedback}
        loading={loading}
        marginEnd={marginEnd}
        marginStart={marginStart}
        style={pressableStyle}
        transparentWhileInactive={transparent}
        {...props}
      >
        {loading ? (
          <Box alignItems="center" height={height} justifyContent="center" width={width}>
            <ProgressCircle
              indeterminate
              color={colorValue}
              size={progressCircleSize ?? iconSizeValue}
              testID={props.testID ? `${props.testID}-progress-circle` : undefined}
              weight="thin"
            />
          </Box>
        ) : (
          /* TO DO: test using currentColor like web does on Icon here */
          <Icon
            active={active}
            color={colorValue}
            name={name}
            size={iconSize}
            style={sizingStyle}
          />
        )}
      </Pressable>
    );
  }),
);

IconButton.displayName = 'IconButton';
