import { useCallback } from 'react';

export function useHandleRadioSelect<RadioValue extends string>(
  onChange?: (value: RadioValue) => void,
) {
  return useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      onChange?.(event.target.value as RadioValue);
    },
    [onChange],
  );
}
