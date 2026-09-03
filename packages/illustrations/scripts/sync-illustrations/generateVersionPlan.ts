import type { IllustrationSyncResults } from './tools/Manifest';

/**
 * Renaming or deleting an illustration breaks consumers, so it forces a major bump. See DOCS.md.
 */
const isBreaking = (syncResults: IllustrationSyncResults) =>
  syncResults.renamedIllustrationSets.length > 0 || syncResults.deletedIllustrationSets.length > 0;

/**
 * The illustration types in the order they have always appeared in the changelog. Types outside
 * this list still get rendered (alphabetically, after these), so a new Figma type is never
 * silently dropped from the plan.
 */
const knownTypeOrder = ['pictogram', 'heroSquare', 'spotIcon', 'spotRectangle', 'spotSquare'];

const byKnownTypeOrder = (a: string, b: string) => {
  const aIndex = knownTypeOrder.indexOf(a);
  const bIndex = knownTypeOrder.indexOf(b);
  if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  if (aIndex !== -1) return -1;
  if (bIndex !== -1) return 1;
  return a.localeCompare(b);
};

const typeLabel = (type: string) => `${type.charAt(0).toUpperCase()}${type.slice(1)}`;

type Entry = { type: string; label: string };

/**
 * Renders one change kind, sub-grouped by illustration type:
 *
 * ```md
 * ##### ⭐️ Added (2)
 *
 * ###### Pictogram (2)
 *
 * - chfTrade
 * - eurTrade
 * ```
 *
 * Headings rather than bold labels because `nx release` strips the blank lines out of a plan body
 * when it nests it under the changelog entry, and only a heading still breaks the paragraph.
 */
const section = (heading: string, entries: Entry[]) => {
  if (!entries.length) return '';

  const byType = new Map<string, string[]>();
  entries.forEach(({ type, label }) => {
    const labels = byType.get(type) ?? [];
    labels.push(label);
    byType.set(type, labels);
  });

  const groups = [...byType.keys()].sort(byKnownTypeOrder).map((type) => {
    const labels = (byType.get(type) ?? []).sort((a, b) => a.localeCompare(b));
    return `###### ${typeLabel(type)} (${labels.length})\n\n- ${labels.join('\n- ')}`;
  });

  return [`##### ${heading} (${entries.length})`, ...groups].join('\n\n');
};

/**
 * Builds an `nx release` version plan describing the sync. The plan replaces the old practice of
 * writing straight into CHANGELOG.md: `nx release` consumes it to derive both the version bump and
 * the changelog entry.
 */
export const generateVersionPlan = (syncResults: IllustrationSyncResults, date: string) => {
  const sections = [
    section(
      '⭐️ Added',
      syncResults.newIllustrationSets.map(({ type, name }) => ({ type, label: name })),
    ),
    section(
      '⭐️ Updated',
      syncResults.updatedIllustrationSets.map(({ type, name }) => ({ type, label: name })),
    ),
    section(
      '☠️ Renamed',
      syncResults.renamedIllustrationSets.map(({ type, name, oldName }) => ({
        type,
        label: `${oldName} → ${name}`,
      })),
    ),
    section(
      '☠️ Deleted',
      syncResults.deletedIllustrationSets.map(({ type, name }) => ({ type, label: name })),
    ),
  ].filter(Boolean);

  return `---
illustrations: ${isBreaking(syncResults) ? 'major' : 'minor'}
---

Publish illustrations ${date}

${sections.join('\n\n')}
`;
};
