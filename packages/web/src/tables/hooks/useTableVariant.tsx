import { useContext } from 'react';

import { TableContext } from '../context/TableContext';

export const useTableVariant = () => {
  const variant = useContext(TableContext) ?? 'default';

  return variant;
};
