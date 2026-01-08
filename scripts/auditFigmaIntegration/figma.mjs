/**
 * Figma-related operations: URL parsing and validation via API.
 */

import { VALID_NODE_TYPES } from './constants.mjs';

/**
 * Parses a Figma URL and extracts the file key and node ID.
 * @param {string} url - Figma URL like https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/...?node-id=148%3A2954
 *                       or https://figma.com/file/k5CtyJccNQUGMI5bI4lJ2g/?node-id=148-2954
 * @returns {{ fileKey: string, nodeId: string } | null} - Extracted IDs or null if invalid
 */
export function parseFigmaUrl(url) {
  try {
    const urlObj = new URL(url);

    // Extract file key from path: /design/{fileKey}/... or /file/{fileKey}/...
    const pathMatch = urlObj.pathname.match(/\/(design|file)\/([^/]+)/);
    if (!pathMatch) {
      return null;
    }
    const fileKey = pathMatch[2];

    // Extract node ID from query params
    const nodeIdParam = urlObj.searchParams.get('node-id');
    if (!nodeIdParam) {
      return null;
    }

    // Node ID can be in format "148-2954" or "148:2954" - normalize to colon format
    const nodeId = nodeIdParam.replace('-', ':');

    return { fileKey, nodeId };
  } catch {
    return null;
  }
}

/**
 * Validates Figma node URLs by calling the Figma REST API.
 * Groups URLs by file key for efficient batching.
 * @param {Array<{component: string, url: string, fileKey: string, nodeId: string}>} urlsToValidate
 * @param {string} accessToken - Figma API access token
 * @returns {Promise<Array<{component: string, url: string, error: string}>>} - Invalid URLs with error messages
 */
export async function validateFigmaUrls(urlsToValidate, accessToken) {
  const invalidUrls = [];

  // Group by file key for efficient batching
  const byFileKey = new Map();
  for (const item of urlsToValidate) {
    if (!byFileKey.has(item.fileKey)) {
      byFileKey.set(item.fileKey, []);
    }
    byFileKey.get(item.fileKey).push(item);
  }

  // Validate each file's nodes
  for (const [fileKey, items] of byFileKey) {
    const nodeIds = items.map((item) => item.nodeId);
    const idsParam = nodeIds.join(',');

    try {
      const response = await fetch(
        `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(idsParam)}`,
        {
          headers: {
            'X-Figma-Token': accessToken,
          },
        },
      );

      if (response.status === 403) {
        console.error('Error: Invalid or expired FIGMA_ACCESS_TOKEN');
        process.exit(1);
      }

      if (response.status === 404) {
        // File not found - all nodes in this file are invalid
        for (const item of items) {
          invalidUrls.push({
            component: item.component,
            url: item.url,
            error: 'File not found',
          });
        }
        continue;
      }

      if (!response.ok) {
        console.error(`Error: Figma API returned status ${response.status}`);
        process.exit(1);
      }

      const data = await response.json();

      // Check each node
      for (const item of items) {
        const nodeData = data.nodes?.[item.nodeId];
        if (nodeData === null || nodeData === undefined) {
          invalidUrls.push({
            component: item.component,
            url: item.url,
            error: 'Node not found in file',
          });
        } else {
          // Check that the node is a Component or ComponentSet
          const nodeType = nodeData.document?.type;
          if (!VALID_NODE_TYPES.includes(nodeType)) {
            invalidUrls.push({
              component: item.component,
              url: item.url,
              error: `Node is type "${nodeType}" but must be COMPONENT or COMPONENT_SET`,
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error: Failed to call Figma API: ${error.message}`);
      process.exit(1);
    }
  }

  return invalidUrls;
}
