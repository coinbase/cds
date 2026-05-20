import { render } from '@testing-library/react-native';
import { scaleLinear } from 'd3-scale';

import { Gradient } from '../chart/gradient/Gradient';

jest.mock('@shopify/react-native-skia', () => ({
  LinearGradient: jest.fn(() => null),
  Skia: {
    Color: jest.fn(() => new Float32Array([1, 0, 0, 1])),
  },
}));

jest.mock('react-native-reanimated', () => jest.requireActual('react-native-reanimated/mock'));

jest.mock('../chart/ChartProvider', () => ({
  useCartesianChartContext: jest.fn(),
}));

const { LinearGradient } = jest.requireMock('@shopify/react-native-skia');
const { useCartesianChartContext } = jest.requireMock('../chart/ChartProvider');

beforeEach(() => {
  LinearGradient.mockClear();
  const xScale = scaleLinear().domain([0, 100]).range([0, 200]);
  const yScale = scaleLinear().domain([0, 100]).range([300, 0]);
  useCartesianChartContext.mockReturnValue({
    animate: false,
    getXScale: () => xScale,
    getYScale: () => yScale,
    drawingArea: { x: 0, y: 0, width: 200, height: 300 },
    layout: 'vertical',
  });
});

describe('Gradient', () => {
  // Regression guard for CDS-2065. The `colors` prop must be a worklet-driven
  // shared/derived value (an object with `.value`), not a plain JS array. When
  // `colors` was a JS-thread `useMemo` it could update one frame before the
  // worklet-driven `positions`, leading Skia to paint with mismatched array
  // lengths and crash with `ReanimatedError: Positions array must have the
  // same size as colors array`.
  it('passes colors to LinearGradient as a worklet-driven value, not a plain array', () => {
    render(
      <Gradient
        gradient={{
          axis: 'y',
          stops: [
            { offset: 0, color: 'red' },
            { offset: 100, color: 'blue' },
          ],
        }}
      />,
    );

    expect(LinearGradient).toHaveBeenCalled();
    const { colors } = LinearGradient.mock.calls[0][0];
    expect(Array.isArray(colors)).toBe(false);
    expect(colors).toEqual(expect.objectContaining({ value: expect.any(Array) }));
  });
});
