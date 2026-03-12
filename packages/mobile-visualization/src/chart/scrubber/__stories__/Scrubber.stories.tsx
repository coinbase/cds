import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useDerivedValue } from 'react-native-reanimated';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { useTheme } from '@coinbase/cds-mobile';
import { Button, IconButton } from '@coinbase/cds-mobile/buttons';
import { ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { Text } from '@coinbase/cds-mobile/typography';
import { FontWeight, Skia, type SkTextStyle, TextAlign } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../../ChartProvider';
import { LineChart, SolidLine } from '../../line';
import {
  getLineData,
  type ScrubberLabelPosition,
  unwrapAnimatedValue,
  useScrubberContext,
} from '../../utils';
import {
  DefaultScrubberBeacon,
  DefaultScrubberBeaconLabel,
  DefaultScrubberLabel,
  Scrubber,
  type ScrubberBeaconLabelProps,
  type ScrubberBeaconProps,
  type ScrubberLabelProps,
  type ScrubberRef,
} from '..';

const sampleData = [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58];

const chartAccessibilityLabel = `Price chart with ${sampleData.length} data points. Swipe to navigate.`;
const getScrubberAccessibilityLabel = (index: number) => `Point ${index + 1}: ${sampleData[index]}`;

const BasicScrubber = () => {
  return (
    <LineChart
      enableScrubbing
      showArea
      showYAxis
      accessibilityLabel={chartAccessibilityLabel}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={150}
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

const seriesFilterData = {
  top: [15, 28, 32, 44, 46, 36, 40, 45, 48, 38],
  upperMiddle: [12, 23, 21, 29, 34, 28, 31, 38, 42, 35],
  lowerMiddle: [8, 15, 14, 25, 20, 18, 22, 28, 24, 30],
  bottom: [4, 8, 11, 15, 16, 14, 16, 10, 12, 14],
};

const SeriesFilter = () => {
  const getScrubberAccessibilityLabel = useCallback(
    (index: number) =>
      `Point ${index + 1}: top ${seriesFilterData.top[index]}, lowerMiddle ${seriesFilterData.lowerMiddle[index]}`,
    [],
  );

  return (
    <LineChart
      enableScrubbing
      accessibilityLabel="Chart with multiple series. Swipe to navigate."
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={150}
      series={[
        {
          id: 'top',
          data: seriesFilterData.top,
        },
        {
          id: 'upperMiddle',
          data: seriesFilterData.upperMiddle,
          color: '#ef4444',
          type: 'dotted',
        },
        {
          id: 'lowerMiddle',
          data: seriesFilterData.lowerMiddle,
          color: '#f59e0b',
          curve: 'natural',
        },
        {
          id: 'bottom',
          data: seriesFilterData.bottom,
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
      accessibilityLabel={chartAccessibilityLabel}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={150}
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
  const theme = useTheme();

  return (
    <LineChart
      enableScrubbing
      showArea
      accessibilityLabel={chartAccessibilityLabel}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={150}
      series={[
        {
          id: 'prices',
          data: sampleData,
          color: theme.color.fgPositive,
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
        accessibilityLabel={chartAccessibilityLabel}
        getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
        height={150}
        series={[
          {
            id: 'prices',
            data: sampleData,
          },
        ]}
      >
        <Scrubber ref={scrubberRef} />
      </LineChart>
      <Button onPress={() => scrubberRef.current?.pulse()}>Pulse</Button>
    </VStack>
  );
};

const BeaconStroke = () => {
  const theme = useTheme();
  const backgroundColor = `rgb(${theme.spectrum.red40})`;
  const foregroundColor = `rgb(${theme.spectrum.gray0})`;

  return (
    <Box borderRadius={300} padding={2} style={{ backgroundColor }}>
      <LineChart
        enableScrubbing
        showArea
        accessibilityLabel={chartAccessibilityLabel}
        getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
        height={150}
        series={[
          {
            id: 'prices',
            data: sampleData,
            color: foregroundColor,
          },
        ]}
      >
        <Scrubber
          hideOverlay
          idlePulse
          beaconStroke={backgroundColor}
          lineStroke={foregroundColor}
        />
      </LineChart>
    </Box>
  );
};

const CustomBeacon = () => {
  const theme = useTheme();

  const InvertedBeacon = memo((props: ScrubberBeaconProps) => (
    <DefaultScrubberBeacon
      {...props}
      color={theme.color.bg}
      radius={5}
      stroke={theme.color.fg}
      strokeWidth={3}
    />
  ));

  return (
    <LineChart
      enableScrubbing
      showArea
      showYAxis
      accessibilityLabel={chartAccessibilityLabel}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={150}
      series={[
        {
          id: 'prices',
          data: sampleData,
          color: theme.color.fg,
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
  const theme = useTheme();

  const MyScrubberBeaconLabel = memo(
    ({ seriesId, color, label, ...props }: ScrubberBeaconLabelProps) => {
      const { getSeriesData, series } = useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();

      const seriesData = useMemo(
        () => getLineData(getSeriesData(seriesId)),
        [getSeriesData, seriesId],
      );

      const dataLength = useMemo(
        () =>
          series?.reduce((max, s) => {
            const data = getSeriesData(s.id);
            return Math.max(max, data?.length ?? 0);
          }, 0) ?? 0,
        [series, getSeriesData],
      );

      const dataIndex = useDerivedValue(() => {
        return scrubberPosition.value ?? Math.max(0, dataLength - 1);
      }, [scrubberPosition, dataLength]);

      const percentageLabel = useDerivedValue(() => {
        if (seriesData !== undefined) {
          const dataAtPosition = seriesData[dataIndex.value];
          return `${unwrapAnimatedValue(label)} · ${dataAtPosition}%`;
        }
        return unwrapAnimatedValue(label);
      }, [label, seriesData, dataIndex]);

      return (
        <DefaultScrubberBeaconLabel
          {...props}
          background={color}
          color={theme.color.bg}
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
      accessibilityLabel="Temperature chart with 6 data points. Swipe to navigate."
      areaType="dotted"
      getScrubberAccessibilityLabel={(index: number) =>
        `Point ${index + 1}: ${[25, 30, 35, 45, 60, 100][index]}°F`
      }
      height={150}
      series={[
        {
          id: 'Boston',
          data: [25, 30, 35, 45, 60, 100],
          color: `rgb(${theme.spectrum.green40})`,
          label: 'Boston',
        },
        {
          id: 'Miami',
          data: [20, 25, 30, 35, 20, 0],
          color: `rgb(${theme.spectrum.blue40})`,
          label: 'Miami',
        },
        {
          id: 'Denver',
          data: [10, 15, 20, 25, 40, 0],
          color: `rgb(${theme.spectrum.orange40})`,
          label: 'Denver',
        },
        {
          id: 'Phoenix',
          data: [15, 10, 5, 0, 0, 0],
          color: `rgb(${theme.spectrum.red40})`,
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

const PercentageBeaconLabels = () => {
  const theme = useTheme();

  const PercentageScrubberBeaconLabel = memo(
    ({ seriesId, color, label, ...props }: ScrubberBeaconLabelProps) => {
      const { getSeriesData, series, fontProvider } = useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();

      const seriesData = useMemo(
        () => getLineData(getSeriesData(seriesId)),
        [getSeriesData, seriesId],
      );

      const dataLength = useMemo(
        () =>
          series?.reduce((max, s) => {
            const data = getSeriesData(s.id);
            return Math.max(max, data?.length ?? 0);
          }, 0) ?? 0,
        [series, getSeriesData],
      );

      const dataIndex = useDerivedValue(() => {
        return scrubberPosition.value ?? Math.max(0, dataLength - 1);
      }, [scrubberPosition, dataLength]);

      const labelColor = `rgb(${theme.spectrum.gray0})`;

      const regularStyle: SkTextStyle = useMemo(
        () => ({
          fontFamilies: ['Inter'],
          fontSize: 14,
          fontStyle: {
            weight: FontWeight.Normal,
          },
          color: Skia.Color(labelColor),
        }),
        [labelColor],
      );

      const boldStyle: SkTextStyle = useMemo(
        () => ({
          ...regularStyle,
          fontStyle: {
            weight: FontWeight.Bold,
          },
        }),
        [regularStyle],
      );

      const percentageLabel = useDerivedValue(() => {
        const labelValue = unwrapAnimatedValue(label);

        if (seriesData !== undefined) {
          const dataAtPosition = seriesData[dataIndex.value];

          const builder = Skia.ParagraphBuilder.Make({ textAlign: TextAlign.Left }, fontProvider);

          builder.pushStyle(boldStyle);
          builder.addText(`${dataAtPosition}%`);
          builder.pushStyle(regularStyle);
          builder.addText(` ${labelValue}`);

          const para = builder.build();
          para.layout(512);
          return para;
        }

        return labelValue;
      }, [label, seriesData, dataIndex, fontProvider, boldStyle, regularStyle]);

      return (
        <DefaultScrubberBeaconLabel
          {...props}
          background={color}
          label={percentageLabel}
          seriesId={seriesId}
        />
      );
    },
  );

  const isLightTheme = theme.activeColorScheme === 'light';
  const background = isLightTheme
    ? `rgb(${theme.spectrum.gray90})`
    : `rgb(${theme.spectrum.gray0})`;
  const scrubberLineStroke = isLightTheme
    ? `rgb(${theme.spectrum.gray0})`
    : `rgb(${theme.spectrum.gray90})`;

  const seriesData = [
    {
      id: 'prices2',
      data: [90, 78, 71, 55, 2, 55, 78, 48, 79, 96, 32, 80, 79, 42],
      color: `rgb(${theme.spectrum.blue40})`,
      label: 'ATL',
    },
    {
      id: 'prices',
      data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
      color: `rgb(${theme.spectrum.chartreuse40})`,
      label: 'NYC',
    },
  ];

  return (
    <VStack gap={4}>
      <Box borderRadius={300} padding={2} style={{ backgroundColor: background }}>
        <LineChart
          enableScrubbing
          showArea
          accessibilityLabel="NYC vs ATL comparison chart. Swipe to navigate."
          areaType="dotted"
          getScrubberAccessibilityLabel={(index: number) => `Point ${index + 1}`}
          height={150}
          inset={{ bottom: 8, left: 8, top: 8, right: 0 }}
          series={seriesData}
          xAxis={{
            range: ({ min, max }) => ({ min, max: max - 92 }),
          }}
        >
          <Scrubber
            hideOverlay
            idlePulse
            BeaconLabelComponent={PercentageScrubberBeaconLabel}
            beaconStroke={background}
            lineStroke={scrubberLineStroke}
          />
        </LineChart>
      </Box>
      <Box borderRadius={300} padding={2} style={{ backgroundColor: background }}>
        <LineChart
          enableScrubbing
          showArea
          accessibilityLabel="NYC vs ATL comparison chart. Swipe to navigate."
          areaType="dotted"
          getScrubberAccessibilityLabel={(index: number) => `Point ${index + 1}`}
          height={150}
          inset={{ bottom: 8, left: 8, top: 8, right: 0 }}
          series={seriesData}
          xAxis={{
            range: ({ min, max }) => ({ min, max: max - 92 }),
          }}
        >
          <Scrubber
            hideOverlay
            idlePulse
            BeaconLabelComponent={PercentageScrubberBeaconLabel}
            beaconLabelPreferredSide="left"
            beaconStroke={background}
            lineStroke={scrubberLineStroke}
          />
        </LineChart>
      </Box>
    </VStack>
  );
};

const HideBeaconLabels = () => {
  const theme = useTheme();

  return (
    <LineChart
      enableScrubbing
      legend
      showArea
      accessibilityLabel="Website visitors across 7 pages. Swipe to navigate."
      getScrubberAccessibilityLabel={(index: number) =>
        `Page ${index + 1}: ${[2400, 1398, 9800, 3908, 4800, 3800, 4300][index]} views`
      }
      height={200}
      inset={{ top: 60 }}
      series={[
        {
          id: 'pageViews',
          data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
          color: theme.color.accentBoldGreen,
          label: 'Page Views',
        },
        {
          id: 'uniqueVisitors',
          data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
          color: theme.color.accentBoldPurple,
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
      accessibilityLabel={chartAccessibilityLabel}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={200}
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
  const theme = useTheme();

  const MyLabelComponent = memo((props: ScrubberLabelProps) => {
    const { drawingArea } = useCartesianChartContext();

    if (!drawingArea) return null;

    return (
      <DefaultScrubberLabel
        {...props}
        elevated
        background={theme.color.bgPrimary}
        color={theme.color.bgPrimaryWash}
        dy={32}
        fontWeight={FontWeight.Bold}
        y={drawingArea.y + drawingArea.height}
      />
    );
  });

  return (
    <LineChart
      enableScrubbing
      showArea
      accessibilityLabel={chartAccessibilityLabel}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={200}
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

const ethData = [5, 15, 18, 30, 65, 30, 15, 35, 15, 2, 45, 12, 15, 40];

const LabelFonts = () => {
  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => `Day ${index + 1}: BTC ${sampleData[index]}, ETH ${ethData[index]}`,
    [],
  );

  return (
    <LineChart
      enableScrubbing
      showArea
      showYAxis
      accessibilityLabel="BTC and ETH comparison chart. Swipe to navigate."
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={150}
      series={[
        {
          id: 'btc',
          data: sampleData,
          label: 'BTC',
          color: assets.btc.color,
        },
        {
          id: 'eth',
          data: ethData,
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
      <LineChart
        enableScrubbing
        showArea
        accessibilityLabel={chartAccessibilityLabel}
        getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
        height={150}
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
      <LineChart
        enableScrubbing
        showArea
        accessibilityLabel={chartAccessibilityLabel}
        getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
        height={150}
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
    </VStack>
  );
};

const CustomLine = () => {
  return (
    <LineChart
      enableScrubbing
      showArea
      accessibilityLabel={chartAccessibilityLabel}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={150}
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
    const beaconOpacity = useDerivedValue(
      () => (scrubberPosition.value !== undefined ? 1 : 0),
      [scrubberPosition],
    );

    return <DefaultScrubberBeacon {...props} opacity={beaconOpacity} />;
  });

  const MyScrubberBeaconLabel = memo((props: ScrubberBeaconLabelProps) => {
    const { scrubberPosition } = useScrubberContext();
    const labelOpacity = useDerivedValue(
      () => (scrubberPosition.value !== undefined ? 1 : 0),
      [scrubberPosition],
    );

    return <DefaultScrubberBeaconLabel {...props} opacity={labelOpacity} />;
  });

  return (
    <LineChart
      enableScrubbing
      showArea
      accessibilityLabel={chartAccessibilityLabel}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={150}
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
      accessibilityLabel={chartAccessibilityLabel}
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={150}
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

const matchupBlueData = [
  47, 50, 51, 52, 53, 53, 53, 53, 52, 51, 51, 52, 53, 55, 57, 58, 59, 61, 63, 65, 64, 64, 64, 64,
  64, 63, 63, 63, 64, 66, 68, 70, 71, 72, 74, 76, 76, 75, 74, 73, 74, 75, 75, 78,
];
const matchupRedData = matchupBlueData.map((value) => 100 - value);
const matchupTeamLabels: Record<string, string> = {
  blue: 'BLUE',
  red: 'RED',
};

const MatchupBeaconLabels = () => {
  const theme = useTheme();

  const MatchupScrubberBeaconLabel = memo(
    ({ seriesId, color, ...props }: ScrubberBeaconLabelProps) => {
      const { getSeriesData, series, fontProvider } = useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();

      const seriesData = useMemo(
        () => getLineData(getSeriesData(seriesId)),
        [getSeriesData, seriesId],
      );

      const dataLength = useMemo(
        () =>
          series?.reduce((max, currentSeries) => {
            const data = getSeriesData(currentSeries.id);
            return Math.max(max, data?.length ?? 0);
          }, 0) ?? 0,
        [series, getSeriesData],
      );

      const dataIndex = useDerivedValue(() => {
        return scrubberPosition.value ?? Math.max(0, dataLength - 1);
      }, [scrubberPosition, dataLength]);

      const teamLabel = matchupTeamLabels[seriesId] ?? String(seriesId).toUpperCase();
      const labelColor = color ?? theme.color.fgPrimary;
      const legalFontSize = theme.fontSize.legal;
      const title3FontSize = theme.fontSize.title3;

      const teamStyle: SkTextStyle = useMemo(
        () => ({
          fontFamilies: ['Inter'],
          fontSize: legalFontSize,
          fontStyle: {
            weight: FontWeight.Normal,
          },
          color: Skia.Color(labelColor),
        }),
        [labelColor, legalFontSize],
      );

      const percentageStyle: SkTextStyle = useMemo(
        () => ({
          fontFamilies: ['Inter'],
          fontSize: title3FontSize,
          fontStyle: {
            weight: FontWeight.Bold,
          },
          color: Skia.Color(labelColor),
        }),
        [title3FontSize, labelColor],
      );

      const matchupLabel = useDerivedValue(() => {
        if (seriesData === undefined) {
          return teamLabel;
        }

        const value = seriesData[dataIndex.value];
        const builder = Skia.ParagraphBuilder.Make({ textAlign: TextAlign.Left }, fontProvider);

        builder.pushStyle(teamStyle);
        builder.addText(teamLabel);
        builder.addText('\n');
        builder.pushStyle(percentageStyle);
        builder.addText(`${value}%`);

        const paragraph = builder.build();
        paragraph.layout(240);
        return paragraph;
      }, [dataIndex, fontProvider, percentageStyle, seriesData, teamLabel, teamStyle]);

      return (
        <DefaultScrubberBeaconLabel
          {...props}
          background="transparent"
          color={labelColor}
          elevated={false}
          inset={0}
          label={matchupLabel}
          seriesId={seriesId}
        />
      );
    },
  );

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) =>
      `Point ${index + 1}: BLUE ${matchupBlueData[index]}%, RED ${matchupRedData[index]}%`,
    [],
  );

  return (
    <LineChart
      enableScrubbing
      showArea
      accessibilityLabel="BLUE vs RED matchup chart. Swipe to navigate."
      areaType="dotted"
      getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
      height={300}
      inset={{ bottom: 8, left: 8, top: 8, right: 0 }}
      series={[
        {
          id: 'blue',
          data: matchupBlueData,
          color: `rgb(${theme.spectrum.blue50})`,
          label: 'BLUE',
        },
        {
          id: 'red',
          data: matchupRedData,
          color: `rgb(${theme.spectrum.red50})`,
          label: 'RED',
        },
      ]}
      xAxis={{
        range: ({ min, max }) => ({ min, max: max - 64 }),
      }}
      yAxis={{
        domain: { min: 0, max: 100 },
      }}
    >
      <Scrubber
        idlePulse
        BeaconLabelComponent={MatchupScrubberBeaconLabel}
        beaconLabelHorizontalOffset={16}
        beaconLabelPreferredSide="right"
      />
    </LineChart>
  );
};

type ExampleItem = {
  title: string;
  component: React.ReactNode;
};

const ExampleNavigator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const examples = useMemo<ExampleItem[]>(
    () => [
      {
        title: 'Basic',
        component: <BasicScrubber />,
      },
      {
        title: 'Series Filter',
        component: <SeriesFilter />,
      },
      {
        title: 'With Labels',
        component: <WithLabels />,
      },
      {
        title: 'Idle Pulse',
        component: <IdlePulse />,
      },
      {
        title: 'Imperative Pulse',
        component: <ImperativePulse />,
      },
      {
        title: 'Beacon Stroke',
        component: <BeaconStroke />,
      },
      {
        title: 'Custom Beacon',
        component: <CustomBeacon />,
      },
      {
        title: 'Custom Beacon Label',
        component: <CustomBeaconLabel />,
      },
      {
        title: 'Percentage Beacon Labels',
        component: <PercentageBeaconLabels />,
      },
      {
        title: 'Hide Beacon Labels',
        component: <HideBeaconLabels />,
      },
      {
        title: 'Label Elevated',
        component: <LabelElevated />,
      },
      {
        title: 'Custom Label Component',
        component: <CustomLabelComponent />,
      },
      {
        title: 'Label Fonts',
        component: <LabelFonts />,
      },
      {
        title: 'Label Bounds Inset',
        component: <LabelBoundsInset />,
      },
      {
        title: 'Custom Line',
        component: <CustomLine />,
      },
      {
        title: 'Hidden Scrubber When Idle',
        component: <HiddenScrubberWhenIdle />,
      },
      {
        title: 'Hide Overlay',
        component: <HideOverlay />,
      },
      {
        title: 'Matchup Beacon Labels',
        component: <MatchupBeaconLabels />,
      },
    ],
    [],
  );

  const currentExample = examples[currentIndex];
  const isFirstExample = currentIndex === 0;
  const isLastExample = currentIndex === examples.length - 1;

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(examples.length - 1, prev + 1));
  }, [examples.length]);

  return (
    <ExampleScreen>
      <VStack gap={4}>
        <HStack alignItems="center" justifyContent="space-between" paddingY={2}>
          <IconButton
            accessibilityHint="Navigate to previous example"
            accessibilityLabel="Previous"
            disabled={isFirstExample}
            name="arrowLeft"
            onPress={handlePrevious}
            variant="secondary"
          />
          <VStack alignItems="center" gap={1}>
            <Text font="title3">{currentExample.title}</Text>
            <Text color="fgMuted" font="label1">
              {currentIndex + 1} / {examples.length}
            </Text>
          </VStack>
          <IconButton
            accessibilityHint="Navigate to next example"
            accessibilityLabel="Next"
            disabled={isLastExample}
            name="arrowRight"
            onPress={handleNext}
            variant="secondary"
          />
        </HStack>
        <Box padding={1}>{currentExample.component}</Box>
      </VStack>
    </ExampleScreen>
  );
};

export default ExampleNavigator;
