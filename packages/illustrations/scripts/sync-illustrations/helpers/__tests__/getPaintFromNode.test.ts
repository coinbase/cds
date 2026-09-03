import type { NodeDocument } from '../fetchIllustrationLibrary';
import {
  figmaColorToHex,
  figmaColorToRgbaArray,
  getPaintFromNode,
  numberToHex,
} from '../getPaintFromNode';

describe('getPaintFromNode', () => {
  test('figmaColorToRgbaArray converts a Figma color to an RGBA array', () => {
    const color = { r: 0.1, g: 0.2, b: 0.3, a: 0.4 };
    const expected = [26, 51, 77, 0.4];
    const result = figmaColorToRgbaArray(color);
    expect(result).toEqual(expected);
  });

  test('numberToHex converts a number to a hexadecimal string', () => {
    const num = 255;
    const expected = 'FF';
    const result = numberToHex(num);
    expect(result).toEqual(expected);
  });

  test('figmaColorToHex converts a Figma color to a hexadecimal string', () => {
    const color = { r: 0.1, g: 0.2, b: 0.3, a: 1 };
    const expected = '#1A334D';
    const result = figmaColorToHex(color);
    expect(result).toEqual(expected);
  });

  test('getPaintFromNode returns the hexadecimal string representation of the first fill of a node, if it exists', () => {
    const node = {
      fills: [{ type: 'SOLID', color: { r: 0.1, g: 0.2, b: 0.3, a: 1 } }],
    };
    const expected = { type: 'solid', value: '#1A334D' };
    const result = getPaintFromNode(node as unknown as NodeDocument);
    expect(result).toEqual(expected);
  });

  test('getPaintFromNode returns undefined if the node does not have any fills', () => {
    const node = {} as NodeDocument;
    const result = getPaintFromNode(node);
    expect(result).toBeUndefined();
  });
});
