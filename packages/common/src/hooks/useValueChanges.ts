import { usePreviousValues } from './usePreviousValues';

export const useValueChanges = (newValue: string) => {
  const { getPreviousValue, addPreviousValue } = usePreviousValues();

  const previousValue = getPreviousValue(true);
  return {
    hasChanged: newValue !== previousValue,
    hasNotChanged: newValue === previousValue,
    previousValue,
    newValue,
    addPreviousValue,
  };
};
