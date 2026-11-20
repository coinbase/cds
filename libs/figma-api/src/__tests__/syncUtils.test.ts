import crypto from 'node:crypto';

import { createBatches, hashJson, mapConcurrently, sortByCreatedAt } from '../syncUtils';

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

describe('mapConcurrently', () => {
  it('keeps the input order and never runs more than the limit at once', async () => {
    let running = 0;
    let peak = 0;
    const results = await mapConcurrently([1, 2, 3, 4, 5], 2, async (value) => {
      running += 1;
      peak = Math.max(peak, running);
      await new Promise((resolve) => setTimeout(resolve, 5 - value));
      running -= 1;
      return value * 10;
    });
    expect(results).toEqual([10, 20, 30, 40, 50]);
    expect(peak).toBeLessThanOrEqual(2);
  });

  it('returns nothing for no items', async () => {
    expect(await mapConcurrently([], 3, async (value) => value)).toEqual([]);
  });
});
