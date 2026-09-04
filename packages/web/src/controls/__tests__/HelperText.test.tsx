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

  it('renders custom color via style', () => {
    render(<HelperText style={{ color: '#FF0000' }}>Test text</HelperText>);

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

  it('renders custom root and icon slots with styles and classNames', () => {
    render(
      <DefaultThemeProvider>
        <HelperText
          classNames={{ root: 'helper-root', icon: 'helper-icon' }}
          color="fgNegative"
          errorIconTestID="error-icon"
          styles={{ root: { color: '#00FF00' }, icon: { color: '#0000FF' } }}
        >
          Test text
        </HelperText>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Test text')).toHaveStyle({
      color: '#00FF00',
    });
    expect(screen.getByText('Test text').className).toContain('helper-root');
    expect(screen.getByTestId('error-icon')).toHaveStyle({
      color: '#0000FF',
    });
    expect(screen.getByTestId('error-icon').className).toContain('helper-icon');
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
