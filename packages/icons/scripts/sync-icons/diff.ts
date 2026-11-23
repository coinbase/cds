import { emptyChanges, type SyncChanges } from '@cds/figma-api/syncReport';
import { hashJson, sortByCreatedAt } from '@cds/figma-api/syncUtils';

import type { SetNode } from './source/IconSource';
import type { Manifest, ManifestIconSet } from './manifest';
import type { OptimizedSvg } from './optimizeSvg';
import { profile } from './profile';
import {
  iconVariantsProblem,
  parseIconVariant,
  type Rejection,
  type Size,
  svgNameOf,
} from './rules';
import type { RemoteIconSet } from './select';

type Match = { remote: RemoteIconSet; published: ManifestIconSet | undefined };

/** An icon set that follows the rules of the profile, before its SVGs are downloaded. */
export type ValidIconSet = Match & {
  description: string;
  createdAt: string;
  variants: { id: string; name: string; size: Size; active: boolean }[];
};

/** Data about one icon asset of an icon set: its SVG, optimized. */
export type IconAsset = {
  /** The Figma node id of the icon asset. */
  nodeId: string;
  /** The name of the output SVG file, without the file extension. */
  name: string;
  size: Size;
  active: boolean;
  svg: OptimizedSvg;
};

/** A valid icon set with its optimized SVGs. */
export type FetchedIconSet = ValidIconSet & { icons: IconAsset[] };

/** What happened to an icon set that was fetched. */
export type IconSetChange =
  | { kind: 'new'; iconSet: ManifestIconSet; icons: IconAsset[] }
  | {
      kind: 'changed';
      iconSet: ManifestIconSet;
      icons: IconAsset[];
      published: ManifestIconSet;
      /** The name changed, even if only its capitalization: the SVG files are named after it. */
      renamed: boolean;
      /** The icons changed, or the package publishes the description and it changed. */
      updated: boolean;
    }
  | {
      kind: 'unchanged';
      iconSet: ManifestIconSet;
      published: ManifestIconSet;
      /** Only the package that publishes descriptions counts a new description as a change. */
      updated: boolean;
    };

export type IconSetDiff = {
  /** Icon sets that were not fetched, or were rejected, and stay as they were published. */
  carried: { published: ManifestIconSet; iconSet: ManifestIconSet }[];
  /** In the order the icon sets were processed. */
  changes: IconSetChange[];
  /** Published icon sets that Figma no longer has. */
  deleted: ManifestIconSet[];
};

/**
 * Checks the variants of each fetched icon set against the profile before anything is downloaded,
 * so only valid sets cost an SVG export. A set that was not fetched is unchanged and carried
 * forward with its new node id; a set that is rejected keeps what was published for it.
 */
export function validateIconSets({
  matches,
  nodes,
  log = () => undefined,
}: {
  matches: readonly Match[];
  nodes: Record<string, SetNode>;
  log?: (message: string) => void;
}) {
  const rejections: Rejection[] = [];
  const accepted: ValidIconSet[] = [];
  const carried: IconSetDiff['carried'] = [];
  let progress = 0;

  for (const match of matches) {
    progress++;
    const { remote, published } = match;
    const fetchedNode = nodes[remote.nodeId];

    // Not fetched this run → unchanged; carry it forward with a refreshed node id.
    if (!fetchedNode || fetchedNode.document.type !== 'COMPONENT_SET') {
      if (!published) {
        // A new set is always recently updated (hence fetched); this is reachable only if a
        // prior sync failed to persist it, which a full compare repairs.
        log(`  ⚠️ "${remote.name}" is new but was not fetched; run a full compare to add it`);
        continue;
      }
      carried.push({
        published,
        iconSet: { ...published, nodeId: remote.nodeId, lastUpdated: remote.updatedAt },
      });
      continue;
    }

    log(` (${progress}/${matches.length}) Icon set: "${remote.nodeId}" "${remote.name}"`);
    const { description, created_at: createdAt } = fetchedNode.metadata;
    const components = fetchedNode.document.children.filter(
      (iconNode) => iconNode.type === 'COMPONENT',
    );

    // If any variant's name doesn't follow the `size=…, active=…` convention, drop the whole set
    // rather than emit a partial one.
    const variants: ValidIconSet['variants'] = [];
    let malformed: { id: string; problem: string } | undefined;
    for (const { id, name } of components) {
      const parsed = parseIconVariant(remote.name, name);
      if ('problem' in parsed) malformed ??= { id, problem: parsed.problem };
      else variants.push({ id, name, ...parsed });
    }
    const problem =
      malformed?.problem ??
      iconVariantsProblem(
        remote.name,
        variants.map(({ size, active }) => ({ size, active })),
      );
    if (problem) {
      rejections.push({
        name: remote.name,
        nodeId: malformed?.id ?? remote.nodeId,
        message: problem,
        category: 'invalid-variant',
      });
      // Keep a previously valid entry, so a bad edit cannot drop an icon.
      if (published) carried.push({ published, iconSet: { ...published, nodeId: remote.nodeId } });
      continue;
    }

    accepted.push({ ...match, description, createdAt, variants });
  }

  return { accepted, carried, rejections };
}

/**
 * Joins the valid icon sets with their downloaded SVGs. An icon set whose SVG cannot be optimized
 * is rejected, and what was published for it stays.
 */
export function buildFetchedIconSets({
  accepted,
  rawSvgs,
  optimize,
}: {
  accepted: readonly ValidIconSet[];
  rawSvgs: ReadonlyMap<string, string>;
  optimize: (rawSvg: string) => OptimizedSvg;
}) {
  const fetched: FetchedIconSet[] = [];
  const carried: IconSetDiff['carried'] = [];
  const rejections: Rejection[] = [];

  for (const set of accepted) {
    const icons: IconAsset[] = [];
    let problem: string | undefined;
    for (const { id, name, size, active } of set.variants) {
      const rawSvg = rawSvgs.get(id);
      if (rawSvg === undefined) throw new Error(`No SVG was downloaded for node ${id}`);
      try {
        icons.push({
          nodeId: id,
          size,
          active,
          svg: optimize(rawSvg),
          name: svgNameOf(set.remote.name, size, active),
        });
      } catch (error) {
        problem = `The SVG of "${name}" in icon set "${set.remote.name}" cannot be optimized (${
          error instanceof Error ? error.message : String(error)
        }). Fix it in Figma.`;
        break;
      }
    }
    if (problem) {
      rejections.push({
        name: set.remote.name,
        nodeId: set.remote.nodeId,
        message: problem,
        category: 'invalid-asset',
      });
      const { published } = set;
      if (published) {
        carried.push({ published, iconSet: { ...published, nodeId: set.remote.nodeId } });
      }
    } else {
      fetched.push({ ...set, icons });
    }
  }

  return { fetched, carried, rejections };
}

/**
 * Compares each fetched icon set with what was published: a new set, a set whose name or icons
 * changed (its SVG files are rewritten, and the code points of icons that remain are kept), or one
 * that is identical and only gets Figma's new date and description recorded.
 */
export function diffIconSets({
  fetched,
  carried,
  deleted,
}: {
  fetched: readonly FetchedIconSet[];
  carried: IconSetDiff['carried'];
  deleted: readonly ManifestIconSet[];
}): IconSetDiff {
  const changes = fetched.map((set): IconSetChange => {
    const { remote, published, icons } = set;
    const assetsHash = hashJson(icons.map(({ svg }) => svg));
    const nameHash = hashJson(icons.map(({ name }) => name));

    const iconSet: ManifestIconSet = {
      nodeId: remote.nodeId,
      name: remote.name,
      description: set.description,
      assetsHash,
      nameHash,
      createdAt: published?.createdAt ?? set.createdAt,
      lastUpdated: remote.updatedAt,
      svgs: icons.map(({ name, active, size }) => ({
        name,
        active,
        size,
        unicode: published?.svgs.find((svg) => svg.size === size && svg.active === active)?.unicode,
      })),
    };
    if (!published) return { kind: 'new', iconSet, icons };

    const renamed = published.name !== remote.name;
    const assetsChanged = assetsHash !== published.assetsHash;
    const descriptionChanged =
      profile.publishesDescriptions && published.description !== set.description;
    if (renamed || assetsChanged) {
      return {
        kind: 'changed',
        iconSet,
        icons,
        published,
        renamed,
        updated: assetsChanged || descriptionChanged,
      };
    }

    // Downloaded but identical → keep the existing files and code points, refresh the metadata.
    return {
      kind: 'unchanged',
      published,
      updated: descriptionChanged,
      iconSet: {
        ...published,
        nodeId: remote.nodeId,
        description: set.description,
        lastUpdated: remote.updatedAt,
      },
    };
  });

  return { carried, changes, deleted: [...deleted] };
}

/** Takes icon sets out of a diff, so that what was published for them stays as it is. */
export const withoutIconSets = (diff: IconSetDiff, nodeIds: ReadonlySet<string>): IconSetDiff => ({
  ...diff,
  carried: [
    ...diff.carried,
    ...diff.changes.flatMap((change) =>
      change.kind !== 'new' && nodeIds.has(change.iconSet.nodeId)
        ? [
            {
              published: change.published,
              iconSet: { ...change.published, nodeId: change.iconSet.nodeId },
            },
          ]
        : [],
    ),
  ],
  changes: diff.changes.filter(({ iconSet }) => !nodeIds.has(iconSet.nodeId)),
});

/** What the diff changed, in the shape of the report, and whether an icon set was only recorded again. */
export function toChanges(diff: IconSetDiff) {
  const changes: SyncChanges = emptyChanges();
  let refreshed = false;
  for (const change of diff.changes) {
    const { name } = change.iconSet;
    if (change.kind === 'new') changes.added.push({ name });
    if (change.kind === 'changed') {
      if (change.renamed) changes.renamed.push({ name, oldName: change.published.name });
      if (change.updated) changes.updated.push({ name });
    }
    if (change.kind === 'unchanged') {
      if (change.updated) changes.updated.push({ name });
      else refreshed = true;
    }
  }
  for (const { name } of diff.deleted) changes.deleted.push({ name });
  return { changes, refreshed };
}

/**
 * The manifest after the diff: the published icon sets in their order, each replaced by what the
 * sync made of it or dropped when it is gone, then the new ones, by creation date.
 */
export function applyDiff(previous: Manifest, diff: IconSetDiff): Manifest {
  const replacements = new Map<string, ManifestIconSet>();
  const added: ManifestIconSet[] = [];
  for (const { published, iconSet } of diff.carried) replacements.set(published.nodeId, iconSet);
  for (const change of diff.changes) {
    if (change.kind === 'new') added.push(change.iconSet);
    else replacements.set(change.published.nodeId, change.iconSet);
  }
  const gone = new Set(diff.deleted.map(({ nodeId }) => nodeId));
  const iconSets: ManifestIconSet[] = JSON.parse(
    JSON.stringify([
      ...previous.iconSets
        .filter(({ nodeId }) => !gone.has(nodeId))
        .map((iconSet) => replacements.get(iconSet.nodeId) ?? iconSet),
      ...added,
    ]),
  );
  iconSets.sort(sortByCreatedAt);
  return { ...previous, iconSets };
}
