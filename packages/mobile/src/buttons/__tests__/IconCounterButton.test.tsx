import '@testing-library/jest-dom';

import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Pressable } from '../../system';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { IconCounterButton } from '../IconCounterButton';

describe('IconCounterButton', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <IconCounterButton icon="heart" testID="button" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('button')).toBeAccessible();
  });

  it('renders a pressable', () => {
    render(
      <DefaultThemeProvider>
        <IconCounterButton icon="heart" testID="button" />
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('calls onPress when pressed', () => {
    const handlePress = jest.fn();
    render(
      <DefaultThemeProvider>
        <IconCounterButton icon="heart" onPress={handlePress} testID="button" />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByTestId('button'));

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(
      <DefaultThemeProvider>
        <IconCounterButton ref={ref} active icon="heart" />
      </DefaultThemeProvider>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(View);
  });
});
