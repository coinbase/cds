import type {
  ChangedAsset,
  IgnoredGroup,
  RejectedAsset,
  RenamedAsset,
  SyncChanges,
} from './syncReport';

/**
 * The words of `git status --short`: A new, M updated, R renamed, D deleted, U cannot be resolved
 * (skipped, and the published version stays), ? not part of the sync yet, ! ignored on purpose.
 */
export type LedgerStatus = 'A' | 'M' | 'R' | 'D' | 'U' | '?' | '!';

/** What happened to one item found in Figma (or to one that is no longer there). */
export type LedgerEntry = {
  status: LedgerStatus;
  name: string;
  /** Sub-heading in the changelog, such as an illustration's type. */
  group?: string;
  /** For R: the name the item had. */
  oldName?: string;
  /** For U and ?: the skipped asset as the designer sees it. */
  rejected?: RejectedAsset;
  /** For !: why the sync left it out, and where it is in Figma. */
  ignored?: { reason: string; url?: string };
};

/**
 * One record of what the sync did with each item it found in Figma. The report is derived from
 * it, so nothing found in Figma is dropped without a trace: every item is an entry, or it was
 * looked at and left as it was.
 */
export class Ledger {
  readonly entries: LedgerEntry[] = [];
  private readonly refreshedNames: string[] = [];

  added(asset: ChangedAsset) {
    this.entries.push({ status: 'A', name: asset.name, group: asset.group });
  }

  updated(asset: ChangedAsset) {
    this.entries.push({ status: 'M', name: asset.name, group: asset.group });
  }

  renamed(asset: RenamedAsset) {
    this.entries.push({
      status: 'R',
      name: asset.name,
      group: asset.group,
      oldName: asset.oldName,
    });
  }

  deleted(asset: ChangedAsset) {
    this.entries.push({ status: 'D', name: asset.name, group: asset.group });
  }

  /** An asset the sync skipped: `?` when its type is not synced yet, `U` for the rest. */
  skipped(asset: RejectedAsset) {
    this.entries.push({
      status: asset.category === 'new-type' ? '?' : 'U',
      name: asset.name,
      rejected: asset,
    });
  }

  ignored(reason: string, items: { name: string; url?: string }[]) {
    for (const { name, url } of items) {
      this.entries.push({ status: '!', name, ignored: { reason, url } });
    }
  }

  /** An item whose Figma date and description were only recorded again; no file but the manifest changes. */
  refreshed(asset: ChangedAsset) {
    this.refreshedNames.push(asset.group ? `${asset.group}/${asset.name}` : asset.name);
  }

  /** The changes in the shape of the report; an item that is renamed and updated is in both lists. */
  changes(): SyncChanges {
    const changes: SyncChanges = { added: [], updated: [], renamed: [], deleted: [] };
    for (const { status, name, group, oldName } of this.entries) {
      const asset = group === undefined ? { name } : { name, group };
      if (status === 'A') changes.added.push(asset);
      if (status === 'M') changes.updated.push(asset);
      if (status === 'R') changes.renamed.push({ ...asset, oldName: oldName as string });
      if (status === 'D') changes.deleted.push(asset);
    }
    return changes;
  }

  rejected(): RejectedAsset[] {
    return this.entries.flatMap(({ rejected }) => (rejected ? [rejected] : []));
  }

  /** The ignored items grouped by reason, in the order the reasons first appear. */
  ignoredGroups(): IgnoredGroup[] {
    const groups = new Map<string, IgnoredGroup>();
    for (const { name, ignored } of this.entries) {
      if (!ignored) continue;
      const group = groups.get(ignored.reason) ?? { reason: ignored.reason, items: [] };
      group.items.push(ignored.url === undefined ? { name } : { name, url: ignored.url });
      groups.set(ignored.reason, group);
    }
    return [...groups.values()];
  }

  /** Whether an asset was added, updated, renamed or deleted. */
  hasChanges() {
    return this.entries.some(({ status }) => 'AMRD'.includes(status));
  }

  /** Whether an item was only recorded again (a new date, a new description). */
  hasRefreshed() {
    return this.refreshedNames.length > 0;
  }

  /** Whether an item of this name, new or old, was added, updated, renamed or deleted. */
  explains(name: string, group?: string) {
    const matches = (candidate: string | undefined, candidateGroup: string | undefined) =>
      candidate === name && (group === undefined || candidateGroup === group);
    return this.entries.some(
      ({ status, name: entryName, group: entryGroup, oldName }) =>
        'AMRD'.includes(status) && (matches(entryName, entryGroup) || matches(oldName, entryGroup)),
    );
  }
}
