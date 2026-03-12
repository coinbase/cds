import { useCallback } from 'react';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { DottedLine } from '../../line';
import { Scrubber } from '../../scrubber/Scrubber';
import { AreaChart } from '..';

const basicData = [24, 13, 98, 39, 48, 38, 43];

const BasicExample = () => {
  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => `Point ${index + 1}: ${basicData[index]}`,
    [],
  );

  return (
    <AreaChart
      enableScrubbing
      showYAxis
      accessibilityLabel={`Area chart with ${basicData.length} data points. Swipe to navigate.`}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={400}
      series={[{ id: 'pageViews', data: basicData }]}
      yAxis={{
        showGrid: true,
        domain: { min: 0 },
      }}
    >
      <Scrubber />
    </AreaChart>
  );
};

const currentRewardsData = [
  100, 150, 200, 280, 380, 500, 650, 820, 1020, 1250, 1510, 1800, 2120, 2470, 2850, 3260, 3700,
  4170,
];
const potentialRewardsData = [
  150, 220, 300, 400, 520, 660, 820, 1000, 1200, 1420, 1660, 1920, 2200, 2500, 2820, 3160, 3520,
  3900,
];

const StackedExample = () => {
  const theme = useTheme();

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) =>
      `Point ${index + 1}: current ${currentRewardsData[index]}, potential ${potentialRewardsData[index]}`,
    [],
  );

  return (
    <AreaChart
      enableScrubbing
      showLines
      stacked
      accessibilityLabel={`Stacked rewards chart with ${currentRewardsData.length} data points. Swipe to navigate.`}
      curve="natural"
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={256}
      series={[
        {
          id: 'currentRewards',
          data: currentRewardsData,
          color: theme.color.fg,
        },
        {
          id: 'potentialRewards',
          data: potentialRewardsData,
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
          accessibilityLabel="Area chart with negative values. 7 data points. Swipe to navigate."
          getScrubberAccessibilityLabel={(index: number) =>
            `Point ${index + 1}: ${[24, 13, -98, 39, 48, 38, 43][index]}`
          }
          height={150}
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
      <Example title="Horizontal Layout">
        <AreaChart
          enableScrubbing
          showLines
          showXAxis
          showYAxis
          accessibilityLabel="Volume by asset. 5 data points. Swipe to navigate."
          getScrubberAccessibilityLabel={(index: number) =>
            `${['BTC', 'ETH', 'SOL', 'DOGE', 'ADA'][index]}: ${[68, 54, 43, 29, 18][index]}%`
          }
          height={280}
          layout="horizontal"
          series={[
            {
              id: 'volume',
              data: [68, 54, 43, 29, 18],
              label: 'Volume',
            },
          ]}
          type="gradient"
          xAxis={{ domain: { min: 0, max: 80 }, tickLabelFormatter: (value) => `${value}%` }}
          yAxis={{ data: ['BTC', 'ETH', 'SOL', 'DOGE', 'ADA'], scaleType: 'band' }}
        >
          <Scrubber />
        </AreaChart>
      </Example>
    </ExampleScreen>
  );
};

export default AreaChartStories;
