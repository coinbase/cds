import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';
import { containsStep, flattenSteps, isStepVisited } from '@coinbase/cds-common/stepper/utils';
import type { IconName } from '@coinbase/cds-common/types';
import type { SpringConfig } from '@react-spring/core';
import type { Transition } from 'framer-motion';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import type { IconProps } from '../icons/Icon';
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { VStack, type VStackBaseProps, type VStackProps } from '../layout/VStack';
import type { ResponsiveProp } from '../styles/styleProps';

import { DefaultStepperHeaderHorizontal } from './DefaultStepperHeaderHorizontal';
import { DefaultStepperIconVertical } from './DefaultStepperIconVertical';
import { DefaultStepperLabelHorizontal } from './DefaultStepperLabelHorizontal';
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
    /** A CSS class name applied to this component */
    className?: string;
    /** Inline styles for the subcomponent element */
    style?: React.CSSProperties;
  };

// ------------ SUBCOMPONENT PROP TYPES ------------
export type StepperStepProps<Metadata extends Record<string, unknown> = Record<string, unknown>> =
  StepperSubcomponentProps<Metadata> &
    BoxProps<BoxDefaultElement> & {
      /**
       * A value between 0 and 1 representing the step's progress.
       * Progress bar subcomponents animate to this value with the given progressTimingConfig.
       */
      progress: number;
      activeStepLabelElement: HTMLElement | null;
      setActiveStepLabelElement: (element: HTMLElement) => void;
      progressTimingConfig?: Transition;
      animate?: boolean;
      disableAnimateOnMount?: boolean;
      completedStepAccessibilityLabel?: string;
      StepperStepComponent?: StepperStepComponent<Metadata>;
      StepperSubstepContainerComponent?: StepperSubstepContainerComponent<Metadata> | null;
      StepperLabelComponent?: StepperLabelComponent<Metadata> | null;
      StepperProgressComponent?: StepperProgressComponent<Metadata> | null;
      StepperIconComponent?: StepperIconComponent<Metadata> | null;
      styles?: {
        step?: React.CSSProperties;
        label?: React.CSSProperties;
        progress?: React.CSSProperties;
        icon?: React.CSSProperties;
        header?: React.CSSProperties;
        substepContainer?: React.CSSProperties;
      };
      classNames?: {
        step?: string;
        label?: string;
        progress?: string;
        icon?: string;
        header?: string;
        substepContainer?: string;
      };
    };

export type StepperSubstepContainerProps<
  Metadata extends Record<string, unknown> = Record<string, unknown>,
> = StepperSubcomponentProps<Metadata> &
  BoxProps<BoxDefaultElement> & {
    children: React.ReactNode;
  };

export type StepperHeaderProps<Metadata extends Record<string, unknown> = Record<string, unknown>> =
  BoxProps<BoxDefaultElement> & {
    activeStep: StepperValue<Metadata> | null;
    flatStepIds: string[];
    complete?: boolean;
    disableAnimateOnMount?: boolean;
    className?: string;
    style?: React.CSSProperties;
  };

export type StepperLabelProps<Metadata extends Record<string, unknown> = Record<string, unknown>> =
  StepperSubcomponentProps<Metadata> &
    BoxProps<BoxDefaultElement> & {
      setActiveStepLabelElement: (element: HTMLElement) => void;
      progressTimingConfig?: Transition;
      defaultColor?: ResponsiveProp<ThemeVars.Color>;
      activeColor?: ResponsiveProp<ThemeVars.Color>;
      descendentActiveColor?: ResponsiveProp<ThemeVars.Color>;
      visitedColor?: ResponsiveProp<ThemeVars.Color>;
      completeColor?: ResponsiveProp<ThemeVars.Color>;
      completedStepAccessibilityLabel?: string;
      disableAnimateOnMount?: boolean;
    };

export type StepperProgressProps<
  Metadata extends Record<string, unknown> = Record<string, unknown>,
> = StepperSubcomponentProps<Metadata> &
  BoxProps<BoxDefaultElement> & {
    progress: number;
    activeStepLabelElement: HTMLElement | null;
    progressTimingConfig?: Transition;
    animate?: boolean;
    disableAnimateOnMount?: boolean;
    defaultFill?: ResponsiveProp<ThemeVars.Color>;
    activeFill?: ResponsiveProp<ThemeVars.Color>;
    descendentActiveFill?: ResponsiveProp<ThemeVars.Color>;
    completeFill?: ResponsiveProp<ThemeVars.Color>;
    visitedFill?: ResponsiveProp<ThemeVars.Color>;
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
      defaultColor?: ResponsiveProp<ThemeVars.Color>;
      activeColor?: ResponsiveProp<ThemeVars.Color>;
      descendentActiveColor?: ResponsiveProp<ThemeVars.Color>;
      visitedColor?: ResponsiveProp<ThemeVars.Color>;
      completeColor?: ResponsiveProp<ThemeVars.Color>;
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
  VStackBaseProps & {
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
    /** The Framer Motion transition config for progress bar animations (e.g. duration in seconds, ease). */
    progressTimingConfig?: Transition;
    /**
     * @deprecated Stepper no longer uses react-spring for progress; this value is ignored but retained for migration only. Use {@link progressTimingConfig} instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v10
     */
    progressSpringConfig?: SpringConfig;
    /** Whether to animate the progress bar.
     * @default true
     */
    animate?: boolean;
    /** Whether to disable the animation on mount. */
    disableAnimateOnMount?: boolean;
  };

export const stepperDefaultElement = 'div';
export type StepperDefaultElement = typeof stepperDefaultElement;

const cascadeStaggerMs = durations.moderate2;

export type StepperProps<Metadata extends Record<string, unknown> = Record<string, unknown>> =
  VStackProps<StepperDefaultElement> &
    StepperBaseProps<Metadata> & {
      /** Custom styles for individual elements of the Stepper component */
      styles?: {
        /** Root Stepper container element */
        root?: React.CSSProperties;
        /** Step subcomponent element */
        step?: React.CSSProperties;
        /** Substep container element */
        substepContainer?: React.CSSProperties;
        /** Label subcomponent element */
        label?: React.CSSProperties;
        /** Progress subcomponent element */
        progress?: React.CSSProperties;
        /** Icon subcomponent element */
        icon?: React.CSSProperties;
        /** Header subcomponent element */
        header?: React.CSSProperties;
      };
      /** Custom class names for individual elements of the Stepper component */
      classNames?: {
        /** Root Stepper container element */
        root?: string;
        /** Step subcomponent element */
        step?: string;
        /** Substep container element */
        substepContainer?: string;
        /** Label subcomponent element */
        label?: string;
        /** Progress subcomponent element */
        progress?: string;
        /** Icon subcomponent element */
        icon?: string;
        /** Header subcomponent element */
        header?: string;
      };
    };

export const horizontalStepGap = {
  phone: 0.5,
  tablet: 1,
  desktop: 1,
} as const;

/** Default progress transition: tween with CDS duration (seconds) and global curve. */
export const defaultProgressTimingConfig: Transition = {
  type: 'tween',
  duration: durations.slow2 / 1000,
  ease: curves.global,
};

/**
 * @deprecated Use {@link defaultProgressTimingConfig}. Retained for migration only; Stepper no longer uses react-spring for progress. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const defaultProgressSpringConfig: SpringConfig = {
  friction: 0,
  tension: 100,
  clamp: true,
};

type StepperComponent = <Metadata extends Record<string, unknown> = Record<string, unknown>>(
  props: StepperProps<Metadata> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

const StepperBase = memo(
  forwardRef(
    <Metadata extends Record<string, unknown> = Record<string, unknown>>(
      _props: StepperProps<Metadata>,
      ref: React.Ref<HTMLDivElement>,
    ) => {
      const mergedProps = useComponentConfig('Stepper', _props);
      const {
        direction,
        activeStepId,
        steps,
        complete,
        style,
        className,
        completedStepAccessibilityLabel = 'Complete',
        styles,
        classNames,
        gap = direction === 'vertical' ? undefined : horizontalStepGap,
        accessibilityLabel,
        StepperStepComponent = direction === 'vertical'
          ? (DefaultStepperStepVertical as StepperStepComponent<Metadata>)
          : (DefaultStepperStepHorizontal as StepperStepComponent<Metadata>),
        StepperSubstepContainerComponent = direction === 'vertical'
          ? (DefaultStepperSubstepContainerVertical as StepperSubstepContainerComponent<Metadata>)
          : (DefaultStepperSubstepContainerHorizontal as StepperSubstepContainerComponent<Metadata>),
        StepperLabelComponent = direction === 'vertical'
          ? (DefaultStepperLabelVertical as StepperLabelComponent<Metadata>)
          : (DefaultStepperLabelHorizontal as StepperLabelComponent<Metadata>),
        StepperProgressComponent = direction === 'vertical'
          ? (DefaultStepperProgressVertical as StepperProgressComponent<Metadata>)
          : (DefaultStepperProgressHorizontal as StepperProgressComponent<Metadata>),
        StepperIconComponent = direction === 'vertical'
          ? (DefaultStepperIconVertical as StepperIconComponent<Metadata>)
          : null,
        StepperHeaderComponent = direction === 'vertical'
          ? null
          : (DefaultStepperHeaderHorizontal as StepperHeaderComponent<Metadata>),
        progressTimingConfig = defaultProgressTimingConfig,
        animate = true,
        disableAnimateOnMount,
        ...props
      } = mergedProps;
      const flatStepIds = useMemo(() => flattenSteps(steps).map((step) => step.id), [steps]);

      // Derive activeStep from activeStepId
      const activeStep = useMemo(() => {
        if (!activeStepId) return null;
        return flattenSteps(steps).find((step) => step.id === activeStepId) || null;
      }, [activeStepId, steps]);

      const [activeStepLabelElement, setActiveStepLabelElement] = useState<HTMLElement | null>(
        null,
      );

      const { rootClassName, stepClassNames } = useMemo(() => {
        const { root, ...stepClassNames } = classNames ?? {};
        const rootClassName = cx(className, root);
        return { rootClassName, stepClassNames };
      }, [classNames, className]);

      const { rootStyle, stepStyles } = useMemo(() => {
        const { root, ...stepStyles } = styles ?? {};
        const rootStyle = { ...style, ...root };
        return { rootStyle, stepStyles };
      }, [styles, style]);

      const activeStepIndex = useMemo(() => {
        return activeStepId
          ? steps.findIndex(
              (step) =>
                step.id === activeStepId || containsStep({ step, targetStepId: activeStepId }),
            )
          : -1;
      }, [activeStepId, steps]);

      // the target step index for the cascade animation
      const cascadeTargetIndex = useMemo(
        () => (complete ? steps.length - 1 : activeStepIndex),
        [complete, steps, activeStepIndex],
      );
      // reference to the previous cascade targetIndex
      const cascadeTargetIndexRef = useRef(cascadeTargetIndex);
      // the index of the last filled step
      const [filledStepIndex, setFilledStepIndex] = useState(
        disableAnimateOnMount ? cascadeTargetIndex : -1,
      );

      const filledStepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

      useEffect(() => {
        if (filledStepTimeoutRef.current) {
          clearTimeout(filledStepTimeoutRef.current);
          filledStepTimeoutRef.current = null;
        }
        if (!animate) {
          if (filledStepIndex !== cascadeTargetIndex) setFilledStepIndex(cascadeTargetIndex);
        } else if (cascadeTargetIndex < filledStepIndex) {
          if (cascadeTargetIndexRef.current !== cascadeTargetIndex) {
            setFilledStepIndex((prev) => prev - 1);
            cascadeTargetIndexRef.current = cascadeTargetIndex;
          } else {
            filledStepTimeoutRef.current = setTimeout(
              () => setFilledStepIndex((prev) => prev - 1),
              cascadeStaggerMs,
            );
          }
        } else if (cascadeTargetIndex > filledStepIndex) {
          if (cascadeTargetIndexRef.current !== cascadeTargetIndex) {
            setFilledStepIndex((prev) => prev + 1);
            cascadeTargetIndexRef.current = cascadeTargetIndex;
          } else {
            filledStepTimeoutRef.current = setTimeout(
              () => setFilledStepIndex((prev) => prev + 1),
              cascadeStaggerMs,
            );
          }
        }
        return () => {
          if (filledStepTimeoutRef.current) {
            clearTimeout(filledStepTimeoutRef.current);
            filledStepTimeoutRef.current = null;
          }
        };
      }, [animate, cascadeTargetIndex, filledStepIndex]);

      const getStepProgress = useCallback(
        (index: number) => {
          if (!animate) {
            // if animation is disabled, return 0 if the step index is less than the active step index, otherwise return 1
            if (filledStepIndex < 0) return 0;
            return index <= activeStepIndex ? 1 : 0;
          }
          if (filledStepIndex < 0) return 0;
          return index <= filledStepIndex ? 1 : 0;
        },
        [animate, activeStepIndex, filledStepIndex],
      );

      return (
        <VStack
          ref={ref}
          as={stepperDefaultElement}
          className={rootClassName}
          style={rootStyle}
          {...props}
        >
          {StepperHeaderComponent && (
            <StepperHeaderComponent
              activeStep={activeStep}
              className={classNames?.header}
              complete={complete}
              disableAnimateOnMount={disableAnimateOnMount}
              flatStepIds={flatStepIds}
              style={styles?.header}
            />
          )}
          <Box
            accessibilityLabel={accessibilityLabel}
            as="ol"
            flexDirection={direction === 'vertical' ? 'column' : 'row'}
            gap={gap}
          >
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
                    active={activeStepId ? step.id === activeStepId : false}
                    activeStepId={activeStepId}
                    activeStepLabelElement={activeStepLabelElement}
                    animate={animate}
                    classNames={stepClassNames}
                    complete={complete}
                    completedStepAccessibilityLabel={completedStepAccessibilityLabel}
                    depth={0}
                    disableAnimateOnMount={disableAnimateOnMount}
                    flatStepIds={flatStepIds}
                    isDescendentActive={isDescendentActive}
                    parentStep={null}
                    progress={getStepProgress(index)}
                    progressTimingConfig={progressTimingConfig}
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
