import type { GetFileQueryParams, GetFileResponse } from '@figma/rest-api-spec';

import { createClient } from './createClient';

/** https://www.figma.com/developers/api#get-files-endpoint */
export async function getFile(fileKey: string, params?: GetFileQueryParams) {
  const client = createClient<GetFileQueryParams, GetFileResponse>();
  return client(`files/${fileKey}`, params);
}
