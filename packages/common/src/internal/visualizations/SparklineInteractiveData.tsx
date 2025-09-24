import type { ChartDataPoint, ChartTimeseries } from '../../types/Chart';
import { asset as assetJSON } from '../data/asset';

export type SparklinePeriod = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

const transformAndFilterPrices = (
  data?: readonly {
    price: string;
    timestamp: string | null;
  }[],
): ChartDataPoint[] => {
  // Filters out null timestamps and corrects the type
  const filterNullTimestamps = (value: { price: string; timestamp: string | null }) => {
    if (!value.timestamp) {
      return [];
    }
    return [
      {
        price: value.price,
        timestamp: value.timestamp,
      },
    ];
  };

  return (data ?? [])
    .flatMap(filterNullTimestamps)
    .map((point) => ({
      value: parseFloat(point.price),
      date: new Date(point.timestamp),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const sparklineInteractiveData = (() => {
  const { asset } = assetJSON.data.viewer.assetByUuid;

  return {
    hour: transformAndFilterPrices(asset.priceDataForHour.quotes),
    day: transformAndFilterPrices(asset.priceDataForDay.quotes),
    week: transformAndFilterPrices(asset.priceDataForWeek.quotes),
    month: transformAndFilterPrices(asset.priceDataForMonth.quotes),
    year: transformAndFilterPrices(asset.priceDataForYear.quotes),
    all: transformAndFilterPrices(asset.priceDataForAll.quotes),
  };
})();

export const strokeColor = '#F7931A';
const strokeColor2 = '#03925e';
function generateTimeseriesList(data: ChartDataPoint[]) {
  const timeseries = [];
  const prices = data;
  timeseries.push({
    points: prices,
    id: 'hour',
    strokeColor,
  });

  timeseries.push({
    points: prices.map((point) => ({
      ...point,
      value: point.value + 10000 + Math.random() * 1000,
    })),
    id: 'hour 2',
    strokeColor: strokeColor2,
  });

  return timeseries;
}
