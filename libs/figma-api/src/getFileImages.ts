import type { GetImagesQueryParams, GetImagesResponse } from '@figma/rest-api-spec';

import { createClient } from './createClient';

/** https://www.figma.com/developers/api#get-images-endpoint */
export async function getFileImages(fileKey: string, params: GetImagesQueryParams) {
  const client = createClient<GetImagesQueryParams, GetImagesResponse>();
  return client(`images/${fileKey}`, params);
}
