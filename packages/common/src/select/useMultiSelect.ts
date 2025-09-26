import { useCallback, useMemo, useState } from 'react';

export type MultiSelectOptions = {
  initialValue: string[] | null;
};

export type MultiSelectApi<T extends string> = {
  value: T[];
  onChange: (value: string | string[] | null) => void;
  addSelection: (value: string | string[]) => void;
  removeSelection: (value: string | string[]) => void;
  resetSelection: () => void;
};

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
