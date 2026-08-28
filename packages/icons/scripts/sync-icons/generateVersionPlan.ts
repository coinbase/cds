import type { IconSyncResults } from './index';

/** Renaming or deleting an icon breaks consumers, so it forces a major bump. See DOCS.md. */
const isBreaking = (syncResults: IconSyncResults) =>
  syncResults.renamedIconSets.length > 0 || syncResults.deletedIconSets.length > 0;

const section = (heading: string, entries: string[]) =>
  entries.length ? `**${heading} (${entries.length})**\n\n- ${entries.join('\n- ')}` : '';

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
