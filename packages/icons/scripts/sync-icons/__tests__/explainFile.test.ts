import { explainIconFile } from '../explainFile';

describe('explainIconFile', () => {
  it('names the icon of an SVG file, whatever its size and state', () => {
    expect(explainIconFile('packages/icons/src/svgs/add-24-active.svg')).toEqual({ item: 'add' });
    expect(explainIconFile('packages/icons/src/svgs/backArrow-12-inactive.svg')).toEqual({
      item: 'backArrow',
    });
  });

  it('says the manifest records, and the font, glyph map and names follow the changes', () => {
    expect(explainIconFile('packages/icons/manifest.json')).toEqual({ derived: 'records' });
    for (const file of [
      'packages/icons/src/glyphMap.ts',
      'packages/icons/src/IconName.ts',
      'packages/icons/src/names.ts',
      'packages/icons/src/descriptionMap.ts',
      'packages/icons/src/fonts/web/icon-font.css',
      'packages/icons/src/fonts/native/CoinbaseIcons.ttf',
      'apps/expo-app/src/__generated__/iconSvgMap.ts',
    ]) {
      expect(explainIconFile(file)).toEqual({ derived: 'changes' });
    }
  });

  it('says Code Connect files follow the Figma listing', () => {
    expect(explainIconFile('packages/web/src/icons/__figma__/icons.figma.batch.json')).toEqual({
      derived: 'listing',
    });
    expect(explainIconFile('packages/mobile/src/icons/__figma__/icons.figma.batch.ts')).toEqual({
      derived: 'listing',
    });
  });

  it('does not explain a file the sync does not write', () => {
    expect(explainIconFile('packages/icons/README.md')).toBeUndefined();
    expect(explainIconFile('packages/icons/src/svgs/readme.txt')).toBeUndefined();
  });
});
