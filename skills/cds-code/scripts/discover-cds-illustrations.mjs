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

const invokedScript = path.relative(process.cwd(), process.argv[1] ?? '') || 'skills/cds-code/scripts/discover-cds-illustrations.mjs';

const usage = `Usage:
  node ${invokedScript} <query> [--variant <variant>] [--project-root <absolute-path>] [--limit <number>] [--all]

Variants:
  ${variants.join(', ')}

Examples:
  node ${invokedScript} shield
  node ${invokedScript} shiled
  node ${invokedScript} wallet --limit 12
  node ${invokedScript} rewards --variant Pictogram
  node ${invokedScript} card --project-root /Users/me/app`;

function parseArgs(argv) {
  let query = '';
  let projectRoot = '';
  let variant = '';
  let showAll = false;
  let limit = 20;

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

    if (arg === '--all') {
      showAll = true;
      continue;
    }

    if (arg === '--limit') {
      const value = Number(argv[i + 1] ?? '');
      if (Number.isFinite(value) && value > 0) {
        limit = Math.floor(value);
      }
      i += 1;
      continue;
    }

    if (!query) {
      query = arg;
    }
  }

  return { query: query.trim().toLowerCase(), projectRoot, variant, showAll, limit };
}

function normalizeVariantKey(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function resolveVariant(variantInput) {
  if (!variantInput) return '';
  const normalized = normalizeVariantKey(variantInput);
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

    if (await pathExists(packageJsonPath) && await pathExists(nodeModulesPath)) {
      return current;
    }

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
    if (!entry.isDirectory() || !entry.name.startsWith('@')) {
      continue;
    }

    const packageJsonPath = path.join(nodeModulesPath, entry.name, suffix, 'package.json');
    if (!(await pathExists(packageJsonPath))) {
      continue;
    }

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

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function toTokens(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function isSubsequence(needle, haystack) {
  let i = 0;
  let j = 0;
  while (i < needle.length && j < haystack.length) {
    if (needle[i] === haystack[j]) i += 1;
    j += 1;
  }
  return i === needle.length;
}

function levenshteinDistance(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const prev = new Array(b.length + 1);
  const curr = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j += 1) prev[j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + cost,
      );
    }
    for (let j = 0; j <= b.length; j += 1) prev[j] = curr[j];
  }

  return prev[b.length];
}

function scoreCandidate(query, candidate, descriptionExactMatch) {
  const queryLower = query.toLowerCase();
  const candidateLower = candidate.toLowerCase();
  const queryNorm = normalize(query);
  const candidateNorm = normalize(candidate);
  const queryTokens = toTokens(queryLower);
  const candidateTokens = toTokens(candidate);
  const distance = levenshteinDistance(queryNorm, candidateNorm);
  const startsWith = candidateNorm.startsWith(queryNorm);
  const includesRaw = candidateLower.includes(queryLower);
  const includesNorm = candidateNorm.includes(queryNorm);
  const subsequenceMatch = queryNorm.length >= 4 && isSubsequence(queryNorm, candidateNorm);
  const tokenMatchCount = queryTokens.filter((token) =>
    candidateTokens.some((candidateToken) => candidateToken.startsWith(token)),
  ).length;
  const typoMatch = queryNorm.length >= 4
    && candidateNorm[0] === queryNorm[0]
    && Math.abs(candidateNorm.length - queryNorm.length) <= 2
    && distance <= 2;

  const useDescriptionBoost = descriptionExactMatch && queryNorm.length >= 4;
  const hasMeaningfulMatch = useDescriptionBoost
    || startsWith
    || includesRaw
    || includesNorm
    || tokenMatchCount > 0
    || subsequenceMatch
    || typoMatch;

  if (!hasMeaningfulMatch) return 0;

  let score = 0;
  if (useDescriptionBoost) score += 130;
  if (queryNorm === candidateNorm) score += 110;
  if (queryLower === candidateLower) score += 90;
  if (startsWith) score += 75;
  if (includesRaw) score += 55;
  if (includesNorm) score += 45;
  if (subsequenceMatch) score += 20;
  if (typoMatch) score += 22;

  if (queryNorm.length > 2) {
    const maxEditDistance = Math.max(1, Math.floor(queryNorm.length / 4));
    if (distance <= maxEditDistance) {
      score += 24 - (distance * 8);
    }
  }

  if (queryTokens.length > 1) {
    if (tokenMatchCount > 0) {
      score += Math.round((tokenMatchCount / queryTokens.length) * 24);
    }
  } else if (tokenMatchCount > 0) {
    score += 10;
  }

  return score;
}

async function loadVariantData(cdsIllustrationsPackage, projectRoot, variant) {
  const namesSpecifier = `${cdsIllustrationsPackage}/__generated__/${variant}/data/names`;
  const descriptionMapSpecifier = `${cdsIllustrationsPackage}/__generated__/${variant}/data/descriptionMap`;

  const namesModule = await importFromProject(namesSpecifier, projectRoot);
  const descriptionMapModule = await importFromProject(descriptionMapSpecifier, projectRoot);

  const names = pickModuleValue(namesModule);
  const descriptionMap = pickModuleValue(descriptionMapModule);

  if (!Array.isArray(names) || typeof descriptionMap !== 'object' || descriptionMap === null) {
    throw new Error(`Unexpected illustration data for variant "${variant}".`);
  }

  return { names, descriptionMap };
}

function printMatches(matches, limit, showAll) {
  if (!matches.length) {
    console.log('No illustration matches found.');
    process.exitCode = 1;
    return;
  }

  const output = showAll ? matches : matches.slice(0, limit);
  const showingSuffix = showAll || output.length === matches.length
    ? ''
    : ` (showing top ${output.length})`;
  console.log(`Found ${matches.length} illustration match${matches.length === 1 ? '' : 'es'}${showingSuffix}:`);
  for (const match of output) {
    console.log(`${match.variant}:${match.name}`);
  }
}

async function main() {
  const {
    query,
    projectRoot: argProjectRoot,
    variant,
    showAll,
    limit,
  } = parseArgs(process.argv.slice(2));

  if (!query) {
    console.error('Error: missing query.');
    console.error(usage);
    process.exitCode = 1;
    return;
  }

  const resolvedVariant = resolveVariant(variant);
  if (variant && !resolvedVariant) {
    console.error(`Error: unsupported variant "${variant}".`);
    console.error(usage);
    console.error('Supported variants (any casing): Pictogram, SpotIcon, SpotSquare, SpotRectangle, HeroSquare');
    process.exitCode = 1;
    return;
  }

  const projectRoot = argProjectRoot ? path.resolve(argProjectRoot) : await findProjectRoot();
  if (!projectRoot) {
    console.error('Error: unable to locate a project root with package.json and node_modules.');
    console.error('Tip: pass --project-root <absolute-path>.');
    process.exitCode = 1;
    return;
  }

  const cdsIllustrationsPackage = await findScopedCdsPackage(projectRoot, 'cds-illustrations');
  if (!cdsIllustrationsPackage) {
    console.error('Error: could not find an installed cds-illustrations package in node_modules.');
    console.error('Tip: run from the app root or pass --project-root <absolute-path>.');
    process.exitCode = 1;
    return;
  }

  const selectedVariants = resolvedVariant ? [resolvedVariant] : variants;
  const matches = [];

  for (const selectedVariant of selectedVariants) {
    try {
      const { names, descriptionMap } = await loadVariantData(
        cdsIllustrationsPackage,
        projectRoot,
        selectedVariant,
      );

      const descriptionMatches = new Set(Array.isArray(descriptionMap[query]) ? descriptionMap[query] : []);
      for (const name of names) {
        const isDescriptionMatch = descriptionMatches.has(name);
        const score = scoreCandidate(query, name, isDescriptionMatch);
        if (score > 0) {
          matches.push({ variant: selectedVariant, name, score });
        }
      }
    } catch (error) {
      console.error(
        `Warning: unable to load illustration data for variant "${selectedVariant}" from ${cdsIllustrationsPackage}.`,
      );
      console.error(error instanceof Error ? error.message : String(error));
    }
  }

  const dedupedMatches = [...new Map(
    matches
      .sort((a, b) => b.score - a.score || a.variant.localeCompare(b.variant) || a.name.localeCompare(b.name))
      .map((entry) => [`${entry.variant}:${entry.name}`, entry]),
  ).values()];

  printMatches(dedupedMatches, limit, showAll);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
