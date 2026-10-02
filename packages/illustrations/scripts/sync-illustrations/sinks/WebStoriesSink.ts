import path from 'node:path';

import { groupByType, type Illustration } from '../illustration';
import { pascalCase } from '../artifacts/typescriptData';
import { writeFile } from './files';
import { Sink, type SinkChanges, type SinkOptions } from './Sink';

type WebStoriesSinkOptions = SinkOptions & {
  /** `packages/web/src/illustrations/__stories__`, or a scratch directory. */
  dir: string;
};

/** A single sheet is too large for Percy, so each type is split into chunks of this many. */
const chunkSize = 240;

/** Scales the example illustration up so that small types are legible in the story. */
const scaleMultipliers: Record<string, number> = { pictogram: 2, spotIcon: 3 };

/**
 * Web's docsite stories, one `<Type>.stories.tsx` per illustration type: an example and the
 * percy sheets. They depend only on the set of names, so the sink has nothing per illustration
 * to restore and rewrites every type's file from the full set on each run that found work.
 */
export class WebStoriesSink extends Sink {
  private readonly dir: string;

  constructor({ dir, ...options }: WebStoriesSinkOptions) {
    super(options);
    this.dir = dir;
  }

  async has(_illustration: Illustration) {
    return true;
  }

  async apply({ illustrations }: SinkChanges) {
    await Promise.all(
      [...groupByType(illustrations)].map(([type, ofType]) =>
        writeFile(
          path.join(this.dir, `${pascalCase(type)}.stories.tsx`),
          renderStories(type, ofType),
        ),
      ),
    );
  }
}

/** Mirrors the sort of `names.ts`, whose first entry is the example illustration. */
const sortedNames = (illustrations: Illustration[]) => illustrations.map(({ name }) => name).sort();

export function renderStories(type: string, illustrations: Illustration[]) {
  const component = pascalCase(type);
  const names = sortedNames(illustrations);
  const scaleMultiplier = scaleMultipliers[type] ?? 1;

  const sheets = Array.from({ length: Math.ceil(names.length / chunkSize) }, (_, index) => {
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
 * Generated from yarn nx run illustrations:sync-illustrations
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
