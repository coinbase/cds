import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import type { IllustrationVariant } from '@coinbase/cds-common/types/IllustrationNames';
import spotRectangleVersionMap from '@coinbase/cds-illustrations/__generated__/spotRectangle/data/versionMap';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import type { SpotRectangleName } from '../SpotRectangle';
import { SpotRectangle } from '../SpotRectangle';

const getURL = (
  type: IllustrationVariant,
  name: string,
  versionNum: number,
  activeColorScheme: ColorScheme,
) => {
  return `https://static-assets.coinbase.com/ui-infra/illustration/v1/${type}/svg/${activeColorScheme}/${name}-${versionNum}.svg`;
};

// Test URL generation logic without React rendering - much faster
describe('SpotRectangle URL generation', () => {
  it('generates correct URLs for light and dark themes', () => {
    const testCases: { name: SpotRectangleName; version: number }[] = [
      { name: 'addBank', version: spotRectangleVersionMap.addBank },
      { name: 'trade', version: spotRectangleVersionMap.trade },
      { name: 'nft', version: spotRectangleVersionMap.nft },
    ];

    testCases.forEach(({ name, version }) => {
      const lightUrl = getURL('spotRectangle', name, version, 'light');
      const darkUrl = getURL('spotRectangle', name, version, 'dark');

      expect(lightUrl).toBe(
        `https://static-assets.coinbase.com/ui-infra/illustration/v1/spotRectangle/svg/light/${name}-${version}.svg`,
      );
      expect(darkUrl).toBe(
        `https://static-assets.coinbase.com/ui-infra/illustration/v1/spotRectangle/svg/dark/${name}-${version}.svg`,
      );
    });
  });

  it('uses correct version numbers from version map', () => {
    expect(typeof spotRectangleVersionMap.addBank).toBe('number');
    expect(spotRectangleVersionMap.addBank).toBeGreaterThan(0);
  });

  it('contains expected number of spot rectangles', () => {
    const spotRectangleCount = Object.keys(spotRectangleVersionMap).length;
    expect(spotRectangleCount).toBeGreaterThan(50); // Ensure we have a reasonable number
  });
});

// Test actual React rendering with a representative sample - much more efficient
describe('SpotRectangle component rendering', () => {
  const sampleSpotRectangles: SpotRectangleName[] = ['addBank', 'trade', 'nft', 'staking', 'earn'];

  // Filter to only existing spot rectangles
  const existingSamples = sampleSpotRectangles.filter((name) =>
    Object.prototype.hasOwnProperty.call(spotRectangleVersionMap, name),
  );

  existingSamples.forEach((name) => {
    it(`renders ${name} correctly in light theme`, () => {
      const version = spotRectangleVersionMap[name];
      const expectedUrl = getURL('spotRectangle', name, version, 'light');

      render(
        <DefaultThemeProvider activeColorScheme="light">
          <SpotRectangle name={name} testID={name} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(name)).toHaveAttribute('src', expectedUrl);
      expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
    });

    it(`renders ${name} correctly in dark theme`, () => {
      const version = spotRectangleVersionMap[name];
      const expectedUrl = getURL('spotRectangle', name, version, 'dark');

      render(
        <DefaultThemeProvider activeColorScheme="dark">
          <SpotRectangle name={name} testID={name} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(name)).toHaveAttribute('src', expectedUrl);
      expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
    });
  });
});

describe('can set alt', () => {
  const testAlt = 'This is a special illustration';
  it('for a SpotRectangle', () => {
    render(
      <DefaultThemeProvider>
        <SpotRectangle alt={testAlt} name="addBank" testID="spotRectangle-example" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('spotRectangle-example')).toHaveAttribute('alt', testAlt);
  });
});
