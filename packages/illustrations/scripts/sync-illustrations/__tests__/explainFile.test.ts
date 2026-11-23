import { explainIllustrationFile } from '../explainFile';

const generated = 'packages/illustrations/src/__generated__';

describe('explainIllustrationFile', () => {
  it('names the illustration and the type of an asset file, in every format and theme', () => {
    for (const file of [
      `${generated}/pictogram/svg/light/buy-3.svg`,
      `${generated}/pictogram/png/dark/buy-3.png`,
      `${generated}/pictogram/svgJs/cjs/themeable/buy-3.js`,
      `${generated}/pictogram/svgJs/esm/themeable/buy-3.js`,
    ]) {
      expect(explainIllustrationFile(file)).toEqual({ item: 'buy', group: 'pictogram' });
    }
  });

  it('says the manifest records, and the name lists and types follow the changes', () => {
    expect(explainIllustrationFile('packages/illustrations/manifest.json')).toEqual({
      derived: 'records',
    });
    expect(explainIllustrationFile(`${generated}/heroSquare/data/names.ts`)).toEqual({
      derived: 'changes',
    });
    expect(explainIllustrationFile(`${generated}/heroSquare/types/HeroSquareName.ts`)).toEqual({
      derived: 'changes',
    });
  });

  it('does not explain a file the sync does not write', () => {
    expect(explainIllustrationFile('packages/illustrations/README.md')).toBeUndefined();
    expect(explainIllustrationFile('packages/web/src/index.ts')).toBeUndefined();
  });
});
