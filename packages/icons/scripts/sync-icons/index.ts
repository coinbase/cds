import { downloadSvgImage } from '@cds/figma-api';
import { execSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { optimize as svgoOptimize, type Output as SvgoOutput } from 'svgo';
import { webfont } from 'webfont';

import { syncIconCodeConnect } from '../sync-icon-code-connect/index';

import { config } from './config';
import { fetchIconLibrary } from './fetchIconLibrary';
import { generateChangelog } from './generateChangelog';
import { getDescriptionMap } from './getDescriptionMap';
import { commitAndPushChanges, ensureCleanBranch, todaysDate } from './git';
import { sortByCreatedAt } from './sortByCreatedAt';
import { stringToObject } from './stringToObject';
import { svgoConfig } from './svgoConfig';

const args = process.argv.slice(2);
const syncAll = args.includes('--sync-all');
const doSyncAll = config.syncAll || syncAll;

let commitMessage = `feat: Publish icons ${todaysDate}`;

// The start and end unicode values that we allow for the icon font.
// These values fall within the Basic Multilingual Plane (BMP) of the unicode Private Use Area (PUA).
// However we don't start at the first BMP unicode because we want to avoid fallbacks to iOS emojis.
const firstAllowedUnicode = 0xf0000; // U+F0000
const lastAllowedUnicode = 0xffffd; // U+FFFFD

// TO DO: Update this when "ui" and "nav" prefixes are removed from the Figma file
type FigmaIconNodeName = `${'ui' | 'nav'}/${string}`;

/** Props that are required for all icons in each Figma icon set. */
type FigmaIconProps = {
  /** The size of the icon. */
  size?: number;
  /** The icon's active (filled) state. */
  active?: boolean;
};

/** Data about the Figma icon set and downloaded SVGs. */
type TempIcon = {
  /** The Figma node id of the icon asset. */
  nodeId: string;
  /** The name of the icon asset. */
  name: string;
  /** The absolute path to the icon asset. */
  path: string;
  /** The size of the icon. */
  size: number;
  /** The icon's active (filled) state. */
  active: boolean;
  /** The icon asset SVG, optimized with svgo. */
  svg: SvgoOutput;
};

/** The return type of the webfont function. */
type WebfontReturnValue = Awaited<ReturnType<typeof webfont>>;

/** The glyph data type of the webfont function. */
type WebfontGlyphData = NonNullable<WebfontReturnValue['glyphsData']>[number];

/** The glyph metadata type of the webfont function. */
type WebfontGlyphMetadata = NonNullable<WebfontGlyphData['metadata']>;

/** Corrects the webfont glyph metadata type. */
type CorrectedWebfontGlyphMetadata = WebfontGlyphMetadata & {
  path: string;
  renamed: boolean;
};

/** Adds our custom metadata fields to the webfont glyph metadata. */
type CustomGlyphMetadata = {
  createdAt: string;
};

/** Corrects the webfont glyphsData metadata type and adds our CustomGlyphMetadata. */
type CorrectedWebfontGlyphData = WebfontGlyphData & {
  metadata: CorrectedWebfontGlyphMetadata & CustomGlyphMetadata;
};

/** Corrects the webfont glyphsData type and adds our WebfontCustomGlyphMetadata. */
type WebfontResult = Omit<WebfontReturnValue, 'glyphsData'> & {
  glyphsData: CorrectedWebfontGlyphData[];
};

/** Results from the sync process used to generate logs and changelogs. */
export type IconSyncResults = {
  newIconSets: ManifestIconSet[];
  deletedIconSets: ManifestIconSet[];
  renamedIconSets: (ManifestIconSet & { oldName: string })[];
  updatedIconSets: ManifestIconSet[];
};

/** Information about the icon set and its icon assets. */
type ManifestIconSet = {
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
  svgs: {
    active: boolean;
    size: number;
    /** The name of the output SVG file, without the file extension. */
    name: string;
    /** The last used unicode value of this SVG file in the icon font. */
    unicode: number | undefined;
  }[];
};

/** The manifest persists the data from the last icon sync. */
type Manifest = {
  /** The last time the manifest was updated. */
  lastUpdated: string;
  /** The last unicode value used in the icon font. */
  lastUnicode: number;
  /** The icon sets from the last sync. */
  iconSets: ManifestIconSet[];
};

const emptyManifest: Manifest = { lastUpdated: '', lastUnicode: firstAllowedUnicode, iconSets: [] };

const main = async () => {
  console.log('Starting icon sync...');

  console.log('Validating config settings...');

  if (!fs.existsSync(config.outputSvgPath)) fs.mkdirSync(config.outputSvgPath, { recursive: true });
  if (!fs.existsSync(config.outputDataPath))
    fs.mkdirSync(config.outputDataPath, { recursive: true });

  if (!fs.existsSync(path.dirname(config.changelogPath)))
    fs.mkdirSync(path.dirname(config.changelogPath), { recursive: true });
  if (!fs.existsSync(config.changelogPath))
    fs.writeFileSync(config.changelogPath, '<!-- template-start -->');

  if (!fs.existsSync(path.dirname(config.manifestPath)))
    fs.mkdirSync(path.dirname(config.manifestPath), { recursive: true });

  if (!fs.existsSync(config.manifestPath))
    fs.writeFileSync(config.manifestPath, JSON.stringify(emptyManifest));

  console.log('Preparing target repo branch...');
  const { branchName: newBranchName, defaultBranch } = ensureCleanBranch(config.repoRoot);

  process.on('exit', (code) => {
    if (code === 0) return;
    // Clean up the working branch if the icons sync fails
    console.log('Icons sync failed, deleting working branch...');
    execSync(`git checkout ${defaultBranch} && git branch -D ${newBranchName}`, {
      cwd: config.repoRoot,
    });
  });

  console.log('Loading manifest and changelog files...');
  const oldManifest = JSON.parse(fs.readFileSync(config.manifestPath, 'utf-8')) as Manifest;
  const changelog = fs.readFileSync(config.changelogPath, 'utf-8');

  console.log('Confirming that manifest svg output files exist...');
  // Check that all the svg output files in the manifest exist
  // This is a sanity check to ensure that the manifest is not out of sync with the svg output files
  for (const oldIconSet of oldManifest.iconSets) {
    for (const oldSvg of oldIconSet.svgs) {
      const oldSvgPath = path.join(config.outputSvgPath, oldSvg.name + '.svg');
      if (!fs.existsSync(oldSvgPath)) throw Error(`Manifest SVG file not found: "${oldSvgPath}"`);
    }
  }

  console.log('Fetching file data from Figma...');
  const syncedLibrary = await fetchIconLibrary({
    fileId: config.figmaFileId,
    lastUpdated: doSyncAll ? undefined : oldManifest.lastUpdated,
  });

  const numberOfNodes = Object.values(syncedLibrary.nodes).length;

  if (numberOfNodes === 0) {
    if (doSyncAll) throw Error('No icon sets found in Figma');
    console.log('Figma file has no updates, skipping icon sync...');
    commitMessage = 'chore: Sync icon Code Connect entries';
    await syncIconCodeConnect(config.repoRoot);
    return;
  }

  // Used for logging and changelog generation
  const syncResults: IconSyncResults = {
    newIconSets: [],
    deletedIconSets: [],
    renamedIconSets: [],
    updatedIconSets: [],
  };

  /**
   * Create a new manifest to keep track of changes.
   * First we will update the manifest and local SVG files based on the changes in Figma.
   * Then we will generate the icon font and update the manifest unicode data.
   * We wait to write the manifest to disk until the font generation is complete.
   */
  const newManifest: Manifest = JSON.parse(JSON.stringify(oldManifest));

  console.log(`\nProcessing ${numberOfNodes} updated icon sets from Figma...`);
  /**
   * The iconSetNode is the Figma parent node that contains the set of icon components.
   * The icon set's unique name and id come from this parent node.
   * The children of this iconSetNode are the individual icon component assets at different sizes and active states.
   */
  let downloadProgress = 0;
  for (const iconSetNode of Object.values(syncedLibrary.nodes)) {
    downloadProgress++;
    if (iconSetNode?.document?.type !== 'COMPONENT_SET') continue;
    console.log(
      ` (${downloadProgress}/${numberOfNodes}) Icon set node: "${iconSetNode.document.id}" "${iconSetNode.document.name}"`,
    );
    const iconName = (iconSetNode.document.name as FigmaIconNodeName).split('/')[1].trim();
    const nodeId = iconSetNode.document.id;
    const { description, updated_at: lastUpdated, created_at: createdAt } = iconSetNode.metadata;

    // The icon set data from the last sync, if it exists
    const oldIconSet = oldManifest.iconSets.find((iconSet) => iconSet.nodeId === nodeId);

    // Check for duplicate icon sets
    const lowercaseIconName = iconName.toLowerCase();
    const duplicateIconSet = oldManifest.iconSets.find(
      (iconSet) => iconSet.name.toLowerCase() === lowercaseIconName && iconSet.nodeId !== nodeId,
    );

    if (duplicateIconSet) {
      console.log(`  [DUPLICATE] Icon set is a duplicate, skipping...`);
      continue;
    }

    // Temporary icons data for this icon set, used to process updates
    const tempIcons: TempIcon[] = [];

    // Process each svg icon asset in the icon set
    for (const iconNode of iconSetNode.document.children) {
      if (iconNode.type !== 'COMPONENT') continue;
      console.log(`  Downloading svg asset: "${iconNode.name}" "${iconNode.id}"`);
      // The name of the icon asset node in Figma contains the props of the icon asset
      const { size, active } = stringToObject(iconNode.name) as FigmaIconProps;
      // Enforce that all icon assets have valid "size" and "active" props
      if (size === undefined) throw Error(`Icon "${iconName}" is missing a "size" prop`);
      if (typeof size !== 'number') throw Error(`Icon "${iconName}" has an invalid "size" prop`);
      if (active === undefined) throw Error(`Icon "${iconName}" is missing an "active" prop`);
      if (typeof active !== 'boolean')
        throw Error(`Icon "${iconName}" has an invalid "active" prop`);
      // Download and optimize the icon asset SVG
      const rawSvg = await downloadSvgImage(syncedLibrary.imageUrls.svg[iconNode.id]);
      const svg = svgoOptimize(rawSvg, svgoConfig);
      const svgName = `${iconName}-${size}-${active ? 'active' : 'inactive'}`;
      const svgPath = path.join(config.outputSvgPath, `${svgName}.svg`);
      tempIcons.push({
        nodeId: iconNode.id,
        size,
        active,
        svg,
        name: svgName,
        path: svgPath,
      });
    }

    // Used to check if the iconSet's assets have changed
    const iconSetAssetsData = tempIcons.map((icon) => icon.svg);

    // Hash of the complete set of icon assets (all sizes and active states)
    const iconSetAssetsHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(iconSetAssetsData))
      .digest('base64');

    // Used to check if the iconSet's assets have changed names
    const iconSetNameData = tempIcons.map((icon) => icon.name);

    // Hash of the icon set name and its assets
    const iconSetNameHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(iconSetNameData))
      .digest('base64');

    const hasNameChanged = iconSetNameHash !== oldIconSet?.nameHash;
    const hasAssetsChanged = iconSetAssetsHash !== oldIconSet?.assetsHash;

    // Build the icon set data to be persisted in the manifest
    const iconSet: ManifestIconSet = {
      nodeId,
      name: iconName,
      description,
      assetsHash: iconSetAssetsHash,
      nameHash: iconSetNameHash,
      createdAt: oldIconSet?.createdAt ?? createdAt,
      lastUpdated,
      svgs: oldIconSet?.svgs ?? [],
    };

    // If the icon set is new, we need to create the svg output files and add it to the manifest
    if (!oldIconSet) {
      console.log('  [NEW] Icon set is new, creating svg output files...');
      for (const tempIcon of tempIcons) {
        fs.writeFileSync(tempIcon.path, tempIcon.svg.data);
        iconSet.svgs.push({
          name: tempIcon.name,
          active: tempIcon.active,
          size: tempIcon.size,
          unicode: undefined,
        });
      }

      newManifest.iconSets.push(iconSet);
      syncResults.newIconSets.push(iconSet);
    }

    // If the icon set has been renamed or its assets have changed, we need to recreate the svg output files and update the manifest
    if (oldIconSet && (hasNameChanged || hasAssetsChanged)) {
      console.log('  [CHANGED] Icon set has changed, deleting and recreating svg output files...');
      for (const oldSvg of oldIconSet.svgs) {
        const oldSvgPath = path.join(config.outputSvgPath, oldSvg.name + '.svg');
        fs.rmSync(oldSvgPath);
      }

      iconSet.svgs = [];
      for (const tempIcon of tempIcons) {
        fs.writeFileSync(tempIcon.path, tempIcon.svg.data);
        iconSet.svgs.push({
          name: tempIcon.name,
          active: tempIcon.active,
          size: tempIcon.size,
          unicode: oldIconSet.svgs.find(
            (svg) => svg.size === tempIcon.size && svg.active === tempIcon.active,
          )?.unicode,
        });
      }

      newManifest.iconSets = newManifest.iconSets.filter((iconSet) => iconSet.nodeId !== nodeId);
      newManifest.iconSets.push(iconSet);
      if (hasNameChanged)
        syncResults.renamedIconSets.push({ ...iconSet, oldName: oldIconSet.name });
      if (hasAssetsChanged) syncResults.updatedIconSets.push(iconSet);
    }
  }

  const deletedIconSetIds = oldManifest.iconSets.filter(
    (iconSet) => !syncedLibrary.remoteIds.includes(iconSet.nodeId),
  );

  console.log(`\nProcessing ${deletedIconSetIds.length} deleted icon sets...`);
  // If any icon set's node is no longer present in the Figma file, we need to delete the svg output files and update the manifest
  for (const oldIconSet of oldManifest.iconSets) {
    if (!syncedLibrary.remoteIds.includes(oldIconSet.nodeId)) {
      console.log(` Deleting icon set: ${oldIconSet.name} ${oldIconSet.nodeId}`);
      for (const oldSvg of oldIconSet.svgs) {
        const oldSvgPath = path.join(config.outputSvgPath, oldSvg.name + '.svg');
        fs.rmSync(oldSvgPath);
      }
      newManifest.iconSets = newManifest.iconSets.filter(
        (iconSet) => iconSet.nodeId !== oldIconSet.nodeId,
      );
      syncResults.deletedIconSets.push(oldIconSet);
    }
  }

  // Sort the icon sets by creation date
  newManifest.iconSets.sort(sortByCreatedAt);

  /**
   * A function which creates the metadata for each icon glyph in the icon font.
   * Receives an icon svg filepath and should return icon metadata async via the callback function.
   * You can use this function to provide custom logic for svg to codepoint mapping.
   * Custom implementation of https://github.com/nfroidure/svgicons2svgfont/blob/main/src/metadata.ts
   */
  const createFontGlyphMetadata = (
    glyphData: CorrectedWebfontGlyphMetadata,
  ): CorrectedWebfontGlyphMetadata & CustomGlyphMetadata => {
    const { name: svgName } = glyphData;
    const [iconSetName, sizeString, activeString] = svgName.split('-');
    const size = Number(sizeString);
    const active = activeString === 'active';
    const iconSet = newManifest.iconSets.find((iconSet) => iconSet.name === iconSetName);
    if (!iconSet) throw Error(`Unable to find matching icon set for "${svgName}"`);
    const icon = iconSet.svgs.find((svg) => svg.size === size && svg.active === active);
    if (!icon) throw Error(`Unable to find matching icon asset for "${svgName}"`);
    let unicode = icon.unicode;
    if (unicode === undefined) {
      newManifest.lastUnicode = newManifest.lastUnicode + 1;
      unicode = newManifest.lastUnicode;
    }
    // Enforce that the unicode does not exceed the BMP
    if (unicode > lastAllowedUnicode) throw Error(`Unicode value is too high for "${svgName}"`);
    icon.unicode = unicode;
    return {
      ...glyphData,
      // Override the unicode values
      unicode: [String.fromCodePoint(unicode), svgName],
      // Add custom createdAt metadata
      createdAt: iconSet.createdAt,
    };
  };

  console.log('\nGenerating output files...');

  const codegenHeader = `/**
 * DO NOT MODIFY
 * @danger This file is generated by the icons:sync-icons script.
*/`;

  console.log('Generating icon font...');
  // Generate the icon font
  const font = (await webfont({
    files: `${config.outputSvgPath}/*.svg`,
    fontName: config.outputFontName,
    formats: ['woff2', 'ttf'],
    centerHorizontally: true,
    fontHeight: 4096,
    normalize: true,
    startUnicode: firstAllowedUnicode,
    // @ts-expect-error - Webfont types are not correct
    glyphTransformFn: createFontGlyphMetadata,
  }).catch((err: Error) => {
    console.error('Error generating webfont', err);
    throw err;
  })) as WebfontResult;

  // Write the ttf font file for use with React Native
  if (font.ttf) {
    const fontDirectoryPath = path.join(config.outputFontPath, 'native');
    const fontFilename = config.outputFontName + '.ttf';
    if (fs.existsSync(fontDirectoryPath)) fs.rmSync(fontDirectoryPath, { recursive: true });
    fs.mkdirSync(fontDirectoryPath, { recursive: true });
    fs.writeFileSync(path.join(fontDirectoryPath, fontFilename), font.ttf);
  }

  // Write the woff2 font file and CSS file for use with web
  if (font.woff2) {
    const fontHash = font.hash?.slice(0, 13) ?? Date.now();
    const fontDirectoryPath = path.join(config.outputFontPath, 'web');
    const fontFilename = `${config.outputFontName}-${fontHash}` + '.woff2';
    if (fs.existsSync(fontDirectoryPath)) fs.rmSync(fontDirectoryPath, { recursive: true });
    fs.mkdirSync(fontDirectoryPath, { recursive: true });
    fs.writeFileSync(path.join(fontDirectoryPath, fontFilename), font.woff2);

    const cssFilename = config.outputFontCssFileName + '.css';
    const cssFileContent = `@font-face {
  font-family: '${config.outputFontName}';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url('./${fontFilename}') format('woff2');
}`;
    fs.writeFileSync(path.join(fontDirectoryPath, cssFilename), cssFileContent);
  }

  console.log('Generating output glyphMap data...');
  const glyphMap = Object.fromEntries(
    font.glyphsData
      .map((glyph) => glyph.metadata)
      .sort(sortByCreatedAt)
      .map((metadata) => [metadata.name, metadata.unicode?.[0]]),
  );

  const glyphsContent = JSON.stringify(glyphMap, null, 2).replaceAll('"', "'");
  const glyphMapContent = `${codegenHeader}
export const glyphMap = ${glyphsContent};\n`;
  fs.writeFileSync(path.join(config.outputDataPath, 'glyphMap.ts'), glyphMapContent);

  console.log('Generating output types data...');
  const iconNamesStrings = newManifest.iconSets.map((iconSet) => `'${iconSet.name}'`).sort();
  const iconNamesUnionContent = ['', ...iconNamesStrings].join('\n | ');
  const typesFileContent = `${codegenHeader}
export type IconName = ${iconNamesUnionContent};\n`;
  fs.writeFileSync(path.join(config.outputDataPath, 'IconName.ts'), typesFileContent);

  console.log('Generating output names data...');
  const iconNamesByCreatedAt = newManifest.iconSets.map((iconSet) => iconSet.name);
  const iconNamesContent = JSON.stringify(iconNamesByCreatedAt, null, 2).replaceAll('"', "'");
  const namesFileContent = `${codegenHeader}
import type { IconName } from './IconName';\n
export const names: IconName[] = ${iconNamesContent};\n`;
  fs.writeFileSync(path.join(config.outputDataPath, 'names.ts'), namesFileContent);

  console.log('Generating output descriptions data...');
  const descriptionMap = getDescriptionMap(newManifest.iconSets);
  const descriptionMapContent = JSON.stringify(descriptionMap, null, 2).replaceAll('"', "'");
  const descriptionsDataContent = `${codegenHeader}
import type { IconName } from './IconName';\n
/** Mapping of descriptions to associated icons. */
export const descriptionMap: Record<string, IconName[]> = ${descriptionMapContent};\n`;
  fs.writeFileSync(path.join(config.outputDataPath, 'descriptionMap.ts'), descriptionsDataContent);

  const hasChanges =
    syncResults.newIconSets.length ||
    syncResults.deletedIconSets.length ||
    syncResults.renamedIconSets.length ||
    syncResults.updatedIconSets.length;

  if (!hasChanges) console.log('No changes detected, skipping changelog...');
  else {
    console.log('Writing changelog...');
    const changelogContent = generateChangelog(syncResults);
    const newChangelog = changelog.replace(
      '<!-- template-start -->',
      '<!-- template-start -->\n\n' + changelogContent,
    );
    fs.writeFileSync(config.changelogPath, newChangelog);
  }

  console.log('Updating manifest...');
  newManifest.lastUpdated = new Date().toISOString();
  fs.writeFileSync(config.manifestPath, JSON.stringify(newManifest, null, 2));

  console.log('\n\nChange summary:');
  console.log(`\nNew icon sets (${syncResults.newIconSets.length}):`);
  console.table(syncResults.newIconSets.map(({ nodeId, name }) => ({ nodeId, name })));
  console.log(`\nDeleted icon sets (${syncResults.deletedIconSets.length}):`);
  console.table(syncResults.deletedIconSets.map(({ nodeId, name }) => ({ nodeId, name })));
  console.log(`\nRenamed icon sets (${syncResults.renamedIconSets.length}):`);
  console.table(
    syncResults.renamedIconSets.map(({ nodeId, oldName, name }) => ({
      nodeId,
      oldName,
      newName: name,
    })),
  );
  console.log(`\nUpdated icon sets (${syncResults.updatedIconSets.length}):`);
  console.table(
    syncResults.updatedIconSets.map(({ nodeId, name }) => ({
      nodeId,
      name,
    })),
  );

  const breakingChanges = syncResults.deletedIconSets.length + syncResults.renamedIconSets.length;
  if (breakingChanges > 0)
    console.log(`\n⚠️ Warning: ${breakingChanges} breaking changes detected`);

  await syncIconCodeConnect(config.repoRoot);
};

process.on('exit', (code) => {
  if (code !== 0) return console.log('\n❌ Error: Something went wrong with the icon sync');
  console.log('\n✅ Success: Icon sync completed successfully!');
  console.log('\nCommitting and pushing changes...\n');
  commitAndPushChanges(config.repoRoot, commitMessage);
});

main();
