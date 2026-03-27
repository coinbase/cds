import glob from 'fast-glob';
import path from 'node:path';

import { getSourcePath } from '../utils/getSourcePath';
import { writeFile } from '../utils/writeFile';

/**
 *
 * We need to compute the relative path given a filePath. It should
 * be relative to the 'packages/mobile/examples' folder.
 *
 * Previously, we hardcoded the relative path in
 * mobileRoutes.ejs. But with more mobile packages, stories can be live in
 * other packages other than packages/mobile. Thus, adding '../' is
 * insufficient. You can't reach mobile-visualization by going 1 folder up from
 * 'packages/mobile/examples'. You need to go 2 folders up, so you need to
 * appending '../../' to the filePath. This function determines its folder and
 * computes the correct relative path.
 *
 * @param filePath The path of the file
 * @returns The relative path. It is relative to 'packages/mobile/examples'
 */
function getRelativePath(filePath: string) {
  const relativePath = filePath.replace('.tsx', '');

  return `@coinbase/cds-${relativePath}`;
}

async function getRoutes() {
  try {
    const rootDir = getSourcePath('packages');

    // Our stories may come from other packages not within mobile, so
    // we are adding a new regular expression to capture stories that are
    // in other mobile packages
    const files = await glob(
      ['**/(mobile|mobile-visualization)/src/**/__stories__/*.stories.(ts|tsx|js|jsx)'],
      {
        ignore: ['__tests__/*'],
        onlyFiles: true,
        cwd: rootDir,
        absolute: false,
      },
    );

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
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      throw err;
    }
  }
}

void prepare();
