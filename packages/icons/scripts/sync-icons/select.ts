import {
  dedupeByIdentity,
  matchPublished,
  preferPublishedThenOlder,
} from '@cds/figma-api/syncCore';
import type { IgnoredGroup } from '@cds/figma-api/syncReport';

import type { ComponentSet, LooseComponent } from './source/IconSource';
import type { ManifestIconSet } from './manifest';
import { duplicateProblem, iconNameOf, type Rejection } from './rules';

/** A component set of the Figma file, under the icon name its name gives it. */
export type RemoteIconSet = {
  nodeId: string;
  name: string;
  updatedAt: string;
  createdAt: string;
  description: string;
};

/**
 * The component sets whose name follows the profile, and a rejection for each one whose name does
 * not. `invalidNodeIds` are those sets: Figma still has them, so what was published for them stays.
 */
export const toRemoteIconSets = (componentSets: readonly ComponentSet[]) => {
  const remote: RemoteIconSet[] = [];
  const rejections: Rejection[] = [];
  for (const componentSet of componentSets) {
    const parsed = iconNameOf(componentSet.name);
    if ('problem' in parsed) {
      rejections.push({
        name: componentSet.name,
        nodeId: componentSet.node_id,
        message: parsed.problem,
        category: 'invalid-name',
      });
      continue;
    }
    remote.push({
      nodeId: componentSet.node_id,
      name: parsed.name,
      updatedAt: componentSet.updated_at,
      createdAt: componentSet.created_at,
      description: componentSet.description,
    });
  }
  return { remote, rejections, invalidNodeIds: new Set(rejections.map(({ nodeId }) => nodeId)) };
};

/**
 * One component set per icon name, ignoring capitalization. Of two with the same name the one that
 * is already published stays, otherwise the older, so the choice does not change between runs.
 */
export const dedupeRemoteIconSets = (
  remote: readonly RemoteIconSet[],
  published: readonly ManifestIconSet[],
) => {
  const publishedIds = new Set(published.map(({ nodeId }) => nodeId));
  const { kept, dropped } = dedupeByIdentity(
    remote,
    ({ name }) => name.toLowerCase(),
    preferPublishedThenOlder({
      isPublished: ({ nodeId }) => publishedIds.has(nodeId),
      createdAt: ({ createdAt }) => createdAt,
    }),
  );
  const rejections: Rejection[] = dropped.map(({ item, keptBy }) => ({
    name: item.name,
    nodeId: item.nodeId,
    message: duplicateProblem(item.name),
    category: 'duplicate-name',
    duplicateNodeId: keptBy.nodeId,
  }));
  return { unique: [...kept.values()], rejections };
};

/** Matches what Figma has with what was published: by name first, then by node id (a rename). */
export const matchIconSets = (
  remote: readonly RemoteIconSet[],
  published: readonly ManifestIconSet[],
) =>
  matchPublished(remote, published, {
    name: ({ name }) => name,
    id: ({ nodeId }) => nodeId,
  });

type Match = ReturnType<typeof matchIconSets>[number];

/**
 * Picks the component sets to download: the new ones, and the ones whose node id, name,
 * `updated_at` or description differ from the published icon set. Each is compared with its own
 * record, so the result does not depend on the clock or on the last run having finished.
 */
export const selectIconSetsToFetch = (matches: readonly Match[], fullCompare = false) =>
  matches
    .filter(
      ({ remote, published }) =>
        fullCompare ||
        !published ||
        published.nodeId !== remote.nodeId ||
        published.name !== remote.name ||
        published.lastUpdated !== remote.updatedAt ||
        published.description !== remote.description,
    )
    .map(({ remote }) => remote.nodeId);

/**
 * Components outside component sets are not synced, but they are never silent. When one has the
 * icon name of an icon that is published and whose set is gone, the published version is kept
 * instead of being deleted: its node id comes back in `keepNodeIds`.
 */
export const sortLooseComponents = (
  loose: readonly LooseComponent[],
  published: readonly ManifestIconSet[],
  presentNodeIds: ReadonlySet<string>,
) => {
  const publishedByName = new Map(
    published.map((iconSet) => [iconSet.name.toLowerCase(), iconSet]),
  );
  const keepNodeIds: string[] = [];
  const replacing: LooseComponent[] = [];
  const others: LooseComponent[] = [];

  for (const component of loose) {
    const parsed = iconNameOf(component.name);
    const known = 'name' in parsed ? publishedByName.get(parsed.name.toLowerCase()) : undefined;
    if (known && !presentNodeIds.has(known.nodeId)) {
      keepNodeIds.push(known.nodeId);
      replacing.push(component);
    } else {
      others.push(component);
    }
  }

  const group = (reason: string, items: LooseComponent[]): IgnoredGroup[] =>
    items.length > 0 ? [{ reason, items: items.map(({ name, url }) => ({ name, url })) }] : [];

  return {
    keepNodeIds,
    ignored: [
      ...group('components outside icon sets, not synced', others),
      ...group(
        'components outside icon sets that replace a published icon set, whose published version is kept',
        replacing,
      ),
    ],
  };
};

/**
 * A Figma response with no component sets while icons are published is a failed read, not a
 * library where every icon was deleted, so the sync stops instead of deleting them all.
 */
export const emptyLibraryProblem = (remoteSetCount: number, publishedSetCount: number) =>
  remoteSetCount === 0 && publishedSetCount > 0
    ? `Figma returned no icon sets, but ${publishedSetCount} are published. Nothing was deleted; check the Figma file and the access token.`
    : undefined;
