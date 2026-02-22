import React, { forwardRef, memo, useEffect, useMemo } from 'react';
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

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { Spinner } from '../loaders/Spinner';
import { Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

import type { SlideButtonBaseProps, SlideButtonHandleProps } from './SlideButton';

export const slideButtonSpringConfig = {
  stiffness: 300,
  damping: 26,
  mass: 1,
  overshootClamping: true,
} as const satisfies WithSpringConfig;

export type SlideButtonHandleCheckedProps = Pick<SlideButtonBaseProps, 'variant' | 'compact'> & {
  label?: React.ReactNode;
  end?: React.ReactNode;
  disabled?: boolean;
};

export type SlideButtonHandleCheckedComponent = (
  props: SlideButtonHandleCheckedProps,
) => React.ReactElement | null;

export type SlideButtonHandleUncheckedProps = Pick<SlideButtonBaseProps, 'variant' | 'compact'> & {
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
  ({ label, end, compact }: SlideButtonHandleCheckedProps) => {
    const theme = useTheme();
    const iconSize = compact ? 's' : 'm';
    const iconSizeValue = theme.iconSize[iconSize];

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
          padding={compact ? 1.5 : 2}
          pin="right"
        >
          {end ?? (
            <Spinner
              color={theme.color.fgInverse}
              // use icon size dimensions for spinner width/height
              // native ActivityIndicator uses it's own sizes/dimensions that do not align with the CDS theme
              // couples the customization of this element with the Unchecked variant component (i.e. icon size theme var)
              // see: CDS-1590
              style={{ height: iconSizeValue, width: iconSizeValue }}
            />
          )}
        </Box>
      </Box>
    );
  },
);

export const SlideButtonHandleUnchecked = memo(
  ({ start, compact }: SlideButtonHandleUncheckedProps) => {
    const theme = useTheme();
    const iconSize = compact ? 's' : 'm';

    return (
      <Box
        alignItems="center"
        height="100%"
        justifyContent="center"
        padding={compact ? 1.5 : 2}
        pin="right"
      >
        {start ?? <Icon color="fgInverse" name="forwardArrow" size={iconSize} />}
      </Box>
    );
  },
);

export const DefaultSlideButtonHandle = memo(
  forwardRef<View, SlideButtonHandleProps>(
    (
      {
        checked,
        compact,
        disabled,
        style,
        variant = 'primary',
        startUncheckedNode,
        endCheckedNode,
        checkedLabel,
        borderRadius,
        ...props
      },
      ref,
    ) => {
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
          borderRadius={borderRadius}
          contentStyle={containerStyle}
          disabled={disabled}
          loading={checked}
          {...props}
        >
          <Animated.View style={[styles.absoluteContainer, animatedCheckedStyle]}>
            <SlideButtonHandleChecked
              compact={compact}
              disabled={disabled}
              end={endCheckedNode}
              label={checkedLabel}
              variant={variant}
            />
          </Animated.View>
          <Animated.View style={[styles.absoluteContainer, animatedUncheckedStyle]}>
            <SlideButtonHandleUnchecked
              compact={compact}
              disabled={disabled}
              start={startUncheckedNode}
              variant={variant}
            />
          </Animated.View>
        </Pressable>
      );
    },
  ),
);
