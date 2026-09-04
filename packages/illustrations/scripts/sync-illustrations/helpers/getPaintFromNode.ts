import type { ColorStop, NodeDocument } from './fetchIllustrationLibrary';

type Fill = { type: 'solid'; value: string };
type Gradient = { type: 'gradient'; value: { color: string; x?: number; y: number }[] };

export type Paint = Fill | Gradient;

// Derive Color type from the node structure
type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export function figmaColorToRgbaArray(color: Color) {
  const { r, g, b, a } = color;
  const [red, green, blue] = [r, g, b].map((item) => Math.round(item * 255));
  return [red, green, blue, a] as const;
}

export function numberToHex(val: number) {
  return val.toString(16).toUpperCase();
}

export function figmaColorToHex(color: Color): string {
  const [red, green, blue, alpha] = figmaColorToRgbaArray(color);
  const outParts = [numberToHex(red), numberToHex(green), numberToHex(blue)];

  if (alpha !== 1) {
    outParts.push(numberToHex(Math.round(alpha * 255)).substring(0, 2));
  }

  // Pad single-digit output values
  outParts.forEach((part, i) => {
    if (part.length === 1) {
      outParts[i] = `0${part}`;
    }
  });

  return `#${outParts.join('')}`;
}

export function getPaintFromNode(node: NodeDocument): Paint | undefined {
  if ('fills' in node) {
    const paint = node.fills[0];
    if (paint.type === 'SOLID') {
      return {
        type: 'solid',
        value: figmaColorToHex(paint.color),
      } as const;
    }

    if (paint.type === 'GRADIENT_LINEAR') {
      const handlePositions = paint.gradientHandlePositions;
      if (handlePositions && paint.gradientStops) {
        return {
          type: 'gradient',
          value: paint.gradientStops.map((stop: ColorStop, index: number) => {
            return {
              color: figmaColorToHex(stop.color),
              y: paint.type === 'GRADIENT_LINEAR' ? stop.position : handlePositions[index].y,
              x: paint.type === 'GRADIENT_LINEAR' ? undefined : handlePositions[index].x,
            };
          }),
        };
      }
    }
  }
  return undefined;
}
