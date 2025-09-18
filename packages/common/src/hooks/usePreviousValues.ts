import { useCallback, useRef } from 'react';

// keeps track of all unique previous values
// it's up to the user to add previous values
export function usePreviousValues<T>(initialValues: T[] = []) {
  const previousValues = useRef<T[]>(initialValues ?? []);

  const addPreviousValue = useCallback(
    (newValue: T) => {
      if (
        previousValues.current.length === 0 ||
        previousValues.current[previousValues.current.length - 1] !== newValue
      ) {
        previousValues.current = [...previousValues.current, newValue];
      }
    },
    [previousValues],
  );

  const getPreviousValue = useCallback(
    (allowDuplicates?: boolean) => {
      if (previousValues.current.length > 1 && !allowDuplicates) {
        return previousValues.current[previousValues.current.length - 2];
      }

      if (previousValues.current.length > 0) {
        return previousValues.current[previousValues.current.length - 1];
      }

      return undefined;
    },
    [previousValues],
  );

  return {
    addPreviousValue,
    getPreviousValue,
  };
}
