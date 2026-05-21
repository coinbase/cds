import type { IconSyncResults } from './index';

export const generateChangelog = (syncResults: IconSyncResults) => {
  const changelogEntries = [];

  if (syncResults.newIconSets.length > 0) {
    changelogEntries.push(
      `\n\n##### ⭐️ Added (${syncResults.newIconSets.length})\n\n- ${syncResults.newIconSets
        .map((iconSet) => iconSet.name)
        .join('\n- ')}`,
    );
  }

  if (syncResults.updatedIconSets.length > 0) {
    changelogEntries.push(
      `\n##### ⭐️ Updated (${
        syncResults.updatedIconSets.length
      })\n\n- ${syncResults.updatedIconSets.map((iconSet) => iconSet.name).join('\n- ')}`,
    );
  }

  if (syncResults.renamedIconSets.length > 0) {
    changelogEntries.push(
      `\n##### ☠️ Renamed (${syncResults.renamedIconSets.length})\n\n- ${syncResults.renamedIconSets
        .map(({ oldName, name }) => `${oldName} → ${name}`)
        .join('\n- ')}`,
    );
  }

  if (syncResults.deletedIconSets.length > 0) {
    changelogEntries.push(
      `\n##### ☠️ Deleted (${syncResults.deletedIconSets.length})\n\n- ${syncResults.deletedIconSets
        .map((iconSet) => iconSet.name)
        .join('\n- ')}`,
    );
  }

  return changelogEntries.length > 0 ? changelogEntries.join('\n') : 'No changes';
};
