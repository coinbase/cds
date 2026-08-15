import type { GetFileNodesQueryParams, GetFileNodesResponse } from '@figma/rest-api-spec';

import { createClient } from './createClient';

/** https://www.figma.com/developers/api#get-file-nodes-endpoint */
export async function getFileNodes(
  fileKey: string,
  { ids, ...otherParams }: Omit<GetFileNodesQueryParams, 'ids'> & { ids: string | string[] },
) {
  const client = createClient<GetFileNodesQueryParams, GetFileNodesResponse>();
  return client(`files/${fileKey}/nodes`, {
    ...otherParams,
    ids: Array.isArray(ids) ? ids.join(',') : ids,
  });
}
