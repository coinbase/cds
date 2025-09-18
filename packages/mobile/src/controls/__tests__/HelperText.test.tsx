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

  it('renders custom color', () => {
    render(
      <DefaultThemeProvider>
        <HelperText color="fgNegative" dangerouslySetColor="yellow" errorIconTestID="error-icon">
          Test text
        </HelperText>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Test text')).toHaveStyle({ color: 'yellow' });
    expect(screen.getByRole('image')).toHaveStyle({ color: 'yellow' });
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
