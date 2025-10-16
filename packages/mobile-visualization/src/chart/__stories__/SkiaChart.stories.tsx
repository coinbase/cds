import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Easing, runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { sparklineInteractiveData } from '@coinbase/cds-common/internal/visualizations/SparklineInteractiveData';
import { useTheme } from '@coinbase/cds-mobile';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useLayout } from '@coinbase/cds-mobile/hooks/useLayout';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { TextCaption, TextHeadline, TextLabel1, TextTitle2 } from '@coinbase/cds-mobile/typography';
import {
  Canvas,
  Circle,
  Group,
  Path,
  Rect,
  RoundedRect,
  Shadow,
  Skia,
  Text as SkiaText,
} from '@shopify/react-native-skia';

import { useChartFont } from '../utils/skia';

const defaultChartHeight = 200;

/**
 * Simple scale functions for demo purposes
 */
const createScale = (
  domain: [number, number],
  range: [number, number],
): ((value: number) => number) => {
  const [domainMin, domainMax] = domain;
  const [rangeMin, rangeMax] = range;
  const domainSpan = domainMax - domainMin;
  const rangeSpan = rangeMax - rangeMin;

  return (value: number) => {
    const normalized = (value - domainMin) / domainSpan;
    return rangeMin + normalized * rangeSpan;
  };
};

/**
 * Basic Skia Line Chart
 */
export const BasicSkiaLineChart = () => {
  const theme = useTheme();
  const data = [65, 78, 45, 88, 92, 73, 69];
  const width = 350;
  const height = defaultChartHeight;
  const padding = 20;

  const linePath = useMemo(() => {
    const xScale = createScale([0, data.length - 1], [padding, width - padding]);
    const yScale = createScale([0, 100], [height - padding, padding]);

    const pathData = data
      .map((value, index) => {
        const x = xScale(index);
        const y = yScale(value);
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(' ');

    return Skia.Path.MakeFromSVGString(pathData);
  }, [data, width, height]);

  if (!linePath) return null;

  return (
    <VStack gap={2}>
      <TextLabel1>Basic Skia Line Chart</TextLabel1>
      <Canvas style={{ width, height }}>
        <Path
          color={theme.color.accentBoldBlue}
          path={linePath}
          strokeCap="round"
          strokeJoin="round"
          strokeWidth={2}
          style="stroke"
        />
      </Canvas>
    </VStack>
  );
};

/**
 * Skia Line Chart with Area Fill
 */
export const SkiaLineChartWithArea = () => {
  const theme = useTheme();
  const data = [65, 78, 45, 88, 92, 73, 69];
  const width = 350;
  const height = defaultChartHeight;
  const padding = 20;

  const { linePath, areaPath } = useMemo(() => {
    const xScale = createScale([0, data.length - 1], [padding, width - padding]);
    const yScale = createScale([0, 100], [height - padding, padding]);

    // Line path
    const lineData = data
      .map((value, index) => {
        const x = xScale(index);
        const y = yScale(value);
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(' ');

    // Area path (line + close to bottom)
    const points = data.map((value, index) => ({
      x: xScale(index),
      y: yScale(value),
    }));
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    const areaData = `${lineData} L ${lastPoint.x} ${height - padding} L ${firstPoint.x} ${height - padding} Z`;

    return {
      linePath: Skia.Path.MakeFromSVGString(lineData),
      areaPath: Skia.Path.MakeFromSVGString(areaData),
    };
  }, [data, width, height]);

  if (!linePath || !areaPath) return null;

  return (
    <VStack gap={2}>
      <TextLabel1>Skia Line Chart with Area</TextLabel1>
      <Canvas style={{ width, height }}>
        {/* Area fill */}
        <Path color={theme.color.accentBoldGreen} opacity={0.2} path={areaPath} style="fill" />
        {/* Line */}
        <Path
          color={theme.color.accentBoldGreen}
          path={linePath}
          strokeCap="round"
          strokeJoin="round"
          strokeWidth={2}
          style="stroke"
        />
      </Canvas>
    </VStack>
  );
};

/**
 * Skia Line Chart with Points
 */
export const SkiaLineChartWithPoints = () => {
  const theme = useTheme();
  const data = [65, 78, 45, 88, 92, 73, 69];
  const width = 350;
  const height = defaultChartHeight;
  const padding = 20;

  const { linePath, areaPath, points } = useMemo(() => {
    const xScale = createScale([0, data.length - 1], [padding, width - padding]);
    const yScale = createScale([0, 100], [height - padding, padding]);

    const pts = data.map((value, index) => ({
      x: xScale(index),
      y: yScale(value),
    }));

    // Line path
    const lineData = pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');

    // Area path
    const firstPoint = pts[0];
    const lastPoint = pts[pts.length - 1];
    const areaData = `${lineData} L ${lastPoint.x} ${height - padding} L ${firstPoint.x} ${height - padding} Z`;

    return {
      linePath: Skia.Path.MakeFromSVGString(lineData),
      areaPath: Skia.Path.MakeFromSVGString(areaData),
      points: pts,
    };
  }, [data, width, height]);

  if (!linePath || !areaPath) return null;

  return (
    <VStack gap={2}>
      <TextLabel1>Skia Line Chart with Points</TextLabel1>
      <Canvas style={{ width, height }}>
        {/* Area */}
        <Path color={theme.color.accentBoldPurple} opacity={0.2} path={areaPath} style="fill" />
        {/* Line */}
        <Path
          color={theme.color.accentBoldPurple}
          path={linePath}
          strokeCap="round"
          strokeJoin="round"
          strokeWidth={2}
          style="stroke"
        />
        {/* Points */}
        {points.map((point, index) => (
          <Circle
            key={index}
            color={theme.color.accentBoldPurple}
            cx={point.x}
            cy={point.y}
            opacity={0.8}
            r={4}
          />
        ))}
      </Canvas>
    </VStack>
  );
};

/**
 * Multiple Skia Lines
 */
export const MultipleSkiaLines = () => {
  const data1 = [65, 78, 45, 88, 92, 73, 69];
  const data2 = [45, 58, 65, 68, 72, 83, 89];
  const data3 = [25, 38, 35, 48, 52, 43, 49];
  const width = 350;
  const height = defaultChartHeight;
  const padding = 20;

  const paths = useMemo(() => {
    const xScale = createScale([0, 6], [padding, width - padding]);
    const yScale = createScale([0, 100], [height - padding, padding]);

    const createPath = (data: number[]) => {
      const pathData = data
        .map((value, index) => {
          const x = xScale(index);
          const y = yScale(value);
          return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
        })
        .join(' ');
      return Skia.Path.MakeFromSVGString(pathData);
    };

    return {
      path1: createPath(data1),
      path2: createPath(data2),
      path3: createPath(data3),
    };
  }, [data1, data2, data3, width, height]);

  return (
    <VStack gap={2}>
      <TextLabel1>Multiple Skia Lines</TextLabel1>
      <Canvas style={{ width, height }}>
        {paths.path1 && (
          <Path
            color={assets.btc.color}
            path={paths.path1}
            strokeCap="round"
            strokeJoin="round"
            strokeWidth={2}
            style="stroke"
          />
        )}
        {paths.path2 && (
          <Path
            color={assets.eth.color}
            path={paths.path2}
            strokeCap="round"
            strokeJoin="round"
            strokeWidth={2}
            style="stroke"
          />
        )}
        {paths.path3 && (
          <Path
            color={assets.xrp.color}
            path={paths.path3}
            strokeCap="round"
            strokeJoin="round"
            strokeWidth={2}
            style="stroke"
          />
        )}
      </Canvas>
    </VStack>
  );
};

/**
 * Performance Demo with Real Data
 * Features:
 * - Real sparkline data (288 points)
 * - Responsive width (100% of container)
 * - Interactive scrubbing with side-positioned labels
 * - Current price display above chart
 * - Hardware-accelerated with Skia
 */
export const PerformanceDemo = () => {
  const theme = useTheme();
  const height = defaultChartHeight;
  const padding = { top: 20, bottom: 20, left: 8, right: 8 };

  // Measure the container width
  const [containerLayout, onContainerLayout] = useLayout();
  const width = containerLayout.width > 0 ? containerLayout.width : 350;

  // Track touch position
  const [touchX, setTouchX] = useState<number | null>(null);

  // Animation progress (0 to 1)
  const animationProgress = useSharedValue(0);

  // Animate in on mount
  useEffect(() => {
    animationProgress.value = withTiming(1, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  // Callbacks for gesture handlers
  const updateTouchX = useCallback((x: number) => {
    setTouchX(x);
  }, []);

  const clearTouchX = useCallback(() => {
    setTouchX(null);
  }, []);

  // Use real sparkline data
  const priceData = useMemo(() => {
    return sparklineInteractiveData.hour;
  }, []);

  const data = useMemo(() => priceData.map((d) => d.value), [priceData]);
  const timestamps = useMemo(() => priceData.map((d) => d.date), [priceData]);

  // Calculate min/max for better scaling
  const { minValue, maxValue } = useMemo(() => {
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue;
    const padding = range * 0.1; // 10% padding
    return {
      minValue: minValue - padding,
      maxValue: maxValue + padding,
    };
  }, [data]);

  // Create paths and get the data point closest to touch
  const { linePath, areaPath, points, touchPoint } = useMemo(() => {
    const xScale = createScale([0, data.length - 1], [padding.left, width - padding.right]);
    const yScale = createScale([minValue, maxValue], [height - padding.bottom, padding.top]);

    const pts = data.map((value, index) => ({
      x: xScale(index),
      y: yScale(value),
      value,
      index,
      timestamp: timestamps[index],
    }));

    const lineData = pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
    const firstPoint = pts[0];
    const lastPoint = pts[pts.length - 1];
    const areaData = `${lineData} L ${lastPoint.x} ${height - padding.bottom} L ${firstPoint.x} ${height - padding.bottom} Z`;

    // Find closest point to touch
    let closestPoint = null;
    if (touchX !== null && touchX >= padding.left && touchX <= width - padding.right) {
      closestPoint = pts.reduce((prev, curr) =>
        Math.abs(curr.x - touchX) < Math.abs(prev.x - touchX) ? curr : prev,
      );
    }

    return {
      linePath: Skia.Path.MakeFromSVGString(lineData),
      areaPath: Skia.Path.MakeFromSVGString(areaData),
      points: pts,
      touchPoint: closestPoint,
    };
  }, [data, timestamps, width, height, touchX, minValue, maxValue, padding]);

  // Gesture handler for touch tracking
  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      'worklet';
      runOnJS(updateTouchX)(e.x);
    })
    .onUpdate((e) => {
      'worklet';
      runOnJS(updateTouchX)(e.x);
    })
    .onEnd(() => {
      'worklet';
      runOnJS(clearTouchX)();
    })
    .onFinalize(() => {
      'worklet';
      runOnJS(clearTouchX)();
    });

  // Use theme-based font from our new utility!
  const labelFont = useChartFont('label2');

  // Create vertical line path for touch indicator
  const verticalLinePath = useMemo(() => {
    if (!touchPoint) return null;
    return Skia.Path.MakeFromSVGString(
      `M ${touchPoint.x} ${padding.top} L ${touchPoint.x} ${height - padding.bottom}`,
    );
  }, [touchPoint, padding, height]);

  // Format price for display
  const formatPrice = useCallback((price: number) => {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, []);

  // Format time for scrubber label
  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }, []);

  // Current displayed price (either scrubbed or latest)
  const displayedPrice = touchPoint ? touchPoint.value : data[data.length - 1];
  const displayedTime = touchPoint
    ? formatTime(touchPoint.timestamp)
    : formatTime(timestamps[timestamps.length - 1]);

  // Determine label side based on x position to avoid overflow
  const labelSide = useMemo(() => {
    if (!touchPoint) return 'right';
    const midPoint = width / 2;
    return touchPoint.x > midPoint ? 'left' : 'right';
  }, [touchPoint, width]);

  // Calculate price change
  const priceChange = useMemo(() => {
    const current = touchPoint ? touchPoint.value : data[data.length - 1];
    const start = data[0];
    const change = current - start;
    const percentChange = (change / start) * 100;
    return {
      amount: change,
      percent: percentChange,
      isPositive: change >= 0,
    };
  }, [touchPoint, data]);

  if (!linePath || !areaPath) return null;

  const chartColor = priceChange.isPositive
    ? theme.color.accentBoldGreen
    : theme.color.accentBoldRed;

  return (
    <VStack gap={3}>
      {/* Price Display Header */}
      <Box style={{ paddingHorizontal: 16 }}>
        <VStack gap={1}>
          <HStack alignItems="baseline" gap={2}>
            <TextHeadline>{formatPrice(displayedPrice)}</TextHeadline>
            <TextLabel1
              style={{
                color: priceChange.isPositive ? theme.color.fgPositive : theme.color.fgNegative,
              }}
            >
              {priceChange.isPositive ? '+' : ''}
              {priceChange.amount.toFixed(2)} ({priceChange.percent.toFixed(2)}%)
            </TextLabel1>
          </HStack>
          <TextCaption>{displayedTime}</TextCaption>
        </VStack>
      </Box>

      {/* Chart */}
      <GestureDetector gesture={panGesture}>
        <Box onLayout={onContainerLayout} style={{ width: '100%' }}>
          <Canvas style={{ width: '100%', height }}>
            {/* Area fill */}
            <Path
              color={chartColor}
              end={animationProgress}
              opacity={0.15}
              path={areaPath}
              style="fill"
            />

            {/* Line */}
            <Path
              color={chartColor}
              end={animationProgress}
              path={linePath}
              strokeCap="round"
              strokeJoin="round"
              strokeWidth={2}
              style="stroke"
            />

            {/* Scrubber */}
            {touchPoint && verticalLinePath && (
              <Group>
                {/* Vertical line */}
                <Path
                  color={theme.color.fgPrimary}
                  opacity={0.3}
                  path={verticalLinePath}
                  strokeWidth={1}
                  style="stroke"
                />

                {/* Circle at data point */}
                <Circle color={chartColor} cx={touchPoint.x} cy={touchPoint.y} r={6} />
                <Circle
                  color={theme.color.bg}
                  cx={touchPoint.x}
                  cy={touchPoint.y}
                  r={3}
                  strokeWidth={2}
                />

                {/* Side-positioned label with background */}
                <Group>
                  {(() => {
                    const labelText = `Bitcoin ${formatPrice(touchPoint.value)}`;
                    const labelBounds = labelFont.measureText(labelText);
                    const labelPadding = { horizontal: 10, vertical: 6 };
                    const labelWidth = labelBounds.width + labelPadding.horizontal * 2;
                    const labelHeight = 28; // Fixed height for consistency
                    const anchorOffset = 12; // Distance from point to label
                    const cornerRadius = 6;

                    // Calculate label position based on side
                    let labelX: number;
                    if (labelSide === 'right') {
                      labelX = touchPoint.x + anchorOffset;
                    } else {
                      labelX = touchPoint.x - anchorOffset - labelWidth;
                    }

                    // Center label vertically on the data point
                    const labelY = touchPoint.y - labelHeight / 2;

                    // Bounds check - keep label within chart area
                    const clampedLabelY = Math.max(
                      padding.top,
                      Math.min(height - padding.bottom - labelHeight, labelY),
                    );

                    // Calculate text baseline position
                    // Skia text is positioned by baseline, so we need to account for that
                    const textY = clampedLabelY + labelHeight / 2 + labelFont.getSize() / 2.5;

                    return (
                      <>
                        {/* Label background with shadow */}
                        <RoundedRect
                          color={theme.color.bg}
                          height={labelHeight}
                          r={cornerRadius}
                          width={labelWidth}
                          x={labelX}
                          y={clampedLabelY}
                        >
                          <Shadow blur={8} color="rgba(0, 0, 0, 0.2)" dx={0} dy={2} />
                        </RoundedRect>

                        {/* Label border */}
                        <RoundedRect
                          color={chartColor}
                          height={labelHeight}
                          r={cornerRadius}
                          strokeWidth={1.5}
                          style="stroke"
                          width={labelWidth}
                          x={labelX}
                          y={clampedLabelY}
                        />

                        {/* Label text */}
                        <SkiaText
                          color={theme.color.fgPrimary}
                          font={labelFont}
                          text={labelText}
                          x={labelX + labelPadding.horizontal}
                          y={textY}
                        />
                      </>
                    );
                  })()}
                </Group>
              </Group>
            )}
          </Canvas>
        </Box>
      </GestureDetector>
    </VStack>
  );
};

/**
 * Raw Skia Drawing Demo
 * Shows basic Skia primitives without the chart context
 */
export const RawSkiaDemo = () => {
  const theme = useTheme();
  const width = 350;
  const height = 200;

  const curvePath = Skia.Path.MakeFromSVGString('M 20 100 Q 95 130 170 100 T 320 100');

  return (
    <VStack gap={2}>
      <TextLabel1>Raw Skia Primitives</TextLabel1>
      <TextCaption>Basic Skia drawing without chart context</TextCaption>
      <Box style={styles.canvasContainer}>
        <Canvas style={{ width, height }}>
          {/* Rectangle */}
          <Rect
            color={theme.color.accentBoldBlue}
            height={40}
            opacity={0.5}
            width={100}
            x={20}
            y={20}
          />

          {/* Circle */}
          <Circle color={theme.color.accentBoldGreen} cx={180} cy={40} opacity={0.7} r={20} />

          {/* Path */}
          {curvePath && (
            <Path
              color={theme.color.accentBoldPurple}
              path={curvePath}
              strokeCap="round"
              strokeWidth={3}
              style="stroke"
            />
          )}

          {/* Multiple Circles */}
          <Group>
            {[0, 1, 2, 3, 4].map((i) => (
              <Circle
                key={i}
                color={assets.btc.color}
                cx={50 + i * 30}
                cy={160}
                opacity={0.6}
                r={10}
              />
            ))}
          </Group>
        </Canvas>
      </Box>
    </VStack>
  );
};

const styles = StyleSheet.create({
  canvasContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});

const SkiaChartStories = () => {
  return (
    <ExampleScreen>
      <Example padding={0} title="⚡ Performance Demo - Real Data">
        <PerformanceDemo />
      </Example>
      <Example title="Basic Skia Line">
        <BasicSkiaLineChart />
      </Example>
      <Example title="Skia Line with Area">
        <SkiaLineChartWithArea />
      </Example>
      <Example title="Skia Line with Points">
        <SkiaLineChartWithPoints />
      </Example>
      <Example title="Multiple Skia Lines">
        <MultipleSkiaLines />
      </Example>
      <Example title="Raw Skia Primitives">
        <RawSkiaDemo />
      </Example>
    </ExampleScreen>
  );
};

export default SkiaChartStories;
