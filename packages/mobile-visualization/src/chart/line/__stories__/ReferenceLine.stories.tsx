import { useTheme } from '@coinbase/cds-mobile';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';

import { LineChart } from '../LineChart';
import { ReferenceLine } from '../ReferenceLine';

const ReferenceLineStories = () => {
  const theme = useTheme();
  return (
    <ExampleScreen>
      <Example title="Basic">
        <LineChart
          showArea
          curve="monotone"
          height={250}
          inset={0}
          series={[
            {
              id: 'prices',
              data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
            },
          ]}
        >
          <ReferenceLine
            dataX={4}
            label="Vertical Reference Line"
            labelProps={{ horizontalAlignment: 'left', dx: 6, inset: 0 }}
          />
          <ReferenceLine
            dataY={70}
            label="Horizontal Reference Line"
            labelProps={{
              verticalAlignment: 'bottom',
              dy: -6,
              horizontalAlignment: 'right',
              inset: 0,
            }}
          />
        </LineChart>
      </Example>
      <Example title="With Custom Label">
        <LineChart
          curve="monotone"
          height={250}
          inset={{ right: 32, top: 0, left: 0, bottom: 0 }}
          series={[
            {
              id: 'prices',
              data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
            },
          ]}
        >
          <ReferenceLine
            dataY={25}
            label="Liquidation"
            labelPosition="left"
            labelProps={{
              dx: 4,
              borderRadius: 100,
              inset: { top: 4, bottom: 4, left: 8, right: 8 },
              horizontalAlignment: 'left',
              color: `rgb(${theme.spectrum.yellow70})`,
              background: theme.color.accentSubtleYellow,
            }}
            stroke={theme.color.bgWarning}
          />
        </LineChart>
      </Example>
    </ExampleScreen>
  );
};

export default ReferenceLineStories;
