import React, { memo, useState } from 'react';
import {
  type StepperApi,
  type StepperState,
  useStepper,
} from '@coinbase/cds-common/stepper/useStepper';

import { Button } from '../../buttons';
import { ListCell } from '../../cells';
import { Collapsible } from '../../collapsible';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons/Icon';
import { Box, HStack, VStack } from '../../layout';
import { Pressable } from '../../system';
import { Text } from '../../typography/Text';
import { DefaultStepperIconVertical } from '../DefaultStepperIconVertical';
import { DefaultStepperLabelVertical } from '../DefaultStepperLabelVertical';
import { DefaultStepperProgressVertical } from '../DefaultStepperProgressVertical';
import {
  Stepper,
  type StepperIconComponent,
  type StepperLabelComponent,
  type StepperProgressComponent,
  type StepperProps,
  type StepperSubstepContainerProps,
  type StepperValue,
} from '../Stepper';

// A reusable example wrapper that encapsulates useStepper, renders the Stepper and controls,
// and forwards props to the Stepper component. Similar to StepperHorizontalExample.
type StepperVerticalExampleProps = Omit<
  Partial<StepperProps>,
  'direction' | 'steps' | 'activeStep' | 'activeStepId'
> & {
  title?: string;
  steps: any[];
  defaultActiveStepId?: string | null;
  initialComplete?: boolean;
  skipParentSteps?: boolean;
  renderWithApi?: (args: {
    stepperState: StepperState & { steps: any[]; complete: boolean };
    stepperApi: StepperApi;
  }) => React.ReactNode;
};

const StepperVerticalExample = ({
  steps,
  defaultActiveStepId,
  title,
  initialComplete,
  skipParentSteps,
  renderWithApi,
  ...props
}: StepperVerticalExampleProps) => {
  const [renderKey, setRenderKey] = useState(0);
  const [stepperState, stepperApi] = useStepper({
    steps,
    defaultActiveStepId,
    skipParentSteps,
  });
  const [complete, setComplete] = useState(initialComplete || false);

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
      {title && (
        <Text font="label1" paddingBottom={2}>
          {title}
        </Text>
      )}
      {renderWithApi
        ? renderWithApi({ stepperState: { ...stepperState, steps, complete }, stepperApi })
        : // cast to any here to bridge story flexibility across metadata types
          ((
            <Stepper
              direction="vertical"
              {...props}
              activeStepId={stepperState.activeStepId}
              complete={complete}
              steps={steps}
            />
          ) as any)}
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

const Default = () => {
  const steps: StepperValue[] = [
    {
      id: 'first-step',
      label: 'First step',
    },
    {
      id: 'second-step',
      label: 'Second step',
    },
    {
      id: 'final-step',
      label: 'Final step',
    },
  ];

  return (
    <StepperVerticalExample
      completedStepAccessibilityLabel="Finished"
      defaultActiveStepId={steps[0].id}
      steps={steps}
    />
  );
};

// ------------------------------------------------------------
// No Active Step
// ------------------------------------------------------------
const NoActiveStep = () => {
  const steps: StepperValue[] = [
    {
      id: 'first-step',
      label: 'First step',
    },
    {
      id: 'second-step',
      label: 'Second step',
    },
    {
      id: 'third-step',
      label: 'Third step',
    },
    {
      id: 'final-step',
      label: 'Final step',
    },
  ];

  return <StepperVerticalExample steps={steps} title="No Active Step" />;
};

// ------------------------------------------------------------
// Initial active step
// ------------------------------------------------------------
const InitialActiveStep = () => {
  const steps: StepperValue[] = [
    {
      id: 'first-step',
      label: 'First step',
    },
    {
      id: 'second-step',
      label: 'Second step',
    },
    {
      id: 'third-step',
      label: 'Third step',
    },
    {
      id: 'final-step',
      label: 'Final step',
    },
  ];
  return <Stepper activeStepId={steps[1].id} direction="vertical" steps={steps} />;
};

// ------------------------------------------------------------
// Nested Steps
// ------------------------------------------------------------
const NestedSteps = () => {
  const oneLevelSteps: StepperValue[] = [
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
  return (
    <VStack gap={4}>
      <VStack>
        <Text font="label1" paddingBottom={2}>
          One level steps
        </Text>
        <StepperVerticalExample steps={oneLevelSteps} />
      </VStack>
      <VStack>
        <Text font="label1" paddingBottom={2}>
          Two level steps (w/ skipParentSteps=true)
        </Text>
        <StepperVerticalExample skipParentSteps steps={twoLevelSteps} />
      </VStack>
    </VStack>
  );
};

// ------------------------------------------------------------
// Custom Icons & Styles
// ------------------------------------------------------------
const CustomIconsAndStyles = () => {
  const steps: StepperValue[] = [
    {
      id: 'first-step',
      label: 'First step',
    },
    {
      StepperIconComponent: ({ active, visited }) => (
        <Icon
          color={active ? 'fgNegative' : visited ? 'fgPrimary' : 'fgMuted'}
          name="addPeople"
          size="s"
        />
      ),
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
        },
        {
          id: 'second-step-substep-three',
          label: 'Substep three',
        },
      ],
    },
    {
      StepperIconComponent: () => <Icon name="airdrop" size="s" />,
      id: 'final-step',
      label: 'Final step',
    },
  ];

  return (
    <StepperVerticalExample
      defaultActiveStepId={steps[0].id}
      steps={steps}
      styles={{
        progress: { width: 8 },
      }}
    />
  );
};

// ------------------------------------------------------------
// Custom Components
// ------------------------------------------------------------
type BookingMetadata = {
  name: string;
  date: string;
  time: string;
};

const customComponentSteps: StepperValue<BookingMetadata>[] = [
  {
    id: 'first-step',
    label: 'Book Hotel',
    metadata: {
      name: 'Erich',
      date: '2025-06-13',
      time: '10:00 AM',
    },
  },
  {
    id: 'second-step',
    label: 'Book Flight',
    metadata: {
      name: 'Erich',
      date: '2025-06-13',
      time: '11:03 AM',
    },
  },
  {
    id: 'third-step',
    label: 'Reserve Rental Car',
    metadata: {
      name: 'Erich',
      date: '2025-06-14',
      time: '02:24 PM',
    },
  },
];

const CustomLabelComponent = ({
  step,
  active,
  depth,
  onPress,
}: React.ComponentProps<StepperLabelComponent> & { onPress: (id: string) => void }) => {
  const { label, metadata, id } = step;
  const subtitle = metadata?.subtitle as string;

  if (depth === 0 && metadata) {
    return (
      <ListCell
        compact
        description={metadata.name as string}
        detail={metadata.date as string}
        innerSpacing={{ paddingTop: 0, paddingBottom: 0 }}
        maxWidth={350}
        minHeight={undefined}
        onPress={() => onPress(id)}
        outerSpacing={{ paddingTop: 0, paddingBottom: 3, paddingStart: 0, paddingEnd: 0 }}
        subdetail={metadata.time as string}
        title={label}
      />
    );
  }

  return (
    <Pressable flexDirection="column" gap={1} onPress={() => onPress(id)} paddingBottom={3}>
      <Text color={active ? 'fgPrimary' : 'fg'} font={depth === 0 ? 'label1' : 'label2'}>
        {label}
      </Text>
      {subtitle && <Text font="label2">{subtitle}</Text>}
    </Pressable>
  );
};

const CollapsibleSubsteps = ({
  active,
  isDescendentActive,
  children,
}: StepperSubstepContainerProps) => {
  return (
    <Collapsible collapsed={!active && !isDescendentActive}>
      <VStack gap={2}>{children}</VStack>
    </Collapsible>
  );
};

const CustomComponents = () => {
  const oneLevelSteps: StepperValue[] = [
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

  return (
    <VStack gap={4}>
      <VStack>
        <Text font="label1" paddingBottom={2}>
          Travel Booking Labels
        </Text>
        <StepperVerticalExample
          initialComplete
          renderWithApi={({ stepperState, stepperApi }) => {
            const activeStep = stepperState.activeStepId
              ? stepperState.steps.find(
                  (step: StepperValue) => step.id === stepperState.activeStepId,
                ) || null
              : null;
            return (
              <Stepper
                StepperLabelComponent={(props: React.ComponentProps<StepperLabelComponent>) => (
                  <CustomLabelComponent onPress={(id) => stepperApi.goToStep(id)} {...props} />
                )}
                activeStepId={stepperState.activeStepId}
                complete={stepperState.complete}
                direction="vertical"
                steps={stepperState.steps}
              />
            );
          }}
          steps={customComponentSteps}
        />
      </VStack>
      <VStack>
        <Text font="label1" paddingBottom={2}>
          Collapsible Substeps
        </Text>
        <StepperVerticalExample
          StepperSubstepContainerComponent={CollapsibleSubsteps}
          steps={oneLevelSteps}
        />
      </VStack>
    </VStack>
  );
};

// ------------------------------------------------------------
// Null Components
// ------------------------------------------------------------
const NullComponents = () => {
  const steps: StepperValue[] = [
    {
      id: 'first-step',
      label: 'First step',
    },
    {
      id: 'second-step',
      label: 'Second step',
    },
    {
      id: 'final-step',
      label: 'Final step',
    },
  ];

  return (
    <StepperVerticalExample
      renderWithApi={({ stepperState: { activeStepId, steps, complete } }) => {
        const activeStep = activeStepId
          ? steps.find((step: StepperValue) => step.id === activeStepId) || null
          : null;
        return (
          <VStack gap={4}>
            <VStack>
              <Text font="label1" paddingBottom={2}>
                Default Render
              </Text>
              <Stepper
                activeStepId={activeStepId}
                complete={complete}
                direction="vertical"
                steps={steps}
              />
            </VStack>
            <VStack>
              <Text font="label1" paddingBottom={2}>
                Without Progress Bars
              </Text>
              <Stepper
                StepperProgressComponent={null}
                activeStepId={activeStepId}
                complete={complete}
                direction="vertical"
                steps={steps}
              />
            </VStack>
            <VStack>
              <Text font="label1" paddingBottom={2}>
                Without Labels
              </Text>
              <Stepper
                StepperLabelComponent={null}
                activeStepId={activeStepId}
                complete={complete}
                direction="vertical"
                steps={steps}
              />
            </VStack>
            <VStack>
              <Text font="label1" paddingBottom={2}>
                Without Icons
              </Text>
              <Stepper
                StepperIconComponent={null}
                activeStepId={activeStepId}
                complete={complete}
                direction="vertical"
                steps={steps}
              />
            </VStack>
          </VStack>
        );
      }}
      steps={steps}
    />
  );
};

type ErrorStepMetadata = {
  isError?: boolean;
};

const ErrorStepperIcon: StepperIconComponent<ErrorStepMetadata> = memo(
  function ErrorStepperIcon(props) {
    const { step, visited, complete } = props;
    const showError = step.metadata?.isError && (visited || complete);

    if (!showError) {
      return <DefaultStepperIconVertical {...props} />;
    }

    return (
      <DefaultStepperIconVertical
        {...props}
        activeColor="bgNegative"
        completeColor="bgNegative"
        completeName="circleCross"
        visitedColor="bgNegative"
        visitedName="circleCross"
      />
    );
  },
);

const ErrorStepperLabel: StepperLabelComponent<ErrorStepMetadata> = memo(
  function ErrorStepperLabel(props) {
    const { step, visited, complete } = props;
    const showError = step.metadata?.isError && (visited || complete);

    if (!showError) {
      return <DefaultStepperLabelVertical {...props} />;
    }

    return (
      <DefaultStepperLabelVertical
        {...props}
        activeColor="fgNegative"
        completeColor="fgNegative"
        visitedColor="fgNegative"
      />
    );
  },
);

const ErrorStepperProgress: StepperProgressComponent<ErrorStepMetadata> = memo(
  function ErrorStepperProgress(props) {
    const { step, visited, complete } = props;
    const showError = step.metadata?.isError && (visited || complete);

    if (!showError) {
      return <DefaultStepperProgressVertical {...props} />;
    }

    return (
      <DefaultStepperProgressVertical
        {...props}
        completeFill="bgNegative"
        visitedFill="bgNegative"
      />
    );
  },
);

const CustomErrorStep = () => {
  const steps: StepperValue<ErrorStepMetadata>[] = [
    { id: '1', label: 'Account Details' },
    { id: '2', label: 'Personal Information' },
    {
      id: '3',
      label: 'Payment Method',
      metadata: { isError: true },
    },
    { id: '4', label: 'Review & Submit' },
  ];

  return (
    <StepperVerticalExample
      StepperIconComponent={ErrorStepperIcon}
      StepperLabelComponent={ErrorStepperLabel}
      StepperProgressComponent={ErrorStepperProgress}
      defaultActiveStepId={'1'}
      steps={steps}
      title="Custom Error Step (shows error state after step is visited)"
    />
  );
};

const StepperVerticalScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <Default />
      </Example>

      <Example title="No Active Step">
        <NoActiveStep />
      </Example>

      <Example title="Initial Active Step">
        <InitialActiveStep />
      </Example>

      <Example title="Nested Steps">
        <NestedSteps />
      </Example>

      <Example title="Custom Icons & Styles">
        <CustomIconsAndStyles />
      </Example>

      <Example title="Custom Components">
        <CustomComponents />
      </Example>

      <Example title="Null Components">
        <NullComponents />
      </Example>

      <Example title="Custom Error Step">
        <CustomErrorStep />
      </Example>
    </ExampleScreen>
  );
};

export default StepperVerticalScreen;
