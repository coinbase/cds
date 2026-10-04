import { createContext, useContext } from 'react';

import type { CartesianChartContextValue, ChartContextValue } from './utils/context';

export const CartesianChartContext = createContext<CartesianChartContextValue | undefined>(
  undefined,
);

/**
 * Hook to access the generic chart context.
 * Works with any chart type (cartesian, polar, etc.).
 */
export const useChartContext = (): ChartContextValue => {
  const context = useContext(CartesianChartContext);
  if (!context) {
    throw new Error(
      'useChartContext must be used within a Chart component. See http://cds.coinbase.com/components/graphs/CartesianChart.',
    );
  }
  return context;
};

/**
 * Hook to access the cartesian chart context.
 * Provides access to cartesian-specific features.
 */
export const useCartesianChartContext = (): CartesianChartContextValue => {
  const context = useContext(CartesianChartContext);
  if (!context) {
    throw new Error(
      'useCartesianChartContext must be used within a CartesianChart component. See https://cds.coinbase.com/components/charts/CartesianChart.',
    );
  }
  return context;
};

export const CartesianChartProvider = CartesianChartContext.Provider;
