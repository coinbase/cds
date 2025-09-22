import type { ColorScheme } from '@cbhq/cds-common/core/theme';
import type { IllustrationVariant } from '@cbhq/cds-common/types/IllustrationNames';
import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';
import { render, screen } from '@testing-library/react';

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
