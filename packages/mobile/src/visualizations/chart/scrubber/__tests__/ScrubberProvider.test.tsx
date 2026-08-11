import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { useCartesianChartContext } from '../../ChartProvider';
import { ScrubberProvider } from '../ScrubberProvider';

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');
  // Chainable Gesture.Pan() mock — every builder method returns the gesture.
  const makeGesture = () => {
    const gesture: Record<string, () => unknown> = {};
    for (const method of [
      'activateAfterLongPress',
      'shouldCancelWhenOutside',
      'failOffsetY',
      'failOffsetX',
      'onStart',
      'onUpdate',
      'onEnd',
      'onTouchesCancelled',
    ]) {
      gesture[method] = () => gesture;
    }
    return gesture;
  };
  return {
    Gesture: { Pan: makeGesture },
    GestureDetector: ({ children }: { children: React.ReactNode }) =>
      React.createElement(View, { testID: 'gesture-detector' }, children),
  };
});

jest.mock('react-native-reanimated', () => ({
  ...jest.requireActual('react-native-reanimated/mock'),
  useSharedValue: jest.fn((v: unknown) => ({ value: v })),
  useAnimatedReaction: jest.fn(),
  runOnJS: (fn: unknown) => fn,
}));

jest.mock('../../ChartProvider', () => ({ useCartesianChartContext: jest.fn() }));

const mockedUseContext = useCartesianChartContext as unknown as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  mockedUseContext.mockReturnValue({
    layout: 'vertical',
    getXSerializableScale: () => undefined,
    getYSerializableScale: () => undefined,
    getXAxis: () => undefined,
    getYAxis: () => undefined,
  });
});

describe('ScrubberProvider', () => {
  it('wires up the pan gesture when scrubbing is enabled', () => {
    render(
      <ScrubberProvider enableScrubbing>
        <Text testID="child">content</Text>
      </ScrubberProvider>,
    );

    expect(screen.getByTestId('gesture-detector')).toBeTruthy();
    expect(screen.getByTestId('child')).toBeTruthy();
  });

  it('skips the gesture and animated reaction when scrubbing is disabled', () => {
    const { useAnimatedReaction } = require('react-native-reanimated');

    render(
      <ScrubberProvider enableScrubbing={false}>
        <Text testID="child">content</Text>
      </ScrubberProvider>,
    );

    expect(screen.queryByTestId('gesture-detector')).toBeNull();
    expect(screen.getByTestId('child')).toBeTruthy();
    expect(useAnimatedReaction).not.toHaveBeenCalled();
  });
});
