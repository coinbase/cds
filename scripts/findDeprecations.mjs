/**
 * Finds all deprecated entities across CDS packages by running the
 * no-deprecated-jsdoc ESLint rule programmatically.
 *
 * Usage:
 *   yarn node scripts/findDeprecations.mjs [--json] [packages...]
 *
 * Examples:
 *   yarn node scripts/findDeprecations.mjs web mobile
 *   yarn node scripts/findDeprecations.mjs common
 *   yarn node scripts/findDeprecations.mjs --json
 *   yarn node scripts/findDeprecations.mjs --json web
 *   yarn node scripts/findDeprecations.mjs          # all packages, text output
 */

import { ESLint } from 'eslint';
import { globSync } from 'glob';
import fs from 'node:fs';
import path from 'node:path';
import * as tseslint from 'typescript-eslint';

import noDeprecatedJsdocRule from '../libs/eslint-plugin-internal/src/no-deprecated-jsdoc/index.mjs';

const REPO_ROOT = process.env.PROJECT_CWD || process.cwd();
const PACKAGES_DIR = path.join(REPO_ROOT, 'packages');

const REMOVAL_VERSION_PATTERN = /@deprecationExpectedRemoval\s+(v\d+(?:\.\d+\.\d+)?)/;

function getAvailablePackages() {
  const entries = fs.readdirSync(PACKAGES_DIR, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const jsonFlag = args.includes('--json');
  const packageArgs = args.filter((a) => a !== '--json');

  const availablePackages = getAvailablePackages();
  let packages;

  if (packageArgs.length === 0) {
    packages = availablePackages;
  } else {
    const invalid = packageArgs.filter((p) => !availablePackages.includes(p));
    if (invalid.length > 0) {
      console.error(`Invalid package(s): ${invalid.join(', ')}`);
      console.error(`Available packages: ${availablePackages.join(', ')}`);
      process.exit(1);
    }
    packages = packageArgs;
  }

  return { packages, jsonFlag };
}

function parseDeprecationMessage(message) {
  const match = message.match(/^(.+) is marked as deprecated(: .+)?\.$/);
  if (!match) return { name: message, reason: '' };
  return {
    name: match[1],
    reason: match[2] ? match[2].slice(2) : '',
  };
}

function getPackageFromPath(filePath) {
  return path.relative(PACKAGES_DIR, filePath).split(path.sep)[0];
}

function getRelativeFilePath(filePath) {
  const parts = path.relative(PACKAGES_DIR, filePath).split(path.sep);
  return parts.slice(1).join(path.sep);
}

/** Reads the source file and extracts the removal version from the @deprecated comment block. */
function getRemovalVersion(filePath, line) {
  try {
    const src = fs.readFileSync(filePath, 'utf8');
    const lines = src.split('\n');

    // Walk backwards from the reported line to find the start of the JSDoc block
    let blockStart = line - 1; // line is 1-based, convert to 0-indexed
    while (blockStart > 0 && !lines[blockStart].includes('/**')) {
      blockStart--;
    }

    // Walk forwards from blockStart to find the closing */ of the JSDoc block
    let blockEnd = blockStart;
    while (blockEnd < lines.length && !lines[blockEnd].includes('*/')) {
      blockEnd++;
    }

    const commentBlock = lines.slice(blockStart, blockEnd + 1).join('\n');
    const match = commentBlock.match(REMOVAL_VERSION_PATTERN);
    return match ? match[1] : 'unknown'; // match[1] already includes the 'v' prefix
  } catch {
    return 'unknown';
  }
}

async function main() {
  const { packages, jsonFlag } = parseArgs();

  if (!jsonFlag) {
    console.log(`Scanning packages: ${packages.join(', ')}\n`);
  }

  const filePatterns = packages.map((pkg) => `${PACKAGES_DIR}/${pkg}/src/**/*.{ts,tsx}`);
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
    if (jsonFlag) {
      console.log(JSON.stringify([]));
    } else {
      console.log('No files found to scan.');
    }
    return;
  }

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
          internal: { rules: { 'no-deprecated-jsdoc': noDeprecatedJsdocRule } },
        },
        rules: {
          'internal/no-deprecated-jsdoc': 'warn',
        },
      },
    ],
  });

  const results = await eslint.lintFiles(files);

  const deprecations = [];

  for (const result of results) {
    for (const msg of result.messages) {
      if (msg.ruleId !== 'internal/no-deprecated-jsdoc') continue;
      const { name } = parseDeprecationMessage(msg.message);
      deprecations.push({
        name,
        package: getPackageFromPath(result.filePath),
        file: getRelativeFilePath(result.filePath),
        targetRemoval: getRemovalVersion(result.filePath, msg.line),
      });
    }
  }

  deprecations.sort((a, b) => {
    if (a.package !== b.package) return a.package.localeCompare(b.package);
    return a.file.localeCompare(b.file);
  });

  if (jsonFlag) {
    console.log(JSON.stringify(deprecations, null, 2));
    return;
  }

  if (deprecations.length === 0) {
    console.log('No deprecated entities found.');
    return;
  }

  console.log(`Found ${deprecations.length} deprecated entities:\n`);
  console.table(deprecations);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
