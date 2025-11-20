import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import { Switch } from '@coinbase/cds-web/controls';

import { XAxis, YAxis } from '../axis';
import { useCartesianChartContext } from '../ChartProvider';
import { LineChart } from '../line/LineChart';
import { ChartText, ChartTextGroup, type TextLabelData } from '../text';
import { type ChartInset, isCategoricalScale } from '../utils';

const CHART_WIDTH = 500;
const CHART_HEIGHT = 300;

export default {
  component: ChartText,
  title: 'Components/Chart/ChartText',
};

export const InteractiveChartText = () => {
  // State for interactive controls
  const [textContent, setTextContent] = useState('Hello World');
  const [textX, setTextX] = useState(CHART_WIDTH / 2);
  const [textY, setTextY] = useState(CHART_HEIGHT / 2);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [horizontalAlignment, setHorizontalAlignment] = useState<'left' | 'center' | 'right'>(
    'center',
  );
  const [verticalAlignment, setVerticalAlignment] = useState<'top' | 'middle' | 'bottom'>('middle');
  const [showDebug, setShowDebug] = useState(false);
  const [bbox, setBbox] = useState<Rect | null>(null);
  const [hideWithDisplayNone, setHideWithDisplayNone] = useState(false);

  // State to track if chart is focused
  const [isChartFocused, setIsChartFocused] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Handle keyboard events for arrow key positioning
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Only handle arrow keys when chart is focused
      if (!isChartFocused) return;

      const step = event.shiftKey ? 10 : 1; // Hold shift for larger steps

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          setTextY((prev) => Math.max(0, prev - step));
          break;
        case 'ArrowDown':
          event.preventDefault();
          setTextY((prev) => Math.min(CHART_HEIGHT, prev + step));
          break;
        case 'ArrowLeft':
          event.preventDefault();
          setTextX((prev) => Math.max(0, prev - step));
          break;
        case 'ArrowRight':
          event.preventDefault();
          setTextX((prev) => Math.min(CHART_WIDTH, prev + step));
          break;
      }
    },
    [isChartFocused],
  );

  const chartTextInset: ChartInset = useMemo(
    () => ({ top: 8, right: 12, bottom: 8, left: 12 }),
    [],
  );

  // Set up keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      {/* Control Panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          padding: '15px',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          maxWidth: '600px', // Prevent panel from growing too wide
          width: '100%',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>ChartText Interactive Controls</h3>

        {/* Text Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ minWidth: '120px', fontWeight: 'bold', flexShrink: 0 }}>
            Text Content:
          </label>
          <input
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Enter text to display..."
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              width: '200px', // Fixed width instead of minWidth
              maxWidth: '200px', // Prevent expansion
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            type="text"
            value={textContent}
          />
        </div>

        {/* Position Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>X Position:</label>
            <input
              max={CHART_WIDTH}
              min="0"
              onChange={(e) => setTextX(Number(e.target.value))}
              style={{
                width: '80px',
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              type="number"
              value={textX}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Y Position:</label>
            <input
              max={CHART_HEIGHT}
              min="0"
              onChange={(e) => setTextY(Number(e.target.value))}
              style={{
                width: '80px',
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              type="number"
              value={textY}
            />
          </div>
        </div>

        {/* Debug Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ minWidth: '120px', fontWeight: 'bold', flexShrink: 0 }}>
            Show Debug Overlays:
          </label>
          <Switch checked={showDebug} onChange={(e) => setShowDebug(e.target.checked)} />
        </div>

        {/* Hide via display:none */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ minWidth: '120px', fontWeight: 'bold', flexShrink: 0 }}>
            Hide Text (display:none):
          </label>
          <Switch
            checked={hideWithDisplayNone}
            onChange={(e) => setHideWithDisplayNone(e.target.checked)}
          />
        </div>

        {/* Offset Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>X Offset (dx):</label>
            <input
              max="50"
              min="-50"
              onChange={(e) => setOffsetX(Number(e.target.value))}
              style={{ width: '150px' }}
              type="range"
              value={offsetX}
            />
            <span style={{ minWidth: '40px', textAlign: 'right' }}>{offsetX}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Y Offset (dy):</label>
            <input
              max="50"
              min="-50"
              onChange={(e) => setOffsetY(Number(e.target.value))}
              style={{ width: '150px' }}
              type="range"
              value={offsetY}
            />
            <span style={{ minWidth: '40px', textAlign: 'right' }}>{offsetY}</span>
          </div>
        </div>

        {/* Alignment Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Horizontal Alignment:</label>
            <select
              onChange={(e) =>
                setHorizontalAlignment(e.target.value as 'left' | 'center' | 'right')
              }
              style={{
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                minWidth: '100px',
              }}
              value={horizontalAlignment}
            >
              <option value="left">left</option>
              <option value="center">center</option>
              <option value="right">right</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Vertical Alignment:</label>
            <select
              onChange={(e) => setVerticalAlignment(e.target.value as 'top' | 'middle' | 'bottom')}
              style={{
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                minWidth: '100px',
              }}
              value={verticalAlignment}
            >
              <option value="top">top</option>
              <option value="middle">middle</option>
              <option value="bottom">bottom</option>
            </select>
          </div>
        </div>

        {/* Instructions */}
        <div
          style={{
            fontSize: '12px',
            color: '#666',
            padding: '10px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
          }}
        >
          <strong>Instructions:</strong>
          <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
            <li>Click on the chart to focus it, then use arrow keys to move the text</li>
            <li>Hold Shift + arrow keys for larger movements (10px steps)</li>
            <li>Use the sliders to test dx/dy offset behavior</li>
            <li>Modify the text content to test different string lengths</li>
          </ul>
        </div>
      </div>

      {/* Chart */}
      <div
        ref={chartRef}
        onBlur={() => setIsChartFocused(false)}
        onFocus={() => setIsChartFocused(true)}
        style={{
          border: isChartFocused ? '2px solid #007bff' : '2px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#fff',
          outline: 'none',
          cursor: 'crosshair',
        }}
      >
        <LineChart
          points
          enableScrubbing={false}
          height={CHART_HEIGHT}
          series={[
            {
              id: 'sample-data',
              data: [10, 20, 55, 42, 31, 4],
              color: '#2ca02c',
            },
          ]}
          style={{
            outline: 'none',
            cursor: 'crosshair',
          }}
          width={CHART_WIDTH}
        >
          <XAxis showGrid showLine showTickMarks />
          <YAxis showGrid showLine showTickMarks position="left" />
          <ChartText
            elevated
            borderRadius={8}
            color="var(--color-fgPrimary)"
            dx={offsetX}
            dy={offsetY}
            font="label1"
            horizontalAlignment={horizontalAlignment}
            inset={chartTextInset}
            onDimensionsChange={(rect) => setBbox(rect)}
            styles={{
              text: hideWithDisplayNone ? { display: 'none' } : undefined,
              backgroundRect: hideWithDisplayNone ? { display: 'none' } : undefined,
            }}
            testID="test-text"
            verticalAlignment={verticalAlignment}
            x={textX}
            y={textY}
          >
            {textContent}
          </ChartText>
          {showDebug && (
            <>
              {/* Crosshair to show exact position */}
              <g opacity={0.3}>
                <line
                  stroke="#ff0000"
                  strokeDasharray="2,2"
                  strokeWidth={1}
                  x1={textX}
                  x2={textX}
                  y1={0}
                  y2={CHART_HEIGHT}
                />
                <line
                  stroke="#ff0000"
                  strokeDasharray="2,2"
                  strokeWidth={1}
                  x1={0}
                  x2={CHART_WIDTH}
                  y1={textY}
                  y2={textY}
                />
              </g>

              {/* Position indicator dot */}
              <circle cx={textX} cy={textY} fill="#ff0000" opacity={0.7} r={3} />

              {/* Bounding box of measured text */}
              {bbox && (
                <rect
                  fill="none"
                  height={bbox.height}
                  stroke="#32cd32"
                  strokeWidth={1}
                  width={bbox.width}
                  x={bbox.x}
                  y={bbox.y}
                />
              )}
            </>
          )}
        </LineChart>
      </div>

      {/* Current Values Display */}
      <div
        style={{
          fontSize: '14px',
          color: '#333',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          fontFamily: 'monospace',
          maxWidth: '600px', // Prevent expansion
          overflow: 'hidden',
          wordBreak: 'break-all', // Break long text
        }}
      >
        <strong>Current Values:</strong>
        <br />
        Text: &quot;{textContent}&quot; | Position: ({textX}, {textY}) | Offset: ({offsetX},{' '}
        {offsetY})
        <br />
        Hidden (display:none): {hideWithDisplayNone ? 'true' : 'false'}
        <br />
        Bounding Box: ({bbox?.x}, {bbox?.y}, {bbox?.width}, {bbox?.height})
      </div>
    </div>
  );
};

export const InteractiveChartTextGroup = () => {
  // State for interactive controls
  const [dataPointCount, setDataPointCount] = useState(10);
  const [labelLength, setLabelLength] = useState<'numbers' | 'short' | 'medium' | 'long'>('short');
  const [showDebug, setShowDebug] = useState(true);

  // Generate random data based on count
  const chartData = useMemo(() => {
    return Array.from({ length: dataPointCount }, () => Math.floor(Math.random() * 100));
  }, [dataPointCount]);

  // Generate labels based on length setting
  const generateLabel = useCallback((index: number, type: typeof labelLength): string => {
    switch (type) {
      case 'numbers':
        return index.toString();
      case 'short':
        return [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
        ][index % 20];
      case 'medium':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][
          index % 12
        ];
      case 'long':
        return [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ][index % 12];
      default:
        return index.toString();
    }
  }, []);

  // Prepare label strings; actual x-positioning will use the chart's x-scale
  const labelStrings = useMemo((): string[] => {
    if (chartData.length === 0) return [];
    return chartData.map((_, index) => generateLabel(index, labelLength));
  }, [chartData, labelLength, generateLabel]);

  // Inline helper to align labels to the chart's x-scale
  const ScaleAlignedLabels = ({ labels }: { labels: string[] }) => {
    const { getXScale, height } = useCartesianChartContext();
    const [bboxMap, setBboxMap] = useState<
      Map<number, { x: number; y: number; width: number; height: number }>
    >(new Map());
    const xScale = getXScale();

    const labelsData = useMemo((): TextLabelData[] => {
      if (!xScale) return [];

      return labels.map((label, index) => {
        const start = xScale(index) ?? 0;
        const x = isCategoricalScale(xScale) ? start + (xScale.bandwidth?.() ?? 0) / 2 : start;
        return {
          x,
          y: height - 20,
          label,
          chartTextProps: {
            textAnchor: 'middle' as const,
            dominantBaseline: 'hanging' as const,
            color: 'var(--color-fgPrimary)',
            font: 'caption' as const,
            onDimensionsChange: (rect) => {
              setBboxMap((prev) => {
                const next = new Map(prev);
                next.set(index, rect);
                return next;
              });
            },
          },
        };
      });
    }, [labels, xScale, height]);

    return (
      <>
        <ChartTextGroup labels={labelsData} prioritizeEndLabels={true} />
        {showDebug && (
          <>
            {/* Debug visuals: red dots at intended label positions */}
            <g>
              {labelsData.map((d, i) => (
                <circle key={`label-dot-${i}`} cx={d.x} cy={d.y} fill="#ff0000" r={2} />
              ))}
            </g>
            {/* Debug visuals: lime green rectangles for measured label bounding boxes */}
            <g>
              {Array.from(bboxMap.entries()).map(([i, r]) => (
                <rect
                  key={`label-bbox-${i}`}
                  fill="none"
                  height={r.height}
                  stroke="#32cd32"
                  strokeWidth={1}
                  width={r.width}
                  x={r.x}
                  y={r.y}
                />
              ))}
            </g>
          </>
        )}
      </>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      {/* Control Panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          padding: '15px',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          maxWidth: '600px',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
          ChartTextGroup Interactive Controls
        </h3>

        {/* Data Point Count Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ minWidth: '150px', fontWeight: 'bold' }}>Number of Data Points:</label>
          <input
            max="50"
            min="1"
            onChange={(e) => setDataPointCount(Number(e.target.value))}
            style={{ width: '200px' }}
            type="range"
            value={dataPointCount}
          />
          <span style={{ minWidth: '30px', textAlign: 'right' }}>{dataPointCount}</span>
        </div>

        {/* Label Length Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ minWidth: '150px', fontWeight: 'bold' }}>Label Length:</label>
          <select
            onChange={(e) => setLabelLength(e.target.value as typeof labelLength)}
            style={{
              padding: '4px 8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              minWidth: '120px',
            }}
            value={labelLength}
          >
            <option value="numbers">Numbers (0, 1, 2...)</option>
            <option value="short">Short (A, B, C...)</option>
            <option value="medium">Medium (Jan, Feb...)</option>
            <option value="long">Long (January, February...)</option>
          </select>
        </div>

        {/* Debug Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ minWidth: '150px', fontWeight: 'bold' }}>Show Debug Overlays:</label>
          <Switch checked={showDebug} onChange={(e) => setShowDebug(e.target.checked)} />
        </div>

        {/* Instructions */}
        <div
          style={{
            fontSize: '12px',
            color: '#666',
            padding: '10px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
          }}
        >
          <strong>Instructions:</strong>
          <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
            <li>
              Adjust the number of data points to see how ChartTextGroup handles different densities
            </li>
            <li>Change label length to test overlap detection with varying text widths</li>
            <li>Notice how the component automatically hides overlapping labels</li>
          </ul>
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          width: 'fit-content',
          border: '2px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}
      >
        <LineChart
          enableScrubbing={false}
          height={CHART_HEIGHT}
          series={[
            {
              id: 'sample-data',
              data: chartData,
              color: '#2ca02c',
            },
          ]}
          width={CHART_WIDTH}
        >
          {/* Axes with grid lines but no labels */}
          <XAxis
            position="bottom"
            showGrid={true}
            showLine={true}
            showTickMarks={false}
            tickLabelFormatter={() => ''} // Hide axis labels
          />
          <YAxis
            position="left"
            showGrid={true}
            showLine={true}
            showTickMarks={false}
            tickLabelFormatter={() => ''} // Hide axis labels
          />

          {/* ChartTextGroup with labels aligned to data point x positions */}
          <ScaleAlignedLabels labels={labelStrings} />
        </LineChart>
      </div>

      {/* Status Display */}
      <div
        style={{
          fontSize: '14px',
          color: '#333',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          fontFamily: 'monospace',
          maxWidth: '600px',
        }}
      >
        <strong>Current State:</strong>
        <br />
        Data Points: {dataPointCount} | Label Type: {labelLength} | Generated Labels:{' '}
        {labelStrings.length}
        <br />
        Sample Labels: [
        {labelStrings
          .slice(0, 5)
          .map((d) => `"${d}"`)
          .join(', ')}
        {labelStrings.length > 5 ? '...' : ''}]
      </div>
    </div>
  );
};
