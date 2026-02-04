import { memo, useMemo, useRef } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { Button } from '@coinbase/cds-web/buttons';
import { useTheme } from '@coinbase/cds-web/hooks/useTheme';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import {
  type ChartTextChildren,
  DefaultScrubberBeacon,
  DefaultScrubberBeaconLabel,
  DefaultScrubberLabel,
  getLineData,
  type ScrubberBeaconLabelProps,
  type ScrubberBeaconProps,
  type ScrubberLabelPosition,
  type ScrubberLabelProps,
  type ScrubberRef,
  useCartesianChartContext,
  useScrubberContext,
} from '../..';
import { LineChart, SolidLine } from '../../line';
import { Scrubber } from '../Scrubber';

const sampleData = [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58];

export default {
  component: Scrubber,
  title: 'Components/Chart/Scrubber',
};

const Example: React.FC<
  React.PropsWithChildren<{ title: string; description?: string | React.ReactNode }>
> = ({ children, title, description }) => {
  return (
    <VStack gap={2}>
      <Text as="h2" display="block" font="title3">
        {title}
      </Text>
      {description}
      {children}
    </VStack>
  );
};

const BasicScrubber = () => {
  return (
    <LineChart
      enableScrubbing
      showArea
      showYAxis
      height={{ base: 150, tablet: 200, desktop: 250 }}
      series={[
        {
          id: 'prices',
          data: sampleData,
        },
      ]}
      xAxis={{
        range: ({ min, max }) => ({ min, max: max - 8 }),
      }}
      yAxis={{
        showGrid: true,
      }}
    >
      <Scrubber idlePulse />
    </LineChart>
  );
};

const SeriesFilter = () => {
  return (
    <LineChart
      enableScrubbing
      height={{ base: 150, tablet: 200, desktop: 250 }}
      series={[
        {
          id: 'top',
          data: [15, 28, 32, 44, 46, 36, 40, 45, 48, 38],
        },
        {
          id: 'upperMiddle',
          data: [12, 23, 21, 29, 34, 28, 31, 38, 42, 35],
          color: '#ef4444',
          type: 'dotted',
        },
        {
          id: 'lowerMiddle',
          data: [8, 15, 14, 25, 20, 18, 22, 28, 24, 30],
          color: '#f59e0b',
          curve: 'natural',
        },
        {
          id: 'bottom',
          data: [4, 8, 11, 15, 16, 14, 16, 10, 12, 14],
          color: '#800080',
          curve: 'step',
          showArea: true,
        },
      ]}
    >
      <Scrubber seriesIds={['top', 'lowerMiddle']} />
    </LineChart>
  );
};

const WithLabels = () => {
  return (
    <LineChart
      enableScrubbing
      showArea
      height={{ base: 150, tablet: 200, desktop: 250 }}
      series={[
        {
          id: 'prices',
          data: sampleData,
          label: 'Price',
        },
      ]}
    >
      <Scrubber label={(dataIndex: number) => `Day ${dataIndex + 1}`} />
    </LineChart>
  );
};

const IdlePulse = () => {
  return (
    <LineChart
      enableScrubbing
      showArea
      height={{ base: 150, tablet: 200, desktop: 250 }}
      series={[
        {
          id: 'prices',
          data: sampleData,
          color: 'var(--color-fgPositive)',
        },
      ]}
    >
      <Scrubber idlePulse />
    </LineChart>
  );
};

const ImperativePulse = () => {
  const scrubberRef = useRef<ScrubberRef>(null);

  return (
    <VStack gap={2}>
      <LineChart
        enableScrubbing
        showArea
        height={{ base: 150, tablet: 200, desktop: 250 }}
        series={[
          {
            id: 'prices',
            data: sampleData,
          },
        ]}
      >
        <Scrubber ref={scrubberRef} />
      </LineChart>
      <Button onClick={() => scrubberRef.current?.pulse()}>Pulse</Button>
    </VStack>
  );
};

const BeaconStroke = () => {
  return (
    <Box borderRadius={300} padding={2} style={{ background: 'rgb(var(--red40))' }}>
      <LineChart
        enableScrubbing
        showArea
        height={{ base: 150, tablet: 200, desktop: 250 }}
        series={[
          {
            id: 'prices',
            data: sampleData,
            color: 'rgb(var(--gray0))',
          },
        ]}
      >
        <Scrubber
          hideOverlay
          idlePulse
          beaconStroke="rgb(var(--red40))"
          lineStroke="rgb(var(--gray0))"
        />
      </LineChart>
    </Box>
  );
};

const CustomBeacon = () => {
  const InvertedBeacon = memo((props: ScrubberBeaconProps) => (
    <DefaultScrubberBeacon
      {...props}
      color="var(--color-bg)"
      radius={5}
      stroke="var(--color-fg)"
      strokeWidth={3}
    />
  ));

  return (
    <LineChart
      enableScrubbing
      showArea
      showYAxis
      height={{ base: 150, tablet: 200, desktop: 250 }}
      series={[
        {
          id: 'prices',
          data: sampleData,
          color: 'var(--color-fg)',
        },
      ]}
      xAxis={{
        range: ({ min, max }) => ({ min, max: max - 16 }),
      }}
      yAxis={{
        showGrid: true,
        domain: { min: 0, max: 100 },
      }}
    >
      <Scrubber BeaconComponent={InvertedBeacon} />
    </LineChart>
  );
};

const CustomBeaconLabel = () => {
  const MyScrubberBeaconLabel = memo(
    ({ seriesId, color, label, ...props }: ScrubberBeaconLabelProps) => {
      const { getSeriesData, dataLength } = useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();

      const seriesData = useMemo(
        () => getLineData(getSeriesData(seriesId)),
        [getSeriesData, seriesId],
      );

      const dataIndex = useMemo(() => {
        return scrubberPosition ?? Math.max(0, dataLength - 1);
      }, [scrubberPosition, dataLength]);

      const percentageLabel = useMemo(() => {
        if (seriesData !== undefined) {
          const dataAtPosition = seriesData[dataIndex];
          return `${label} · ${dataAtPosition}%`;
        }
        return label;
      }, [label, seriesData, dataIndex]);

      return (
        <DefaultScrubberBeaconLabel
          {...props}
          background={color}
          color="rgb(var(--gray0))"
          label={percentageLabel}
          seriesId={seriesId}
        />
      );
    },
  );

  return (
    <LineChart
      enableScrubbing
      showArea
      showYAxis
      areaType="dotted"
      height={{ base: 150, tablet: 200, desktop: 250 }}
      series={[
        {
          id: 'Boston',
          data: [25, 30, 35, 45, 60, 100],
          color: 'rgb(var(--green40))',
          label: 'Boston',
        },
        {
          id: 'Miami',
          data: [20, 25, 30, 35, 20, 0],
          color: 'rgb(var(--blue40))',
          label: 'Miami',
        },
        {
          id: 'Denver',
          data: [10, 15, 20, 25, 40, 0],
          color: 'rgb(var(--orange40))',
          label: 'Denver',
        },
        {
          id: 'Phoenix',
          data: [15, 10, 5, 0, 0, 0],
          color: 'rgb(var(--red40))',
          label: 'Phoenix',
        },
      ]}
      yAxis={{
        showGrid: true,
      }}
    >
      <Scrubber BeaconLabelComponent={MyScrubberBeaconLabel} />
    </LineChart>
  );
};

const PercentageBeaconLabels = ({ preferredSide }: { preferredSide?: ScrubberLabelPosition }) => {
  const PercentageScrubberBeaconLabel = memo(
    ({ seriesId, color, label, ...props }: ScrubberBeaconLabelProps) => {
      const { getSeriesData, dataLength } = useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();

      const seriesData = useMemo(
        () => getLineData(getSeriesData(seriesId)),
        [getSeriesData, seriesId],
      );

      const dataIndex = useMemo(() => {
        return scrubberPosition ?? Math.max(0, dataLength - 1);
      }, [scrubberPosition, dataLength]);

      const percentageLabel: ChartTextChildren = useMemo(() => {
        if (seriesData !== undefined) {
          const dataAtPosition = seriesData[dataIndex];
          return (
            <>
              {dataAtPosition}%<tspan fontWeight="400"> {label}</tspan>
            </>
          );
        }
        return label;
      }, [label, seriesData, dataIndex]);

      return (
        <DefaultScrubberBeaconLabel
          {...props}
          background={color}
          color="rgb(var(--gray0))"
          label={percentageLabel}
          seriesId={seriesId}
        />
      );
    },
  );

  const theme = useTheme();

  const isLightTheme = theme.activeColorScheme === 'light';
  const background = isLightTheme ? 'rgb(var(--gray90))' : 'rgb(var(--gray0))';
  const scrubberLineStroke = isLightTheme ? 'rgb(var(--gray0))' : 'rgb(var(--gray90))';

  return (
    <Box borderRadius={300} padding={2} style={{ background }}>
      <LineChart
        enableScrubbing
        showArea
        areaType="dotted"
        height={250}
        inset={{ bottom: 8, left: 8, top: 8, right: 0 }}
        series={[
          {
            id: 'prices2',
            data: [90, 78, 71, 55, 2, 55, 78, 48, 79, 96, 32, 80, 79, 42],
            color: 'rgb(var(--blue40))',
            label: 'ATL',
          },
          {
            id: 'prices',
            data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
            color: 'rgb(var(--chartreuse40))',
            label: 'NYC',
          },
        ]}
        xAxis={{
          range: ({ min, max }) => ({ min, max: max - 92 }),
        }}
      >
        <Scrubber
          hideOverlay
          idlePulse
          BeaconLabelComponent={PercentageScrubberBeaconLabel}
          beaconLabelPreferredSide={preferredSide}
          beaconStroke={background}
          lineStroke={scrubberLineStroke}
        />
      </LineChart>
    </Box>
  );
};

const HideBeaconLabels = () => {
  return (
    <LineChart
      enableScrubbing
      legend
      showArea
      height={{ base: 150, tablet: 200, desktop: 250 }}
      inset={{ top: 60 }}
      series={[
        {
          id: 'pageViews',
          data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
          color: 'var(--color-accentBoldGreen)',
          label: 'Page Views',
        },
        {
          id: 'uniqueVisitors',
          data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
          color: 'var(--color-accentBoldPurple)',
          label: 'Unique Visitors',
        },
      ]}
    >
      <Scrubber
        hideBeaconLabels
        labelElevated
        label={(dataIndex: number) => `Day ${dataIndex + 1}`}
      />
    </LineChart>
  );
};

const LabelElevated = () => {
  return (
    <LineChart
      enableScrubbing
      showArea
      height={{ base: 150, tablet: 200, desktop: 250 }}
      inset={{ top: 60 }}
      series={[
        {
          id: 'prices',
          data: sampleData,
        },
      ]}
    >
      <Scrubber labelElevated label={(dataIndex: number) => `Day ${dataIndex + 1}`} />
    </LineChart>
  );
};

const CustomLabelComponent = () => {
  const MyLabelComponent = memo((props: ScrubberLabelProps) => {
    const { drawingArea } = useCartesianChartContext();

    if (!drawingArea) return null;

    return (
      <DefaultScrubberLabel
        {...props}
        elevated
        background="var(--color-bgPrimary)"
        color="var(--color-bgPrimaryWash)"
        dy={32}
        fontWeight="label1"
        y={drawingArea.y + drawingArea.height}
      />
    );
  });

  return (
    <LineChart
      enableScrubbing
      showArea
      height={{ base: 150, tablet: 200, desktop: 250 }}
      inset={{ top: 16, bottom: 64 }}
      series={[
        {
          id: 'prices',
          data: sampleData,
        },
      ]}
    >
      <Scrubber
        LabelComponent={MyLabelComponent}
        label={(dataIndex: number) => `Day ${dataIndex + 1}`}
      />
    </LineChart>
  );
};

const LabelFonts = () => {
  return (
    <LineChart
      enableScrubbing
      showArea
      showYAxis
      height={{ base: 150, tablet: 200, desktop: 250 }}
      series={[
        {
          id: 'btc',
          data: sampleData,
          label: 'BTC',
          color: assets.btc.color,
        },
        {
          id: 'eth',
          data: [5, 15, 18, 30, 65, 30, 15, 35, 15, 2, 45, 12, 15, 40],
          label: 'ETH',
          color: assets.eth.color,
        },
      ]}
      yAxis={{
        showGrid: true,
      }}
    >
      <Scrubber
        beaconLabelFont="legal"
        label={(dataIndex: number) => `Day ${dataIndex + 1}`}
        labelFont="legal"
      />
    </LineChart>
  );
};

const LabelBoundsInset = () => {
  return (
    <VStack gap={4}>
      <Box marginX={-3}>
        <LineChart
          enableScrubbing
          showArea
          height={{ base: 150, tablet: 200, desktop: 250 }}
          inset={{ left: 0, right: 0 }}
          series={[
            {
              id: 'prices',
              data: sampleData,
            },
          ]}
        >
          <Scrubber label="Without bounds - text touches edge" labelBoundsInset={0} />
        </LineChart>
      </Box>
      <Box marginX={-3}>
        <LineChart
          enableScrubbing
          showArea
          height={{ base: 150, tablet: 200, desktop: 250 }}
          inset={{ left: 0, right: 0 }}
          series={[
            {
              id: 'prices',
              data: sampleData,
            },
          ]}
        >
          <Scrubber
            label="With bounds inset - text has space"
            labelBoundsInset={{ top: 0, bottom: 0, left: 12, right: 12 }}
          />
        </LineChart>
      </Box>
    </VStack>
  );
};

const CustomLine = () => {
  return (
    <LineChart
      enableScrubbing
      showArea
      height={{ base: 150, tablet: 200, desktop: 250 }}
      series={[
        {
          id: 'prices',
          data: sampleData,
        },
      ]}
    >
      <Scrubber LineComponent={SolidLine} />
    </LineChart>
  );
};

const HiddenScrubberWhenIdle = () => {
  const MyScrubberBeacon = memo((props: ScrubberBeaconProps) => {
    const { scrubberPosition } = useScrubberContext();
    const isScrubbing = scrubberPosition !== undefined;

    return <DefaultScrubberBeacon {...props} opacity={isScrubbing ? 1 : 0} />;
  });

  const MyScrubberBeaconLabel = memo((props: ScrubberBeaconLabelProps) => {
    const { scrubberPosition } = useScrubberContext();
    const isScrubbing = scrubberPosition !== undefined;

    return <DefaultScrubberBeaconLabel {...props} opacity={isScrubbing ? 1 : 0} />;
  });

  return (
    <LineChart
      enableScrubbing
      showArea
      height={{ base: 150, tablet: 200, desktop: 250 }}
      series={[
        {
          id: 'prices',
          data: sampleData,
          label: 'Price',
        },
      ]}
    >
      <Scrubber BeaconComponent={MyScrubberBeacon} BeaconLabelComponent={MyScrubberBeaconLabel} />
    </LineChart>
  );
};

const HideOverlay = () => {
  return (
    <LineChart
      enableScrubbing
      showArea
      height={{ base: 150, tablet: 200, desktop: 250 }}
      series={[
        {
          id: 'prices',
          data: sampleData,
        },
      ]}
    >
      <Scrubber hideOverlay />
    </LineChart>
  );
};

export const All = () => {
  return (
    <VStack gap={4}>
      <Example title="Basic">
        <BasicScrubber />
      </Example>
      <Example title="Series Filter">
        <SeriesFilter />
      </Example>
      <Example title="With Labels">
        <WithLabels />
      </Example>
      <Example title="Idle Pulse">
        <IdlePulse />
      </Example>
      <Example title="Imperative Pulse">
        <ImperativePulse />
      </Example>
      <Example title="Beacon Stroke">
        <BeaconStroke />
      </Example>
      <Example title="Custom Beacon">
        <CustomBeacon />
      </Example>
      <Example title="Custom Beacon Label">
        <CustomBeaconLabel />
      </Example>
      <Example title="Beacon Labels">
        <PercentageBeaconLabels />
      </Example>
      <Example title="Beacon Labels - Left Side Preferred">
        <PercentageBeaconLabels preferredSide="left" />
      </Example>
      <Example title="Hide Beacon Labels">
        <HideBeaconLabels />
      </Example>
      <Example title="Label Elevated">
        <LabelElevated />
      </Example>
      <Example title="Custom Label Component">
        <CustomLabelComponent />
      </Example>
      <Example title="Label Fonts">
        <LabelFonts />
      </Example>
      <Example title="Label Bounds Inset">
        <LabelBoundsInset />
      </Example>
      <Example title="Custom Line">
        <CustomLine />
      </Example>
      <Example title="Hidden Scrubber When Idle">
        <HiddenScrubberWhenIdle />
      </Example>
      <Example title="Hide Overlay">
        <HideOverlay />
      </Example>
    </VStack>
  );
};
