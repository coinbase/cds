/**
 * The comparison rules every Figma sync shares: which of several items with the same identity to
 * keep, and which items are new or changed since the last sync. Each sync supplies its own
 * identity and its own idea of "differs"; the control flow lives here once.
 */

/**
 * Keeps one item per identity. `prefer` picks the keeper of two items with the same identity, so a
 * sync decides the rule (the one the manifest knows, the oldest, the newest) and the result stays
 * stable across runs. `dropped` lists every other item with the item that finally took its place,
 * grouped by identity in the order the identities first appear.
 */
export const dedupeByIdentity = <T>(
  items: readonly T[],
  identity: (item: T) => string,
  prefer: (existing: T, candidate: T) => T,
) => {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const key = identity(item);
    const group = groups.get(key);
    if (group) group.push(item);
    else groups.set(key, [item]);
  }

  const kept = new Map<string, T>();
  const dropped: { item: T; keptBy: T }[] = [];
  for (const [key, group] of groups) {
    const keptBy = group.reduce(prefer);
    kept.set(key, keptBy);
    for (const item of group) {
      if (item !== keptBy) dropped.push({ item, keptBy });
    }
  }
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

/**
 * The published items that are gone from Figma: the only real deletions. An item Figma still has
 * is never deleted, whatever the sync made of it (`present`), and neither is an item the sync
 * keeps for another reason (`kept`): one it skipped as invalid, or a component outside a set that
 * took the name of a published icon. In all of these the published version stays.
 */
export const selectDeleted = <T>(
  published: readonly T[],
  {
    identity,
    present,
    kept = [],
  }: { identity: (item: T) => string; present: ReadonlySet<string>; kept?: Iterable<string> },
) => {
  const keep = new Set(kept);
  return published.filter((item) => {
    const id = identity(item);
    return !present.has(id) && !keep.has(id);
  });
};
