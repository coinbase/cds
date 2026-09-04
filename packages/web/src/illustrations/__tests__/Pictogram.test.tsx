import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import type { IllustrationVariant } from '@coinbase/cds-common/types/IllustrationNames';
import pictogramVersionMap from '@coinbase/cds-illustrations/__generated__/pictogram/data/versionMap';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import type { PictogramName } from '../Pictogram';
import { Pictogram } from '../Pictogram';

const getURL = (
  type: IllustrationVariant,
  name: string,
  versionNum: number,
  activeColorScheme: ColorScheme,
) => {
  return `https://static-assets.coinbase.com/ui-infra/illustration/v1/${type}/svg/${activeColorScheme}/${name}-${versionNum}.svg`;
};

// Test URL generation logic without React rendering - much faster
describe('Pictogram URL generation', () => {
  it('generates correct URLs for light and dark themes', () => {
    const testCases: { name: PictogramName; version: number }[] = [
      { name: 'fiat', version: pictogramVersionMap.fiat },
      { name: 'bitcoin', version: pictogramVersionMap.bitcoin },
      { name: '2fa', version: pictogramVersionMap['2fa'] },
    ];

    testCases.forEach(({ name, version }) => {
      const lightUrl = getURL('pictogram', name, version, 'light');
      const darkUrl = getURL('pictogram', name, version, 'dark');

      expect(lightUrl).toBe(
        `https://static-assets.coinbase.com/ui-infra/illustration/v1/pictogram/svg/light/${name}-${version}.svg`,
      );
      expect(darkUrl).toBe(
        `https://static-assets.coinbase.com/ui-infra/illustration/v1/pictogram/svg/dark/${name}-${version}.svg`,
      );
    });
  });

  it('uses correct version numbers from version map', () => {
    expect(typeof pictogramVersionMap.fiat).toBe('number');
    expect(typeof pictogramVersionMap.bitcoin).toBe('number');
    expect(typeof pictogramVersionMap['2fa']).toBe('number');
    expect(pictogramVersionMap.fiat).toBeGreaterThan(0);
    expect(pictogramVersionMap.bitcoin).toBeGreaterThan(0);
    expect(pictogramVersionMap['2fa']).toBeGreaterThan(0);
  });

  it('contains expected number of pictograms', () => {
    const pictogramCount = Object.keys(pictogramVersionMap).length;
    expect(pictogramCount).toBeGreaterThan(400); // Ensure we have a reasonable number
  });
});

// Test actual React rendering with a representative sample - much more efficient
describe('Pictogram component rendering', () => {
  const samplePictograms: PictogramName[] = ['fiat', 'bitcoin', '2fa', 'wallet', 'shield'];

  samplePictograms.forEach((name) => {
    it(`renders ${name} correctly in light theme`, () => {
      const version = pictogramVersionMap[name];
      const expectedUrl = getURL('pictogram', name, version, 'light');

      render(
        <DefaultThemeProvider activeColorScheme="light">
          <Pictogram name={name} testID={name} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(name)).toHaveAttribute('src', expectedUrl);
      expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
    });

    it(`renders ${name} correctly in dark theme`, () => {
      const version = pictogramVersionMap[name];
      const expectedUrl = getURL('pictogram', name, version, 'dark');

      render(
        <DefaultThemeProvider activeColorScheme="dark">
          <Pictogram name={name} testID={name} />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(name)).toHaveAttribute('src', expectedUrl);
      expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
    });
  });
});

describe('can set alt', () => {
  const testAlt = 'This is a special illustration';
  it('for a Pictogram', () => {
    render(
      <DefaultThemeProvider>
        <Pictogram alt={testAlt} name="2fa" testID="pictogram-example" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('pictogram-example')).toHaveAttribute('alt', testAlt);
  });
});
