/**
 * Shared constants for Figma integration audit.
 */

/**
 * Valid node types for Code Connect (design system components).
 */
export const VALID_NODE_TYPES = ['COMPONENT', 'COMPONENT_SET'];

/**
 * Repository root directory.
 */
export const REPO_ROOT = process.env.PROJECT_CWD || process.cwd();

/**
 * Base URL for GitHub source links.
 */
export const GITHUB_BASE_URL = 'https://github.com/coinbase/cds/blob/master/';

/**
 * Base URL for engineering documentation.
 */
export const DOCS_BASE_URL = 'https://cds.coinbase.com';

/**
 * Extracts local file path from a GitHub source URL.
 * @param {string} sourceUrl - GitHub URL (e.g., "https://github.com/coinbase/cds/blob/master/packages/web/src/Button.tsx")
 * @returns {string | null} - Local file path (e.g., "packages/web/src/Button.tsx") or null if URL doesn't match expected pattern
 */
export function extractPathFromSourceUrl(sourceUrl) {
  if (!sourceUrl.startsWith(GITHUB_BASE_URL)) {
    return null;
  }
  return sourceUrl.replace(GITHUB_BASE_URL, '');
}
