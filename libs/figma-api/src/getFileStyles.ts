import type { GetFileStylesResponse } from '@figma/rest-api-spec';

import { createClient } from './createClient';

/** https://www.figma.com/developers/api#get-file-styles-endpoint */
export async function getFileStyles(fileKey: string) {
  const client = createClient<never, GetFileStylesResponse>();
  return client(`files/${fileKey}/styles`);
}
