import path from 'node:path';

import {
  renderCjsModule,
  renderEsmModule,
  renderSvgEsmMap,
  renderSvgJsMap,
} from '../artifacts/modules';
import { rasterizePng } from '../artifacts/png';
import {
  nameTypeOf,
  renderDescriptionMap,
  renderNames,
  renderNameType,
  renderVersionMap,
} from '../artifacts/typescriptData';
import type { ColorPalette } from '../colorPalette';
import { byName, groupByType, type Illustration } from '../illustration';
import { mapConcurrently } from '../mapConcurrently';

import { allFilesExist, relativeImport, removeFile, writeFile } from './files';
import { Sink, type SinkChanges, type SinkOptions } from './Sink';

export type IllustrationsPackageSinkOptions = SinkOptions & {
  /** The `src/__generated__` directory of the package. */
  dir: string;
  /** Prefix of the CSS variables in themeable SVGs: `illustration` -> `var(--illustration-primary)`. */
  cssVariablePrefix?: string;
};

const header = `/**
 * DO NOT MODIFY
 * Generated from yarn nx run illustrations:sync-illustrations
 */`;

const assetThemes = ['light', 'dark'] as const;
const moduleThemes = ['light', 'dark', 'themeable'] as const;
type Theme = (typeof moduleThemes)[number];

const concurrentWrites = 8;

/**
 * `@coinbase/cds-illustrations/src/__generated__`, the package every CDS platform consumes:
 *
 * ```
 * <dir>/<type>/svg/<light|dark>/<name>-<version>.svg        CDN source assets
 * <dir>/<type>/png/<light|dark>/<name>-<version>.png        CDN source assets
 * <dir>/<type>/svgJs/cjs/<theme>/<name>-<version>.js        cds-mobile (Metro requires)
 * <dir>/<type>/svgJs/esm/themeable/<name>-<version>.js      cds-web (lazy imports)
 * <dir>/<type>/data/{names,descriptionMap,versionMap,svgJsMap,svgEsmMap}.ts
 * <dir>/<type>/types/<Type>Name.ts
 * ```
 *
 * Asset files carry the version so the CDN can cache them forever. Theming is CSS-based here:
 * `dark` swaps palette colors for their dark values, `themeable` for `var(--<prefix>-<name>)`.
 */
export class IllustrationsPackageSink extends Sink {
  private readonly dir: string;
  private readonly cssVariablePrefix: string;

  constructor({
    dir,
    cssVariablePrefix = 'illustration',
    ...options
  }: IllustrationsPackageSinkOptions) {
    super(options);
    this.dir = dir;
    this.cssVariablePrefix = cssVariablePrefix;
  }

  private typeDir = (type: string) => path.join(this.dir, type);
  private dataDir = (type: string) => path.join(this.dir, type, 'data');
  private nameTypeFile = (type: string) =>
    path.join(this.dir, type, 'types', `${nameTypeOf(type)}.ts`);

  private assetBaseName = ({ name, version }: Illustration) => `${name}-${version}`;

  private svgFile = (illustration: Illustration, theme: (typeof assetThemes)[number]) =>
    path.join(
      this.typeDir(illustration.type),
      'svg',
      theme,
      `${this.assetBaseName(illustration)}.svg`,
    );
  private pngFile = (illustration: Illustration, theme: (typeof assetThemes)[number]) =>
    path.join(
      this.typeDir(illustration.type),
      'png',
      theme,
      `${this.assetBaseName(illustration)}.png`,
    );
  private cjsFile = (illustration: Illustration, theme: Theme) =>
    path.join(
      this.typeDir(illustration.type),
      'svgJs/cjs',
      theme,
      `${this.assetBaseName(illustration)}.js`,
    );
  private esmFile = (illustration: Illustration) =>
    path.join(
      this.typeDir(illustration.type),
      'svgJs/esm/themeable',
      `${this.assetBaseName(illustration)}.js`,
    );

  private assetFiles(illustration: Illustration) {
    return [
      ...assetThemes.map((theme) => this.svgFile(illustration, theme)),
      ...assetThemes.map((theme) => this.pngFile(illustration, theme)),
      ...moduleThemes.map((theme) => this.cjsFile(illustration, theme)),
      this.esmFile(illustration),
    ];
  }

  has(illustration: Illustration) {
    return allFilesExist(this.assetFiles(illustration));
  }

  async apply({ remove, write, illustrations, palette }: SinkChanges) {
    for (const illustration of remove) {
      await Promise.all(this.assetFiles(illustration).map(removeFile));
    }

    await mapConcurrently(write, concurrentWrites, ({ illustration, svg }) =>
      this.writeAssets(illustration, svg, palette),
    );

    for (const [type, ofType] of groupByType(illustrations)) {
      await this.writeTypeData(type, ofType);
    }
  }

  private async writeAssets(illustration: Illustration, lightSvg: string, palette: ColorPalette) {
    const svg: Record<Theme, string> = {
      light: lightSvg,
      dark: palette.toDarkSvg(lightSvg),
      themeable: palette.recolor(
        lightSvg,
        ({ name }) => `var(--${this.cssVariablePrefix}-${name})`,
      ),
    };

    await Promise.all([
      ...assetThemes.map((theme) => writeFile(this.svgFile(illustration, theme), svg[theme])),
      ...assetThemes.map(async (theme) =>
        writeFile(this.pngFile(illustration, theme), await rasterizePng(svg[theme])),
      ),
      ...moduleThemes.map((theme) =>
        writeFile(this.cjsFile(illustration, theme), renderCjsModule(svg[theme])),
      ),
      writeFile(this.esmFile(illustration), renderEsmModule(svg.themeable)),
    ]);
  }

  /** The files derived from the whole set of a type, rebuilt from scratch on every apply. */
  private async writeTypeData(type: string, illustrations: Illustration[]) {
    const dataDir = this.dataDir(type);
    const nameTypeImport = relativeImport(dataDir, this.nameTypeFile(type));
    const options = { type, nameTypeImport, header };
    const mapOptions = { nameType: nameTypeOf(type), nameTypeImport, header };
    const byNameOrder = [...illustrations].sort(byName);
    const specifier = (file: string) => `${relativeImport(dataDir, file)}.js`;

    await Promise.all([
      writeFile(this.nameTypeFile(type), renderNameType(type, illustrations, header)),
      writeFile(path.join(dataDir, 'names.ts'), renderNames(illustrations, options)),
      writeFile(
        path.join(dataDir, 'descriptionMap.ts'),
        renderDescriptionMap(illustrations, options),
      ),
      writeFile(path.join(dataDir, 'versionMap.ts'), renderVersionMap(illustrations, options)),
      writeFile(
        path.join(dataDir, 'svgJsMap.ts'),
        renderSvgJsMap(
          byNameOrder.map((illustration) => ({
            name: illustration.name,
            modules: {
              light: specifier(this.cjsFile(illustration, 'light')),
              dark: specifier(this.cjsFile(illustration, 'dark')),
              themeable: specifier(this.cjsFile(illustration, 'themeable')),
            },
          })),
          mapOptions,
        ),
      ),
      writeFile(
        path.join(dataDir, 'svgEsmMap.ts'),
        renderSvgEsmMap(
          byNameOrder.map((illustration) => ({
            name: illustration.name,
            module: specifier(this.esmFile(illustration)),
          })),
          mapOptions,
        ),
      ),
    ]);
  }
}
