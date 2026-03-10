import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render, screen } from '@testing-library/react';

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
});
