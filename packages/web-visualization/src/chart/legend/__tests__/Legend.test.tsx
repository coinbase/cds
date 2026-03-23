import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render, screen } from '@testing-library/react';

import { CartesianChart } from '../../CartesianChart';
import { Line } from '../../line/Line';
import { Legend } from '../Legend';

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
});

describe('Legend', () => {
  it('renders default legend when enabled on CartesianChart', () => {
    render(
      <DefaultThemeProvider>
        <CartesianChart
          legend
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50], label: 'Test Series' }]}
          testID="cartesian-with-legend"
          width={600}
        >
          <Line seriesId="test" />
        </CartesianChart>
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Legend')).toBeInTheDocument();
    expect(screen.getByText('Test Series')).toBeInTheDocument();
  });

  it('does not render legend when legend is false', () => {
    render(
      <DefaultThemeProvider>
        <CartesianChart
          animate={false}
          height={400}
          legend={false}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50], label: 'Test Series' }]}
          testID="cartesian-no-legend"
          width={600}
        >
          <Line seriesId="test" />
        </CartesianChart>
      </DefaultThemeProvider>,
    );

    expect(screen.queryByLabelText('Legend')).not.toBeInTheDocument();
  });

  it('uses custom legend accessibility label', () => {
    render(
      <DefaultThemeProvider>
        <CartesianChart
          legend
          animate={false}
          height={400}
          legendAccessibilityLabel="Chart legend"
          series={[{ id: 'test', data: [10, 20, 30, 40, 50], label: 'Test Series' }]}
          testID="cartesian-custom-legend-label"
          width={600}
        >
          <Line seriesId="test" />
        </CartesianChart>
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Chart legend')).toBeInTheDocument();
  });

  it('filters legend entries with seriesIds', () => {
    render(
      <DefaultThemeProvider>
        <CartesianChart
          animate={false}
          height={400}
          series={[
            { id: 'series-a', data: [10, 20, 30, 40, 50], label: 'Series A' },
            { id: 'series-b', data: [5, 10, 15, 20, 25], label: 'Series B' },
          ]}
          testID="cartesian-custom-legend"
          width={600}
        >
          <Legend seriesIds={['series-a']} />
          <Line seriesId="series-a" />
          <Line seriesId="series-b" />
        </CartesianChart>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Series A')).toBeInTheDocument();
    expect(screen.queryByText('Series B')).not.toBeInTheDocument();
  });
});
