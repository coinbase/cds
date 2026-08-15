import type { GetComponentResponse } from '@figma/rest-api-spec';

import { createClient } from './createClient';

/** https://www.figma.com/developers/api#get-component-endpoint */
export async function getComponent(componentKey: string) {
  const client = createClient<never, GetComponentResponse>();
  return client(`components/${componentKey}`);
}
