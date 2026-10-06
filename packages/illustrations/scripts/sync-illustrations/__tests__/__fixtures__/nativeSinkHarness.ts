import type {
  GetLocalVariablesResponse,
  GetPublishedVariablesResponse,
} from '@figma/rest-api-spec';
import fs from 'node:fs';
import path from 'node:path';

import { buildColorPalette } from '../../source/fetchColorPalette';

import localFixture from './getLocalVariables.json';
import publishedFixture from './getPublishedVariables.json';

export const fixturePalette = buildColorPalette(
  localFixture as unknown as GetLocalVariablesResponse,
  publishedFixture as unknown as GetPublishedVariablesResponse,
  'illustration',
);

/** Every file under `dir` as `relative path -> content`, sorted by path. */
export function readTree(dir: string): Record<string, string> {
  if (!fs.existsSync(dir)) return {};
  return Object.fromEntries(
    fs
      .readdirSync(dir, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => path.join(entry.parentPath, entry.name))
      .sort()
      .map((file) => [path.relative(dir, file), fs.readFileSync(file, 'utf-8')]),
  );
}
