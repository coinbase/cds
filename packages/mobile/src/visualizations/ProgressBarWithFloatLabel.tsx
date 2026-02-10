import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  I18nManager,
  type LayoutChangeEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { animateProgressBaseSpec } from '@coinbase/cds-common/animation/progress';
import { usePreviousValues } from '@coinbase/cds-common/hooks/usePreviousValues';
import type { Placement } from '@coinbase/cds-common/types';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { useLayout } from '../hooks/useLayout';
import { Box, VStack } from '../layout';

import { getProgressBarLabelParts, type ProgressBarLabel } from './getProgressBarLabelParts';
import { type ProgressBaseProps } from './ProgressBar';
import { ProgressTextLabel } from './ProgressTextLabel';

export type ProgressBarFloatLabelProps = Pick<
  ProgressBarWithFloatLabelProps,
  'label' | 'progress' | 'disableAnimateOnMount' | 'disabled' | 'labelPlacement' | 'styles'
>;

const ProgressBarFloatLabel = memo(
  ({
    label,
    disabled,
    progress,
    disableAnimateOnMount,
    labelPlacement,
    styles,
  }: ProgressBarFloatLabelProps) => {
    const [textWidth, setTextWidth] = useState<number>(-1);
    const { addPreviousValue: addPreviousPercent } = usePreviousValues<number>([
      disableAnimateOnMount ? progress : 0,
    ]);
    const [size, onLayout] = useLayout();
    const containerWidth = size.width;
    const [hasAnimationMounted, setHasAnimationMounted] = useState(!disableAnimateOnMount);
    const animatedProgress = useMemo(() => new Animated.Value(0), []);

    addPreviousPercent(progress);

    const { value: labelNum, render: renderLabel } = getProgressBarLabelParts(label);

    useEffect(() => {
      if (containerWidth > 0 && textWidth > -1) {
        if (!hasAnimationMounted && disableAnimateOnMount) {
          animatedProgress.setValue(progress);
          setHasAnimationMounted(true);
        } else {
          Animated.timing(
            animatedProgress,
            convertMotionConfig({
              toValue: progress,
              ...animateProgressBaseSpec,
              useNativeDriver: true,
            }),
          )?.start();
        }
      }
    }, [
      progress,
      containerWidth,
      textWidth,
      animatedProgress,
      disableAnimateOnMount,
      hasAnimationMounted,
    ]);

    const handleTextLayout = useCallback((event: LayoutChangeEvent) => {
      setTextWidth(event.nativeEvent.layout.width);
    }, []);

    const containerStyle = useMemo(() => [styles?.labelContainer], [styles?.labelContainer]);

    const labelStyle = useMemo(
      () => [
        {
          opacity: hasAnimationMounted ? 1 : 0,
          transform: [
            {
              translateX: animatedProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  I18nManager.isRTL ? containerWidth - textWidth : 0,
                  I18nManager.isRTL ? 0 : containerWidth - textWidth,
                ],
              }),
            },
          ],
        },
      ],
      [containerWidth, textWidth, hasAnimationMounted, animatedProgress],
    );

    return (
      <Box
        flexWrap="nowrap"
        onLayout={onLayout}
        paddingBottom={labelPlacement === 'above' ? 1 : 0}
        paddingTop={labelPlacement === 'below' ? 1 : 0}
        style={containerStyle}
        testID="cds-progress-bar-float-label-container"
      >
        <Box
          animated
          alignSelf="flex-start"
          flexGrow={0}
          flexShrink={0}
          onLayout={handleTextLayout}
          style={labelStyle}
          testID="cds-progress-bar-float-label"
        >
          <ProgressTextLabel
            color="fgMuted"
            disableAnimateOnMount={disableAnimateOnMount}
            disabled={disabled}
            renderLabel={renderLabel}
            style={styles?.label}
            value={labelNum}
          />
        </Box>
      </Box>
    );
  },
);

export type ProgressBarWithFloatLabelProps = Pick<
  ProgressBaseProps,
  'progress' | 'disableAnimateOnMount' | 'disabled' | 'testID'
> & {
  /** Label that is floated at the end of the filled in bar. If a number is used then it will format it as a percentage. */
  label: ProgressBarLabel;
  /**
   * Position of label relative to the bar
   * @default above
   * */
  labelPlacement?: Extract<Placement, 'above' | 'below'>;
  style?: StyleProp<ViewStyle>;
  /** Custom styles for individual elements of the ProgressBarWithFloatLabel component */
  styles?: {
    /** Root element */
    root?: StyleProp<ViewStyle>;
    /** Label container element */
    labelContainer?: StyleProp<ViewStyle>;
    /** Label element */
    label?: StyleProp<TextStyle>;
  };
};

export const ProgressBarWithFloatLabel: React.FC<
  React.PropsWithChildren<ProgressBarWithFloatLabelProps>
> = memo(
  ({
    label,
    labelPlacement = 'above',
    progress,
    disableAnimateOnMount,
    disabled,
    children,
    testID,
    style,
    styles,
  }) => {
    const rootStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);

    const progressBarFloatLabel = (
      <ProgressBarFloatLabel
        disableAnimateOnMount={disableAnimateOnMount}
        disabled={disabled}
        label={label}
        labelPlacement={labelPlacement}
        progress={progress}
        styles={styles}
      />
    );

    return (
      <VStack style={rootStyle} testID={testID}>
        {labelPlacement === 'above' && progressBarFloatLabel}
        {children}
        {labelPlacement === 'below' && progressBarFloatLabel}
      </VStack>
    );
  },
);
