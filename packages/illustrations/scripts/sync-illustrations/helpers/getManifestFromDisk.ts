import fs from 'node:fs';

import type { ManifestShape } from '../tools/Manifest';
import { writePrettyFile } from '../utils';

const FALLBACK_MANIFEST = { lastUpdated: '', items: [] };

export async function getManifestFromDisk<T extends ManifestShape>(
  manifestPath: string,
): Promise<T> {
  /** If manifest file doesn't exist, create it */
  const existed = fs.existsSync(manifestPath);
  if (!existed) {
    await writePrettyFile(manifestPath, JSON.stringify(FALLBACK_MANIFEST));
  }

  const manifestAsString = await fs.promises.readFile(manifestPath, 'utf-8');
  const parsedJson = JSON.parse(manifestAsString) as T;
  return {
    ...parsedJson,
    items: Object.entries(parsedJson.items).map(([id, item]) => [
      id,
      {
        ...item,
        id,
        // id is key in generated manifests, and is not duplicated in the object value.
        // toJSON ensures we write the old item exactly as it was before, which excludes the id
        // from being duplicated in the value object.
        toJSON() {
          return item;
        },
      },
    ]),
  };
}
