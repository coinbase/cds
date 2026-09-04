import type { BaseStepperValue } from './useStepper';

/**
 * Checks if a step or any of its descendants contains the target step ID
 */
export function containsStep({
  step,
  targetStepId,
}: {
  step: BaseStepperValue;
  targetStepId: string;
}): boolean {
  if (!step.subSteps) return false;
  return step.subSteps.some((subStep) => {
    if (subStep.id === targetStepId) return true;
    return containsStep({ step: subStep, targetStepId });
  });
}

/**
 * Flattens a tree of steps into a linear array in the order they appear when rendered
 */
export function flattenSteps<T extends BaseStepperValue>(steps: T[]): T[] {
  const result: T[] = [];
  for (const step of steps) {
    result.push(step);
    if (step.subSteps) result.push(...flattenSteps(step.subSteps as T[]));
  }
  return result;
}

/**
 * Checks if a step should be considered "visited" based on step progression.
 * A step is visited if it comes before the active step in the flattened order.
 */
export function isStepVisited({
  step,
  activeStepId,
  flatStepIds,
}: {
  step: BaseStepperValue;
  activeStepId: string;
  flatStepIds: string[];
}): boolean {
  const currentIndex = flatStepIds.indexOf(step.id);
  const activeIndex = flatStepIds.indexOf(activeStepId);
  // Step is visited if the active step comes after it in the flattened order
  return activeIndex > currentIndex;
}
