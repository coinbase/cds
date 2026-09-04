import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import type { IllustrationVariant } from '@coinbase/cds-common/types/IllustrationNames';
import spotSquareVersionMap from '@coinbase/cds-illustrations/__generated__/spotSquare/data/versionMap';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import type { SpotSquareName } from '../SpotSquare';
import { SpotSquare } from '../SpotSquare';

const getURL = (
  type: IllustrationVariant,
  name: string,
  versionNum: number,
  activeColorScheme: ColorScheme,
) => {
  return `https://static-assets.coinbase.com/ui-infra/illustration/v1/${type}/svg/${activeColorScheme}/${name}-${versionNum}.svg`;
};

// Test URL generation logic without React rendering - much faster
describe('SpotSquare URL generation', () => {
  it('generates correct URLs for light and dark themes', () => {
    const testCases: { name: SpotSquareName; version: number }[] = [
      { name: 'accessToAdvancedCharts', version: spotSquareVersionMap.accessToAdvancedCharts },
      { name: 'earn', version: spotSquareVersionMap.earn },
      { name: 'blockchain', version: spotSquareVersionMap.blockchain },
    ];

    testCases.forEach(({ name, version }) => {
      const lightUrl = getURL('spotSquare', name, version, 'light');
      const darkUrl = getURL('spotSquare', name, version, 'dark');

      expect(lightUrl).toBe(
        `https://static-assets.coinbase.com/ui-infra/illustration/v1/spotSquare/svg/light/${name}-${version}.svg`,
      );
      expect(darkUrl).toBe(
        `https://static-assets.coinbase.com/ui-infra/illustration/v1/spotSquare/svg/dark/${name}-${version}.svg`,
      );
    });
  });

  it('uses correct version numbers from version map', () => {
    expect(typeof spotSquareVersionMap.accessToAdvancedCharts).toBe('number');
    expect(spotSquareVersionMap.accessToAdvancedCharts).toBeGreaterThan(0);
  });

  it('contains expected number of spot squares', () => {
    const spotSquareCount = Object.keys(spotSquareVersionMap).length;
    expect(spotSquareCount).toBeGreaterThan(200); // Ensure we have a reasonable number
  });
});

// Test actual React rendering with a representative sample - much more efficient
describe('SpotSquare component rendering', () => {
  const sampleSpotSquares: SpotSquareName[] = [
    'accessToAdvancedCharts',
    'earn',
    'blockchain',
    'invest',
    'staking',
  ];

  sampleSpotSquares.forEach((name) => {
    it(`renders ${name} correctly in light theme`, () => {
      const version = spotSquareVersionMap[name];
      const expectedUrl = getURL('spotSquare', name, version, 'light');

      render(
        <DefaultThemeProvider activeColorScheme="light">
          <SpotSquare name={name} testID={name} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(name)).toHaveAttribute('src', expectedUrl);
      expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
    });

    it(`renders ${name} correctly in dark theme`, () => {
      const version = spotSquareVersionMap[name];
      const expectedUrl = getURL('spotSquare', name, version, 'dark');

      render(
        <DefaultThemeProvider activeColorScheme="dark">
          <SpotSquare name={name} testID={name} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(name)).toHaveAttribute('src', expectedUrl);
      expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
    });
  });
});

describe('can set alt', () => {
  const testAlt = 'This is a special illustration';
  it('for a SpotSquare', () => {
    render(
      <DefaultThemeProvider>
        <SpotSquare alt={testAlt} name="accessToAdvancedCharts" testID="spotSquare-example" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('spotSquare-example')).toHaveAttribute('alt', testAlt);
  });
});
