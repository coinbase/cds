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

// Surface whether the scrubber context is mounted — the interactive-only machinery.
jest.mock('../../scrubber/ScrubberProvider', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    ScrubberProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(View, { testID: 'scrubber-provider' }, children),
  };
});

// Renders null in tests (screen reader off); mock it so it doesn't need the real ScrubberContext.
jest.mock('../../scrubber/ScrubberAccessibilityView', () => ({
  ScrubberAccessibilityView: () => null,
}));

const series = [{ id: 'a', data: [1, 2, 3, 2, 4], color: 'green' }];

describe('LineChart interactive mode', () => {
  it('mounts the scrubber provider by default (interactive)', () => {
    render(
      <DefaultThemeProvider>
        <LineChart height={40} series={series} testID="line-chart" width={100} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('scrubber-provider')).toBeTruthy();
  });

  it('skips the scrubber provider when interactive={false}', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          height={40}
          interactive={false}
          series={series}
          testID="line-chart"
          width={100}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('scrubber-provider')).toBeNull();
    // The chart shell still renders.
    expect(screen.getByTestId('skia-canvas')).toBeTruthy();
  });

  it('keeps scrubbing off under interactive={false} even if enableScrubbing is set', () => {
    render(
      <DefaultThemeProvider>
        <LineChart
          enableScrubbing
          height={40}
          interactive={false}
          series={series}
          testID="line-chart"
          width={100}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('scrubber-provider')).toBeNull();
  });
});
