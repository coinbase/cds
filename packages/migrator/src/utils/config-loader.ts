/**
 * Configuration loader utilities
 */

import fs from 'fs';
import path from 'path';

import type { MigrationSelection, PresetManifest, Transform } from '../types';

/**
 * Load preset manifest from manifest.json
 */
export function loadMigrationManifest(presetDir: string): PresetManifest {
  const manifestPath = path.join(presetDir, 'manifest.json');

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Preset manifest not found: ${manifestPath}`);
  }

  const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
  return JSON.parse(manifestContent) as PresetManifest;
}

/**
 * Get all transforms from manifest based on selection
 */
export function getSelectedTransforms(
  manifest: PresetManifest,
  selection: MigrationSelection,
): Transform[] {
  // If migrate all, return all transforms
  if (selection.all) {
    return manifest.transforms;
  }

  // Collect specific transforms by name
  if (selection.transforms && selection.transforms.length > 0) {
    const selectedTransforms: Transform[] = [];
    for (const transformName of selection.transforms) {
      const transform = manifest.transforms.find((t) => t.name === transformName);
      if (transform) {
        selectedTransforms.push(transform);
      }
    }
    return selectedTransforms;
  }

  return [];
}

/**
 * Build a summary of what will be migrated
 */
export function buildMigrationSummary(
  manifest: PresetManifest,
  selection: MigrationSelection,
): string {
  const transforms = getSelectedTransforms(manifest, selection);

  let summary = '\nMigration Plan:\n';
  summary += '================\n\n';

  if (transforms.length === 0) {
    summary += 'No transforms selected.\n';
  } else {
    for (const transform of transforms) {
      summary += `  • ${transform.name} - ${transform.description}\n`;
    }
  }

  summary += `\nTotal transforms: ${transforms.length}\n`;

  return summary;
}
