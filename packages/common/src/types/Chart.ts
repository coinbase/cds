import type { ScaleTime } from 'd3-scale';

export type ChartDataPoint = {
  value: number;
  date: Date;
  x?: number;
  y?: number;
};
export type ChartData = ChartDataPoint[];
export type ChartTimeseries = {
  points: ChartData;
  id: string;
  strokeColor: string;
};
export type ChartFormatDate<Period extends string> = (value: Date, period: Period) => string;
export type ChartFormatAmount = (value: string | number) => string;
export type ChartScrubParams<T> = {
  point: ChartDataPoint;
  period: T;
};
export type ChartXFunction = ScaleTime<number, number>;
export type ChartGetMarker = (xPos: number) =>
  | {
      value: number;
      date: Date;
      x: number;
      y: number;
    }
  | undefined;
