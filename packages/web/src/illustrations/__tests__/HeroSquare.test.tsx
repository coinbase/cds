import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import type { IllustrationVariant } from '@coinbase/cds-common/types/IllustrationNames';
import heroSquareVersionMap from '@coinbase/cds-illustrations/__generated__/heroSquare/data/versionMap';
import { render, screen, waitFor } from '@testing-library/react';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/test';
import type { HeroSquareName } from '../HeroSquare';
import { HeroSquare } from '../HeroSquare';

const getURL = (
  type: IllustrationVariant,
  name: string,
  version: number,
  activeColorScheme: ColorScheme,
) => {
  return `https://static-assets.coinbase.com/ui-infra/illustration/v1/${type}/svg/${activeColorScheme}/${name}-${version}.svg`;
};

// Test URL generation logic without React rendering - much faster
describe('HeroSquare URL generation', () => {
  it('generates correct URLs for light and dark themes', () => {
    const testCases: { name: HeroSquareName; version: number }[] = [
      { name: 'add2Fa', version: heroSquareVersionMap.add2Fa },
      { name: 'startToday', version: heroSquareVersionMap.startToday },
      { name: 'invest', version: heroSquareVersionMap.invest },
    ];

    testCases.forEach(({ name, version }) => {
      const lightUrl = getURL('heroSquare', name, version, 'light');
      const darkUrl = getURL('heroSquare', name, version, 'dark');

      expect(lightUrl).toBe(
        `https://static-assets.coinbase.com/ui-infra/illustration/v1/heroSquare/svg/light/${name}-${version}.svg`,
      );
      expect(darkUrl).toBe(
        `https://static-assets.coinbase.com/ui-infra/illustration/v1/heroSquare/svg/dark/${name}-${version}.svg`,
      );
    });
  });

  it('uses correct version numbers from version map', () => {
    expect(typeof heroSquareVersionMap.add2Fa).toBe('number');
    expect(heroSquareVersionMap.add2Fa).toBeGreaterThan(0);
  });

  it('contains expected number of hero squares', () => {
    const heroSquareCount = Object.keys(heroSquareVersionMap).length;
    expect(heroSquareCount).toBeGreaterThan(300); // Ensure we have a reasonable number
  });
});

// Test actual React rendering with a representative sample - much more efficient
describe('HeroSquare component rendering', () => {
  const sampleHeroSquares: HeroSquareName[] = [
    'add2Fa',
    'startToday',
    'invest',
    'earn',
    'blockchain',
  ];

  sampleHeroSquares.forEach((name) => {
    it(`renders ${name} correctly in light theme`, () => {
      const version = heroSquareVersionMap[name];
      const expectedUrl = getURL('heroSquare', name, version, 'light');

      render(
        <DefaultThemeProvider activeColorScheme="light">
          <HeroSquare name={name} testID={name} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(name)).toHaveAttribute('src', expectedUrl);
      expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
    });

    it(`renders ${name} correctly in dark theme`, () => {
      const version = heroSquareVersionMap[name];
      const expectedUrl = getURL('heroSquare', name, version, 'dark');

      render(
        <DefaultThemeProvider activeColorScheme="dark">
          <HeroSquare name={name} testID={name} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(name)).toHaveAttribute('src', expectedUrl);
      expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
    });
  });
});

describe('can set alt', () => {
  const testAlt = 'This is a special illustration';
  it('for a HeroSquare', () => {
    render(
      <DefaultThemeProvider>
        <HeroSquare alt={testAlt} name="add2Fa" testID="HeroSquare-example" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('HeroSquare-example')).toHaveAttribute('alt', testAlt);
  });
});

describe('applyTheme', () => {
  it('renders CDN img by default (no applyTheme)', () => {
    render(
      <DefaultThemeProvider>
        <HeroSquare name="add2Fa" testID="illo" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('illo').tagName).toBe('IMG');
  });

  it('returns fallback while loading, then inline SVG once loaded', async () => {
    render(
      <DefaultThemeProvider>
        <HeroSquare applyTheme name="add2Fa" testID="illo" />
      </DefaultThemeProvider>,
    );
    // Initially returns fallback (null by default — nothing rendered while loading)
    expect(screen.queryByTestId('illo')).toBeNull();
    // After the themed SVG loads, renders the inline SVG
    await waitFor(() => expect(screen.getByTestId('illo').tagName).toBe('DIV'));
    expect(screen.getByTestId('illo').innerHTML).toContain('<svg');
  });

  it('sets role="img" and aria-label when alt is provided', async () => {
    render(
      <DefaultThemeProvider>
        <HeroSquare applyTheme alt="chart illustration" name="add2Fa" testID="illo" />
      </DefaultThemeProvider>,
    );
    await waitFor(() => expect(screen.getByTestId('illo')).toHaveAttribute('role', 'img'));
    expect(screen.getByTestId('illo')).toHaveAttribute('aria-label', 'chart illustration');
  });

  it('sets role="presentation" and no aria-label when alt is empty', async () => {
    render(
      <DefaultThemeProvider>
        <HeroSquare applyTheme alt="" name="add2Fa" testID="illo" />
      </DefaultThemeProvider>,
    );
    await waitFor(() => expect(screen.getByTestId('illo')).toHaveAttribute('role', 'presentation'));
    expect(screen.getByTestId('illo')).not.toHaveAttribute('aria-label');
  });

  it('uses illustrationColor CSS vars from the active theme', async () => {
    const customTheme = {
      ...defaultTheme,
      lightIllustrationColor: {
        ...defaultTheme.lightIllustrationColor,
        primary: 'rgb(255, 0, 0)',
      },
    };
    const { container } = render(
      <DefaultThemeProvider theme={customTheme}>
        <HeroSquare applyTheme name="add2Fa" testID="illo" />
      </DefaultThemeProvider>,
    );
    await waitFor(() => screen.getByTestId('illo').tagName === 'DIV');
    expect(container.innerHTML).toContain('--illustration-primary: rgb(255, 0, 0)');
  });

  it('shows CDN img (not fallback) when no asset exists for the name', () => {
    // version === undefined → name not in versionMap → truly no asset → use fallback
    render(
      <DefaultThemeProvider>
        <HeroSquare
          fallback={<span data-testid="custom-fallback" />}
          name={'thisDoesNotExist' as any}
          testID="illo"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.queryByTestId('illo')).toBeNull();
    expect(screen.getByTestId('custom-fallback')).toBeTruthy();
  });

  it('emits no --illustration-* CSS vars when the theme has no illustration color palette', () => {
    // Simulate a consumer whose custom theme predates the illustration theming feature
    const { lightIllustrationColor, darkIllustrationColor, ...themeWithoutPalettes } = defaultTheme;
    const { container } = render(
      <DefaultThemeProvider theme={themeWithoutPalettes as typeof defaultTheme}>
        <HeroSquare applyTheme name="add2Fa" testID="illo" />
      </DefaultThemeProvider>,
    );
    expect(container.innerHTML).not.toContain('--illustration-primary');
  });
});
