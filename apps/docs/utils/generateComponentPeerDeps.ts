import { input } from '@inquirer/prompts';
import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

import type { Dependency } from '../src/components/page/Metadata';

type PackageConfig = {
  packageName: string;
  packageDir: string;
};

const PACKAGES: PackageConfig[] = [
  { packageName: '@coinbase/cds-web', packageDir: 'packages/web' },
  { packageName: '@coinbase/cds-mobile', packageDir: 'packages/mobile' },
  { packageName: '@coinbase/cds-web-visualization', packageDir: 'packages/web-visualization' },
  {
    packageName: '@coinbase/cds-mobile-visualization',
    packageDir: 'packages/mobile-visualization',
  },
];

/**
 * Build a combined map of peer dependency versions from all known packages.
 * Keys are dependency names, values are the version range from package.json.
 */
function loadPeerDependencyVersions(): Map<string, string> {
  const versions = new Map<string, string>();
  for (const pkg of PACKAGES) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(`${pkg.packageDir}/package.json`, 'utf-8'));
      const peerDeps: Record<string, string> = packageJson.peerDependencies ?? {};
      for (const [name, version] of Object.entries(peerDeps)) {
        versions.set(name, version);
      }
    } catch {
      // skip if package.json can't be read
    }
  }
  return versions;
}

/**
 * Given a metadata object with a `dependencies` array and the current peer
 * dependency version map, return a copy with versions synced. Only updates
 * versions for deps already listed -- never adds or removes entries.
 */
function syncDependencyVersions(
  dependencies: Dependency[],
  peerDepVersions: Map<string, string>,
): { synced: Dependency[]; warnings: string[] } {
  const warnings: string[] = [];
  const synced = dependencies.map((dep) => {
    const currentVersion = peerDepVersions.get(dep.name);
    if (!currentVersion) {
      warnings.push(`${dep.name} is not listed in any package.json peerDependencies`);
      return dep;
    }
    return { ...dep, version: currentVersion };
  });
  return { synced, warnings };
}

type MetadataFileResult = {
  filePath: string;
  updated: boolean;
  warnings: string[];
};

async function updateMetadataFiles(peerDepVersions: Map<string, string>): Promise<void> {
  console.log('Syncing peer dependency versions in metadata files...');

  const metadataFiles = await glob('apps/docs/docs/components/**/*Metadata.json');
  const results: MetadataFileResult[] = [];

  for (const metadataFile of metadataFiles) {
    try {
      const fileName = path.basename(metadataFile);
      if (fileName !== 'webMetadata.json' && fileName !== 'mobileMetadata.json') continue;

      const raw = fs.readFileSync(metadataFile, 'utf-8');
      const metadata = JSON.parse(raw);
      const deps: Dependency[] = metadata.dependencies ?? [];
      if (deps.length === 0) continue;

      const { synced, warnings } = syncDependencyVersions(deps, peerDepVersions);
      const changed = JSON.stringify(deps) !== JSON.stringify(synced);

      if (changed) {
        metadata.dependencies = synced;
        fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2) + '\n');
      }

      results.push({ filePath: metadataFile, updated: changed, warnings });
    } catch (error) {
      console.error(`Error processing ${metadataFile}:`, error);
    }
  }

  const updatedCount = results.filter((r) => r.updated).length;
  const warningResults = results.filter((r) => r.warnings.length > 0);

  console.log(`\nVersion sync complete:`);
  console.log(`- Files updated: ${updatedCount}`);

  if (warningResults.length > 0) {
    console.warn(`\nWarnings:`);
    for (const r of warningResults) {
      for (const w of r.warnings) {
        console.warn(`  ${r.filePath}: ${w}`);
      }
    }
  }
}

async function checkMetadataFiles(peerDepVersions: Map<string, string>): Promise<boolean> {
  console.log('Checking metadata files for outdated peer dependency versions...');

  const metadataFiles = await glob('apps/docs/docs/components/**/*Metadata.json');
  const outdatedFiles: string[] = [];

  for (const metadataFile of metadataFiles) {
    try {
      const fileName = path.basename(metadataFile);
      if (fileName !== 'webMetadata.json' && fileName !== 'mobileMetadata.json') continue;

      const metadata = JSON.parse(fs.readFileSync(metadataFile, 'utf-8'));
      const deps: Dependency[] = metadata.dependencies ?? [];
      if (deps.length === 0) continue;

      const { synced } = syncDependencyVersions(deps, peerDepVersions);
      if (JSON.stringify(deps) !== JSON.stringify(synced)) {
        outdatedFiles.push(metadataFile);
      }
    } catch {
      // skip unparseable files
    }
  }

  if (outdatedFiles.length > 0) {
    console.error(
      `\n${outdatedFiles.length} metadata file(s) have outdated peer dependency versions:`,
    );
    for (const file of outdatedFiles) {
      console.error(`  - ${file}`);
    }
    console.error('\nRun "yarn nx run docs:peer-dependencies" to update them.');
    return false;
  }

  console.log('\nAll metadata files have up-to-date versions.');
  return true;
}

async function main(): Promise<void> {
  const ciMode = process.argv.includes('--ci');
  const checkMode = process.argv.includes('--fail-on-changes');

  let shouldUpdate = 'y';

  if (!ciMode && !checkMode) {
    shouldUpdate = await input({
      message: 'Sync peer dependency versions in metadata files? (y/n)',
      default: 'y',
      validate: (value: string) => ['y', 'n'].includes(value) || 'Please enter y or n',
    });
  }

  const peerDepVersions = loadPeerDependencyVersions();

  console.log(
    `Loaded ${peerDepVersions.size} peer dependency versions from ${PACKAGES.length} packages.`,
  );

  if (checkMode) {
    const passed = await checkMetadataFiles(peerDepVersions);
    process.exit(passed ? 0 : 1);
  }

  if (shouldUpdate === 'y') {
    await updateMetadataFiles(peerDepVersions);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { loadPeerDependencyVersions, syncDependencyVersions };
