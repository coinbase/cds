import { type KnownIconSet, selectIconSetsToFetch, sortLooseComponents } from '../select';

const componentSet = (
  overrides: Partial<Parameters<typeof selectIconSetsToFetch>[0][number]> = {},
) => ({
  node_id: '1:1',
  name: 'Icon / add',
  description: 'plus, new',
  updated_at: '2026-09-01T00:00:00.000Z',
  ...overrides,
});

const knownIconSet = (overrides: Partial<KnownIconSet> = {}): KnownIconSet => ({
  nodeId: '1:1',
  name: 'add',
  description: 'plus, new',
  lastUpdated: '2026-09-01T00:00:00.000Z',
  ...overrides,
});

describe('selectIconSetsToFetch', () => {
  it('picks every component set when nothing is known', () => {
    const componentSets = [componentSet(), componentSet({ node_id: '2:2' })];
    expect(selectIconSetsToFetch(componentSets, undefined)).toEqual(['1:1', '2:2']);
  });

  it('picks nothing when each component set matches its manifest entry', () => {
    expect(selectIconSetsToFetch([componentSet()], [knownIconSet()])).toEqual([]);
  });

  it('picks a component set the manifest does not know', () => {
    expect(selectIconSetsToFetch([componentSet({ node_id: '9:9' })], [knownIconSet()])).toEqual([
      '9:9',
    ]);
  });

  it.each([
    ['a different update date, older or newer', { updated_at: '2020-01-01T00:00:00.000Z' }],
    ['a changed description', { description: 'plus' }],
    ['a changed name', { name: 'Icon / plus' }],
    ['a name without a slash', { name: 'add' }],
  ])('picks a component set with %s', (_label, overrides) => {
    expect(selectIconSetsToFetch([componentSet(overrides)], [knownIconSet()])).toEqual(['1:1']);
  });

  it('compares each component set with its own entry only', () => {
    const picked = selectIconSetsToFetch(
      [componentSet(), componentSet({ node_id: '2:2', updated_at: '2026-10-01T00:00:00.000Z' })],
      [knownIconSet(), knownIconSet({ nodeId: '2:2' })],
    );
    expect(picked).toEqual(['2:2']);
  });
});

describe('sortLooseComponents', () => {
  const component = (name: string, nodeId = '8:1') => ({
    nodeId,
    name,
    url: `https://www.figma.com/design/F?node-id=${nodeId.replace(':', '-')}`,
  });
  const known = [knownIconSet({ nodeId: '1:1', name: 'add' })];

  it('lists components outside sets as ignored and keeps nothing when no published icon is replaced', () => {
    const { ignored, keepNodeIds } = sortLooseComponents(
      [component('Icon / helper')],
      known,
      new Set(['1:1']),
    );
    expect(keepNodeIds).toEqual([]);
    expect(ignored).toEqual([
      {
        reason: 'components outside icon sets, not synced',
        items: [{ name: 'Icon / helper', url: expect.stringContaining('node-id=8-1') }],
      },
    ]);
  });

  it('keeps the published version when a loose component takes the place of a set that is gone', () => {
    const { ignored, keepNodeIds } = sortLooseComponents(
      [component('Icon / Add')],
      known,
      new Set(),
    );
    expect(keepNodeIds).toEqual(['1:1']);
    expect(ignored.map(({ reason }) => reason)).toEqual([
      'components outside icon sets that replace a published icon set, whose published version is kept',
    ]);
  });

  it('does not keep anything when the set of that icon is still published', () => {
    const { keepNodeIds, ignored } = sortLooseComponents(
      [component('Icon / add')],
      known,
      new Set(['1:1']),
    );
    expect(keepNodeIds).toEqual([]);
    expect(ignored[0].reason).toBe('components outside icon sets, not synced');
  });

  it('returns no groups for no components', () => {
    expect(sortLooseComponents([], known, new Set())).toEqual({ keepNodeIds: [], ignored: [] });
  });
});
