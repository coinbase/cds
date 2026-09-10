import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { HelperText } from '../HelperText';

describe('HelperText.test', () => {
  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <HelperText>Test text</HelperText>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Test text')).toBeTruthy();
  });

  it('renders custom color and icon styles via style slots', () => {
    render(
      <DefaultThemeProvider>
        <HelperText
          color="fgNegative"
          errorIconTestID="error-icon"
          style={{ color: 'yellow' }}
          styles={{ root: { marginTop: 8 }, icon: { color: 'yellow' } }}
        >
          Test text
        </HelperText>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(/Test text/)).toHaveStyle({ color: 'yellow' });
    expect(screen.getByText(/Test text/)).toHaveStyle({ marginTop: 8 });
    expect(screen.getByTestId('error-icon')).toHaveStyle({ color: 'yellow' });
  });

  it('sizes the error icon to the xs icon token without a clipped box', () => {
    render(
      <DefaultThemeProvider>
        <HelperText color="fgNegative" errorIconTestID="error-icon">
          Test text
        </HelperText>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('error-icon')).toHaveStyle({
      fontSize: 12,
      lineHeight: 12,
    });
  });

  it('renders custom spacing', () => {
    render(
      <DefaultThemeProvider>
        <HelperText padding={4} testID="helper-text-test">
          Test text
        </HelperText>
      </DefaultThemeProvider>,
    );

    const element = screen.getByTestId('helper-text-test');

    expect(element).toHaveStyle({
      padding: 32,
    });
  });
});
