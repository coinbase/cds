import React, { createContext } from 'react';
import { isProduction } from '@coinbase/cds-utils';

import type { SelectContextType } from './useSelect';

const defaultContext = {
  value: '',
  onChange: () => null,
  handleClose: () => null,
};

const errorMessage =
  'SelectContext is undefined. SelectProvider was not found higher up the tree. ';

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
export const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  //   TODO: check for something required
  if (!context && !isProduction()) {
    console.error(errorMessage);
  }
  return context;
};
