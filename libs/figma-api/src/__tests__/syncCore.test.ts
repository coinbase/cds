import { dedupeByIdentity, selectChanged, selectDeleted } from '../syncCore';

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
