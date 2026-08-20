import React from 'react';

import { IconButton } from '../../buttons/IconButton';
import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { IconGlyphSourceProvider } from '../createIcon';
import { Icon } from '../Icon';

import { materialFontFamily, materialGlyphMap, withMaterialIconsFont } from './materialIcons';

const materialSource = {
  glyphMap: materialGlyphMap,
  fontFamily: materialFontFamily,
};

const overriddenNames = ['home', 'settings', 'search'] as const;

export default {
  title: 'Icons/IconGlyphSourceProvider',
  decorators: [withMaterialIconsFont],
};

export const CustomGlyphSource = () => (
  <VStack gap={5} padding={5}>
    <VStack gap={1}>
      <Text as="h3" font="title3">
        IconGlyphSourceProvider
      </Text>
      <Text as="p" color="fgMuted" font="body">
        The provider adds a glyph source to every icon rendered below it. Components that render an
        icon by name are unchanged and unaware of it — the `IconButton`s in both rows below are
        identical, and only the subtree wrapped in the provider picks up the custom glyphs.
      </Text>
    </VStack>

    <VStack gap={2}>
      <Text as="h4" font="headline">
        Inside the provider
      </Text>
      <IconGlyphSourceProvider source={materialSource}>
        <HStack alignItems="center" gap={2}>
          {overriddenNames.map((name) => (
            <IconButton key={name} accessibilityLabel={name} name={name} variant="secondary" />
          ))}
        </HStack>
      </IconGlyphSourceProvider>
    </VStack>

    <VStack gap={2}>
      <Text as="h4" font="headline">
        Outside the provider
      </Text>
      <HStack alignItems="center" gap={2}>
        {overriddenNames.map((name) => (
          <IconButton key={name} accessibilityLabel={name} name={name} variant="secondary" />
        ))}
      </HStack>
    </VStack>

    <VStack gap={2}>
      <Text as="h4" font="headline">
        Side by side
      </Text>
      <HStack alignItems="center" gap={4}>
        {overriddenNames.map((name) => (
          <VStack key={name} alignItems="center" gap={1}>
            <HStack alignItems="center" gap={2}>
              <IconGlyphSourceProvider source={materialSource}>
                <Icon color="fgPrimary" name={name} size="l" />
              </IconGlyphSourceProvider>
              <Icon color="fgPrimary" name={name} size="l" />
            </HStack>
            <Text as="span" color="fgMuted" font="legal">
              {name}
            </Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  </VStack>
);
