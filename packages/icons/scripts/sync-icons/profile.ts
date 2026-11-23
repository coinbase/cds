import type { SyncProfile } from './rules';

const SET_NAME = /^(ui|nav)\/([^/]+)$/;

// TO DO: Update this when "ui" and "nav" prefixes are removed from the Figma file
export const profile: SyncProfile = {
  target: 'icons',
  scriptName: 'icons:sync-icons',
  iconName: (figmaName) => {
    const match = SET_NAME.exec(figmaName.trim());
    return match
      ? { name: match[2].trim() }
      : {
          problem: `Icon set "${figmaName}" is not named "ui/<name>" or "nav/<name>". Rename the icon set in Figma.`,
        };
  },
  variants: { sizes: ['12', '16', '24'], sizeIsNumber: true },
  publishesDescriptions: true,
  bump: { breaking: 'major', otherwise: 'minor' },
  generated: {
    packageDir: 'packages/icons',
    paths: [
      'packages/icons/src',
      'packages/icons/manifest.json',
      'apps/expo-app/src/__generated__/iconSvgMap.ts',
      'packages/web/src/icons/__figma__',
      'packages/mobile/src/icons/__figma__',
    ],
    fromChanges: [
      'packages/icons/src/IconName.ts',
      'packages/icons/src/names.ts',
      'packages/icons/src/descriptionMap.ts',
      'packages/icons/src/glyphMap.ts',
      'packages/icons/src/fonts/',
      'apps/expo-app/src/__generated__/iconSvgMap.ts',
    ],
    fromListing: ['packages/web/src/icons/__figma__/', 'packages/mobile/src/icons/__figma__/'],
  },
};
