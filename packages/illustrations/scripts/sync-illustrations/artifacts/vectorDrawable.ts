import type { XastElement } from 'svgo/lib/types';

import type { Illustration } from '../illustration';

import {
  type ApproximatedFeature,
  childElements,
  fail,
  parseNumber,
  parseOffset,
  parseStyle,
  parseUnitInterval,
  parseViewBox,
  requireApproximation,
  shapeElements,
  shapeToPath,
  transformSvg,
  urlReference,
} from './nativeSvg';

/**
 * Converts an SVG prepared by `toNativeSvg` into an Android vector drawable. The drawable format is
 * a strict subset of SVG, so the walk maps what it can one to one (paths, clips, linear gradients,
 * fill rules, strokes), expresses the rest with what the format has (shapes become path data,
 * transforms become `<group>` attributes, group opacity folds into each shape) and fails on
 * anything it cannot express, naming the construct. Dashes and multi-shape group opacity are
 * approximations and need an entry on the approximation list.
 *
 * https://developer.android.com/reference/android/graphics/drawable/VectorDrawable
 */

export type VectorDrawable = {
  /** The `<vector>` element, pretty-printed, without XML declaration or header comment. */
  xml: string;
  /** The approximations the conversion needed, for `assertApproximationsApplied`. */
  approximated: ReadonlySet<ApproximatedFeature>;
};

/**
 * The longest `android:pathData` a drawable may carry. aapt2 stores resource strings in a pool
 * whose UTF-8 entries are capped at 0x7FFF bytes; longer path data has crashed Compose at load
 * (`androidNotExportableList`). The longest path in the shipping library is 30,006 characters.
 */
export const MAX_PATH_DATA = 0x7fff;

const checkedPathData = (pathData: string) =>
  pathData.length > MAX_PATH_DATA
    ? fail(
        `a path of ${pathData.length} characters exceeds Android's ${MAX_PATH_DATA}-character resource string limit`,
      )
    : pathData;

export function toVectorDrawable(
  svg: string,
  illustration: Pick<Illustration, 'type' | 'name'>,
): VectorDrawable {
  const approximated = new Set<ApproximatedFeature>();
  let xml = '';
  transformSvg(svg, (root) => {
    xml = new VectorDrawableWriter(root, illustration, approximated).write();
  });
  return { xml, approximated };
}

// ---------------------------------------------------------------------------------------------
// XML printing

const indentUnit = '    ';

type XmlNode = { name: string; attributes: Record<string, string>; children: XmlNode[] };

const escapeAttribute = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

/** One attribute per line when there are several, Android Studio style. */
function printXml({ name, attributes, children }: XmlNode, depth = 0): string {
  const indent = indentUnit.repeat(depth);
  const entries = Object.entries(attributes).map(
    ([key, value]) => `${key}="${escapeAttribute(value)}"`,
  );
  const open =
    entries.length <= 1
      ? `${indent}<${name}${entries.length ? ` ${entries[0]}` : ''}`
      : `${indent}<${name}\n${entries.map((entry) => `${indent}${indentUnit}${entry}`).join('\n')}`;
  if (!children.length) return `${open} />`;
  return `${open}>\n${children.map((child) => printXml(child, depth + 1)).join('\n')}\n${indent}</${name}>`;
}

/** Three decimals: sub-pixel even for a 240-unit hero rendered at 4x. */
const formatNumber = (value: number) => {
  const rounded = Math.round(value * 1000) / 1000;
  return Object.is(rounded, -0) ? '0' : String(rounded);
};

const epsilon = 1e-6;

// ---------------------------------------------------------------------------------------------
// Transforms: a `transform` attribute becomes `<group>` attributes

/** The SVG matrix `[a c e; b d f]`. */
type Affine = [a: number, b: number, c: number, d: number, e: number, f: number];

const identity: Affine = [1, 0, 0, 1, 0, 0];

const multiply = ([a, b, c, d, e, f]: Affine, [a2, b2, c2, d2, e2, f2]: Affine): Affine => [
  a * a2 + c * b2,
  b * a2 + d * b2,
  a * c2 + c * d2,
  b * c2 + d * d2,
  a * e2 + c * f2 + e,
  b * e2 + d * f2 + f,
];

const radians = (degrees: number) => (degrees * Math.PI) / 180;

/** The matrix of an SVG transform list, applied left to right as the spec defines. */
function parseTransform(transform: string): Affine {
  let matrix = identity;
  for (const [, name, argumentList] of transform.matchAll(/(\w+)\s*\(([^)]*)\)/g)) {
    const args = argumentList
      .trim()
      .split(/[\s,]+/)
      .filter(Boolean)
      .map((value) => parseNumber(value, `transform ${name}`));
    const [first = 0, second, third] = args;
    let step: Affine;
    switch (name) {
      case 'matrix':
        if (args.length !== 6) fail(`transform matrix() needs six numbers`);
        step = args as Affine;
        break;
      case 'translate':
        step = [1, 0, 0, 1, first, second ?? 0];
        break;
      case 'scale':
        step = [first, 0, 0, second ?? first, 0, 0];
        break;
      case 'rotate': {
        const [cos, sin] = [Math.cos(radians(first)), Math.sin(radians(first))];
        step = [cos, sin, -sin, cos, 0, 0];
        if (second !== undefined) {
          const [cx, cy] = [second, third ?? 0];
          step = multiply(multiply([1, 0, 0, 1, cx, cy], step), [1, 0, 0, 1, -cx, -cy]);
        }
        break;
      }
      default:
        step = fail(`transform ${name}() cannot be expressed as a <group>`);
    }
    matrix = multiply(matrix, step);
  }
  return matrix;
}

/**
 * `<group>` attributes equivalent to the transform, which a vector drawable applies as
 * translate · rotate · scale about a pivot at the origin. Every matrix without skew decomposes
 * this way, which covers everything Figma exports (rotations, reflections, translations).
 */
function groupTransformAttributes(transform: string) {
  const [a, b, c, d, e, f] = parseTransform(transform);
  const rotation = Math.atan2(b, a);
  const [cos, sin] = [Math.cos(rotation), Math.sin(rotation)];
  const scaleX = cos * a + sin * b;
  const scaleY = -sin * c + cos * d;
  const skew = cos * c + sin * d;
  if (Math.abs(skew) > epsilon * Math.max(1, Math.abs(scaleX), Math.abs(scaleY))) {
    fail(`transform="${transform}" skews, which a <group> cannot express`);
  }
  const attributes: Record<string, string> = {};
  const degrees = (rotation * 180) / Math.PI;
  if (Math.abs(degrees) > epsilon) attributes['android:rotation'] = formatNumber(degrees);
  if (Math.abs(scaleX - 1) > epsilon) attributes['android:scaleX'] = formatNumber(scaleX);
  if (Math.abs(scaleY - 1) > epsilon) attributes['android:scaleY'] = formatNumber(scaleY);
  if (Math.abs(e) > epsilon) attributes['android:translateX'] = formatNumber(e);
  if (Math.abs(f) > epsilon) attributes['android:translateY'] = formatNumber(f);
  return attributes;
}

// ---------------------------------------------------------------------------------------------
// The document walk

/** Presentation attributes the drawable carries, inherited the CSS way. */
type Style = {
  fill: string;
  fillRule: string;
  fillOpacity: number;
  stroke: string;
  strokeWidth: number;
  strokeOpacity: number;
  strokeLinecap: string;
  strokeLinejoin: string;
  strokeMiterlimit: number;
  strokeDasharray: string;
  clipRule: string;
};

const initialStyle: Style = {
  fill: '#000000',
  fillRule: 'nonzero',
  fillOpacity: 1,
  stroke: 'none',
  strokeWidth: 1,
  strokeOpacity: 1,
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter',
  strokeMiterlimit: 4,
  strokeDasharray: 'none',
  clipRule: 'nonzero',
};

function inheritStyle(parent: Style, attributes: Record<string, string>): Style {
  const style = { ...parent };
  const value = (name: string) => attributes[name];
  if (value('fill') !== undefined) style.fill = value('fill');
  if (value('fill-rule') !== undefined) style.fillRule = value('fill-rule');
  if (value('fill-opacity') !== undefined) {
    style.fillOpacity = parseUnitInterval(value('fill-opacity'), 'fill-opacity');
  }
  if (value('stroke') !== undefined) style.stroke = value('stroke');
  if (value('stroke-width') !== undefined) {
    style.strokeWidth = parseNumber(value('stroke-width'), 'stroke-width');
  }
  if (value('stroke-opacity') !== undefined) {
    style.strokeOpacity = parseUnitInterval(value('stroke-opacity'), 'stroke-opacity');
  }
  if (value('stroke-linecap') !== undefined) style.strokeLinecap = value('stroke-linecap');
  if (value('stroke-linejoin') !== undefined) style.strokeLinejoin = value('stroke-linejoin');
  if (value('stroke-miterlimit') !== undefined) {
    style.strokeMiterlimit = parseNumber(value('stroke-miterlimit'), 'stroke-miterlimit');
  }
  if (value('stroke-dasharray') !== undefined) style.strokeDasharray = value('stroke-dasharray');
  if (value('clip-rule') !== undefined) style.clipRule = value('clip-rule');
  return style;
}

type Context = {
  style: Style;
  /** Product of every ancestor group's `opacity`, folded into each shape's fill and stroke alpha. */
  opacity: number;
};

const fillType = (rule: string) => (rule === 'evenodd' ? 'evenOdd' : undefined);

const alphaHex = (opacity: number) =>
  Math.round(opacity * 255)
    .toString(16)
    .toUpperCase()
    .padStart(2, '0');

class VectorDrawableWriter {
  private readonly byId = new Map<string, XastElement>();
  private usesGradients = false;
  private readonly svg: XastElement;
  private readonly illustration: Pick<Illustration, 'type' | 'name'>;
  private readonly approximated: Set<ApproximatedFeature>;

  constructor(
    svg: XastElement,
    illustration: Pick<Illustration, 'type' | 'name'>,
    approximated: Set<ApproximatedFeature>,
  ) {
    this.svg = svg;
    this.illustration = illustration;
    this.approximated = approximated;
  }

  write() {
    this.index(this.svg);
    const [minX, minY, width, height] = parseViewBox(this.svg);
    const context: Context = { style: inheritStyle(initialStyle, this.svg.attributes), opacity: 1 };
    let children = childElements(this.svg).flatMap((child) => this.render(child, context));
    if (minX !== 0 || minY !== 0) {
      children = [
        {
          name: 'group',
          attributes: {
            'android:translateX': formatNumber(-minX),
            'android:translateY': formatNumber(-minY),
          },
          children,
        },
      ];
    }
    return printXml({
      name: 'vector',
      attributes: {
        'xmlns:android': 'http://schemas.android.com/apk/res/android',
        ...(this.usesGradients && { 'xmlns:aapt': 'http://schemas.android.com/aapt' }),
        'xmlns:tools': 'http://schemas.android.com/tools',
        'android:width': `${formatNumber(width)}dp`,
        'android:height': `${formatNumber(height)}dp`,
        'android:viewportWidth': formatNumber(width),
        'android:viewportHeight': formatNumber(height),
        // Several illustrations exceed lint's size and path-length advice by design.
        'tools:ignore': 'VectorRaster,VectorPath',
      },
      children,
    });
  }

  private index(element: XastElement) {
    for (const child of childElements(element)) {
      if (child.attributes.id !== undefined) this.byId.set(child.attributes.id, child);
      this.index(child);
    }
  }

  private render(element: XastElement, parent: Context): XmlNode[] {
    // Definitions render only where they are referenced.
    if (['defs', 'clipPath', 'linearGradient'].includes(element.name)) return [];
    if (element.name !== 'g' && !shapeElements.includes(element.name)) {
      fail(`<${element.name}> is not supported`);
    }
    parseStyle(element, []);

    const { attributes } = element;
    const ownOpacity = parseUnitInterval(attributes.opacity, 'opacity');
    const context: Context = {
      style: inheritStyle(parent.style, attributes),
      opacity: parent.opacity * (element.name === 'g' ? ownOpacity : 1),
    };

    let nodes: XmlNode[];
    if (element.name === 'g') {
      const shapes = childElements(element).flatMap((child) => this.render(child, context));
      if (ownOpacity < 1 && shapes.length > 1) {
        requireApproximation(
          this.illustration,
          ['android'],
          'group-opacity',
          `a group of ${shapes.length} shapes with opacity ${attributes.opacity}`,
        );
        this.approximated.add('group-opacity');
      }
      nodes = shapes;
    } else {
      nodes = this.renderShape(element, context, ownOpacity);
    }

    const clipPath = urlReference(attributes['clip-path']);
    if (attributes.transform === undefined && clipPath === undefined) return nodes;
    if (!nodes.length) return [];
    return [
      {
        name: 'group',
        attributes: attributes.transform ? groupTransformAttributes(attributes.transform) : {},
        children: [...(clipPath ? [this.clipPath(clipPath)] : []), ...nodes],
      },
    ];
  }

  private clipPath(id: string): XmlNode {
    const clipPath = this.byId.get(id) ?? fail(`clip-path="url(#${id})" references nothing`);
    const [shape] = childElements(clipPath);
    const rule = shape.attributes['clip-rule'] ?? 'nonzero';
    return {
      name: 'clip-path',
      attributes: {
        'android:pathData': checkedPathData(
          shapeToPath(shape) ?? fail('a clip shape renders nothing'),
        ),
        ...(fillType(rule) && { 'android:fillType': fillType(rule) }),
      },
      children: [],
    };
  }

  private renderShape(element: XastElement, { style, opacity }: Context, ownOpacity: number) {
    const pathData = shapeToPath(element);
    const filled = style.fill !== 'none';
    const stroked = style.stroke !== 'none' && style.strokeWidth > 0;
    if (pathData === undefined || (!filled && !stroked)) return [];

    if (ownOpacity < 1 && filled && stroked) {
      requireApproximation(
        this.illustration,
        ['android'],
        'shape-opacity',
        `a filled and stroked shape with opacity ${element.attributes.opacity}`,
      );
      this.approximated.add('shape-opacity');
    }
    if (stroked && style.strokeDasharray !== 'none') {
      requireApproximation(
        this.illustration,
        ['android'],
        'stroke-dasharray',
        `a dashed stroke (stroke-dasharray="${style.strokeDasharray}")`,
      );
      this.approximated.add('stroke-dasharray');
    }

    const attributes: Record<string, string> = { 'android:pathData': checkedPathData(pathData) };
    const children: XmlNode[] = [];
    const paint = (attribute: 'fillColor' | 'strokeColor', value: string) => {
      const gradient = urlReference(value);
      if (gradient === undefined) {
        attributes[`android:${attribute}`] = value;
      } else {
        children.push({
          name: 'aapt:attr',
          attributes: { name: `android:${attribute}` },
          children: [this.gradient(gradient)],
        });
      }
    };

    if (filled) {
      paint('fillColor', style.fill);
      const alpha = style.fillOpacity * opacity * ownOpacity;
      if (alpha < 1) attributes['android:fillAlpha'] = formatNumber(alpha);
      if (fillType(style.fillRule)) attributes['android:fillType'] = 'evenOdd';
    }
    if (stroked) {
      paint('strokeColor', style.stroke);
      attributes['android:strokeWidth'] = formatNumber(style.strokeWidth);
      const alpha = style.strokeOpacity * opacity * ownOpacity;
      if (alpha < 1) attributes['android:strokeAlpha'] = formatNumber(alpha);
      if (style.strokeLinecap !== 'butt') attributes['android:strokeLineCap'] = style.strokeLinecap;
      if (style.strokeLinejoin !== 'miter') {
        attributes['android:strokeLineJoin'] = style.strokeLinejoin;
      }
      if (style.strokeMiterlimit !== 4) {
        attributes['android:strokeMiterLimit'] = formatNumber(style.strokeMiterlimit);
      }
    }
    return [{ name: 'path', attributes, children }];
  }

  /** An inline `<gradient>`; `toNativeSvg` already checked units, spread, stops and colors. */
  private gradient(id: string): XmlNode {
    const gradient = this.byId.get(id) ?? fail(`url(#${id}) references nothing`);
    this.usesGradients = true;
    const { attributes } = gradient;
    return {
      name: 'gradient',
      attributes: {
        'android:type': 'linear',
        'android:startX': formatNumber(parseNumber(attributes.x1, 'x1')),
        'android:startY': formatNumber(parseNumber(attributes.y1, 'y1')),
        'android:endX': formatNumber(parseNumber(attributes.x2, 'x2')),
        'android:endY': formatNumber(parseNumber(attributes.y2, 'y2')),
      },
      children: childElements(gradient).map((stop) => ({
        name: 'item',
        attributes: {
          'android:offset': formatNumber(parseOffset(stop.attributes.offset)),
          'android:color': `#${alphaHex(parseUnitInterval(stop.attributes['stop-opacity'], 'stop-opacity'))}${stop.attributes['stop-color'].slice(1)}`,
        },
        children: [],
      })),
    };
  }
}
