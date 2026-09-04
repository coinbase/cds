/**
 * Code Connect file operations.
 */

import fs from 'node:fs';
import path from 'node:path';

import { REPO_ROOT } from './constants.mjs';

/**
 * Searches for a Code Connect file for a given component.
 * Looks in __figma__ directories starting from the component's directory
 * and moving up until reaching the src directory.
 *
 * @param {string} componentPath - Path like "packages/web/src/buttons/Button.tsx"
 * @param {string} componentName - Component name like "Button"
 * @returns {{ found: boolean, path?: string, expectedPath?: string }} - Result object
 */
export function findCodeConnectFile(componentPath, componentName) {
  const dir = path.dirname(componentPath);
  const expectedFileName = `${componentName}.figma.tsx`;

  // Search in the component's directory first, then parent directories
  // Stop when we reach the src directory
  let currentDir = dir;
  const searchedPaths = [];

  while (currentDir.includes('/src/')) {
    const figmaDir = path.join(currentDir, '__figma__');
    const figmaFilePath = path.join(figmaDir, expectedFileName);
    const absolutePath = path.join(REPO_ROOT, figmaFilePath);

    searchedPaths.push(figmaFilePath);

    if (fs.existsSync(absolutePath)) {
      return { found: true, path: figmaFilePath };
    }

    // Move up one directory
    currentDir = path.dirname(currentDir);
  }

  // Return the first expected path for error reporting
  return { found: false, expectedPath: searchedPaths[0] };
}
