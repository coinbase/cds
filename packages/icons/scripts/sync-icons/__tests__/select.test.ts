import type { ManifestIconSet } from '../manifest';
import {
  dedupeRemoteIconSets,
  emptyLibraryProblem,
  matchIconSets,
  type RemoteIconSet,
  selectIconSetsToFetch,
  sortLooseComponents,
  toRemoteIconSets,
} from '../select';
import type { ComponentSet } from '../source/IconSource';

const remote = (
  name: string,
  nodeId: string,
  overrides: Partial<RemoteIconSet> = {},
): RemoteIconSet => ({
  nodeId,
  name,
  updatedAt: '2026-02-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
  description: 'plus, new',
  ...overrides,
});

const published = (
  name: string,
  nodeId: string,
  overrides: Partial<ManifestIconSet> = {},
): ManifestIconSet => ({
  nodeId,
  name,
  description: 'plus, new',
  assetsHash: 'a',
  nameHash: 'n',
  createdAt: '2026-01-01T00:00:00.000Z',
  lastUpdated: '2026-02-01T00:00:00.000Z',
  svgs: [],
  ...overrides,
});

const componentSet = (name: string, nodeId = '1:1') =>
  ({
    node_id: nodeId,
    name,
    description: 'plus, new',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-02-01T00:00:00.000Z',
  }) as ComponentSet;

describe('toRemoteIconSets', () => {
  it('names each component set by its icon name, and rejects the ones with a name that is not allowed', () => {
    const {
      remote: sets,
      rejections,
      invalidNodeIds,
    } = toRemoteIconSets([componentSet('ui/add', '1:1'), componentSet('ui/bad name', '1:2')]);
    expect(sets.map(({ name, nodeId }) => [name, nodeId])).toEqual([['add', '1:1']]);
    expect(rejections).toEqual([
      expect.objectContaining({ nodeId: '1:2', category: 'invalid-name', name: 'ui/bad name' }),
    ]);
    expect([...invalidNodeIds]).toEqual(['1:2']);
  });
});

describe('dedupeRemoteIconSets', () => {
  it('keeps the published one of two sets with the same name, ignoring capitalization, even if it is newer', () => {
    const { unique, rejections } = dedupeRemoteIconSets(
      [
        remote('add', '1:2', { createdAt: '2026-01-01T00:00:00.000Z' }),
        remote('Add', '1:1', { createdAt: '2026-03-01T00:00:00.000Z' }),
      ],
      [published('add', '1:1')],
    );
    expect(unique.map(({ nodeId }) => nodeId)).toEqual(['1:1']);
    expect(rejections).toEqual([
      expect.objectContaining({
        nodeId: '1:2',
        category: 'duplicate-name',
        duplicateNodeId: '1:1',
      }),
    ]);
  });

  it('keeps the older one when neither is published', () => {
    const { unique } = dedupeRemoteIconSets(
      [
        remote('send', '1:6', { createdAt: '2026-01-07T00:00:00.000Z' }),
        remote('send', '1:4', { createdAt: '2026-01-05T00:00:00.000Z' }),
      ],
      [],
    );
    expect(unique.map(({ nodeId }) => nodeId)).toEqual(['1:4']);
  });
});

describe('matchIconSets', () => {
  it('matches by name first and by node id for a rename, and lists what is gone', () => {
    const { matches, gone } = matchIconSets(
      [remote('minus', '1:2'), remote('Add', '9:9'), remote('send', '1:4')],
      [published('remove', '1:2'), published('add', '1:1'), published('cash', '1:3')],
    );
    expect(matches.map(({ remote: r, published: p }) => [r.name, p?.name])).toEqual([
      ['minus', 'remove'],
      ['Add', 'add'],
      ['send', undefined],
    ]);
    expect(gone.map(({ name }) => name)).toEqual(['cash']);
  });
});

describe('selectIconSetsToFetch', () => {
  const pick = (r: RemoteIconSet, p?: ManifestIconSet, fullCompare = false) =>
    selectIconSetsToFetch(matchIconSets([r], p ? [p] : []).matches, fullCompare);

  it('picks a set that is new', () => {
    expect(pick(remote('add', '1:1'))).toEqual(['1:1']);
  });

  it('leaves out a set that has not changed since it was published', () => {
    expect(pick(remote('add', '1:1'), published('add', '1:1'))).toEqual([]);
  });

  it.each([
    ['updated_at', { updatedAt: '2026-03-01T00:00:00.000Z' }],
    ['description', { description: 'other' }],
    ['node id', { nodeId: '9:9' }],
    ['capitalization', { name: 'Add' }],
  ])('picks a set whose %s changed', (_label, change) => {
    expect(pick(remote('add', '1:1', change), published('add', '1:1'))).toEqual([
      change.nodeId ?? '1:1',
    ]);
  });

  it('picks every set on a full compare', () => {
    expect(pick(remote('add', '1:1'), published('add', '1:1'), true)).toEqual(['1:1']);
  });
});

describe('sortLooseComponents', () => {
  const loose = (name: string, nodeId = '8:1') => ({
    nodeId,
    name,
    url: `https://www.figma.com/design/F?node-id=${nodeId.replace(':', '-')}`,
  });

  it('lists components outside sets as ignored and keeps nothing when no published icon is replaced', () => {
    const { ignored, keepNodeIds } = sortLooseComponents(
      [loose('ui/helper')],
      [published('add', '1:1')],
      new Set(['1:1']),
    );
    expect(keepNodeIds).toEqual([]);
    expect(ignored).toEqual([
      {
        reason: 'components outside icon sets, not synced',
        items: [{ name: 'ui/helper', url: expect.stringContaining('node-id=8-1') }],
      },
    ]);
  });

  it('keeps the published version of an icon whose set is gone, when a component outside a set has its name', () => {
    const { ignored, keepNodeIds } = sortLooseComponents(
      [loose('ui/Add')],
      [published('add', '1:1')],
      new Set(),
    );
    expect(keepNodeIds).toEqual(['1:1']);
    expect(ignored[0].reason).toContain('replace a published icon set');
  });

  it('returns no groups for no components', () => {
    expect(sortLooseComponents([], [], new Set())).toEqual({ keepNodeIds: [], ignored: [] });
  });
});

describe('emptyLibraryProblem', () => {
  it('stops the sync when Figma returns no sets while icons are published', () => {
    expect(emptyLibraryProblem(0, 572)).toContain('572 are published');
  });

  it('allows an empty library on the first sync and a library that has sets', () => {
    expect(emptyLibraryProblem(0, 0)).toBeUndefined();
    expect(emptyLibraryProblem(571, 572)).toBeUndefined();
  });
});
