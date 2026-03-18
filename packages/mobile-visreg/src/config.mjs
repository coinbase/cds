import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  disabledRoutes,
  iosDisabledRoutes,
  androidDisabledRoutes,
} from '../config/disabled-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Parses route keys from the shared playground package's codegen routes file.
 */
function parseCodegenRoutes() {
  const routesPath = resolve(__dirname, '../../../packages/ui-mobile-playground/src/routes.ts');
  const content = readFileSync(routesPath, 'utf8');
  return [...content.matchAll(/key:\s*'([^']+)'/g)].map((m) => m[1]);
}

/**
 * Returns the filtered list of routes to run visreg against for a given platform.
 * Excludes routes that are disabled globally or platform-specifically.
 */
export function getVisregRoutes({ platform = 'ios' } = {}) {
  const allRoutes = parseCodegenRoutes();
  const platformDisabled = platform === 'ios' ? iosDisabledRoutes : androidDisabledRoutes;
  const excluded = new Set([...disabledRoutes, ...platformDisabled]);
  return allRoutes.filter((key) => !excluded.has(key));
}

export const defaults = {
  settleTimeMs: 2000,
  screenshotDir: 'screenshots',
  platform: 'ios',
};
