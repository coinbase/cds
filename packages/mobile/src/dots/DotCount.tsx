import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  type LayoutRectangle,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import {
  dotOpacityEnterConfig,
  dotOpacityExitConfig,
  dotScaleEnterConfig,
  dotScaleExitConfig,
} from '@coinbase/cds-common/motion/dot';
import { dotCountSize } from '@coinbase/cds-common/tokens/dot';
import type {
  DotCountPinPlacement,
  DotCountVariants,
  DotOverlap,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';

import type { DotPinStylesKey } from '../hooks/useDotPinStyles';
import { useDotPinStyles } from '../hooks/useDotPinStyles';
import { useTheme } from '../hooks/useTheme';
import { convertMotionConfigs } from '../motion/convertMotionConfig';
import { withMotionTiming } from '../motion/withMotionTiming';
import { Text } from '../typography/Text';

import { getTransform } from './dotStyles';
import { useDotsLayout } from './useDotsLayout';

// If a badge count is greater than max (optional, defaults at 99), it should
// truncate the numbers so its x+.
export const MAX_OVERFLOW_COUNT = 99;

export const parseDotCountMaxOverflow = (count: number, max: number = MAX_OVERFLOW_COUNT) => {
  return count <= max ? count : `${max}+`;
};

const [opacityEnter, opacityExit, scaleEnter, scaleExit] = convertMotionConfigs([
  dotOpacityEnterConfig,
  dotOpacityExitConfig,
  dotScaleEnterConfig,
  dotScaleExitConfig,
]);

const dotTextPaddingHorizontal = 6;

const variantColorMap: Record<DotCountVariants, ThemeVars.Color> = {
  negative: 'bgNegative',
};

export type DotCountBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    /**
     * The number value to be shown in the dot. If count is <= 0, dot will not show up.
     *  */
    count: number;
    /**
     * If a badge count is greater than max, it will truncate the numbers so its max+
     * @default 99
     *  */
    max?: number;
    /**
     * Background color of dot
     * @default negative
     * */
    variant?: DotCountVariants;
    /** Position of dot relative to its parent */
    pin?: DotCountPinPlacement;
    /** Children of where the dot will anchor to */
    children?: React.ReactNode;
    /** Indicates what shape Dot is overlapping */
    overlap?: DotOverlap;
  };

export type DotCountProps = DotCountBaseProps & {
  style?: StyleProp<ViewStyle>;
  /** Custom styles for individual elements of the DotCount component */
  styles?: {
    /** Root element */
    root?: StyleProp<ViewStyle>;
    /** Container element */
    container?: StyleProp<ViewStyle>;
    /** Text element */
    text?: StyleProp<TextStyle>;
  };
};

export const DotCount = memo(
  ({
    children,
    pin,
    variant = 'negative',
    count,
    max,
    overlap,
    style,
    styles,
    ...props
  }: DotCountProps) => {
    const theme = useTheme();
    const [childrenSize, onChildrenLayout] = useDotsLayout();
    const transforms = useDotPinStyles(
      childrenSize,
      { width: dotCountSize + dotTextPaddingHorizontal, height: dotCountSize } as LayoutRectangle,
      overlap,
    );

    const opacityAnimatedValue = useSharedValue(opacityEnter.fromValue);
    const scaleAnimatedValue = useSharedValue(scaleEnter.fromValue);
    const [shouldUnmount, setShouldUnmount] = useState(count === 0);
    const [countInternal, setCountInternal] = useState(count);
    const prevCount = usePreviousValue<number>(count);

    const pinStyles: ViewStyle = useMemo(() => {
      if (pin && transforms !== null) {
        const [vertical, horizontal] = (pin as string).split('-');

        return getTransform(
          transforms[horizontal as DotPinStylesKey],
          transforms[vertical as DotPinStylesKey],
        );
      }
      return {};
    }, [pin, transforms]);

    const containerStyles = useMemo(() => {
      return [
        styleSheet.container,
        {
          borderColor: theme.color.bgSecondary,
          backgroundColor: theme.color[variantColorMap[variant]],
        },
      ];
    }, [theme.color, variant]);

    // avoid displaying 0 during animations and preserve exit animation
    useEffect(() => {
      if (count !== 0) {
        setCountInternal(count);
      }
    }, [count]);

    useAnimatedReaction(
      () => count,
      (result) => {
        // play enter animation
        if ((prevCount === 0 || prevCount === undefined) && result > 0) {
          runOnJS(setShouldUnmount)(false);
          opacityAnimatedValue.value = withMotionTiming(opacityEnter);
          scaleAnimatedValue.value = withMotionTiming(scaleEnter);
        }

        // play exit animation
        if (prevCount && prevCount > 0 && result === 0) {
          opacityAnimatedValue.value = withMotionTiming(opacityExit, () => {
            runOnJS(setShouldUnmount)(true);
          });
          scaleAnimatedValue.value = withMotionTiming(scaleExit);
        }
      },
      [count, childrenSize],
    );

    const animatedStyles = useAnimatedStyle(() => {
      return {
        opacity: Number(opacityAnimatedValue.value),
        transform: [{ scale: Number(scaleAnimatedValue.value) }],
      };
    });

    const dotCountContainerStyle = useMemo(
      () => [containerStyles, animatedStyles, styles?.container],
      [containerStyles, animatedStyles, styles?.container],
    );

    const textStyles = useMemo(
      () => [{ paddingHorizontal: dotTextPaddingHorizontal }, styles?.text],
      [styles?.text],
    );

    const rootStyles = useMemo(() => [style, styles?.root], [styles?.root, style]);

    // only check childrenSize when children is defined
    const shouldShow = children !== undefined ? childrenSize !== null : true;

    return (
      <View style={rootStyles} {...props}>
        <View onLayout={onChildrenLayout} testID={`${props.testID}-children`}>
          {children}
        </View>
        {!shouldUnmount && shouldShow && (
          <View style={pinStyles}>
            <Animated.View style={dotCountContainerStyle} testID="dotcount-container">
              <Text color="fgInverse" font="caption" style={textStyles}>
                {parseDotCountMaxOverflow(countInternal, max)}
              </Text>
            </Animated.View>
          </View>
        )}
      </View>
    );
  },
);

const styleSheet = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderWidth: 1,
    minWidth: dotCountSize,
    height: dotCountSize,
    borderRadius: 16,
  },
});
