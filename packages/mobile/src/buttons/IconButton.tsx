import { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import type {
  IconButtonVariant,
  IconName,
  IconSize,
  NegativeSpace,
  SharedProps,
} from '@coinbase/cds-common/types';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Pressable, type PressableBaseProps } from '../system/Pressable';

import type { ButtonBaseProps } from './Button';

export type IconButtonBaseProps = SharedProps &
  Omit<PressableBaseProps, 'children'> &
  Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush' | 'loading'> & {
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

export const IconButton = memo(function IconButton({
  name,
  active,
  variant = 'secondary',
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
  accessibilityHint,
  accessibilityLabel,
  ...props
}: IconButtonProps) {
  const theme = useTheme();

  const variantMap = transparent ? transparentVariants : variants;
  const variantStyle = variantMap[variant];

  const colorValue = color ?? variantStyle.color;
  const backgroundValue = background ?? variantStyle.background;
  const borderColorValue = borderColor ?? variantStyle.borderColor;

  const flushMargin = flush ? (-padding as NegativeSpace) : undefined;

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={loading ? `${accessibilityLabel ?? ''}, loading` : accessibilityLabel}
      alignItems="center"
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
      transparentWhileInactive={transparent}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={theme.color[colorValue]}
          size="small"
          testID={props.testID ? `${props.testID}-activity-indicator` : undefined}
        />
      ) : (
        /* TO DO: test using currentColor like web does on Icon here */
        <Icon active={active} color={colorValue} name={name} size={iconSize} />
      )}
    </Pressable>
  );
});

IconButton.displayName = 'IconButton';
