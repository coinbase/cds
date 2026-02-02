import { Animated } from 'react-native';
import { DefaultThemeProvider } from '@coinbase/cds-mobile/utils/testHelpers';
import { renderHook } from '@testing-library/react-native';

import { useMinMaxTransform } from '../useMinMaxTransform';

jest.useFakeTimers();

describe('useMinMaxTransform.test', () => {
  it('triggers animation', () => {
    const animatedSpy = jest.spyOn(Animated, 'timing');
    const transform = new Animated.ValueXY({ x: 10, y: 20 });
    const opacity = new Animated.Value(0);
    const transformSpy = jest.spyOn(transform, 'setValue');

    const { result } = renderHook(
      () =>
        useMinMaxTransform({
          minMaxLayout: {
            x: 10,
            y: 30,
            width: 120,
            height: 50,
          },
          x: 20,
          transform,
          opacity,
        }),
      { wrapper: DefaultThemeProvider },
    );

    expect(result.current).toBeUndefined();
    expect(animatedSpy).toHaveBeenCalledTimes(1);
    expect(transformSpy).toHaveBeenCalledTimes(1);
  });
});
