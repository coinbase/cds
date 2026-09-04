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
  it('renders chart shell', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          height={24}
          series={[
            { id: 'a', data: 70, color: 'green' },
            { id: 'b', data: 30, color: 'orange' },
          ]}
          testID="percentage-bar-chart"
          width={400}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('percentage-bar-chart')).toBeInTheDocument();
  });

  it('renders in vertical layout', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          animate={false}
          height={80}
          layout="vertical"
          series={[
            { id: 'a', data: [60, 50], color: 'green' },
            { id: 'b', data: [40, 50], color: 'orange' },
          ]}
          testID="percentage-bar-vertical"
          width={400}
          xAxis={{ data: ['Q1', 'Q2'] }}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('percentage-bar-vertical')).toBeInTheDocument();
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
