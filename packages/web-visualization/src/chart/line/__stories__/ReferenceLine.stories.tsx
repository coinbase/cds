import { memo, type RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { useTheme } from '@coinbase/cds-web';
import { VStack } from '@coinbase/cds-web/layout';
import { TextHeadline } from '@coinbase/cds-web/typography';

import { useChartContext } from '../../ChartProvider';
import { ChartText } from '../../text/ChartText';
import { LineChart } from '../LineChart';
import { ReferenceLine } from '../ReferenceLine';
import { SolidLine } from '../SolidLine';

export default {
  component: ReferenceLine,
  title: 'Components/Chart/ReferenceLine',
};

const Example: React.FC<
  React.PropsWithChildren<{ title: string; description?: string | React.ReactNode }>
> = ({ children, title, description }) => {
  return (
    <VStack gap={2}>
      <TextHeadline>{title}</TextHeadline>
      {description}
      {children}
    </VStack>
  );
};

const DragIcon = ({ x, y }: { x: number; y: number }) => {
  const DragCircle = (props: React.SVGProps<SVGCircleElement>) => (
    <circle {...props} fill="var(--color-fg)" r="1.5" />
  );

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform="translate(0, -8)">
        <DragCircle cx="2" cy="2" />
        <DragCircle cx="2" cy="8" />
        <DragCircle cx="2" cy="14" />
        <DragCircle cx="9" cy="2" />
        <DragCircle cx="9" cy="8" />
        <DragCircle cx="9" cy="14" />
      </g>
    </g>
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
    <g transform={`translate(${x - 8}, ${y - 8})`}>
      <g
        style={{
          // Flip horizontally and vertically for positive trend (pointing top-right)
          transform: isPositive ? 'scale(-1, -1)' : 'scale(-1, 1)',
          transformOrigin: '8px 8px',
        }}
      >
        <path
          d="M4.88574 12.7952L14.9887 2.69223L13.2916 0.995178L3.18883 11.098V4.84898L0.988831 7.04898V14.9952H8.99974L11.1997 12.7952H4.88574Z"
          fill={color}
        />
      </g>
    </g>
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
    chartRef: RefObject<SVGSVGElement>;
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
    const color = amount >= baselineAmount ? 'var(--color-bgPositive)' : 'var(--color-bgNegative)';

    const yScale = getYScale();

    // Set up persistent event listeners on the chart SVG element
    useEffect(() => {
      const element = chartRef.current;

      if (!element || !yScale || !('invert' in yScale && typeof yScale.invert === 'function')) {
        return;
      }

      const handleMouseMove = (event: MouseEvent) => {
        if (!isDragging) {
          return;
        }

        const point = element.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;

        const svgPoint = point.matrixTransform(element.getScreenCTM()?.inverse());

        // Clamp the Y position to the chart area
        const clampedY = Math.max(
          drawingArea.y,
          Math.min(drawingArea.y + drawingArea.height, svgPoint.y),
        );

        const rawAmount = yScale.invert(clampedY);

        const rawPercentage = ((rawAmount - baselineAmount) / baselineAmount) * 100;

        let targetPercentage = Math.round(rawPercentage);

        if (targetPercentage === 0) {
          targetPercentage = rawPercentage >= 0 ? 1 : -1;
        }

        const newAmount = baselineAmount * (1 + targetPercentage / 100);
        setAmount(newAmount);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      const handleMouseLeave = () => {
        setIsDragging(false);
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [isDragging, yScale, chartRef, baselineAmount, drawingArea.y, drawingArea.height]);

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
            font: 'label1',
            padding: { top: 5, bottom: 5, left: 10, right: 10 },
            textAnchor: 'end',
          }}
          labelPosition="right"
        />
        <g
          onMouseDown={handleMouseDown}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            opacity: textDimensions.width === 0 ? 0 : 1,
          }}
        >
          <rect
            fill="var(--color-bgSecondary)"
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
            color={color}
            dominantBaseline="middle"
            font="label1"
            onDimensionsChange={(dimensions) => setTextDimensions(dimensions)}
            textAnchor="start"
            x={drawingArea.x + padding + dragIconSize + iconGap + trendArrowIconSize}
            y={yPixel + 1}
          >
            {percentageLabel}
          </ChartText>
        </g>
      </>
    );
  },
);

const PriceTargetChart = () => {
  const priceData = useMemo(() => sparklineInteractiveData.year.map((d) => d.value), []);

  const chartRef = useRef<SVGSVGElement>(null);

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
        startAmount={priceData[priceData.length - 1] * 1.3}
      />
    </LineChart>
  );
};

export const All = () => {
  return (
    <VStack gap={2}>
      <Example title="Basic Reference Line">
        <LineChart
          showArea
          curve="monotone"
          height={250}
          padding={{ right: 32 }}
          series={[
            {
              id: 'prices',
              data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
            },
          ]}
        >
          <ReferenceLine dataY={50} label="$50" labelConfig={{ dx: 16, textAnchor: 'start' }} />
        </LineChart>
      </Example>
      <Example title="Price Reference Line">
        <LineChart
          showArea
          curve="monotone"
          height={250}
          padding={{ right: 32 }}
          series={[
            {
              id: 'prices',
              data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
            },
          ]}
        >
          <ReferenceLine
            dataY={75}
            label="$75"
            labelConfig={{
              dx: -16,
              borderRadius: 400,
              textAnchor: 'end',
              color: 'white',
              background: 'var(--color-bgPositive)',
            }}
          />
        </LineChart>
      </Example>
      <Example title="Liquidation">
        <LineChart
          curve="monotone"
          height={250}
          padding={{ right: 32 }}
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
              color: 'rgb(var(--yellow70))',
              background: 'var(--color-accentSubtleYellow)',
              font: 'label1',
            }}
            labelPosition="left"
            stroke="var(--color-bgWarning)"
          />
          <ReferenceLine
            dataY={25}
            label="$25"
            labelConfig={{
              dx: -4,
              borderRadius: 100,
              padding: { top: 2, bottom: 2, left: 4, right: 4 },
              textAnchor: 'end',
              color: 'rgb(var(--yellow70))',
              background: 'var(--color-bg)',
              font: 'label1',
            }}
            labelPosition="right"
            stroke="transparent"
          />
        </LineChart>
      </Example>
      <Example title="Price Target">
        <PriceTargetChart />
      </Example>
    </VStack>
  );
};
