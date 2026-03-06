import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render, screen } from '@testing-library/react';

import { LineChart } from '../LineChart';

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

describe('LineChart', () => {
  it('renders line content when enter transition is disabled', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="line-chart"
          transitions={{ enter: null }}
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('line-chart');
    const linePath = svg.querySelector('path');
    expect(linePath).toBeInTheDocument();
    expect(linePath?.getAttribute('d')).toBeTruthy();

    const clipRect = svg.querySelector('clipPath rect');
    expect(clipRect).toBeInTheDocument();
    expect(Number(clipRect?.getAttribute('width'))).toBeGreaterThan(0);
  });

  it('shows axes and axis labels when enabled', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          showXAxis
          showYAxis
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="line-chart-with-axes"
          width={600}
          xAxis={{ label: 'Time' }}
          yAxis={{ label: 'Price' }}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('line-chart-with-axes');
    expect(svg.querySelector('[data-axis="x"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-axis="y"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-testid="x-axis-label"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-testid="y-axis-label"]')).toBeInTheDocument();
  });

  it('hides axes when showXAxis and showYAxis are false', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          showXAxis={false}
          showYAxis={false}
          testID="line-chart-no-axes"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('line-chart-no-axes');
    expect(svg.querySelector('[data-axis="x"]')).not.toBeInTheDocument();
    expect(svg.querySelector('[data-axis="y"]')).not.toBeInTheDocument();
  });

  it('renders points when points is enabled', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          points
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="line-chart-points"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('line-chart-points');
    const pointsGroup = svg.querySelector('[data-component="line-points-group"]');
    expect(pointsGroup).toBeInTheDocument();
    expect(pointsGroup?.querySelectorAll('circle').length).toBeGreaterThan(0);
  });

  it('renders area fill when showArea is enabled', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          showArea
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="line-chart-with-area"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('line-chart-with-area');
    const drawablePaths = Array.from(svg.querySelectorAll('path')).filter((path) =>
      Boolean(path.getAttribute('d')),
    );
    expect(drawablePaths.length).toBeGreaterThan(1);
  });

  it('renders gradient definitions for gradient line series', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          animate={false}
          height={400}
          series={[
            {
              id: 'test',
              data: [10, 20, 30, 40, 50],
              gradient: {
                stops: [
                  { offset: 10, color: '#ff0000' },
                  { offset: 50, color: '#00ff00' },
                ],
              },
            },
          ]}
          testID="line-chart-gradient"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('line-chart-gradient');
    const gradient = svg.querySelector('linearGradient');
    const stops = svg.querySelectorAll('linearGradient stop');
    const linePath = svg.querySelector('path[d]');

    expect(gradient).toBeInTheDocument();
    expect(stops.length).toBeGreaterThanOrEqual(2);
    expect(linePath?.getAttribute('stroke')).toMatch(/^url\(#/);
  });

  it('renders gradient stops from function-based gradient config', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          animate={false}
          height={400}
          series={[
            {
              id: 'test',
              data: [10, 20, 30, 40, 50],
              gradient: {
                stops: ({ min, max }) => [
                  { offset: min, color: '#111111' },
                  { offset: (min + max) / 2, color: '#777777' },
                  { offset: max, color: '#ffffff' },
                ],
              },
            },
          ]}
          testID="line-chart-function-gradient"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('line-chart-function-gradient');
    const stops = svg.querySelectorAll('linearGradient stop');
    expect(stops.length).toBe(3);
  });

  it('renders x-axis gradients when gradient axis is x', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          animate={false}
          height={400}
          series={[
            {
              id: 'test',
              data: [10, 20, 30, 40, 50],
              gradient: {
                axis: 'x',
                stops: [
                  { offset: 0, color: '#ff0000', opacity: 0 },
                  { offset: 4, color: '#00ff00', opacity: 1 },
                ],
              },
            },
          ]}
          testID="line-chart-x-gradient"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('line-chart-x-gradient');
    const gradient = svg.querySelector('linearGradient');
    expect(gradient).toBeInTheDocument();
    expect(gradient?.getAttribute('x1')).not.toBe(gradient?.getAttribute('x2'));
  });

  it('renders dotted lines when type is dotted', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="line-chart-dotted"
          type="dotted"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('line-chart-dotted');
    const dottedPath = svg.querySelector('path[stroke-dasharray]');
    expect(dottedPath).toBeInTheDocument();
    expect(dottedPath?.getAttribute('stroke-dasharray')).toBe('0 4');
  });

  it('applies series-level line style overrides', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          animate={false}
          height={400}
          series={[
            {
              id: 'test',
              data: [10, 20, 30, 40, 50],
              stroke: '#ff00ff',
              strokeWidth: 6,
              type: 'dotted',
            },
          ]}
          strokeWidth={2}
          testID="line-chart-series-overrides"
          type="solid"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('line-chart-series-overrides');
    const linePath = svg.querySelector('path[d]');

    expect(linePath?.getAttribute('stroke')).toBe('#ff00ff');
    expect(linePath?.getAttribute('stroke-width')).toBe('6');
    expect(linePath?.getAttribute('stroke-dasharray')).toBe('0 4');
  });

  it('allows series-level showArea override over chart defaults', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50], showArea: true }]}
          showArea={false}
          testID="line-chart-show-area-override"
          width={600}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('line-chart-show-area-override');
    const drawablePaths = Array.from(svg.querySelectorAll('path')).filter((path) =>
      Boolean(path.getAttribute('d')),
    );
    expect(drawablePaths.length).toBeGreaterThan(1);
  });
});
