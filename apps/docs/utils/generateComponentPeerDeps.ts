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

type PackageAnalysis = {
  web: ComponentPeerDeps;
  mobile: ComponentPeerDeps;
};

const PEER_DEPS_TO_IGNORE = ['react', 'react-native'];

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

function getExportPath(filePath: string, platform: 'web' | 'mobile'): string {
  const srcPath = `packages/${platform}/src/`;
  const relativePath = filePath.replace(srcPath, '');
  const dir = path.dirname(relativePath);
  return dir === '.' ? '' : `/${dir}`;
}

async function analyzePackageForDocs(
  packagePath: string,
  platform: 'web' | 'mobile',
  packageJson: any,
): Promise<ComponentPeerDeps> {
  const packagePeerDependencies = packageJson.peerDependencies;
  const componentFiles = await glob(`${packagePath}/src/**/*.tsx`, {
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
            !PEER_DEPS_TO_IGNORE.includes(packageName)
          ) {
            peerDependencies.push({
              name: packageName,
              version: packagePeerDependencies[packageName],
            });
          }
        }
      }

      // Only include components that are actually exported
      const exportPath = getExportPath(filePath, platform);
      const hasExport =
        packageJson.exports &&
        (packageJson.exports[`.${exportPath}`] ||
          packageJson.exports[`.${exportPath}/${componentName}`]);

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

function generateDocumentationTable(analysis: PackageAnalysis): string {
  let documentation = '# Component Peer Dependencies\n\n';
  documentation +=
    'This document lists the peer dependencies required for each component when importing individually.\n\n';

  // Web Components
  documentation += '## Web Components (@coinbase/cds-web)\n\n';
  documentation += '| Component | Import Path | Peer Dependencies |\n';
  documentation += '|-----------|-------------|-------------------|\n';

  const webComponents = Object.entries(analysis.web).sort(([a], [b]) => a.localeCompare(b));
  for (const [componentName, info] of webComponents) {
    const importPath = `@coinbase/cds-web${info.exportPath === 'root' ? '' : info.exportPath}`;
    const peerDeps =
      info.peerDependencies.length > 0
        ? info.peerDependencies.map((d) => `${d.name}@${d.version}`).join(', ')
        : 'react';
    documentation += `| ${componentName} | \`${importPath}\` | ${peerDeps} |\n`;
  }

  // Mobile Components
  documentation += '\n## Mobile Components (@coinbase/cds-mobile)\n\n';
  documentation += '| Component | Import Path | Peer Dependencies |\n';
  documentation += '|-----------|-------------|-------------------|\n';

  const mobileComponents = Object.entries(analysis.mobile).sort(([a], [b]) => a.localeCompare(b));
  for (const [componentName, info] of mobileComponents) {
    const importPath = `@coinbase/cds-mobile${info.exportPath === 'root' ? '' : info.exportPath}`;
    const peerDeps =
      info.peerDependencies.length > 0
        ? info.peerDependencies.map((d) => `${d.name}@${d.version}`).join(', ')
        : 'react';
    documentation += `| ${componentName} | \`${importPath}\` | ${peerDeps} |\n`;
  }

  return documentation;
}

function generateJSONOutput(analysis: PackageAnalysis): string {
  return JSON.stringify(analysis, null, 2);
}

async function updateMetadataFiles(analysis: PackageAnalysis): Promise<void> {
  console.log('Updating metadata files with peer dependency information...');

  // Find all metadata files in the docs directory
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

      // Extract component name from the import statement
      const importMatch = metadata.import?.match(/import\s*{\s*([^}]+)\s*}/);
      if (!importMatch) {
        console.warn(`Could not extract component name from: ${metadataFile}`);
        continue;
      }

      const componentName = importMatch[1].trim();
      const platform = isWeb ? 'web' : 'mobile';
      const componentData = analysis[platform][componentName];

      if (componentData) {
        // Add peer dependencies to metadata
        metadata.dependencies = componentData.peerDependencies;

        // Write back to file with pretty formatting
        fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2) + '\n');
        updatedFiles++;
      } else {
        console.warn(`Component ${componentName} not found in ${platform} analysis`);
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

  const webPackageJson = JSON.parse(fs.readFileSync('packages/web/package.json', 'utf-8'));
  const mobilePackageJson = JSON.parse(fs.readFileSync('packages/mobile/package.json', 'utf-8'));

  // Analyze peer dependencies for each component in both packages
  const webAnalysis = await analyzePackageForDocs('packages/web', 'web', webPackageJson);
  const mobileAnalysis = await analyzePackageForDocs(
    'packages/mobile',
    'mobile',
    mobilePackageJson,
  );

  const analysis: PackageAnalysis = {
    web: webAnalysis,
    mobile: mobileAnalysis,
  };

  if (shouldGenerateReportFiles === 'y') {
    // Generate documentation
    const docsContent = generateDocumentationTable(analysis);
    fs.writeFileSync('component-peer-dependencies.md', docsContent);
    const jsonContent = generateJSONOutput(analysis);
    fs.writeFileSync('component-peer-dependencies.json', jsonContent);
  }

  if (shouldUpdateMetadata === 'y') {
    // Update metadata files
    await updateMetadataFiles(analysis);
  }

  // Print summary
  console.log('\nDocumentation generated:');
  console.log('- component-peer-dependencies.md');
  console.log('- component-peer-dependencies.json');

  console.log(`\nSummary:`);
  console.log(`- Web components analyzed: ${Object.keys(webAnalysis).length}`);
  console.log(`- Mobile components analyzed: ${Object.keys(mobileAnalysis).length}`);

  const webPeerDeps = new Set(
    Object.values(webAnalysis).flatMap((c) => c.peerDependencies.map((d) => d.name)),
  );
  const mobilePeerDeps = new Set(
    Object.values(mobileAnalysis).flatMap((c) => c.peerDependencies.map((d) => d.name)),
  );

  console.log(`\nUnique peer dependencies:`);
  console.log(`- Web: ${Array.from(webPeerDeps).join(', ')}`);
  console.log(`- Mobile: ${Array.from(mobilePeerDeps).join(', ')}`);
}

if (require.main === module) {
  main().catch(console.error);
}

export { analyzePackageForDocs, generateDocumentationTable };
