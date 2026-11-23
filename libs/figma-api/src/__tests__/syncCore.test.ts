import {
  dedupeByIdentity,
  matchPublished,
  preferPublishedThenOlder,
  selectChanged,
  selectDeleted,
} from '../syncCore';

type Item = { id: string; name: string; age: number };
const item = (id: string, name: string, age: number): Item => ({ id, name, age });
const identity = ({ name }: Item) => name.toLowerCase();
const oldest = (existing: Item, candidate: Item) =>
  candidate.age > existing.age ? candidate : existing;

describe('dedupeByIdentity', () => {
  it('keeps every item when identities differ, in order', () => {
    const { kept, dropped } = dedupeByIdentity(
      [item('1', 'a', 1), item('2', 'b', 2)],
      identity,
      oldest,
    );
    expect([...kept.keys()]).toEqual(['a', 'b']);
    expect(dropped).toEqual([]);
  });

  it('keeps the item the rule prefers and says what replaced each dropped one', () => {
    const first = item('1', 'Cash', 5);
    const second = item('2', 'cash', 9);
    const { kept, dropped } = dedupeByIdentity([first, second], identity, oldest);
    expect(kept.get('cash')).toBe(second);
    expect(dropped).toEqual([{ item: first, keptBy: second }]);
  });

  it('points every dropped item at the item that is finally kept', () => {
    const a = item('1', 'cash', 1);
    const b = item('2', 'cash', 2);
    const c = item('3', 'cash', 3);
    const { dropped } = dedupeByIdentity([a, b, c], identity, oldest);
    expect(dropped.map(({ item: { id }, keptBy }) => [id, keptBy.id])).toEqual([
      ['1', '3'],
      ['2', '3'],
    ]);
  });

  it('lists dropped items by identity group, in the order the identities first appear', () => {
    const a1 = item('1', 'a', 1);
    const b1 = item('2', 'b', 1);
    const a2 = item('3', 'a', 2);
    const b2 = item('4', 'b', 2);
    const { dropped } = dedupeByIdentity([a1, b1, b2, a2], identity, oldest);
    expect(dropped.map(({ item: { id }, keptBy }) => [id, keptBy.id])).toEqual([
      ['1', '3'],
      ['2', '4'],
    ]);
  });

  it('keeps the existing item on a tie, so the choice does not depend on later items', () => {
    const a = item('1', 'cash', 4);
    const b = item('2', 'cash', 4);
    expect(dedupeByIdentity([a, b], identity, oldest).kept.get('cash')).toBe(a);
  });
});

describe('selectChanged', () => {
  const known = new Map([
    ['1', { age: 1 }],
    ['2', { age: 2 }],
  ]);
  const options = {
    id: ({ id }: Item) => id,
    differs: (it: Item, k: { age: number }) => it.age !== k.age,
  };

  it('picks items without a record and items that differ from their own record', () => {
    const remote = [item('1', 'a', 1), item('2', 'b', 9), item('3', 'c', 3)];
    expect(selectChanged(remote, known, options).map(({ id }) => id)).toEqual(['2', '3']);
  });

  it('picks nothing when every item matches its record', () => {
    expect(selectChanged([item('1', 'a', 1), item('2', 'b', 2)], known, options)).toEqual([]);
  });

  it('picks every item when there are no records', () => {
    expect(selectChanged([item('1', 'a', 1)], new Map(), options)).toHaveLength(1);
  });
});

describe('selectDeleted', () => {
  const published = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
  const identity = ({ id }: { id: string }) => id;

  it('finds the published items Figma no longer has', () => {
    expect(selectDeleted(published, { identity, present: new Set(['a', 'c']) })).toEqual([
      { id: 'b' },
      { id: 'd' },
    ]);
  });

  it('keeps an item Figma still has, however the sync treated it', () => {
    expect(selectDeleted(published, { identity, present: new Set(['a', 'b', 'c', 'd']) })).toEqual(
      [],
    );
  });

  it('keeps an item that is kept for another reason, such as one skipped as invalid', () => {
    expect(
      selectDeleted(published, { identity, present: new Set(['a']), kept: ['b', 'd'] }),
    ).toEqual([{ id: 'c' }]);
  });
});

describe('matchPublished', () => {
  type Set = { id: string; name: string };
  const keys = { name: (item: Set) => item.name, id: (item: Set) => item.id };
  const match = (remote: Set[], published: Set[]) => {
    const { matches, gone } = matchPublished(remote, published, keys);
    return {
      matches: matches.map(({ remote: r, published: p }) => [r.id, p?.id]),
      gone: gone.map(({ id }) => id),
    };
  };

  it('matches by name, ignoring capitalization, so a change of capitalization is the same icon', () => {
    expect(match([{ id: '1', name: 'Add' }], [{ id: '1', name: 'add' }])).toEqual({
      matches: [['1', '1']],
      gone: [],
    });
  });

  it('keeps an icon that was re-created under the same name, whatever its node id', () => {
    expect(match([{ id: '9', name: 'add' }], [{ id: '1', name: 'add' }])).toEqual({
      matches: [['9', '1']],
      gone: [],
    });
  });

  it('calls a published item whose node id is in Figma under another name a rename', () => {
    expect(match([{ id: '1', name: 'minus' }], [{ id: '1', name: 'remove' }])).toEqual({
      matches: [['1', '1']],
      gone: [],
    });
  });

  it('prefers the name over the node id, and never matches a published item twice', () => {
    const published = [
      { id: '1', name: 'add' },
      { id: '2', name: 'remove' },
    ];
    expect(
      match(
        [
          { id: '2', name: 'add' },
          { id: '3', name: 'send' },
        ],
        published,
      ),
    ).toEqual({
      matches: [
        ['2', '1'],
        ['3', undefined],
      ],
      gone: ['2'],
    });
  });

  it('finds what is published and not in Figma, and what is new', () => {
    expect(
      match(
        [{ id: '5', name: 'send' }],
        [
          { id: '1', name: 'add' },
          { id: '2', name: 'cash' },
        ],
      ),
    ).toEqual({ matches: [['5', undefined]], gone: ['1', '2'] });
  });
});

describe('preferPublishedThenOlder', () => {
  type Set = { id: string; createdAt: string };
  const prefer = preferPublishedThenOlder<Set>({
    isPublished: ({ id }) => id === 'published',
    createdAt: ({ createdAt }) => createdAt,
  });
  const older = { id: 'older', createdAt: '2026-01-01' };
  const newer = { id: 'newer', createdAt: '2026-02-01' };
  const published = { id: 'published', createdAt: '2026-03-01' };

  it('keeps the published one, even when it is newer', () => {
    expect(prefer(older, published)).toBe(published);
    expect(prefer(published, older)).toBe(published);
  });

  it('keeps the older one when neither is published, in either order', () => {
    expect(prefer(newer, older)).toBe(older);
    expect(prefer(older, newer)).toBe(older);
  });

  it('keeps the first one when they are equally old', () => {
    const twin = { id: 'twin', createdAt: older.createdAt };
    expect(prefer(older, twin)).toBe(older);
  });
});
