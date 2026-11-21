import { mapConcurrently } from '@cds/figma-api/syncUtils';
import fs from 'node:fs';
import path from 'node:path';

import {
  type ApproximatedFeature,
  assertApproximationsApplied,
  generatedHeader,
  generatedXmlComment,
  isCurrentAssetFile,
  isNativelyExportable,
  toNativeSvg,
} from '../artifacts/nativeSvg';
import { nameTypeOf } from '../artifacts/typescriptData';
import {
  oversizedPathData,
  PathDataTooLongError,
  toVectorDrawable,
} from '../artifacts/vectorDrawable';
import type { ColorPalette } from '../colorPalette';
import { groupByType, type Illustration } from '../illustration';

import { allFilesExist, removeFile, writeFile } from './files';
import {
  commitUnlessFailed,
  keepAvailable,
  Sink,
  type SinkChanges,
  type SinkOptions,
  type SinkPlan,
  withoutFailed,
} from './Sink';

export type AndroidVectorDrawableSinkOptions = SinkOptions & {
  /** The `drawable` resource directory: `src/main/res/drawable` of the `:cds` module. */
  drawableDir: string;
  /** The Kotlin source root the generated package goes under: `illustrations/src/main/kotlin` of the module. */
  kotlinDir: string;
  /** Deep link to an illustration's component, quoted when its SVG cannot be exported. */
  componentUrl?: (illustration: Illustration) => string;
  /** The package of the module's `R` class. */
  rPackage?: string;
};

/** The package the name classes live in; the generated extensions live under it. */
const illustrationsPackage = 'com.coinbase.cds.illustrations';
const generatedPackage = `${illustrationsPackage}.generated`;

/** Name of the generated property listing every name of a type; no illustration may take it. */
const allNamesProperty = 'all';

/** Kotlin's hard keywords, which cannot be identifiers without backticks. */
const kotlinHardKeywords = new Set([
  'as',
  'break',
  'class',
  'continue',
  'do',
  'else',
  'false',
  'for',
  'fun',
  'if',
  'in',
  'interface',
  'is',
  'null',
  'object',
  'package',
  'return',
  'super',
  'this',
  'throw',
  'true',
  'try',
  'typealias',
  'typeof',
  'val',
  'var',
  'when',
  'while',
]);

/** The property for an illustration name: `2fa` -> `_2fa`, `object` -> `` `object` ``. */
export function kotlinPropertyName(name: string) {
  if (!/^[A-Za-z0-9]+$/.test(name)) {
    throw new Error(`"${name}" cannot be a Kotlin identifier`);
  }
  if (/^[0-9]/.test(name)) return `_${name}`;
  return kotlinHardKeywords.has(name) ? `\`${name}\`` : name;
}

/** `arrowsUpDown` -> `arrows_up_down`; injective because names never contain `_`. */
export const snakeCase = (camelCase: string) =>
  camelCase.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const themes = ['light', 'dark'] as const;
type Theme = (typeof themes)[number];

/** `heroSquare`, `arrowsUpDown`, `dark` -> `cds_hero_square_arrows_up_down_dark`, the drawable name. */
export const drawableName = ({ type, name }: Pick<Illustration, 'type' | 'name'>, theme: Theme) =>
  `cds_${snakeCase(type)}_${snakeCase(name)}_${theme}`;

const xmlDeclaration = '<?xml version="1.0" encoding="utf-8"?>';

const concurrentWrites = 16;

/**
 * The Android CDS module, `:cds`: two vector drawables per illustration, light and dark, and, per
 * type, one companion extension property per name on the `<Type>Name` class.
 *
 * ```
 * <drawableDir>/cds_<type>_<name>_light.xml                                   snake_case
 * <drawableDir>/cds_<type>_<name>_dark.xml
 * <kotlinDir>/com/coinbase/cds/illustrations/generated/<Type>Names.kt
 * ```
 *
 * One property per illustration, rather than an enum or a central `when`, lets R8 drop every name
 * an app does not reference together with its two drawables. File names carry no version: the AAR
 * version is the version. Each drawable is stamped with the manifest version and hash, which is
 * what `has` compares, so a checkout that missed a run is repaired by the next one. `aapt2` drops
 * the comments at build time.
 */
export class AndroidVectorDrawableSink extends Sink {
  private readonly drawableDir: string;
  private readonly kotlinDir: string;
  private readonly componentUrl?: AndroidVectorDrawableSinkOptions['componentUrl'];
  private readonly rPackage: string;

  constructor({
    drawableDir,
    kotlinDir,
    componentUrl,
    rPackage = 'com.coinbase.cds',
    ...options
  }: AndroidVectorDrawableSinkOptions) {
    super({
      ...options,
      include: (illustration) =>
        isNativelyExportable(illustration, 'android') && (options.include?.(illustration) ?? true),
    });
    this.drawableDir = drawableDir;
    this.kotlinDir = kotlinDir;
    this.componentUrl = componentUrl;
    this.rPackage = rPackage;
  }

  private drawableFile = (illustration: Illustration, theme: Theme) =>
    path.join(this.drawableDir, `${drawableName(illustration, theme)}.xml`);

  private namesFile = (type: string) =>
    path.join(this.kotlinDir, ...generatedPackage.split('.'), `${nameTypeOf(type)}s.kt`);

  async has(illustration: Illustration) {
    const current = await Promise.all(
      themes.map(async (theme) => {
        const file = this.drawableFile(illustration, theme);
        return (
          (await isCurrentAssetFile(file, illustration)) && !(await hasOversizedPathData(file))
        );
      }),
    );
    return current.every(Boolean);
  }

  private hasDrawables(illustration: Illustration) {
    return allFilesExist(themes.map((theme) => this.drawableFile(illustration, theme)));
  }

  async plan({ remove, write, illustrations, palette }: SinkChanges): Promise<SinkPlan> {
    const converted = write.map(({ illustration, svg }) => ({
      illustration,
      ...this.convertAsset(illustration, svg, palette),
    }));
    const failures = converted.flatMap(({ illustration, failure }) =>
      failure === undefined ? [] : [{ illustration, message: failure }],
    );
    const succeeded = converted.filter(({ files }) => files !== undefined);
    const available = await keepAvailable(illustrations, failures, (illustration) =>
      this.hasDrawables(illustration),
    );
    const namesFiles = [...groupByType(available)].map(
      ([type, ofType]) =>
        [this.namesFile(type), renderNameProperties(type, ofType, this.rPackage)] as const,
    );
    const removals = withoutFailed(remove, failures);
    const drawables = succeeded.flatMap(({ files }) => files ?? []);

    return {
      sink: this.name,
      writes: succeeded.map(({ illustration }) => illustration),
      removals,
      failures,
      commit: async () => {
        await Promise.all(
          removals.flatMap((illustration) =>
            themes.map((theme) => removeFile(this.drawableFile(illustration, theme))),
          ),
        );
        await mapConcurrently(drawables, concurrentWrites, ({ file, content }) =>
          writeFile(file, content),
        );
        await Promise.all(namesFiles.map(([file, content]) => writeFile(file, content)));
      },
    };
  }

  async apply(changes: SinkChanges) {
    await commitUnlessFailed(await this.plan(changes));
  }

  /**
   * Both appearances or neither: a drawable pair is one asset. Every problem found is reported,
   * and nothing here touches a file.
   */
  private convertAsset(illustration: Illustration, svg: string, palette: ColorPalette) {
    const componentUrl = this.componentUrl?.(illustration);
    const failure = (reasons: string[]) =>
      `${illustration.type}/${illustration.name} cannot be drawn as an Android vector drawable.\n` +
      reasons.map((reason) => `  Reason: ${reason}`).join('\n') +
      (componentUrl ? `\n  Fix it in Figma: ${componentUrl}` : '');
    const reasonOf = (error: unknown) => (error instanceof Error ? error.message : String(error));

    let native: ReturnType<typeof toNativeSvg>;
    try {
      native = toNativeSvg(illustration, svg, palette, { componentUrl });
    } catch (error) {
      return { failure: failure([reasonOf(error)]) };
    }

    const applied = new Set<ApproximatedFeature>(native.approximated);
    const files: { file: string; content: string }[] = [];
    const reasons: string[] = [];
    for (const theme of themes) {
      const file = this.drawableFile(illustration, theme);
      try {
        const drawable = toVectorDrawable(native[theme], illustration);
        drawable.approximated.forEach((feature) => applied.add(feature));
        files.push({
          file,
          content: `${xmlDeclaration}\n${generatedXmlComment(illustration)}\n${drawable.xml}\n`,
        });
      } catch (error) {
        reasons.push(
          error instanceof PathDataTooLongError
            ? `${theme}: ${error.message}; ` +
                `output ${path.relative(this.drawableDir, file)}, path starts "${error.excerpt}"`
            : reasonOf(error),
        );
      }
    }
    if (reasons.length === 0) {
      try {
        assertApproximationsApplied(illustration, 'android', applied);
      } catch (error) {
        reasons.push(reasonOf(error));
      }
    }
    return reasons.length ? { failure: failure([...new Set(reasons)]) } : { files };
  }
}

async function hasOversizedPathData(file: string) {
  try {
    return oversizedPathData(await fs.promises.readFile(file, 'utf-8')).length > 0;
  } catch {
    return false;
  }
}

/**
 * `<Type>Names.kt`: a `<Type>Name.Companion.<name>` property per illustration, alphabetical, and
 * `<Type>Name.Companion.all` keyed by Figma name for galleries and catalog tests. Fails on names
 * that would collide as properties or as drawables.
 */
export function renderNameProperties(
  type: string,
  illustrations: Illustration[],
  rPackage: string,
) {
  const nameType = nameTypeOf(type);
  const names = illustrations.map(({ name }) => name).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const seenProperties = new Map<string, string>();
  const seenResources = new Map<string, string>();
  for (const name of names) {
    const property = kotlinPropertyName(name).replaceAll('`', '');
    const resource = drawableName({ type, name }, 'light');
    if (property === allNamesProperty) {
      throw new Error(
        `${type}/${name} collides with the generated ${nameType}.${allNamesProperty} in the Android module; rename it in Figma`,
      );
    }
    const clash = seenProperties.get(property) ?? seenResources.get(resource);
    if (clash !== undefined) {
      throw new Error(
        `${type}/${name} and ${type}/${clash} collide in the Android module; rename one of them in Figma`,
      );
    }
    seenProperties.set(property, name);
    seenResources.set(resource, name);
  }

  const properties = names.map(
    (name) => `public val ${nameType}.Companion.${kotlinPropertyName(name)}: ${nameType}
    get() = ${nameType}(
        light = R.drawable.${drawableName({ type, name }, 'light')},
        dark = R.drawable.${drawableName({ type, name }, 'dark')},
    )
`,
  );
  const entries = names.map(
    (name) => `        "${name}" to ${nameType}.${kotlinPropertyName(name)},`,
  );

  return `${generatedHeader('//')}

package ${generatedPackage}

import ${rPackage}.R
import ${illustrationsPackage}.${nameType}

${properties.join('\n')}
/**
 * Every ${type} illustration by its Figma name, alphabetically. Referencing this keeps every
 * ${type} illustration in the app; prefer the individual properties.
 */
public val ${nameType}.Companion.${allNamesProperty}: Map<String, ${nameType}>
    get() = all${nameType}s

private val all${nameType}s: Map<String, ${nameType}> by lazy {
    mapOf(
${entries.join('\n')}
    )
}
`;
}
