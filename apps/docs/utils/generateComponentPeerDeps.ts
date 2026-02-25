import { input } from '@inquirer/prompts';
import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

import type { Dependency } from '../src/components/page/Metadata';

type ComponentPeerDeps = {
  [componentName: string]: {
    filePath: string;
    peerDependencies: Dependency[];
    exportPath: string;
  };
};

type PackageConfig = {
  key: string;
  packageName: string;
  packageDir: string;
  label: string;
};

type PackageAnalysis = Record<string, ComponentPeerDeps>;

const PACKAGES: PackageConfig[] = [
  {
    key: 'web',
    packageName: '@coinbase/cds-web',
    packageDir: 'packages/web',
    label: 'Web Components (@coinbase/cds-web)',
  },
  {
    key: 'mobile',
    packageName: '@coinbase/cds-mobile',
    packageDir: 'packages/mobile',
    label: 'Mobile Components (@coinbase/cds-mobile)',
  },
  {
    key: 'webVisualization',
    packageName: '@coinbase/cds-web-visualization',
    packageDir: 'packages/web-visualization',
    label: 'Web Visualization (@coinbase/cds-web-visualization)',
  },
  {
    key: 'mobileVisualization',
    packageName: '@coinbase/cds-mobile-visualization',
    packageDir: 'packages/mobile-visualization',
    label: 'Mobile Visualization (@coinbase/cds-mobile-visualization)',
  },
];

const PEER_DEPS_TO_IGNORE = ['react', 'react-native'];
const PEER_DEP_SCOPES_TO_IGNORE = ['@coinbase/'];

function extractImports(fileContent: string): string[] {
  const importRegex = /import[\s\S]*?from\s+['"]([^'"]+)['"]/g;
  const imports: string[] = [];
  let match;

  while ((match = importRegex.exec(fileContent)) !== null) {
    imports.push(match[1]);
  }

  return imports;
}

function getPackageName(importPath: string): string {
  if (importPath.startsWith('@')) {
    const parts = importPath.split('/');
    return parts.length > 1 ? `${parts[0]}/${parts[1]}` : parts[0];
  }
  return importPath.split('/')[0];
}

function isExternalDependency(importPath: string): boolean {
  return !importPath.startsWith('.') && !importPath.startsWith('/');
}

function shouldIgnorePeerDep(packageName: string): boolean {
  if (PEER_DEPS_TO_IGNORE.includes(packageName)) return true;
  return PEER_DEP_SCOPES_TO_IGNORE.some((scope) => packageName.startsWith(scope));
}

function getExportPath(filePath: string, packageDir: string): string {
  const srcPath = `${packageDir}/src/`;
  const relativePath = filePath.replace(srcPath, '');
  const dir = path.dirname(relativePath);
  return dir === '.' ? '' : `/${dir}`;
}

function isComponentExported(
  exports: Record<string, unknown> | undefined,
  exportPath: string,
  componentName: string,
): boolean {
  if (!exports) return false;

  // Wildcard export covers all paths
  if (exports['./*']) return true;

  // Exact path match
  if (exports[`.${exportPath}`] || exports[`.${exportPath}/${componentName}`]) return true;

  // Check ancestor paths (e.g. "./overlays" covers "./overlays/tooltip/Tooltip")
  const segments = exportPath.split('/').filter(Boolean);
  for (let i = segments.length - 1; i > 0; i--) {
    const ancestorPath = `./${segments.slice(0, i).join('/')}`;
    if (exports[ancestorPath]) return true;
  }

  return false;
}

async function analyzePackageForDocs(
  packageDir: string,
  packageJson: any,
): Promise<ComponentPeerDeps> {
  const packagePeerDependencies = packageJson.peerDependencies;
  const componentFiles = await glob(`${packageDir}/src/**/*.tsx`, {
    ignore: ['**/__tests__/**', '**/__stories__/**', '**/index.ts'],
  });

  const results: ComponentPeerDeps = {};

  for (const filePath of componentFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const imports = extractImports(fileContent);

      const componentName = path.basename(filePath, '.tsx');
      const peerDependencies: Dependency[] = [];

      for (const importPath of imports) {
        if (isExternalDependency(importPath)) {
          const packageName = getPackageName(importPath);
          if (
            Object.keys(packagePeerDependencies).includes(packageName) &&
            !shouldIgnorePeerDep(packageName)
          ) {
            peerDependencies.push({
              name: packageName,
              version: packagePeerDependencies[packageName],
            });
          }
        }
      }

      const exportPath = getExportPath(filePath, packageDir);
      const hasExport = isComponentExported(packageJson.exports, exportPath, componentName);

      if (hasExport || peerDependencies.length > 0) {
        results[componentName] = {
          filePath,
          peerDependencies: peerDependencies.sort((a, b) => a.name.localeCompare(b.name)),
          exportPath: exportPath || 'root',
        };
      }
    } catch (error) {
      console.error(`Error analyzing ${filePath}:`, error);
    }
  }

  return results;
}

type UnmatchedComponent = {
  componentName: string;
  metadataFile: string;
  analysisKey: string;
  importStatement: string;
};

async function collectUnmatchedComponents(
  analysis: PackageAnalysis,
): Promise<UnmatchedComponent[]> {
  const metadataFiles = await glob('apps/docs/docs/components/**/*Metadata.json');
  const unmatched: UnmatchedComponent[] = [];

  for (const metadataFile of metadataFiles) {
    try {
      const metadata = JSON.parse(fs.readFileSync(metadataFile, 'utf-8'));
      const fileName = path.basename(metadataFile);

      if (fileName !== 'webMetadata.json' && fileName !== 'mobileMetadata.json') continue;

      const importMatch = metadata.import?.match(/import\s*{\s*([^}]+)\s*}/);
      if (!importMatch) continue;

      const rawNames = importMatch[1].trim();
      const componentNames = rawNames.split(',').map((n: string) => n.trim()).filter(Boolean);
      const analysisKey = resolveAnalysisKey(metadata.import);
      if (!analysisKey) continue;

      const hasMatch = componentNames.some((name: string) => analysis[analysisKey]?.[name]);
      if (!hasMatch) {
        unmatched.push({
          componentName: rawNames,
          metadataFile,
          analysisKey,
          importStatement: metadata.import,
        });
      }
    } catch {
      // skip files that can't be parsed
    }
  }

  return unmatched.sort((a, b) => a.componentName.localeCompare(b.componentName));
}

function generateDocumentationTable(
  analysis: PackageAnalysis,
  unmatchedComponents: UnmatchedComponent[],
): string {
  let documentation = '# Component Peer Dependencies\n\n';
  documentation +=
    'This document lists the peer dependencies required for each component when importing individually.\n\n';

  for (const pkg of PACKAGES) {
    const components = Object.entries(analysis[pkg.key] ?? {}).sort(([a], [b]) =>
      a.localeCompare(b),
    );
    documentation += `## ${pkg.label}\n\n`;
    documentation += '| Component | Import Path | Peer Dependencies |\n';
    documentation += '|-----------|-------------|-------------------|\n';

    for (const [componentName, info] of components) {
      const importPath = `${pkg.packageName}${info.exportPath === 'root' ? '' : info.exportPath}`;
      const peerDeps =
        info.peerDependencies.length > 0
          ? info.peerDependencies.map((d) => `${d.name}@${d.version}`).join(', ')
          : 'react';
      documentation += `| ${componentName} | \`${importPath}\` | ${peerDeps} |\n`;
    }

    documentation += '\n';
  }

  if (unmatchedComponents.length > 0) {
    documentation += '## Unmatched Components\n\n';
    documentation +=
      'These components have metadata files but could not be matched to an analyzed source file.\n';
    documentation +=
      'This typically means the component is a re-export or composite that doesn\'t have a direct `.tsx` file matching its name.\n\n';
    documentation += '| Component | Package | Import |\n';
    documentation += '|-----------|---------|--------|\n';

    for (const entry of unmatchedComponents) {
      documentation += `| ${entry.componentName} | ${entry.analysisKey} | \`${entry.importStatement}\` |\n`;
    }

    documentation += '\n';
  }

  return documentation;
}

function generateJSONOutput(analysis: PackageAnalysis): string {
  return JSON.stringify(analysis, null, 2);
}

function resolveAnalysisKey(importStatement: string): string | undefined {
  // Match the package name from the import's "from" path, checking more specific
  // package names first to avoid partial matches (e.g. cds-web-visualization before cds-web)
  const sortedPackages = [...PACKAGES].sort((a, b) => b.packageName.length - a.packageName.length);
  for (const pkg of sortedPackages) {
    if (importStatement.includes(pkg.packageName)) {
      return pkg.key;
    }
  }
  return undefined;
}

async function updateMetadataFiles(analysis: PackageAnalysis): Promise<void> {
  console.log('Updating metadata files with peer dependency information...');

  const metadataFiles = await glob('apps/docs/docs/components/**/*Metadata.json');

  let updatedFiles = 0;
  let notFoundComponents = 0;

  for (const metadataFile of metadataFiles) {
    try {
      const metadata = JSON.parse(fs.readFileSync(metadataFile, 'utf-8'));
      const fileName = path.basename(metadataFile);
      const isWeb = fileName === 'webMetadata.json';
      const isMobile = fileName === 'mobileMetadata.json';

      if (!isWeb && !isMobile) continue;

      const importMatch = metadata.import?.match(/import\s*{\s*([^}]+)\s*}/);
      if (!importMatch) {
        console.warn(`Could not extract component name from: ${metadataFile}`);
        continue;
      }

      const rawNames = importMatch[1].trim();
      const componentNames = rawNames.split(',').map((n: string) => n.trim()).filter(Boolean);
      const analysisKey = resolveAnalysisKey(metadata.import);

      if (!analysisKey) {
        console.warn(`Could not resolve package for import in: ${metadataFile}`);
        continue;
      }

      type ComponentEntry = ComponentPeerDeps[string];
      const matchedData: ComponentEntry[] = [];
      for (const name of componentNames) {
        const entry: ComponentEntry | undefined = analysis[analysisKey]?.[name];
        if (entry) matchedData.push(entry);
      }

      if (matchedData.length > 0) {
        const allPeerDeps = matchedData.flatMap((d: ComponentEntry) => d.peerDependencies);
        const dedupMap = new Map<string, Dependency>();
        for (const dep of allPeerDeps) {
          dedupMap.set(dep.name, dep);
        }
        const uniquePeerDeps = Array.from(dedupMap.values()).sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        metadata.dependencies = uniquePeerDeps;
        fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2) + '\n');
        updatedFiles++;
      } else {
        console.warn(`Component ${rawNames} not found in ${analysisKey} analysis`);
        notFoundComponents++;
      }
    } catch (error) {
      console.error(`Error updating ${metadataFile}:`, error);
    }
  }

  console.log(`\nMetadata update complete:`);
  console.log(`- Files updated: ${updatedFiles}`);
  console.log(`- Components not found: ${notFoundComponents}`);
}

async function main(): Promise<void> {
  const shouldUpdateMetadata = await input({
    message: 'Should update metadata files? (y/n)',
    default: 'y',
    validate: (value: string) => ['y', 'n'].includes(value) || 'Please enter y or n',
  });
  const shouldGenerateReportFiles = await input({
    message: 'Should generate report files? (y/n)',
    default: 'y',
    validate: (value: string) => ['y', 'n'].includes(value) || 'Please enter y or n',
  });

  console.log('Analyzing component peer dependencies for documentation...');

  const analysis: PackageAnalysis = {};

  for (const pkg of PACKAGES) {
    const packageJson = JSON.parse(fs.readFileSync(`${pkg.packageDir}/package.json`, 'utf-8'));
    analysis[pkg.key] = await analyzePackageForDocs(pkg.packageDir, packageJson);
  }

  const unmatchedComponents = await collectUnmatchedComponents(analysis);

  if (shouldGenerateReportFiles === 'y') {
    const docsContent = generateDocumentationTable(analysis, unmatchedComponents);
    fs.writeFileSync('component-peer-dependencies.md', docsContent);
    const jsonContent = generateJSONOutput(analysis);
    fs.writeFileSync('component-peer-dependencies.json', jsonContent);
  }

  if (shouldUpdateMetadata === 'y') {
    await updateMetadataFiles(analysis);
  }

  console.log('\nDocumentation generated:');
  console.log('- component-peer-dependencies.md');
  console.log('- component-peer-dependencies.json');

  console.log(`\nSummary:`);
  for (const pkg of PACKAGES) {
    const count = Object.keys(analysis[pkg.key] ?? {}).length;
    console.log(`- ${pkg.label}: ${count} components`);
  }

  console.log(`\nUnique peer dependencies:`);
  for (const pkg of PACKAGES) {
    const peerDeps = new Set(
      Object.values(analysis[pkg.key] ?? {}).flatMap((c) => c.peerDependencies.map((d) => d.name)),
    );
    console.log(`- ${pkg.key}: ${Array.from(peerDeps).join(', ') || '(none)'}`);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { analyzePackageForDocs, generateDocumentationTable };
