import { downloadSvgImage } from '@cds/figma-api';
import type { Config } from 'svgo';

import type { SyncedLibrary } from '../fetchIllustrationLibrary';

import { optimizeSvg } from './optimizeSvg';

export async function getIdMappedSvg(
  id: string,
  syncedLibrary: SyncedLibrary,
  svgoConfig?: Config,
) {
  const svg = await downloadSvgImage(syncedLibrary.imageUrls.svg[id]);

  return { [id]: optimizeSvg(svg, svgoConfig) };
}
