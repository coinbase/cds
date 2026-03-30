import React, { memo, useMemo } from 'react';
import type { DimensionValue } from 'react-native';
import type { SharedAccessibilityProps } from '@coinbase/cds-common';
import { cardSizes } from '@coinbase/cds-common/tokens/card';

import { useTheme } from '../hooks/useTheme';
import type { BoxBaseProps, BoxProps } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { pinStyles } from '../styles/pinStyles';
import { Pressable, type PressableProps } from '../system/Pressable';

export type CardBaseProps = Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> &
  Pick<PressableProps, 'noScaleOnPress' | 'onPress'> &
  BoxBaseProps & {
    /** Size of the card. Small and medium have fixed widths and large grows with its children. */
    size?: 'small' | 'medium' | 'large';
    /**
     * If onPress is present the Card will be wrapped with a Pressable component.
     * pressableProps allows customization of that Pressable wrapper.
     */
    pressableProps?: Omit<PressableProps, 'onPress'>;
  };

export type CardProps = CardBaseProps & BoxProps;

const getBorderRadiusPinStyle = (borderRadius: number) => ({
  top: {
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
  },
  right: {
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderRightWidth: 0,
  },
  bottom: {
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomWidth: 0,
  },
  left: {
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
  },
  all: {},
});

export const Card = memo(function OldCard({
  children,
  background = 'bg',
  elevation = 1,
  size = 'large',
  onPress,
  pin,
  style,
  width: widthProps,
  height: heightProps,
  testID,
  accessibilityLabel,
  accessibilityHint,
  pressableProps,
  borderRadius = 200,
  noScaleOnPress,
  ...props
}: CardProps) {
  const width = widthProps ?? cardSizes[size].width;
  const height = heightProps ?? cardSizes[size].height;
  const theme = useTheme();

  const borderRadiusPinStyle = useMemo(() => {
    return pin ? getBorderRadiusPinStyle(theme.borderRadius[200])[pin] : undefined;
  }, [pin, theme]);

  const contentStyles = useMemo(() => [borderRadiusPinStyle, style], [borderRadiusPinStyle, style]);

  const content = useMemo(
    () => (
      <VStack
        accessibilityHint={onPress ? undefined : accessibilityHint}
        accessibilityLabel={onPress ? undefined : accessibilityLabel}
        background={onPress ? undefined : background}
        borderRadius={borderRadius}
        elevation={onPress ? undefined : elevation}
        height={onPress ? undefined : height}
        pin={onPress ? undefined : pin}
        style={contentStyles}
        testID={onPress ? undefined : testID}
        width={onPress ? undefined : width}
        {...props}
      >
        {children}
      </VStack>
    ),
    [
      accessibilityHint,
      accessibilityLabel,
      background,
      borderRadius,
      children,
      contentStyles,
      elevation,
      height,
      onPress,
      pin,
      props,
      testID,
      width,
    ],
  );

  return onPress ? (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      background={background}
      borderRadius={borderRadius}
      elevation={elevation}
      noScaleOnPress={noScaleOnPress}
      onPress={onPress}
      style={{
        ...(pin ? pinStyles[pin] : undefined),
        width: width as DimensionValue,
        height: height as DimensionValue,
      }}
      testID={testID}
      {...pressableProps}
    >
      {content}
    </Pressable>
  ) : (
    content
  );
});

Card.displayName = 'Card';
