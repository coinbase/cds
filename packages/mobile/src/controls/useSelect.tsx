import { useMemo } from 'react';

import type { SelectBaseProps } from './Select';

export const useSelect = ({
  value,
  onChange,
  handleClose,
}: { handleClose?: () => void } & Pick<SelectBaseProps, 'value' | 'onChange'>) => {
  return useMemo(
    () => ({
      value,
      onChange,
      handleClose,
    }),
    [value, onChange, handleClose],
  );
};

export type SelectContextType = ReturnType<typeof useSelect>;
