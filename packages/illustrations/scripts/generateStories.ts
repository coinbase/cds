import chalk from 'chalk';

import heroSquareNames from '../src/__generated__/heroSquare/data/names';
import pictogramNames from '../src/__generated__/pictogram/data/names';
import spotIconNames from '../src/__generated__/spotIcon/data/names';
import spotRectangleNames from '../src/__generated__/spotRectangle/data/names';
import spotSquareNames from '../src/__generated__/spotSquare/data/names';
import type {
  HeroSquareName,
  PictogramName,
  SpotIconName,
  SpotRectangleName,
  SpotSquareName,
} from '../src/index';

import { writePrettyFile } from './writeStories';

const HEROSQUARE_CHUNK_SIZE = 240;
const PICTOGRAM_CHUNK_SIZE = 240;
const SPOTICON_CHUNK_SIZE = 240;
const SPOTRECTANGLE_CHUNK_SIZE = 240;
const SPOTSQUARE_CHUNK_SIZE = 240;
const STORIES_DIR = 'packages/web/src/illustrations/__stories__';

const rootPath = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
const storiesPath = `${rootPath}/${STORIES_DIR}`;

type IllustrationType = 'heroSquare' | 'pictogram' | 'spotIcon' | 'spotRectangle' | 'spotSquare';
type IllustrationNamesMap = {
  heroSquare: HeroSquareName;
  pictogram: PictogramName;
  spotIcon: SpotIconName;
  spotRectangle: SpotRectangleName;
  spotSquare: SpotSquareName;
};

const generateStory = async <T extends IllustrationType>(
  type: T,
  illustrationsList: IllustrationNamesMap[T][],
  chunkSize: number,
  scaleMultiplier = 1,
) => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  const numberOfChunks = Math.ceil(illustrationsList.length / chunkSize);

  let sheets = '';

  for (let i = 0; i < numberOfChunks; i += 1) {
    const start = i * chunkSize;
    const end = start + chunkSize;

    sheets += `export const ${type}Sheet${i + 1} = getIllustrationSheet({
  type: '${type}',
  startIndex: ${start},
  endIndex: ${end},
});\n`;
  }

  await writePrettyFile(
    `${storiesPath}/${capitalizedType}.stories.tsx`,
    `
/**
 * DO NOT MODIFY
 * Generated from yarn nx run illustrations:generate-stories
 */

import { ${capitalizedType} } from '../${capitalizedType}';

import { getIllustrationSheet } from './getIllustrationSheet';
import { IllustrationExample } from './IllustrationExample';

export default {
  title: 'Illustrations',
  component: ${capitalizedType},
};

export const ${type} = () => (
  <IllustrationExample>
    <${capitalizedType} name="${illustrationsList[0]}" scaleMultiplier={${scaleMultiplier}} />
  </IllustrationExample>
);

// single sheet is too large for Percy, need to split up in chunks of ${chunkSize} to stay under resource limit
${sheets}
    `.trimStart(),
  );
};

const generateStories = async () => {
  try {
    console.info(chalk.blue('Generating illustration stories...'));

    await generateStory('heroSquare', heroSquareNames, HEROSQUARE_CHUNK_SIZE);
    await generateStory('pictogram', pictogramNames, PICTOGRAM_CHUNK_SIZE, 2);
    await generateStory('spotIcon', spotIconNames, SPOTICON_CHUNK_SIZE, 3);
    await generateStory('spotRectangle', spotRectangleNames, SPOTRECTANGLE_CHUNK_SIZE);
    await generateStory('spotSquare', spotSquareNames, SPOTSQUARE_CHUNK_SIZE);

    console.info(chalk.green('Illustration stories generated successfully!'));
  } catch (err) {
    throw new Error(`Error generating illustration stories: ${err}`);
  }
};

void generateStories();
