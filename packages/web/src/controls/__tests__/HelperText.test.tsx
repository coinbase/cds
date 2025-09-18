import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { HelperText } from '../HelperText';

describe('HelperText.test', () => {
  it('renders text', () => {
    render(<HelperText>Test text</HelperText>);

    expect(screen.getByText('Test text')).toBeTruthy();
  });

  it('renders negative color', () => {
    render(
      <DefaultThemeProvider>
        <HelperText color="fgNegative" errorIconTestID="error-icon">
          Test text
        </HelperText>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Test text').className).toContain('fgNegative');
    expect(screen.getByTestId('error-icon').className).toContain('fgNegative');
  });

  it('renders custom color via dangerouslySetColor', () => {
    render(<HelperText dangerouslySetColor="#FF0000">Test text</HelperText>);

    expect(screen.getByText('Test text')).toHaveStyle({
      color: '#FF0000',
    });
  });

  it('renders custom color with error icon via dangerouslySetColor', () => {
    render(
      <DefaultThemeProvider>
        <HelperText color="fgNegative" dangerouslySetColor="#FF0000" errorIconTestID="error-icon">
          Test text
        </HelperText>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Test text')).toHaveStyle({
      color: '#FF0000',
    });
    expect(screen.getByTestId('error-icon')).toHaveStyle({
      color: '#FF0000',
    });
  });

  it('renders custom padding', () => {
    render(
      <HelperText padding={4} testID="helper-text-test">
        Test text
      </HelperText>,
    );

    expect(screen.getByTestId('helper-text-test').className).toContain('4');
  });
});
