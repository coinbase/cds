import { memo, useMemo } from 'react';
import { containsStep, isStepVisited } from '@coinbase/cds-common/stepper/utils';

import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';

import { DefaultStepperProgressHorizontal } from './DefaultStepperProgressHorizontal';
import { DefaultStepperSubstepContainerHorizontal } from './DefaultStepperSubstepContainerHorizontal';
import type { StepperStepComponent } from './Stepper';

export const DefaultStepperStepHorizontal: StepperStepComponent = memo(
  function DefaultStepperStepHorizontal({
    step,
    parentStep,
    activeStepId,
    depth,
    active,
    visited,
    flatStepIds,
    complete,
    isDescendentActive,
    progress,
    style,
    completedStepAccessibilityLabel,
    styles,
    activeStepLabelElement,
    setActiveStepLabelElement,
    progressTimingConfig,
    animate,
    disableAnimateOnMount,
    StepperStepComponent = DefaultStepperStepHorizontal,
    StepperSubstepContainerComponent = DefaultStepperSubstepContainerHorizontal,
    StepperLabelComponent,
    StepperProgressComponent = DefaultStepperProgressHorizontal,
    StepperIconComponent,
    ...props
  }) {
    const RenderedIconComponent = step.StepperIconComponent ?? StepperIconComponent;
    const RenderedLabelComponent = step.StepperLabelComponent ?? StepperLabelComponent;
    const RenderedProgressComponent = step.StepperProgressComponent ?? StepperProgressComponent;
    const RenderedSubstepContainerComponent =
      step.StepperSubstepContainerComponent ?? StepperSubstepContainerComponent;

    const containerStyles = useMemo(() => {
      const { step } = styles ?? {};
      return [style, step];
    }, [styles, style]);

    return (
      <VStack flexBasis={0} flexGrow={1} gap={0.5} style={containerStyles} {...props}>
        <HStack alignItems="center">
          {RenderedIconComponent && (
            <RenderedIconComponent
              active={active}
              activeStepId={activeStepId}
              complete={complete}
              depth={depth}
              flatStepIds={flatStepIds}
              isDescendentActive={isDescendentActive}
              parentStep={parentStep}
              step={step}
              style={styles?.icon}
              visited={visited}
            />
          )}
          {RenderedProgressComponent && (
            <RenderedProgressComponent
              active={active}
              activeStepId={activeStepId}
              activeStepLabelElement={activeStepLabelElement}
              animate={animate}
              complete={complete}
              depth={depth}
              disableAnimateOnMount={disableAnimateOnMount}
              flatStepIds={flatStepIds}
              isDescendentActive={isDescendentActive}
              parentStep={parentStep}
              progress={progress}
              progressTimingConfig={progressTimingConfig}
              step={step}
              style={styles?.progress}
              visited={visited}
            />
          )}
        </HStack>
        {RenderedLabelComponent && (
          <RenderedLabelComponent
            active={active}
            activeStepId={activeStepId}
            complete={complete}
            completedStepAccessibilityLabel={completedStepAccessibilityLabel}
            depth={depth}
            flatStepIds={flatStepIds}
            isDescendentActive={isDescendentActive}
            parentStep={parentStep}
            setActiveStepLabelElement={setActiveStepLabelElement}
            step={step}
            style={styles?.label}
            visited={visited}
          />
        )}
        {step.subSteps && RenderedSubstepContainerComponent && (
          <RenderedSubstepContainerComponent
            active={active}
            activeStepId={activeStepId}
            complete={complete}
            depth={depth}
            flatStepIds={flatStepIds}
            isDescendentActive={isDescendentActive}
            parentStep={parentStep}
            step={step}
            style={styles?.substepContainer}
            visited={visited}
          >
            {step.subSteps.map((subStep) => {
              const RenderedStepComponent = subStep.Component ?? StepperStepComponent;
              const isDescendentActive = activeStepId
                ? containsStep({
                    step: subStep,
                    targetStepId: activeStepId,
                  })
                : false;
              return (
                RenderedStepComponent && (
                  <RenderedStepComponent
                    key={subStep.id}
                    StepperIconComponent={StepperIconComponent}
                    StepperLabelComponent={StepperLabelComponent}
                    StepperProgressComponent={StepperProgressComponent}
                    StepperStepComponent={StepperStepComponent}
                    StepperSubstepContainerComponent={StepperSubstepContainerComponent}
                    active={subStep.id === activeStepId}
                    activeStepId={activeStepId}
                    activeStepLabelElement={activeStepLabelElement}
                    animate={animate}
                    complete={complete}
                    completedStepAccessibilityLabel={completedStepAccessibilityLabel}
                    depth={depth + 1}
                    disableAnimateOnMount={disableAnimateOnMount}
                    flatStepIds={flatStepIds}
                    isDescendentActive={isDescendentActive}
                    parentStep={step}
                    progress={progress}
                    progressTimingConfig={progressTimingConfig}
                    setActiveStepLabelElement={setActiveStepLabelElement}
                    step={subStep}
                    styles={styles}
                    visited={
                      activeStepId
                        ? isStepVisited({
                            step: subStep,
                            activeStepId,
                            flatStepIds,
                          })
                        : false
                    }
                  />
                )
              );
            })}
          </RenderedSubstepContainerComponent>
        )}
      </VStack>
    );
  },
);
