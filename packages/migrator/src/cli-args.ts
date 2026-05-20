/**
 * CLI argument parsing
 */

import { Command } from 'commander';

export type CliArgs = {
  preset?: string;
  path?: string;
  dryRun?: boolean;
  skipConfirmation?: boolean;
  clearHistory?: boolean;
  partial?: boolean;
  transform?: string[];
  /** When set, only rewrite imports from this npm scope (e.g. coinbase or @coinbase). */
  packageScope?: string;
  /**
   * Map import source prefixes before transforms run their regex matching.
   * Use this when a wrapper or re-exporting package stands between call sites and
   * the CDS package, so transforms process those call sites as if they imported
   * from CDS directly.
   *
   * Format: `'<from>=<to>'`  e.g. `'@acme/shared/cds=@coinbase/cds-web'`
   *
   * May be repeated for multiple mappings. Entries in `cds-migrator.config.json`
   * are merged with these flags; CLI wins when the same `from` path appears in both.
   */
  importMapping?: string[];
};

export function parseCliArgs(): CliArgs {
  const program = new Command();

  program
    .name('cds-migrate')
    .description('CDS code migration tool')
    .version('1.0.0')
    .argument('[path]', 'Target path to migrate')
    .option('-p, --preset <name>', 'Migration preset (e.g., v8-to-v9)')
    .option('-d, --dry-run', 'Run in dry-run mode (preview changes)', false)
    .option('--skip-confirmation', 'Skip confirmation prompts', false)
    .option('--clear-history', 'Clear migration history for the specified path', false)
    .option('--partial', 'Select specific transforms (default: run all transforms)', false)
    .option(
      '-t, --transform <transforms...>',
      'Migrate specific transforms by name (preset auto-detected)',
    )
    .option(
      '-ps, --package-scope <scope>',
      'Only rewrite imports from this npm scope (e.g. coinbase or @coinbase). Omit to include every scope',
    )
    .option(
      '--import-mapping <mapping...>',
      "Map an import source prefix to another before transforms run (format: '<from>=<to>', repeatable). " +
        "Example: '@acme/shared/cds=@coinbase/cds-web'. Merged with cds-migrator.config.json; CLI wins on conflicts.",
    );

  program.parse();

  const options = program.opts();
  const [path] = program.args;

  return {
    preset: options.preset,
    path,
    dryRun: options.dryRun,
    skipConfirmation: options.skipConfirmation,
    clearHistory: options.clearHistory,
    partial: options.partial,
    transform: options.transform,
    packageScope: options.packageScope,
    importMapping: options.importMapping,
  };
}
