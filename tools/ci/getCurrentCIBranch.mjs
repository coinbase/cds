export function getCurrentCIBranch() {
  return process.env.CB_GHA_BRANCH ?? '';
}
