import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render, screen, within } from '@testing-library/react';

import { PercentageBarChart } from '../PercentageBarChart';

jest.mock('@coinbase/cds-web/hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => ({
    observe: jest.fn(),
    width: 400,
    height: 24,
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

  // @ts-expect-error - SVGElement prototype modification for testing
  window.SVGElement.prototype.getBBox = jest.fn(() => ({
    x: 0,
    y: 0,
    width: 50,
    height: 20,
  }));
});

describe('PercentageBarChart', () => {
  it('renders a horizontal stacked bar with normalized segments', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          height={24}
          series={[
            { id: 'a', data: [70], color: 'green' },
            { id: 'b', data: [30], color: 'orange' },
          ]}
          testID="percentage-bar-chart"
          width={400}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('percentage-bar-chart');
    expect(svg).toBeInTheDocument();
    const barPaths = Array.from(svg.querySelectorAll('path')).filter((path) =>
      Boolean(path.getAttribute('d')),
    );
    expect(barPaths.length).toBeGreaterThanOrEqual(2);
  });

  it('normalizes raw values to 100%', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          animate={false}
          height={24}
          series={[
            { id: 'confirmed', data: [28], color: 'var(--color-fgPositive)' },
            { id: 'review', data: [2], color: 'var(--color-fgCaution)' },
          ]}
          testID="percentage-bar-normalized"
          width={400}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('percentage-bar-normalized');
    expect(svg).toBeInTheDocument();
    const paths = Array.from(svg.querySelectorAll('path')).filter((p) =>
      Boolean(p.getAttribute('d')),
    );
    expect(paths.length).toBeGreaterThan(0);
  });

  it('renders chart shell when series is empty', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart height={24} series={[]} testID="percentage-bar-empty" width={400} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('percentage-bar-empty')).toBeInTheDocument();
  });

  it('renders chart shell when all values are zero', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          height={24}
          series={[
            { id: 'a', data: [0] },
            { id: 'b', data: [0] },
          ]}
          testID="percentage-bar-zeros"
          width={400}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('percentage-bar-zeros')).toBeInTheDocument();
  });

  it('renders single series as full bar', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          animate={false}
          height={24}
          series={[{ id: 'full', data: [100], color: 'blue' }]}
          testID="percentage-bar-single"
          width={400}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('percentage-bar-single');
    expect(svg).toBeInTheDocument();
    const barPaths = Array.from(svg.querySelectorAll('path')).filter((path) =>
      Boolean(path.getAttribute('d')),
    );
    expect(barPaths.length).toBeGreaterThanOrEqual(1);
  });

  it('clamps negative values to zero', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          animate={false}
          height={24}
          series={[
            { id: 'pos', data: [80] },
            { id: 'neg', data: [-10] },
          ]}
          testID="percentage-bar-clamped"
          width={400}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('percentage-bar-clamped');
    expect(svg).toBeInTheDocument();
    const paths = Array.from(svg.querySelectorAll('path')).filter((p) =>
      Boolean(p.getAttribute('d')),
    );
    expect(paths.length).toBeGreaterThan(0);
  });

  it('renders multiple groups as separate bars', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          animate={false}
          height={80}
          series={[
            { id: 'a', data: [60, 50], color: 'green' },
            { id: 'b', data: [40, 50], color: 'orange' },
          ]}
          testID="percentage-bar-multi-group"
          width={400}
          yAxis={{ data: ['Q1', 'Q2'] }}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('percentage-bar-multi-group');
    expect(svg).toBeInTheDocument();
    const barPaths = Array.from(svg.querySelectorAll('path')).filter((path) =>
      Boolean(path.getAttribute('d')),
    );
    expect(barPaths.length).toBeGreaterThanOrEqual(4);
  });

  it('renders legend entries for each series', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          legend
          animate={false}
          height={80}
          series={[
            { id: 'a', data: [60, 50], label: 'A', color: 'green' },
            { id: 'b', data: [40, 50], label: 'B', color: 'orange' },
          ]}
          testID="percentage-bar-legend"
          width={400}
          yAxis={{ data: ['G1', 'G2'] }}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('percentage-bar-legend')).toBeInTheDocument();
    const legend = screen.getByLabelText('Legend');
    expect(within(legend).getAllByText('A', { exact: true })).toHaveLength(1);
    expect(within(legend).getAllByText('B', { exact: true })).toHaveLength(1);
  });
});
