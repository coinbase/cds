import path from 'node:path';
import type { PackageJson, RequireAtLeastOne } from 'type-fest';

type PackageJsonWithVersion = RequireAtLeastOne<PackageJson, 'version'>;
const cache: Record<string, PackageJsonWithVersion> = {};

export function getPackageJsonFromTsconfig(tsconfigPath: string) {
  if (cache[tsconfigPath]) {
    return cache[tsconfigPath];
  }
  const packageDirname = path.dirname(tsconfigPath);
  const packageJsonPath = path.resolve(packageDirname, 'package.json');
  const packageJson: PackageJsonWithVersion = require(packageJsonPath);
  cache[tsconfigPath] = packageJson;
  return packageJson;
}
