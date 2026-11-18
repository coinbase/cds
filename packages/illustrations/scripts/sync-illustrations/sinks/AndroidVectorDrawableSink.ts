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
import { toVectorDrawable } from '../artifacts/vectorDrawable';
import { groupByType, type Illustration } from '../illustration';
import { mapConcurrently } from '../mapConcurrently';

import { removeFile, writeFile } from './files';
import { Sink, type SinkChanges, type SinkOptions } from './Sink';

export type AndroidVectorDrawableSinkOptions = SinkOptions & {
  /** `modules/android/cds/src/main` of the native repo. */
  dir: string;
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
 * <dir>/res/drawable/cds_<type>_<name>_light.xml                             snake_case
 * <dir>/res/drawable/cds_<type>_<name>_dark.xml
 * <dir>/kotlin/com/coinbase/cds/illustrations/generated/<Type>Names.kt
 * ```
 *
 * One property per illustration, rather than an enum or a central `when`, lets R8 drop every name
 * an app does not reference together with its two drawables. File names carry no version: the AAR
 * version is the version. Each drawable is stamped with the manifest version and hash, which is
 * what `has` compares, so a checkout that missed a run is repaired by the next one. `aapt2` drops
 * the comments at build time.
 */
export class AndroidVectorDrawableSink extends Sink {
  private readonly dir: string;
  private readonly componentUrl?: AndroidVectorDrawableSinkOptions['componentUrl'];
  private readonly rPackage: string;

  constructor({
    dir,
    componentUrl,
    rPackage = 'com.coinbase.cds',
    ...options
  }: AndroidVectorDrawableSinkOptions) {
    super({
      ...options,
      include: (illustration) =>
        isNativelyExportable(illustration) && (options.include?.(illustration) ?? true),
    });
    this.dir = dir;
    this.componentUrl = componentUrl;
    this.rPackage = rPackage;
  }

  private drawableFile = (illustration: Illustration, theme: Theme) =>
    path.join(this.dir, 'res', 'drawable', `${drawableName(illustration, theme)}.xml`);

  private namesFile = (type: string) =>
    path.join(this.dir, 'kotlin', ...generatedPackage.split('.'), `${nameTypeOf(type)}s.kt`);

  async has(illustration: Illustration) {
    const current = await Promise.all(
      themes.map((theme) =>
        isCurrentAssetFile(this.drawableFile(illustration, theme), illustration),
      ),
    );
    return current.every(Boolean);
  }

  async apply({ remove, write, illustrations, palette }: SinkChanges) {
    // Everything that can fail runs before the first file is touched.
    const namesFiles = [...groupByType(illustrations)].map(
      ([type, ofType]) =>
        [this.namesFile(type), renderNameProperties(type, ofType, this.rPackage)] as const,
    );
    const drawables = write.flatMap(({ illustration, svg }) => {
      const componentUrl = this.componentUrl?.(illustration);
      const native = toNativeSvg(illustration, svg, palette, { componentUrl });
      const applied = new Set<ApproximatedFeature>(native.approximated);
      const files = themes.map((theme) => {
        const drawable = convert(native[theme], illustration, componentUrl);
        drawable.approximated.forEach((feature) => applied.add(feature));
        return {
          file: this.drawableFile(illustration, theme),
          content: `${xmlDeclaration}\n${generatedXmlComment(illustration)}\n${drawable.xml}\n`,
        };
      });
      assertApproximationsApplied(illustration, 'android', applied);
      return files;
    });

    await Promise.all(
      remove.flatMap((illustration) =>
        themes.map((theme) => removeFile(this.drawableFile(illustration, theme))),
      ),
    );
    await mapConcurrently(drawables, concurrentWrites, ({ file, content }) =>
      writeFile(file, content),
    );
    await Promise.all(namesFiles.map(([file, content]) => writeFile(file, content)));
  }
}

/** Converts one prepared SVG, pointing at the component in Figma when it cannot be expressed. */
function convert(svg: string, illustration: Illustration, componentUrl?: string) {
  try {
    return toVectorDrawable(svg, illustration);
  } catch (error) {
    throw new Error(
      `${illustration.type}/${illustration.name} cannot be drawn as an Android vector drawable.\n` +
        `  Reason: ${error instanceof Error ? error.message : String(error)}` +
        (componentUrl ? `\n  Fix it in Figma: ${componentUrl}` : ''),
      { cause: error },
    );
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
