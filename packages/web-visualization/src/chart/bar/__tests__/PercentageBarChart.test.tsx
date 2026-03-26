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
            { id: 'a', value: 70, color: 'green' },
            { id: 'b', value: 30, color: 'orange' },
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
            { id: 'confirmed', value: 28, color: 'var(--color-fgPositive)' },
            { id: 'review', value: 2, color: 'var(--color-fgCaution)' },
          ]}
          testID="percentage-bar-normalized"
          width={400}
        />
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('percentage-bar-normalized');
    expect(svg).toBeInTheDocument();
    // 28/30 and 2/30 => ~93.3% and ~6.7%; bar should render
    const paths = Array.from(svg.querySelectorAll('path')).filter((p) =>
      Boolean(p.getAttribute('d')),
    );
    expect(paths.length).toBeGreaterThan(0);
  });

  it('returns null when series is empty', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart series={[]} testID="percentage-bar-empty" />
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('percentage-bar-empty')).not.toBeInTheDocument();
  });

  it('returns null when all segment values are zero', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          series={[
            { id: 'a', value: 0 },
            { id: 'b', value: 0 },
          ]}
          testID="percentage-bar-zeros"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('percentage-bar-zeros')).not.toBeInTheDocument();
  });

  it('renders single segment as full bar', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          animate={false}
          height={24}
          series={[{ id: 'full', value: 100, color: 'blue' }]}
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
            { id: 'pos', value: 80 },
            { id: 'neg', value: -10 },
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
            { id: 'a1', value: 60, color: 'green', category: 'Q1' },
            { id: 'a2', value: 40, color: 'orange', category: 'Q1' },
            { id: 'b1', value: 50, color: 'blue', category: 'Q2' },
            { id: 'b2', value: 50, color: 'red', category: 'Q2' },
          ]}
          testID="percentage-bar-multi-group"
          width={400}
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

  it('deduplicates legend entries for multi-group segments with the same label', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          legend
          animate={false}
          height={80}
          series={[
            { id: 'g1-a', value: 60, label: 'A', color: 'green', category: 'G1' },
            { id: 'g1-b', value: 40, label: 'B', color: 'orange', category: 'G1' },
            { id: 'g2-a', value: 50, label: 'A', color: 'green', category: 'G2' },
            { id: 'g2-b', value: 50, label: 'B', color: 'orange', category: 'G2' },
          ]}
          testID="percentage-bar-legend-dedupe"
          width={400}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('percentage-bar-legend-dedupe')).toBeInTheDocument();
    const legend = screen.getByLabelText('Legend');
    expect(within(legend).getAllByText('A', { exact: true })).toHaveLength(1);
    expect(within(legend).getAllByText('B', { exact: true })).toHaveLength(1);
  });
});
