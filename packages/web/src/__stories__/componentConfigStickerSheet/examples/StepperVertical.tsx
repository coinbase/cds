import { memo, useState } from 'react';
import { useStepper } from '@coinbase/cds-common/stepper/useStepper';
import { IconButton } from '@coinbase/cds-web/buttons/IconButton';
import { ListCell } from '@coinbase/cds-web/cells/ListCell';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Stepper, type StepperValue } from '@coinbase/cds-web/stepper/Stepper';

const steps = [
  {
    id: 'book-flight' as const,
    label: 'Book Flight',
    metadata: {
      name: 'Delta Airlines',
      date: '2025-06-13',
      time: '1:15pm Departure',
    },
  },
  {
    id: 'book-hotel' as const,
    label: 'Book Hotel',
    metadata: {
      name: 'Marriott Downtown',
      date: '2025-06-13',
      time: '3:00pm Check-in',
    },
  },
  {
    id: 'rental-car' as const,
    label: 'Reserve Rental Car',
    metadata: {
      name: 'Enterprise',
      date: '2025-06-14',
      time: '8:00am Pickup',
    },
  },
] satisfies StepperValue<{
  name: string;
  date: string;
  time: string;
}>[];

const CustomBookingLabel = memo(({ step }: any) => {
  const { label, metadata } = step;

  return (
    <ListCell
      description={metadata.name}
      detail={metadata.date}
      innerSpacing={{ paddingStart: 1.5, paddingTop: 0, paddingBottom: 0 }}
      minHeight={undefined}
      outerSpacing={{
        paddingTop: 0,
        paddingBottom: 4,
        paddingStart: 0,
        paddingEnd: 0,
      }}
      priority="end"
      subdetail={metadata.time}
      title={label}
      width={280}
    />
  );
});

export const StepperVerticalCustomExample = memo(() => {
  const [stepperState, stepperApi] = useStepper({ steps });
  const [complete, setComplete] = useState(false);

  const handleNext = () => {
    if (stepperState.activeStepId === steps[steps.length - 1].id) {
      setComplete(true);
    } else {
      stepperApi.goNextStep();
    }
  };

  const handlePrevious = () => {
    setComplete(false);
    stepperApi.goPreviousStep();
  };

  return (
    <VStack>
      <Stepper
        StepperLabelComponent={CustomBookingLabel}
        activeStepId={stepperState.activeStepId}
        complete={complete}
        direction="vertical"
        steps={steps}
      />
      <HStack alignSelf="center" style={{ gap: 8 }}>
        <IconButton
          active
          compact
          accessibilityLabel="Previous step"
          name="arrowLeft"
          onClick={handlePrevious}
          variant="primary"
        />
        <IconButton
          active
          compact
          accessibilityLabel="Next step"
          name="arrowRight"
          onClick={handleNext}
          variant="primary"
        />
      </HStack>
    </VStack>
  );
});
