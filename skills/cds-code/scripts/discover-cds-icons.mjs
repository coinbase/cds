#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const invokedScript =
  path.relative(process.cwd(), process.argv[1] ?? '') ||
  'skills/cds-code/scripts/discover-cds-icons.mjs';

const usage = `Usage: node ${invokedScript} <query> [--project-root <path>]
Example: node ${invokedScript} shield`;

function parseArgs(argv) {
  let query = '';
  let projectRoot = '';
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--project-root') {
      projectRoot = argv[i + 1] ?? '';
      i += 1;
      continue;
    }
    if (!query) query = arg;
  }
  return { query: query.trim(), projectRoot };
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

function printResults(matches, query) {
  if (!matches.length) {
    console.log(`No matches for "${query}".`);
    process.exitCode = 1;
    return;
  }
  const n = matches.length;
  console.log(`Found ${n} ${n === 1 ? 'icon' : 'icons'}:`);
  for (const { name, tags } of matches) {
    console.log(formatWithTags(name, tags));
  }
}

async function main() {
  const { query, projectRoot: argProjectRoot } = parseArgs(process.argv.slice(2));
  if (!query) {
    console.error('Error: missing query.\n' + usage);
    process.exitCode = 1;
    return;
  }
  const queryLower = query.toLowerCase();
  const projectRoot = argProjectRoot ? path.resolve(argProjectRoot) : await findProjectRoot();
  if (!projectRoot) {
    console.error('Error: no project root (package.json + node_modules). Use --project-root.');
    process.exitCode = 1;
    return;
  }
  const pkg = await findScopedCdsPackage(projectRoot, 'cds-icons');
  if (!pkg) {
    console.error('Error: @coinbase/cds-icons not found in node_modules.');
    process.exitCode = 1;
    return;
  }
  let names;
  let descriptionMap;
  try {
    const namesModule = await importFromProject(`${pkg}/names`, projectRoot);
    const dmModule = await importFromProject(`${pkg}/descriptionMap`, projectRoot);
    names = namesModule.names ?? namesModule.default;
    descriptionMap = dmModule.descriptionMap ?? dmModule.default;
  } catch (error) {
    console.error(`Error: import failed (${pkg}).`);
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
    return;
  }
  if (!Array.isArray(names) || typeof descriptionMap !== 'object' || descriptionMap === null) {
    console.error('Error: unexpected icon data shape.');
    process.exitCode = 1;
    return;
  }
  const matches = [];
  for (const name of names) {
    const nameHit = name.toLowerCase().includes(queryLower);
    const { tags, descKeyHit } = iconTagsAndDescriptionHit(descriptionMap, name, queryLower);
    if (!nameHit && !descKeyHit) continue;
    matches.push({ name, nameHit, tags });
  }
  matches.sort((a, b) => {
    if (a.nameHit !== b.nameHit) return a.nameHit ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  printResults(matches, query);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
