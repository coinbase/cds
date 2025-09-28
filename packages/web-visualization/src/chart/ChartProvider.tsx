import { createContext, useContext } from 'react';
import type { CartesianChartContextValue as BaseCartesianChartContextValue } from '@coinbase/cds-common/visualizations/charts/context';

export type CartesianChartContextValue = BaseCartesianChartContextValue<SVGSVGElement>;

const CartesianChartContext = createContext<CartesianChartContextValue | undefined>(undefined);

export const useCartesianChartContext = (): CartesianChartContextValue => {
  const context = useContext(CartesianChartContext);
  if (!context) {
    throw new Error('useCartesianChartContext must be used within a CartesianChart component');
  }
  return context;
};

export const CartesianChartProvider = CartesianChartContext.Provider;
