import { dedupeByIdentity } from '@cds/figma-api/syncCore';
import type { Ledger } from '@cds/figma-api/syncLedger';
import { hasChanges, type RejectedCategory } from '@cds/figma-api/syncReport';
import { hashJson, sortByCreatedAt } from '@cds/figma-api/syncUtils';

import type { SetNode } from './source/IconSource';
import type { Manifest, ManifestIconSet } from './manifest';
import type { OptimizedSvg } from './optimizeSvg';
import {
  iconDuplicateProblem,
  iconPropsProblem,
  iconSetNameProblem,
  iconVariantsProblem,
} from './profile';
import { stringToObject } from './stringToObject';

/** An icon set the sync skipped because designers need to fix it in Figma. */
export type Rejection = {
  name: string;
  nodeId: string;
  message: string;
  category: RejectedCategory;
  /** For a name clash: the node it clashes with. */
  duplicateNodeId?: string;
};

/** An icon set that follows the rules of the profile, before its SVGs are downloaded. */
export type ValidIconSet = {
  setName: string;
  iconName: string;
  nodeId: string;
  oldIconSet: ManifestIconSet | undefined;
  description: string;
  lastUpdated: string;
  createdAt: string;
  variants: { id: string; name: string }[];
};

/** Data about one icon asset of an icon set: its SVG, optimized. */
export type IconAsset = {
  /** The Figma node id of the icon asset. */
  nodeId: string;
  /** The name of the output SVG file, without the file extension. */
  name: string;
  size: number;
  active: boolean;
  svg: OptimizedSvg;
};

/** A valid icon set with its optimized SVGs. */
export type FetchedIconSet = ValidIconSet & { icons: IconAsset[] };

/** Results from the sync process used to generate logs and the version plan. */
export type IconSyncResults = {
  newIconSets: ManifestIconSet[];
  deletedIconSets: ManifestIconSet[];
  renamedIconSets: (ManifestIconSet & { oldName: string })[];
  updatedIconSets: ManifestIconSet[];
};

export type IconSetChange =
  | { kind: 'new'; iconSet: ManifestIconSet; icons: IconAsset[] }
  | {
      kind: 'changed';
      iconSet: ManifestIconSet;
      icons: IconAsset[];
      oldIconSet: ManifestIconSet;
      renamed: boolean;
      updated: boolean;
    }
  | { kind: 'unchanged'; iconSet: ManifestIconSet; updated: boolean };

export type IconSetDiff = {
  /** In the order the icon sets were processed. */
  changes: IconSetChange[];
  deleted: ManifestIconSet[];
};

export const hasIconChanges = (results: IconSyncResults) =>
  hasChanges({
    added: results.newIconSets,
    updated: results.updatedIconSets,
    renamed: results.renamedIconSets,
    deleted: results.deletedIconSets,
  });

export const svgNameOf = (iconName: string, size: number, active: boolean) =>
  `${iconName}-${size}-${active ? 'active' : 'inactive'}`;

/**
 * Applies the rules of the profile to the fetched component sets. Every set is validated before
 * anything is downloaded, so only valid sets cost an SVG export.
 */
export function validateIconSets({
  nodes,
  previous,
  log = () => undefined,
}: {
  nodes: Record<string, SetNode>;
  previous: readonly ManifestIconSet[];
  log?: (message: string) => void;
}) {
  const rejections: Rejection[] = [];
  const accepted: ValidIconSet[] = [];
  const total = Object.values(nodes).length;
  let progress = 0;

  for (const iconSetNode of Object.values<SetNode>(nodes)) {
    progress++;
    if (iconSetNode?.document?.type !== 'COMPONENT_SET') continue;
    log(
      ` (${progress}/${total}) Icon set node: "${iconSetNode.document.id}" "${iconSetNode.document.name}"`,
    );
    const nodeId = iconSetNode.document.id;
    const setNameProblem = iconSetNameProblem(iconSetNode.document.name);
    if (setNameProblem) {
      rejections.push({
        name: iconSetNode.document.name,
        nodeId,
        message: setNameProblem,
        category: 'invalid-name',
      });
      continue;
    }
    const iconName = iconSetNode.document.name.split('/')[1].trim();
    const { description, updated_at: lastUpdated, created_at: createdAt } = iconSetNode.metadata;

    // The icon set data from the last sync, if it exists
    const oldIconSet = previous.find((iconSet) => iconSet.nodeId === nodeId);

    // An icon set from an earlier sync that has the same icon name
    const lowercaseIconName = iconName.toLowerCase();
    const duplicateIconSet = previous.find(
      (iconSet) => iconSet.name.toLowerCase() === lowercaseIconName && iconSet.nodeId !== nodeId,
    );
    if (duplicateIconSet) {
      log('  [DUPLICATE] Icon set is a duplicate, skipping...');
      rejections.push({
        name: iconName,
        nodeId,
        message: iconDuplicateProblem(iconSetNode.document.name, iconName, duplicateIconSet.name),
        category: 'duplicate-name',
        duplicateNodeId: duplicateIconSet.nodeId,
      });
      continue;
    }

    // Skip the whole icon set when any component is malformed, so a partial set never ships
    const propsProblems = iconSetNode.document.children.flatMap((iconNode) => {
      if (iconNode.type !== 'COMPONENT') return [];
      const message = iconPropsProblem(iconName, iconNode.name, stringToObject(iconNode.name));
      return message ? [{ componentId: iconNode.id, message }] : [];
    });
    if (propsProblems.length > 0) {
      for (const { componentId, message } of propsProblems) {
        rejections.push({
          name: iconName,
          nodeId: componentId,
          message,
          category: 'invalid-variant',
        });
      }
      continue;
    }

    const variants = iconSetNode.document.children.flatMap((iconNode) =>
      iconNode.type === 'COMPONENT' ? [{ id: iconNode.id, name: iconNode.name }] : [],
    );
    // Every icon set needs exactly the expected variants, so a partial set never ships either.
    const variantsProblem = iconVariantsProblem(
      iconSetNode.document.name,
      variants.map(({ name }) => stringToObject(name) as { size: number; active: boolean }),
    );
    if (variantsProblem) {
      rejections.push({
        name: iconName,
        nodeId,
        message: variantsProblem,
        category: 'invalid-variant',
      });
      continue;
    }

    accepted.push({
      setName: iconSetNode.document.name,
      iconName,
      nodeId,
      oldIconSet,
      description,
      lastUpdated,
      createdAt,
      variants,
    });
  }

  // Two new icon sets with the same icon name in one run: the older one is kept, the other is
  // reported. (A clash with an icon set from an earlier sync is caught above.)
  const { kept, dropped } = dedupeByIdentity(
    accepted,
    ({ iconName }) => iconName.toLowerCase(),
    (existing, candidate) => (candidate.createdAt < existing.createdAt ? candidate : existing),
  );
  for (const { item, keptBy } of dropped) {
    rejections.push({
      name: item.iconName,
      nodeId: item.nodeId,
      message: iconDuplicateProblem(item.setName, item.iconName, keptBy.iconName),
      category: 'duplicate-name',
      duplicateNodeId: keptBy.nodeId,
    });
  }

  return { accepted: [...kept.values()], rejections };
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
  const rejections: Rejection[] = [];

  for (const set of accepted) {
    const icons: IconAsset[] = [];
    let problem: string | undefined;
    for (const variant of set.variants) {
      // The name was checked by `iconPropsProblem`
      const { size, active } = stringToObject(variant.name) as { size: number; active: boolean };
      const rawSvg = rawSvgs.get(variant.id);
      if (rawSvg === undefined) throw new Error(`No SVG was downloaded for node ${variant.id}`);
      try {
        icons.push({
          nodeId: variant.id,
          size,
          active,
          svg: optimize(rawSvg),
          name: svgNameOf(set.iconName, size, active),
        });
      } catch (error) {
        problem = `The SVG of "${variant.name}" in icon set "${set.setName}" cannot be optimized (${
          error instanceof Error ? error.message : String(error)
        }). Fix it in Figma.`;
        break;
      }
    }
    if (problem) {
      rejections.push({
        name: set.iconName,
        nodeId: set.nodeId,
        message: problem,
        category: 'invalid-asset',
      });
    } else {
      fetched.push({ ...set, icons });
    }
  }

  return { fetched, rejections };
}

/**
 * Compares each fetched icon set with what the manifest recorded: a new set, a set whose name or
 * assets changed (its SVG files are rewritten), or one that only gets Figma's new update date and
 * description recorded so that it is not downloaded again on every run.
 */
export function diffIconSets({
  fetched,
  deleted,
}: {
  fetched: readonly FetchedIconSet[];
  deleted: readonly ManifestIconSet[];
}): IconSetDiff {
  const changes = fetched.map((set): IconSetChange => {
    const { oldIconSet, icons } = set;
    const assetsHash = hashJson(icons.map(({ svg }) => svg));
    const nameHash = hashJson(icons.map(({ name }) => name));

    const hasNameChanged = nameHash !== oldIconSet?.nameHash;
    const hasAssetsChanged = assetsHash !== oldIconSet?.assetsHash;
    const hasDescriptionChanged =
      oldIconSet !== undefined && oldIconSet.description !== set.description;

    const iconSet: ManifestIconSet = {
      nodeId: set.nodeId,
      name: set.iconName,
      description: set.description,
      assetsHash,
      nameHash,
      createdAt: oldIconSet?.createdAt ?? set.createdAt,
      lastUpdated: set.lastUpdated,
      svgs: oldIconSet?.svgs ?? [],
    };

    if (!oldIconSet) {
      iconSet.svgs = icons.map(({ name, active, size }) => ({
        name,
        active,
        size,
        unicode: undefined,
      }));
      return { kind: 'new', iconSet, icons };
    }

    if (hasNameChanged || hasAssetsChanged) {
      iconSet.svgs = icons.map(({ name, active, size }) => ({
        name,
        active,
        size,
        unicode: oldIconSet.svgs.find((svg) => svg.size === size && svg.active === active)?.unicode,
      }));
      return {
        kind: 'changed',
        iconSet,
        icons,
        oldIconSet,
        renamed: hasNameChanged,
        updated: hasAssetsChanged || hasDescriptionChanged,
      };
    }

    return { kind: 'unchanged', iconSet, updated: hasDescriptionChanged };
  });

  return { changes, deleted: [...deleted] };
}

/** Records what the diff did to each icon set, in the order the icon sets were processed. */
export function recordDiff(ledger: Ledger, diff: IconSetDiff) {
  for (const change of diff.changes) {
    const { name } = change.iconSet;
    if (change.kind === 'new') ledger.added({ name });
    if (change.kind === 'changed') {
      if (change.renamed) ledger.renamed({ name, oldName: change.oldIconSet.name });
      if (change.updated) ledger.updated({ name });
    }
    if (change.kind === 'unchanged') {
      if (change.updated) ledger.updated({ name });
      else ledger.refreshed({ name });
    }
  }
  for (const { name } of diff.deleted) ledger.deleted({ name });
}

/** Takes icon sets out of a diff, so that what was published for them stays as it is. */
export const withoutIconSets = (diff: IconSetDiff, nodeIds: ReadonlySet<string>): IconSetDiff => ({
  changes: diff.changes.filter(({ iconSet }) => !nodeIds.has(iconSet.nodeId)),
  deleted: diff.deleted,
});

export function toSyncResults(diff: IconSetDiff): IconSyncResults {
  const results: IconSyncResults = {
    newIconSets: [],
    deletedIconSets: [],
    renamedIconSets: [],
    updatedIconSets: [],
  };
  for (const change of diff.changes) {
    if (change.kind === 'new') results.newIconSets.push(change.iconSet);
    if (change.kind === 'changed') {
      if (change.renamed) {
        results.renamedIconSets.push({ ...change.iconSet, oldName: change.oldIconSet.name });
      }
      if (change.updated) results.updatedIconSets.push(change.iconSet);
    }
    if (change.kind === 'unchanged' && change.updated) results.updatedIconSets.push(change.iconSet);
  }
  results.deletedIconSets.push(...diff.deleted);
  return results;
}

/** The manifest after the diff: icon sets in the order they were processed, then by creation date. */
export function applyDiff(previous: Manifest, diff: IconSetDiff): Manifest {
  const next: Manifest = JSON.parse(JSON.stringify(previous));
  const replace = (iconSet: ManifestIconSet) => {
    next.iconSets = next.iconSets.filter(({ nodeId }) => nodeId !== iconSet.nodeId);
    next.iconSets.push(iconSet);
  };
  for (const change of diff.changes) replace(change.iconSet);
  for (const iconSet of diff.deleted) {
    next.iconSets = next.iconSets.filter(({ nodeId }) => nodeId !== iconSet.nodeId);
  }
  next.iconSets.sort(sortByCreatedAt);
  return next;
}
