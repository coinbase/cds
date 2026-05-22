export const RELEASE_BRANCH_REGEX = /^release-\d+\.x$/;

export function isReleaseBranch(branch) {
  return RELEASE_BRANCH_REGEX.test(branch);
}

export function isMasterOrReleaseBranch(branch) {
  return branch === 'master' || isReleaseBranch(branch);
}

export function getMajorFromReleaseBranch(branch) {
  const match = branch.match(/^release-(\d+)\.x$/);
  if (!match) {
    throw new Error(`Branch "${branch}" does not match the release branch pattern`);
  }
  return parseInt(match[1], 10);
}

/** npm dist-tag for release branches (bare vN is rejected as a semver range in npm 11+) */
export function getNpmDistTagFromReleaseBranch(branch) {
  return `v${getMajorFromReleaseBranch(branch)}-lts`;
}
