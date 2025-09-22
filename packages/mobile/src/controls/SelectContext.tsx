import React, { createContext } from 'react';
import { isProduction } from '@cbhq/cds-utils';

import type { SelectContextType } from './useSelect';

const defaultContext = {
  value: '',
  onChange: () => null,
  handleClose: () => null,
};

const errorMessage =
  'SelectContext is undefined. SelectProvider was not found higher up the tree. ';

export const SelectContext = createContext<SelectContextType>(defaultContext);
export const SelectProvider = SelectContext.Provider;

export const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  //   TODO: check for something required
  if (!context && !isProduction()) {
    console.error(errorMessage);
  }
  return context;
};
