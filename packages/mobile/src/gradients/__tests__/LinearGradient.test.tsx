import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Svg } from 'react-native-svg';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { LinearGradient } from '../LinearGradient';

const colors = ['#000000', '#ffffff'];

describe('LinearGradient', () => {
  it('sizes the gradient svg from numeric style dimensions before layout', () => {
    render(
      <DefaultThemeProvider>
        <LinearGradient colors={colors} style={{ width: 200, height: 100 }} testID="grad" />
      </DefaultThemeProvider>,
    );

    const svg = screen.UNSAFE_getByType(Svg);
    expect(svg.props.width).toBe(200);
    expect(svg.props.height).toBe(100);
  });

  it('sizes the gradient svg to measured pixels on layout so it cannot expand under Fabric', () => {
    render(
      <DefaultThemeProvider>
        <LinearGradient colors={colors} testID="grad">
          <View />
        </LinearGradient>
      </DefaultThemeProvider>,
    );

    fireEvent(screen.getByTestId('grad'), 'layout', {
      nativeEvent: { layout: { width: 320, height: 48 } },
    });

    const svg = screen.UNSAFE_getByType(Svg);
    expect(svg.props.width).toBe(320);
    expect(svg.props.height).toBe(48);
  });
});
