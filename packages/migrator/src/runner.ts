/**
 * Migration runner
 *
 * Coordinates the execution of version-specific migrations
 */

import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { createLogger, recordTransformRun } from './utils/index';
import { normalizePackageScope } from './utils/package-scope';
import type { Transform } from './types';

// In CommonJS, __dirname is automatically available
declare const __dirname: string;

/**
 * Directories excluded from all transforms — both jscodeshift and script types.
 * Script transforms receive these as `--ignore=<pattern>` CLI args so that a
 * single source of truth governs what gets skipped.
 */
export const RUNNER_IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/.next/**',
  '**/dist/**',
  '**/build/**',
];

type RunMigrationOptions = {
  preset?: string; // Optional - not needed for direct transform execution
  path: string;
  dryRun: boolean;
  transformsToRun: Transform[];
  /** Forwarded to jscodeshift as `--packageScope` for scope-targeted transforms. */
  packageScope?: string;
};

export async function runMigration(options: RunMigrationOptions): Promise<void> {
  const {
    preset,
    path: targetPath,
    dryRun,
    transformsToRun,
    packageScope: packageScopeRaw,
  } = options;
  const packageScope = packageScopeRaw ? normalizePackageScope(packageScopeRaw) : undefined;

  console.log(`\n🔄 Running migration...\n`);

  // Create logger for this migration run
  const logger = createLogger(process.cwd());
  logger.info(`Starting migration${preset ? ` (${preset})` : ''}`);
  logger.info(`Target path: ${targetPath}`);
  logger.info(`Mode: ${dryRun ? 'Dry Run' : 'Apply Changes'}`);
  if (packageScope) {
    logger.info(`Package scope: ${packageScope} (only matching imports are rewritten)`);
  }

  if (transformsToRun.length === 0) {
    console.log('ℹ️  No transforms to run.');
    logger.warn('No transforms to run');
    return;
  }

  logger.info(`Running ${transformsToRun.length} transforms`);

  // Track successes and failures
  const results = { success: 0, failure: 0 };

  // Run each transform using jscodeshift
  // CLI has already filtered the list, so just run everything
  for (const transform of transformsToRun) {
    const transformFilePath = transform.file;

    console.log(`\n  → Running transform: ${transform.name}`);
    console.log(`    ${transform.description}`);
    logger.info(`Running transform: ${transform.name}`);

    // Add .js extension if not present (transforms are compiled from .ts to .js)
    const transformFile = transformFilePath.endsWith('.js')
      ? transformFilePath
      : `${transformFilePath}.js`;
    // Transforms are in src/transforms/, built to cjs/transforms/
    const transformsDir = path.join(__dirname, 'transforms');
    const fullTransformPath = path.join(transformsDir, transformFile);

    // Check if transform file exists before running
    if (!fs.existsSync(fullTransformPath)) {
      console.error(`\n  ✗ Transform failed: ${transform.name}`);
      console.error(`     Transform file not found: ${fullTransformPath}\n`);
      logger.error(
        `Transform file not found: ${transform.name}`,
        fullTransformPath,
        undefined,
        `File does not exist at: ${fullTransformPath}`,
      );
      results.failure++;
      continue; // Skip this transform and continue with others
    }

    try {
      if (transform.type === 'script') {
        const scriptArgs = [
          fullTransformPath,
          targetPath,
          ...(dryRun ? ['--dry'] : []),
          ...RUNNER_IGNORE_PATTERNS.map((p) => `--ignore-pattern=${p}`),
        ];
        console.log(`    Command: node ${scriptArgs.join(' ')}\n`);
        execFileSync('node', scriptArgs, { stdio: 'inherit', cwd: process.cwd() });
      } else {
        // Build jscodeshift arguments for npx
        const extensions = transform.extensions || 'tsx,ts,jsx,js';
        const jscodeshiftArgs = [
          'jscodeshift',
          ...(dryRun ? ['--dry'] : []),
          '--parser=tsx',
          `--extensions=${extensions}`,
          ...RUNNER_IGNORE_PATTERNS.map((p) => `--ignore-pattern=${p}`),
          `--transform=${fullTransformPath}`,
          ...(packageScope ? [`--packageScope=${packageScope}`] : []),
          targetPath,
        ];

        console.log(`    Command: npx ${jscodeshiftArgs.join(' ')}\n`);

        // execFileSync: first arg is command, second arg is array of arguments
        execFileSync('npx', jscodeshiftArgs, {
          stdio: 'inherit',
          cwd: process.cwd(),
        });
      }

      console.log(`\n  ✓ Transform completed: ${transform.name}`);
      logger.success(`Transform completed: ${transform.name}`);
      results.success++;

      // Record this transform run in history (file path is the ID)
      recordTransformRun(targetPath, transformFilePath, dryRun);
    } catch (error: any) {
      console.error(`\n  ✗ Transform failed: ${transform.name}`);
      console.error(`     Error: ${error.message || String(error)}\n`);
      logger.error(
        `Transform failed: ${transform.name}`,
        undefined,
        undefined,
        error.message || String(error),
      );
      results.failure++;
      // Continue with other transforms
    }
  }

  // Write summary and close logger
  logger.writeSummary();

  // Report final status if any failures
  if (results.failure > 0) {
    console.log(`\n⚠️  Migration completed with errors:`);
    console.log(`   ✓ ${results.success} succeeded`);
    console.log(`   ✗ ${results.failure} failed\n`);
    process.exit(1);
  }
}
