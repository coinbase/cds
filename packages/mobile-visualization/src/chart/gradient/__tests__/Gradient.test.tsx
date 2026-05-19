import { render } from '@testing-library/react-native';
import { scaleLinear } from 'd3-scale';

import { Gradient } from '../Gradient';

jest.mock('@shopify/react-native-skia', () => {
  return {
    LinearGradient: jest.fn(() => null),
    Skia: {
      Color: jest.fn(() => new Float32Array([1, 0, 0, 1])),
    },
  };
});

// The standard reanimated mock reinitializes useSharedValue every render, which
// hides the cross-render races this test is meant to verify. Override it to
// persist via useRef, matching production semantics.
jest.mock('react-native-reanimated', () => {
  const { useRef } = require('react');
  return {
    ...jest.requireActual('react-native-reanimated/mock'),
    useSharedValue: <T,>(initial: T) => {
      const ref = useRef({ value: initial });
      return ref.current;
    },
  };
});

jest.mock('../../ChartProvider', () => ({
  useCartesianChartContext: jest.fn(),
}));

const { LinearGradient } = jest.requireMock('@shopify/react-native-skia');
const { useCartesianChartContext } = jest.requireMock('../../ChartProvider');

const setContext = (overrides = {}) => {
  const xScale = scaleLinear().domain([0, 100]).range([0, 200]);
  const yScale = scaleLinear().domain([0, 100]).range([300, 0]);
  useCartesianChartContext.mockReturnValue({
    animate: false,
    getXScale: () => xScale,
    getYScale: () => yScale,
    drawingArea: { x: 0, y: 0, width: 200, height: 300 },
    layout: 'vertical',
    ...overrides,
  });
};

const lengthOf = (prop: unknown): number => {
  if (Array.isArray(prop)) return prop.length;
  if (
    prop &&
    typeof prop === 'object' &&
    'value' in prop &&
    Array.isArray((prop as { value: unknown }).value)
  ) {
    return (prop as { value: unknown[] }).value.length;
  }
  return -1;
};

describe('Gradient', () => {
  beforeEach(() => {
    LinearGradient.mockClear();
    setContext();
  });

  // Regression test for CDS-2065: colors and positions must always have the same
  // length on every render. Previously colors was a JS-thread useMemo while
  // positions was a worklet useDerivedValue, so a stop-count change committed a
  // new colors array one frame before positions caught up and Skia threw
  // `ReanimatedError: Positions array must have the same size as colors array`.
  it('keeps colors and positions array lengths in sync across stop-count changes', () => {
    const threeStops = {
      axis: 'y' as const,
      stops: [
        { offset: 0, color: 'red', opacity: 1 },
        { offset: 50, color: 'green', opacity: 1 },
        { offset: 100, color: 'blue', opacity: 1 },
      ],
    };
    const twoStops = {
      axis: 'y' as const,
      stops: [
        { offset: 0, color: 'red', opacity: 1 },
        { offset: 100, color: 'blue', opacity: 1 },
      ],
    };

    const { rerender } = render(<Gradient gradient={threeStops} />);
    rerender(<Gradient gradient={twoStops} />);
    rerender(<Gradient gradient={threeStops} />);

    expect(LinearGradient).toHaveBeenCalled();
    for (const call of LinearGradient.mock.calls) {
      const props = call[0];
      expect(lengthOf(props.colors)).toBeGreaterThan(0);
      expect(lengthOf(props.colors)).toBe(lengthOf(props.positions));
    }
  });
});
