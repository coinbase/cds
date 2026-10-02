import { diffIllustrations, type FetchedIllustration, hasChanges } from '../diffIllustrations';
import type { Illustration } from '../illustration';

const previous = (overrides: Partial<Illustration> = {}): Illustration => ({
  nodeId: '4390:695',
  type: 'spotIcon',
  name: '2fa',
  description: '2fa, security',
  hash: 'hash-v1',
  version: 1,
  width: 32,
  height: 32,
  createdAt: '2022-11-22T17:37:19.370Z',
  lastUpdated: '2026-06-08T19:45:06.046Z',
  ...overrides,
});

const fetched = (overrides: Partial<FetchedIllustration> = {}): FetchedIllustration => ({
  nodeId: '4390:695',
  type: 'spotIcon',
  name: '2fa',
  description: '2fa, security',
  hash: 'hash-v1',
  width: 32,
  height: 32,
  createdAt: '2022-11-22T17:37:19.370Z',
  updatedAt: '2026-09-01T00:00:00.000Z',
  url: 'https://www.figma.com/design/file?node-id=4390-695',
  ...overrides,
});

const names = (illustrations: { name: string }[]) => illustrations.map(({ name }) => name);

describe('diffIllustrations', () => {
  it('adds unknown illustrations at version 0 and writes them', () => {
    const diff = diffIllustrations({
      previous: [],
      fetched: [fetched()],
      remoteNodeIds: new Set(['4390:695']),
    });

    expect(names(diff.results.added)).toEqual(['2fa']);
    expect(diff.writes).toEqual(diff.results.added);
    expect(diff.removals).toEqual([]);
    expect(diff.illustrations[0]).toMatchObject({
      version: 0,
      createdAt: '2022-11-22T17:37:19.370Z',
      lastUpdated: '2026-09-01T00:00:00.000Z',
    });
    expect(diff.illustrations[0]).not.toHaveProperty('updatedAt');
  });

  it('reports nothing when the artwork and metadata are unchanged', () => {
    const diff = diffIllustrations({
      previous: [previous()],
      fetched: [fetched()],
      remoteNodeIds: new Set(['4390:695']),
    });

    expect(hasChanges(diff)).toBe(false);
    expect(diff.writes).toEqual([]);
    expect(diff.illustrations).toEqual([previous({ lastUpdated: '2026-09-01T00:00:00.000Z' })]);
  });

  it('bumps the version when the artwork changed and removes the previous files', () => {
    const diff = diffIllustrations({
      previous: [previous()],
      fetched: [fetched({ hash: 'hash-v2' })],
      remoteNodeIds: new Set(['4390:695']),
    });

    expect(names(diff.results.updated)).toEqual(['2fa']);
    expect(diff.removals).toEqual([previous()]);
    expect(diff.writes[0]).toMatchObject({ version: 2, hash: 'hash-v2' });
    expect(diff.illustrations).toEqual(diff.writes);
  });

  it('treats a description-only change as an update without touching assets', () => {
    const diff = diffIllustrations({
      previous: [previous()],
      fetched: [fetched({ description: '2fa, security, code' })],
      remoteNodeIds: new Set(['4390:695']),
    });

    expect(names(diff.results.updated)).toEqual(['2fa']);
    expect(diff.writes).toEqual([]);
    expect(diff.removals).toEqual([]);
    expect(diff.illustrations[0]).toMatchObject({ version: 1, description: '2fa, security, code' });
  });

  it('resets the version on rename and removes the files of the old name', () => {
    const diff = diffIllustrations({
      previous: [previous()],
      fetched: [fetched({ name: 'twoFactor', hash: 'hash-v2' })],
      remoteNodeIds: new Set(['4390:695']),
    });

    expect(diff.results.renamed).toEqual([
      expect.objectContaining({ name: 'twoFactor', oldName: '2fa', version: 0 }),
    ]);
    expect(diff.results.updated).toEqual([]);
    expect(diff.removals).toEqual([previous()]);
    expect(names(diff.writes)).toEqual(['twoFactor']);
    expect(names(diff.illustrations)).toEqual(['twoFactor']);
  });

  it('rejects renames that only change case, since asset file names would collide', () => {
    expect(() =>
      diffIllustrations({
        previous: [previous()],
        fetched: [fetched({ name: '2FA' })],
        remoteNodeIds: new Set(['4390:695']),
      }),
    ).toThrow('Renames are case-insensitive');
  });

  it('treats a type change as a deletion plus an addition', () => {
    const diff = diffIllustrations({
      previous: [previous()],
      fetched: [fetched({ type: 'pictogram' })],
      remoteNodeIds: new Set(['4390:695']),
    });

    expect(diff.results.deleted).toEqual([previous()]);
    expect(diff.results.added).toEqual([
      expect.objectContaining({ type: 'pictogram', version: 0 }),
    ]);
    expect(diff.removals).toEqual([previous()]);
    expect(diff.illustrations).toEqual(diff.results.added);
  });

  it('matches a re-created node by type/name, keeping createdAt and version continuity', () => {
    const diff = diffIllustrations({
      previous: [previous()],
      fetched: [
        fetched({ nodeId: '9999:1', hash: 'hash-v2', createdAt: '2026-09-01T00:00:00.000Z' }),
      ],
      remoteNodeIds: new Set(['9999:1']),
    });

    expect(names(diff.results.updated)).toEqual(['2fa']);
    expect(diff.results.added).toEqual([]);
    expect(diff.results.deleted).toEqual([]);
    expect(diff.illustrations).toEqual([
      expect.objectContaining({
        nodeId: '9999:1',
        version: 2,
        createdAt: '2022-11-22T17:37:19.370Z',
      }),
    ]);
  });

  it('deletes previous illustrations whose node no longer exists in Figma', () => {
    const gone = previous({ nodeId: '1:1', name: 'gone' });
    const kept = previous({ nodeId: '2:2', name: 'kept' });
    const diff = diffIllustrations({
      previous: [gone, kept],
      fetched: [],
      remoteNodeIds: new Set(['2:2']),
    });

    expect(diff.results.deleted).toEqual([gone]);
    expect(diff.removals).toEqual([gone]);
    expect(diff.writes).toEqual([]);
    expect(diff.illustrations).toEqual([kept]);
    expect(hasChanges(diff)).toBe(true);
  });

  it('carries untouched previous illustrations through unchanged', () => {
    const untouched = previous({ nodeId: '2:2', name: 'untouched' });
    const diff = diffIllustrations({
      previous: [untouched, previous()],
      fetched: [fetched({ hash: 'hash-v2' })],
      remoteNodeIds: new Set(['2:2', '4390:695']),
    });

    expect(diff.illustrations).toContainEqual(untouched);
    expect(diff.illustrations).toHaveLength(2);
  });
});
