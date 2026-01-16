/**
 * Dev resource validation logic for Figma components.
 * Validates that components in Figma have correct dev resources linking to
 * source code and documentation.
 */

import { DOCS_BASE_URL } from './constants.mjs';

/**
 * Dev resource names - must match exactly in Figma.
 */
export const DEV_RESOURCE_NAMES = {
  WEB: 'Github - Web',
  MOBILE: 'Github - Mobile',
  DOCS: 'Eng Docs',
};

/**
 * Converts a docsPath to the expected Eng Docs URL.
 * @param {string} docsPath - e.g., "apps/docs/docs/components/layout/Accordion"
 * @returns {string | null} - e.g., "https://cds.coinbase.com/components/layout/Accordion/"
 */
export function buildExpectedDocsUrl(docsPath) {
  // Extract path after "apps/docs/docs/"
  const match = docsPath.match(/apps\/docs\/docs\/(.+)$/);
  if (!match) {
    return null;
  }
  return `${DOCS_BASE_URL}/${match[1]}/`;
}

/**
 * Builds the list of expected dev resources for a component.
 * @param {object} component - Component with webMetadata, mobileMetadata, docsPath
 * @returns {Array<{name: string, expectedUrl: string}>}
 */
export function buildExpectedDevResources(component) {
  const expected = [];

  // Always require Eng Docs
  const docsUrl = buildExpectedDocsUrl(component.docsPath);
  if (docsUrl) {
    expected.push({
      name: DEV_RESOURCE_NAMES.DOCS,
      expectedUrl: docsUrl,
    });
  }

  // Require Github - Web if webMetadata exists with a source
  if (component.webMetadata?.source) {
    expected.push({
      name: DEV_RESOURCE_NAMES.WEB,
      expectedUrl: component.webMetadata.source,
    });
  }

  // Require Github - Mobile if mobileMetadata exists with a source
  if (component.mobileMetadata?.source) {
    expected.push({
      name: DEV_RESOURCE_NAMES.MOBILE,
      expectedUrl: component.mobileMetadata.source,
    });
  }

  return expected;
}

/**
 * Fetches dev resources from Figma API for the specified nodes.
 * @param {string} fileKey - Figma file key
 * @param {string[]} nodeIds - Array of node IDs (colon format, e.g., "148:2954")
 * @param {string} accessToken - Figma API access token
 * @returns {Promise<Array<{id: string, name: string, url: string, node_id: string}>>}
 */
export async function fetchDevResources(fileKey, nodeIds, accessToken) {
  const nodeIdsParam = nodeIds.join(',');
  const response = await fetch(
    `https://api.figma.com/v1/files/${fileKey}/dev_resources?node_ids=${encodeURIComponent(nodeIdsParam)}`,
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
    // File not found - return empty array
    return [];
  }

  if (!response.ok) {
    console.error(`Error: Figma API returned status ${response.status}`);
    process.exit(1);
  }

  const data = await response.json();
  return data.dev_resources || [];
}

/**
 * Validates dev resources for components with valid Figma nodes.
 * @param {Array<{component: string, url: string, fileKey: string, nodeId: string}>} validatedNodes
 *        - Nodes that passed Figma URL validation
 * @param {Array} components - All components with metadata
 * @param {string} accessToken - Figma API access token
 * @returns {Promise<{missingDevResource: Array, invalidDevResource: Array}>}
 */
export async function validateDevResources(validatedNodes, components, accessToken) {
  const missingDevResource = [];
  const invalidDevResource = [];

  // Group validated nodes by file key for efficient API batching
  const nodesByFileKey = new Map();
  for (const node of validatedNodes) {
    if (!nodesByFileKey.has(node.fileKey)) {
      nodesByFileKey.set(node.fileKey, []);
    }
    nodesByFileKey.get(node.fileKey).push(node);
  }

  // Fetch dev resources for each file (one API call per unique file key)
  const devResourcesByNodeId = new Map();
  for (const [fileKey, nodes] of nodesByFileKey) {
    const nodeIds = nodes.map((n) => n.nodeId);
    const devResources = await fetchDevResources(fileKey, nodeIds, accessToken);

    // Group dev resources by node_id
    for (const resource of devResources) {
      if (!devResourcesByNodeId.has(resource.node_id)) {
        devResourcesByNodeId.set(resource.node_id, []);
      }
      devResourcesByNodeId.get(resource.node_id).push(resource);
    }
  }

  // Validate each component's expected dev resources
  for (const node of validatedNodes) {
    const component = components.find((c) => c.component === node.component);
    if (!component) continue;

    const expectedResources = buildExpectedDevResources(component);
    const actualResources = devResourcesByNodeId.get(node.nodeId) || [];

    for (const expected of expectedResources) {
      const actual = actualResources.find((r) => r.name === expected.name);

      if (!actual) {
        missingDevResource.push({
          component: node.component,
          docsPath: component.docsPath,
          figmaNodeUrl: node.url,
          resourceName: expected.name,
          expectedUrl: expected.expectedUrl,
        });
      } else if (actual.url !== expected.expectedUrl) {
        invalidDevResource.push({
          component: node.component,
          docsPath: component.docsPath,
          figmaNodeUrl: node.url,
          resourceName: expected.name,
          expectedUrl: expected.expectedUrl,
          actualUrl: actual.url,
        });
      }
    }
  }

  return { missingDevResource, invalidDevResource };
}
