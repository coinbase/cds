import { createContext, useContext } from 'react';
import type { ChartContextValue as BaseChartContextValue } from '@coinbase/cds-common/visualizations/charts/context';

export type ChartContextValue = BaseChartContextValue<SVGSVGElement>;

const ChartContext = createContext<ChartContextValue | undefined>(undefined);

export const useChartContext = (): ChartContextValue => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChartContext must be used within a Chart component');
  }
  return context;
};

export const ChartProvider = ChartContext.Provider;
