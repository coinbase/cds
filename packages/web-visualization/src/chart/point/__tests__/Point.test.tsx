import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { fireEvent, render, screen } from '@testing-library/react';

import { CartesianChart } from '../../CartesianChart';
import { Point } from '../Point';

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

describe('Point', () => {
  it('renders point with custom visual props and label', () => {
    render(
      <DefaultThemeProvider>
        <CartesianChart
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="point-chart"
          width={600}
        >
          <Point dataX={2} dataY={30} fill="#123456" label="Peak" radius={8} testID="point-node" />
        </CartesianChart>
      </DefaultThemeProvider>,
    );

    const svg = screen.getByTestId('point-chart');
    const pointGroup = svg.querySelector('[data-testid="point-node"]');
    const circle = pointGroup?.querySelector('circle');

    expect(pointGroup).toBeInTheDocument();
    expect(circle).toBeInTheDocument();
    expect(circle?.getAttribute('fill')).toBe('#123456');
    expect(circle?.getAttribute('r')).toBe('8');
    expect(screen.getByText('Peak')).toBeInTheDocument();
  });

  it('calls onClick with point metadata on click', () => {
    const onClick = jest.fn();

    render(
      <DefaultThemeProvider>
        <CartesianChart
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="point-click-chart"
          width={600}
        >
          <Point
            accessibilityLabel="Interactive point"
            dataX={1}
            dataY={20}
            onClick={onClick}
            testID="interactive-point"
          />
        </CartesianChart>
      </DefaultThemeProvider>,
    );

    const pointElement = screen.getByRole('button', { name: 'Interactive point' });
    fireEvent.click(pointElement);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][1]).toMatchObject({
      dataX: 1,
      dataY: 20,
    });
  });

  it('calls onClick with point metadata on Enter key', () => {
    const onClick = jest.fn();

    render(
      <DefaultThemeProvider>
        <CartesianChart
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
          testID="point-keyboard-chart"
          width={600}
        >
          <Point accessibilityLabel="Keyboard point" dataX={3} dataY={40} onClick={onClick} />
        </CartesianChart>
      </DefaultThemeProvider>,
    );

    const pointElement = screen.getByRole('button', { name: 'Keyboard point' });
    fireEvent.keyDown(pointElement, { key: 'Enter' });

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][1]).toMatchObject({
      dataX: 3,
      dataY: 40,
    });
  });
});
