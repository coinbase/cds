#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const variants = ['pictogram', 'spotIcon', 'spotSquare', 'spotRectangle', 'heroSquare'];
const variantAliases = {
  pictogram: 'pictogram',
  spoticon: 'spotIcon',
  spotsquare: 'spotSquare',
  spotrectangle: 'spotRectangle',
  herosquare: 'heroSquare',
};

const invokedScript =
  path.relative(process.cwd(), process.argv[1] ?? '') ||
  'skills/cds-code/scripts/discover-cds-illustrations.mjs';

const usage = `Usage: node ${invokedScript} <query> [--variant <v>] [--project-root <path>]
Variants: ${variants.join(', ')}
Example: node ${invokedScript} shield`;

function parseArgs(argv) {
  let query = '';
  let projectRoot = '';
  let variant = '';
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--project-root') {
      projectRoot = argv[i + 1] ?? '';
      i += 1;
      continue;
    }
    if (arg === '--variant') {
      variant = argv[i + 1] ?? '';
      i += 1;
      continue;
    }
    if (!query) query = arg;
  }
  return { query: query.trim(), projectRoot, variant };
}

function resolveVariant(variantInput) {
  if (!variantInput) return '';
  const normalized = variantInput.toLowerCase().replace(/[^a-z0-9]/g, '');
  return variantAliases[normalized] ?? '';
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findProjectRoot(startPath = process.cwd()) {
  let current = path.resolve(startPath);
  while (true) {
    const packageJsonPath = path.join(current, 'package.json');
    const nodeModulesPath = path.join(current, 'node_modules');
    if ((await pathExists(packageJsonPath)) && (await pathExists(nodeModulesPath))) return current;
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return '';
}

async function findScopedCdsPackage(projectRoot, suffix) {
  const nodeModulesPath = path.join(projectRoot, 'node_modules');
  const scopes = await fs.readdir(nodeModulesPath, { withFileTypes: true });
  for (const entry of scopes) {
    if (!entry.isDirectory() || !entry.name.startsWith('@')) continue;
    const packageJsonPath = path.join(nodeModulesPath, entry.name, suffix, 'package.json');
    if (!(await pathExists(packageJsonPath))) continue;
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    if (typeof packageJson.name === 'string' && packageJson.name.endsWith(`/${suffix}`)) {
      return packageJson.name;
    }
  }
  return '';
}

async function resolveFromProject(specifier, projectRoot) {
  const packageJsonUrl = pathToFileURL(path.join(projectRoot, 'package.json')).href;
  if (typeof import.meta.resolve === 'function') {
    const resolved = await Promise.resolve(import.meta.resolve(specifier, packageJsonUrl));
    return fileURLToPath(resolved);
  }
  const require = createRequire(packageJsonUrl);
  return require.resolve(specifier);
}

async function importFromProject(specifier, projectRoot) {
  const resolvedPath = await resolveFromProject(specifier, projectRoot);
  return import(pathToFileURL(resolvedPath).href);
}

function pickModuleValue(moduleData) {
  return moduleData.default ?? moduleData.names ?? moduleData.descriptionMap ?? null;
}

function iconTagsAndDescriptionHit(descriptionMap, iconName, queryLower) {
  const tags = [];
  let descKeyHit = false;
  for (const [tag, iconList] of Object.entries(descriptionMap)) {
    if (!tag || !Array.isArray(iconList) || !iconList.includes(iconName)) continue;
    tags.push(tag);
    if (tag.toLowerCase().includes(queryLower)) descKeyHit = true;
  }
  tags.sort((a, b) => a.localeCompare(b));
  return { tags, descKeyHit };
}

function formatWithTags(label, tags) {
  if (!tags.length) return label;
  return `${label} (tags: ${tags.join(', ')})`;
}

async function loadVariantData(cdsPackage, projectRoot, variant) {
  const namesModule = await importFromProject(
    `${cdsPackage}/__generated__/${variant}/data/names`,
    projectRoot,
  );
  const dmModule = await importFromProject(
    `${cdsPackage}/__generated__/${variant}/data/descriptionMap`,
    projectRoot,
  );
  const names = pickModuleValue(namesModule);
  const descriptionMap = pickModuleValue(dmModule);
  if (!Array.isArray(names) || typeof descriptionMap !== 'object' || descriptionMap === null) {
    throw new Error(`Bad data for variant "${variant}".`);
  }
  return { names, descriptionMap };
}

function printResults(matches, query) {
  if (!matches.length) {
    console.log(`No matches for "${query}".`);
    process.exitCode = 1;
    return;
  }
  const n = matches.length;
  console.log(`Found ${n} ${n === 1 ? 'illustration' : 'illustrations'}:`);
  for (const { variant, name, tags } of matches) {
    console.log(formatWithTags(`${variant}:${name}`, tags));
  }
}

async function main() {
  const { query, projectRoot: argProjectRoot, variant } = parseArgs(process.argv.slice(2));
  if (!query) {
    console.error('Error: missing query.\n' + usage);
    process.exitCode = 1;
    return;
  }
  const queryLower = query.toLowerCase();
  const resolvedVariant = resolveVariant(variant);
  if (variant && !resolvedVariant) {
    console.error(`Error: unknown variant "${variant}". ${variants.join(', ')}`);
    process.exitCode = 1;
    return;
  }
  const projectRoot = argProjectRoot ? path.resolve(argProjectRoot) : await findProjectRoot();
  if (!projectRoot) {
    console.error('Error: no project root. Use --project-root.');
    process.exitCode = 1;
    return;
  }
  const pkg = await findScopedCdsPackage(projectRoot, 'cds-illustrations');
  if (!pkg) {
    console.error('Error: @coinbase/cds-illustrations not found in node_modules.');
    process.exitCode = 1;
    return;
  }
  const selectedVariants = resolvedVariant ? [resolvedVariant] : variants;
  const matches = [];
  for (const v of selectedVariants) {
    try {
      const { names, descriptionMap } = await loadVariantData(pkg, projectRoot, v);
      for (const name of names) {
        const nameHit = name.toLowerCase().includes(queryLower);
        const { tags, descKeyHit } = iconTagsAndDescriptionHit(descriptionMap, name, queryLower);
        if (!nameHit && !descKeyHit) continue;
        matches.push({ variant: v, name, nameHit, tags });
      }
    } catch (error) {
      console.error(
        `Warning: variant "${v}" (${pkg}):`,
        error instanceof Error ? error.message : error,
      );
    }
  }
  const deduped = [...new Map(matches.map((e) => [`${e.variant}:${e.name}`, e])).values()];
  deduped.sort((a, b) => {
    if (a.nameHit !== b.nameHit) return a.nameHit ? -1 : 1;
    const byName = a.name.localeCompare(b.name);
    if (byName !== 0) return byName;
    return a.variant.localeCompare(b.variant);
  });
  printResults(deduped, query);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
