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

    expect(screen.getByTestId('percentage-bar-chart')).toBeTruthy();
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

    expect(screen.getByTestId('percentage-bar-vertical')).toBeTruthy();
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

    expect(screen.getByTestId('percentage-bar-legend')).toBeTruthy();
    const legend = screen.getByLabelText('Legend');
    expect(within(legend).getAllByText('A')).toHaveLength(1);
    expect(within(legend).getAllByText('B')).toHaveLength(1);
  });
});
