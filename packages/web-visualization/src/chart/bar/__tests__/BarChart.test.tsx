import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render, screen } from '@testing-library/react';

import type { BarComponentProps } from '../Bar';
import { BarChart } from '../BarChart';

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

describe('BarChart', () => {
  it('renders bars when enter transition is disabled', () => {
    render(
      <DefaultThemeProvider>
        <BarChart
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="bar-chart"
          transitions={{ enter: null }}
          width={600}
          xAxis={{ data: ['a', 'b', 'c', 'd', 'e'] }}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('bar-chart');
    const barPaths = Array.from(svg.querySelectorAll('path')).filter((path) =>
      Boolean(path.getAttribute('d')),
    );
    expect(barPaths.length).toBeGreaterThan(0);

    const clipRect = svg.querySelector('clipPath rect');
    expect(clipRect).toBeInTheDocument();
    expect(Number(clipRect?.getAttribute('width'))).toBeGreaterThan(0);
  });

  it('passes custom transitions to custom bar components', () => {
    const customTransitions = {
      enter: { type: 'tween' as const, duration: 0.25 },
      update: { type: 'spring' as const, stiffness: 320, damping: 30 },
    };
    const CustomBar = jest.fn((props: BarComponentProps) => <path d={props.d} />);

    render(
      <DefaultThemeProvider>
        <BarChart
          BarComponent={CustomBar}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="bar-chart-custom-transition"
          transitions={customTransitions}
          width={600}
          xAxis={{ data: ['a', 'b', 'c', 'd', 'e'] }}
        />
      </DefaultThemeProvider>,
    );

    expect(CustomBar).toHaveBeenCalled();
    const firstCallProps = CustomBar.mock.calls[0][0];
    expect(firstCallProps.transitions).toEqual(customTransitions);
  });

  it('shows axes and axis labels when enabled', () => {
    render(
      <DefaultThemeProvider>
        <BarChart
          showXAxis
          showYAxis
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="bar-chart-with-axes"
          width={600}
          xAxis={{ data: ['a', 'b', 'c', 'd', 'e'], label: 'Category' }}
          yAxis={{ label: 'Value' }}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('bar-chart-with-axes');
    expect(svg.querySelector('[data-axis="x"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-axis="y"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-testid="x-axis-label"]')).toBeInTheDocument();
    expect(svg.querySelector('[data-testid="y-axis-label"]')).toBeInTheDocument();
  });

  it('hides axes when showXAxis and showYAxis are false', () => {
    render(
      <DefaultThemeProvider>
        <BarChart
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          showXAxis={false}
          showYAxis={false}
          testID="bar-chart-no-axes"
          width={600}
          xAxis={{ data: ['a', 'b', 'c', 'd', 'e'] }}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('bar-chart-no-axes');
    expect(svg.querySelector('[data-axis="x"]')).not.toBeInTheDocument();
    expect(svg.querySelector('[data-axis="y"]')).not.toBeInTheDocument();
  });

  it('renders stacked bars for multiple series', () => {
    render(
      <DefaultThemeProvider>
        <BarChart
          stacked
          animate={false}
          height={400}
          series={[
            { id: 'series-a', data: [10, 20, 30, 40, 50], stackId: 'stack-1' },
            { id: 'series-b', data: [5, 10, 15, 20, 25], stackId: 'stack-1' },
          ]}
          testID="bar-chart-stacked"
          width={600}
          xAxis={{ data: ['a', 'b', 'c', 'd', 'e'] }}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('bar-chart-stacked');
    const drawablePaths = Array.from(svg.querySelectorAll('path')).filter((path) =>
      Boolean(path.getAttribute('d')),
    );
    expect(drawablePaths.length).toBeGreaterThanOrEqual(2);
  });

  it('renders horizontal layout bars from zero baseline with categorical y-axis labels', () => {
    const CustomBar = jest.fn((props: BarComponentProps) => <path d={props.d} />);

    render(
      <DefaultThemeProvider>
        <BarChart
          showYAxis
          BarComponent={CustomBar}
          animate={false}
          height={400}
          layout="horizontal"
          series={[{ id: 'test', data: [10, 20, 30] }]}
          testID="bar-chart-horizontal-layout"
          width={600}
          yAxis={{ data: ['A', 'B', 'C'], scaleType: 'band' }}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('bar-chart-horizontal-layout');
    expect(svg.querySelector('[data-axis="y"]')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();

    const renderedCategories = new Set(
      CustomBar.mock.calls
        .map(([props]) => props.dataY)
        .filter((value): value is number => typeof value === 'number'),
    );
    expect(renderedCategories.has(0)).toBe(true);
    expect(renderedCategories.has(1)).toBe(true);
    expect(renderedCategories.has(2)).toBe(true);

    const hasWideBar = CustomBar.mock.calls.some(([props]) => props.width > props.height);
    expect(hasWideBar).toBe(true);
  });
});
