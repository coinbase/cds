import heroSquareNames from '@coinbase/cds-illustrations/__generated__/heroSquare/data/names';
import pictogramNames from '@coinbase/cds-illustrations/__generated__/pictogram/data/names';
import spotIconNames from '@coinbase/cds-illustrations/__generated__/spotIcon/data/names';
import spotRectangleNames from '@coinbase/cds-illustrations/__generated__/spotRectangle/data/names';
import spotSquareNames from '@coinbase/cds-illustrations/__generated__/spotSquare/data/names';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

/**
 * Generates one stories file per illustration type from the names the illustrations package
 * publishes. Run after syncing illustrations (`yarn sync-illustrations` does so) or directly with
 * `yarn nx run web:generate-illustration-stories`.
 */

const storiesDir = fileURLToPath(new URL('../src/illustrations/__stories__', import.meta.url));

/** A single sheet is too large for Percy, so each type is split into chunks of this many. */
const chunkSize = 240;

type IllustrationType = 'heroSquare' | 'pictogram' | 'spotIcon' | 'spotRectangle' | 'spotSquare';

const illustrationTypes: {
  type: IllustrationType;
  names: readonly string[];
  /** Scales the example illustration up so that small types are legible in the story. */
  scaleMultiplier: number;
}[] = [
  { type: 'heroSquare', names: heroSquareNames, scaleMultiplier: 1 },
  { type: 'pictogram', names: pictogramNames, scaleMultiplier: 2 },
  { type: 'spotIcon', names: spotIconNames, scaleMultiplier: 3 },
  { type: 'spotRectangle', names: spotRectangleNames, scaleMultiplier: 1 },
  { type: 'spotSquare', names: spotSquareNames, scaleMultiplier: 1 },
];

const pascalCase = (type: string) => `${type.charAt(0).toUpperCase()}${type.slice(1)}`;

function renderStories(type: IllustrationType, names: readonly string[], scaleMultiplier: number) {
  const component = pascalCase(type);
  const chunks = Math.ceil(names.length / chunkSize);

  const sheets = Array.from({ length: chunks }, (_, index) => {
    const startIndex = index * chunkSize;
    return `export const ${type}Sheet${index + 1} = getIllustrationSheet({
  type: '${type}',
  startIndex: ${startIndex},
  endIndex: ${startIndex + chunkSize},
});
`;
  }).join('');

  return `/**
 * DO NOT MODIFY
 * Generated from yarn nx run web:generate-illustration-stories
 */

import { ${component} } from '../${component}';

import { getIllustrationSheet } from './getIllustrationSheet';
import { IllustrationExample } from './IllustrationExample';

export default {
  title: 'Illustrations',
  component: ${component},
};

export const ${type} = () => (
  <IllustrationExample>
    <${component} name="${names[0]}" scaleMultiplier={${scaleMultiplier}} />
  </IllustrationExample>
);

// single sheet is too large for Percy, need to split up in chunks of ${chunkSize} to stay under resource limit
${sheets}`;
}

async function writeFormatted(filePath: string, source: string) {
  const options = await prettier.resolveConfig(filePath);
  const formatted = await prettier.format(source, { ...options, filepath: filePath });
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, formatted);
}

async function generateIllustrationStories() {
  console.log('Generating illustration stories...');
  for (const { type, names, scaleMultiplier } of illustrationTypes) {
    if (names.length === 0) throw new Error(`No ${type} illustrations found`);
    await writeFormatted(
      path.join(storiesDir, `${pascalCase(type)}.stories.tsx`),
      renderStories(type, names, scaleMultiplier),
    );
  }
  console.log('Illustration stories generated.');
}

generateIllustrationStories().catch((error) => {
  console.error(error);
  process.exit(1);
});
