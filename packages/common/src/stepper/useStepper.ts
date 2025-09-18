import { useCallback, useMemo, useState } from 'react';

import { flattenSteps } from './utils';

export type BaseStepperValue = {
  id: string;
  subSteps?: BaseStepperValue[];
};

export type StepperOptions<StepType extends BaseStepperValue = BaseStepperValue> = {
  /** The array of steps data. */
  steps: StepType[];
  /** The default active step ID. If not provided, the first step will be used. Pass null to indicate no active step initially. */
  defaultActiveStepId?: string | null;
  /** If true, steps containing sub-steps will never be made active.
   * This is useful if you want the parent step to treated only as a visual grouping of steps rather than a step itself.
   * @default false
   */
  skipParentSteps?: boolean;
};

export type StepperState = {
  /** React state for the currently active step ID. Can be null if no step is active. */
  activeStepId: string | null;
};

export type StepperApi = {
  /** Update the currently active step to the step with `stepId`. */
  goToStep: (stepId: string) => void;
  /** Update the currently active step to the next enabled step in the steps array. Does nothing if the last step is already active. */
  goNextStep: () => void;
  /** Update the currently active step to the previous enabled step in the steps array. Does nothing if the first step is already active. */
  goPreviousStep: () => void;
  /** Reset the active step to the original default active step. */
  reset: () => void;
};

/**
 * A hook for managing StepperHorizontal or StepperVertical state.
 * Both components can be used on their own, but this hook provides a convenient way to sync state changes to the component props.
 *
 * @param options - The options for the stepper.
 * @param options.steps - The array of steps data.
 * @param options.defaultActiveStepId - The default active step ID. If not provided, the first step will be used.
 * @param options.skipParentSteps - If true, steps containing sub-steps will never be made active.
 * @returns A tuple where the first element is the stepper state and the second element is an API for manipulating the stepper state.
 */
export const useStepper = <StepType extends BaseStepperValue = BaseStepperValue>({
  steps,
  defaultActiveStepId,
  skipParentSteps,
}: StepperOptions<StepType>): [StepperState, StepperApi] => {
  // Flatten the nested steps structure for internal processing
  const flatSteps = useMemo(() => flattenSteps(steps), [steps]);

  const findNextStep = useCallback(
    (fromIndex: number): StepType | null => {
      for (let i = fromIndex; i < flatSteps.length; i++) {
        const step = flatSteps[i];
        const isParentStep = step.subSteps && step.subSteps.length > 0;
        const canUseStep = !skipParentSteps || !isParentStep;
        if (canUseStep) {
          return step;
        }
      }
      return null;
    },
    [flatSteps, skipParentSteps],
  );

  const findPreviousStep = useCallback(
    (fromIndex: number): StepType | null => {
      for (let i = fromIndex; i >= 0; i--) {
        const step = flatSteps[i];
        const isParentStep = step.subSteps && step.subSteps.length > 0;
        const canUseStep = !skipParentSteps || !isParentStep;
        if (canUseStep) {
          return step;
        }
      }
      return null;
    },
    [flatSteps, skipParentSteps],
  );

  const getInitialActiveStepId = useCallback((): string | null => {
    if (flatSteps.length === 0 || defaultActiveStepId === null) {
      return null;
    }

    if (defaultActiveStepId) {
      const defaultStepInFlat = flatSteps.find((step) => step.id === defaultActiveStepId);
      if (defaultStepInFlat) {
        const isParentStep = defaultStepInFlat.subSteps && defaultStepInFlat.subSteps.length > 0;
        const canUseStep = !skipParentSteps || !isParentStep;

        if (canUseStep) {
          return defaultStepInFlat.id;
        }

        // If it's a parent step and we skip parent steps, find next valid step from this position
        const defaultStepIndex = flatSteps.findIndex((step) => step.id === defaultActiveStepId);
        const nextValidStep = findNextStep(defaultStepIndex);
        if (nextValidStep) {
          return nextValidStep.id;
        }
      }
    }

    // Fallback to first valid step
    const firstValidStep = findNextStep(0);
    return firstValidStep ? firstValidStep.id : null;
  }, [defaultActiveStepId, flatSteps, skipParentSteps, findNextStep]);

  const [activeStepId, setActiveStepId] = useState<string | null>(getInitialActiveStepId());

  const goToStep = useCallback(
    (stepId: string) => {
      const targetIndex = flatSteps.findIndex((step) => step.id === stepId);
      if (targetIndex === -1) {
        return;
      }

      const targetStep = flatSteps[targetIndex];

      // If skipParentSteps is enabled, don't allow navigation to parent steps
      if (skipParentSteps && targetStep.subSteps && targetStep.subSteps.length > 0) {
        return;
      }

      setActiveStepId(targetStep.id);
    },
    [flatSteps, setActiveStepId, skipParentSteps],
  );

  const goNextStep = useCallback(() => {
    setActiveStepId((currentActiveStepId) => {
      if (currentActiveStepId === null) {
        const firstStep = findNextStep(0);
        return firstStep ? firstStep.id : null;
      }

      const activeStepIndex = flatSteps.findIndex((step) => step.id === currentActiveStepId);
      const nextStep = findNextStep(activeStepIndex + 1);

      if (nextStep) {
        return nextStep.id;
      } else {
        return currentActiveStepId;
      }
    });
  }, [flatSteps, findNextStep]);

  const goPreviousStep = useCallback(() => {
    setActiveStepId((currentActiveStepId) => {
      if (currentActiveStepId === null) {
        return null;
      }

      const activeStepIndex = flatSteps.findIndex((step) => step.id === currentActiveStepId);
      const previousStep = findPreviousStep(activeStepIndex - 1);

      if (previousStep) {
        return previousStep.id;
      }
      return currentActiveStepId;
    });
  }, [flatSteps, findPreviousStep]);

  const reset = useCallback(() => {
    setActiveStepId(getInitialActiveStepId());
  }, [getInitialActiveStepId, setActiveStepId]);

  const state = useMemo(
    () => ({
      activeStepId,
    }),
    [activeStepId],
  );

  const api = useMemo(
    () => ({
      goToStep,
      goNextStep,
      goPreviousStep,
      reset,
    }),
    [goToStep, goNextStep, goPreviousStep, reset],
  );

  return [state, api];
};
