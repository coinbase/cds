import type { NodeDocument } from '../fetchIllustrationLibrary';
import { getSize } from '../getSize';

describe('getSize', () => {
  test('returns the size of the document', () => {
    const document = {
      size: {
        x: 1000,
        y: 1000,
      },
    } as NodeDocument;
    const expected = { width: 1000, height: 1000 };
    const result = getSize(document);
    expect(result).toEqual(expected);
  });

  test('returns default values if the document does not have a size', () => {
    const document = {} as NodeDocument;
    const expected = { width: 0, height: 0 };
    const result = getSize(document);
    expect(result).toEqual(expected);
  });
});
