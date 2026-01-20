import { globSync } from 'glob';
import fs from 'node:fs';
import path from 'node:path';

import { extractPathFromSourceUrl, REPO_ROOT } from './constants.mjs';

const COMPONENTS_DIR = path.join(REPO_ROOT, 'apps/docs/docs/components');

/**
 * Reads and parses component metadata from webMetadata.json and mobileMetadata.json.
 * @param {string} componentDir - Path to component directory
 * @returns {object} - Metadata object with sources, paths, figmaNodes, and platform metadata
 */
function getComponentMetadata(componentDir) {
  const sources = [];
  const paths = [];
  const figmaUrls = new Set();

  // Platform-specific metadata for dev resource validation
  let webMetadata = null;
  let mobileMetadata = null;

  const mobileMetadataPath = path.join(componentDir, 'mobileMetadata.json');
  const webMetadataPath = path.join(componentDir, 'webMetadata.json');

  for (const metadataPath of [mobileMetadataPath, webMetadataPath]) {
    if (fs.existsSync(metadataPath)) {
      try {
        const content = fs.readFileSync(metadataPath, 'utf-8');
        const metadata = JSON.parse(content);

        if (metadata.source) {
          sources.push(metadata.source);
          const localPath = extractPathFromSourceUrl(metadata.source);
          if (localPath) {
            paths.push(localPath);
          }
        }

        if (metadata.figma) {
          figmaUrls.add(metadata.figma);
        }

        // Store platform-specific metadata
        const platformMetadata = {
          source: metadata.source || null,
          figma: metadata.figma || null,
        };

        if (metadataPath === webMetadataPath) {
          webMetadata = platformMetadata;
        } else {
          mobileMetadata = platformMetadata;
        }
      } catch {
        // Skip invalid metadata files
      }
    }
  }

  return {
    sources,
    paths,
    figmaNodes: Array.from(figmaUrls),
    webMetadata,
    mobileMetadata,
  };
}

/**
 * Finds all official CDS components in the docsite.
 * @returns {Array} - Array of component objects with metadata
 */
export function findOfficialComponents() {
  const pattern = path.join(COMPONENTS_DIR, '**/index.mdx');
  const indexFiles = globSync(pattern);

  const components = [];

  for (const indexFile of indexFiles) {
    const componentDir = path.dirname(indexFile);
    const componentName = path.basename(componentDir);

    // Skip if this isn't a direct component directory (i.e., not a category directory)
    // We check if the parent has index.mdx to ensure this is a component, not a category
    const parentDir = path.dirname(componentDir);
    const isComponentDir = path.basename(parentDir) !== 'components';

    if (!isComponentDir) {
      continue;
    }

    const metadata = getComponentMetadata(componentDir);

    // Convert absolute path to relative path from repo root
    const docsPath = path.relative(REPO_ROOT, componentDir);

    components.push({
      component: componentName,
      docsPath,
      sources: metadata.sources,
      paths: metadata.paths,
      figmaNodes: metadata.figmaNodes,
      webMetadata: metadata.webMetadata,
      mobileMetadata: metadata.mobileMetadata,
    });
  }

  return components.sort((a, b) => a.component.localeCompare(b.component));
}
