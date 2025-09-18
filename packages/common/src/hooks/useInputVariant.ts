import { useMemo } from 'react';

import type { InputVariant } from '../types/InputBaseProps';

export const useInputVariant = (focused: boolean, variant: InputVariant) => {
  return useMemo(
    () => (focused && variant !== 'positive' && variant !== 'negative' ? 'primary' : variant),
    [focused, variant],
  );
};
