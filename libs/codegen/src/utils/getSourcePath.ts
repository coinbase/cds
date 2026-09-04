import path from 'node:path';
/**
 * Get absolute file path, relative to the root of repo.
 * @param pathInput - i.e. packages/mobile/package.json
 * @returns string - Users/katherinemartinez/cds/packages/mobile/package.json
 */
export function getSourcePath(pathInput: string) {
  /**
   * PROJECT_CWD comes from yarn
   * NX_MONOREPO_ROOT comes from mono-tasks
   * If unable to resolve any of those than walk back to root of repo manually
   */

  if (process.env.PROJECT_CWD) {
    return `${process.env.PROJECT_CWD}/${pathInput}`;
  }

  if (process.env.NX_MONOREPO_ROOT) {
    return `${process.env.NX_MONOREPO_ROOT}/${pathInput}`;
  }

  return path.resolve(__dirname, '../../../', pathInput);
}
