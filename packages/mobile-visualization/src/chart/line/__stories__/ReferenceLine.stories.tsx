import { memo, type RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { View } from 'react-native';
import { Circle, type CircleProps, G, Path, Rect } from 'react-native-svg';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { useChartContext } from '../../ChartProvider';
import { useTheme } from '@coinbase/cds-mobile';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';

import { ChartText } from '../../text';
import { LineChart } from '../LineChart';
import { ReferenceLine } from '../ReferenceLine';
import { SolidLine } from '../SolidLine';

const DraggablePriceTarget = () => {
  const theme = useTheme();

  const DragIcon = ({ x, y }: { x: number; y: number }) => {
    const DragCircle = (props: CircleProps) => <Circle {...props} fill={theme.color.fg} r="1.5" />;

    return (
      <G transform={`translate(${x}, ${y})`}>
        <G transform="translate(0, -8)">
          <DragCircle cx="2" cy="2" />
          <DragCircle cx="2" cy="8" />
          <DragCircle cx="2" cy="14" />
          <DragCircle cx="9" cy="2" />
          <DragCircle cx="9" cy="8" />
          <DragCircle cx="9" cy="14" />
        </G>
      </G>
    );
  };

  const TrendArrowIcon = ({
    x,
    y,
    isPositive,
    color,
  }: {
    x: number;
    y: number;
    isPositive: boolean;
    color: string;
  }) => {
    return (
      <G transform={`translate(${x + 8}, ${isPositive ? y + 8 : y - 8})`}>
        <G
          style={{
            // Flip horizontally and vertically for positive trend (pointing top-right)
            transform: isPositive ? 'scale(-1, -1)' : 'scale(-1, 1)',
            transformOrigin: '8px 8px',
          }}
        >
          <Path
            d="M4.88574 12.7952L14.9887 2.69223L13.2916 0.995178L3.18883 11.098V4.84898L0.988831 7.04898V14.9952H8.99974L11.1997 12.7952H4.88574Z"
            fill={color}
          />
        </G>
      </G>
    );
  };

  const DraggableReferenceLine = memo(
    ({
      baselineAmount,
      startAmount,
      chartRef,
    }: {
      baselineAmount: number;
      startAmount: number;
      chartRef: RefObject<View>;
    }) => {
      const theme = useTheme();

      const formatPrice = useCallback((value: number) => {
        return `$${value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      }, []);

      const { getYScale, drawingArea } = useChartContext();
      const [amount, setAmount] = useState(startAmount);
      const [isDragging, setIsDragging] = useState(false);
      const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });
      const color = amount >= baselineAmount ? theme.color.bgPositive : theme.color.bgNegative;

      const yScale = getYScale();

      // Mouse-based dragging is not supported in React Native
      // This would need to be implemented using gesture handlers for mobile
      useEffect(() => {
        // TODO: Implement touch-based dragging for React Native
        // For now, we'll just disable the dragging functionality
        if (isDragging) {
          setIsDragging(false);
        }
      }, [isDragging]);

      if (!yScale) return null;

      const yPixel = yScale(amount);

      if (yPixel === undefined || yPixel === null) return null;

      const difference = amount - baselineAmount;
      const percentageChange = Math.round((difference / baselineAmount) * 100);
      const isPositive = difference > 0;

      const percentageLabel = `${Math.abs(percentageChange)}% (${formatPrice(Math.abs(difference))})`;
      const dollarLabel = formatPrice(amount);

      const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
      };

      const padding = 16;
      const dragIconSize = 16;
      const trendArrowIconSize = 16;
      const iconGap = 8;
      const totalPadding = padding * 2 + iconGap;

      const rectWidth = textDimensions.width + totalPadding + dragIconSize + trendArrowIconSize;

      return (
        <>
          <ReferenceLine
            dataY={amount}
            label={dollarLabel}
            labelConfig={{
              background: color,
              borderRadius: 100,
              color: 'white',
              dx: -8,
              padding: { top: 5, bottom: 5, left: 10, right: 10 },
              textAnchor: 'end',
            }}
            labelPosition="right"
          />
          <G
            onMouseDown={handleMouseDown}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              opacity: textDimensions.width === 0 ? 0 : 1,
            }}
          >
            <Rect
              fill={theme.color.bgSecondary}
              height={32}
              rx={theme.borderRadius['400']}
              ry={theme.borderRadius['400']}
              width={rectWidth}
              x={drawingArea.x}
              y={yPixel - 16}
            />
            <DragIcon x={drawingArea.x + padding} y={yPixel} />
            <TrendArrowIcon
              color={color}
              isPositive={isPositive}
              x={drawingArea.x + padding + dragIconSize + iconGap}
              y={yPixel}
            />
            <ChartText
              disableRepositioning
              alignmentBaseline="middle"
              color={color}
              onDimensionsChange={(dimensions) => setTextDimensions(dimensions)}
              textAnchor="start"
              x={drawingArea.x + padding + dragIconSize + iconGap + trendArrowIconSize}
              y={yPixel + 1}
            >
              {percentageLabel}
            </ChartText>
          </G>
        </>
      );
    },
  );

  const DraggablePriceTargetChart = () => {
    const priceData = useMemo(() => sparklineInteractiveData.year.map((d) => d.value), []);

    const chartRef = useRef<View>(null);

    const formatPrice = useCallback((value: number) => {
      return `$${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }, []);

    return (
      <LineChart
        ref={chartRef}
        showArea
        animate={false}
        curve="monotone"
        height={250}
        padding={{ top: 16, bottom: 16, left: 8, right: 80 }}
        series={[
          {
            id: 'prices',
            data: priceData,
            color: assets.btc.color,
          },
        ]}
        yAxis={{ domain: ({ min, max }) => ({ min: min * 0.7, max: max * 1.3 }) }}
      >
        <ReferenceLine
          LineComponent={SolidLine}
          dataY={priceData[priceData.length - 1]}
          label={formatPrice(priceData[priceData.length - 1])}
          labelConfig={{ dx: 16, textAnchor: 'start' }}
        />
        <DraggableReferenceLine
          baselineAmount={priceData[priceData.length - 1]}
          chartRef={chartRef}
          startAmount={priceData[priceData.length - 1] * 0.9}
        />
      </LineChart>
    );
  };

  return <DraggablePriceTargetChart />;
};

const ReferenceLineStories = () => {
  const theme = useTheme();
  return (
    <ExampleScreen>
      <Example title="Basic">
        <LineChart
          showArea
          curve="monotone"
          height={250}
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
            labelConfig={{ textAnchor: 'start', dx: 4 }}
          />
          <ReferenceLine
            dataY={70}
            label="Horizontal Reference Line"
            labelConfig={{ alignmentBaseline: 'text-bottom', dy: -4 }}
          />
        </LineChart>
      </Example>
      <Example title="With Custom Label">
        <LineChart
          curve="monotone"
          height={250}
          padding={{ right: 32, top: 0, left: 0, bottom: 0 }}
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
            labelConfig={{
              dx: 4,
              borderRadius: 100,
              padding: { top: 4, bottom: 4, left: 8, right: 8 },
              textAnchor: 'start',
              color: `rgb(${theme.spectrum.yellow70})`,
              background: theme.color.accentSubtleYellow,
            }}
            labelPosition="left"
            stroke={theme.color.bgWarning}
          />
        </LineChart>
      </Example>
      <Example title="Draggable Price Target">
        <DraggablePriceTarget />
      </Example>
    </ExampleScreen>
  );
};

export default ReferenceLineStories;
