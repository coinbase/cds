/**
 * This script uses ESLint's programmatic API to find deprecated entities.
 *
 * Note: If the ESLint rule is no longer needed, this could be refactored to use
 * direct AST parsing with @typescript-eslint/typescript-estree, reusing the
 * pure helper functions from libs/eslint-plugin-internal/src/no-deprecated-jsdoc/.
 *
 * Usage:
 *   yarn node scripts/findDeprecations.mjs [packages...]
 *
 * Examples:
 *   yarn node scripts/findDeprecations.mjs web mobile
 *   yarn node scripts/findDeprecations.mjs common
 *   yarn node scripts/findDeprecations.mjs          # all packages
 */

import { execSync } from 'node:child_process';
import { ESLint } from 'eslint';
import { globSync } from 'glob';
import fs from 'node:fs';
import path from 'node:path';
import * as tseslint from 'typescript-eslint';

import noDeprecatedJsdocRule from '../libs/eslint-plugin-internal/src/no-deprecated-jsdoc/index.mjs';

const REPO_ROOT = process.env.PROJECT_CWD || process.cwd();
const PACKAGES_DIR = path.join(REPO_ROOT, 'packages');

// Get available packages from the packages directory
function getAvailablePackages() {
  const entries = fs.readdirSync(PACKAGES_DIR, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

// Parse CLI arguments (positional package names)
function parseArgs() {
  const args = process.argv.slice(2);
  const availablePackages = getAvailablePackages();

  if (args.length === 0) {
    return availablePackages;
  }

  // Validate provided package names
  const invalidPackages = args.filter((p) => !availablePackages.includes(p));
  if (invalidPackages.length > 0) {
    console.error(`Invalid package(s): ${invalidPackages.join(', ')}`);
    console.error(`Available packages: ${availablePackages.join(', ')}`);
    process.exit(1);
  }

  return args;
}

// Parse the ESLint message to extract name and reason
function parseDeprecationMessage(message) {
  const match = message.match(/^(.+) is marked as deprecated(: .+)?\.$/);
  if (!match) {
    return { name: message, reason: '' };
  }
  return {
    name: match[1],
    reason: match[2] ? match[2].slice(2) : '', // Remove ": " prefix
  };
}

// Extract package name from file path
function getPackageFromPath(filePath) {
  const relativePath = path.relative(PACKAGES_DIR, filePath);
  return relativePath.split(path.sep)[0];
}

// Get relative path within the package
function getRelativeFilePath(filePath) {
  const relativePath = path.relative(PACKAGES_DIR, filePath);
  const parts = relativePath.split(path.sep);
  return parts.slice(1).join(path.sep); // Remove package name prefix
}

// Get the date when @deprecated was first introduced using git log -L
function getDeprecationDate(filePath, line) {
  try {
    // Use git log -L to track line history, oldest first
    const output = execSync(
      `git log -L${line},${line}:"${filePath}" --reverse --format="COMMIT:%ct" -p`,
      { encoding: 'utf8', cwd: REPO_ROOT, maxBuffer: 10 * 1024 * 1024 },
    );

    // Split by commits and find the first one where @deprecated was added
    const commits = output.split(/^COMMIT:/m).filter(Boolean);

    for (const commitBlock of commits) {
      const lines = commitBlock.split('\n');
      const timestamp = parseInt(lines[0], 10);

      // Look for added lines (starting with +) containing @deprecated
      const hasDeprecatedAddition = lines.some(
        (l) => l.startsWith('+') && l.includes('@deprecated'),
      );

      if (hasDeprecatedAddition && !isNaN(timestamp)) {
        const date = new Date(timestamp * 1000);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD
      }
    }

    // Fallback: if no addition found, use the first commit's date
    // (the line existed from the start of tracked history)
    const firstTimestamp = parseInt(commits[0]?.split('\n')[0], 10);
    if (!isNaN(firstTimestamp)) {
      const date = new Date(firstTimestamp * 1000);
      return date.toISOString().split('T')[0];
    }
  } catch {
    // Git log failed (new file, uncommitted, etc.)
  }
  return 'unknown';
}

async function main() {
  const packages = parseArgs();
  console.log(`Scanning packages: ${packages.join(', ')}\n`);

  // Build file patterns for the specified packages
  const filePatterns = packages.map((pkg) => `${PACKAGES_DIR}/${pkg}/src/**/*.{ts,tsx}`);

  // Get all matching files
  const files = filePatterns.flatMap((pattern) =>
    globSync(pattern, {
      ignore: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.test.*',
        '**/*.stories.*',
        '**/__tests__/**',
      ],
    }),
  );

  if (files.length === 0) {
    console.log('No files found to scan.');
    return;
  }

  // Create ESLint instance with minimal config - only our deprecation rule
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
          parser: tseslint.parser,
          parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            ecmaFeatures: { jsx: true },
          },
        },
        plugins: {
          internal: {
            rules: {
              'no-deprecated-jsdoc': noDeprecatedJsdocRule,
            },
          },
        },
        rules: {
          'internal/no-deprecated-jsdoc': 'warn',
        },
      },
    ],
  });

  // Lint all files
  const results = await eslint.lintFiles(files);

  // Collect deprecation entries
  const deprecations = [];

  for (const result of results) {
    for (const msg of result.messages) {
      if (msg.ruleId === 'internal/no-deprecated-jsdoc') {
        const { name } = parseDeprecationMessage(msg.message);
        deprecations.push({
          name,
          file: getRelativeFilePath(result.filePath),
          package: getPackageFromPath(result.filePath),
          date: getDeprecationDate(result.filePath, msg.line),
        });
      }
    }
  }

  if (deprecations.length === 0) {
    console.log('No deprecated entities found.');
    return;
  }

  // Sort by package, then by file
  deprecations.sort((a, b) => {
    if (a.package !== b.package) return a.package.localeCompare(b.package);
    return a.file.localeCompare(b.file);
  });

  console.log(`Found ${deprecations.length} deprecated entities:\n`);
  console.table(deprecations);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
