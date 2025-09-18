import { createContext, useContext } from 'react';

import type { SelectBaseProps } from './Select';

export type SelectContextType = {
  handleCloseMenu?: () => void;
} & Pick<SelectBaseProps, 'onChange' | 'value'>;

export const defaultContext = {
  onChange: () => {},
  value: undefined,
  handleCloseMenu: undefined,
};

export const SelectContext = createContext<SelectContextType>(defaultContext);
export const SelectProvider = SelectContext.Provider;

export const useSelectContext = () => useContext(SelectContext);
