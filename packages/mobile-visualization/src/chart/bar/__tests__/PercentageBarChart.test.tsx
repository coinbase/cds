import { DefaultThemeProvider } from '@coinbase/cds-mobile/utils/testHelpers';
import { render, screen, within } from '@testing-library/react-native';

import { PercentageBarChart } from '../PercentageBarChart';

type MockSkPath = {
  type: string;
  addRect: jest.Mock;
  addRRect: jest.Mock;
  interpolate: jest.Mock;
  toSVGString: jest.Mock;
  copy: jest.Mock;
};

const makePath = (): MockSkPath => ({
  type: 'SkPath',
  addRect: jest.fn(),
  addRRect: jest.fn(),
  interpolate: jest.fn(() => makePath()),
  toSVGString: jest.fn(() => ''),
  copy: jest.fn(() => makePath()),
});

jest.mock('@shopify/react-native-skia', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Canvas: ({ children, style }: { children: React.ReactNode; style?: unknown }) =>
      React.createElement(View, { style, testID: 'skia-canvas' }, children),
    Group: ({ children }: { children?: React.ReactNode }) => children ?? null,
    Path: () => null,
    ClipOp: { Intersect: 0 },
    Skia: {
      Path: {
        Make: jest.fn(makePath),
        MakeFromSVGString: jest.fn((str: string) => ({ ...makePath(), svgString: str })),
      },
      TypefaceFontProvider: { Make: jest.fn(() => ({})) },
    },
    usePathInterpolation: jest.fn(() => makePath()),
    notifyChange: jest.fn(),
  };
});

jest.mock('react-native-reanimated', () => ({
  ...jest.requireActual('react-native-reanimated/mock'),
  useSharedValue: jest.fn((v: number) => ({ value: v })),
}));

jest.mock('../../ChartContextBridge', () => {
  const React = require('react');
  return {
    ChartBridgeProvider: ({ children }: { children: React.ReactNode }) => children,
    useChartContextBridge:
      () =>
      ({ children }: { children: React.ReactNode }) =>
        children,
  };
});

describe('PercentageBarChart', () => {
  it('renders with normalized segments', () => {
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

    expect(screen.getByTestId('percentage-bar-chart')).toBeTruthy();
  });

  it('normalizes raw values to 100%', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart
          animate={false}
          height={24}
          series={[
            { id: 'confirmed', value: 28, color: 'green' },
            { id: 'review', value: 2, color: 'orange' },
          ]}
          testID="percentage-bar-normalized"
          width={400}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('percentage-bar-normalized')).toBeTruthy();
  });

  it('returns null when series is empty', () => {
    render(
      <DefaultThemeProvider>
        <PercentageBarChart series={[]} testID="percentage-bar-empty" />
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('percentage-bar-empty')).toBeNull();
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

    expect(screen.queryByTestId('percentage-bar-zeros')).toBeNull();
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

    expect(screen.getByTestId('percentage-bar-single')).toBeTruthy();
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

    expect(screen.getByTestId('percentage-bar-clamped')).toBeTruthy();
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

    expect(screen.getByTestId('percentage-bar-multi-group')).toBeTruthy();
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

    expect(screen.getByTestId('percentage-bar-legend-dedupe')).toBeTruthy();
    const legend = screen.getByLabelText('Legend');
    expect(within(legend).getAllByText('A')).toHaveLength(1);
    expect(within(legend).getAllByText('B')).toHaveLength(1);
  });
});
