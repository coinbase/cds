import { useCallback, useMemo, useState } from 'react';

/**
 * Options for configuring the useMultiSelect hook
 */
export type MultiSelectOptions = {
  /** Initial array of selected values */
  initialValue: string[] | null;
};

/**
 * API returned by the useMultiSelect hook for managing multi-select state
 */
export type MultiSelectApi<T extends string> = {
  /** Current array of selected values */
  value: T[];
  /** Handler for toggling selection of one or more values */
  onChange: (value: string | string[] | null) => void;
  /** Add one or more values to the selection */
  addSelection: (value: string | string[]) => void;
  /** Remove one or more values from the selection */
  removeSelection: (value: string | string[]) => void;
  /** Clear all selected values */
  resetSelection: () => void;
};

/**
 * Hook for managing multi-select state with convenient API methods
 * @param options - Configuration options including initial value
 * @returns API object for managing multi-select state
 */
export const useMultiSelect = <T extends string>({
  initialValue,
}: MultiSelectOptions): MultiSelectApi<T> => {
  const [value, setValue] = useState<string[]>(initialValue ?? []);

  const onChange = useCallback((value: string | string[] | null) => {
    if (value === null) return setValue([]);
    setValue((prev) => {
      if (Array.isArray(value)) {
        const newValue = [...prev];
        for (const v of value) {
          if (!newValue.includes(v)) newValue.push(v);
        }
        return newValue;
      }
      if (!prev.includes(value)) return [...prev, value];
      return prev.filter((v) => v !== value);
    });
  }, []);

  const addSelection = useCallback((value: string | string[]) => {
    setValue((prev) => {
      if (Array.isArray(value)) {
        const newValue = [...prev];
        for (const v of value) {
          if (!newValue.includes(v)) newValue.push(v);
        }
        return newValue;
      }
      if (prev.includes(value)) return prev;
      return [...prev, value];
    });
  }, []);

  const removeSelection = useCallback((value: string | string[]) => {
    setValue((prev) => {
      if (Array.isArray(value)) return prev.filter((v) => !value.includes(v));
      if (!prev.includes(value)) return prev;
      return prev.filter((v) => v !== value);
    });
  }, []);

  const resetSelection = useCallback(() => {
    setValue((prev) => {
      if (prev.length === 0) return prev;
      return [];
    });
  }, []);

  const api = useMemo(
    () => ({ value, onChange, addSelection, removeSelection, resetSelection }),
    [value, onChange, addSelection, removeSelection, resetSelection],
  );

  return api as MultiSelectApi<T>;
};
