import { explainIconFile } from '../explainFile';
import { profile } from '../profile';

const { packageDir, fromChanges, fromListing } = profile.generated;

describe('explainIconFile', () => {
  it('names the icon of an SVG file, for every size the profile lists', () => {
    for (const size of profile.variants.sizes) {
      expect(explainIconFile(`${packageDir}/src/svgs/add-${size}-active.svg`)).toEqual({
        item: 'add',
      });
    }
    expect(
      explainIconFile(
        `${packageDir}/src/svgs/add-circle-${profile.variants.sizes[0]}-inactive.svg`,
      ),
    ).toEqual({
      item: 'add-circle',
    });
  });

  it('says the manifest records', () => {
    expect(explainIconFile(`${packageDir}/manifest.json`)).toEqual({ derived: 'records' });
  });

  it('says the files made from all icons follow the changes', () => {
    for (const file of fromChanges) {
      expect(explainIconFile(file.endsWith('/') ? `${file}icon-font.css` : file)).toEqual({
        derived: 'changes',
      });
    }
  });

  it('says Code Connect files follow the Figma listing', () => {
    for (const folder of fromListing) {
      expect(explainIconFile(`${folder}icons.figma.batch.json`)).toEqual({ derived: 'listing' });
    }
  });

  it('does not explain a file the sync does not write', () => {
    expect(explainIconFile(`${packageDir}/README.md`)).toBeUndefined();
    expect(explainIconFile(`${packageDir}/src/svgs/readme.txt`)).toBeUndefined();
  });
});
