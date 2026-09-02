import fs from 'node:fs';
import path from 'node:path';
import prettier from 'prettier';

import { existsOrCreateDir } from './existsOrCreateDir';

function getPrettierParser(file: string): prettier.BuiltInParserName {
  switch (path.extname(file)) {
    case '.md':
      return 'markdown';
    case '.mdx':
      return 'mdx';
    case '.js':
      return 'babel';
    case '.json':
      return 'json';
    case '.css':
      return 'css';
    case '.html':
    case '.svg':
      return 'html';
    default:
      return 'typescript';
  }
}

/**
 * Mirrors `fs.promises.writeFile`, but formats the content with the repo's prettier config first,
 * picking the parser from the destination extension unless one is passed explicitly.
 */
export async function writePrettyFile(
  dest: string,
  contents: string,
  parser?: prettier.BuiltInParserName,
): Promise<void> {
  const prettierOptions = await prettier.resolveConfig(dest);
  const formatted = await prettier.format(contents, {
    ...prettierOptions,
    parser: parser ?? getPrettierParser(dest),
  });

  await existsOrCreateDir(dest);
  await fs.promises.writeFile(dest, formatted, 'utf-8');
}
