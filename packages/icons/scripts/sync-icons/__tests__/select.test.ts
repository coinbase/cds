import { type KnownIconSet, selectIconSetsToFetch } from '../select';

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
