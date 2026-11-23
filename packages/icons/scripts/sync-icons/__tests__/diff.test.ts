import {
  applyDiff,
  diffIconSets,
  type FetchedIconSet,
  type IconSetDiff,
  toChanges,
  validateIconSets,
  withoutIconSets,
} from '../diff';
import type { ManifestIconSet } from '../manifest';
import { profile } from '../profile';
import type { RemoteIconSet } from '../select';
import type { SetNode } from '../source/IconSource';

import { variantsOf } from './__fixtures__/iconScenario';

const remoteSet = (
  name: string,
  nodeId: string,
  overrides: Partial<RemoteIconSet> = {},
): RemoteIconSet => ({
  nodeId,
  name,
  updatedAt: '2026-02-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
  description: 'an icon',
  ...overrides,
});

const icon = (name: string, data = '<svg/>') => ({
  nodeId: `n:${name}`,
  name: `${name}-12-active`,
  size: 12,
  active: true,
  svg: { data },
});

const fetchedSet = (
  name: string,
  nodeId: string,
  overrides: Partial<FetchedIconSet> = {},
): FetchedIconSet => ({
  remote: remoteSet(name, nodeId),
  published: undefined,
  description: 'an icon',
  createdAt: '2026-01-01T00:00:00.000Z',
  variants: [],
  icons: [icon(name)],
  ...overrides,
});

/** What a first sync publishes for a fetched set, with a code point for each icon. */
const published = (set: FetchedIconSet): ManifestIconSet => {
  const { changes } = diffIconSets({ fetched: [set], carried: [], deleted: [] });
  const { iconSet } = changes[0];
  return {
    ...iconSet,
    svgs: iconSet.svgs.map((svg, index) => ({ ...svg, unicode: 1000 + index })),
  };
};

const diffOf = (...fetched: FetchedIconSet[]) =>
  diffIconSets({ fetched, carried: [], deleted: [] });

describe('diffIconSets', () => {
  it('calls a set that was not published new, with no code points yet', () => {
    const [change] = diffOf(fetchedSet('add', '1:1')).changes;
    expect(change.kind).toBe('new');
    expect(change.iconSet.svgs).toEqual([
      { name: 'add-12-active', active: true, size: 12, unicode: undefined },
    ]);
  });

  it('rewrites a set whose icons changed and keeps the code points of icons that remain', () => {
    const before = published(fetchedSet('add', '1:1'));
    const [change] = diffOf(
      fetchedSet('add', '1:1', { published: before, icons: [icon('add', '<svg>2</svg>')] }),
    ).changes;
    expect(change).toMatchObject({ kind: 'changed', renamed: false, updated: true });
    expect(change.iconSet.svgs[0].unicode).toBe(1000);
  });

  it('calls a set whose name changed renamed, even if only its capitalization, and keeps its code points', () => {
    const before = published(fetchedSet('plus', '1:1'));
    const [change] = diffOf(
      fetchedSet('Plus', '1:1', {
        remote: remoteSet('Plus', '1:1'),
        published: before,
        icons: [{ ...icon('Plus'), name: 'Plus-12-active' }],
      }),
    ).changes;
    expect(change).toMatchObject({ kind: 'changed', renamed: true, updated: false });
    expect(change.iconSet.svgs[0]).toMatchObject({ name: 'Plus-12-active', unicode: 1000 });
  });

  it('only records the new date of a set that has not changed, and takes the new node id of a re-created one', () => {
    const before = published(fetchedSet('add', '1:1'));
    const [change] = diffOf(
      fetchedSet('add', '9:9', {
        published: before,
        remote: remoteSet('add', '9:9', { updatedAt: '2026-03-01T00:00:00.000Z' }),
      }),
    ).changes;
    expect(change).toMatchObject({ kind: 'unchanged', updated: false });
    expect(change.iconSet).toMatchObject({
      nodeId: '9:9',
      lastUpdated: '2026-03-01T00:00:00.000Z',
    });
    expect(change.iconSet.svgs).toEqual(before.svgs);
  });

  it('counts a new description as a change only where the package publishes descriptions', () => {
    const before = published(fetchedSet('add', '1:1'));
    const [change] = diffOf(
      fetchedSet('add', '1:1', { published: before, description: 'a new description' }),
    ).changes;
    expect(change).toMatchObject({ kind: 'unchanged', updated: profile.publishesDescriptions });
  });
});

describe('toChanges', () => {
  it('lists new, updated, renamed and deleted icon sets, and says when one was only recorded again', () => {
    const add = published(fetchedSet('add', '1:1'));
    const cash = published(fetchedSet('cash', '1:3'));
    const { changes, refreshed } = toChanges(
      diffIconSets({
        fetched: [
          fetchedSet('send', '1:4'),
          fetchedSet('add', '1:1', { published: add, icons: [icon('add', '<svg>2</svg>')] }),
          fetchedSet('add', '1:1', { published: add }),
        ],
        carried: [],
        deleted: [cash],
      }),
    );
    expect(changes).toEqual({
      added: [{ name: 'send' }],
      updated: [{ name: 'add' }],
      renamed: [],
      deleted: [{ name: 'cash' }],
    });
    expect(refreshed).toBe(true);
  });
});

describe('applyDiff', () => {
  const previous = (iconSets: ManifestIconSet[]) => ({ lastUpdated: '', lastUnicode: 5, iconSets });

  it('replaces and drops icon sets in their place, then adds the new ones, by creation date', () => {
    const add = published(fetchedSet('add', '1:1', { createdAt: '2026-01-03T00:00:00.000Z' }));
    const cash = published(fetchedSet('cash', '1:3', { createdAt: '2026-01-02T00:00:00.000Z' }));
    const diff = diffIconSets({
      fetched: [
        fetchedSet('send', '1:4', { createdAt: '2026-01-01T00:00:00.000Z' }),
        fetchedSet('add', '1:1', { published: add, icons: [icon('add', '<svg>2</svg>')] }),
      ],
      carried: [],
      deleted: [cash],
    });
    const manifest = applyDiff(previous([add, cash]), diff);
    expect(manifest.iconSets.map(({ name }) => name)).toEqual(['send', 'add']);
    expect(manifest.iconSets[1].assetsHash).not.toBe(add.assetsHash);
    expect(manifest.lastUnicode).toBe(5);
  });

  it('keeps icon sets that were carried, with the new node id, and does not change the manifest it was given', () => {
    const add = published(fetchedSet('add', '1:1'));
    const given = previous([add]);
    const diff: IconSetDiff = {
      carried: [{ published: add, iconSet: { ...add, nodeId: '9:9' } }],
      changes: [],
      deleted: [],
    };
    expect(applyDiff(given, diff).iconSets.map(({ nodeId }) => nodeId)).toEqual(['9:9']);
    expect(given.iconSets[0].nodeId).toBe('1:1');
  });
});

describe('withoutIconSets', () => {
  it('drops a new set, and sends a changed one back to what was published', () => {
    const add = published(fetchedSet('add', '1:1'));
    const diff = diffOf(
      fetchedSet('send', '1:4'),
      fetchedSet('add', '1:1', { published: add, icons: [icon('add', '<svg>2</svg>')] }),
    );
    const without = withoutIconSets(diff, new Set(['1:4', '1:1']));
    expect(without.changes).toEqual([]);
    expect(without.carried).toEqual([{ published: add, iconSet: add }]);
  });
});

describe('validateIconSets', () => {
  const node = (nodeId: string, children: { id: string; name: string }[]) =>
    ({
      document: {
        type: 'COMPONENT_SET',
        id: nodeId,
        name: 'ui/add',
        children: children.map((child) => ({ type: 'COMPONENT', ...child })),
      },
      metadata: { description: 'an icon', created_at: '2026-01-01T00:00:00.000Z' },
    }) as unknown as SetNode;
  const fullSet = (nodeId: string) =>
    node(
      nodeId,
      variantsOf(nodeId, '<svg/>').map(({ id, name }) => ({ id, name })),
    );

  it('accepts a set with every variant of the profile', () => {
    const { accepted, rejections } = validateIconSets({
      matches: [{ remote: remoteSet('add', '1:1'), published: undefined }],
      nodes: { '1:1': fullSet('1:1') },
    });
    expect(rejections).toEqual([]);
    expect(accepted[0].variants).toHaveLength(profile.variants.sizes.length * 2);
  });

  it('carries a set that was not fetched, with its new node id and date', () => {
    const add = published(fetchedSet('add', '1:1'));
    const { accepted, carried } = validateIconSets({
      matches: [
        {
          remote: remoteSet('add', '9:9', { updatedAt: '2026-03-01T00:00:00.000Z' }),
          published: add,
        },
      ],
      nodes: {},
    });
    expect(accepted).toEqual([]);
    expect(carried[0].iconSet).toMatchObject({
      nodeId: '9:9',
      lastUpdated: '2026-03-01T00:00:00.000Z',
    });
  });

  it('rejects a set with a wrongly named variant, with one entry for the first, and keeps what was published', () => {
    const add = published(fetchedSet('add', '1:1'));
    const children = variantsOf('1:1', '<svg/>').map(({ id, name }) => ({ id, name }));
    children[1] = { id: children[1].id, name: 'size=big, active=true' };
    children[2] = { id: children[2].id, name: 'size=big, active=false' };
    const { accepted, carried, rejections } = validateIconSets({
      matches: [{ remote: remoteSet('add', '1:1'), published: add }],
      nodes: { '1:1': node('1:1', children) },
    });
    expect(accepted).toEqual([]);
    expect(rejections).toEqual([
      expect.objectContaining({ nodeId: children[1].id, category: 'invalid-variant' }),
    ]);
    expect(carried).toHaveLength(1);
  });

  it('rejects a set that is missing a variant', () => {
    const children = variantsOf('1:1', '<svg/>')
      .slice(1)
      .map(({ id, name }) => ({ id, name }));
    const { rejections } = validateIconSets({
      matches: [{ remote: remoteSet('add', '1:1'), published: undefined }],
      nodes: { '1:1': node('1:1', children) },
    });
    expect(rejections[0]).toMatchObject({ nodeId: '1:1', category: 'invalid-variant' });
    expect(rejections[0].message).toContain('it is missing');
  });
});
