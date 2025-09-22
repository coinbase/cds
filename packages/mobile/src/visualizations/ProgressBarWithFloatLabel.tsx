import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  I18nManager,
  type LayoutChangeEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import type { Placement } from '@cbhq/cds-common/types';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { useLayout } from '../hooks/useLayout';
import { Box, VStack } from '../layout';

import { getProgressBarLabelParts, type ProgressBarLabel } from './getProgressBarLabelParts';
import { type ProgressBaseProps } from './ProgressBar';
import { ProgressTextLabel } from './ProgressTextLabel';

export type ProgressBarFloatLabelProps = Pick<
  ProgressBarWithFloatLabelProps,
  'label' | 'progress' | 'disabled' | 'labelPlacement' | 'styles'
>;

const ProgressBarFloatLabel = memo(
  ({ label, disabled, progress, labelPlacement, styles }: ProgressBarFloatLabelProps) => {
    const [textWidth, setTextWidth] = useState<number>(-1);
    const { getPreviousValue: getPreviousPercent, addPreviousValue: addPreviousPercent } =
      usePreviousValues<number>([0]);
    const [size, onLayout] = useLayout();
    const containerWidth = size.width;

    addPreviousPercent(progress);
    const previousPercent = getPreviousPercent() ?? 0;

    const animatedProgress = useRef(new Animated.Value(previousPercent));

    const { value: labelNum, render: renderLabel } = getProgressBarLabelParts(label);

    useEffect(() => {
      if (containerWidth > 0 && textWidth > -1) {
        Animated.timing(
          animatedProgress.current,
          convertMotionConfig({
            toValue: progress,
            ...animateProgressBaseSpec,
            useNativeDriver: true,
          }),
        )?.start();
      }
    }, [progress, animatedProgress, containerWidth, textWidth, addPreviousPercent]);

    const handleTextLayout = useCallback((event: LayoutChangeEvent) => {
      setTextWidth(event.nativeEvent.layout.width);
    }, []);

    const containerStyle = useMemo(() => [styles?.labelContainer], [styles?.labelContainer]);

    const labelStyle = useMemo(
      () => [
        {
          transform: [
            {
              translateX: animatedProgress.current.interpolate({
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
      [containerWidth, textWidth],
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
  'progress' | 'disabled' | 'testID'
> & {
  /** Label that is floated at the end of the filled in bar. If a number is used then it will format it as a percentage. */
  label: ProgressBarLabel;
  /**
   * Position of label relative to the bar
   * @default above
   * */
  labelPlacement?: Extract<Placement, 'above' | 'below'>;
  /**
   * Custom styles for the progress bar with float label root.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom styles for the progress bar with float label.
   */
  styles?: {
    /**
     * Custom styles for the progress bar with float label root.
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the label container.
     */
    labelContainer?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the label.
     */
    label?: StyleProp<TextStyle>;
  };
};

export const ProgressBarWithFloatLabel: React.FC<
  React.PropsWithChildren<ProgressBarWithFloatLabelProps>
> = memo(
  ({ label, labelPlacement = 'above', progress, disabled, children, testID, style, styles }) => {
    const rootStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);

    const progressBarFloatLabel = (
      <ProgressBarFloatLabel
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
