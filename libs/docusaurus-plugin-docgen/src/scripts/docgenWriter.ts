import ejs from 'ejs';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import fs from 'node:fs';
import path from 'node:path';

import type { WriteFileConfig } from '../types';

type WriteFileParams<T> = {
  dest: string;
  data: T;
};

const writeConfig = { encoding: 'utf8', flag: 'w' } as const;

const helpers = {
  camelCase,
  kebabCase,
  pascalCase: (str: string) => startCase(str).split(' ').join(''),
  startCase,
};

export async function writeFile<T>({ dest, data }: WriteFileParams<T>) {
  const content = typeof data === 'string' ? data : JSON.stringify(data);
  const dirForFile = path.dirname(dest);
  await fs.promises.mkdir(dirForFile, { recursive: true });
  return fs.promises.writeFile(dest, content, writeConfig);
}

const templatesDir = path.join(__dirname, '../templates');

/**
 * Writes the content passed from docgenRunner to disk based on plugin config.
 */
export async function docgenWriter(files: WriteFileConfig[]) {
  return Promise.all(
    files.map(async (item) => {
      const contents = await ejs.renderFile(path.join(templatesDir, `${item.template}.ejs.t`), {
        data: item.data,
        h: helpers,
      });
      return writeFile({
        dest: item.dest,
        data: contents,
      });
    }),
  );
}
