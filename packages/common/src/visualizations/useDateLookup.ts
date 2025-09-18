import { useCallback } from 'react';

import type { ChartFormatDate, ChartGetMarker } from '../types';

export type GetFormattedDateParams<Period extends string> = {
  getMarker: ChartGetMarker;
  formatDate: ChartFormatDate<Period>;
  selectedPeriod: Period;
};

export function useDateLookup<Period extends string>({
  getMarker,
  formatDate,
  selectedPeriod,
}: GetFormattedDateParams<Period>) {
  return useCallback(
    (xPos: number) => {
      const { date } = getMarker(xPos) ?? {};
      if (!date) {
        return '';
      }
      return formatDate(date, selectedPeriod);
    },
    [formatDate, getMarker, selectedPeriod],
  );
}
