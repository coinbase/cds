import type { ComponentProps, ReactNode } from 'react';
import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render, screen } from '@testing-library/react';

import { Area } from '../area/Area';
import { XAxis } from '../axis/XAxis';
import { YAxis } from '../axis/YAxis';
import { BarPlot } from '../bar/BarPlot';
import { CartesianChart } from '../CartesianChart';
import { Line } from '../line/Line';
import { ReferenceLine } from '../line/ReferenceLine';
import { Point } from '../point/Point';
import { Scrubber } from '../scrubber/Scrubber';

jest.mock('@coinbase/cds-web/hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => ({
    observe: jest.fn(),
    width: 600,
    height: 400,
  })),
}));

const mockResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
const mockResizeObserverEntry = jest.fn();

const baseSeries: ComponentProps<typeof CartesianChart>['series'] = [
  { id: 'test', data: [10, 20, 30, 40, 50], label: 'Test Series' },
];

const multiSeries: ComponentProps<typeof CartesianChart>['series'] = [
  { id: 'alpha', data: [10, 20, 30, 40, 50], label: 'Alpha' },
  { id: 'beta', data: [50, 40, 30, 20, 10], label: 'Beta' },
];

const renderCartesianChart = ({
  testID = 'cartesian-chart',
  series = baseSeries,
  chartProps,
  children,
}: {
  testID?: string;
  series?: ComponentProps<typeof CartesianChart>['series'];
  chartProps?: Partial<ComponentProps<typeof CartesianChart>>;
  children?: ReactNode;
} = {}) => {
  const defaultSeriesId = series?.[0]?.id ?? 'test';

  render(
    <DefaultThemeProvider>
      <CartesianChart
        animate={false}
        height={400}
        series={series}
        testID={testID}
        width={600}
        {...chartProps}
      >
        {children ?? <Line seriesId={defaultSeriesId} />}
      </CartesianChart>
    </DefaultThemeProvider>,
  );

  return screen.getByTestId(testID);
};

beforeAll(() => {
  global.ResizeObserver = mockResizeObserver as unknown as typeof ResizeObserver;
  global.ResizeObserverEntry = mockResizeObserverEntry as unknown as typeof ResizeObserverEntry;

  // Mock getBBox for SVG text measurement in axis label rendering.
  // @ts-expect-error - SVGElement prototype modification for testing
  window.SVGElement.prototype.getBBox = jest.fn(() => ({
    x: 0,
    y: 0,
    width: 50,
    height: 20,
  }));
});

describe('CartesianChart', () => {
  describe('core rendering and transitions', () => {
    it('renders line content when child enter transition is disabled', () => {
      render(
        <DefaultThemeProvider>
          <CartesianChart
            height={400}
            series={baseSeries}
            testID="cartesian-enter-null"
            width={600}
          >
            <Line seriesId="test" transitions={{ enter: null }} />
          </CartesianChart>
        </DefaultThemeProvider>,
      );

      const svg = screen.getByTestId('cartesian-enter-null');
      const linePath = svg.querySelector('path[d]');
      expect(linePath).toBeInTheDocument();
      expect(linePath?.getAttribute('d')).toBeTruthy();

      const clipRect = svg.querySelector('clipPath rect');
      expect(clipRect).toBeInTheDocument();
      expect(Number(clipRect?.getAttribute('width'))).toBeGreaterThan(0);
    });

    it('renders line content when child update transition is disabled', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-update-null',
        children: <Line seriesId="test" transitions={{ update: null }} />,
      });
      expect(svg.querySelector('path[d]')).toBeInTheDocument();
    });

    it('renders line content when chart animation is disabled', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-animate-false',
        chartProps: { animate: false },
      });
      expect(svg.querySelector('path[d]')).toBeInTheDocument();
    });
  });

  describe('axis behavior and placement', () => {
    it('renders multiple y axes for different series', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-multi-y',
        series: [
          { id: 'left-series', data: [10, 20, 30, 40, 50], yAxisId: 'left-axis' },
          { id: 'right-series', data: [1, 2, 3, 4, 5], yAxisId: 'right-axis' },
        ],
        chartProps: {
          yAxis: [
            { id: 'left-axis', scaleType: 'linear' },
            { id: 'right-axis', scaleType: 'linear' },
          ],
        },
        children: (
          <>
            <YAxis showLine axisId="left-axis" position="left" />
            <YAxis showLine axisId="right-axis" position="right" />
            <Line seriesId="left-series" />
            <Line seriesId="right-series" />
          </>
        ),
      });

      const yAxes = svg.querySelectorAll('[data-axis="y"]');
      expect(yAxes.length).toBe(2);
      expect(svg.querySelector('[data-axis="y"][data-position="left"]')).toBeInTheDocument();
      expect(svg.querySelector('[data-axis="y"][data-position="right"]')).toBeInTheDocument();
    });

    it('renders multiple y axes on the same side', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-multi-y-left',
        series: [
          { id: 'a', data: [10, 20, 30], yAxisId: 'axis-a' },
          { id: 'b', data: [1, 2, 3], yAxisId: 'axis-b' },
        ],
        chartProps: {
          yAxis: [
            { id: 'axis-a', scaleType: 'linear' },
            { id: 'axis-b', scaleType: 'linear' },
          ],
        },
        children: (
          <>
            <YAxis showLine axisId="axis-a" position="left" />
            <YAxis showLine axisId="axis-b" position="left" />
            <Line seriesId="a" />
            <Line seriesId="b" />
          </>
        ),
      });

      expect(svg.querySelectorAll('[data-axis="y"][data-position="left"]').length).toBe(2);
    });

    it.each([
      {
        name: 'x-axis top',
        child: <XAxis showLine position="top" />,
        selector: '[data-axis="x"][data-position="top"]',
        testID: 'cartesian-axis-top',
      },
      {
        name: 'x-axis bottom',
        child: <XAxis showLine position="bottom" />,
        selector: '[data-axis="x"][data-position="bottom"]',
        testID: 'cartesian-axis-bottom',
      },
      {
        name: 'y-axis left',
        child: <YAxis showLine position="left" />,
        selector: '[data-axis="y"][data-position="left"]',
        testID: 'cartesian-axis-left',
      },
      {
        name: 'y-axis right',
        child: <YAxis showLine position="right" />,
        selector: '[data-axis="y"][data-position="right"]',
        testID: 'cartesian-axis-right',
      },
    ])('renders $name', ({ child, selector, testID }) => {
      const svg = renderCartesianChart({
        testID,
        children: (
          <>
            {child}
            <Line seriesId="test" />
          </>
        ),
      });
      expect(svg.querySelector(selector)).toBeInTheDocument();
    });

    it.each([
      {
        name: 'x-axis line when showLine is true',
        child: <XAxis showLine />,
        selector: '[data-testid="x-axis-line"]',
        expected: true,
        testID: 'cartesian-x-line-visible',
      },
      {
        name: 'x-axis line when showLine is false',
        child: <XAxis showLine={false} />,
        selector: '[data-testid="x-axis-line"]',
        expected: false,
        testID: 'cartesian-x-line-hidden',
      },
      {
        name: 'y-axis line when showLine is true',
        child: <YAxis showLine />,
        selector: '[data-testid="y-axis-line"]',
        expected: true,
        testID: 'cartesian-y-line-visible',
      },
      {
        name: 'y-axis line when showLine is false',
        child: <YAxis showLine={false} />,
        selector: '[data-testid="y-axis-line"]',
        expected: false,
        testID: 'cartesian-y-line-hidden',
      },
      {
        name: 'x-axis tick marks when showTickMarks is true',
        child: <XAxis showTickMarks />,
        selector: '[data-testid="x-axis-tick-marks"]',
        expected: true,
        testID: 'cartesian-x-ticks-visible',
      },
      {
        name: 'x-axis tick marks when showTickMarks is false',
        child: <XAxis showTickMarks={false} />,
        selector: '[data-testid="x-axis-tick-marks"]',
        expected: false,
        testID: 'cartesian-x-ticks-hidden',
      },
      {
        name: 'y-axis tick marks when showTickMarks is true',
        child: <YAxis showTickMarks />,
        selector: '[data-testid="y-axis-tick-marks"]',
        expected: true,
        testID: 'cartesian-y-ticks-visible',
      },
      {
        name: 'y-axis tick marks when showTickMarks is false',
        child: <YAxis showTickMarks={false} />,
        selector: '[data-testid="y-axis-tick-marks"]',
        expected: false,
        testID: 'cartesian-y-ticks-hidden',
      },
      {
        name: 'x-axis grid when showGrid is true',
        child: <XAxis showGrid />,
        selector: '[data-testid="x-axis-grid"]',
        expected: true,
        testID: 'cartesian-x-grid-visible',
      },
      {
        name: 'y-axis grid when showGrid is true',
        child: <YAxis showGrid />,
        selector: '[data-testid="y-axis-grid"]',
        expected: true,
        testID: 'cartesian-y-grid-visible',
      },
    ])('$name', ({ child, selector, expected, testID }) => {
      const svg = renderCartesianChart({
        testID,
        children: (
          <>
            {child}
            <Line seriesId="test" />
          </>
        ),
      });
      expect(Boolean(svg.querySelector(selector))).toBe(expected);
    });

    it('renders x-axis categorical labels from chart config', () => {
      renderCartesianChart({
        testID: 'cartesian-categorical-x',
        chartProps: { xAxis: { data: ['A', 'B', 'C', 'D', 'E'] } },
        children: (
          <>
            <XAxis />
            <Line seriesId="test" />
          </>
        ),
      });
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('renders x-axis with numeric x data', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-numeric-x',
        chartProps: { xAxis: { data: [1, 2, 3, 5, 8] } },
        children: (
          <>
            <XAxis />
            <Line seriesId="test" />
          </>
        ),
      });
      expect(svg.querySelector('[data-axis="x"]')).toBeInTheDocument();
    });
  });

  describe('axis labels', () => {
    it('shows both axis labels when provided', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-with-both-labels',
        children: (
          <>
            <XAxis label="Time" />
            <YAxis label="Price" />
            <Line seriesId="test" />
          </>
        ),
      });
      expect(svg.querySelector('[data-testid="x-axis-label"]')).toBeInTheDocument();
      expect(svg.querySelector('[data-testid="y-axis-label"]')).toBeInTheDocument();
    });

    it('hides x-axis label when x-axis label is not provided', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-no-x-label',
        children: (
          <>
            <XAxis />
            <YAxis label="Price" />
            <Line seriesId="test" />
          </>
        ),
      });
      expect(svg.querySelector('[data-testid="x-axis-label"]')).not.toBeInTheDocument();
      expect(svg.querySelector('[data-testid="y-axis-label"]')).toBeInTheDocument();
    });

    it('hides y-axis label when y-axis label is not provided', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-no-y-label',
        children: (
          <>
            <XAxis label="Time" />
            <YAxis />
            <Line seriesId="test" />
          </>
        ),
      });
      expect(svg.querySelector('[data-testid="x-axis-label"]')).toBeInTheDocument();
      expect(svg.querySelector('[data-testid="y-axis-label"]')).not.toBeInTheDocument();
    });

    it('hides both axis labels when none are provided', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-no-axis-labels',
        children: (
          <>
            <XAxis />
            <YAxis />
            <Line seriesId="test" />
          </>
        ),
      });
      expect(svg.querySelector('[data-testid="x-axis-label"]')).not.toBeInTheDocument();
      expect(svg.querySelector('[data-testid="y-axis-label"]')).not.toBeInTheDocument();
    });
  });

  describe('legend integration', () => {
    it('renders custom legend node', () => {
      renderCartesianChart({
        testID: 'cartesian-custom-legend-node',
        chartProps: {
          legend: <div data-testid="custom-legend-node">Custom Legend</div>,
        },
      });
      expect(screen.getByTestId('custom-legend-node')).toBeInTheDocument();
    });

    it('does not render default legend when legend is false', () => {
      renderCartesianChart({
        testID: 'cartesian-legend-disabled',
        chartProps: {
          legend: false,
        },
      });
      expect(screen.queryByLabelText('Legend')).not.toBeInTheDocument();
    });

    it.each(['top', 'bottom', 'left', 'right'] as const)(
      'renders default legend when legend position is %s',
      (legendPosition) => {
        renderCartesianChart({
          testID: `cartesian-legend-${legendPosition}`,
          chartProps: {
            legend: true,
            legendPosition,
          },
        });
        expect(screen.getByLabelText('Legend')).toBeInTheDocument();
      },
    );
  });

  describe('accessibility and scrubbing flags', () => {
    it('applies accessibilityLabel to svg', () => {
      const root = renderCartesianChart({
        testID: 'cartesian-accessibility-label',
        chartProps: { accessibilityLabel: 'Revenue trend chart' },
      });
      const svg = root.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.getAttribute('aria-label')).toBe('Revenue trend chart');
    });

    it('applies aria-labelledby to svg', () => {
      const root = renderCartesianChart({
        testID: 'cartesian-aria-labelledby',
        chartProps: { 'aria-labelledby': 'chart-heading' },
      });
      const svg = root.querySelector('svg');
      expect(svg).toBeInTheDocument();
      const labelledBy =
        svg?.getAttribute('aria-labelledby') ?? root.getAttribute('aria-labelledby');
      expect(labelledBy).toBe('chart-heading');
    });

    it('adds keyboard focus tabIndex when enableScrubbing is true', () => {
      const root = renderCartesianChart({
        testID: 'cartesian-scrubbing-focus',
        chartProps: { enableScrubbing: true },
      });
      const svg = root.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.getAttribute('tabindex')).toBe('0');
    });

    it('does not add keyboard focus tabIndex when enableScrubbing is false', () => {
      const root = renderCartesianChart({
        testID: 'cartesian-no-scrubbing-focus',
        chartProps: { enableScrubbing: false },
      });
      const svg = root.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.getAttribute('tabindex')).toBeNull();
    });
  });

  describe('compositions', () => {
    it('renders line and area composition', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-line-area',
        children: (
          <>
            <Area seriesId="test" />
            <Line seriesId="test" />
          </>
        ),
      });
      const drawablePaths = Array.from(svg.querySelectorAll('path')).filter((path) =>
        Boolean(path.getAttribute('d')),
      );
      expect(drawablePaths.length).toBeGreaterThan(1);
    });

    it('renders bar plot composition', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-bar-plot',
        series: [{ id: 'bars', data: [10, 20, 30, 40, 50] }],
        chartProps: {
          xAxis: {
            scaleType: 'band',
            data: ['A', 'B', 'C', 'D', 'E'],
          },
        },
        children: <BarPlot seriesIds={['bars']} />,
      });
      const drawablePaths = Array.from(svg.querySelectorAll('path')).filter((path) =>
        Boolean(path.getAttribute('d')),
      );
      expect(drawablePaths.length).toBeGreaterThan(0);
    });

    it('renders mixed line and bar composition', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-line-bar',
        series: [
          { id: 'bars', data: [10, 20, 30, 40, 50] },
          { id: 'line', data: [5, 10, 15, 10, 5] },
        ],
        chartProps: {
          xAxis: {
            scaleType: 'band',
            data: ['A', 'B', 'C', 'D', 'E'],
          },
        },
        children: (
          <>
            <BarPlot seriesIds={['bars']} />
            <Line seriesId="line" />
          </>
        ),
      });

      const drawablePaths = Array.from(svg.querySelectorAll('path')).filter((path) =>
        Boolean(path.getAttribute('d')),
      );
      expect(drawablePaths.length).toBeGreaterThan(1);
    });

    it('renders point overlay with label', () => {
      renderCartesianChart({
        testID: 'cartesian-point-overlay',
        children: (
          <>
            <Line seriesId="test" />
            <Point dataX={2} dataY={30} label="Peak" testID="overlay-point" />
          </>
        ),
      });
      expect(screen.getByText('Peak')).toBeInTheDocument();
    });

    it('renders horizontal reference line in composition', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-horizontal-reference',
        children: (
          <>
            <Line seriesId="test" />
            <ReferenceLine dataY={25} stroke="#cc0000" />
          </>
        ),
      });
      expect(svg.querySelector('path[stroke="#cc0000"]')).toBeInTheDocument();
    });

    it('renders vertical reference line in composition', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-vertical-reference',
        chartProps: {
          xAxis: { data: [1, 2, 3, 4, 5] },
        },
        children: (
          <>
            <Line seriesId="test" />
            <ReferenceLine dataX={2} stroke="#00aa00" />
          </>
        ),
      });
      expect(svg.querySelector('path[stroke="#00aa00"]')).toBeInTheDocument();
    });

    it('does not render scrubber overlay while idle', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-scrubber-default',
        chartProps: {
          enableScrubbing: true,
        },
        children: (
          <>
            <Line seriesId="test" />
            <Scrubber testID="scrubber" />
          </>
        ),
      });
      expect(
        svg.querySelector('g[data-component="scrubber-group"] rect[opacity="0.8"]'),
      ).toBeNull();
    });

    it('hides scrubber overlay when hideOverlay is true', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-scrubber-no-overlay',
        chartProps: {
          enableScrubbing: true,
        },
        children: (
          <>
            <Line seriesId="test" />
            <Scrubber hideOverlay testID="scrubber" />
          </>
        ),
      });
      expect(svg.querySelector('[data-testid="scrubber-overlay"]')).not.toBeInTheDocument();
    });

    it('renders scrubber beacons only for provided seriesIds', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-scrubber-series-filter',
        series: multiSeries,
        chartProps: {
          enableScrubbing: true,
        },
        children: (
          <>
            <Line seriesId="alpha" />
            <Line seriesId="beta" />
            <Scrubber seriesIds={['alpha']} testID="scrubber" />
          </>
        ),
      });

      expect(svg.querySelector('[data-testid="scrubber-alpha"]')).toBeInTheDocument();
      expect(svg.querySelector('[data-testid="scrubber-beta"]')).not.toBeInTheDocument();
    });

    it('renders scrubber beacons for all series when seriesIds are not provided', () => {
      const svg = renderCartesianChart({
        testID: 'cartesian-scrubber-all-series',
        series: multiSeries,
        chartProps: {
          enableScrubbing: true,
        },
        children: (
          <>
            <Line seriesId="alpha" />
            <Line seriesId="beta" />
            <Scrubber testID="scrubber" />
          </>
        ),
      });

      expect(svg.querySelector('[data-testid="scrubber-alpha"]')).toBeInTheDocument();
      expect(svg.querySelector('[data-testid="scrubber-beta"]')).toBeInTheDocument();
    });
  });
});
