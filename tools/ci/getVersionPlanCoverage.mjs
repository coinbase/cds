import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import { getAffectedPackages } from './getAffectedPackages.mjs';
import { getBase } from './getBase.mjs';
import { getCurrentCIBranch } from './getCurrentCIBranch.mjs';
import { logSuccess } from './logging.mjs';

const VERSION_PLANS_DIR = '.nx/version-plans';

/**
 * Reads the `release.groups` config and returns a lookup of every name a version plan is
 * allowed to reference (project names plus release group names) to the projects it covers.
 * A plan naming any member of a fixed group versions the whole group, so group members and
 * the group name are interchangeable.
 */
function getPlanNameToProjects() {
  const { release } = JSON.parse(fs.readFileSync('nx.json', 'utf8'));
  const lookup = new Map();

  for (const [groupName, group] of Object.entries(release?.groups ?? {})) {
    const projects = group.projects ?? [];
    const isFixed = group.projectsRelationship === 'fixed';

    lookup.set(groupName, projects);
    for (const project of projects) {
      lookup.set(project, isFixed ? projects : [project]);
    }
  }

  return lookup;
}

/** Extracts the project/group names from the YAML frontmatter of every pending version plan. */
function getPlannedProjects() {
  if (!fs.existsSync(VERSION_PLANS_DIR)) {
    return new Set();
  }

  const lookup = getPlanNameToProjects();
  const planned = new Set();

  for (const file of fs.readdirSync(VERSION_PLANS_DIR)) {
    if (!file.endsWith('.md')) {
      continue;
    }

    const contents = fs.readFileSync(path.join(VERSION_PLANS_DIR, file), 'utf8');
    const frontmatter = contents.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatter) {
      continue;
    }

    for (const line of frontmatter[1].split('\n')) {
      const entry = line.match(/^\s*['"]?([^'":]+)['"]?\s*:/);
      if (entry) {
        const name = entry[1].trim();
        (lookup.get(name) ?? [name]).forEach((project) => planned.add(project));
      }
    }
  }

  return planned;
}

function getMergeBase() {
  const base = getBase();
  const result = spawnSync('git', ['merge-base', base, 'HEAD'], { encoding: 'utf-8' });
  return result.status === 0 ? result.stdout.trim() : base;
}

/**
 * True when the project's package.json version differs from the version at the merge base,
 * meaning `nx release` already consumed the plan earlier in this branch.
 */
function versionBumpedSinceBase(projectRoot, mergeBase) {
  const packageJsonPath = `${projectRoot}/package.json`;
  const currentVersion = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')).version;

  const result = spawnSync('git', ['show', `${mergeBase}:${packageJsonPath}`], {
    encoding: 'utf-8',
  });

  // A package that does not exist at the merge base is new, so it needs no prior version.
  if (result.status !== 0) {
    return true;
  }

  return JSON.parse(result.stdout).version !== currentVersion;
}

/**
 * Returns the publishable projects that were meaningfully changed but are neither covered by a
 * pending version plan nor already versioned in this branch.
 */
export async function getProjectsMissingVersionPlans(logInfo, options = {}) {
  if (getCurrentCIBranch() === 'master') {
    logInfo('Skipping version plan check on master branch');
    return [];
  }

  logInfo('Checking for packages that need a version plan');

  const affectedPackages = await getAffectedPackages({ ...options, onlyPublishable: true });

  if (Object.keys(affectedPackages).length === 0) {
    logSuccess('No changes within packages');
    return [];
  }

  const plannedProjects = getPlannedProjects();
  const mergeBase = getMergeBase();

  return Object.keys(affectedPackages).filter((projectName) => {
    if (plannedProjects.has(projectName)) {
      return false;
    }

    return !versionBumpedSinceBase(affectedPackages[projectName].data.root, mergeBase);
  });
}
