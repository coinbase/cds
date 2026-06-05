import { memo, useMemo } from 'react';
import { containsStep, isStepVisited } from '@coinbase/cds-common/stepper/utils';

import { cx } from '../cx';
import { HStack, VStack } from '../layout';

import { DefaultStepperIconVertical } from './DefaultStepperIconVertical';
import { DefaultStepperLabelVertical } from './DefaultStepperLabelVertical';
import { DefaultStepperProgressVertical } from './DefaultStepperProgressVertical';
import { DefaultStepperSubstepContainerVertical } from './DefaultStepperSubstepContainerVertical';
import { type StepperStepComponent } from './Stepper';

export const DefaultStepperStepVertical: StepperStepComponent = memo(
  function DefaultStepperStepVertical({
    step,
    parentStep,
    activeStepId,
    depth,
    active,
    visited,
    flatStepIds,
    complete,
    isDescendentActive,
    className,
    style,
    completedStepAccessibilityLabel,
    styles,
    classNames,
    progress,
    activeStepLabelElement,
    setActiveStepLabelElement,
    progressTimingConfig,
    animate,
    disableAnimateOnMount,
    StepperStepComponent = DefaultStepperStepVertical,
    StepperLabelComponent = DefaultStepperLabelVertical,
    StepperProgressComponent = DefaultStepperProgressVertical,
    StepperIconComponent = DefaultStepperIconVertical,
    StepperSubstepContainerComponent = DefaultStepperSubstepContainerVertical,
    ...props
  }) {
    const flatStepIndex = flatStepIds.indexOf(step.id);

    const RenderedIconComponent = step.StepperIconComponent ?? StepperIconComponent;
    const RenderedLabelComponent = step.StepperLabelComponent ?? StepperLabelComponent;
    const RenderedProgressComponent = step.StepperProgressComponent ?? StepperProgressComponent;
    const RenderedSubstepContainerComponent =
      step.StepperSubstepContainerComponent ?? StepperSubstepContainerComponent;

    const accessibilityLabel = useMemo(() => {
      const stepLabel = typeof step.label === 'string' ? step.label : null;
      const baseLabel = step.accessibilityLabel ?? stepLabel ?? `Step ${flatStepIndex + 1}`;
      return `${baseLabel}${visited || complete ? ` (${completedStepAccessibilityLabel})` : ''}`;
    }, [
      step.accessibilityLabel,
      step.label,
      flatStepIndex,
      visited,
      complete,
      completedStepAccessibilityLabel,
    ]);

    const containerStyle = useMemo(() => {
      return {
        ...style,
        ...styles?.step,
      };
    }, [style, styles?.step]);

    return (
      <VStack
        accessibilityLabel={accessibilityLabel}
        aria-current={step.id === activeStepId ? 'step' : undefined}
        as="li"
        className={cx(className, classNames?.step)}
        data-step-active={active}
        data-step-complete={complete}
        data-step-descendent-active={isDescendentActive}
        data-step-visited={visited}
        style={containerStyle}
        {...props}
      >
        <HStack>
          <VStack aria-hidden alignItems="center">
            {RenderedIconComponent && (
              <RenderedIconComponent
                active={active}
                activeStepId={activeStepId}
                className={classNames?.icon}
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
                className={classNames?.progress}
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
          </VStack>
          <VStack
            flexShrink={1}
            style={{ paddingInlineStart: `calc(${depth + 2} * var(--space-1))` }}
          >
            {RenderedLabelComponent && (
              <RenderedLabelComponent
                active={active}
                activeStepId={activeStepId}
                className={classNames?.label}
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
                className={classNames?.substepContainer}
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
                        active={activeStepId ? subStep.id === activeStepId : false}
                        activeStepId={activeStepId}
                        activeStepLabelElement={activeStepLabelElement}
                        animate={animate}
                        classNames={classNames}
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
        </HStack>
      </VStack>
    );
  },
);
