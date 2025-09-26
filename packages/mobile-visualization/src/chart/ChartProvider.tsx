import { createContext, useContext } from 'react';
import type { Svg } from 'react-native-svg';
import type { ChartContextValue as BaseChartContextValue } from '@coinbase/cds-common/visualizations/charts/context';

export type ChartContextValue = BaseChartContextValue<Svg>;

const ChartContext = createContext<ChartContextValue | undefined>(undefined);

export const useChartContext = (): ChartContextValue => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChartContext must be used within a Chart component');
  }
  return context;
};

export const ChartProvider = ChartContext.Provider;
