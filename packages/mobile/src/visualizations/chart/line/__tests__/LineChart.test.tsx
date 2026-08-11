import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../../utils/testHelpers';
import { LineChart } from '../LineChart';

type MockSkPath = { type: string; addRect: jest.Mock; interpolate: jest.Mock };

const makePath = (): MockSkPath => ({
  type: 'SkPath',
  addRect: jest.fn(),
  interpolate: jest.fn(() => makePath()),
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
  isSharedValue: jest.fn(() => false),
  useSharedValue: jest.fn((v: unknown) => ({ value: v })),
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

const series = [{ id: 'a', data: [1, 2, 3, 2, 4], color: 'green' }];

describe('LineChart', () => {
  it('renders a static (animate=false) chart shell', () => {
    render(
      <DefaultThemeProvider>
        <LineChart animate={false} height={40} series={series} testID="line-chart" width={100} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('skia-canvas')).toBeTruthy();
  });
});
