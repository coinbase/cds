import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render, screen } from '@testing-library/react';

import { CartesianChart } from '../../CartesianChart';
import { Line } from '../../line/Line';
import { XAxis, YAxis } from '..';

jest.mock('@coinbase/cds-web/hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => ({
    observe: jest.fn(),
    width: 600,
    height: 400,
  })),
}));

// Mock ResizeObserver for any other usage
const mockResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
const mockResizeObserverEntry = jest.fn();

beforeAll(() => {
  global.ResizeObserver = mockResizeObserver as unknown as typeof ResizeObserver;
  global.ResizeObserverEntry = mockResizeObserverEntry as unknown as typeof ResizeObserverEntry;

  // Mock getBBox for SVG elements (JSDOM doesn't support it)
  // @ts-expect-error - SVGElement prototype modification for testing
  window.SVGElement.prototype.getBBox = jest.fn(() => ({
    x: 0,
    y: 0,
    width: 50,
    height: 20,
  }));
});

const renderChart = (children: React.ReactNode) => {
  return render(
    <DefaultThemeProvider>
      <CartesianChart
        animate={false}
        height={400}
        series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
        testID="test-chart"
        width={600}
      >
        {children}
      </CartesianChart>
    </DefaultThemeProvider>,
  );
};

describe('YAxis', () => {
  describe('axis line rendering', () => {
    it('renders axis line without clip path when positioned left', () => {
      renderChart(
        <>
          <YAxis showLine position="left" />
          <Line seriesId="test" />
        </>,
      );

      const svg = screen.getByTestId('test-chart');
      const yAxisGroup = svg.querySelector('[data-axis="y"][data-position="left"]');

      expect(yAxisGroup).toBeInTheDocument();

      const axisLine = yAxisGroup?.querySelector('[data-testid="y-axis-line"]');

      expect(axisLine).toBeInTheDocument();

      // The axis line should not have a clip-path that clips it outside the drawing area
      // Either no clip-path attribute or an empty one
      const clipPath = axisLine?.getAttribute('clip-path');
      expect(clipPath === null || clipPath === '' || clipPath === 'none').toBe(true);
    });

    it('renders axis line without clip path when positioned right', () => {
      renderChart(
        <>
          <YAxis showLine position="right" />
          <Line seriesId="test" />
        </>,
      );

      const svg = screen.getByTestId('test-chart');
      const yAxisGroup = svg.querySelector('[data-axis="y"][data-position="right"]');

      expect(yAxisGroup).toBeInTheDocument();

      const axisLine = yAxisGroup?.querySelector('[data-testid="y-axis-line"]');
      expect(axisLine).toBeInTheDocument();

      const clipPath = axisLine?.getAttribute('clip-path');
      expect(clipPath === null || clipPath === '' || clipPath === 'none').toBe(true);
    });
  });

  describe('tick marks', () => {
    it('renders tick marks when showTickMarks is true', () => {
      renderChart(
        <>
          <YAxis showTickMarks position="left" />
          <Line seriesId="test" />
        </>,
      );

      const svg = screen.getByTestId('test-chart');
      const tickMarksGroup = svg.querySelector('[data-axis="y"] [data-testid="y-axis-tick-marks"]');

      expect(tickMarksGroup).toBeInTheDocument();

      const tickMarkPaths = tickMarksGroup?.querySelectorAll('path');
      expect(tickMarkPaths?.length).toBeGreaterThan(0);
    });

    it('does not render tick marks when showTickMarks is false', () => {
      renderChart(
        <>
          <YAxis position="left" showTickMarks={false} />
          <Line seriesId="test" />
        </>,
      );

      const svg = screen.getByTestId('test-chart');
      const tickMarksGroup = svg.querySelector('[data-axis="y"] [data-testid="y-axis-tick-marks"]');

      expect(tickMarksGroup).not.toBeInTheDocument();
    });
  });
});

describe('XAxis', () => {
  describe('axis line rendering', () => {
    it('renders axis line without clip path when positioned bottom', () => {
      renderChart(
        <>
          <XAxis showLine position="bottom" />
          <Line seriesId="test" />
        </>,
      );

      const svg = screen.getByTestId('test-chart');
      const xAxisGroup = svg.querySelector('[data-axis="x"][data-position="bottom"]');

      expect(xAxisGroup).toBeInTheDocument();

      const axisLine = xAxisGroup?.querySelector('[data-testid="x-axis-line"]');
      expect(axisLine).toBeInTheDocument();

      const clipPath = axisLine?.getAttribute('clip-path');
      expect(clipPath === null || clipPath === '' || clipPath === 'none').toBe(true);
    });

    it('renders axis line without clip path when positioned top', () => {
      renderChart(
        <>
          <XAxis showLine position="top" />
          <Line seriesId="test" />
        </>,
      );

      const svg = screen.getByTestId('test-chart');
      const xAxisGroup = svg.querySelector('[data-axis="x"][data-position="top"]');

      expect(xAxisGroup).toBeInTheDocument();

      const axisLine = xAxisGroup?.querySelector('[data-testid="x-axis-line"]');
      expect(axisLine).toBeInTheDocument();

      const clipPath = axisLine?.getAttribute('clip-path');
      expect(clipPath === null || clipPath === '' || clipPath === 'none').toBe(true);
    });
  });

  describe('tick marks', () => {
    it('renders tick marks when showTickMarks is true', () => {
      renderChart(
        <>
          <XAxis showTickMarks position="bottom" />
          <Line seriesId="test" />
        </>,
      );

      const svg = screen.getByTestId('test-chart');
      const tickMarksGroup = svg.querySelector('[data-axis="x"] [data-testid="x-axis-tick-marks"]');

      expect(tickMarksGroup).toBeInTheDocument();

      const tickMarkPaths = tickMarksGroup?.querySelectorAll('path');
      expect(tickMarkPaths?.length).toBeGreaterThan(0);
    });
  });
});

describe('Multiple Y Axes', () => {
  it('renders multiple Y axes on the same side without clipping issues', () => {
    render(
      <DefaultThemeProvider>
        <CartesianChart
          animate={false}
          height={400}
          series={[
            { id: 'linear', yAxisId: 'linearAxis', data: [1, 10, 30, 50, 70, 90, 100] },
            { id: 'log', yAxisId: 'logAxis', data: [1, 10, 30, 50, 70, 90, 100] },
          ]}
          testID="multi-axis-chart"
          width={600}
          xAxis={{ data: [1, 10, 30, 50, 70, 90, 100] }}
          yAxis={[
            { id: 'linearAxis', scaleType: 'linear' },
            { id: 'logAxis', scaleType: 'log' },
          ]}
        >
          <YAxis showLine showTickMarks axisId="logAxis" position="left" />
          <YAxis showLine showTickMarks axisId="linearAxis" position="left" />
          <Line seriesId="linear" />
          <Line seriesId="log" />
        </CartesianChart>
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('multi-axis-chart');

    // Should have two Y axis groups
    const yAxisGroups = svg.querySelectorAll('[data-axis="y"][data-position="left"]');
    expect(yAxisGroups.length).toBe(2);

    // Both axis lines should be visible (no clip path blocking them)
    yAxisGroups.forEach((axisGroup) => {
      const axisLine = axisGroup.querySelector('[data-testid="y-axis-line"]');
      expect(axisLine).toBeInTheDocument();

      // Verify the line has valid path data
      const d = axisLine?.getAttribute('d');
      expect(d).toBeTruthy();
      expect(d).toMatch(/^M\d+/); // Should start with M followed by coordinates

      // Verify no restrictive clip path
      const clipPath = axisLine?.getAttribute('clip-path');
      expect(clipPath === null || clipPath === '' || clipPath === 'none').toBe(true);
    });
  });

  it('renders Y axes at different x positions when multiple are on the same side', () => {
    render(
      <DefaultThemeProvider>
        <CartesianChart
          animate={false}
          height={400}
          series={[
            { id: 'series1', yAxisId: 'axis1', data: [10, 20, 30] },
            { id: 'series2', yAxisId: 'axis2', data: [100, 200, 300] },
          ]}
          testID="multi-axis-positions"
          width={600}
          yAxis={[
            { id: 'axis1', scaleType: 'linear' },
            { id: 'axis2', scaleType: 'linear' },
          ]}
        >
          <YAxis showLine axisId="axis1" position="left" />
          <YAxis showLine axisId="axis2" position="left" />
          <Line seriesId="series1" />
          <Line seriesId="series2" />
        </CartesianChart>
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('multi-axis-positions');
    const yAxisGroups = svg.querySelectorAll('[data-axis="y"][data-position="left"]');

    expect(yAxisGroups.length).toBe(2);

    // Extract x coordinates from the axis line paths
    const xCoordinates: number[] = [];
    yAxisGroups.forEach((axisGroup) => {
      const axisLine = axisGroup.querySelector('[data-testid="y-axis-line"]');
      const d = axisLine?.getAttribute('d');
      if (d) {
        // Parse x coordinate from path like "M60,32 L60,368"
        const match = d.match(/^M(\d+(?:\.\d+)?)/);
        if (match) {
          xCoordinates.push(parseFloat(match[1]));
        }
      }
    });

    // The two axes should be at different x positions
    expect(xCoordinates.length).toBe(2);
    expect(xCoordinates[0]).not.toBe(xCoordinates[1]);
  });
});

describe('Axis with grid lines', () => {
  it('renders grid lines when showGrid is true on YAxis', () => {
    renderChart(
      <>
        <YAxis showGrid position="left" />
        <Line seriesId="test" />
      </>,
    );

    const svg = screen.getByTestId('test-chart');
    const gridGroup = svg.querySelector('[data-testid="y-axis-grid"]');

    expect(gridGroup).toBeInTheDocument();
  });

  it('renders grid lines when showGrid is true on XAxis', () => {
    renderChart(
      <>
        <XAxis showGrid position="bottom" />
        <Line seriesId="test" />
      </>,
    );

    const svg = screen.getByTestId('test-chart');
    const gridGroup = svg.querySelector('[data-testid="x-axis-grid"]');

    expect(gridGroup).toBeInTheDocument();
  });

  it('does not render grid group when showGrid is false', () => {
    renderChart(
      <>
        <YAxis position="left" />
        <Line seriesId="test" />
      </>,
    );

    const svg = screen.getByTestId('test-chart');
    const gridGroup = svg.querySelector('[data-testid="y-axis-grid"]');

    expect(gridGroup).not.toBeInTheDocument();
  });
});

describe('Axis labels', () => {
  it('renders label when provided on YAxis', () => {
    renderChart(
      <>
        <YAxis label="Y Label" position="left" />
        <Line seriesId="test" />
      </>,
    );

    const svg = screen.getByTestId('test-chart');
    const labelGroup = svg.querySelector('[data-testid="y-axis-label"]');

    expect(labelGroup).toBeInTheDocument();
  });

  it('renders label when provided on XAxis', () => {
    renderChart(
      <>
        <XAxis label="X Label" position="bottom" />
        <Line seriesId="test" />
      </>,
    );

    const svg = screen.getByTestId('test-chart');
    const label = svg.querySelector('[data-testid="x-axis-label"]');

    expect(label).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    renderChart(
      <>
        <YAxis position="left" />
        <Line seriesId="test" />
      </>,
    );

    const svg = screen.getByTestId('test-chart');
    const labelGroup = svg.querySelector('[data-testid="y-axis-label"]');

    expect(labelGroup).not.toBeInTheDocument();
  });
});

describe('Custom testID', () => {
  it('uses custom testID for YAxis elements', () => {
    renderChart(
      <>
        <YAxis showGrid showLine showTickMarks label="Custom" position="left" testID="custom-y" />
        <Line seriesId="test" />
      </>,
    );

    const svg = screen.getByTestId('test-chart');

    expect(svg.querySelector('[data-testid="custom-y-line"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-testid="custom-y-tick-marks"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-testid="custom-y-grid"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-testid="custom-y-label"]')).toBeInTheDocument();
  });

  it('uses custom testID for XAxis elements', () => {
    renderChart(
      <>
        <XAxis showGrid showLine showTickMarks label="Custom" position="bottom" testID="custom-x" />
        <Line seriesId="test" />
      </>,
    );

    const svg = screen.getByTestId('test-chart');

    expect(svg.querySelector('[data-testid="custom-x-line"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-testid="custom-x-tick-marks"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-testid="custom-x-grid"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-testid="custom-x-label"]')).toBeInTheDocument();
  });
});
