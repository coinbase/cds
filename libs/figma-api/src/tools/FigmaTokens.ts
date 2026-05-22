import type { GetFileResponse, Node, Paint, TypeStyle } from '@figma/rest-api-spec';

import { getFile } from '../getFile';

import { figmaColorToRgba } from './figmaColorToRgba';

type ParsedStyleType = 'fill' | 'fillGradient' | 'stroke' | 'strokeGradient' | 'typography';

type ParsedStyle<T extends { type: ParsedStyleType; value: unknown }> = {
  type: T['type'];
  /** The unique identifier of the style. Is used in plugins to pull in remote styles */
  key: string;
  /** A string uniquely identifying this node within the document. Uses the [number]:[number] format */
  id: string;
  /** The name of the stlye */
  name: string;
  /** A description of the style */
  description: string;
  /** Whether this style is a remote style that doesn't live in this file */
  remote: boolean;
  value: T['value'];
};

type ParsedFill = {
  type: 'fill';
  /** Figma color converted to rgba string */
  value: string;
};

type ParsedStroke = {
  type: 'stroke';
  /** Figma color converted to rgba string */
  value: string;
};

type ParsedStrokeGradient = {
  type: 'strokeGradient';
  value: { x?: number; y: number; color: string }[];
};

type ParsedFillGradient = {
  type: 'fillGradient';
  value: { x?: number; y: number; color: string }[];
};

type ParsedTypography = {
  type: 'typography';
  value: TypeStyle;
};

type ParsedToken = ParsedStyle<
  ParsedFill | ParsedFillGradient | ParsedStroke | ParsedStrokeGradient | ParsedTypography
>;

export type ParsedTokenValue = ParsedToken['value'];

function getName(name: string) {
  if (name.includes('\u{1F31E}') || name.includes('\u{1F31A}')) {
    const [, ...rest] = name.split('/');
    const nameWithoutPrefix = rest.join('/');
    return nameWithoutPrefix;
  }
  return name;
}

function idToValueTuple(style: ParsedToken) {
  return [style.id, style.value] as const;
}

function nameToTokenTuple(style: ParsedToken) {
  return [style.name, style] as const;
}

function nameToKeyTuple(style: ParsedToken) {
  return [style.name, style.key] as const;
}

export class FigmaTokens {
  private readonly file: GetFileResponse;

  private styles: Map<string, ParsedToken> = new Map();

  constructor(file: GetFileResponse) {
    this.file = file;
    this.visitStyles(file.document);
  }

  private visitStyles = (node: Node) => {
    if ('styles' in node && node.styles !== undefined) {
      Object.entries(node.styles).forEach(([styleType, key]) => {
        const match = this.file.styles[key];
        const sharedValues = { ...match, id: key, name: getName(match.name) };

        if (!this.styles.has(key) && match) {
          switch (styleType) {
            case 'text':
              if ('style' in node) {
                this.styles.set(key, {
                  ...sharedValues,
                  type: 'typography',
                  value: node.style,
                });
              }
              break;
            case 'stroke':
            case 'strokes':
              if ('strokes' in node && node.strokes) {
                this.styles.set(key, {
                  ...sharedValues,
                  ...FigmaTokens.parsePaints('stroke', node.strokes),
                });
              }
              break;
            case 'fill':
            case 'fills':
              if ('fills' in node && node.fills) {
                this.styles.set(key, {
                  ...sharedValues,
                  ...FigmaTokens.parsePaints('fill', node.fills),
                });
              }
              break;
            default: {
              break;
            }
          }
        }
      });
    }

    if ('children' in node) {
      node.children.forEach(this.visitStyles);
    }
  };

  private static parsePaints(
    prefix: 'fill' | 'stroke',
    paints: readonly Paint[],
  ): ParsedFill | ParsedStroke | ParsedFillGradient | ParsedStrokeGradient {
    if (paints.length === 1) {
      const paint = paints[0];
      if (paint.type === 'SOLID') {
        return { type: prefix, value: figmaColorToRgba(paint.color) };
      }
      if (paint.type === 'GRADIENT_LINEAR') {
        const handlePositions = paint.gradientHandlePositions;
        if (handlePositions && paint.gradientStops) {
          return {
            type: `${prefix}Gradient` as const,
            value: paint.gradientStops.map((stop, index) => {
              return {
                color: figmaColorToRgba(stop.color),
                y: paint.type === 'GRADIENT_LINEAR' ? stop.position : handlePositions[index].y,
                x: paint.type === 'GRADIENT_LINEAR' ? undefined : handlePositions[index].x,
              };
            }),
          };
        }
      }
      console.log(paints);
      throw new Error('There were multiple values for solid fill and only expected one.');
    } else {
      console.log(paints);
      throw new Error('There were multiple values for solid fill and only expected one.');
    }
  }

  public get allTokens() {
    return [...this.styles.values()];
  }

  public get remoteTokens() {
    return this.allTokens.filter((item) => item.remote);
  }

  public get localTokens() {
    return this.allTokens.filter((item) => !item.remote);
  }

  public static nameToColorMap(tokens: ParsedToken[]) {
    return Object.fromEntries(tokens.map(idToValueTuple));
  }

  public static nameToTokenMap(tokens: ParsedToken[]) {
    return new Map(tokens.map(nameToTokenTuple));
  }

  public static nameToKeyMap(tokens: ParsedToken[]) {
    return Object.fromEntries(tokens.map(nameToKeyTuple));
  }

  public static async fetch(fileId: string) {
    const fileResponse = await getFile(fileId);
    return new FigmaTokens(fileResponse);
  }
}
