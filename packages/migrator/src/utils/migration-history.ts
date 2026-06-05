/**
 * Migration history tracking
 *
 * Keeps track of which transforms have been run on a given path
 */

import fs from 'fs';
import path from 'path';

import type { Transform } from '../types';

const HISTORY_FILE_NAME = '.cds-migration-history.json';

export type MigrationHistoryEntry = {
  /**
   * Transform file path (e.g., "button-variant" or "components/button-variant")
   */
  transform: string;
  /**
   * When the transform was run
   */
  timestamp: string;
};

export type MigrationHistory = {
  /**
   * List of all transform runs
   */
  entries: MigrationHistoryEntry[];
  /**
   * Last update timestamp
   */
  lastUpdated: string;
};

/**
 * Get the history file path for a target directory
 */
function getHistoryFilePath(targetPath: string): string {
  // If targetPath is a file, use its directory
  const stats = fs.existsSync(targetPath) ? fs.statSync(targetPath) : null;
  const dir = stats?.isDirectory() ? targetPath : path.dirname(targetPath);

  return path.join(dir, HISTORY_FILE_NAME);
}

/**
 * Load migration history for a target path
 */
export function loadMigrationHistory(targetPath: string): MigrationHistory | null {
  const historyPath = getHistoryFilePath(targetPath);

  if (!fs.existsSync(historyPath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(historyPath, 'utf-8');
    return JSON.parse(content) as MigrationHistory;
  } catch (error) {
    console.warn(`Warning: Could not load migration history from ${historyPath}`);
    return null;
  }
}

/**
 * Save migration history for a target path
 */
export function saveMigrationHistory(targetPath: string, history: MigrationHistory): void {
  const historyPath = getHistoryFilePath(targetPath);

  try {
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), 'utf-8');
  } catch (error) {
    console.warn(`Warning: Could not save migration history to ${historyPath}`);
  }
}

/**
 * Record a transform run in the history
 */
export function recordTransformRun(
  targetPath: string,
  transformPath: string,
  dryRun: boolean,
): void {
  // Don't record history for dry runs (they don't modify files)
  if (dryRun) {
    return;
  }

  let history = loadMigrationHistory(targetPath);

  if (!history) {
    history = {
      entries: [],
      lastUpdated: new Date().toISOString(),
    };
  }

  // Add new entry
  history.entries.push({
    transform: transformPath,
    timestamp: new Date().toISOString(),
  });

  history.lastUpdated = new Date().toISOString();
  saveMigrationHistory(targetPath, history);
}

/**
 * Check if a transform has already been run
 */
export function hasTransformBeenRun(targetPath: string, transformPath: string): boolean {
  const history = loadMigrationHistory(targetPath);

  if (!history) {
    return false;
  }

  return history.entries.some((entry) => entry.transform === transformPath);
}

/**
 * Get list of transforms that have already been run
 */
export function getAlreadyRunTransforms(targetPath: string, transformPaths: string[]): string[] {
  const history = loadMigrationHistory(targetPath);

  if (!history) {
    return [];
  }

  const runTransforms = new Set(history.entries.map((entry) => entry.transform));

  return transformPaths.filter((path) => runTransforms.has(path));
}

/**
 * Build a summary of migration history
 */
export function buildHistorySummary(targetPath: string): string {
  const history = loadMigrationHistory(targetPath);

  if (!history || history.entries.length === 0) {
    return 'No migration history found for this path.';
  }

  let summary = '\n📜 Migration History\n';
  summary += '==================\n\n';

  for (const entry of history.entries) {
    const date = new Date(entry.timestamp).toLocaleDateString();
    summary += `  • ${entry.transform} (${date})\n`;
  }

  summary += `\nLast updated: ${new Date(history.lastUpdated).toLocaleString()}\n`;

  return summary;
}

/**
 * Clear migration history for a target path
 */
export function clearMigrationHistory(targetPath: string): void {
  const historyPath = getHistoryFilePath(targetPath);

  if (fs.existsSync(historyPath)) {
    fs.unlinkSync(historyPath);
  }
}
