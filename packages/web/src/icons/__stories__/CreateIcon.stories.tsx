import React from 'react';
import type { Decorator } from '@storybook/react';

import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { createIcon, type GlyphMap } from '../createIcon';
import { Icon } from '../Icon';

/**
 * `createIcon` bound to a different font (Google Material Icons), showing a
 * consumer can supply their own glyph map, font, and name union while reusing
 * the CDS Icon renderer.
 */
const materialCodepoints = {
  home: 0xe88a,
  settings: 0xe8b8,
  search: 0xe8b6,
  favorite: 0xe87d,
  delete: 0xe872,
} as const;

type MaterialIconName = keyof typeof materialCodepoints;

const sourceSizes = [12, 16, 24] as const;

const materialGlyphMap = Object.fromEntries(
  (Object.keys(materialCodepoints) as MaterialIconName[]).flatMap((name) =>
    sourceSizes.flatMap((size) =>
      (['active', 'inactive'] as const).map((state) => [
        `${name}-${size}-${state}`,
        String.fromCodePoint(materialCodepoints[name]),
      ]),
    ),
  ),
) as GlyphMap<MaterialIconName>;

// A second, fully-typed icon component backed by a different font.
const MaterialIcon = createIcon<MaterialIconName>({
  glyphMap: materialGlyphMap,
  fontFamily: 'Material Icons',
});

const withMaterialIconsFont: Decorator = (Story) => (
  <>
    {/* React 19 hoists this <link> into <head>. */}
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <Story />
  </>
);

const materialNames = Object.keys(materialCodepoints) as MaterialIconName[];

export default {
  title: 'Icons/createIcon (custom font)',
  decorators: [withMaterialIconsFont],
};

export const CustomIconFont = () => (
  <VStack gap={5} padding={5}>
    <VStack gap={1}>
      <Text as="h3" font="title3">
        createIcon with a custom font
      </Text>
      <Text as="p" color="fgMuted" font="body">
        `MaterialIcon` is created via `createIcon` with the Material Icons glyph map and font. It
        reuses the CDS Icon renderer (sizing, color, accessibility) with a fully typed `name` prop.
      </Text>
    </VStack>

    <VStack gap={2}>
      <Text as="h4" font="headline">
        Sizes (xs / s / m / l)
      </Text>
      <HStack alignItems="center" gap={3}>
        {(['xs', 's', 'm', 'l'] as const).map((size) => (
          <MaterialIcon key={size} color="fgPrimary" name="home" size={size} />
        ))}
      </HStack>
    </VStack>

    <VStack gap={2}>
      <Text as="h4" font="headline">
        Demo icon set
      </Text>
      <HStack alignItems="flex-start" gap={4}>
        {materialNames.map((name) => (
          <VStack key={name} alignItems="center" gap={1}>
            <MaterialIcon color="fgPrimary" name={name} size="l" />
            <Text as="span" color="fgMuted" font="legal">
              {name}
            </Text>
          </VStack>
        ))}
      </HStack>
    </VStack>

    <VStack gap={2}>
      <Text as="h4" font="headline">
        Default CDS Icon (for comparison)
      </Text>
      <HStack alignItems="center" gap={3}>
        <Icon color="fgPrimary" name="home" size="l" />
        <Icon color="fgPrimary" name="settings" size="l" />
        <Icon color="fgPrimary" name="search" size="l" />
      </HStack>
    </VStack>
  </VStack>
);
