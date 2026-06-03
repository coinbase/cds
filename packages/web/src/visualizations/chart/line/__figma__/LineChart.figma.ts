// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=60677-2698
// source=packages/web/src/visualizations/chart/line/LineChart.tsx
// component=LineChart
import figma from 'figma';

const instance = figma.selectedInstance;

// "chart type" drives series count and area fill behavior
const chartType = instance.getEnum('chart type', {
  empty: 'empty',
  'empty 2': 'empty',
  'empty 3': 'empty',
  default: 'default',
  'gain/loss': 'gain-loss',
  'gain/loss 2': 'gain-loss',
  forecast: 'forecast',
  'double line': 'double',
  'triple line': 'triple',
  predictions: 'predictions',
});

const showYAxis = instance.getBoolean('show y-axis');

// Derived display flags from chart type
const showArea = chartType === 'default' || chartType === 'gain-loss';
const isDoubleLine = chartType === 'double';
const isTripleLine = chartType === 'triple';
const hasForecast = chartType === 'forecast' || chartType === 'predictions';

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<LineChart
  ${showYAxis ? 'showYAxis' : ''}
  ${showArea ? 'showArea' : ''}
  series={[
    { id: 'series-1', data: [10, 45, 30, 70, 55] },${
      isDoubleLine || isTripleLine
        ? figma.code`
    { id: 'series-2', data: [20, 35, 50, 40, 65] },`
        : hasForecast
          ? figma.code`
    { id: 'prediction', data: [55, 65, 75, 85, 95], type: 'dotted' },`
          : ''
    }${
      isTripleLine
        ? figma.code`
    { id: 'series-3', data: [30, 25, 60, 50, 45] },`
        : ''
    }
  ]}
  height={300}
/>`,
  imports: ['import { LineChart } from "@coinbase/cds-web/visualizations/chart"'],
  id: 'line-chart',
  metadata: { nestable: false },
};
