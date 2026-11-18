import fs from 'node:fs';
import path from 'node:path';

import {
  assertApproximationsApplied,
  generatedHeader,
  generatedXmlComment,
  isCurrentAssetFile,
  isNativelyExportable,
  toNativeSvg,
} from '../artifacts/nativeSvg';
import { nameTypeOf } from '../artifacts/typescriptData';
import { groupByType, type Illustration } from '../illustration';
import { mapConcurrently } from '../mapConcurrently';

import { allFilesExist, writeFile } from './files';
import { Sink, type SinkChanges, type SinkOptions } from './Sink';

export type IosAssetCatalogSinkOptions = SinkOptions & {
  /** The `Illustrations.xcassets` directory: `Sources/CDSDesignSystem/Resources/Illustrations.xcassets` of the module. */
  catalogDir: string;
  /** Where the `<Type>Name.swift` enums go: `Sources/CDSDesignSystem/Illustrations/Generated` of the module. */
  generatedDir: string;
  /** Deep link to an illustration's component, quoted when its SVG cannot be exported. */
  componentUrl?: (illustration: Illustration) => string;
};

/** Words that cannot name an enum case without backticks. */
const swiftKeywords = new Set([
  'Any',
  'Self',
  'as',
  'associatedtype',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'continue',
  'default',
  'defer',
  'deinit',
  'do',
  'else',
  'enum',
  'extension',
  'fallthrough',
  'false',
  'fileprivate',
  'for',
  'func',
  'guard',
  'if',
  'import',
  'in',
  'init',
  'inout',
  'internal',
  'is',
  'let',
  'nil',
  'open',
  'operator',
  'precedencegroup',
  'private',
  'protocol',
  'public',
  'repeat',
  'rethrows',
  'return',
  'self',
  'static',
  'struct',
  'subscript',
  'super',
  'switch',
  'throw',
  'throws',
  'true',
  'try',
  'typealias',
  'var',
  'where',
  'while',
]);

/** The enum case for an illustration name: `2fa` -> `_2fa`, `private` -> `` `private` ``. */
export function swiftCaseName(name: string) {
  if (!/^[A-Za-z0-9]+$/.test(name)) {
    throw new Error(`"${name}" cannot be a Swift identifier`);
  }
  if (/^[0-9]/.test(name)) return `_${name}`;
  return swiftKeywords.has(name) ? `\`${name}\`` : name;
}

const themes = ['light', 'dark'] as const;

/** Xcode's own JSON layout (`"key" : value`, two-space indent), so Xcode never rewrites the file. */
const xcodeJson = (value: unknown) =>
  `${JSON.stringify(value, null, 2).replace(/^(\s*"[^"]+"):/gm, '$1 :')}\n`;

const contentsInfo = { author: 'xcode', version: 1 };

const concurrentWrites = 16;

/**
 * The iOS CDS package, `CDSDesignSystem`: an asset catalog with one image set per illustration,
 * holding the light SVG and the dark SVG as the `luminosity: dark` appearance, and one `<Type>Name`
 * enum per type. Type folders provide a namespace, so an asset is named `pictogram/wallet`.
 *
 * ```
 * <catalogDir>/Contents.json
 * <catalogDir>/<type>/Contents.json             provides-namespace
 * <catalogDir>/<type>/<name>.imageset/Contents.json
 * <catalogDir>/<type>/<name>.imageset/<name>-light.svg
 * <catalogDir>/<type>/<name>.imageset/<name>-dark.svg
 * <generatedDir>/<Type>Name.swift               public enum <Type>Name: String, CaseIterable, Sendable
 * ```
 *
 * File names carry no version: the package version is the version. Each SVG is stamped with the
 * manifest version and hash, which is what `has` compares, so a checkout that missed a run is
 * repaired by the next one. `actool` compiles the catalog into `Assets.car` and drops the comments.
 */
export class IosAssetCatalogSink extends Sink {
  private readonly catalogDir: string;
  private readonly generatedDir: string;
  private readonly componentUrl?: IosAssetCatalogSinkOptions['componentUrl'];

  constructor({ catalogDir, generatedDir, componentUrl, ...options }: IosAssetCatalogSinkOptions) {
    super({
      ...options,
      include: (illustration) =>
        isNativelyExportable(illustration) && (options.include?.(illustration) ?? true),
    });
    this.catalogDir = catalogDir;
    this.generatedDir = generatedDir;
    this.componentUrl = componentUrl;
  }

  private typeDir = (type: string) => path.join(this.catalogDir, type);
  private imageSetDir = ({ type, name }: Illustration) =>
    path.join(this.typeDir(type), `${name}.imageset`);
  private svgFile = (illustration: Illustration, theme: (typeof themes)[number]) =>
    path.join(this.imageSetDir(illustration), `${illustration.name}-${theme}.svg`);
  private contentsFile = (dir: string) => path.join(dir, 'Contents.json');
  private enumFile = (type: string) => path.join(this.generatedDir, `${nameTypeOf(type)}.swift`);

  async has(illustration: Illustration) {
    const current = await Promise.all(
      themes.map((theme) => isCurrentAssetFile(this.svgFile(illustration, theme), illustration)),
    );
    return (
      current.every(Boolean) && allFilesExist([this.contentsFile(this.imageSetDir(illustration))])
    );
  }

  async apply({ remove, write, illustrations, palette }: SinkChanges) {
    // Everything that can fail runs before the first file is touched.
    const enums = [...groupByType(illustrations)].map(
      ([type, ofType]) => [this.enumFile(type), renderNameEnum(type, ofType)] as const,
    );
    const imageSets = write.map(({ illustration, svg }) => {
      const native = toNativeSvg(illustration, svg, palette, {
        componentUrl: this.componentUrl?.(illustration),
      });
      assertApproximationsApplied(illustration, 'ios', native.approximated);
      return {
        illustration,
        files: [
          ...themes.map(
            (theme) =>
              [
                this.svgFile(illustration, theme),
                `${generatedXmlComment(illustration)}\n${withIntrinsicSize(native[theme], illustration)}\n`,
              ] as const,
          ),
          [
            this.contentsFile(this.imageSetDir(illustration)),
            imageSetContents(illustration),
          ] as const,
        ],
      };
    });

    await Promise.all(
      remove.map((illustration) =>
        fs.promises.rm(this.imageSetDir(illustration), { recursive: true, force: true }),
      ),
    );
    await mapConcurrently(imageSets, concurrentWrites, ({ files }) =>
      Promise.all(files.map(([file, content]) => writeFile(file, content))),
    );
    await Promise.all([
      writeFile(this.contentsFile(this.catalogDir), xcodeJson({ info: contentsInfo })),
      ...[...groupByType(illustrations).keys()].map((type) =>
        writeFile(
          this.contentsFile(this.typeDir(type)),
          xcodeJson({ info: contentsInfo, properties: { 'provides-namespace': true } }),
        ),
      ),
      ...enums.map(([file, content]) => writeFile(file, content)),
    ]);
  }
}

/**
 * `optimizeSvg` strips `width` and `height` for the web; the asset catalog reads the intrinsic
 * size from them, so they come back as the viewBox size in points.
 */
function withIntrinsicSize(svg: string, { width, height }: Illustration) {
  return svg.replace(/^<svg /, `<svg width="${width}" height="${height}" `);
}

/** The image set's `Contents.json`: the light file, the dark appearance, vector representation. */
function imageSetContents({ name }: Illustration) {
  return xcodeJson({
    images: [
      { filename: `${name}-light.svg`, idiom: 'universal' },
      {
        appearances: [{ appearance: 'luminosity', value: 'dark' }],
        filename: `${name}-dark.svg`,
        idiom: 'universal',
      },
    ],
    info: contentsInfo,
    properties: { 'preserves-vector-representation': true },
  });
}

/**
 * `<Type>Name.swift`: every name of the type, alphabetical, its Figma name as raw value and so its
 * asset name under the type namespace. Fails on names that would collide as identifiers or as image
 * sets on a case-insensitive file system.
 */
export function renderNameEnum(type: string, illustrations: Illustration[]) {
  const names = illustrations.map(({ name }) => name).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const seenCases = new Map<string, string>();
  const seenFiles = new Map<string, string>();
  for (const name of names) {
    const caseName = swiftCaseName(name).replaceAll('`', '');
    const fileKey = name.toLowerCase();
    const clash = seenCases.get(caseName) ?? seenFiles.get(fileKey);
    if (clash !== undefined) {
      throw new Error(
        `${type}/${name} and ${type}/${clash} collide in the iOS package; rename one of them in Figma`,
      );
    }
    seenCases.set(caseName, name);
    seenFiles.set(fileKey, name);
  }

  const cases = names.map((name) => {
    const caseName = swiftCaseName(name);
    return caseName.replaceAll('`', '') === name
      ? `    case ${caseName}`
      : `    case ${caseName} = "${name}"`;
  });

  return `${generatedHeader('//')}

/// Every ${type} illustration in \`Illustrations.xcassets\`; the raw value is the asset name under
/// the \`${type}/\` namespace.
public enum ${nameTypeOf(type)}: String, CaseIterable, Sendable {
${cases.join('\n')}
}
`;
}
