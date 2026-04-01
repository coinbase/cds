import glob from 'fast-glob';
import path from 'node:path';

import { getSourcePath } from '../utils/getSourcePath';
import { writeFile } from '../utils/writeFile';

/**
 * Computes the package import path for a given story file path.
 *
 * @param filePath The path of the file relative to packages/
 * @returns The package import path (e.g. `@coinbase/cds-mobile/...`)
 */
function getRelativePath(filePath: string) {
  const relativePath = filePath.replace('.tsx', '');

  return `@coinbase/cds-${relativePath}`;
}

async function getRoutes() {
  try {
    const rootDir = getSourcePath('packages');

    const files = await glob(['**/mobile/src/**/__stories__/*.stories.(ts|tsx|js|jsx)'], {
      ignore: ['__tests__/*'],
      onlyFiles: true,
      cwd: rootDir,
      absolute: false,
    });

    const processedFiles = files
      .map((file) => {
        // TO DO: This seems unneccessary?
        const hotReloadPath = getRelativePath(file);
        const consumerPath = hotReloadPath.includes('/src')
          ? hotReloadPath.replace('/src', '')
          : hotReloadPath;

        return {
          name: path.basename(file, '.stories.tsx'),
          path: consumerPath,
          consumerPath,
        };
      })
      .sort((prev, next) => prev.name.localeCompare(next.name));

    return processedFiles;
  } catch {
    throw new Error(`Failed to get files in mobile-playground/src/screens`);
  }
}

export async function prepare() {
  try {
    const routes = await getRoutes();

    const hotReloadRoutes = routes.map((route) => ({
      name: route.name,
      path: route.path,
    }));
    const consumerRoutes = routes.map((route) => ({
      name: route.name,
      path: route.consumerPath,
    }));

    // Write to ui-mobile-playground package. This includes the route paths that consumers would use.
    await writeFile({
      data: { routes: consumerRoutes },
      template: 'mobileRoutes.ejs',
      dest: `packages/ui-mobile-playground/src/routes.ts`,
    });

    // Write to mobile-app. This is required for hot reload - internal packages need src in path for hot reload, while consumers do not.
    await writeFile({
      data: { routes: hotReloadRoutes },
      template: 'mobileRoutes.ejs',
      dest: `apps/mobile-app/src/routes.ts`,
    });

    // Write to mobile-app. This is required for hot reload - internal packages need src in path for hot reload, while consumers do not.
    await writeFile({
      data: { routes: hotReloadRoutes },
      template: 'mobileRoutes.ejs',
      dest: `apps/mobile-app/src/routes.ts`,
    });

    // Write to mobile-app. This is required for evaluating which routes to run during visreg testing.
    await writeFile({
      data: { routes: consumerRoutes },
      template: 'mobileRoutes.ejs',
      dest: `apps/mobile-app/scripts/utils/routes.mjs`,
    });

    // Write to mobile-app. This is required for evaluating which routes to run during visreg testing.
    await writeFile({
      data: { routes: consumerRoutes },
      template: 'mobileRoutes.ejs',
      dest: `apps/mobile-app/scripts/utils/routes.mjs`,
    });

    // Write to test-expo for Expo demo app
    await writeFile({
      data: { routes: consumerRoutes },
      template: 'mobileRoutes.ejs',
      dest: `apps/test-expo/src/routes.ts`,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      throw err;
    }
  }
}

void prepare();
