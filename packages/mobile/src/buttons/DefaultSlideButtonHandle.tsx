import React, { forwardRef, memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { View } from 'react-native';
import { variants } from '@coinbase/cds-common/tokens/button';
import {
  animated,
  type SpringConfig,
  useChain,
  useSpring,
  useSpringRef,
} from '@react-spring/native';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { Spinner } from '../loaders/Spinner';
import { Pressable } from '../system/Pressable';
import { TextHeadline } from '../typography/TextHeadline';

import type { SlideButtonBaseProps, SlideButtonHandleProps } from './SlideButton';

export const animationConfig = { tension: 300, clamp: true } as const satisfies SpringConfig;

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
    const handleWidth = compact ? 40 : 56;

    return (
      <Box alignItems="center" height="100%" justifyContent="center" width="100%">
        {typeof label !== 'string' ? label : <TextHeadline color="fgInverse">{label}</TextHeadline>}
        <Box
          alignItems="center"
          height="100%"
          justifyContent="center"
          pin="right"
          width={handleWidth}
        >
          {end ?? <Spinner color={theme.color.fgInverse} size="small" />}
        </Box>
      </Box>
    );
  },
);

export const SlideButtonHandleUnchecked = memo(
  ({ start, compact }: SlideButtonHandleUncheckedProps) => {
    const iconSize = compact ? 's' : 'm';
    const handleWidth = compact ? 40 : 56;

    return (
      <Box
        alignItems="center"
        height="100%"
        justifyContent="center"
        pin="right"
        width={handleWidth}
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

      const checkedSpringRef = useSpringRef();
      const uncheckedSpringRef = useSpringRef();
      const checkedSpring = useSpring({
        opacity: checked ? 1 : 0,
        ref: checkedSpringRef,
        config: animationConfig,
        immediate: !checked,
      });
      const uncheckedSpring = useSpring({
        opacity: checked ? 0 : 1,
        ref: uncheckedSpringRef,
        config: animationConfig,
      });
      useChain(
        checked ? [uncheckedSpringRef, checkedSpringRef] : [checkedSpringRef, uncheckedSpringRef],
        [0, 0.1],
      );

      const containerStyle = useMemo(() => [styles.base, style], [style]);
      const animatedCheckedStyle = useMemo(
        () => [styles.absoluteContainer, { opacity: checkedSpring.opacity }],
        [checkedSpring],
      );
      const animatedUncheckedStyle = useMemo(
        () => [styles.absoluteContainer, { opacity: uncheckedSpring.opacity }],
        [uncheckedSpring],
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
          <animated.View style={animatedCheckedStyle}>
            <SlideButtonHandleChecked
              compact={compact}
              disabled={disabled}
              end={endCheckedNode}
              label={checkedLabel}
              variant={variant}
            />
          </animated.View>
          <animated.View style={animatedUncheckedStyle}>
            <SlideButtonHandleUnchecked
              compact={compact}
              disabled={disabled}
              start={startUncheckedNode}
              variant={variant}
            />
          </animated.View>
        </Pressable>
      );
    },
  ),
);
