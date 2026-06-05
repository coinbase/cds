import type { GetLocalVariablesResponse } from '@figma/rest-api-spec';

import { createClient } from './createClient';

/**
 * Fetches local variables created in the file and remote variables used in the file.
 * @see https://developers.figma.com/docs/rest-api/variables-endpoints/#get-local-variables
 */
export async function getLocalVariables(fileKey: string): Promise<GetLocalVariablesResponse> {
  const client = createClient<never, GetLocalVariablesResponse>();
  return client(`files/${fileKey}/variables/local`);
}
