import { render, screen } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider, theme } from '../../utils/testHelpers';
import { RemoteImage } from '../RemoteImage';

const mockSvgFetch = async () =>
  Promise.resolve(
    new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="blue" /></svg>',
    ),
  );

describe('RemoteImage', () => {
  it('shouldApplyDarkModeEnhacements border styles takes precedence over custom borderColor and passes a11y', () => {
    render(
      <DefaultThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <RemoteImage
          shouldApplyDarkModeEnhacements
          borderColor="bgPrimary"
          source="https://images.coinbase.com/avatar?s=56"
          testID="remoteimage"
        />
      </DefaultThemeProvider>,
    );
    const image = screen.queryByTestId('remoteimage');
    expect(image).toBeTruthy();

    expect(image).toBeAccessible();

    expect(image).toHaveStyle({
      borderWidth: 1,
    });
  });
  it('darkModeEnhancementsApplied border styles takes precedence over custom borderColor and passes a11y', () => {
    render(
      <DefaultThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <RemoteImage
          darkModeEnhancementsApplied
          borderColor="bgPrimary"
          source="https://images.coinbase.com/avatar?s=56"
          testID="remoteimage"
        />
      </DefaultThemeProvider>,
    );
    const image = screen.queryByTestId('remoteimage');
    expect(image).toBeTruthy();

    expect(image).toBeAccessible();

    expect(image).toHaveStyle({
      borderWidth: 1,
    });
  });

  it('has a default shape of square and passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <RemoteImage source="https://images.coinbase.com/avatar?s=56" testID="remoteimage" />
      </DefaultThemeProvider>,
    );

    const image = screen.queryByTestId('remoteimage');

    expect(image).toBeAccessible();

    expect(image).toHaveStyle({
      borderRadius: defaultTheme.borderRadius[100],
    });
  });

  it('if width/height/size is not set, it will default to size = m. Passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <RemoteImage source="https://images.coinbase.com/avatar?s=56" testID="remoteimage" />
      </DefaultThemeProvider>,
    );

    const image = screen.queryByTestId('remoteimage');

    expect(image).toBeAccessible();

    expect(image).toHaveStyle({
      width: theme.avatarSize.m,
      height: theme.avatarSize.m,
    });
  });

  it('sets accessibility attributes and labels for svgs', async () => {
    const spy = jest.spyOn(global, 'fetch').mockImplementation(mockSvgFetch);

    render(
      <DefaultThemeProvider>
        <RemoteImage
          accessibilityHint="A hint"
          accessibilityLabel="A label"
          source="https://example.com/example.svg"
        />
      </DefaultThemeProvider>,
    );

    expect(await screen.findByRole('image')).toHaveProp('accessible', true);
    expect(await screen.findByLabelText('A label')).toBeTruthy();
    expect(await screen.findByHintText('A hint')).toBeTruthy();

    spy.mockRestore();
  });

  it('sets accessibility attributes and labels for hexagon shaped images', () => {
    render(
      <DefaultThemeProvider>
        <RemoteImage
          accessibilityHint="A hint"
          accessibilityLabel="A label"
          shape="hexagon"
          source="https://images.coinbase.com/avatar?s=56"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('image')).toHaveProp('accessible', true);
    expect(screen.getByLabelText('A label')).toBeTruthy();
    expect(screen.getByHintText('A hint')).toBeTruthy();
  });

  it('sets accessibility attributes and labels for images', () => {
    render(
      <DefaultThemeProvider>
        <RemoteImage
          accessibilityHint="A hint"
          accessibilityLabel="A label"
          source="https://images.coinbase.com/avatar?s=56"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('image')).toHaveProp('accessibilityElementsHidden', false);
    expect(screen.getByRole('image')).toHaveProp('importantForAccessibility', 'auto');
    expect(screen.getByLabelText('A label')).toBeTruthy();
    expect(screen.getByHintText('A hint')).toBeTruthy();
  });

  it('sets accessibility attributes and labels for the fallback', () => {
    render(
      <DefaultThemeProvider>
        <RemoteImage
          fallbackAccessibilityHint="A fallback hint"
          fallbackAccessibilityLabel="A fallback label"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('image')).toHaveProp('accessible', true);
    expect(screen.getByLabelText('A fallback label')).toBeTruthy();
    expect(screen.getByHintText('A fallback hint')).toBeTruthy();
  });
});
