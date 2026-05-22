import type { GetComponentSetResponse } from '@figma/rest-api-spec';

import { createClient } from './createClient';

/** https://www.figma.com/developers/api#get-component-sets-endpoint */
export async function getComponentSet(componentSetKey: string) {
  const client = createClient<never, GetComponentSetResponse>();
  return client(`component_sets/${componentSetKey}`);
}
