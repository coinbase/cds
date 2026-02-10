import React, { forwardRef, memo, useEffect, useMemo, useState } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useHasMounted } from '@coinbase/cds-common/hooks/useHasMounted';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { containsStep, flattenSteps, isStepVisited } from '@coinbase/cds-common/stepper/utils';
import type { IconName } from '@coinbase/cds-common/types';
import {
  type SpringConfig,
  type SpringValue as SpringValueType,
  useSprings,
} from '@react-spring/native';

import type { IconProps } from '../icons/Icon';
import { Box, type BoxBaseProps, type BoxProps } from '../layout/Box';
import { VStack } from '../layout/VStack';

import { DefaultStepperHeaderHorizontal } from './DefaultStepperHeaderHorizontal';
import { DefaultStepperIconVertical } from './DefaultStepperIconVertical';
import { DefaultStepperLabelVertical } from './DefaultStepperLabelVertical';
import { DefaultStepperProgressHorizontal } from './DefaultStepperProgressHorizontal';
import { DefaultStepperProgressVertical } from './DefaultStepperProgressVertical';
import { DefaultStepperStepHorizontal } from './DefaultStepperStepHorizontal';
import { DefaultStepperStepVertical } from './DefaultStepperStepVertical';
import { DefaultStepperSubstepContainerHorizontal } from './DefaultStepperSubstepContainerHorizontal';
import { DefaultStepperSubstepContainerVertical } from './DefaultStepperSubstepContainerVertical';

/** Data that represents a single step within a Stepper.*/
export type StepperValue<Metadata extends Record<string, unknown> = Record<string, unknown>> = {
  /** A unique indetifier of the step. This is used to reference the Stepper's active step. */
  id: string;
  /** The text or ReactNode displayed within the Stepper's Label subcomponent. */
  label?: React.ReactNode;
  accessibilityLabel?: string;
  /** Optional step metadata which is passed to the the Stepper subcomponents. */
  metadata?: Metadata;
  subSteps?: StepperValue<Metadata>[];
  Component?: StepperStepComponent<Metadata> | null;
  StepperSubstepContainerComponent?: StepperSubstepContainerComponent<Metadata> | null;
  StepperIconComponent?: StepperIconComponent<Metadata> | null;
  StepperLabelComponent?: StepperLabelComponent<Metadata> | null;
  StepperProgressComponent?: StepperProgressComponent<Metadata> | null;
  StepperHeaderComponent?: StepperHeaderComponent<Metadata> | null;
};

// ------------ SUBCOMPONENT PROPS ------------
/** Props shared by most of Stepper's subcomponents. */
type StepperSubcomponentProps<Metadata extends Record<string, unknown> = Record<string, unknown>> =
  {
    /** The step object being rendered. */
    step: StepperValue<Metadata>;
    /** The parent step of the step being rendered */
    parentStep: StepperValue<Metadata> | null;
    /** The id of the current active step. Can be null if no active step. */
    activeStepId: string | null;
    /** The depth/nesting level of this step (0 = root, 1 = first level sub-step, etc.) */
    depth: number;
    /** Whether the step is the current, active step */
    active: boolean;
    /** Whether the step has been visited */
    visited: boolean;
    /** An array of all step ids in the stepper */
    flatStepIds: string[];
    /** Whether the entire stepper is complete */
    complete?: boolean;
    /** Whether the active step is a descendent of this step */
    isDescendentActive: boolean;
    /** Inline styles for the subcomponent element */
    style?: StyleProp<ViewStyle>;
  };

export type StepperStepProps<Metadata extends Record<string, unknown> = Record<string, unknown>> =
  StepperSubcomponentProps<Metadata> &
    BoxProps & {
      /**
       * An animated SpringValue between 0 and 1.
       * You can use this to animate your own custom Progress subcomponent.
       */
      progress: SpringValueType<number>;
      activeStepLabelElement: View | null;
      setActiveStepLabelElement: (element: View) => void;
      progressSpringConfig?: SpringConfig;
      animate?: boolean;
      disableAnimateOnMount?: boolean;
      completedStepAccessibilityLabel?: string;
      StepperStepComponent?: StepperStepComponent<Metadata>;
      StepperSubstepContainerComponent?: StepperSubstepContainerComponent<Metadata> | null;
      StepperLabelComponent?: StepperLabelComponent<Metadata> | null;
      StepperProgressComponent?: StepperProgressComponent<Metadata> | null;
      StepperIconComponent?: StepperIconComponent<Metadata> | null;
      styles?: {
        step?: StyleProp<ViewStyle>;
        label?: StyleProp<ViewStyle>;
        progress?: StyleProp<ViewStyle>;
        icon?: StyleProp<ViewStyle>;
        header?: StyleProp<ViewStyle>;
        substepContainer?: StyleProp<ViewStyle>;
      };
    };

export type StepperSubstepContainerProps<
  Metadata extends Record<string, unknown> = Record<string, unknown>,
> = StepperSubcomponentProps<Metadata> &
  BoxProps & {
    children: React.ReactNode;
  };

export type StepperHeaderProps<Metadata extends Record<string, unknown> = Record<string, unknown>> =
  BoxProps & {
    activeStep: StepperValue<Metadata> | null;
    flatStepIds: string[];
    complete?: boolean;
    style?: StyleProp<ViewStyle>;
  };

export type StepperLabelProps<Metadata extends Record<string, unknown> = Record<string, unknown>> =
  StepperSubcomponentProps<Metadata> &
    BoxProps & {
      setActiveStepLabelElement: (element: View) => void;
      defaultColor?: ThemeVars.Color;
      activeColor?: ThemeVars.Color;
      descendentActiveColor?: ThemeVars.Color;
      visitedColor?: ThemeVars.Color;
      completeColor?: ThemeVars.Color;
      completedStepAccessibilityLabel?: string;
    };

export type StepperProgressProps<
  Metadata extends Record<string, unknown> = Record<string, unknown>,
> = StepperSubcomponentProps<Metadata> &
  BoxProps & {
    progress: SpringValueType<number>;
    activeStepLabelElement: View | null;
    progressSpringConfig?: SpringConfig;
    animate?: boolean;
    disableAnimateOnMount?: boolean;
    defaultFill?: ThemeVars.Color;
    activeFill?: ThemeVars.Color;
    descendentActiveFill?: ThemeVars.Color;
    visitedFill?: ThemeVars.Color;
    completeFill?: ThemeVars.Color;
  };

export type StepperIconProps<Metadata extends Record<string, unknown> = Record<string, unknown>> =
  StepperSubcomponentProps<Metadata> &
    Omit<IconProps, 'name'> & {
      name?: IconName;
      defaultName?: IconName;
      activeName?: IconName;
      descendentActiveName?: IconName;
      visitedName?: IconName;
      completeName?: IconName;
      defaultColor?: ThemeVars.Color;
      activeColor?: ThemeVars.Color;
      descendentActiveColor?: ThemeVars.Color;
      visitedColor?: ThemeVars.Color;
      completeColor?: ThemeVars.Color;
    };

// ------------ COMPONENT TYPES ------------
export type StepperStepComponent<
  Metadata extends Record<string, unknown> = Record<string, unknown>,
> = React.FC<StepperStepProps<Metadata>>;

export type StepperSubstepContainerComponent<
  Metadata extends Record<string, unknown> = Record<string, unknown>,
> = React.FC<StepperSubstepContainerProps<Metadata>>;

export type StepperLabelComponent<
  Metadata extends Record<string, unknown> = Record<string, unknown>,
> = React.FC<StepperLabelProps<Metadata>>;

export type StepperProgressComponent<
  Metadata extends Record<string, unknown> = Record<string, unknown>,
> = React.FC<StepperProgressProps<Metadata>>;

export type StepperIconComponent<
  Metadata extends Record<string, unknown> = Record<string, unknown>,
> = React.FC<StepperIconProps<Metadata>>;

export type StepperHeaderComponent<
  Metadata extends Record<string, unknown> = Record<string, unknown>,
> = React.FC<StepperHeaderProps<Metadata>>;

// ------------ STEPPER COMPONENT PROPS ------------
export type StepperBaseProps<Metadata extends Record<string, unknown> = Record<string, unknown>> =
  BoxBaseProps & {
    /** An optional accessibility label used to announce a step as complete/visited. Useful for providing an internationalized label for this state.
     * @default "Complete"
     */
    completedStepAccessibilityLabel?: string;
    /** The orientation of the stepper. */
    direction: 'vertical' | 'horizontal';
    /**
     * An array of steps to render.
     * @see StepperValue
     */
    steps: StepperValue<Metadata>[];
    /**
     * The id of the current/active step.
     * Set this to null to visualize a completely unfilled/incomplete Stepper.
     */
    activeStepId: string | null;
    /** Set this to true to visualize a completely filled/complete Stepper */
    complete?: boolean;
    /** An optional component to render in place of the default Step subcomponent. */
    StepperStepComponent?: StepperStepComponent<Metadata>;
    /** An optional component to render in place of the default SubstepContainer subcomponent. */
    StepperSubstepContainerComponent?: StepperSubstepContainerComponent<Metadata> | null;
    /** An optional component to render in place of the default Label subcomponent. Set to null to render nothing in this slot. */
    StepperLabelComponent?: StepperLabelComponent<Metadata> | null;
    /** An optional component to render in place of the default Progress subcomponent. Set to null to render nothing in this slot. */
    StepperProgressComponent?: StepperProgressComponent<Metadata> | null;
    /** An optional component to render in place of the default Icon subcomponent. Set to null to render nothing in this slot. */
    StepperIconComponent?: StepperIconComponent<Metadata> | null;
    /** An optional component to render in place of the default Header subcomponent. Set to null to render nothing in this slot. */
    StepperHeaderComponent?: StepperHeaderComponent<Metadata> | null;
    /** The spring config to use for the progress spring. */
    progressSpringConfig?: SpringConfig;
    /** Whether to animate the progress spring.
     * @default true
     */
    animate?: boolean;
    /** Whether to disable the animation on mount. */
    disableAnimateOnMount?: boolean;
  };

export type StepperProps<Metadata extends Record<string, unknown> = Record<string, unknown>> =
  BoxProps &
    StepperBaseProps<Metadata> & {
      /** Custom styles for individual elements of the Stepper component */
      styles?: {
        /** Root Stepper container element */
        root?: StyleProp<ViewStyle>;
        /** Step subcomponent element */
        step?: StyleProp<ViewStyle>;
        /** Substep container element */
        substepContainer?: StyleProp<ViewStyle>;
        /** Label subcomponent element */
        label?: StyleProp<ViewStyle>;
        /** Progress subcomponent element */
        progress?: StyleProp<ViewStyle>;
        /** Icon subcomponent element */
        icon?: StyleProp<ViewStyle>;
        /** Header subcomponent element */
        header?: StyleProp<ViewStyle>;
      };
    };

export const horizontalStepGap = 0.5;

export const defaultProgressSpringConfig = { friction: 0, tension: 100, clamp: true };

type StepperComponent = <Metadata extends Record<string, unknown> = Record<string, unknown>>(
  props: StepperProps<Metadata> & { ref?: React.Ref<View> },
) => React.ReactElement;

const StepperBase = memo(
  forwardRef(
    <Metadata extends Record<string, unknown> = Record<string, unknown>>(
      {
        direction,
        activeStepId,
        steps,
        complete,
        style,
        completedStepAccessibilityLabel = 'Complete',
        styles,
        gap = direction === 'vertical' ? undefined : horizontalStepGap,
        accessibilityLabel: accessibilityLabelProp,
        StepperStepComponent = direction === 'vertical'
          ? (DefaultStepperStepVertical as StepperStepComponent<Metadata>)
          : (DefaultStepperStepHorizontal as StepperStepComponent<Metadata>),
        StepperSubstepContainerComponent = direction === 'vertical'
          ? (DefaultStepperSubstepContainerVertical as StepperSubstepContainerComponent<Metadata>)
          : (DefaultStepperSubstepContainerHorizontal as StepperSubstepContainerComponent<Metadata>),
        // never show labels below the steps on mobile
        StepperLabelComponent = direction === 'vertical'
          ? (DefaultStepperLabelVertical as StepperLabelComponent<Metadata>)
          : null,
        StepperProgressComponent = direction === 'vertical'
          ? (DefaultStepperProgressVertical as StepperProgressComponent<Metadata>)
          : (DefaultStepperProgressHorizontal as StepperProgressComponent<Metadata>),
        StepperIconComponent = direction === 'vertical'
          ? (DefaultStepperIconVertical as StepperIconComponent<Metadata>)
          : null,
        StepperHeaderComponent = direction === 'vertical'
          ? null
          : (DefaultStepperHeaderHorizontal as StepperHeaderComponent<Metadata>),
        progressSpringConfig = defaultProgressSpringConfig,
        animate = true,
        disableAnimateOnMount,
        ...props
      }: StepperProps<Metadata>,
      ref: React.Ref<View>,
    ) => {
      const hasMounted = useHasMounted();
      const flatStepIds = useMemo(() => flattenSteps(steps).map((step) => step.id), [steps]);

      // Derive activeStep from activeStepId
      const activeStep = useMemo(() => {
        if (!activeStepId) return null;
        return flattenSteps(steps).find((step) => step.id === activeStepId) || null;
      }, [activeStepId, steps]);

      const [activeStepLabelElement, setActiveStepLabelElement] = useState<View | null>(null);

      const activeFlatStepIndex = activeStep ? flatStepIds.indexOf(activeStep.id) : -1;

      const { rootStyle, stepStyles } = useMemo(() => {
        const { root, ...stepStyles } = styles ?? {};
        const rootStyle = [style, root];
        return { rootStyle, stepStyles };
      }, [styles, style]);

      const accessibilityLabel = useMemo(() => {
        if (accessibilityLabelProp) return accessibilityLabelProp;
        if (!activeStep) return 'No active step';

        const pagination = `${activeFlatStepIndex + 1} of ${flatStepIds.length}`;
        const stepLabel = typeof activeStep.label === 'string' ? activeStep.label : null;
        const baseLabel =
          activeStep.accessibilityLabel ?? stepLabel ?? `Step ${activeFlatStepIndex + 1}`;
        return `${baseLabel} ${pagination}`;
      }, [activeStep, activeFlatStepIndex, flatStepIds.length, accessibilityLabelProp]);

      /*
        Due to the possibility of null sub components, the root elements ends up being the best experience in certain cases.
        Specifically, a horizontal stepper or a vertical stepper with no labels.
      */
      const isRootAccessible = direction === 'horizontal' || StepperLabelComponent === null;

      const activeStepIndex = useMemo(() => {
        return activeStepId
          ? steps.findIndex(
              (step) =>
                step.id === activeStepId || containsStep({ step, targetStepId: activeStepId }),
            )
          : -1;
      }, [activeStepId, steps]);

      const previousComplete = usePreviousValue(complete) ?? false;
      const previousActiveStepIndex = usePreviousValue(activeStepIndex) ?? -1;

      const [progressSprings, progressSpringsApi] = useSprings(steps.length, (index) => ({
        progress: complete ? 1 : 0,
        config: progressSpringConfig,
        immediate: !animate || (disableAnimateOnMount && !hasMounted),
      }));

      useEffect(() => {
        // update the previous values for next render
        let stepsToAnimate: number[] = [];
        let isAnimatingForward = false;

        // Case when going from not-complete to complete
        if (Boolean(complete) !== previousComplete) {
          if (complete) {
            // Going to complete: animate from activeStepIndex+1 to end
            stepsToAnimate = Array.from(
              { length: steps.length - activeStepIndex - 1 },
              (_, i) => activeStepIndex + 1 + i,
            );
            isAnimatingForward = true;
          } else {
            // Going from complete: animate from end down to activeStepIndex+1
            stepsToAnimate = Array.from(
              { length: steps.length - activeStepIndex - 1 },
              (_, i) => steps.length - 1 - i,
            );
            isAnimatingForward = false;
          }
        }

        // Case for normal step navigation (e.g. step 1 => step 2)
        else if (activeStepIndex !== previousActiveStepIndex) {
          if (activeStepIndex > previousActiveStepIndex) {
            // Forward: animate from previousActiveStepIndex+1 to activeStepIndex
            stepsToAnimate = Array.from(
              { length: activeStepIndex - previousActiveStepIndex },
              (_, i) => previousActiveStepIndex + 1 + i,
            );
            isAnimatingForward = true;
          } else {
            // Backward: animate from previousActiveStepIndex down to activeStepIndex+1
            stepsToAnimate = Array.from(
              { length: previousActiveStepIndex - activeStepIndex },
              (_, i) => previousActiveStepIndex - i,
            );
            isAnimatingForward = false;
          }
        }

        const animateNextStep = () => {
          if (stepsToAnimate.length === 0) return;
          const stepIndex = stepsToAnimate.shift();
          if (stepIndex === undefined) return;

          progressSpringsApi.start((index) =>
            index === stepIndex
              ? {
                  progress: isAnimatingForward ? 1 : 0,
                  config: progressSpringConfig,
                  onRest: animateNextStep,
                  immediate: !animate || (disableAnimateOnMount && !hasMounted),
                }
              : {},
          );
        };

        // start the animation loop for relevant springs (stepsToAnimate)
        animateNextStep();
      }, [
        progressSpringsApi,
        complete,
        steps.length,
        steps,
        activeStepIndex,
        previousActiveStepIndex,
        previousComplete,
        progressSpringConfig,
        animate,
        disableAnimateOnMount,
        hasMounted,
      ]);

      return (
        <VStack
          ref={ref}
          accessibilityLabel={accessibilityLabel}
          accessible={isRootAccessible}
          style={rootStyle}
          {...props}
        >
          {StepperHeaderComponent && (
            <StepperHeaderComponent
              activeStep={activeStep}
              complete={complete}
              flatStepIds={flatStepIds}
              style={styles?.header}
            />
          )}
          <Box flexDirection={direction === 'vertical' ? 'column' : 'row'} gap={gap}>
            {steps.map((step, index) => {
              const isDescendentActive = activeStepId
                ? containsStep({ step, targetStepId: activeStepId })
                : false;
              const RenderedStepComponent = step.Component ?? StepperStepComponent;
              return (
                RenderedStepComponent && (
                  <RenderedStepComponent
                    key={step.id}
                    StepperIconComponent={StepperIconComponent}
                    StepperLabelComponent={StepperLabelComponent}
                    StepperProgressComponent={StepperProgressComponent}
                    StepperStepComponent={StepperStepComponent}
                    StepperSubstepContainerComponent={StepperSubstepContainerComponent}
                    active={!complete && activeStepId ? step.id === activeStepId : false}
                    activeStepId={activeStepId}
                    activeStepLabelElement={activeStepLabelElement}
                    animate={animate}
                    complete={complete}
                    completedStepAccessibilityLabel={completedStepAccessibilityLabel}
                    depth={0}
                    disableAnimateOnMount={disableAnimateOnMount}
                    flatStepIds={flatStepIds}
                    isDescendentActive={isDescendentActive}
                    parentStep={null}
                    progress={progressSprings[index].progress}
                    progressSpringConfig={progressSpringConfig}
                    setActiveStepLabelElement={setActiveStepLabelElement}
                    step={step}
                    styles={stepStyles}
                    visited={
                      activeStepId
                        ? isStepVisited({
                            step,
                            activeStepId,
                            flatStepIds,
                          })
                        : false
                    }
                  />
                )
              );
            })}
          </Box>
        </VStack>
      );
    },
  ),
);

export const Stepper = StepperBase as StepperComponent;
