import { memo, useCallback } from 'react';
import { useTheme } from '@coinbase/cds-mobile';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';

import { DefaultReferenceLineLabel } from '../DefaultReferenceLineLabel';
import { DottedLine } from '../DottedLine';
import { LineChart } from '../LineChart';
import { ReferenceLine } from '../ReferenceLine';

const LiquidationLabelMobile = memo<
  React.ComponentProps<typeof DefaultReferenceLineLabel> & {
    accentColor: string;
    yellowColor: string;
  }
>(({ accentColor, yellowColor, ...props }) => (
  <DefaultReferenceLineLabel
    {...props}
    background={accentColor}
    borderRadius={100}
    color={`rgb(${yellowColor})`}
    horizontalAlignment="left"
    inset={{ top: 4, bottom: 4, left: 8, right: 8 }}
  />
));

const ReferenceLineStories = () => {
  const theme = useTheme();

  const liquidationLabelComponent = useCallback(
    (props: React.ComponentProps<typeof DefaultReferenceLineLabel>) => (
      <LiquidationLabelMobile
        {...props}
        accentColor={theme.color.accentSubtleYellow}
        yellowColor={theme.spectrum.yellow70}
      />
    ),
    [theme.color.accentSubtleYellow, theme.spectrum.yellow70],
  );

  return (
    <ExampleScreen>
      <Example title="Simple Reference Line">
        <LineChart
          showArea
          height={250}
          series={[
            {
              id: 'prices',
              data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
              color: theme.color.fgPositive,
            },
          ]}
        >
          <ReferenceLine
            LineComponent={(props) => (
              <DottedLine {...props} dashIntervals={[0, 16]} strokeWidth={3} />
            )}
            dataY={10}
            stroke={theme.color.fg}
          />
        </LineChart>
      </Example>
      <Example title="With Labels">
        <LineChart
          showArea
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
            labelHorizontalAlignment="left"
          />
          <ReferenceLine
            dataY={70}
            label="Horizontal Reference Line"
            labelHorizontalAlignment="right"
            labelVerticalAlignment="bottom"
          />
        </LineChart>
      </Example>
      <Example title="Label Customization">
        <LineChart
          showArea
          height={250}
          series={[
            {
              id: 'prices',
              data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
            },
          ]}
        >
          <ReferenceLine
            dataY={75}
            label="Top Right"
            labelDx={-8}
            labelDy={-8}
            labelFont="label1"
            labelHorizontalAlignment="right"
            labelPosition="right"
            labelVerticalAlignment="bottom"
          />
          <ReferenceLine
            dataX={7}
            label="Bottom Left"
            labelDx={8}
            labelDy={8}
            labelFont="label1"
            labelHorizontalAlignment="left"
            labelPosition="top"
            labelVerticalAlignment="top"
          />
        </LineChart>
      </Example>
      <Example title="With Custom Label Component">
        <LineChart
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
            LabelComponent={liquidationLabelComponent}
            dataY={25}
            label="Liquidation"
            labelPosition="left"
            stroke={theme.color.bgWarning}
          />
        </LineChart>
      </Example>
    </ExampleScreen>
  );
};

export default ReferenceLineStories;
