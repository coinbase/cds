import { colorToHex } from '@coinbase/cds-common/color/colorToHex';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

export const convertThemedSvgToHex = (
  xml: string,
  illustrationPalette: Partial<{ [key in ThemeVars.IllustrationColor]: string }>,
) => {
  const cssVarPattern = /var\(--illustration-([a-z0-9-]+)\)/gi;
  const normalizeToken = (token: string) => token.replace(/-/g, '');

  return xml.replace(cssVarPattern, (_, token: string) => {
    const color = illustrationPalette[normalizeToken(token) as ThemeVars.IllustrationColor];
    return color ? colorToHex(color) : `var(--illustration-${token})`;
  });
};
