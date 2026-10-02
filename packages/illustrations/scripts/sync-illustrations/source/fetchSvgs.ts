import { downloadSvgImage, getFileImages } from '@cds/figma-api';

import { mapConcurrently } from '../mapConcurrently';

/** Figma's image endpoint accepts many ids per request, but very long URLs are rejected. */
const idsPerImageRequest = 500;
const concurrentDownloads = 8;

const chunk = <T>(items: T[], size: number) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, i) =>
    items.slice(i * size, (i + 1) * size),
  );

/** Resolves temporary download URLs for the SVG export of every node. */
async function fetchSvgUrls(fileId: string, nodeIds: string[]) {
  const urls = new Map<string, string>();

  for (const ids of chunk(nodeIds, idsPerImageRequest)) {
    const response = await getFileImages(fileId, { ids: ids.join(','), format: 'svg' });
    for (const id of ids) {
      const url = response.images[id];
      if (!url) throw new Error(`Figma did not return an SVG export for node ${id}`);
      urls.set(id, url);
    }
  }

  return urls;
}

/**
 * Exports and downloads the raw SVG of every node, returning them keyed by node id. `onProgress` is
 * called after each download so the caller can report on long runs.
 */
export async function fetchSvgs(
  fileId: string,
  nodeIds: string[],
  onProgress: (completed: number, total: number) => void = () => undefined,
) {
  const urls = await fetchSvgUrls(fileId, nodeIds);
  let completed = 0;

  const svgs = await mapConcurrently(nodeIds, concurrentDownloads, async (nodeId) => {
    const rawSvg = await downloadSvgImage(urls.get(nodeId) as string);
    completed += 1;
    onProgress(completed, nodeIds.length);
    return [nodeId, rawSvg] as const;
  });

  return new Map(svgs);
}
