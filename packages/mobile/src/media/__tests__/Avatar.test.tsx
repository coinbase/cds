import type { AvatarSize } from '@coinbase/cds-common/types';
import { render, screen } from '@testing-library/react-native';

import type { ComponentConfig } from '../../core/componentConfig';
import { ComponentConfigProvider } from '../../system/ComponentConfigProvider';
import { DefaultThemeProvider, theme as defaultTheme } from '../../utils/testHelpers';
import { Avatar, coloredFallbackTestID } from '../Avatar';

const name = 'Test Name';

describe('Avatar', () => {
  it('renders an image', () => {
    const src = 'https://images.coinbase.com/avatar?s=56';
    render(
      <DefaultThemeProvider>
        <Avatar accessibilityLabel="" name={name} src={src} testID="avatar" />
      </DefaultThemeProvider>,
    );
    const image = screen.getByTestId('avatar-image');
    expect(image).toBeTruthy();
    expect(image?.props.source).toEqual({ uri: src });

    expect(image).toBeAccessible();

    expect(screen.queryByText('T')).toBeFalsy();
  });

  it('has a border color', () => {
    render(
      <DefaultThemeProvider>
        <Avatar
          accessibilityLabel=""
          borderColor="bgPositive"
          src="https://images.coinbase.com/avatar?s=56"
          testID="avatar"
        />
      </DefaultThemeProvider>,
    );
    const box = screen.queryByTestId('avatar');
    expect(box).toBeTruthy();

    expect(box).toBeAccessible();

    expect(box).toHaveStyle({
      borderWidth: 2,
      borderColor: defaultTheme.lightColor.bgPositive,
    });
  });

  it('renders different sizes', () => {
    function renderAvatar(size: AvatarSize) {
      const px = defaultTheme.avatarSize[size];

      render(
        <DefaultThemeProvider>
          <Avatar
            accessibilityLabel=""
            name="TestName"
            size={size}
            src="https://images.coinbase.com/avatar?s=56"
            testID="avatar"
          />
        </DefaultThemeProvider>,
      );

      const box = screen.queryByTestId('avatar');
      expect(box).toBeTruthy();

      expect(box).toBeAccessible();

      expect(box).toHaveStyle({
        width: px,
        height: px,
      });
    }

    for (const size of ['m', 'l', 'xl', 'xxl', 'xxxl']) {
      renderAvatar(size as AvatarSize);
    }
  });

  it('handles shapes', () => {
    render(
      <DefaultThemeProvider>
        <Avatar
          accessibilityLabel=""
          name="TestName"
          src="https://images.coinbase.com/avatar?s=56"
          testID="avatar"
        />
      </DefaultThemeProvider>,
    );
    let box = screen.queryByTestId('avatar');

    expect(box).toBeAccessible();

    expect(box).toHaveStyle({
      borderRadius: defaultTheme.borderRadius[1000],
    });

    render(
      <DefaultThemeProvider>
        <Avatar
          accessibilityLabel=""
          name="TestName"
          shape="square"
          src="https://images.coinbase.com/avatar?s=56"
          testID="avatar"
        />
      </DefaultThemeProvider>,
    );

    box = screen.queryByTestId('avatar');

    expect(box).not.toHaveStyle({
      borderRadius: defaultTheme.borderRadius[1000],
    });
    expect(box).toHaveStyle({
      borderRadius: defaultTheme.borderRadius[100],
    });

    render(
      <DefaultThemeProvider>
        <Avatar
          accessibilityLabel=""
          name="TestName"
          shape="hexagon"
          src="https://images.coinbase.com/avatar?s=56"
          testID="hexagon"
        />
      </DefaultThemeProvider>,
    );
    box = screen.queryByTestId('hexagon');
    expect(box).toBeTruthy();
  });

  it('when passed a name prop and no src is provided it shows a fallback color and first letter of name prop', async () => {
    render(
      <DefaultThemeProvider>
        <Avatar accessibilityLabel="" colorScheme="pink" name="TestName" testID="avatar" />
      </DefaultThemeProvider>,
    );

    await screen.findByTestId(coloredFallbackTestID);

    expect(screen.getByTestId(coloredFallbackTestID)).toBeAccessible();

    expect(screen.getByText('T')).toBeTruthy();
  });

  it('applies provider config defaults', () => {
    const config: ComponentConfig = {
      Avatar: {
        shape: 'square',
      },
    };
    render(
      <DefaultThemeProvider>
        <ComponentConfigProvider value={config}>
          <Avatar
            accessibilityLabel=""
            src="https://images.coinbase.com/avatar?s=56"
            testID="avatar"
          />
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('avatar')).toHaveStyle({
      borderRadius: defaultTheme.borderRadius[100],
    });
  });

  it('allows local props to override provider defaults', () => {
    const config: ComponentConfig = {
      Avatar: {
        shape: 'square',
      },
    };
    render(
      <DefaultThemeProvider>
        <ComponentConfigProvider value={config}>
          <Avatar
            accessibilityLabel=""
            shape="circle"
            src="https://images.coinbase.com/avatar?s=56"
            testID="avatar"
          />
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('avatar')).toHaveStyle({
      borderRadius: defaultTheme.borderRadius[1000],
    });
  });
});
