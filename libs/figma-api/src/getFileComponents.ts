import type { GetFileComponentsResponse } from '@figma/rest-api-spec';

import { createClient } from './createClient';

/** https://www.figma.com/developers/api#get-file-components-endpoint */
export async function getFileComponents(fileKey: string) {
  const client = createClient<never, GetFileComponentsResponse>();
  return client(`files/${fileKey}/components`);
}
