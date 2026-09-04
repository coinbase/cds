import type { GetStyleResponse } from '@figma/rest-api-spec';

import { createClient } from './createClient';

/** https://www.figma.com/developers/api#get-style-endpoint */
export async function getStyle(styleKey: string) {
  const client = createClient<never, GetStyleResponse>();
  return client(`styles/${styleKey}`);
}
