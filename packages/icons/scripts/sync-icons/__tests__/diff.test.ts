import {
  applyDiff,
  diffIconSets,
  type FetchedIconSet,
  toSyncResults,
  withoutIconSets,
} from '../diff';
import type { ManifestIconSet } from '../manifest';

const icon = (name: string, data = '<svg/>') => ({
  nodeId: `n:${name}`,
  name,
  size: 24,
  active: true,
  svg: { data },
});

const fetchedSet = (
  iconName: string,
  nodeId: string,
  overrides: Partial<FetchedIconSet> = {},
): FetchedIconSet => ({
  setName: `ui/${iconName}`,
  iconName,
  nodeId,
  oldIconSet: undefined,
  description: 'a, b',
  lastUpdated: '2026-02-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
  variants: [],
  icons: [icon(`${iconName}-24-active`)],
  ...overrides,
});

const published = (set: FetchedIconSet): ManifestIconSet => {
  const [{ iconSet }] = diffIconSets({ fetched: [set], deleted: [] }).changes;
  return {
    ...iconSet,
    svgs: iconSet.svgs.map((svg, index) => ({ ...svg, unicode: 1000 + index })),
  };
};

describe('diffIconSets', () => {
  it('calls a set the manifest does not know new, with no code points yet', () => {
    const { changes } = diffIconSets({ fetched: [fetchedSet('add', '1:1')], deleted: [] });
    expect(changes).toHaveLength(1);
    expect(changes[0]).toMatchObject({ kind: 'new' });
    expect(changes[0].iconSet.svgs).toEqual([
      { name: 'add-24-active', active: true, size: 24, unicode: undefined },
    ]);
  });

  it('rewrites a set whose assets changed and keeps the code points of icons that remain', () => {
    const before = published(fetchedSet('add', '1:1'));
    const [change] = diffIconSets({
      fetched: [
        fetchedSet('add', '1:1', {
          oldIconSet: before,
          icons: [icon('add-24-active', '<svg>2</svg>')],
        }),
      ],
      deleted: [],
    }).changes;
    expect(change).toMatchObject({ kind: 'changed', renamed: false, updated: true });
    expect(change.iconSet.svgs[0].unicode).toBe(1000);
  });

  it('calls a renamed set renamed, and takes the code points over by size and state', () => {
    const before = published(fetchedSet('remove', '1:2'));
    const [change] = diffIconSets({
      fetched: [
        fetchedSet('minus', '1:2', { oldIconSet: before, icons: [icon('minus-24-active')] }),
      ],
      deleted: [],
    }).changes;
    expect(change).toMatchObject({ kind: 'changed', renamed: true });
    expect(change.iconSet.svgs[0]).toMatchObject({ name: 'minus-24-active', unicode: 1000 });
  });

  it('only records the new date of a set that has not changed, and reports a new description', () => {
    const before = published(fetchedSet('add', '1:1'));
    const [same, described] = diffIconSets({
      fetched: [
        fetchedSet('add', '1:1', { oldIconSet: before, lastUpdated: '2026-03-01T00:00:00.000Z' }),
        fetchedSet('add', '1:1', { oldIconSet: before, description: 'c' }),
      ],
      deleted: [],
    }).changes;
    expect(same).toMatchObject({ kind: 'unchanged', updated: false });
    expect(same.iconSet.lastUpdated).toBe('2026-03-01T00:00:00.000Z');
    expect(described).toMatchObject({ kind: 'unchanged', updated: true });
  });
});

describe('applyDiff', () => {
  it('replaces and removes icon sets, then orders them by creation date', () => {
    const add = published(fetchedSet('add', '1:1', { createdAt: '2026-01-03T00:00:00.000Z' }));
    const cash = published(fetchedSet('cash', '1:3', { createdAt: '2026-01-02T00:00:00.000Z' }));
    const diff = diffIconSets({
      fetched: [fetchedSet('send', '1:4', { createdAt: '2026-01-01T00:00:00.000Z' })],
      deleted: [cash],
    });
    const manifest = applyDiff({ lastUpdated: '', lastUnicode: 5, iconSets: [add, cash] }, diff);
    expect(manifest.iconSets.map(({ name }) => name)).toEqual(['send', 'add']);
    expect(manifest.lastUnicode).toBe(5);
  });

  it('does not change the manifest it was given', () => {
    const add = published(fetchedSet('add', '1:1'));
    const previous = { lastUpdated: '', lastUnicode: 5, iconSets: [add] };
    const next = applyDiff(previous, diffIconSets({ fetched: [], deleted: [add] }));
    expect(previous.iconSets).toHaveLength(1);
    expect(next.iconSets).toHaveLength(0);
  });
});

describe('withoutIconSets and toSyncResults', () => {
  it('leaves out the icon sets that cannot be written, so the published ones stay', () => {
    const diff = diffIconSets({
      fetched: [fetchedSet('add', '1:1'), fetchedSet('send', '1:4')],
      deleted: [],
    });
    const kept = withoutIconSets(diff, new Set(['1:4']));
    expect(toSyncResults(kept).newIconSets.map(({ name }) => name)).toEqual(['add']);
  });
});
