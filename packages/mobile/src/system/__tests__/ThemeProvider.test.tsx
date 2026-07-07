import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { useTheme } from '../../hooks/useTheme';
import { defaultTheme } from '../../themes/defaultTheme';
import { ThemeProvider } from '../ThemeProvider';

const IllustrationPaletteSpy = ({ testID }: { testID: string }) => {
  const { illustrationColor } = useTheme();
  return <Text testID={testID}>{JSON.stringify(illustrationColor)}</Text>;
};

const readPalette = (testID: string) =>
  JSON.parse(screen.getByTestId(testID).props.children as string) as Record<string, string>;

describe('ThemeProvider (mobile)', () => {
  const testID = 'illustration-palette';

  it('fills in illustration colors from defaultTheme for tokens the consumer omits', () => {
    const customTheme = {
      ...defaultTheme,
      lightIllustrationColor: { primary: 'rgb(255, 0, 0)' },
    };
    render(
      <ThemeProvider activeColorScheme="light" theme={customTheme}>
        <IllustrationPaletteSpy testID={testID} />
      </ThemeProvider>,
    );
    const palette = readPalette(testID);
    // Consumer override is applied
    expect(palette.primary).toBe('rgb(255, 0, 0)');
    // Tokens not overridden fall back to defaultTheme values
    expect(palette.black).toBe(`rgb(${defaultTheme.lightSpectrum.gray100})`);
    expect(palette.white).toBe(`rgb(${defaultTheme.lightSpectrum.gray0})`);
    // Newly added gray-4 token also falls back to defaultTheme
    expect(palette.gray4).toBe('rgb(200, 203, 210)');
  });

  it('resolves the dark palette when activeColorScheme is "dark"', () => {
    const customTheme = {
      ...defaultTheme,
      darkIllustrationColor: { primary: 'rgb(0, 255, 0)' },
    };
    render(
      <ThemeProvider activeColorScheme="dark" theme={customTheme}>
        <IllustrationPaletteSpy testID={testID} />
      </ThemeProvider>,
    );
    const palette = readPalette(testID);
    expect(palette.primary).toBe('rgb(0, 255, 0)');
    expect(palette.gray4).toBe(`rgb(${defaultTheme.darkSpectrum.gray100})`);
  });

  it('leaves theme.illustrationColor undefined when the theme has no illustration palette', () => {
    const { lightIllustrationColor, darkIllustrationColor, ...themeWithoutPalettes } = defaultTheme;
    render(
      <ThemeProvider activeColorScheme="light" theme={themeWithoutPalettes as typeof defaultTheme}>
        <IllustrationPaletteSpy testID={testID} />
      </ThemeProvider>,
    );
    const raw = screen.getByTestId(testID).props.children;
    // JSON.stringify(undefined) returns undefined, which Text renders as an empty child.
    expect(raw === undefined || raw === '').toBe(true);
  });
});
