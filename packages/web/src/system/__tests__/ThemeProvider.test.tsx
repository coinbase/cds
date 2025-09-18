import { render, screen } from '@testing-library/react';

import { defaultTheme } from '../../themes/defaultTheme';
import { ThemeProvider } from '../ThemeProvider';

describe('ThemeProvider', () => {
  const testID = 'theme-wrapper';
  it('applies theme css variables', () => {
    render(
      <div data-testid={testID}>
        <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
          app content
        </ThemeProvider>
      </div>,
    );
    const wrapper = screen.getByTestId(testID);
    expect(wrapper.innerHTML).toContain(`--color-fg: rgb(${defaultTheme.lightSpectrum.gray100})`);
  });

  it('applies default className', async () => {
    render(
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        app content
      </ThemeProvider>,
    );
    expect(screen.getByText('app content')).toHaveClass('light');
  });

  it('applies dark className if spectrum=dark', async () => {
    render(
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        app content
      </ThemeProvider>,
    );
    expect(screen.getByText('app content')).toHaveClass('dark');
  });

  it('applies display="contents" correctly', () => {
    render(
      <div data-testid={testID}>
        <ThemeProvider activeColorScheme="light" display="contents" theme={defaultTheme}>
          app content
        </ThemeProvider>
      </div>,
    );

    const themeWrapper = screen.getByTestId(testID).children[0];
    expect(themeWrapper).toHaveStyle({ display: 'contents' });
  });
});
