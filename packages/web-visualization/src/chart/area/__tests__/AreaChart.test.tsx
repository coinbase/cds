import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render, screen } from '@testing-library/react';

import type { LineComponentProps } from '../../line/Line';
import type { AreaComponentProps } from '../Area';
import { AreaChart } from '../AreaChart';

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

describe('AreaChart', () => {
  it('renders area content when enter transition is disabled', () => {
    render(
      <DefaultThemeProvider>
        <AreaChart
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="area-chart"
          transitions={{ enter: null }}
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('area-chart');
    const areaPath = svg.querySelector('path');
    expect(areaPath).toBeInTheDocument();
    expect(areaPath?.getAttribute('d')).toBeTruthy();

    const clipRect = svg.querySelector('clipPath rect');
    expect(clipRect).toBeInTheDocument();
    expect(Number(clipRect?.getAttribute('width'))).toBeGreaterThan(0);
  });

  it('passes custom transitions to custom area components', () => {
    const customTransitions = {
      enter: { type: 'tween' as const, duration: 0.25 },
      update: { type: 'spring' as const, stiffness: 320, damping: 30 },
    };
    const CustomArea = jest.fn((props: AreaComponentProps) => <path d={props.d} />);

    render(
      <DefaultThemeProvider>
        <AreaChart
          AreaComponent={CustomArea}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="area-chart-custom-transition"
          transitions={customTransitions}
          width={600}
        />
      </DefaultThemeProvider>,
    );

    expect(CustomArea).toHaveBeenCalled();
    const firstCallProps = CustomArea.mock.calls[0][0];
    expect(firstCallProps.transitions).toEqual(customTransitions);
  });

  it('allows series-level transitions to override chart transitions', () => {
    const chartTransitions = {
      enter: { type: 'tween' as const, duration: 0.2 },
      update: { type: 'spring' as const, stiffness: 200, damping: 20 },
    };
    const seriesTransitions = {
      enter: { type: 'tween' as const, duration: 0.5 },
      update: { type: 'spring' as const, stiffness: 500, damping: 45 },
    };
    const CustomArea = jest.fn((props: AreaComponentProps) => <path d={props.d} />);

    render(
      <DefaultThemeProvider>
        <AreaChart
          AreaComponent={CustomArea}
          height={400}
          series={[
            {
              id: 'series-a',
              color: '#111111',
              data: [10, 20, 30, 40, 50],
              transitions: seriesTransitions,
            },
            { id: 'series-b', color: '#222222', data: [5, 10, 15, 20, 25] },
          ]}
          testID="area-chart-series-transition-overrides"
          transitions={chartTransitions}
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const callProps = CustomArea.mock.calls.map(([props]) => props as AreaComponentProps);
    const seriesAProps = callProps.find((props) => props.fill === '#111111');
    const seriesBProps = callProps.find((props) => props.fill === '#222222');

    expect(seriesAProps).toBeDefined();
    expect(seriesBProps).toBeDefined();
    expect(seriesAProps?.transitions).toEqual(seriesTransitions);
    expect(seriesBProps?.transitions).toEqual(chartTransitions);
  });

  it('passes transitions to stacked dotted area and line components', () => {
    const customTransitions = {
      enter: { type: 'spring' as const, stiffness: 700, damping: 80 },
      update: { type: 'spring' as const, stiffness: 700, damping: 20 },
    };
    const CustomArea = jest.fn((props: AreaComponentProps) => <path d={props.d} />);
    const CustomLine = jest.fn((props: LineComponentProps) => <path d={props.d} />);

    render(
      <DefaultThemeProvider>
        <AreaChart
          showLines
          stacked
          AreaComponent={CustomArea}
          LineComponent={CustomLine}
          height={400}
          series={[
            { id: 'series-a', data: [100, 120, 110, 130, 125] },
            { id: 'series-b', data: [20, 20, 20, 20, 20] },
          ]}
          testID="area-chart-stacked-dotted-transition"
          transitions={customTransitions}
          type="dotted"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    expect(CustomArea).toHaveBeenCalled();
    expect(CustomLine).toHaveBeenCalled();
    expect(CustomArea.mock.calls[0][0].transitions).toEqual(customTransitions);
    expect(CustomLine.mock.calls[0][0].transitions).toEqual(customTransitions);
  });

  it('shows axes and axis labels when enabled', () => {
    render(
      <DefaultThemeProvider>
        <AreaChart
          showXAxis
          showYAxis
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="area-chart-with-axes"
          width={600}
          xAxis={{ label: 'Time' }}
          yAxis={{ label: 'Price' }}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('area-chart-with-axes');
    expect(svg.querySelector('[data-axis="x"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-axis="y"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-testid="x-axis-label"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-testid="y-axis-label"]')).toBeInTheDocument();
  });

  it('hides axes when showXAxis and showYAxis are false', () => {
    render(
      <DefaultThemeProvider>
        <AreaChart
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          showXAxis={false}
          showYAxis={false}
          testID="area-chart-no-axes"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('area-chart-no-axes');
    expect(svg.querySelector('[data-axis="x"]')).not.toBeInTheDocument();
    expect(svg.querySelector('[data-axis="y"]')).not.toBeInTheDocument();
  });

  it('renders area and line paths when showLines is enabled', () => {
    render(
      <DefaultThemeProvider>
        <AreaChart
          showLines
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="area-chart-with-lines"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('area-chart-with-lines');
    const drawablePaths = Array.from(svg.querySelectorAll('path')).filter((path) =>
      Boolean(path.getAttribute('d')),
    );
    expect(drawablePaths.length).toBeGreaterThan(1);
  });

  it('renders stacked series', () => {
    render(
      <DefaultThemeProvider>
        <AreaChart
          stacked
          animate={false}
          height={400}
          series={[
            { id: 'series-a', data: [10, 20, 30, 40, 50] },
            { id: 'series-b', data: [5, 10, 15, 20, 25] },
          ]}
          testID="area-chart-stacked"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('area-chart-stacked');
    const drawablePaths = Array.from(svg.querySelectorAll('path')).filter((path) =>
      Boolean(path.getAttribute('d')),
    );
    expect(drawablePaths.length).toBeGreaterThanOrEqual(2);
  });

  it('renders categorical y-axis labels in horizontal layout', () => {
    render(
      <DefaultThemeProvider>
        <AreaChart
          showYAxis
          animate={false}
          height={400}
          layout="horizontal"
          series={[{ id: 'test', data: [10, 20, 30] }]}
          testID="area-chart-horizontal-layout"
          width={600}
          yAxis={{ data: ['A', 'B', 'C'], scaleType: 'band' }}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('area-chart-horizontal-layout');
    expect(svg.querySelector('[data-axis="y"]')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
