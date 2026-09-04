import type { GetFileComponentSetsResponse } from '@figma/rest-api-spec';

import { createClient } from './createClient';

/** https://www.figma.com/developers/api#get-file-component-sets-endpoint */
export async function getFileComponentSets(fileKey: string) {
  const client = createClient<never, GetFileComponentSetsResponse>();
  return client(`files/${fileKey}/component_sets`);
}
