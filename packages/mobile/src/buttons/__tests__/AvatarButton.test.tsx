import { Animated, Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { debounce } from '../../utils/debounce';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { AvatarButton } from '../AvatarButton';

jest.mock('../../utils/debounce');

describe('AvatarButton', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <AvatarButton accessibilityLabel="Sneezy" testID="avatar-button" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('avatar-button')).toBeAccessible();
  });

  it('renders an animated view', () => {
    render(
      <DefaultThemeProvider>
        <AvatarButton accessibilityLabel="Sneezy" />
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders a pressable', () => {
    render(
      <DefaultThemeProvider>
        <AvatarButton accessibilityLabel="Sneezy" />
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('renders children Avatar', () => {
    render(
      <DefaultThemeProvider>
        <AvatarButton
          accessibilityLabel="Sneezy"
          src="https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg"
          testID="avatar-button"
        />
      </DefaultThemeProvider>,
    );

    expect(
      screen.getByTestId('avatar-button').findByProps({
        src: 'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg',
      }),
    ).toBeTruthy();
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    (debounce as jest.Mock).mockImplementation(() => spy);
    render(
      <DefaultThemeProvider>
        <AvatarButton accessibilityLabel="Sneezy" onPress={spy} testID="avatar-button" />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByTestId('avatar-button'));

    expect(spy).toHaveBeenCalled();
  });
});
