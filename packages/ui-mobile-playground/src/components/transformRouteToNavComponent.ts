import type { StackNavigationOptions } from '@react-navigation/stack';
import { HeaderStyleInterpolators } from '@react-navigation/stack';

import { keyToRouteName } from './keyToRouteName';
import type { PlaygroundRoute } from './PlaygroundRoute';

const titleOverrides: Record<string, string> = {
  Examples: 'CDS',
  Text: 'Text (all)',
};

type TransformRouteToNavComponentParams = {
  route: PlaygroundRoute;
  options?: StackNavigationOptions | undefined;
};

export function transformRouteToNavComponent({
  route: { key, getComponent },
  options = {},
}: TransformRouteToNavComponentParams) {
  return {
    key,
    name: keyToRouteName(key),
    getComponent,
    options: {
      title: titleOverrides[key] ?? key,
      headerStyleInterpolator: HeaderStyleInterpolators.forFade,
      ...options,
    },
  } as const;
}
