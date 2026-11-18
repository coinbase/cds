import fs from 'node:fs';
import { optimize } from 'svgo';
import type { XastElement, XastRoot } from 'svgo/lib/types';

import type { ColorPalette } from '../colorPalette';
import { type Illustration, illustrationKey } from '../illustration';

/**
 * What the native sinks share: the generated-file header and stamp, the approximation list, and
 * the preparation of an illustration's light SVG for the native renderers (iOS asset catalogs
 * drawn by CoreSVG, Android vector drawables). Preparation validates the document against what
 * both renderers can express, rewrites the two constructs they lack an exact equivalent for
 * (single-shape masks become clip paths, blend modes are dropped per the approximation list) and
 * derives the dark variant with the palette. The Android sink converts the result further with
 * `vectorDrawable.ts`; the iOS sink ships it as is.
 */

// ---------------------------------------------------------------------------------------------
// Header and stamp

/** The header every generated native file starts with, as comment lines without the prefix. */
export const generatedHeaderLines = [
  'Generated outside this repository by the CDS illustration sync. Do not edit.',
  'https://github.com/coinbase/cds/blob/master/packages/illustrations/scripts/sync-illustrations/README.md',
];

/** `generatedHeaderLines` as line comments, e.g. `generatedHeader('//')` for Swift and Kotlin. */
export const generatedHeader = (commentPrefix: string) =>
  generatedHeaderLines.map((line) => `${commentPrefix} ${line}`).join('\n');

const stampKeyword = 'cds-illustration';

export type Stamp = Pick<Illustration, 'type' | 'name' | 'version' | 'hash'>;

/** `cds-illustration <type> <name> <version> <hash>`: what `has()` compares with the manifest. */
export const renderStamp = ({ type, name, version, hash }: Stamp) =>
  `${stampKeyword} ${type} ${name} ${version} ${hash}`;

/** The header and the stamp as one XML comment, for SVG and vector drawable files. */
export const generatedXmlComment = (stamp: Stamp) =>
  `<!--\n${[...generatedHeaderLines, renderStamp(stamp)].map((line) => `  ${line}`).join('\n')}\n-->`;

/** Reads the stamp from an SVG or XML file's leading comment; undefined if absent. */
export function parseStamp(text: string): Stamp | undefined {
  const match = /<!--[^]*?\n\s*cds-illustration (\S+) (\S+) (\d+) (\S+)\s*\n[^]*?-->/.exec(text);
  if (!match) return undefined;
  const [, type, name, version, hash] = match;
  return { type, name, version: Number(version), hash };
}

/** Whether `file` is the generated asset of exactly this version of the illustration. */
export async function isCurrentAssetFile(file: string, illustration: Illustration) {
  let text: string;
  try {
    text = await fs.promises.readFile(file, 'utf-8');
  } catch {
    return false;
  }
  const stamp = parseStamp(text);
  return (
    stamp?.type === illustration.type &&
    stamp.name === illustration.name &&
    stamp.version === illustration.version &&
    stamp.hash === illustration.hash
  );
}

// ---------------------------------------------------------------------------------------------
// The approximation list

export const nativePlatforms = ['ios', 'android'] as const;
export type NativePlatform = (typeof nativePlatforms)[number];

/**
 * The SVG features a native renderer cannot draw exactly but the sinks can approximate:
 * `mix-blend-mode` is dropped (painted normally) on both platforms; on Android, dashes are dropped
 * (the stroke is solid), a group's `opacity` is folded into each of its shapes (overlaps composite
 * darker) and a filled and stroked shape's `opacity` is applied to fill and stroke separately
 * (the fill shows through the stroke's inner half).
 */
export type ApproximatedFeature =
  | 'mix-blend-mode'
  | 'stroke-dasharray'
  | 'group-opacity'
  | 'shape-opacity';

export type Approximation = {
  feature: ApproximatedFeature;
  platforms: readonly NativePlatform[];
  /** What is lost, for the run log and the README. */
  reason: string;
};

/**
 * Illustrations that ship with a known drawing difference, by `type/name`. An approximation that
 * is not on this list fails the run with the illustration's Figma link; an entry the illustration
 * no longer needs fails too, so the list stays true to the art. The run prints it.
 */
export const approximationList: Readonly<Record<string, readonly Approximation[]>> = {
  'heroSquare/usdj': [
    {
      feature: 'mix-blend-mode',
      platforms: nativePlatforms,
      reason:
        'the highlight across the coin is a gradient drawn with `screen`; neither CoreSVG nor vector drawables blend, so it is painted normally',
    },
  ],
  'heroSquare/primeDeFi': [
    {
      feature: 'stroke-dasharray',
      platforms: ['android'],
      reason: 'one dashed outline (4 on, 4 off); vector drawables have no dashes, so it is solid',
    },
  ],
  'heroSquare/cbmega': [
    {
      feature: 'group-opacity',
      platforms: ['android'],
      reason:
        'three shapes in a group at 92% opacity; vector drawables have no group opacity, so each shape is 92% and their overlaps are slightly darker',
    },
  ],
};

const approximationsOf = (illustration: Pick<Illustration, 'type' | 'name'>) =>
  approximationList[illustrationKey(illustration)] ?? [];

/**
 * Records that drawing `illustration` on `platforms` loses `feature`; fails unless the list allows
 * it for every one of them.
 */
export function requireApproximation(
  illustration: Pick<Illustration, 'type' | 'name'>,
  platforms: readonly NativePlatform[],
  feature: ApproximatedFeature,
  detail: string,
) {
  const allowed = approximationsOf(illustration).filter((entry) => entry.feature === feature);
  const missing = platforms.filter(
    (platform) => !allowed.some((entry) => entry.platforms.includes(platform)),
  );
  if (missing.length) {
    fail(
      `${detail} cannot be drawn exactly on ${missing.join(' and ')}. Ask design to flatten it, ` +
        `or add ${illustrationKey(illustration)} to the approximation list in artifacts/nativeSvg.ts if the difference is acceptable`,
    );
  }
}

/** Fails when the list expects an approximation for `platform` that the conversion did not need. */
export function assertApproximationsApplied(
  illustration: Pick<Illustration, 'type' | 'name'>,
  platform: NativePlatform,
  applied: ReadonlySet<ApproximatedFeature>,
) {
  const stale = approximationsOf(illustration).filter(
    (entry) => entry.platforms.includes(platform) && !applied.has(entry.feature),
  );
  if (stale.length) {
    fail(
      `${illustrationKey(illustration)} no longer needs the ${stale.map((entry) => entry.feature).join(', ')} ` +
        `approximation on ${platform}; remove the entry from the approximation list in artifacts/nativeSvg.ts`,
    );
  }
}

/** The list as lines for the run log. */
export const approximationSummary = () =>
  Object.entries(approximationList).flatMap(([key, entries]) =>
    entries.map(
      ({ feature, platforms, reason }) => `${key}: ${feature} (${platforms.join(', ')}): ${reason}`,
    ),
  );

/**
 * Illustrations the native packages do not ship yet, keyed `type/name`, each with what in the
 * art neither renderer can draw exactly. The native sinks leave them out (they are neither
 * exported nor named in the generated enums) and the run prints the list. The whole-library test
 * keeps it exact: every entry must still fail to convert, and nothing else may. The fix is in
 * Figma: flatten the construct, and the illustration joins the next sync on its own once the entry
 * is removed.
 */
export const notExportableList: Readonly<Record<string, string>> = {
  'spotRectangle/insto':
    'a mask of a white shape with a black cut-out; clips can only add shapes, never subtract one',
  'spotSquare/lowRisk':
    'a mask of three shapes; a clip of several shapes is a union neither converter expresses exactly',
};

/** Whether the native sinks export the illustration; false for the `notExportableList`. */
export const isNativelyExportable = (illustration: Pick<Illustration, 'type' | 'name'>) =>
  !(illustrationKey(illustration) in notExportableList);

/** The not-exportable list as lines for the run log. */
export const notExportableSummary = () =>
  Object.entries(notExportableList).map(([key, reason]) => `${key}: ${reason}`);

// ---------------------------------------------------------------------------------------------
// Parsing and shared vocabulary

export class UnsupportedSvgError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnsupportedSvgError';
  }
}

export const fail = (message: string): never => {
  throw new UnsupportedSvgError(message);
};

export const childElements = (element: XastElement) =>
  element.children.filter((child): child is XastElement => child.type === 'element');

export const urlReference = (value: string | undefined) =>
  value === undefined ? undefined : /^url\(#([^)]+)\)$/.exec(value)?.[1];

export const parseNumber = (value: string | undefined, attribute: string, fallback?: number) => {
  if (value === undefined) return fallback ?? fail(`${attribute} is required`);
  const number = Number(value.trim());
  if (value.trim() === '' || !Number.isFinite(number)) {
    return fail(`${attribute}="${value}" is not a plain number`);
  }
  return number;
};

export const parseUnitInterval = (value: string | undefined, attribute: string) =>
  Math.min(1, Math.max(0, parseNumber(value, attribute, 1)));

/** `offset=".5"` or `offset="50%"` as a number in [0, 1]. */
export const parseOffset = (value: string | undefined) => {
  if (value === undefined) return 0;
  const percent = value.trim().endsWith('%');
  const number = parseNumber(percent ? value.trim().slice(0, -1) : value, 'offset');
  return Math.min(1, Math.max(0, percent ? number / 100 : number));
};

export const parseViewBox = (svg: XastElement) => {
  const viewBox = (svg.attributes.viewBox ?? fail('the <svg> has no viewBox'))
    .trim()
    .split(/[\s,]+/)
    .map((value) => parseNumber(value, 'viewBox'));
  if (viewBox.length !== 4 || viewBox[2] <= 0 || viewBox[3] <= 0) {
    fail(`viewBox="${svg.attributes.viewBox}" is not a positive box`);
  }
  return viewBox as [number, number, number, number];
};

/** `style="mix-blend-mode:screen"` -> `{ 'mix-blend-mode': 'screen' }`, allowing only `allowed`. */
export function parseStyle(element: XastElement, allowed: readonly string[]) {
  const declarations: Record<string, string> = {};
  for (const declaration of (element.attributes.style ?? '').split(';')) {
    if (!declaration.trim()) continue;
    const [property, value] = declaration.split(':').map((part) => part.trim());
    if (!allowed.includes(property) || !value) {
      fail(`style "${declaration.trim()}" on <${element.name}> is not supported`);
    }
    declarations[property] = value;
  }
  return declarations;
}

export const shapeElements = ['path', 'circle', 'ellipse', 'rect', 'line', 'polygon', 'polyline'];

const geometryAttributes: Record<string, string[]> = {
  path: ['d'],
  circle: ['cx', 'cy', 'r'],
  ellipse: ['cx', 'cy', 'rx', 'ry'],
  rect: ['x', 'y', 'width', 'height', 'rx', 'ry'],
  line: ['x1', 'y1', 'x2', 'y2'],
  polygon: ['points'],
  polyline: ['points'],
};

const arc = (rx: number, ry: number, x: number, y: number) => `A${rx} ${ry} 0 0 1 ${x} ${y}`;

/** The path a basic shape is equivalent to, per the SVG spec; undefined when it renders nothing. */
export function shapeToPath(element: XastElement): string | undefined {
  const { attributes } = element;
  const number = (name: string, fallback?: number) =>
    parseNumber(attributes[name], `${element.name} ${name}`, fallback);
  switch (element.name) {
    case 'path':
      return attributes.d?.trim() ? attributes.d : undefined;
    case 'circle':
    case 'ellipse': {
      const [cx, cy] = [number('cx', 0), number('cy', 0)];
      const rx = element.name === 'circle' ? number('r', 0) : number('rx', 0);
      const ry = element.name === 'circle' ? rx : number('ry', 0);
      if (rx <= 0 || ry <= 0) return undefined;
      return [
        `M${cx + rx} ${cy}`,
        arc(rx, ry, cx, cy + ry),
        arc(rx, ry, cx - rx, cy),
        arc(rx, ry, cx, cy - ry),
        arc(rx, ry, cx + rx, cy),
        'Z',
      ].join('');
    }
    case 'rect': {
      const [x, y, width, height] = [
        number('x', 0),
        number('y', 0),
        number('width', 0),
        number('height', 0),
      ];
      if (width <= 0 || height <= 0) return undefined;
      const rawRx = attributes.rx === undefined ? undefined : number('rx');
      const rawRy = attributes.ry === undefined ? undefined : number('ry');
      const rx = Math.min(Math.max(0, rawRx ?? rawRy ?? 0), width / 2);
      const ry = Math.min(Math.max(0, rawRy ?? rawRx ?? 0), height / 2);
      if (rx === 0 || ry === 0) return `M${x} ${y}H${x + width}V${y + height}H${x}Z`;
      return [
        `M${x + rx} ${y}`,
        `H${x + width - rx}`,
        arc(rx, ry, x + width, y + ry),
        `V${y + height - ry}`,
        arc(rx, ry, x + width - rx, y + height),
        `H${x + rx}`,
        arc(rx, ry, x, y + height - ry),
        `V${y + ry}`,
        arc(rx, ry, x + rx, y),
        'Z',
      ].join('');
    }
    case 'line':
      return `M${number('x1', 0)} ${number('y1', 0)}L${number('x2', 0)} ${number('y2', 0)}`;
    case 'polygon':
    case 'polyline': {
      const values = (attributes.points ?? '')
        .trim()
        .split(/[\s,]+/)
        .filter(Boolean)
        .map(Number);
      if (values.length < 4 || values.length % 2 || values.some(Number.isNaN)) return undefined;
      const [first, ...rest] = Array.from(
        { length: values.length / 2 },
        (_, index) => `${values[index * 2]} ${values[index * 2 + 1]}`,
      );
      return `M${first}${rest.map((point) => `L${point}`).join('')}${element.name === 'polygon' ? 'Z' : ''}`;
    }
    default:
      return fail(`<${element.name}> is not a shape`);
  }
}

/**
 * Parses with svgo, which the sync already depends on, and runs `transform` on the `<svg>` root
 * before svgo prints the document again. Returns the printed SVG.
 */
export function transformSvg(svg: string, transform: (root: XastElement) => void) {
  return optimize(svg, {
    plugins: [
      {
        name: 'transformNativeSvg',
        fn: (root: XastRoot) => {
          const element = root.children.find(
            (child): child is XastElement => child.type === 'element' && child.name === 'svg',
          );
          transform(element ?? fail('the document has no <svg> root element'));
          return {};
        },
      },
    ],
  }).data;
}

// ---------------------------------------------------------------------------------------------
// Validation: what either renderer can express, once the rewrites below have run

/** Presentation attributes the renderers honor, all inherited the CSS way. */
export const inheritedAttributes = [
  'fill',
  'fill-rule',
  'fill-opacity',
  'stroke',
  'stroke-width',
  'stroke-opacity',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-dasharray',
  'clip-rule',
];

const renderedAttributes = [...inheritedAttributes, 'opacity', 'transform', 'clip-path', 'style'];

const allowedAttributes: Record<string, string[]> = {
  svg: ['xmlns', 'viewBox', 'width', 'height', ...inheritedAttributes],
  g: renderedAttributes,
  defs: [],
  clipPath: ['clipPathUnits'],
  linearGradient: ['x1', 'y1', 'x2', 'y2', 'gradientUnits', 'spreadMethod'],
  stop: ['offset', 'stop-color', 'stop-opacity'],
  ...Object.fromEntries(
    Object.entries(geometryAttributes).map(([name, geometry]) => [
      name,
      [...geometry, ...renderedAttributes],
    ]),
  ),
};

const keywords: Record<string, string[]> = {
  'fill-rule': ['nonzero', 'evenodd'],
  'clip-rule': ['nonzero', 'evenodd'],
  'stroke-linecap': ['butt', 'round', 'square'],
  'stroke-linejoin': ['miter', 'round', 'bevel'],
};

const hexColor = /^#[0-9A-F]{6}$/;

/** A color attribute as `optimizeSvg` guarantees it: 6-digit hex, `none`, or a gradient reference. */
const checkPaint = (attribute: string, value: string, gradients: Set<string>) => {
  const reference = urlReference(value);
  if (reference !== undefined) {
    if (!gradients.has(reference)) fail(`${attribute}="${value}" references no <linearGradient>`);
  } else if (value !== 'none' && !hexColor.test(value)) {
    fail(`${attribute}="${value}" is not a 6-digit hex color`);
  }
};

/**
 * Whether `value` is a list of SVG transform functions with numeric arguments. Tokenized rather
 * than matched with one anchored regular expression, whose nested repetition backtracked
 * exponentially on a malformed tail.
 */
const isTransformList = (value: string) => {
  let functions = 0;
  const rest = value.replace(
    /(matrix|translate|scale|rotate|skewX|skewY)\s*\(([^()]*)\)/g,
    (_match, _name, argumentList: string) => {
      functions += 1;
      return /^[-+.\deE\s,]*$/.test(argumentList) ? '' : '\u0000';
    },
  );
  return functions > 0 && /^[\s,]*$/.test(rest);
};

type Definitions = { clipPaths: Set<string>; gradients: Set<string> };

function validateElement(element: XastElement, definitions: Definitions) {
  const allowed = allowedAttributes[element.name] ?? fail(`<${element.name}> is not supported`);
  const { attributes } = element;
  for (const attribute of Object.keys(attributes)) {
    if (attribute !== 'id' && !allowed.includes(attribute)) {
      fail(`${attribute} on <${element.name}> is not supported`);
    }
  }
  for (const child of element.children) {
    if (child.type === 'text' && child.value.trim()) fail(`text content in <${element.name}>`);
    if (child.type === 'cdata') fail(`CDATA in <${element.name}>`);
  }
  parseStyle(element, []);

  for (const attribute of ['fill', 'stroke', 'stop-color']) {
    if (attributes[attribute] !== undefined) {
      checkPaint(attribute, attributes[attribute], definitions.gradients);
    }
  }
  for (const [attribute, values] of Object.entries(keywords)) {
    if (attributes[attribute] !== undefined && !values.includes(attributes[attribute])) {
      fail(`${attribute}="${attributes[attribute]}" is not supported`);
    }
  }
  for (const attribute of ['fill-opacity', 'stroke-opacity', 'opacity', 'stop-opacity']) {
    if (attributes[attribute] !== undefined) parseNumber(attributes[attribute], attribute);
  }
  if (attributes.transform !== undefined && !isTransformList(attributes.transform)) {
    fail(`transform="${attributes.transform}" is not supported`);
  }
  const clipPath = urlReference(attributes['clip-path']);
  if (attributes['clip-path'] !== undefined && !definitions.clipPaths.has(clipPath ?? '')) {
    fail(`clip-path="${attributes['clip-path']}" references no <clipPath>`);
  }

  switch (element.name) {
    case 'clipPath':
      if (attributes.clipPathUnits !== undefined && attributes.clipPathUnits !== 'userSpaceOnUse') {
        fail(`clipPathUnits="${attributes.clipPathUnits}" is not supported`);
      }
      validateClipShape(element);
      break;
    case 'linearGradient':
      validateGradient(element);
      break;
    case 'stop':
      break;
    default:
      for (const child of childElements(element)) validateElement(child, definitions);
  }
}

/** A clip path is one shape without transform, which is what both renderers can intersect with. */
function validateClipShape(clipPath: XastElement) {
  const shapes = childElements(clipPath);
  if (shapes.length !== 1 || !shapeElements.includes(shapes[0].name)) {
    fail('a <clipPath> must contain exactly one shape');
  }
  const [shape] = shapes;
  for (const attribute of Object.keys(shape.attributes)) {
    if (
      !['id', 'fill', 'fill-rule', 'clip-rule', ...geometryAttributes[shape.name]].includes(
        attribute,
      )
    ) {
      fail(`${attribute} on a <clipPath> shape is not supported`);
    }
  }
  shapeToPath(shape);
}

function validateGradient(gradient: XastElement) {
  const { attributes } = gradient;
  if (attributes.gradientUnits !== 'userSpaceOnUse') {
    fail('a <linearGradient> must use gradientUnits="userSpaceOnUse"');
  }
  if (attributes.spreadMethod !== undefined && attributes.spreadMethod !== 'pad') {
    fail(`spreadMethod="${attributes.spreadMethod}" is not supported`);
  }
  for (const attribute of ['x1', 'y1', 'x2', 'y2']) parseNumber(attributes[attribute], attribute);
  const stops = childElements(gradient);
  if (stops.length < 2 || stops.some((stop) => stop.name !== 'stop')) {
    fail('a <linearGradient> needs at least two <stop>s and nothing else');
  }
  let previous = 0;
  for (const stop of stops) {
    const offset = parseOffset(stop.attributes.offset);
    if (offset < previous) fail('<stop> offsets must not decrease');
    previous = offset;
    if (!hexColor.test(stop.attributes['stop-color'] ?? '')) {
      fail('every <stop> needs a 6-digit hex stop-color');
    }
  }
}

// ---------------------------------------------------------------------------------------------
// Rewrites

/** Indexes `id` -> element below `root`, failing on duplicates. */
function indexIds(root: XastElement, byId = new Map<string, XastElement>()) {
  for (const child of childElements(root)) {
    const id = child.attributes.id;
    if (id !== undefined) {
      if (byId.has(id)) fail(`id "${id}" is used twice`);
      byId.set(id, child);
    }
    indexIds(child, byId);
  }
  return byId;
}

/** Every element below `root` whose `attribute` references `#id`. */
function referrers(root: XastElement, attribute: string, id: string): XastElement[] {
  return childElements(root).flatMap((child) => [
    ...(urlReference(child.attributes[attribute]) === id ? [child] : []),
    ...referrers(child, attribute, id),
  ]);
}

/** The element whose `children` holds `element`. */
function parentOf(root: XastElement, element: XastElement): XastElement | undefined {
  for (const child of childElements(root)) {
    if (child === element) return root;
    const parent = parentOf(child, element);
    if (parent) return parent;
  }
  return undefined;
}

const pathElement = (attributes: Record<string, string>): XastElement => ({
  type: 'element',
  name: 'path',
  attributes,
  children: [],
});

/** Every element below `root`, depth first. */
const descendants = (root: XastElement): XastElement[] =>
  childElements(root).flatMap((child) => [child, ...descendants(child)]);

const hrefOf = (use: XastElement) => use.attributes.href ?? use.attributes['xlink:href'];

/**
 * Replaces every `<use>` of a shape with a copy of that shape. svgo's `reusePaths` (in
 * `preset-default`) turns repeated identical paths into one `<path>` in `<defs>` and `<use>`
 * elements referring to it, which vector drawables cannot express. The copy is what the `<use>`
 * renders: attributes on the `<use>` apply where the shape does not set them, as SVG inheritance
 * would. A positioned or transformed `<use>`, or one of anything but a plain shape, fails. The
 * shapes left in `<defs>`, the empty `<defs>` and the `xlink` namespace are removed afterwards.
 */
function inlineUses(svg: XastElement, byId: Map<string, XastElement>) {
  for (const use of descendants(svg).filter((element) => element.name === 'use')) {
    const href = hrefOf(use) ?? fail('<use> without an href is not supported');
    const target =
      (href.startsWith('#') ? byId.get(href.slice(1)) : undefined) ??
      fail(`<use> references no element "${href}"`);
    if (!shapeElements.includes(target.name)) fail(`<use> of <${target.name}> is not supported`);
    const copy: XastElement = { ...target, attributes: { ...target.attributes }, children: [] };
    delete copy.attributes.id;
    for (const [attribute, value] of Object.entries(use.attributes)) {
      if (attribute === 'href' || attribute === 'xlink:href') continue;
      if (['x', 'y', 'width', 'height', 'transform'].includes(attribute)) {
        fail(`${attribute} on <use> is not supported`);
      }
      copy.attributes[attribute] ??= value;
    }
    const parent = parentOf(svg, use) ?? fail('<use> has no parent');
    parent.children.splice(parent.children.indexOf(use), 1, copy);
  }
  for (const defs of childElements(svg).filter((element) => element.name === 'defs')) {
    defs.children = defs.children.filter(
      (child) => child.type !== 'element' || !shapeElements.includes(child.name),
    );
    if (defs.children.length === 0) svg.children.splice(svg.children.indexOf(defs), 1);
  }
  delete svg.attributes['xmlns:xlink'];
}

const maskAttributes = [
  'x',
  'y',
  'width',
  'height',
  'maskUnits',
  'maskContentUnits',
  'style',
  'fill',
];

/**
 * Rewrites every `<mask>` as a `<clipPath>`. Only masks that are equivalent to a clip qualify: one
 * shape, fully opaque, unstroked, untransformed, and white if it is a luminance mask (Figma exports
 * masks from both `buy` and `stressTestedColdStorage` this way). A `userSpaceOnUse` mask region
 * also clips: it becomes a second, rectangular clip around the masked element. Anything else fails.
 */
function rewriteMasks(svg: XastElement, byId: Map<string, XastElement>) {
  for (const [id, mask] of byId) {
    if (mask.name !== 'mask') continue;
    const { attributes } = mask;
    for (const attribute of Object.keys(attributes)) {
      if (attribute !== 'id' && !maskAttributes.includes(attribute)) {
        fail(`${attribute} on <mask> is not supported`);
      }
    }
    if (
      attributes.maskContentUnits !== undefined &&
      attributes.maskContentUnits !== 'userSpaceOnUse'
    ) {
      fail(`maskContentUnits="${attributes.maskContentUnits}" is not supported`);
    }
    const maskType = parseStyle(mask, ['mask-type'])['mask-type'] ?? 'luminance';
    if (!['luminance', 'alpha'].includes(maskType)) fail(`mask-type:${maskType} is not supported`);

    const shapes = childElements(mask);
    if (shapes.length !== 1 || !shapeElements.includes(shapes[0].name)) {
      fail('a <mask> must contain exactly one shape to be drawn as a clip');
    }
    const [shape] = shapes;
    for (const attribute of Object.keys(shape.attributes)) {
      if (
        !['fill', 'fill-rule', 'clip-rule', ...geometryAttributes[shape.name]].includes(attribute)
      ) {
        fail(
          `${attribute} on a <mask> shape is not supported; only an opaque shape can become a clip`,
        );
      }
    }
    const fill = shape.attributes.fill ?? attributes.fill ?? '#000000';
    if (fill === 'none' || !hexColor.test(fill))
      fail(`a <mask> shape filled "${fill}" cannot become a clip`);
    if (maskType === 'luminance' && fill !== '#FFFFFF') {
      fail(
        `a luminance <mask> shape filled ${fill} is not fully opaque; only white can become a clip`,
      );
    }
    const d = shapeToPath(shape) ?? fail('the <mask> shape renders nothing');
    const clipRule = shape.attributes['clip-rule'] ?? shape.attributes['fill-rule'];

    const masked = referrers(svg, 'mask', id);
    if (!masked.length) fail(`<mask id="${id}"> is never used`);

    // The mask element becomes the clip path, in place, keeping its id and so its references.
    mask.name = 'clipPath';
    mask.attributes = { id };
    mask.children = [pathElement({ d, ...(clipRule && { 'clip-rule': clipRule }) })];
    for (const element of masked) {
      element.attributes['clip-path'] = `url(#${id})`;
      delete element.attributes.mask;
    }

    const regionAttributes = ['x', 'y', 'width', 'height'];
    if (regionAttributes.some((attribute) => attributes[attribute] !== undefined)) {
      if (attributes.maskUnits !== 'userSpaceOnUse') {
        fail('a <mask> region is only supported with maskUnits="userSpaceOnUse"');
      }
      const [x, y, width, height] = regionAttributes.map((attribute) =>
        parseNumber(attributes[attribute], `mask ${attribute}`),
      );
      const regionId = `${id}-region`;
      if (byId.has(regionId)) fail(`id "${regionId}" is already used`);
      const definitions = parentOf(svg, mask) as XastElement;
      definitions.children.splice(definitions.children.indexOf(mask) + 1, 0, {
        type: 'element',
        name: 'clipPath',
        attributes: { id: regionId },
        children: [pathElement({ d: `M${x} ${y}h${width}v${height}H${x}z` })],
      });
      for (const element of masked) {
        const parent = parentOf(svg, element) as XastElement;
        parent.children[parent.children.indexOf(element)] = {
          type: 'element',
          name: 'g',
          attributes: { 'clip-path': `url(#${regionId})` },
          children: [element],
        };
      }
    }
  }
}

/** Drops `mix-blend-mode:screen`, the one blend the library uses, per the approximation list. */
function dropBlendModes(
  element: XastElement,
  illustration: Pick<Illustration, 'type' | 'name'>,
  applied: Set<ApproximatedFeature>,
) {
  const blend = parseStyle(element, ['mix-blend-mode'])['mix-blend-mode'];
  if (blend !== undefined) {
    if (blend !== 'normal' && blend !== 'screen') fail(`mix-blend-mode:${blend} is not supported`);
    if (blend === 'screen') {
      requireApproximation(illustration, nativePlatforms, 'mix-blend-mode', 'a `screen` blend');
      applied.add('mix-blend-mode');
    }
    delete element.attributes.style;
  }
  for (const child of childElements(element)) dropBlendModes(child, illustration, applied);
}

// ---------------------------------------------------------------------------------------------
// Entry point

export type NativeSvg = {
  /** The light SVG with masks rewritten as clips and listed approximations applied. */
  light: string;
  /** `palette.toDarkSvg(light)`. */
  dark: string;
  /** The approximations applied to both platforms, for `assertApproximationsApplied`. */
  approximated: ReadonlySet<ApproximatedFeature>;
};

export type ToNativeSvgOptions = {
  /** Deep link to the component, included in errors so the fix starts in the right place. */
  componentUrl?: string;
};

/**
 * Prepares the optimized light SVG of an illustration for the native renderers, or fails naming
 * the illustration, the reason and its Figma node.
 */
export function toNativeSvg(
  illustration: Illustration,
  lightSvg: string,
  palette: ColorPalette,
  { componentUrl }: ToNativeSvgOptions = {},
): NativeSvg {
  const applied = new Set<ApproximatedFeature>();
  try {
    const light = transformSvg(lightSvg, (svg) => {
      parseViewBox(svg);
      inlineUses(svg, indexIds(svg));
      rewriteMasks(svg, indexIds(svg));
      dropBlendModes(svg, illustration, applied);
      const byId = [...indexIds(svg)];
      validateElement(svg, {
        clipPaths: new Set(byId.filter(([, e]) => e.name === 'clipPath').map(([id]) => id)),
        gradients: new Set(byId.filter(([, e]) => e.name === 'linearGradient').map(([id]) => id)),
      });
    });
    return { light, dark: palette.toDarkSvg(light), approximated: applied };
  } catch (error) {
    throw new Error(
      `${illustrationKey(illustration)} cannot be exported to the native packages.\n` +
        `  Reason: ${error instanceof Error ? error.message : String(error)}` +
        (componentUrl ? `\n  Fix it in Figma: ${componentUrl}` : ''),
      { cause: error },
    );
  }
}
