import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  type LayoutRectangle,
  type StyleProp,
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
import type { DotOverlap } from '@coinbase/cds-common/types/DotBaseProps';
import type {
  DotCountPinPlacement,
  DotCountVariants,
} from '@coinbase/cds-common/types/DotCountBaseProps';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import {
  MAX_OVERFLOW_COUNT,
  parseDotCountMaxOverflow,
} from '@coinbase/cds-common/utils/parseDotCountMaxOverflow';

import { useComponentConfig } from '../hooks/useComponentConfig';
import type { DotPinStylesKey } from '../hooks/useDotPinStyles';
import { useDotPinStyles } from '../hooks/useDotPinStyles';
import { Box, type BoxBaseProps } from '../layout/Box';
import { convertMotionConfigs } from '../motion/convertMotionConfig';
import { withMotionTiming } from '../motion/withMotionTiming';
import { Text } from '../typography/Text';

import { getTransform } from './dotStyles';
import { useDotsLayout } from './useDotsLayout';

// Re-exporting for backwards compatibility
export { MAX_OVERFLOW_COUNT, parseDotCountMaxOverflow };

const AnimatedBox = Animated.createAnimatedComponent(Box);

const [opacityEnter, opacityExit, scaleEnter, scaleExit] = convertMotionConfigs([
  dotOpacityEnterConfig,
  dotOpacityExitConfig,
  dotScaleEnterConfig,
  dotScaleExitConfig,
]);

const variantColorMap: Record<DotCountVariants, ThemeVars.Color> = {
  negative: 'bgNegative',
};

export type DotCountBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Omit<BoxBaseProps, 'children' | 'background' | 'pin' | 'style' | 'height'> & {
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
    /**
     * Fixed height of the DotCount badge container. Width grows based on content length.
     * @default 24
     */
    height?: BoxBaseProps['height'];
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

export const DotCount = memo((_props: DotCountProps) => {
  const mergedProps = useComponentConfig('DotCount', _props);
  const {
    children,
    pin,
    variant = 'negative',
    count,
    max,
    height = dotCountSize,
    width,
    testID = 'dot-count',
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityHint,
    overlap,
    style,
    styles,
    alignItems = 'center',
    justifyContent = 'center',
    paddingX = 0.75,
    borderWidth = 100,
    borderRadius = 400,
    borderColor = 'bgSecondary',
    font = 'caption',
    color = 'fgInverse',
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    overflow = 'hidden',
    ...props
  } = mergedProps;
  const [childrenSize, onChildrenLayout] = useDotsLayout();
  const transforms = useDotPinStyles(
    childrenSize,
    { width: width ?? height, height } as LayoutRectangle,
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
    () => [animatedStyles, styles?.container],
    [animatedStyles, styles?.container],
  );

  const rootStyles = useMemo(() => [style, styles?.root], [styles?.root, style]);

  const displayCount = useMemo(
    () => parseDotCountMaxOverflow(countInternal, max),
    [countInternal, max],
  );

  // only check childrenSize when children is defined
  const shouldShow = children !== undefined ? childrenSize !== null : true;

  return (
    <View
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityLabelledBy={accessibilityLabelledBy}
      style={rootStyles}
      testID={testID}
    >
      <View onLayout={onChildrenLayout} testID={`${testID}-children`}>
        {children}
      </View>
      {!shouldUnmount && shouldShow && (
        <View style={pinStyles}>
          <AnimatedBox
            animated
            alignItems={alignItems}
            background={variantColorMap[variant]}
            borderColor={borderColor}
            borderRadius={borderRadius}
            borderWidth={borderWidth}
            height={height}
            justifyContent={justifyContent}
            minWidth={height}
            overflow={overflow}
            paddingX={paddingX}
            style={dotCountContainerStyle}
            testID="dotcount-container"
            width={width}
            {...props}
          >
            <Text
              color={color}
              font={font}
              fontFamily={fontFamily}
              fontSize={fontSize}
              fontWeight={fontWeight}
              lineHeight={lineHeight}
              style={styles?.text}
            >
              {displayCount}
            </Text>
          </AnimatedBox>
        </View>
      )}
    </View>
  );
});
