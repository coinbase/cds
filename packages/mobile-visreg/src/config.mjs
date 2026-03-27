import { enabledRoutes } from '../config/enabled-routes.mjs';

/**
 * Returns the explicit whitelist of routes to run visreg against.
 * Routes must be opted in via enabled-routes.mjs — new routes are not included automatically.
 */
export function getVisregRoutes() {
  return [...enabledRoutes];
}

export const defaults = {
  settleTimeMs: 2000,
  screenshotDir: 'screenshots',
  platform: 'ios',
};
