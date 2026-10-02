import crypto from 'node:crypto';

/**
 * The hash recorded in the manifest. It covers the node id as well as the optimized light SVG so
 * that it stays identical to the hashes previous syncs recorded, which keeps the first run of a
 * new sync from re-versioning every illustration.
 */
export function hashSvg(nodeId: string, lightSvg: string) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify({ [nodeId]: lightSvg }))
    .digest('base64');
}
