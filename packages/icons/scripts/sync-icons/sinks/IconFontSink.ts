import { sortByCreatedAt } from '@cds/figma-api/syncUtils';
import path from 'node:path';
import { webfont } from 'webfont';

import { firstAllowedUnicode, lastAllowedUnicode, type Manifest } from '../manifest';

import { codegenHeader, resetDirectory, writeFile } from './files';
import { Sink, type SinkChanges, type SinkFailure } from './Sink';

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

/**
 * A function which creates the metadata for each icon glyph in the icon font. It reads the code
 * point of the icon from the manifest, or gives the icon the next free one.
 * Custom implementation of https://github.com/nfroidure/svgicons2svgfont/blob/main/src/metadata.ts
 */
const createFontGlyphMetadata =
  (manifest: Manifest) =>
  (
    glyphData: CorrectedWebfontGlyphMetadata,
  ): CorrectedWebfontGlyphMetadata & CustomGlyphMetadata => {
    const { name: svgName } = glyphData;
    const [iconSetName, sizeString, activeString] = svgName.split('-');
    const size = Number(sizeString);
    const active = activeString === 'active';
    const iconSet = manifest.iconSets.find((iconSet) => iconSet.name === iconSetName);
    if (!iconSet) throw Error(`Unable to find matching icon set for "${svgName}"`);
    const icon = iconSet.svgs.find((svg) => svg.size === size && svg.active === active);
    if (!icon) throw Error(`Unable to find matching icon asset for "${svgName}"`);
    let unicode = icon.unicode;
    if (unicode === undefined) {
      manifest.lastUnicode = manifest.lastUnicode + 1;
      unicode = manifest.lastUnicode;
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

/**
 * Generates the icon font from the SVG files of the package, and the glyph map of its code
 * points. Run it after the SVG files are written. It gives each new icon its code point in the
 * manifest of the changes.
 */
export class IconFontSink extends Sink {
  async plan(changes: SinkChanges) {
    const failures: SinkFailure[] = [];

    // The glyph of an icon is found again through its file name, `<name>-<size>-<state>`.
    for (const { iconSet } of changes.write) {
      if (iconSet.name.includes('-')) {
        failures.push({
          nodeId: iconSet.nodeId,
          name: iconSet.name,
          message: `The icon name "${iconSet.name}" contains "-", which the icon font cannot map back to its icon set. Rename the icon set in Figma.`,
        });
      }
    }

    // Every new icon needs a code point of its own, and the font has a fixed range of them.
    let free = lastAllowedUnicode - changes.manifest.lastUnicode;
    const needing = changes.write
      .filter(({ iconSet }) => !failures.some(({ nodeId }) => nodeId === iconSet.nodeId))
      .map(({ iconSet }) => ({
        iconSet,
        count: iconSet.svgs.filter(({ unicode }) => unicode === undefined).length,
      }));
    for (const { iconSet, count } of needing) {
      if (count <= free) {
        free -= count;
      } else {
        failures.push({
          nodeId: iconSet.nodeId,
          name: iconSet.name,
          message: `The icon font has no code point left for the ${count} icons of "${iconSet.name}".`,
        });
      }
    }

    return { sink: this.name, failures, commit: () => this.apply(changes) };
  }

  async apply({ config, manifest }: SinkChanges) {
    console.log('Generating icon font...');
    const font = (await webfont({
      files: `${config.outputSvgPath}/*.svg`,
      fontName: config.outputFontName,
      formats: ['woff2', 'ttf'],
      centerHorizontally: true,
      fontHeight: 4096,
      normalize: true,
      startUnicode: firstAllowedUnicode,
      // @ts-expect-error - Webfont types are not correct
      glyphTransformFn: createFontGlyphMetadata(manifest),
    }).catch((err: Error) => {
      console.error('Error generating webfont', err);
      throw err;
    })) as WebfontResult;

    // Write the ttf font file for use with React Native
    if (font.ttf) {
      const fontDirectoryPath = path.join(config.outputFontPath, 'native');
      resetDirectory(fontDirectoryPath);
      writeFile(path.join(fontDirectoryPath, `${config.outputFontName}.ttf`), font.ttf);
    }

    // Write the woff2 font file and CSS file for use with web
    if (font.woff2) {
      const fontHash = font.hash?.slice(0, 13) ?? Date.now();
      const fontDirectoryPath = path.join(config.outputFontPath, 'web');
      const fontFilename = `${config.outputFontName}-${fontHash}.woff2`;
      resetDirectory(fontDirectoryPath);
      writeFile(path.join(fontDirectoryPath, fontFilename), font.woff2);

      const cssFileContent = `@font-face {
  font-family: '${config.outputFontName}';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url('./${fontFilename}') format('woff2');
}`;
      writeFile(
        path.join(fontDirectoryPath, `${config.outputFontCssFileName}.css`),
        cssFileContent,
      );
    }

    console.log('Generating output glyphMap data...');
    const glyphMap = Object.fromEntries(
      font.glyphsData
        .map((glyph) => glyph.metadata)
        .sort(sortByCreatedAt)
        .map((metadata) => [metadata.name, metadata.unicode?.[0]]),
    );
    const glyphsContent = JSON.stringify(glyphMap, null, 2).replaceAll('"', "'");
    writeFile(
      path.join(config.outputDataPath, 'glyphMap.ts'),
      `${codegenHeader}
export const glyphMap = ${glyphsContent};\n`,
    );
  }
}
