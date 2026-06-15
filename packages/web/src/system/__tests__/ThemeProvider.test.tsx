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

  it('fills in illustration colors from defaultTheme for tokens the consumer omits', () => {
    const customTheme = {
      ...defaultTheme,
      lightIllustrationColor: { primary: 'rgb(255, 0, 0)' },
    };
    render(
      <div data-testid={testID}>
        <ThemeProvider activeColorScheme="light" theme={customTheme}>
          app content
        </ThemeProvider>
      </div>,
    );
    const wrapper = screen.getByTestId(testID);
    // Consumer override is applied
    expect(wrapper.innerHTML).toContain('--illustration-primary: rgb(255, 0, 0)');
    // Tokens not overridden fall back to defaultTheme values (note: no spaces in rgb() — values
    // come from spectrum template strings like `rgb(${lightSpectrum.gray100})`)
    expect(wrapper.innerHTML).toContain('--illustration-black: rgb(10,11,13)');
    // Newly added gray-4 token also falls back to defaultTheme. It uses the trailing-digit
    // lowercase-kebab CSS var convention (--illustration-gray-4) to match Figma's exported name.
    expect(wrapper.innerHTML).toContain('--illustration-gray-4: rgb(200, 203, 210)');
  });

  it('emits no illustration CSS vars when the theme has no illustration palette', () => {
    const { lightIllustrationColor, darkIllustrationColor, ...themeWithoutPalettes } = defaultTheme;
    render(
      <div data-testid={testID}>
        <ThemeProvider
          activeColorScheme="light"
          theme={themeWithoutPalettes as typeof defaultTheme}
        >
          app content
        </ThemeProvider>
      </div>,
    );
    const wrapper = screen.getByTestId(testID);
    expect(wrapper.innerHTML).not.toContain('--illustration-');
  });
});
