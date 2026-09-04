import fs from 'node:fs';
import path from 'node:path';
import prettier from 'prettier';

export type PrettierParser = prettier.Options['parser'];

async function prettify(contents: string, parser: PrettierParser) {
  const prettierOptions = await prettier.resolveConfig('../../prettier.config.js');
  return prettier.format(contents, {
    ...prettierOptions,
    parser,
  });
}

export async function writePrettyFile(dest: string, contents: string) {
  const formattedContent = await prettify(contents, 'typescript'); // Always use typescript parser
  await fs.promises.mkdir(path.dirname(dest), { recursive: true }); // Simplified directory creation
  return fs.promises.writeFile(dest, formattedContent, 'utf-8');
}
