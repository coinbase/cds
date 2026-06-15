'use strict';

const fs = require('fs');
const path = require('path');

const BARREL_TARGET_PATTERN = /(?:^|\/)index\.(?:[mc]?[jt]sx?|d\.[mc]?ts)$/;
// CDS is developed under the `@coinbase/cds-*` scope in this monorepo. This
// rule only lints CDS's own source, so it matches that scope (not the
// `@cbhq/cds-*` scope the packages are published under for consumers).
const CDS_PACKAGE_PREFIX = '@coinbase/cds-';
const DEP_KEYS = ['dependencies', 'devDependencies', 'peerDependencies'];

// Extensions probed when resolving a module specifier to a file on disk, in
// priority order. Source (`.ts`/`.tsx`) is listed before built output so the
// rule works against unbuilt workspace packages (symlinked `src/`) as well as
// published packages (built `esm/`/`dts/`).
const MODULE_EXTENSIONS = ['.ts', '.tsx', '.d.ts', '.js', '.jsx', '.mjs', '.cjs'];
// Build-output roots that mirror `src/`. When an `exports` target points at a
// not-yet-built location (e.g. `./esm/foo.js`) we retry under `src/`.
const BUILD_ROOTS = ['esm', 'dts', 'lib', 'dist', 'cjs', 'build'];
const SOURCE_ROOTS = ['src', ...BUILD_ROOTS];

function resolveExportTarget(value) {
  if (typeof value === 'string') {
    return value;
  }
  if (value && typeof value === 'object') {
    return value.default ?? value.import ?? value.require ?? value.types;
  }
  return undefined;
}

function collectBarrelSubpaths(exportsField) {
  if (!exportsField || typeof exportsField !== 'object') {
    return null;
  }
  const subpathBarrels = new Set();
  let hasRootBarrel = false;
  for (const [key, value] of Object.entries(exportsField)) {
    if (typeof key !== 'string' || key.includes('*')) {
      continue;
    }
    const target = resolveExportTarget(value);
    if (typeof target !== 'string' || !BARREL_TARGET_PATTERN.test(target)) {
      continue;
    }
    if (key === '.') {
      hasRootBarrel = true;
    } else if (key.startsWith('./')) {
      subpathBarrels.add(key.slice(2));
    }
  }
  if (subpathBarrels.size === 0) {
    return null;
  }
  if (hasRootBarrel) {
    subpathBarrels.add('');
  }
  return subpathBarrels;
}

const dirToWorkspacePkgJsonCache = new Map();
const workspacePkgJsonToForbiddenCache = new Map();
const targetPkgJsonToBarrelsCache = new Map();

function findNearestPackageJson(startDir) {
  if (typeof startDir !== 'string' || !startDir) {
    return null;
  }
  if (dirToWorkspacePkgJsonCache.has(startDir)) {
    return dirToWorkspacePkgJsonCache.get(startDir);
  }
  const visited = [];
  let dir = startDir;
  let result = null;
  while (true) {
    visited.push(dir);
    if (dirToWorkspacePkgJsonCache.has(dir)) {
      result = dirToWorkspacePkgJsonCache.get(dir);
      break;
    }
    const candidate = path.join(dir, 'package.json');
    if (fs.existsSync(candidate)) {
      result = candidate;
      break;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      result = null;
      break;
    }
    dir = parent;
  }
  for (const visitedDir of visited) {
    dirToWorkspacePkgJsonCache.set(visitedDir, result);
  }
  return result;
}

function getBarrelSubpathsForPackage(pkgName, fromDir) {
  let resolvedPath;
  try {
    resolvedPath = require.resolve(`${pkgName}/package.json`, { paths: [fromDir] });
  } catch {
    return null;
  }
  if (targetPkgJsonToBarrelsCache.has(resolvedPath)) {
    return targetPkgJsonToBarrelsCache.get(resolvedPath);
  }
  let barrels = null;
  try {
    const pkg = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
    barrels = collectBarrelSubpaths(pkg && pkg.exports);
  } catch {
    barrels = null;
  }
  targetPkgJsonToBarrelsCache.set(resolvedPath, barrels);
  return barrels;
}

function collectCdsDeps(workspacePkg) {
  const deps = new Set();
  for (const key of DEP_KEYS) {
    const section = workspacePkg && workspacePkg[key];
    if (!section || typeof section !== 'object') {
      continue;
    }
    for (const name of Object.keys(section)) {
      if (name.startsWith(CDS_PACKAGE_PREFIX)) {
        deps.add(name);
      }
    }
  }
  return deps;
}

function computeForbidden(workspacePkgJsonPath) {
  const forbidden = new Map();
  let workspacePkg;
  try {
    workspacePkg = JSON.parse(fs.readFileSync(workspacePkgJsonPath, 'utf8'));
  } catch {
    return forbidden;
  }
  const workspaceDir = path.dirname(workspacePkgJsonPath);
  for (const dep of collectCdsDeps(workspacePkg)) {
    const subpaths = getBarrelSubpathsForPackage(dep, workspaceDir);
    if (subpaths && subpaths.size > 0) {
      forbidden.set(dep, subpaths);
    }
  }
  return forbidden;
}

function getForbiddenImportsForFile(filename) {
  if (typeof filename !== 'string' || !filename) {
    return null;
  }
  const workspacePkgJsonPath = findNearestPackageJson(path.dirname(filename));
  if (!workspacePkgJsonPath) {
    return null;
  }
  if (workspacePkgJsonToForbiddenCache.has(workspacePkgJsonPath)) {
    return workspacePkgJsonToForbiddenCache.get(workspacePkgJsonPath);
  }
  const forbidden = computeForbidden(workspacePkgJsonPath);
  workspacePkgJsonToForbiddenCache.set(workspacePkgJsonPath, forbidden);
  return forbidden;
}

// ---------------------------------------------------------------------------
// Autofix support: resolve each name imported from a barrel to the deep subpath
// of the leaf module that actually declares it.
// ---------------------------------------------------------------------------

const parsedModuleCache = new Map();
const resolveNameCache = new Map();

function isFile(candidate) {
  try {
    return fs.statSync(candidate).isFile();
  } catch {
    return false;
  }
}

// Resolve a base path (without extension) to a real file, probing extensions
// and `index` files. Returns the absolute path or null.
function resolveFsPath(basePath) {
  if (isFile(basePath)) {
    return basePath;
  }
  for (const ext of MODULE_EXTENSIONS) {
    if (isFile(basePath + ext)) {
      return basePath + ext;
    }
  }
  for (const ext of MODULE_EXTENSIONS) {
    const indexCandidate = path.join(basePath, `index${ext}`);
    if (isFile(indexCandidate)) {
      return indexCandidate;
    }
  }
  return null;
}

function stripModuleExtension(filePath) {
  return filePath.replace(/\.(?:d\.ts|[mc]?tsx?|[mc]?jsx?)$/, '');
}

// Resolve a target path, preferring source files over compiled output.
//
// When a package's `exports` map points at a build directory (e.g. `./esm/`),
// compiled JS files erase TypeScript `type` exports entirely. To keep
// type-only exports traceable, always try `src/` (and other source roots)
// BEFORE the direct build-output path. The direct path is used only as a last
// resort when no source equivalent exists.
function resolveWithRootFallbacks(pkgDir, targetNoExt) {
  const rel = path.relative(pkgDir, targetNoExt).split(path.sep);
  if (rel.length > 0 && rel[0] !== '..' && BUILD_ROOTS.includes(rel[0])) {
    const rest = rel.slice(1);
    for (const root of SOURCE_ROOTS) {
      if (root === rel[0]) {
        continue;
      }
      const candidate = resolveFsPath(path.join(pkgDir, root, ...rest));
      if (candidate) {
        return candidate;
      }
    }
  }
  return resolveFsPath(targetNoExt);
}

function getPackageDir(packageName, fromDir) {
  try {
    return path.dirname(require.resolve(`${packageName}/package.json`, { paths: [fromDir] }));
  } catch {
    return null;
  }
}

function getExportTargetForSubpath(exportsField, subpath) {
  if (!exportsField || typeof exportsField !== 'object') {
    return null;
  }
  const key = subpath === '' ? '.' : `./${subpath}`;
  if (Object.prototype.hasOwnProperty.call(exportsField, key)) {
    return resolveExportTarget(exportsField[key]);
  }
  const wildcard = exportsField['./*'];
  if (wildcard) {
    const target = resolveExportTarget(wildcard);
    if (typeof target === 'string') {
      return target.replace('*', subpath);
    }
  }
  return null;
}

// Resolve the file backing a package entry point (root or declared subpath).
function resolveBarrelEntryFile(packageName, subpath, fromDir) {
  const pkgDir = getPackageDir(packageName, fromDir);
  if (!pkgDir) {
    return null;
  }
  let exportsField;
  try {
    const pkgJsonPath = require.resolve(`${packageName}/package.json`, { paths: [fromDir] });
    exportsField = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8')).exports;
  } catch {
    exportsField = null;
  }
  let target = getExportTargetForSubpath(exportsField, subpath);
  if (typeof target !== 'string') {
    // No exports map: fall back to a conventional source layout.
    target = `./${subpath || 'index'}`;
  }
  const targetNoExt = stripModuleExtension(path.join(pkgDir, target));
  return resolveWithRootFallbacks(pkgDir, targetNoExt);
}

// Remove block and line comments so export/import scanning isn't fooled by
// commented-out code or JSDoc examples. The `[^:]` guard avoids eating `://`.
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

function parseSpecifierList(rawList) {
  const items = [];
  for (const part of rawList.split(',')) {
    const token = part.trim();
    if (!token) {
      continue;
    }
    const parsed = token.match(
      /^(?:type\s+)?([A-Za-z0-9_$]+|default)(?:\s+as\s+([A-Za-z0-9_$]+))?$/,
    );
    if (!parsed) {
      continue;
    }
    items.push({ imported: parsed[1], exported: parsed[2] || parsed[1] });
  }
  return items;
}

// Parse a module's export statements into the pieces needed to trace a name to
// its declaring module: names declared/exported locally, named re-exports,
// star re-exports, and `export * as` namespace re-exports.
function parseModuleExports(filePath) {
  if (parsedModuleCache.has(filePath)) {
    return parsedModuleCache.get(filePath);
  }
  const result = { locals: new Set(), named: [], stars: [], starAs: [] };
  let source;
  try {
    source = stripComments(fs.readFileSync(filePath, 'utf8'));
  } catch {
    parsedModuleCache.set(filePath, result);
    return result;
  }

  for (const m of source.matchAll(
    /export\s*\*\s*as\s+([A-Za-z0-9_$]+)\s+from\s*['"]([^'"]+)['"]/g,
  )) {
    result.starAs.push({ name: m[1], spec: m[2] });
  }

  for (const m of source.matchAll(/export\s*\*\s*from\s*['"]([^'"]+)['"]/g)) {
    result.stars.push(m[1]);
  }

  for (const m of source.matchAll(/export\s+(?:type\s+)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    for (const item of parseSpecifierList(m[1])) {
      result.named.push({ imported: item.imported, exported: item.exported, spec: m[2] });
    }
  }

  // `export { a, b as c };` with no `from` — these names originate here.
  for (const m of source.matchAll(/export\s+(?:type\s+)?\{([^}]*)\}\s*(?=;|\n|$)/g)) {
    const tail = source.slice(m.index + m[0].length).trimStart();
    if (tail.startsWith('from')) {
      continue;
    }
    for (const item of parseSpecifierList(m[1])) {
      result.locals.add(item.exported);
    }
  }

  const declPattern =
    /export\s+(?:declare\s+)?(?:default\s+)?(?:async\s+)?(?:abstract\s+)?(?:const|let|var|function\*?|class|interface|type|enum|namespace)\s+([A-Za-z0-9_$]+)/g;
  for (const m of source.matchAll(declPattern)) {
    result.locals.add(m[1]);
  }

  if (/export\s+default\b/.test(source)) {
    result.locals.add('default');
  }

  parsedModuleCache.set(filePath, result);
  return result;
}

function resolveRelativeModule(fromFile, spec) {
  if (typeof spec !== 'string' || !spec.startsWith('.')) {
    // Bare specifiers cross package boundaries; we can't express those as a
    // deep subpath of the original package, so stop tracing here.
    return null;
  }
  return resolveFsPath(path.resolve(path.dirname(fromFile), spec));
}

// Trace an exported name from `file` to the module that declares it, following
// named and star re-exports. Returns { file } of the declaring (leaf) module.
function resolveNameToLeaf(file, name, visiting) {
  const cacheKey = `${file}::${name}`;
  if (resolveNameCache.has(cacheKey)) {
    return resolveNameCache.get(cacheKey);
  }
  if (visiting.has(file)) {
    return null;
  }
  visiting.add(file);

  const parsed = parseModuleExports(file);
  let resolved = null;

  if (parsed.locals.has(name)) {
    resolved = { file };
  }

  if (!resolved) {
    for (const entry of parsed.named) {
      if (entry.exported !== name) {
        continue;
      }
      const targetFile = resolveRelativeModule(file, entry.spec);
      if (!targetFile) {
        continue;
      }
      resolved = resolveNameToLeaf(targetFile, entry.imported, visiting) || { file: targetFile };
      break;
    }
  }

  if (!resolved) {
    for (const spec of parsed.stars) {
      const targetFile = resolveRelativeModule(file, spec);
      if (!targetFile) {
        continue;
      }
      const found = resolveNameToLeaf(targetFile, name, visiting);
      if (found) {
        resolved = found;
        break;
      }
    }
  }

  visiting.delete(file);
  resolveNameCache.set(cacheKey, resolved);
  return resolved;
}

// Convert a leaf module's absolute path into the public subpath specifier a
// consumer should import from (e.g. `@coinbase/cds-common/utils/getWidthInEm`).
// Returns null if the leaf is itself an `index` barrel (no clean deep import).
function leafFileToSpecifier(packageName, pkgDir, leafFile) {
  let rel = path.relative(pkgDir, leafFile).split(path.sep).join('/');
  rel = rel.replace(/^(?:src|esm|dts|lib|dist|cjs|build)\//, '');
  rel = stripModuleExtension(rel);
  const base = rel.split('/').pop();
  if (!rel || base === 'index') {
    return null;
  }
  return `${packageName}/${rel}`;
}

// For a set of names imported from a package barrel, return a map of
// name -> deep subpath specifier (or null when a name can't be traced).
function resolveLeafSpecifiers(packageName, subpath, names, fromDir) {
  const pkgDir = getPackageDir(packageName, fromDir);
  if (!pkgDir) {
    return null;
  }
  const barrelFile = resolveBarrelEntryFile(packageName, subpath, fromDir);
  if (!barrelFile) {
    return null;
  }
  const out = new Map();
  for (const name of names) {
    const leaf = resolveNameToLeaf(barrelFile, name, new Set());
    out.set(name, leaf ? leafFileToSpecifier(packageName, pkgDir, leaf.file) : null);
  }
  return out;
}

// For a set of names imported from a relative barrel, return a map of
// name -> relative specifier (from `fromFile`) pointing at the leaf module.
// Returns null when the barrel file can't be read; maps unresolvable names to null.
function resolveRelativeLeafSpecifiers(barrelFile, fromFile, names) {
  const fromDir = path.dirname(fromFile);
  const out = new Map();
  for (const name of names) {
    const leaf = resolveNameToLeaf(barrelFile, name, new Set());
    if (!leaf || BARREL_TARGET_PATTERN.test(leaf.file)) {
      out.set(name, null);
      continue;
    }
    const leafNoExt = stripModuleExtension(leaf.file);
    let rel = path.relative(fromDir, leafNoExt).split(path.sep).join('/');
    if (!rel.startsWith('.')) {
      rel = './' + rel;
    }
    out.set(name, rel);
  }
  return out;
}

// Resolve a relative specifier from `fromFile` and check whether it resolves
// to a barrel (index.*) file. Returns the resolved file path when it is a
// barrel, or null when it is not (or cannot be resolved).
function resolveRelativeBarrel(fromFile, spec) {
  if (typeof spec !== 'string' || !spec.startsWith('.')) {
    return null;
  }
  const resolved = resolveFsPath(path.resolve(path.dirname(fromFile), spec));
  if (!resolved || !BARREL_TARGET_PATTERN.test(resolved)) {
    return null;
  }
  return resolved;
}

function _clearCacheForTesting() {
  dirToWorkspacePkgJsonCache.clear();
  workspacePkgJsonToForbiddenCache.clear();
  targetPkgJsonToBarrelsCache.clear();
  parsedModuleCache.clear();
  resolveNameCache.clear();
}

module.exports = {
  BARREL_TARGET_PATTERN,
  CDS_PACKAGE_PREFIX,
  resolveExportTarget,
  collectBarrelSubpaths,
  collectCdsDeps,
  findNearestPackageJson,
  getBarrelSubpathsForPackage,
  getForbiddenImportsForFile,
  resolveLeafSpecifiers,
  resolveRelativeLeafSpecifiers,
  resolveRelativeBarrel,
  _clearCacheForTesting,
};
