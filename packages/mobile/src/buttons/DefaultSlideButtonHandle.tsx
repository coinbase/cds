import React, { memo, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  type WithSpringConfig,
} from 'react-native-reanimated';
import { variants } from '@coinbase/cds-common/tokens/button';
import type { SpringConfig } from '@react-spring/core';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';
import { ProgressCircle } from '../visualizations/ProgressCircle';

import {
  defaultSlideButtonSize,
  type SlideButtonBaseProps,
  type SlideButtonHandleProps,
  type SlideButtonSize,
  slideButtonSizes,
} from './SlideButton';

export const slideButtonSpringConfig = {
  stiffness: 300,
  damping: 26,
  mass: 1,
  overshootClamping: true,
} as const satisfies WithSpringConfig;

/**
 * @deprecated SlideButton no longer uses react-spring; this value no longer used by {@link DefaultSlideButtonHandle} but retained for migration only. Use {@link slideButtonSpringConfig} with Reanimated `withSpring` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const animationConfig = { tension: 300, clamp: true } as const satisfies SpringConfig;

export type SlideButtonHandleCheckedProps = Pick<SlideButtonBaseProps, 'variant'> & {
  /**
   * Size of the slide button handle.
   * @default l
   */
  size?: SlideButtonSize;
  label?: React.ReactNode;
  end?: React.ReactNode;
  disabled?: boolean;
};

export type SlideButtonHandleCheckedComponent = (
  props: SlideButtonHandleCheckedProps,
) => React.ReactElement | null;

export type SlideButtonHandleUncheckedProps = Pick<SlideButtonBaseProps, 'variant'> & {
  /**
   * Size of the slide button handle.
   * @default l
   */
  size?: SlideButtonSize;
  disabled?: boolean;
  start?: React.ReactNode;
};

export type SlideButtonHandleUncheckedComponent = (
  props: SlideButtonHandleUncheckedProps,
) => React.ReactElement | null;

export const styles = StyleSheet.create({
  base: {
    width: '100%',
    height: '100%',
  },
  absoluteContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flexShrink: 0,
  },
});

export const SlideButtonHandleChecked = memo(
  ({ label, end, size = defaultSlideButtonSize }: SlideButtonHandleCheckedProps) => {
    const theme = useTheme();
    const sizeConfig = slideButtonSizes[size];
    const iconSizeValue = theme.iconSize[sizeConfig.iconSize];

    return (
      <Box alignItems="center" height="100%" justifyContent="center" width="100%">
        {typeof label !== 'string' ? (
          label
        ) : (
          <Text color="fgInverse" font="headline">
            {label}
          </Text>
        )}
        <Box
          alignItems="center"
          height="100%"
          justifyContent="center"
          padding={sizeConfig.handlePadding}
          pin="right"
        >
          {end ?? (
            <ProgressCircle indeterminate color="fgInverse" size={iconSizeValue} weight="thin" />
          )}
        </Box>
      </Box>
    );
  },
);

export const SlideButtonHandleUnchecked = memo(
  ({ start, size = defaultSlideButtonSize }: SlideButtonHandleUncheckedProps) => {
    const sizeConfig = slideButtonSizes[size];

    return (
      <Box
        alignItems="center"
        height="100%"
        justifyContent="center"
        padding={sizeConfig.handlePadding}
        pin="right"
      >
        {start ?? <Icon color="fgInverse" name="forwardArrow" size={sizeConfig.iconSize} />}
      </Box>
    );
  },
);

export const DefaultSlideButtonHandle = memo(
  ({
    ref,
    checked,
    size = defaultSlideButtonSize,
    disabled,
    style,
    variant = 'primary',
    startUncheckedNode,
    endCheckedNode,
    checkedLabel,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    ...props
  }: SlideButtonHandleProps & {
    ref?: React.Ref<View>;
  }) => {
    const backgroundColor = variants[variant].background;

    const checkedOpacity = useSharedValue(checked ? 1 : 0);
    const uncheckedOpacity = useSharedValue(checked ? 0 : 1);

    useEffect(() => {
      if (checked) {
        uncheckedOpacity.value = withSpring(0, slideButtonSpringConfig);
        checkedOpacity.value = withDelay(100, withSpring(1, slideButtonSpringConfig));
      } else {
        checkedOpacity.value = 0;
        uncheckedOpacity.value = withDelay(100, withSpring(1, slideButtonSpringConfig));
      }
    }, [checked, checkedOpacity, uncheckedOpacity]);

    const containerStyle = useMemo(() => [styles.base, style], [style]);
    const animatedCheckedStyle = useAnimatedStyle(
      () => ({ opacity: checkedOpacity.value }),
      [checkedOpacity],
    );
    const animatedUncheckedStyle = useAnimatedStyle(
      () => ({ opacity: uncheckedOpacity.value }),
      [uncheckedOpacity],
    );

    return (
      <Pressable
        ref={ref}
        noScaleOnPress
        background={backgroundColor}
        borderBottomLeftRadius={borderBottomLeftRadius}
        borderBottomRightRadius={borderBottomRightRadius}
        borderRadius={borderRadius}
        borderTopLeftRadius={borderTopLeftRadius}
        borderTopRightRadius={borderTopRightRadius}
        contentStyle={containerStyle}
        disabled={disabled}
        loading={checked}
        {...props}
      >
        <Animated.View style={[styles.absoluteContainer, animatedCheckedStyle]}>
          <SlideButtonHandleChecked
            disabled={disabled}
            end={endCheckedNode}
            label={checkedLabel}
            size={size}
            variant={variant}
          />
        </Animated.View>
        <Animated.View style={[styles.absoluteContainer, animatedUncheckedStyle]}>
          <SlideButtonHandleUnchecked
            disabled={disabled}
            size={size}
            start={startUncheckedNode}
            variant={variant}
          />
        </Animated.View>
      </Pressable>
    );
  },
);
