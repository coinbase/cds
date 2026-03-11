import { DefaultThemeProvider } from '@coinbase/cds-web/utils/test';
import { render, screen } from '@testing-library/react';

import { CartesianChart } from '../../CartesianChart';
import { Line } from '../../line/Line';
import { ReferenceLine } from '../../line/ReferenceLine';
import { DefaultScrubberBeacon } from '../DefaultScrubberBeacon';
import { DefaultScrubberLabel } from '../DefaultScrubberLabel';
import { Scrubber } from '../Scrubber';

jest.mock('@coinbase/cds-web/hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => ({
    observe: jest.fn(),
    width: 600,
    height: 400,
  })),
}));

// Mock ResizeObserver
const mockResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
const mockResizeObserverEntry = jest.fn();

beforeAll(() => {
  global.ResizeObserver = mockResizeObserver as unknown as typeof ResizeObserver;
  global.ResizeObserverEntry = mockResizeObserverEntry as unknown as typeof ResizeObserverEntry;

  // Mock getBBox for SVG elements (JSDOM doesn't support it)
  // @ts-expect-error - SVGElement prototype modification for testing
  window.SVGElement.prototype.getBBox = jest.fn(() => ({
    x: 0,
    y: 0,
    width: 50,
    height: 20,
  }));
});

const renderChartWithScrubber = (scrubberProps?: React.ComponentProps<typeof Scrubber>) => {
  return render(
    <DefaultThemeProvider>
      <CartesianChart
        enableScrubbing
        animate={false}
        height={400}
        series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
        testID="test-chart"
        width={600}
      >
        <Line seriesId="test" />
        <Scrubber {...scrubberProps} />
      </CartesianChart>
    </DefaultThemeProvider>,
  );
};

const renderMultiSeriesChartWithScrubber = (
  scrubberProps?: React.ComponentProps<typeof Scrubber>,
) => {
  return render(
    <DefaultThemeProvider>
      <CartesianChart
        enableScrubbing
        animate={false}
        height={400}
        series={[
          { id: 'alpha', data: [10, 20, 30, 40, 50], label: 'Alpha' },
          { id: 'beta', data: [50, 40, 30, 20, 10], label: 'Beta' },
        ]}
        testID="multi-series-chart"
        width={600}
      >
        <Line seriesId="alpha" />
        <Line seriesId="beta" />
        <Scrubber {...scrubberProps} />
      </CartesianChart>
    </DefaultThemeProvider>,
  );
};

const renderHorizontalReferenceLineWithDefaultScrubberLabel = () => {
  return render(
    <DefaultThemeProvider>
      <CartesianChart
        animate={false}
        height={400}
        layout="horizontal"
        series={[{ id: 'test', data: [10, 20, 30, 40, 50] }]}
        testID="horizontal-reference-line-chart"
        width={600}
      >
        <ReferenceLine LabelComponent={DefaultScrubberLabel} dataY={30} label="Price" />
      </CartesianChart>
    </DefaultThemeProvider>,
  );
};

const renderHorizontalMultiSeriesChartWithScrubber = (
  scrubberProps?: React.ComponentProps<typeof Scrubber>,
) => {
  return render(
    <DefaultThemeProvider>
      <CartesianChart
        enableScrubbing
        animate={false}
        height={400}
        layout="horizontal"
        series={[
          { id: 'alpha', data: [10, 20, 30, 40, 50], label: 'Alpha' },
          { id: 'beta', data: [50, 40, 30, 20, 10], label: 'Beta' },
        ]}
        testID="horizontal-multi-series-chart"
        width={600}
      >
        <Line seriesId="alpha" />
        <Line seriesId="beta" />
        <Scrubber {...scrubberProps} />
      </CartesianChart>
    </DefaultThemeProvider>,
  );
};

describe('Scrubber', () => {
  describe('basic rendering', () => {
    it('renders scrubber within chart', () => {
      renderChartWithScrubber();

      const svg = screen.getByTestId('test-chart');
      expect(svg).toBeInTheDocument();
    });

    it('renders with custom testID', () => {
      renderChartWithScrubber({ testID: 'custom-scrubber' });

      const svg = screen.getByTestId('test-chart');
      const scrubberGroup = svg.querySelector('[data-testid="custom-scrubber"]');
      expect(scrubberGroup).toBeInTheDocument();
    });

    it('renders beacon for series', () => {
      renderChartWithScrubber({ testID: 'scrubber' });

      const svg = screen.getByTestId('test-chart');
      const scrubberGroup = svg.querySelector('[data-testid="scrubber"]');
      expect(scrubberGroup).toBeInTheDocument();
    });
  });

  describe('hideOverlay', () => {
    it('does not render overlay when hideOverlay is true', () => {
      renderChartWithScrubber({ hideOverlay: true, testID: 'scrubber' });

      const svg = screen.getByTestId('test-chart');
      const overlay = svg.querySelector('[data-testid="scrubber-overlay"]');
      expect(overlay).not.toBeInTheDocument();
    });
  });

  describe('series filtering', () => {
    it('renders beacons only for specified seriesIds', () => {
      renderMultiSeriesChartWithScrubber({ seriesIds: ['alpha'], testID: 'scrubber' });

      const svg = screen.getByTestId('multi-series-chart');
      expect(svg.querySelector('[data-testid="scrubber-alpha"]')).toBeInTheDocument();
      expect(svg.querySelector('[data-testid="scrubber-beta"]')).not.toBeInTheDocument();
    });

    it('renders beacons for all series when seriesIds is not provided', () => {
      renderMultiSeriesChartWithScrubber({ testID: 'scrubber' });

      const svg = screen.getByTestId('multi-series-chart');
      expect(svg.querySelector('[data-testid="scrubber-alpha"]')).toBeInTheDocument();
      expect(svg.querySelector('[data-testid="scrubber-beta"]')).toBeInTheDocument();
    });
  });

  describe('horizontal layout labels', () => {
    it('positions default scrubber line label in the right inset', () => {
      renderHorizontalReferenceLineWithDefaultScrubberLabel();

      const textNode = screen.getByText('Price').closest('text');
      expect(textNode).toBeInTheDocument();
      expect(textNode).toHaveAttribute('text-anchor', 'middle');
      expect(textNode).toHaveAttribute('dx', '24');
      expect(textNode).toHaveAttribute('dy', '0');

      const x = Number(textNode?.getAttribute('x'));
      const dx = Number(textNode?.getAttribute('dx'));
      expect(x + dx).toBe(576);
      expect(x).toBeGreaterThan(540);
    });

    it('always hides beacon labels in horizontal layout', () => {
      renderHorizontalMultiSeriesChartWithScrubber({ hideBeaconLabels: false });

      expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
      expect(screen.queryByText('Beta')).not.toBeInTheDocument();
    });
  });
});

describe('DefaultScrubberBeacon', () => {
  const renderBeacon = (props?: Partial<React.ComponentProps<typeof DefaultScrubberBeacon>>) => {
    return render(
      <DefaultThemeProvider>
        <CartesianChart
          animate={false}
          height={400}
          series={[{ id: 'test', data: [10, 20, 30, 40, 50], color: '#ff0000' }]}
          testID="test-chart"
          width={600}
        >
          <Line seriesId="test" />
          <DefaultScrubberBeacon isIdle dataX={2} dataY={30} seriesId="test" {...props} />
        </CartesianChart>
      </DefaultThemeProvider>,
    );
  };

  describe('basic rendering', () => {
    it('renders beacon with default testID based on seriesId', () => {
      renderBeacon();

      const svg = screen.getByTestId('test-chart');
      const beacon = svg.querySelector('[data-testid="test-beacon"]');
      expect(beacon).toBeInTheDocument();
    });

    it('renders pulse circle with testID', () => {
      renderBeacon();

      const svg = screen.getByTestId('test-chart');
      const pulse = svg.querySelector('[data-testid="test-beacon-pulse"]');
      expect(pulse).toBeInTheDocument();
    });

    it('allows custom testID override', () => {
      renderBeacon({ testID: 'custom-beacon' });

      const svg = screen.getByTestId('test-chart');
      const beacon = svg.querySelector('[data-testid="custom-beacon"]');
      expect(beacon).toBeInTheDocument();

      const pulse = svg.querySelector('[data-testid="custom-beacon-pulse"]');
      expect(pulse).toBeInTheDocument();
    });

    it('renders beacon circle', () => {
      renderBeacon();

      const svg = screen.getByTestId('test-chart');
      const beacon = svg.querySelector('[data-testid="test-beacon"]');
      const circle = beacon?.querySelector('circle');
      expect(circle).toBeInTheDocument();
    });
  });

  describe('custom props', () => {
    const getMainBeaconCircle = (beacon: Element | null) => {
      const circles = beacon?.querySelectorAll('circle');
      return Array.from(circles ?? []).find((c) => c.hasAttribute('stroke'));
    };

    it('applies custom radius to beacon circle', () => {
      renderBeacon({ radius: 10 });

      const svg = screen.getByTestId('test-chart');
      const beacon = svg.querySelector('[data-testid="test-beacon"]');
      const circle = getMainBeaconCircle(beacon);
      expect(circle?.getAttribute('r')).toBe('10');
    });

    it('applies custom stroke to beacon circle', () => {
      renderBeacon({ stroke: '#00ff00' });

      const svg = screen.getByTestId('test-chart');
      const beacon = svg.querySelector('[data-testid="test-beacon"]');
      const circle = getMainBeaconCircle(beacon);
      expect(circle?.getAttribute('stroke')).toBe('#00ff00');
    });

    it('applies custom strokeWidth to beacon circle', () => {
      renderBeacon({ strokeWidth: 4 });

      const svg = screen.getByTestId('test-chart');
      const beacon = svg.querySelector('[data-testid="test-beacon"]');
      const circle = getMainBeaconCircle(beacon);
      expect(circle?.getAttribute('stroke-width')).toBe('4');
    });

    it('uses default values when props not provided', () => {
      renderBeacon();

      const svg = screen.getByTestId('test-chart');
      const beacon = svg.querySelector('[data-testid="test-beacon"]');
      const circle = getMainBeaconCircle(beacon);

      expect(circle?.getAttribute('r')).toBe('5');
      expect(circle?.getAttribute('stroke-width')).toBe('2');
      expect(circle?.getAttribute('stroke')).toBe('var(--color-bg)');
    });
  });

  describe('animate prop', () => {
    it('renders static circle when animate is false', () => {
      renderBeacon({ animate: false });

      const svg = screen.getByTestId('test-chart');
      const beacon = svg.querySelector('[data-testid="test-beacon"]');
      const circles = beacon?.querySelectorAll('circle');
      expect(circles?.length).toBeGreaterThan(0);
    });
  });

  describe('isIdle state', () => {
    it('renders beacon when isIdle is true', () => {
      renderBeacon({ isIdle: true });

      const svg = screen.getByTestId('test-chart');
      const beacon = svg.querySelector('[data-testid="test-beacon"]');
      expect(beacon).toBeInTheDocument();
    });

    it('renders beacon when isIdle is false (scrubbing)', () => {
      renderBeacon({ isIdle: false });

      const svg = screen.getByTestId('test-chart');
      const beacon = svg.querySelector('[data-testid="test-beacon"]');
      expect(beacon).toBeInTheDocument();
    });
  });

  describe('opacity', () => {
    it('applies custom opacity', () => {
      renderBeacon({ opacity: 0.5 });

      const svg = screen.getByTestId('test-chart');
      const beacon = svg.querySelector('[data-testid="test-beacon"]');
      expect(beacon?.getAttribute('opacity')).toBe('0.5');
    });
  });
});
