import fs from 'node:fs';
import path from 'node:path';

import type { ColorPalette, Illustration } from './illustration';

/** A manifest entry: an illustration minus the node id, which is the entry's key. */
export type ManifestItem = Omit<Illustration, 'nodeId'>;

/** The manifest persists the state of the last sync so the next one can be incremental. */
export type Manifest = {
  /** When the manifest was last written. Only components updated in Figma after this are re-fetched. */
  lastUpdated: string;
  /** The palette used to derive dark and themeable variants, recorded so palette changes show up in review. */
  colors: Record<string, { light: string; dark: string }>;
  /**
   * Every illustration currently published, keyed by Figma node id so that a rename or a version
   * bump diffs as a change to one stable entry. Written in type, then name order; JSON keeps that
   * order because node ids (`123:456`) are never integer-like keys.
   */
  items: Record<string, ManifestItem>;
};

const emptyManifest: Manifest = { lastUpdated: '', colors: {}, items: {} };

const byTypeThenName = (a: Illustration, b: Illustration) =>
  a.type.localeCompare(b.type) || a.name.localeCompare(b.name);

/** The manifest entries as the records the rest of the sync works with. */
export const manifestIllustrations = (manifest: Manifest): Illustration[] =>
  Object.entries(manifest.items).map(([nodeId, item]) => ({ nodeId, ...item }));

/** Reads the manifest, creating an empty one when the file does not exist yet. */
export function readManifest(manifestPath: string): Manifest {
  if (!fs.existsSync(manifestPath)) return emptyManifest;
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as Manifest;
}

/** Fixed field order so that unrelated edits never reorder an entry. */
const toItem = (illustration: Illustration): ManifestItem => ({
  type: illustration.type,
  name: illustration.name,
  hash: illustration.hash,
  width: illustration.width,
  height: illustration.height,
  description: illustration.description,
  createdAt: illustration.createdAt,
  lastUpdated: illustration.lastUpdated,
  version: illustration.version,
});

export function writeManifest(
  manifestPath: string,
  { illustrations, palette }: { illustrations: Illustration[]; palette: ColorPalette },
) {
  const manifest: Manifest = {
    lastUpdated: new Date().toISOString(),
    colors: Object.fromEntries(palette.map(({ name, light, dark }) => [name, { light, dark }])),
    items: Object.fromEntries(
      [...illustrations]
        .sort(byTypeThenName)
        .map((illustration) => [illustration.nodeId, toItem(illustration)]),
    ),
  };

  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}
