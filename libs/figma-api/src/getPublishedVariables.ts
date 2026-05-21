import type { GetPublishedVariablesResponse } from '@figma/rest-api-spec';

import { createClient } from './createClient';

/**
 * Fetches the variables that are published from the given file.
 *
 * Note: This endpoint does NOT return mode values. Use getLocalVariables() in the same
 * file to get the actual values for each mode.
 *
 * Published variables have two ids:
 * - `id`: Assigned in the file where it is created (stable over lifetime)
 * - `subscribed_id`: Used by subscribing files (changes when variable is modified and published)
 * @see https://developers.figma.com/docs/rest-api/variables-endpoints/#get-published-variables
 */
export async function getPublishedVariables(
  fileKey: string,
): Promise<GetPublishedVariablesResponse> {
  const client = createClient<never, GetPublishedVariablesResponse>();
  return client(`files/${fileKey}/variables/published`);
}
