export function getCurrentCIBranch(): string {
  return process.env.CB_GHA_BRANCH ?? '';
}
