import fs from 'node:fs';
import path from 'node:path';

/** One output SVG of an icon set: a size and an active state. */
export type ManifestSvg = {
  active: boolean;
  size: number;
  /** The name of the output SVG file, without the file extension. */
  name: string;
  /** The last used unicode value of this SVG file in the icon font. */
  unicode: number | undefined;
};

/** Information about the icon set and its icon assets. */
export type ManifestIconSet = {
  /** The Figma node id of the icon set. */
  nodeId: string;
  /** The name of the icon set. */
  name: string;
  /** The description of the icon set. */
  description: string;
  /** The last hash of the icon set's asset contents. */
  assetsHash: string;
  /** The last hash of the icon set's asset names. */
  nameHash: string;
  /** The date the icon set was created. */
  createdAt: string;
  /** The date the icon set was last updated. */
  lastUpdated: string;
  /** The output SVGs for the icon set. */
  svgs: ManifestSvg[];
};

/** The manifest persists the data from the last icon sync. */
export type Manifest = {
  /** The last time the manifest was updated. */
  lastUpdated: string;
  /** The last unicode value used in the icon font. */
  lastUnicode: number;
  /** The icon sets from the last sync. */
  iconSets: ManifestIconSet[];
};

// The start and end unicode values that we allow for the icon font.
// These values fall within the Basic Multilingual Plane (BMP) of the unicode Private Use Area (PUA).
// However we don't start at the first BMP unicode because we want to avoid fallbacks to iOS emojis.
export const firstAllowedUnicode = 0xf0000; // U+F0000
export const lastAllowedUnicode = 0xffffd; // U+FFFFD

export const emptyManifest: Manifest = {
  lastUpdated: '',
  lastUnicode: firstAllowedUnicode,
  iconSets: [],
};

export const svgFilePath = (svgDirectory: string, svgName: string) =>
  path.join(svgDirectory, `${svgName}.svg`);

/** Reads the manifest, writing an empty one first when the package has none yet. */
export const readManifest = (manifestPath: string): Manifest => {
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  if (!fs.existsSync(manifestPath)) fs.writeFileSync(manifestPath, JSON.stringify(emptyManifest));
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as Manifest;
};

export const writeManifest = (manifestPath: string, manifest: Manifest) =>
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

/**
 * Checks that every SVG output file in the manifest exists. This is a sanity check that the
 * manifest is not out of sync with the SVG output files.
 */
export const assertSvgFilesExist = (manifest: Manifest, svgDirectory: string) => {
  for (const iconSet of manifest.iconSets) {
    for (const svg of iconSet.svgs) {
      const svgPath = svgFilePath(svgDirectory, svg.name);
      if (!fs.existsSync(svgPath)) throw Error(`Manifest SVG file not found: "${svgPath}"`);
    }
  }
};
