import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render, screen } from '@testing-library/react';

import { CartesianChart } from '../../CartesianChart';
import { ReferenceLine } from '../ReferenceLine';

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

  // Mock getBBox for SVG text measurement in label rendering.
  // @ts-expect-error - SVGElement prototype modification for testing
  window.SVGElement.prototype.getBBox = jest.fn(() => ({
    x: 0,
    y: 0,
    width: 50,
    height: 20,
  }));
});

describe('ReferenceLine', () => {
  it('renders a horizontal reference line with label', () => {
    render(
      <DefaultThemeProvider>
        <CartesianChart
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="reference-line-horizontal-chart"
          width={600}
        >
          <ReferenceLine dataY={30} label="Target" stroke="#ff0000" testID="horizontal-ref" />
        </CartesianChart>
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('reference-line-horizontal-chart');
    const referencePath = svg.querySelector('path[stroke="#ff0000"]');
    expect(referencePath).toBeInTheDocument();
    expect(referencePath?.getAttribute('d')).toContain('L');
    expect(screen.getByText('Target')).toBeInTheDocument();
  });

  it('renders a vertical reference line with label', () => {
    render(
      <DefaultThemeProvider>
        <CartesianChart
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="reference-line-vertical-chart"
          width={600}
          xAxis={{ data: [1, 2, 3, 4, 5] }}
        >
          <ReferenceLine dataX={2} label="Marker" stroke="#00aa00" testID="vertical-ref" />
        </CartesianChart>
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('reference-line-vertical-chart');
    const referencePath = svg.querySelector('path[stroke="#00aa00"]');
    expect(referencePath).toBeInTheDocument();
    expect(referencePath?.getAttribute('d')).toContain('L');
    expect(screen.getByText('Marker')).toBeInTheDocument();
  });

  it('does not render when target y-axis does not exist', () => {
    render(
      <DefaultThemeProvider>
        <CartesianChart
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="reference-line-missing-axis-chart"
          width={600}
        >
          <ReferenceLine dataY={30} stroke="#123123" yAxisId="missing-axis" />
        </CartesianChart>
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('reference-line-missing-axis-chart');
    const referencePath = svg.querySelector('path[stroke="#123123"]');
    expect(referencePath).not.toBeInTheDocument();
  });
});
