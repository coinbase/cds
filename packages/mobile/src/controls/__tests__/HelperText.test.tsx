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

  it('sizes the error icon to the xs icon token', () => {
    render(
      <DefaultThemeProvider>
        <HelperText
          color="fgNegative"
          errorIconAccessibilityLabel="Error"
          errorIconTestID="error-icon"
        >
          Test text
        </HelperText>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('error-icon')).toBeTruthy();
    expect(screen.getByLabelText('Error')).toHaveStyle({
      fontSize: 12,
    });
  });

  it('passes dangerouslySetColor to the helper text and error icon', () => {
    render(
      <DefaultThemeProvider>
        <HelperText
          color="fgNegative"
          dangerouslySetColor="red"
          errorIconAccessibilityLabel="Error"
          errorIconTestID="error-icon"
          testID="helper-text"
        >
          Test text
        </HelperText>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('helper-text')).toHaveStyle({ color: 'red' });
    expect(screen.getByLabelText('Error')).toHaveStyle({ color: 'red' });
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
