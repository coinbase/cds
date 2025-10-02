import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { DottedLine } from '../../line';
import { Scrubber } from '../../scrubber/Scrubber';
import { AreaChart } from '..';

const BasicExample = () => {
  return (
    <AreaChart
      enableScrubbing
      showYAxis
      height={400}
      series={[
        {
          id: 'pageViews',
          data: [24, 13, 98, 39, 48, 38, 43],
        },
      ]}
      yAxis={{
        showGrid: true,
        domain: { min: 0 },
      }}
    >
      <Scrubber />
    </AreaChart>
  );
};

const StackedExample = () => {
  const theme = useTheme();

  return (
    <AreaChart
      enableScrubbing
      showLines
      stacked
      curve="natural"
      height={256}
      series={[
        {
          id: 'currentRewards',
          data: [
            100, 150, 200, 280, 380, 500, 650, 820, 1020, 1250, 1510, 1800, 2120, 2470, 2850, 3260,
            3700, 4170,
          ],
          color: theme.color.fg,
        },
        {
          id: 'potentialRewards',
          data: [
            150, 220, 300, 400, 520, 660, 820, 1000, 1200, 1420, 1660, 1920, 2200, 2500, 2820, 3160,
            3520, 3900,
          ],
          color: theme.color.fgPositive,
          type: 'dotted',
          LineComponent: DottedLine,
        },
      ]}
      type="dotted"
    >
      <Scrubber />
    </AreaChart>
  );
};

const AreaChartStories = () => {
  return (
    <ExampleScreen>
      <Example title="Basic">
        <BasicExample />
      </Example>
      <Example title="Stacked">
        <StackedExample />
      </Example>
      <Example title="Negative Values">
        <AreaChart
          enableScrubbing
          showLines
          showYAxis
          height={400}
          series={[
            {
              id: 'pageViews',
              data: [24, 13, -98, 39, 48, 38, 43],
            },
          ]}
          type="gradient"
          yAxis={{
            showGrid: true,
          }}
        >
          <Scrubber />
        </AreaChart>
      </Example>
      <Example title="Styles">
        <AreaChart
          enableScrubbing={false}
          height={350}
          series={[
            {
              id: 'visitors',
              data: [450, 520, 480, 600, 750, 680, 590],
              label: 'Weekly Visitors',
              color: '#fb4d3d',
              type: 'dotted',
            },
            {
              id: 'repeatVisitors',
              data: [250, 200, 150, 140, 100, 80, 50],
              label: 'Weekly Repeat Visitors',
              color: '#16a34a',
            },
            {
              id: 'signups',
              data: [45, 62, 55, 250, 380, 400, 450],
              label: 'Weekly Signups',
              color: '#2563eb',
              type: 'gradient',
            },
          ]}
        />
      </Example>
    </ExampleScreen>
  );
};

export default AreaChartStories;
