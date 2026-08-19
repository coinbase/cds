import React from 'react';
import type { Decorator } from '@storybook/react';

import type { GlyphMap } from '../createIcon';

/**
 * Google Material Icons codepoints, used by the stories that demo a
 * non-CDS icon font. The names overlap with CDS icon names so the same set
 * works both as a standalone icon component and as an override of built-ins.
 */
const materialCodepoints = {
  home: 0xe88a,
  settings: 0xe8b8,
  search: 0xe8b6,
  favorite: 0xe87d,
  delete: 0xe872,
} as const;

export type MaterialIconName = keyof typeof materialCodepoints;

const sourceSizes = [12, 16, 24] as const;

export const materialGlyphMap = Object.fromEntries(
  (Object.keys(materialCodepoints) as MaterialIconName[]).flatMap((name) =>
    sourceSizes.flatMap((size) =>
      (['active', 'inactive'] as const).map((state) => [
        `${name}-${size}-${state}`,
        String.fromCodePoint(materialCodepoints[name]),
      ]),
    ),
  ),
) as GlyphMap<MaterialIconName>;

export const materialFontFamily = 'Material Icons';

export const materialNames = Object.keys(materialCodepoints) as MaterialIconName[];

export const withMaterialIconsFont: Decorator = (Story) => (
  <>
    {/* React 19 hoists this <link> into <head>. */}
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <Story />
  </>
);
