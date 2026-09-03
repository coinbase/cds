import type { IconSyncResults } from './index';

/** Renaming or deleting an icon breaks consumers, so it forces a major bump. See DOCS.md. */
const isBreaking = (syncResults: IconSyncResults) =>
  syncResults.renamedIconSets.length > 0 || syncResults.deletedIconSets.length > 0;

/**
 * A heading rather than a bold label because `nx release` strips the blank lines out of a plan body
 * when it nests it under the changelog entry. Without one, the label that follows a list becomes a
 * lazy continuation of its last item.
 */
const section = (heading: string, entries: string[]) =>
  entries.length ? `##### ${heading} (${entries.length})\n\n- ${entries.join('\n- ')}` : '';

/**
 * Builds an `nx release` version plan describing the sync. The plan replaces the old practice of
 * writing straight into CHANGELOG.md: `nx release` consumes it to derive both the version bump and
 * the changelog entry.
 */
export const generateVersionPlan = (syncResults: IconSyncResults, date: string) => {
  const sections = [
    section(
      '⭐️ Added',
      syncResults.newIconSets.map(({ name }) => name),
    ),
    section(
      '⭐️ Updated',
      syncResults.updatedIconSets.map(({ name }) => name),
    ),
    section(
      '☠️ Renamed',
      syncResults.renamedIconSets.map(({ oldName, name }) => `${oldName} → ${name}`),
    ),
    section(
      '☠️ Deleted',
      syncResults.deletedIconSets.map(({ name }) => name),
    ),
  ].filter(Boolean);

  return `---
icons: ${isBreaking(syncResults) ? 'major' : 'minor'}
---

Publish icons ${date}

${sections.join('\n\n')}
`;
};
