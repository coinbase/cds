import { memo, useCallback, useMemo } from 'react';
import { useDerivedValue, withTiming } from 'react-native-reanimated';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { useTheme } from '@coinbase/cds-mobile';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { VStack } from '@coinbase/cds-mobile/layout';

import { useCartesianChartContext } from '../../ChartProvider';
import { Scrubber } from '../../scrubber';
import { getPointOnSerializableScale, useScrubberContext } from '../../utils';
import {
  DefaultReferenceLineLabel,
  type DefaultReferenceLineLabelProps,
} from '../DefaultReferenceLineLabel';
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
      <Example title="Start Price Reference Line">
        <StartPriceReferenceLine />
      </Example>
    </ExampleScreen>
  );
};

const FADE_ZONE = 128;

const StartPriceLabel = memo((props: DefaultReferenceLineLabelProps) => {
  const theme = useTheme();
  const { scrubberPosition } = useScrubberContext();
  const { getXSerializableScale, drawingArea } = useCartesianChartContext();
  const xScale = useMemo(() => getXSerializableScale(), [getXSerializableScale]);

  const opacity = useDerivedValue(() => {
    if (scrubberPosition.value === undefined) return withTiming(0, { duration: 250 });
    if (!xScale) return withTiming(1, { duration: 250 });
    const scrubX = getPointOnSerializableScale(scrubberPosition.value, xScale);
    const rightEdge = drawingArea.x + drawingArea.width;
    const target = rightEdge - scrubX >= FADE_ZONE ? 1 : 0;
    return withTiming(target, { duration: 250 });
  }, [scrubberPosition, xScale, drawingArea]);

  return (
    <DefaultReferenceLineLabel
      {...props}
      background={theme.color.bgSecondary}
      borderRadius={12.5}
      color={theme.color.fg}
      font="label1"
      inset={{ top: 4, bottom: 4, left: 8, right: 8 }}
      opacity={opacity}
    />
  );
});

function StartPriceReferenceLine() {
  const theme = useTheme();
  const hourData = useMemo(() => sparklineInteractiveData.hour, []);
  const startPrice = hourData[0].value;
  const endPrice = hourData[hourData.length - 1].value;
  const isPositive = endPrice >= startPrice;
  const seriesColor = isPositive ? theme.color.fgPositive : theme.color.fgNegative;

  return (
    <LineChart
      enableScrubbing
      showArea
      areaType="dotted"
      height={300}
      inset={0}
      series={[
        {
          id: 'hourly-prices',
          data: hourData.map((d) => d.value),
          color: seriesColor,
        },
      ]}
      xAxis={{
        range: ({ min, max }) => ({ min, max: max - 24 }),
      }}
    >
      <Scrubber />
      <ReferenceLine
        LabelComponent={StartPriceLabel}
        LineComponent={(props) => <DottedLine {...props} dashIntervals={[0, 16]} strokeWidth={3} />}
        dataY={startPrice}
        label={startPrice.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        labelDx={-12}
        labelHorizontalAlignment="right"
        stroke={theme.color.fgMuted}
      />
    </LineChart>
  );
}

export default ReferenceLineStories;
