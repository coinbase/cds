import { render, screen } from '@testing-library/react-native';

import { useCartesianChartContext } from '../ChartProvider';
import { Path } from '../Path';

type MockSkPath = { type: string; addRect: jest.Mock };

const makePath = (): MockSkPath => ({ type: 'SkPath', addRect: jest.fn() });

jest.mock('@shopify/react-native-skia', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    // Surface the `clip` prop so tests can distinguish a rect clip from an SkPath clip.
    Group: ({ children, clip }: { children?: React.ReactNode; clip?: unknown }) =>
      React.createElement(View, { testID: 'group', clip }, children),
    Path: ({ style }: { style?: string }) => React.createElement(View, { testID: `path-${style}` }),
    Skia: {
      Path: {
        Make: jest.fn(makePath),
        MakeFromSVGString: jest.fn((str: string) => ({ ...makePath(), svgString: str })),
      },
    },
    usePathInterpolation: jest.fn(() => makePath()),
  };
});

jest.mock('react-native-reanimated', () => ({
  ...jest.requireActual('react-native-reanimated/mock'),
  isSharedValue: jest.fn(() => false),
  useSharedValue: jest.fn((v: unknown) => ({ value: v })),
  useDerivedValue: jest.fn((fn: () => unknown) => ({ value: fn() })),
}));

jest.mock('../ChartProvider', () => ({ useCartesianChartContext: jest.fn() }));

const mockedUseContext = useCartesianChartContext as unknown as jest.Mock;

const drawingArea = { x: 0, y: 0, width: 100, height: 40 };

function mockContext(animate: boolean) {
  mockedUseContext.mockReturnValue({
    animate,
    layout: 'vertical',
    drawingArea,
    getXScale: () => (value: number) => value,
  });
}

describe('Path interactive/static rendering', () => {
  afterEach(() => jest.clearAllMocks());

  it('uses a cheap rectangular clip (not a path clip) when the chart is not animating', () => {
    mockContext(false);
    render(<Path d="M0 0 L10 10" stroke="red" strokeWidth={2} />);

    const clip = screen.getByTestId('group').props.clip;
    // A rect clip is a plain object with numeric bounds; it routes to canvas.clipRect.
    expect(typeof clip.width).toBe('number');
    expect(typeof clip.height).toBe('number');
    expect(clip.type).toBeUndefined();
  });

  it('honors an explicit clipPath in static mode', () => {
    mockContext(false);
    render(<Path clipPath={null} d="M0 0 L10 10" stroke="red" strokeWidth={2} />);

    // clipPath={null} disables clipping entirely.
    expect(screen.getByTestId('group').props.clip).toBeUndefined();
  });

  it('renders the animated path (SkPath clip) when the chart is animating', () => {
    mockContext(true);
    render(<Path d="M0 0 L10 10" stroke="red" strokeWidth={2} />);

    const clip = screen.getByTestId('group').props.clip;
    // The animated renderer clips with an SkPath, not a plain rect.
    expect(clip?.type ?? clip?.svgString !== undefined).toBeTruthy();
  });
});
