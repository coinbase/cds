import { createContext, useContext } from 'react';

import type { CartesianChartContextValue } from './utils/context';

export const CartesianChartContext = createContext<CartesianChartContextValue | undefined>(
  undefined,
);

export const useCartesianChartContext = (): CartesianChartContextValue => {
  const context = useContext(CartesianChartContext);
  if (!context) {
    throw new Error(
      'useCartesianChartContext must be used within a CartesianChart component. See http://cds.coinbase.com/components/graphs/CartesianChart.',
    );
  }
  return context;
};

export const CartesianChartProvider = CartesianChartContext.Provider;
