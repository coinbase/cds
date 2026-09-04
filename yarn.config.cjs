/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require('@yarnpkg/types');

// Optional dependencies are still considered of type "dependencies"
// This function finds if a dependency is optional by checking the workspace manifest optionalDependencies.
const isOptionalDependency = (dependency) => {
  return (
    Object.keys(dependency.workspace.manifest.optionalDependencies ?? {}).find(
      (optionalDependency) => optionalDependency === dependency.ident,
    ) !== undefined
  );
};

/**
 * Workspaces that are excluded from dependency version consistency checks.
 * These packages are allowed to have different versions of dependencies
 * for specific testing or compatibility purposes.
 */
const CONSTRAINT_EXCLUDED_WORKSPACES = new Set([
  // This app validates React 18 compatibility and must stay on React 18
  // even when other packages upgrade to React 19
  'react18-compat-test',
]);

/**
 * Checks if a workspace is excluded from consistency constraints.
 * @param {import('@yarnpkg/types').Yarn.Constraints.Dependency} dependency
 * @returns {boolean}
 */
const isExcludedWorkspace = (dependency) => {
  return CONSTRAINT_EXCLUDED_WORKSPACES.has(dependency.workspace.ident);
};

/**
 * This rule will enforce that a workspace MUST depend on the same version of
 * a dependency as the one used by the other workspaces.
 *
 * @param {import('@yarnpkg/types').Yarn.Constraints.Context} context
 */
const reportMismatchedDependencies = ({ Yarn }) => {
  const registry = new Map();

  // 1. Collect every instance of every dependency
  for (const dep of Yarn.dependencies()) {
    if (dep.type === 'peerDependencies') continue;
    if (isOptionalDependency(dep)) continue;
    if (isExcludedWorkspace(dep)) continue;

    if (!registry.has(dep.ident)) registry.set(dep.ident, []);
    registry.get(dep.ident).push(dep);
  }

  // 2. Check for mismatches and report them pivoted
  for (const [ident, instances] of registry) {
    const uniqueRanges = new Set(instances.map((d) => d.range));

    if (uniqueRanges.size > 1) {
      // Create a string that lists all versions used in the repo
      const versionSummary = instances.map((d) => `${d.workspace.ident} (${d.range})`).join(', ');

      for (const dep of instances) {
        // We report an error on the specific dependency instance
        dep.error(
          `Version mismatch for ${ident}. Current: ${dep.range}. Versions found in repo: [${versionSummary}]`,
        );
      }
    }
  }
};

/**
 * This rule will enforce that a workspace MUST depend on the local "workspace:^"
 * version of a dependency if it exists.
 *
 * @param {import('@yarnpkg/types').Yarn.Constraints.Context} context
 */
const enforceWorkspaceDependenciesWhereAvailable = ({ Yarn }) => {
  for (const workspace of Yarn.workspaces()) {
    for (const workspacePackageDependency of Yarn.dependencies({ ident: workspace.ident })) {
      if (workspacePackageDependency.type === 'peerDependencies') continue;
      workspacePackageDependency.update('workspace:^');
    }
  }
};

/**
 * Enforces that every peerDependency is present in devDependencies.
 * If missing, it copies the peer range. If it exists, it stays as is
 * to allow for specific dev versions that satisfy the peer range.
 * * * @param {import('@yarnpkg/types').Yarn.Constraints.Context} context
 */
const enforcePeerDevSync = ({ Yarn }) => {
  for (const workspace of Yarn.workspaces()) {
    // Get all peer dependencies for this specific workspace
    const peerDeps = Yarn.dependencies({ workspace, type: 'peerDependencies' });

    for (const peerDep of peerDeps) {
      // Check if this package is already in devDependencies
      const hasDevDep =
        Yarn.dependencies({
          workspace,
          ident: peerDep.ident,
          type: 'devDependencies',
        }).length > 0;

      if (!hasDevDep) {
        // Only set it if it's missing.
        // This avoids fighting with specific versions you might have set manually.
        workspace.set(['devDependencies', peerDep.ident], peerDep.range);
      }
    }
  }
};

module.exports = defineConfig({
  async constraints(context) {
    reportMismatchedDependencies(context);
    enforceWorkspaceDependenciesWhereAvailable(context);
    enforcePeerDevSync(context);
  },
});
