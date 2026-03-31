import React from 'react';
import { Animated } from 'react-native';
import { DefaultThemeProvider } from '@coinbase/cds-mobile/utils/testHelpers';
import { render } from '@testing-library/react-native';

import {
  setTransform,
  SparklineInteractiveHoverDate,
  type SparklineInteractiveHoverDateRefProps,
} from '../SparklineInteractiveHoverDate';

describe('SparklineInteractiveHoverDate.test', () => {
  it('renders', () => {
    const ref = React.createRef<SparklineInteractiveHoverDateRefProps<string>>();
    const formatHoverDate = jest.fn();

    render(
      <DefaultThemeProvider>
        <SparklineInteractiveHoverDate
          ref={ref}
          shouldTakeUpHeight
          formatHoverDate={formatHoverDate}
        />
      </DefaultThemeProvider>,
    );

    const mockUpdateParams = {
      period: 'day',
      point: { date: new Date(), value: 49625.8, x: 52.641114982578394, y: 27.396319018404448 },
    };

    ref.current?.update(mockUpdateParams);

    expect(formatHoverDate).toHaveBeenCalledTimes(1);
    expect(formatHoverDate).toHaveBeenCalledWith(
      mockUpdateParams.point.date,
      mockUpdateParams.period,
    );
  });

  it('sets transform', () => {
    const transform = new Animated.ValueXY({ x: 0, y: 0 });
    const transformSpy = jest.spyOn(transform, 'setValue');
    setTransform(20, 30, 50, transform, 3);

    expect(transformSpy).toHaveBeenCalledTimes(1);
  });
});
