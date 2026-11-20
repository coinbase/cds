import crypto from 'node:crypto';

import { createBatches, hashJson, sortByCreatedAt } from '../syncUtils';

describe('hashJson', () => {
  it('is the base64 SHA-256 of the JSON text, the hash manifests already record', () => {
    const value = { 'node-1': '<svg/>' };
    expect(hashJson(value)).toBe(
      crypto.createHash('sha256').update('{"node-1":"<svg/>"}').digest('base64'),
    );
  });

  it('is the same for equal values and different otherwise', () => {
    expect(hashJson(['a', 'b'])).toBe(hashJson(['a', 'b']));
    expect(hashJson(['a', 'b'])).not.toBe(hashJson(['b', 'a']));
  });
});

describe('sortByCreatedAt', () => {
  const item = (createdAt: string, name: string) => ({ createdAt, name });

  it('puts older items first and breaks ties by name', () => {
    const sorted = [
      item('2026-02-01T00:00:00Z', 'b'),
      item('2026-01-01T00:00:00Z', 'z'),
      item('2026-02-01T00:00:00Z', 'a'),
    ].sort(sortByCreatedAt);
    expect(sorted.map(({ name }) => name)).toEqual(['z', 'a', 'b']);
  });
});

describe('createBatches', () => {
  it('splits in order into batches of at most the size', () => {
    expect(createBatches([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('returns no batches for no items, and one batch when everything fits', () => {
    expect(createBatches([], 3)).toEqual([]);
    expect(createBatches([1, 2], 5)).toEqual([[1, 2]]);
  });
});
