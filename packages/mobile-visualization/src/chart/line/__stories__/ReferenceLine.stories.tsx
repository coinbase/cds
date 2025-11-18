import { memo, useCallback } from 'react';
import { useTheme } from '@coinbase/cds-mobile';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';

import { DefaultReferenceLineLabel } from '../DefaultReferenceLineLabel';
import { LineChart } from '../LineChart';
import { ReferenceLine } from '../ReferenceLine';

const VerticalLabel = memo<React.ComponentProps<typeof DefaultReferenceLineLabel>>((props) => (
  <DefaultReferenceLineLabel {...props} horizontalAlignment="left" inset={0} />
));

const HorizontalLabel = memo<React.ComponentProps<typeof DefaultReferenceLineLabel>>((props) => (
  <DefaultReferenceLineLabel
    {...props}
    horizontalAlignment="right"
    inset={0}
    verticalAlignment="bottom"
  />
));

const BottomLeftLabel = memo<React.ComponentProps<typeof DefaultReferenceLineLabel>>((props) => (
  <DefaultReferenceLineLabel {...props} dy={-4} verticalAlignment="bottom" />
));

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
      <Example title="Basic">
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
          <ReferenceLine LabelComponent={VerticalLabel} dataX={4} label="Vertical Reference Line" />
          <ReferenceLine
            LabelComponent={HorizontalLabel}
            dataY={70}
            label="Horizontal Reference Line"
          />
        </LineChart>
      </Example>
      <Example title="With Custom Label">
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
