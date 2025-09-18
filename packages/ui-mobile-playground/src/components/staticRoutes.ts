import { keyToRouteName } from './keyToRouteName';

export const initialRouteKey = 'Examples';
export const searchRouteKey = 'Search';

export const initialRouteName = keyToRouteName(initialRouteKey);
export const searchRouteName = keyToRouteName(searchRouteKey);

export const createStaticRoute = (key: string, component: () => JSX.Element) => ({
  key,
  getComponent: () => component,
});
