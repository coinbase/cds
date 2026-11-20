/**
 * The comparison rules every Figma sync shares: which of several items with the same identity to
 * keep, and which items are new or changed since the last sync. Each sync supplies its own
 * identity and its own idea of "differs"; the control flow lives here once.
 */

/**
 * Keeps one item per identity. `prefer` picks the keeper of two items with the same identity, so a
 * sync decides the rule (the one the manifest knows, the oldest, the newest) and the result stays
 * stable across runs. `dropped` lists every other item with the item that finally took its place.
 */
export const dedupeByIdentity = <T>(
  items: readonly T[],
  identity: (item: T) => string,
  prefer: (existing: T, candidate: T) => T,
) => {
  const kept = new Map<string, T>();
  const droppedItems: { item: T; key: string }[] = [];

  for (const item of items) {
    const key = identity(item);
    const existing = kept.get(key);
    if (existing === undefined) {
      kept.set(key, item);
      continue;
    }
    const winner = prefer(existing, item);
    kept.set(key, winner);
    droppedItems.push({ item: winner === existing ? item : existing, key });
  }

  const dropped = droppedItems.flatMap(({ item, key }) => {
    const keptBy = kept.get(key);
    return keptBy === undefined ? [] : [{ item, keptBy }];
  });
  return { kept, dropped };
};

/**
 * The items that are new (no known record) or differ from their own known record. Each item is
 * compared with its own record, so a missed run or a clock difference never hides a change.
 */
export const selectChanged = <Remote, Known>(
  remote: readonly Remote[],
  known: ReadonlyMap<string, Known>,
  {
    id,
    differs,
  }: { id: (item: Remote) => string; differs: (item: Remote, known: Known) => boolean },
) =>
  remote.filter((item) => {
    const record = known.get(id(item));
    return record === undefined || differs(item, record);
  });
