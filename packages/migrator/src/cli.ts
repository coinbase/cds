#!/usr/bin/env node

/**
 * CDS Migrator CLI
 *
 * Interactive tool to migrate codebases between CDS major versions
 * Also supports non-interactive mode via CLI flags
 */

import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';

import {
  buildMigrationSummary,
  getSelectedTransforms,
  loadMigrationManifest,
} from './utils/config-loader';
import {
  buildHistorySummary,
  clearMigrationHistory,
  getAlreadyRunTransforms,
  loadMigrationHistory,
} from './utils/migration-history';
import { type CliArgs, parseCliArgs } from './cli-args';
import { runMigration } from './runner';
import type { MigrationSelection, Transform } from './types';

// In CommonJS, __dirname is automatically available
declare const __dirname: string;

/**
 * Discover available presets by scanning the presets directory
 */
function getAvailablePresets(): Array<{ name: string; value: string; description: string }> {
  const presetsDir = path.join(__dirname, 'presets');

  if (!fs.existsSync(presetsDir)) {
    return [];
  }

  const presetDirs = fs.readdirSync(presetsDir).filter((item) => {
    const itemPath = path.join(presetsDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  const presets: Array<{ name: string; value: string; description: string }> = [];

  for (const presetName of presetDirs) {
    const presetDir = path.join(presetsDir, presetName);
    try {
      const manifest = loadMigrationManifest(presetDir);
      presets.push({
        name: manifest.preset,
        value: manifest.preset,
        description: manifest.description,
      });
    } catch (error) {
      // Skip invalid presets
      continue;
    }
  }

  return presets;
}

const AVAILABLE_PRESETS = getAvailablePresets();

/**
 * Handle duplicate transforms: prompt user or auto-filter based on flags
 * Returns filtered transforms or undefined if cancelled
 */
async function handleDuplicateTransforms(
  transformsToRun: Transform[],
  targetPath: string,
  args: CliArgs,
): Promise<Transform[] | undefined> {
  const transformPaths = transformsToRun.map((t) => t.file);
  const alreadyRun = getAlreadyRunTransforms(targetPath, transformPaths);

  // No duplicates - return as-is
  if (alreadyRun.length === 0 || args.dryRun) {
    return transformsToRun;
  }

  // Auto-filter with --skip-confirmation
  if (args.skipConfirmation) {
    const filtered = transformsToRun.filter((t) => !alreadyRun.includes(t.file));

    if (filtered.length === 0) {
      console.log('\n⚠️  No transforms to run (all have already been applied).\n');
      process.exit(0);
    }

    return filtered;
  }

  // Interactive: prompt user
  console.log('\n⚠️  Warning: Some transforms have already been run on this path:\n');
  for (const transformPath of alreadyRun) {
    console.log(`  • ${transformPath}`);
  }
  console.log('');

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'How would you like to proceed?',
      choices: [
        {
          name: 'Skip already-run transforms (recommended)',
          value: 'skip',
        },
        {
          name: 'Re-run all transforms (may cause issues)',
          value: 'rerun',
        },
        {
          name: 'Cancel migration',
          value: 'cancel',
        },
      ],
      default: 'skip',
    },
  ]);

  if (action === 'cancel') {
    console.log('\n❌ Migration cancelled.\n');
    return undefined;
  }

  if (action === 'skip') {
    return transformsToRun.filter((t) => !alreadyRun.includes(t.file));
  }

  // action === 'rerun': return all
  return transformsToRun;
}

async function selectMigrationScope(presetDir: string): Promise<MigrationSelection> {
  const config = loadMigrationManifest(presetDir);

  // Build list of transform choices (no "All" option for checkbox)
  const transformChoices = config.transforms.map((transform) => ({
    name: `${transform.name} - ${transform.description}`,
    value: transform.name,
  }));

  const { selectedTransforms } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedTransforms',
      message: 'Which transforms do you want to run? (use spacebar to select, enter to confirm)',
      choices: transformChoices,
    },
  ]);

  // Return the selected transforms
  return { transforms: selectedTransforms };
}

async function setupMigration(args: CliArgs) {
  // Step 1: Ask for target path (skip if already provided)
  let targetPath: string;

  if (args.path) {
    targetPath = args.path;
  } else {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'path',
        message: 'Enter the path to your codebase (relative or absolute):',
        default: './src',
        validate: (input: string) => {
          if (!input || input.trim() === '') {
            return 'Please provide a valid path';
          }
          return true;
        },
      },
    ]);
    targetPath = answer.path;
  }

  // Step 2: Handle --transform flag (direct transform execution, no preset needed)
  let transformsToRun: Transform[];

  if (args.transform && args.transform.length > 0) {
    // Build Transform objects from transform names
    transformsToRun = args.transform.map((name) => {
      // Support both simple names and paths (e.g., "button-variant" or "components/button-variant")
      const transformFile = name.replace(/\.(js|ts)$/, ''); // Remove extension if provided

      return {
        name: transformFile.split('/').pop() || transformFile, // Use basename as name
        description: `Transform: ${name}`,
        file: transformFile,
      };
    });

    // Show what will be run
    console.log('\nMigration Plan:');
    console.log('================\n');
    for (const transform of transformsToRun) {
      console.log(`  • ${transform.name}`);
    }
    console.log(`\nTotal transforms: ${transformsToRun.length}\n`);

    // Check history and handle duplicates
    const filtered = await handleDuplicateTransforms(transformsToRun, targetPath, args);
    if (!filtered) return; // User cancelled

    // Return for transform mode (no preset needed)
    console.log('\n📋 Migration Summary:');
    console.log(`  Path: ${targetPath}`);
    console.log(`  Mode: ${args.dryRun ? 'Dry Run' : 'Apply Changes'}`);
    if (args.packageScope) {
      console.log(`  Package scope: ${args.packageScope}`);
    }
    console.log(`  Transforms: ${filtered.length}\n`);

    return {
      preset: 'direct-transform',
      path: targetPath,
      dryRun: args.dryRun || false,
      transformsToRun: filtered,
      packageScope: args.packageScope,
    };
  }

  // Preset-based workflow
  let preset: string;
  let selection: MigrationSelection;

  if (args.preset) {
    preset = args.preset;
  } else {
    if (AVAILABLE_PRESETS.length === 0) {
      console.error('Error: No presets found in src/presets/');
      process.exit(1);
    }

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'preset',
        message: 'Which migration preset do you need?',
        choices: AVAILABLE_PRESETS.map((m) => ({
          name: `${m.name} - ${m.description}`,
          value: m.value,
        })),
      },
    ]);
    preset = answer.preset;
  }

  // Validate preset exists
  const presetDir = path.join(__dirname, 'presets', preset);
  if (!fs.existsSync(presetDir)) {
    console.error(`Error: Invalid preset '${preset}'`);
    if (AVAILABLE_PRESETS.length > 0) {
      console.error(`Available presets: ${AVAILABLE_PRESETS.map((p) => p.value).join(', ')}`);
    }
    process.exit(1);
  }

  // Step 3: Check and display migration history
  const history = loadMigrationHistory(targetPath);
  if (history && history.entries.length > 0) {
    const historySummary = buildHistorySummary(targetPath);
    console.log(historySummary);
  }

  // Step 4: Load config and select transforms (presetDir already defined above)
  const config = loadMigrationManifest(presetDir);

  if (args.partial) {
    // User wants to select specific transforms
    selection = await selectMigrationScope(presetDir);
  } else {
    // Default: run all transforms
    selection = { all: true };
  }

  // Step 5: Show what will be migrated
  const summary = buildMigrationSummary(config, selection);
  transformsToRun = getSelectedTransforms(config, selection);
  console.log(summary);

  // Check history and handle duplicates
  const filtered = await handleDuplicateTransforms(transformsToRun, targetPath, args);
  if (!filtered) return; // User cancelled

  // Return for preset mode
  console.log('\n📋 Migration Summary:');
  console.log(`  Preset: ${preset}`);
  console.log(`  Path: ${targetPath}`);
  console.log(`  Mode: ${args.dryRun ? 'Dry Run' : 'Apply Changes'}`);
  if (args.packageScope) {
    console.log(`  Package scope: ${args.packageScope}`);
  }
  console.log(`  Transforms: ${filtered.length}\n`);

  return {
    preset,
    path: targetPath,
    dryRun: args.dryRun || false,
    transformsToRun: filtered,
    packageScope: args.packageScope,
  };
}

async function main() {
  console.log('\n🚀 CDS Migrator\n');

  // Parse CLI arguments
  const args = parseCliArgs();

  // Handle clear-history command
  if (args.clearHistory) {
    if (!args.path) {
      console.error('Error: path is required when using --clear-history');
      process.exit(1);
    }

    const history = loadMigrationHistory(args.path);
    if (!history) {
      console.log(`No migration history found at: ${args.path}`);
      return;
    }

    if (args.skipConfirmation) {
      clearMigrationHistory(args.path);
      console.log(`✅ Migration history cleared for: ${args.path}\n`);
    } else {
      const historySummary = buildHistorySummary(args.path);
      console.log(historySummary);

      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `⚠️  Clear migration history for ${args.path}?`,
          default: false,
        },
      ]);

      if (confirm) {
        clearMigrationHistory(args.path);
        console.log(`✅ Migration history cleared for: ${args.path}\n`);
      } else {
        console.log('❌ Cancelled.\n');
      }
    }
    return;
  }

  // Setup migration: prompts only for missing information
  const migrationOptions = await setupMigration(args);

  if (!migrationOptions) {
    console.error('\n❌ Migration setup failed.\n');
    process.exit(1);
  }

  try {
    await runMigration(migrationOptions);
    console.log('\n✅ Migration completed successfully!\n');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
