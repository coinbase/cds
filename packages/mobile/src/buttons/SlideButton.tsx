import React, { forwardRef, memo, useCallback, useId, useMemo } from 'react';
import { type AccessibilityActionEvent, type StyleProp, View, type ViewStyle } from 'react-native';
import type { ForwardedRef } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { interactableHeight } from '@coinbase/cds-common/tokens/interactableHeight';
import type { ButtonVariant } from '@coinbase/cds-common/types';
import type { SpringValue } from '@react-spring/native';
import { animated, to, useSpring } from '@react-spring/native';

import { useLayout } from '../hooks/useLayout';
import type { PressableProps } from '../system/Pressable';

import { DefaultSlideButtonBackground } from './DefaultSlideButtonBackground';
import { animationConfig, DefaultSlideButtonHandle } from './DefaultSlideButtonHandle';

export const slideButtonTestID = 'slide-button';

export type SlideButtonBackgroundProps = Pick<
  SlideButtonBaseProps,
  'borderRadius' | 'checked' | 'compact' | 'disabled' | 'uncheckedLabel' | 'variant'
> & {
  progress: SpringValue<number>;
  style?: StyleProp<ViewStyle>;
};

export type SlideButtonHandleProps = PressableProps &
  Pick<
    SlideButtonBaseProps,
    | 'checked'
    | 'checkedLabel'
    | 'compact'
    | 'disabled'
    | 'startUncheckedNode'
    | 'endCheckedNode'
    | 'variant'
  > & {
    progress: SpringValue<number>;
    style?: StyleProp<ViewStyle>;
  };

export type SlideButtonHandleComponent = React.FC<SlideButtonHandleProps>;
export type SlideButtonBackgroundComponent = React.FC<SlideButtonBackgroundProps>;

export type SlideButtonBaseProps = Omit<PressableProps, 'loading'> & {
  /**
   * Control whether the button is in a checked state.
   */
  checked: boolean;
  /**
   * Callback function fired when slide button state changes.
   * Will always be called after `onSlideComplete` and before `onSlideEnd`.
   */
  onChange?: (checked: boolean) => void;
  /**
   * Label or content shown when button is in unchecked state.
   */
  uncheckedLabel?: React.ReactNode;
  /**
   * Label or content shown when button is in checked state.
   */
  checkedLabel?: React.ReactNode;
  /**
   * Callback function fired when the slide gesture begins.
   */
  onSlideStart?: () => void;
  /**
   * Callback function fired when the slide gesture is cancelled.
   * This occurs when a user slides less than the threshold required to complete the action.
   * Will always be called before `onSlideEnd`.
   */
  onSlideCancel?: () => void;
  /**
   * Callback function fired when the slide gesture ends.
   * Will always be called last in the slide sequence.
   */
  onSlideEnd?: () => void;
  /**
   * Callback function fired when the slide gesture ends successfully.
   * This is called when the user has slid past the threshold to complete the action.
   * Will always be called before `onSlideEnd` and after `onChange`.
   */
  onSlideComplete?: () => void;
  /**
   * Disables user interaction with the slide button.
   * When true, prevents gesture events from firing.
   */
  disabled?: boolean;
  /**
   * Reduces the height, borderRadius and inner padding within the button.
   */
  compact?: boolean;
  /**
   * Height of the entire button component (background and handle).
   * If you pass a custom SlideButtonBackgroundComponent or SlideButtonHandleComponent,
   * this property will be applied to both.
   */
  height?: number;
  /**
   * Toggle design and visual variants of the slide button.
   * @default 'primary'
   */
  variant?: Extract<ButtonVariant, 'primary' | 'positive' | 'negative'>;
  /**
   * Custom component to render as the sliding handle.
   * @default DefaultSlideButtonHandle
   */
  SlideButtonHandleComponent?: SlideButtonHandleComponent;
  /**
   * Custom component to render as the container behind the sliding handle.
   * @default DefaultSlideButtonBackground
   */
  SlideButtonBackgroundComponent?: SlideButtonBackgroundComponent;
  /**
   * Threshold (as a percentage from 0 to 1) at which a slide gesture will complete.
   * A value of 0.7 means the user must slide 70% of the way across to trigger completion.
   * @default 0.7
   */
  checkThreshold?: number;
  /**
   * If true, the slide button will automatically complete the slide when the threshold is met.
   * If false, the user must release to complete the action.
   */
  autoCompleteSlideOnThresholdMet?: boolean;
  /** Custom styles for individual elements of the SlideButton component */
  styles?: {
    /** Container element */
    container?: StyleProp<ViewStyle>;
    /** Background element */
    background?: StyleProp<ViewStyle>;
    /** Handle element */
    handle?: StyleProp<ViewStyle>;
  };
  /**
   * Custom start node to render for the unchecked state of
   * the handle, to replace the default arrow icon.
   */
  startUncheckedNode?: React.ReactNode;
  /**
   * Custom end node to render for the checked state of
   * the handle, to replace the default loading indicator.
   */
  endCheckedNode?: React.ReactNode;
};

export type SlideButtonProps = SlideButtonBaseProps;

export const SlideButton = memo(
  forwardRef(
    (
      {
        checked,
        compact,
        borderRadius = compact ? 700 : 900,
        uncheckedLabel,
        checkedLabel,
        onSlideStart,
        onSlideCancel,
        onSlideEnd,
        onSlideComplete,
        onChange,
        disabled,
        height,
        checkThreshold = 0.7,
        SlideButtonHandleComponent = DefaultSlideButtonHandle,
        SlideButtonBackgroundComponent = DefaultSlideButtonBackground,
        styles,
        testID = slideButtonTestID,
        autoCompleteSlideOnThresholdMet,
        variant = 'primary',
        startUncheckedNode,
        endCheckedNode,
        ...props
      }: SlideButtonProps,
      ref: ForwardedRef<View>,
    ) => {
      const labelId = useId();
      const [containerSize, onLayout] = useLayout();

      const { progress } = useSpring({ progress: checked ? 1 : 0, config: animationConfig });

      const buttonMinHeight = interactableHeight[compact ? 'compact' : 'regular'];
      const buttonMinWidth = buttonMinHeight;

      const handleComplete = useCallback(() => {
        void progress.start(1);
        onChange?.(true);
        onSlideComplete?.();
        onSlideEnd?.();
      }, [progress, onSlideComplete, onChange, onSlideEnd]);

      const handleAccessibilityAction = useCallback(
        (event: AccessibilityActionEvent) => {
          if (event.nativeEvent.actionName === 'activate' && !checked && !disabled) {
            handleComplete();
          }
        },
        [checked, disabled, handleComplete],
      );

      const accessibilityActions = useMemo(
        () => (!checked && !disabled ? [{ name: 'activate' }] : undefined),
        [checked, disabled],
      );

      const accessibilityLabel = useMemo(
        () => (checked ? checkedLabel : uncheckedLabel),
        [checked, checkedLabel, uncheckedLabel],
      );

      const panGesture = useMemo(
        () =>
          Gesture.Pan()
            .onStart(() => {
              if (checked || disabled) return;
              onSlideStart?.();
            })
            .onUpdate(({ translationX }) => {
              if (checked || disabled) return;

              const newWidth = (buttonMinWidth + translationX) / containerSize.width;
              const thresholdReached = newWidth >= checkThreshold;

              if (thresholdReached && autoCompleteSlideOnThresholdMet) {
                handleComplete();
                return;
              }

              const progressValue = autoCompleteSlideOnThresholdMet
                ? newWidth
                : Math.min(1, newWidth);
              void progress.set(progressValue);
            })
            .onEnd(({ translationX }) => {
              if (checked || disabled) return;

              const newWidth = (buttonMinWidth + translationX) / containerSize.width;

              if (newWidth >= checkThreshold) {
                handleComplete();
                return;
              }

              void progress.start(0);
              onSlideCancel?.();
              onSlideEnd?.();
            })
            .withTestId(testID)
            .runOnJS(true),
        [
          testID,
          checked,
          disabled,
          onSlideStart,
          buttonMinWidth,
          containerSize.width,
          autoCompleteSlideOnThresholdMet,
          checkThreshold,
          handleComplete,
          progress,
          onSlideCancel,
          onSlideEnd,
        ],
      );

      const containerStyle = useMemo(
        () => [
          { height: height ?? buttonMinHeight, width: '100%', position: 'relative' } as const,
          styles?.container,
        ],
        [height, buttonMinHeight, styles?.container],
      );

      const animatedStyle = useMemo(
        () =>
          ({
            position: 'absolute',
            height: height ?? buttonMinHeight,
            minWidth: buttonMinWidth,
            width: to(progress, (value) => `${value * 100}%`),
          }) as const,
        [height, buttonMinHeight, buttonMinWidth, progress],
      );

      return (
        <View ref={ref} id={labelId} onLayout={onLayout} style={containerStyle} testID={testID}>
          <SlideButtonBackgroundComponent
            borderRadius={borderRadius}
            checked={checked}
            compact={compact}
            disabled={disabled}
            progress={progress}
            style={styles?.background}
            uncheckedLabel={uncheckedLabel}
            variant={variant}
          />
          <GestureDetector gesture={panGesture}>
            <animated.View style={animatedStyle}>
              <SlideButtonHandleComponent
                accessible
                accessibilityActions={accessibilityActions}
                {...(typeof accessibilityLabel === 'string'
                  ? { accessibilityLabel }
                  : { accessibilityLabelledBy: labelId })}
                borderRadius={borderRadius}
                checked={checked}
                checkedLabel={checkedLabel}
                compact={compact}
                disabled={disabled}
                endCheckedNode={endCheckedNode}
                onAccessibilityAction={handleAccessibilityAction}
                progress={progress}
                startUncheckedNode={startUncheckedNode}
                style={styles?.handle}
                testID={`${testID}-handle`}
                variant={variant}
                {...props}
              />
            </animated.View>
          </GestureDetector>
        </View>
      );
    },
  ),
);
