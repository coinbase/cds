// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=60677-35156
// source=packages/web/src/visualizations/chart/bar/BarChart.tsx
// component=BarChart
import figma from 'figma';

const instance = figma.selectedInstance;

// "chart type" drives stacking behavior and bar shape
const chartType = instance.getEnum('chart type', {
  'stacked (rounded)': 'stacked-rounded',
  'gain/loss': 'gain-loss',
  stacked: 'stacked',
});

const showYAxis = instance.getBoolean('Show y axis');

// Derived flags from chart type
const stacked = chartType !== 'gain-loss';
const roundedStyle = chartType === 'stacked-rounded';

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<BarChart
  ${stacked ? 'stacked' : ''}
  ${showYAxis ? 'showYAxis' : ''}
  ${roundedStyle ? 'borderRadius={1000} roundBaseline' : ''}
  series={[
    { id: 'series-1', data: [40, 60, 30, 80, 50] },
    { id: 'series-2', data: [20, 30, 50, 40, 60] },
  ]}
  height={300}
/>`,
  imports: ['import { BarChart } from "@coinbase/cds-web/visualizations/chart"'],
  id: 'bar-chart',
  metadata: { nestable: false },
};
