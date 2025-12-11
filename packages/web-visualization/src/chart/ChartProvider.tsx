import { createContext, useContext } from 'react';

import type {
  CartesianChartContextValue,
  ChartContextValue,
  PolarChartContextValue,
} from './utils/context';

const CartesianChartContext = createContext<CartesianChartContextValue | undefined>(undefined);
const PolarChartContext = createContext<PolarChartContextValue | undefined>(undefined);

/**
 * Hook to access the CartesianChart context.
 * Must be used within a CartesianChart component.
 */
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

/**
 * Hook to access the PolarChart context.
 * Must be used within a PolarChart component.
 */
export const usePolarChartContext = (): PolarChartContextValue => {
  const context = useContext(PolarChartContext);
  if (!context) {
    throw new Error(
      'usePolarChartContext must be used within a PolarChart component. See http://cds.coinbase.com/components/graphs/PolarChart.',
    );
  }
  return context;
};

export const PolarChartProvider = PolarChartContext.Provider;

/**
 * Hook to access chart context.
 * Use this for components that need to work in any chart type (e.g., ChartText).
 *
 * @example
 * const { width, height, drawingArea } = useChartContext();
 */
export const useChartContext = (): ChartContextValue => {
  const cartesian = useContext(CartesianChartContext);
  const polar = useContext(PolarChartContext);

  const context = cartesian ?? polar;
  if (!context) {
    throw new Error(
      'useChartContext must be used within a Chart component (CartesianChart or PolarChart).',
    );
  }

  return context;
};
