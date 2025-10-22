import { useCallback, useState } from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { useStepper } from '@coinbase/cds-common/stepper/useStepper';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons/Icon';
import { HStack, VStack } from '../../layout';
import { Pressable } from '../../system';
import { Text } from '../../typography/Text';
import { DefaultStepperProgressHorizontal } from '../DefaultStepperProgressHorizontal';
import {
  Stepper,
  type StepperProgressComponent,
  type StepperProps,
  type StepperValue,
} from '../Stepper';

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

const noLabelSteps: StepperValue[] = [
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
  const [renderKey, setRenderKey] = useState(0);
  const [stepperState, stepperApi] = useStepper({ steps, defaultActiveStepId });

  const [complete, setComplete] = useState(false);

  const activeIndex = stepperState.activeStepId
    ? steps.findIndex((step: StepperValue) => step.id === stepperState.activeStepId)
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

  const toggleComplete = () => {
    setComplete((prev) => !prev);
  };

  const handleToFirstStep = () => {
    stepperApi.goToStep(steps[0].id);
  };

  const handleToLastStep = () => {
    stepperApi.goToStep(steps[steps.length - 1].id);
  };

  const nextAction = complete ? handleReset : handleNextStep;
  const nextActionLabel = complete
    ? 'Reset'
    : stepperState.activeStepId === steps[steps.length - 1].id
      ? 'Finish'
      : 'Next';

  return (
    <VStack key={renderKey} gap={2}>
      {title && <Text font="headline">{title}</Text>}
      <Stepper
        direction="horizontal"
        {...props}
        activeStepId={stepperState.activeStepId}
        complete={complete}
        steps={steps}
      />
      <VStack gap={2} paddingY={2}>
        {complete ? (
          <>
            <Text font="label1">All steps completed!</Text>
            <HStack gap={1} justifyContent="flex-start">
              <Button compact onPress={handleReset}>
                Reset
              </Button>
              <Button compact onPress={toggleComplete}>
                Toggle Complete
              </Button>
            </HStack>
          </>
        ) : (
          <>
            <HStack alignItems="center" justifyContent="space-between">
              <Text font="label1">
                Active Step: {complete ? '-' : stepperState.activeStepId || 'None'}
              </Text>
              <Pressable onPress={() => setRenderKey((prev) => prev + 1)}>
                <Text>Rerender</Text>
              </Pressable>
            </HStack>
            <VStack gap={2}>
              <HStack gap={1} justifyContent="flex-start">
                <Button compact disabled={activeIndex === 0} onPress={handlePreviousStep}>
                  Back
                </Button>
                <Button compact onPress={nextAction}>
                  {nextActionLabel}
                </Button>
                <Button compact onPress={toggleComplete}>
                  Toggle Complete
                </Button>
              </HStack>
              <HStack gap={1} justifyContent="flex-start">
                <Button compact onPress={handleToFirstStep}>
                  First
                </Button>
                <Button compact onPress={handleToLastStep}>
                  Last
                </Button>
              </HStack>
            </VStack>
          </>
        )}
      </VStack>
    </VStack>
  );
};

// ------------------------------------------------------------
// No Active Step
// ------------------------------------------------------------
const NoActiveStep = () => {
  return <StepperHorizontalExample steps={basicSteps} title="No Active Step" />;
};

// ------------------------------------------------------------
// Custom Progress Component
// ------------------------------------------------------------
type CustomProgressProps = React.ComponentProps<StepperProgressComponent> & {
  onPress: (id: string) => void;
};

const PressableProgress = ({ onPress, ...props }: CustomProgressProps) => {
  return (
    <Pressable onPress={() => onPress(props.step.id)} style={{ width: '100%' }}>
      <DefaultStepperProgressHorizontal {...props} />
    </Pressable>
  );
};

const CustomProgressComponent = () => {
  const [stepperState, stepperApi] = useStepper({ steps: basicSteps });

  const handleChange = useCallback((id: string) => stepperApi.goToStep(id), [stepperApi]);

  return (
    <Stepper
      StepperProgressComponent={(props: React.ComponentProps<StepperProgressComponent>) => (
        <PressableProgress {...props} onPress={handleChange} />
      )}
      activeStepId={stepperState.activeStepId}
      complete={false}
      direction="horizontal"
      steps={basicSteps}
    />
  );
};

const StepperHorizontalScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <StepperHorizontalExample defaultActiveStepId={basicSteps[2].id} steps={basicSteps} />
      </Example>

      <Example title="No Active Step">
        <NoActiveStep />
      </Example>

      <Example title="Initial Active Step">
        <Stepper activeStepId={basicSteps[1].id} direction="horizontal" steps={basicSteps} />
      </Example>

      <Example title="No Label Text">
        <StepperHorizontalExample defaultActiveStepId={noLabelSteps[0].id} steps={noLabelSteps} />
      </Example>

      <Example title="Long Text">
        <StepperHorizontalExample
          defaultActiveStepId={longLabelSteps[0].id}
          steps={longLabelSteps}
        />
      </Example>

      <Example title="Custom Progress Component">
        <CustomProgressComponent />
      </Example>

      <Example title="With Icon">
        <StepperHorizontalExample
          StepperIconComponent={({ active, complete, visited, ...props }) => (
            <Icon
              active
              color={active ? 'bgPrimary' : complete || visited ? 'bgLinePrimarySubtle' : 'bgLine'}
              name={complete || visited ? 'circleCheckmark' : 'outline'}
              size="s"
              {...props}
            />
          )}
          defaultActiveStepId={basicSteps[0].id}
          steps={basicSteps}
        />
      </Example>

      <Example title="Nested Steps">
        <StepperHorizontalExample defaultActiveStepId={twoLevelSteps[0].id} steps={twoLevelSteps} />
      </Example>

      <Example title="Null Components">
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
      </Example>
    </ExampleScreen>
  );
};

export default StepperHorizontalScreen;
