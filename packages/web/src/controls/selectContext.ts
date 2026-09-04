import { createContext, useContext } from 'react';

import type { SelectBaseProps } from './Select';

/**
 * @deprecated Please use the new Select alpha component instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type SelectContextType = {
  handleCloseMenu?: () => void;
} & Pick<SelectBaseProps, 'onChange' | 'value'>;

export const defaultContext = {
  onChange: () => {},
  value: undefined,
  handleCloseMenu: undefined,
};

/**
 * @deprecated Please use the new Select alpha component instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const SelectContext = createContext<SelectContextType>(defaultContext);

/**
 * @deprecated Please use the new Select alpha component instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const SelectProvider = SelectContext.Provider;

/**
 * @deprecated Please use the new Select alpha component instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const useSelectContext = () => useContext(SelectContext);
