/**
 * Interactable CSS variable rename — CSS/SCSS/HTML edition (v8 → v9, web only)
 *
 * Companion to `migrate-interactable-css-vars.ts` which handles JS/TS files.
 * This script renames the same 11 CSS custom properties in stylesheet and HTML
 * files that jscodeshift cannot parse:
 *
 *   --interactable-border-radius         → --inter-borderRadius
 *   --interactable-background            → --inter-bg
 *   --interactable-border-color          → --inter-borderColor
 *   --interactable-pressed-background    → --inter-press-bg
 *   --interactable-pressed-border-color  → --inter-press-borderColor
 *   --interactable-pressed-opacity       → --inter-press-opacity
 *   --interactable-hovered-background    → --inter-hover-bg
 *   --interactable-hovered-border-color  → --inter-hover-borderColor
 *   --interactable-hovered-opacity       → --inter-hover-opacity
 *   --interactable-disabled-background   → --inter-disable-bg
 *   --interactable-disabled-border-color → --inter-disable-borderColor
 *
 * Handles: .css  .scss  .html
 * Not handled: JS/TS files — use the jscodeshift companion transform instead.
 *
 * Usage (via cds-migrate CLI):
 *   cds-migrate --preset v8-to-v9-web <target-path>
 *
 * Usage (direct):
 *   node migrate-interactable-css-vars-css.js <target-path> [--dry]
 *
 * Idempotent: a second run is a no-op once all names have been updated.
 */
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';

export const VAR_RENAMES: ReadonlyArray<readonly [string, string]> = [
  ['--interactable-border-radius', '--inter-borderRadius'],
  ['--interactable-background', '--inter-bg'],
  ['--interactable-border-color', '--inter-borderColor'],
  ['--interactable-pressed-background', '--inter-press-bg'],
  ['--interactable-pressed-border-color', '--inter-press-borderColor'],
  ['--interactable-pressed-opacity', '--inter-press-opacity'],
  ['--interactable-hovered-background', '--inter-hover-bg'],
  ['--interactable-hovered-border-color', '--inter-hover-borderColor'],
  ['--interactable-hovered-opacity', '--inter-hover-opacity'],
  ['--interactable-disabled-background', '--inter-disable-bg'],
  ['--interactable-disabled-border-color', '--inter-disable-borderColor'],
];

export const FILE_PATTERNS = ['**/*.css', '**/*.scss', '**/*.html'];

/**
 * Fallback ignore patterns used when the script is invoked directly (not via
 * the cds-migrate CLI). When invoked through the CLI runner, ignore patterns
 * are forwarded as `--ignore-pattern=<pattern>` args and take precedence over this list.
 */
export const DEFAULT_IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/.next/**',
  '**/dist/**',
  '**/build/**',
];

/**
 * Parses `--ignore-pattern=<pattern>` entries from a CLI args array.
 * Uses the same flag name as jscodeshift for consistency.
 * Falls back to `DEFAULT_IGNORE_PATTERNS` when none are provided, so the
 * script behaves sensibly when run directly without the CLI runner.
 */
export function parseIgnorePatterns(args: string[]): string[] {
  const fromArgs = args
    .filter((a) => a.startsWith('--ignore-pattern='))
    .map((a) => a.slice('--ignore-pattern='.length));
  return fromArgs.length > 0 ? fromArgs : DEFAULT_IGNORE_PATTERNS;
}

/** Returns the content with all old CSS var names replaced, or the original string if nothing changed. */
export function applyRenames(content: string): string {
  let result = content;
  for (const [oldVar, newVar] of VAR_RENAMES) {
    result = result.replaceAll(oldVar, newVar);
  }
  return result;
}

export type ProcessResult = { processed: number; changed: number };

/**
 * Finds all CSS/SCSS/HTML files under `targetPath`, applies renames, and
 * writes changes back to disk (unless `dryRun` is true).
 *
 * `ignorePatterns` defaults to `DEFAULT_IGNORE_PATTERNS` but is overridden
 * by the CLI runner, which forwards its own canonical ignore list so both
 * jscodeshift and script transforms exclude the same directories.
 */
export async function processDirectory(
  targetPath: string,
  dryRun: boolean,
  ignorePatterns: string[] = DEFAULT_IGNORE_PATTERNS,
): Promise<ProcessResult> {
  const files = await fg(FILE_PATTERNS, {
    cwd: targetPath,
    absolute: true,
    ignore: ignorePatterns,
  });

  let processed = 0;
  let changed = 0;

  for (const filePath of files) {
    const original = fs.readFileSync(filePath, 'utf8');
    const updated = applyRenames(original);

    if (updated !== original) {
      if (!dryRun) {
        fs.writeFileSync(filePath, updated, 'utf8');
      }
      changed++;
      console.log(`✓ ${dryRun ? '[dry] ' : ''}${path.relative(targetPath, filePath)}`);
    }

    processed++;
  }

  return { processed, changed };
}

// CLI entry point — only executes when this file is run directly via `node`.
if (require.main === module) {
  const [, , targetPath, ...rest] = process.argv;
  const dryRun = rest.includes('--dry');
  const ignorePatterns = parseIgnorePatterns(rest);

  if (!targetPath) {
    console.error(
      'Usage: migrate-interactable-css-vars-css <target-path> [--dry] [--ignore-pattern=<pattern>...]',
    );
    process.exit(1);
  }

  processDirectory(targetPath, dryRun, ignorePatterns)
    .then(({ processed, changed }) => {
      console.log(`\nProcessed ${processed} files, updated ${changed}`);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
