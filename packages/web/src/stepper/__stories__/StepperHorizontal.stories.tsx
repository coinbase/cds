import { useCallback, useState } from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { useStepper } from '@coinbase/cds-common/stepper/useStepper';
import { css } from '@linaria/core';

import { Button } from '../../buttons';
import { Icon } from '../../icons';
import { HStack, VStack } from '../../layout';
import { Pressable } from '../../system';
import { Text } from '../../typography';
import { DefaultStepperLabelHorizontal } from '../DefaultStepperLabelHorizontal';
import { Stepper, type StepperLabelProps, type StepperProps, type StepperValue } from '../Stepper';

const basicSteps: StepperValue[] = [
  {
    label: 'Create Account',
    id: 'create-account',
  },
  {
    label: 'Direct Deposit',
    id: 'direct-deposit',
  },
  {
    label: 'Buy Your First Cypto',
    id: 'buy-crypto',
  },
];

const longLabelSteps: StepperValue[] = [
  { label: loremIpsum, id: 'create-account' },
  { label: loremIpsum, id: 'direct-deposit' },
  { label: loremIpsum, id: 'buy-crypto' },
];

const twoLevelSteps: StepperValue[] = [
  {
    id: 'first-step',
    label: 'First step',
  },
  {
    id: 'second-step',
    label: 'Second step',
    subSteps: [
      {
        id: 'second-step-substep-one',
        label: 'Substep one',
      },
      {
        id: 'second-step-substep-two',
        label: 'Substep two',
        subSteps: [
          {
            id: 'deeply-nested-step-1',
            label: 'Deeply nested step 1',
          },
          {
            id: 'deeply-nested-step-2',
            label: 'Deeply nested step 2',
          },
        ],
      },
      {
        id: 'second-step-substep-three',
        label: 'Substep three',
      },
    ],
  },
  {
    id: 'final-step',
    label: 'Final step',
  },
];

type StepperHorizontalExampleProps = Omit<
  Partial<StepperProps>,
  'direction' | 'activeStep' | 'activeStepId'
> & { title?: string; defaultActiveStepId?: string | null };

const StepperHorizontalExample = ({
  steps = basicSteps,
  defaultActiveStepId,
  title,
  ...props
}: StepperHorizontalExampleProps) => {
  const [stepperState, stepperApi] = useStepper({ steps, defaultActiveStepId });
  const [complete, setComplete] = useState(props.complete ?? false);

  const activeIndex = stepperState.activeStepId
    ? steps.findIndex((step) => step.id === stepperState.activeStepId)
    : -1;

  const handleNextStep = () => {
    if (stepperState.activeStepId === steps[steps.length - 1].id) {
      setComplete(true);
    } else {
      stepperApi.goNextStep();
    }
  };

  const handlePreviousStep = () => {
    setComplete(false);
    stepperApi.goPreviousStep();
  };

  const handleReset = () => {
    setComplete(false);
    stepperApi.reset();
  };

  const handleGoToFirstStep = () => {
    stepperApi.goToStep(steps[0].id);
  };

  const handleGoToLastStep = () => {
    stepperApi.goToStep(steps[steps.length - 1].id);
  };

  const toggleComplete = () => {
    setComplete((prev) => !prev);
  };

  const nextAction = complete ? handleReset : handleNextStep;
  const nextActionLabel =
    stepperState.activeStepId === null
      ? 'Start'
      : complete
        ? 'Reset'
        : stepperState.activeStepId === steps[steps.length - 1].id
          ? 'Finish'
          : 'Next';

  return (
    <VStack gap={2}>
      {title && <Text font="headline">{title}</Text>}
      <Stepper
        direction="horizontal"
        {...props}
        accessibilityLabel="Example Stepper"
        activeStepId={stepperState.activeStepId}
        complete={complete}
        steps={steps}
      />
      <VStack gap={2} paddingY={2}>
        {complete ? (
          <>
            <Text font="label1">All steps completed!</Text>
            <HStack gap={2} justifyContent="flex-start">
              <Button onClick={handleReset}>Reset</Button>
              <Button onClick={toggleComplete}>Toggle Complete</Button>
            </HStack>
          </>
        ) : (
          <>
            <Text font="label1">
              Active Step: {complete ? '-' : stepperState.activeStepId || 'None'}
            </Text>
            <VStack gap={2}>
              <HStack gap={2} justifyContent="flex-start">
                <Button disabled={activeIndex === 0} onClick={handlePreviousStep}>
                  Back
                </Button>
                <Button onClick={nextAction}>{nextActionLabel}</Button>
                <Button disabled={complete} onClick={toggleComplete}>
                  Toggle Complete
                </Button>
              </HStack>
              <HStack gap={2} justifyContent="flex-start">
                <Button onClick={handleGoToFirstStep}>First</Button>
                <Button onClick={handleGoToLastStep}>Last</Button>
              </HStack>
            </VStack>
          </>
        )}
      </VStack>
    </VStack>
  );
};

// ------------------------------------------------------------
// Default
// ------------------------------------------------------------
export const Default = () => (
  <StepperHorizontalExample defaultActiveStepId={basicSteps[0].id} steps={basicSteps} />
);

// ------------------------------------------------------------
// No Active Step
// ------------------------------------------------------------
export const NoActiveStep = () => (
  <VStack gap={4}>
    <StepperHorizontalExample steps={basicSteps} title="No Active Step" />
    <StepperHorizontalExample complete={true} steps={basicSteps} title="Initial Complete" />
  </VStack>
);

// ------------------------------------------------------------
// No Label Text
// ------------------------------------------------------------
export const NoLabelText = () => {
  const noLabels = [
    {
      id: 'step-one',
      accessibilityLabel: 'Step One',
    },
    {
      id: 'step-two',
      accessibilityLabel: 'Step Two',
    },
    {
      id: 'step-three',
      accessibilityLabel: 'Step Three',
    },
  ];

  return <StepperHorizontalExample defaultActiveStepId={noLabels[0].id} steps={noLabels} />;
};

// ------------------------------------------------------------
// Long Text
// ------------------------------------------------------------
export const LongText = () => (
  <StepperHorizontalExample defaultActiveStepId={longLabelSteps[0].id} steps={longLabelSteps} />
);

// ------------------------------------------------------------
// Custom Label Component
// ------------------------------------------------------------
type CustomLabelProps = Omit<StepperLabelProps, 'onClick'> & {
  onClick: (stepId: string) => void;
};

const labelCss = css`
  &:hover span {
    color: var(--color-fgPrimary);
  }
`;

const PressableLabel = ({ onClick, ...props }: CustomLabelProps) => {
  return (
    <Pressable onClick={() => onClick(props.step.id)} style={{ width: '100%' }}>
      <DefaultStepperLabelHorizontal {...props} className={labelCss} />
    </Pressable>
  );
};

export const CustomLabelComponent = () => {
  const [stepperState, stepperApi] = useStepper({ steps: basicSteps });

  const handleChange = useCallback((stepId: string) => stepperApi.goToStep(stepId), [stepperApi]);

  return (
    <Stepper
      StepperLabelComponent={(props) => <PressableLabel {...props} onClick={handleChange} />}
      activeStepId={stepperState.activeStepId}
      complete={false}
      direction="horizontal"
      steps={basicSteps}
    />
  );
};

// ------------------------------------------------------------
// With Icon
// ------------------------------------------------------------
export const WithIcon = () => {
  return (
    <StepperHorizontalExample
      StepperIconComponent={({ visited, active, complete, ...props }) => (
        <Icon
          active
          color={
            complete
              ? 'bgLinePrimarySubtle'
              : active
                ? 'bgPrimary'
                : visited
                  ? 'bgLinePrimarySubtle'
                  : 'bgLine'
          }
          name={complete || visited || active ? 'circleCheckmark' : 'outline'}
          size="s"
        />
      )}
      defaultActiveStepId={basicSteps[0].id}
      steps={basicSteps}
    />
  );
};

// ------------------------------------------------------------
// Nested Steps
// ------------------------------------------------------------
export const NestedSteps = () => (
  <StepperHorizontalExample defaultActiveStepId={twoLevelSteps[0].id} steps={twoLevelSteps} />
);

// ------------------------------------------------------------
// Null Components
// ------------------------------------------------------------
export const NullComponents = () => {
  return (
    <VStack gap={4}>
      <StepperHorizontalExample
        StepperLabelComponent={null}
        defaultActiveStepId={basicSteps[0].id}
        steps={basicSteps}
        title="StepperLabelComponent = null"
      />
      <StepperHorizontalExample
        StepperProgressComponent={null}
        defaultActiveStepId={basicSteps[0].id}
        steps={basicSteps}
        title="StepperProgressComponent = null"
      />
      <StepperHorizontalExample
        StepperIconComponent={null}
        defaultActiveStepId={basicSteps[0].id}
        steps={basicSteps}
        title="StepperIconComponent = null"
      />
      <StepperHorizontalExample
        StepperHeaderComponent={null}
        defaultActiveStepId={basicSteps[0].id}
        steps={basicSteps}
        title="StepperHeaderComponent = null"
      />
    </VStack>
  );
};

export default {
  title: 'Components/Stepper/Horizontal',
  component: Stepper,
};
