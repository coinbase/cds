import glob from 'fast-glob';
import capitalize from 'lodash/capitalize';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import uniqBy from 'lodash/uniqBy';
import path from 'node:path';
import type { PackageJson } from 'type-fest';

import type {
  OutputDoc,
  PluginContent,
  PluginOptions,
  ProcessedDoc,
  Projects,
  WriteFileConfig,
} from '../types';
import type { EntryPointCacheEntry } from '../utils/docgenCache';
import { computeEntryPointHash, loadDocgenCache, saveDocgenCache } from '../utils/docgenCache';
import { getPackageJsonFromTsconfig } from '../utils/getPackageJsonFromTsconfig';
import { logger } from '../utils/logger';

import { docgenParser, sharedParentTypesCache, sharedTypeAliasesCache } from './docgenParser';
import { docgenScaffolder } from './docgenScaffolder';

type DocgenRunnerParams = PluginOptions & {
  pluginDir: string;
};

export function selectPrimaryDocs(docs: ProcessedDoc[]) {
  /**
   * react-docgen-typescript can return multiple "docs" for a single file when that file exports
   * multiple components/types. Our output paths (`destDir`) are derived only from `doc.filePath`,
   * so multiple docs for the same file would collide on `data.js`, `api.mdx`, etc.
   *
   * Heuristic: for each file, prefer the doc whose displayName matches the filename
   * (e.g. `RollingNumber.tsx` -> `RollingNumber`). Otherwise, fall back to the first parsed doc.
   */
  return Object.values(groupBy(docs, 'filePath')).map((docsForFile) => {
    const filePath = docsForFile[0]?.filePath ?? '';
    const fileBaseName = path.basename(filePath, path.extname(filePath));
    return docsForFile.find((d) => d.displayName === fileBaseName) ?? docsForFile[0];
  });
}

function getTempDirForDoc({ projectDir, doc }: { projectDir: string; doc: ProcessedDoc }) {
  const relativeFilePath = doc.filePath
    .replace(`${path.dirname(projectDir)}/`, '')
    .replace('src/', '');

  return relativeFilePath.replace(path.extname(relativeFilePath), '');
}

function getRepoUrl(repository: PackageJson['repository']) {
  const repoUrl = typeof repository === 'string' ? repository : repository?.url;
  if (repoUrl) {
    /** We need to change to https url */
    if (repoUrl.includes('.git')) {
      /** git@github.com:coinbase/cds.git */
      const [domain, project] = repoUrl.replace('git@', '').split(':');
      const [user, repo] = project.replace('.git', '').split('/');
      return `https://${domain}/${user}/${repo}`;
    }
    return repoUrl;
  }
  return undefined;
}

/**
 * Takes plugin config and runs docgenParser.
 * Based on parsed docs, will pass onto docgenWriter any templates we want to write to disk.
 */
export async function docgenRunner(params: DocgenRunnerParams): Promise<PluginContent> {
  const {
    entryPoints,
    formatPackageName,
    sourceFiles,
    docsDir,
    forceDocs,
    pluginDir,
    onProcessDoc,
  } = params;
  let filesToWriteToDisk: WriteFileConfig[] = [];
  const parsedProjects: Projects = [];

  const docs = new Set<OutputDoc>();

  /**
   * Use the entryPoints to understand which projects actually have the files defined in config
   * before running docgenParser.
   */
  const projects = await Promise.all(
    entryPoints.map(async (tsconfigPath) => {
      const projectDir = path.dirname(tsconfigPath);
      const files = await glob('**/*.(ts|tsx|jsx)', {
        onlyFiles: true,
        cwd: projectDir,
        absolute: false,
        ignore: [
          '**/__mocks__',
          '**/__tests__',
          '**/__stories__',
          '**/*-test.*',
          '**/*.fixture.*',
          '**/*.mock.*',
          '**/*.test.*',
          '**/*.spec.*',
          '**/*.d.ts',
          '**/*.stories.*',
          '**/index.ts',
          'lib',
          'node_modules',
        ],
      });
      const filteredFiles = files.filter((file) =>
        sourceFiles.some((sourceFile) => file.includes(sourceFile)),
      );

      return {
        tsconfigPath,
        projectDir,
        files: filteredFiles,
      };
    }),
  );

  const diskCache = loadDocgenCache(pluginDir);
  const newCacheEntries: Record<string, EntryPointCacheEntry> = {};

  projects.forEach(({ tsconfigPath, projectDir, files }) => {
    const {
      name: packageNameWithScope = '',
      version,
      repository,
      peerDependencies,
    } = getPackageJsonFromTsconfig(tsconfigPath);
    const [maybeScope, packageNameWithoutScope = maybeScope] = packageNameWithScope.split('/');
    const repoUrl = getRepoUrl(repository);

    /**
     * If a component is associated with multiple packages, such as web and mobile, we want
     * to aggregate that information to a single doc and use mechanism like Tabs to toggle between the two.
     * This is why we need a projectName, which can just typically just be the packageNameWithoutScope.
     *
     * If there is no formatPackageName provided to config this will turn:
     *  `@coinbase/cds-web` -> `cds-web`
     */
    const projectName = formatPackageName?.(packageNameWithoutScope) ?? packageNameWithoutScope;

    // Include anything you want to be accessible client side via usePluginData here.
    const projectData = {
      label: projectName,
      name: packageNameWithScope,
      version,
      cacheDirectory: path.join(pluginDir, path.basename(path.dirname(tsconfigPath))),
    };

    parsedProjects.push(projectData);

    filesToWriteToDisk.push({
      dest: path.join(projectData.cacheDirectory, `metadata.js`),
      data: {
        version,
        peerDependencies,
      },
      template: 'shared/objectMap',
    });

    /**
     * Content-hash disk cache: if the source files and tsconfig for this entry point
     * haven't changed since the last run, reuse the cached parse results instead of
     * re-creating a TypeScript program and running react-docgen-typescript.
     */
    const absoluteFiles = files.map((f) => path.join(projectDir, f));
    const entryPointHash = computeEntryPointHash(absoluteFiles, tsconfigPath);
    const cachedEntry = diskCache?.entryPoints[tsconfigPath];

    let parsedDocs: ProcessedDoc[];

    if (cachedEntry && cachedEntry.hash === entryPointHash) {
      // Cache hit — skip parsing, replay shared cache contributions
      logger.cacheHit(path.basename(projectDir));
      parsedDocs = cachedEntry.docs;
      for (const prop of cachedEntry.parentTypeProps) {
        sharedParentTypesCache.add(prop);
      }
      for (const [key, value] of cachedEntry.typeAliases) {
        sharedTypeAliasesCache.set(key, value);
      }
      newCacheEntries[tsconfigPath] = cachedEntry;
    } else {
      // Cache miss — parse and capture shared cache contributions
      logger.cacheMiss(path.basename(projectDir));
      const parentTypesBefore = new Set(sharedParentTypesCache);
      const typeAliasesBefore = new Map(sharedTypeAliasesCache);

      parsedDocs = docgenParser({ tsconfigPath, projectDir, files, onProcessDoc });

      const newParentTypeProps = [...sharedParentTypesCache].filter(
        (p) => !parentTypesBefore.has(p),
      );
      const newTypeAliases = [...sharedTypeAliasesCache.entries()].filter(
        ([k]) => !typeAliasesBefore.has(k),
      );
      newCacheEntries[tsconfigPath] = {
        hash: entryPointHash,
        docs: parsedDocs,
        parentTypeProps: newParentTypeProps,
        typeAliases: newTypeAliases,
      };
    }

    selectPrimaryDocs(parsedDocs).forEach(({ example, ...doc }) => {
      /**
       * Turn absolute path of parsed doc into path relative to project.
       * This should match what was provided in config.
       * i.e. `Users/katherinemartinez/cds/packages/web/src/accordions/Accordion.tsx` into `web/accordions/Accordion.tsx`.
       */
      const destDir = getTempDirForDoc({ projectDir, doc });
      const [, ...destDirWithoutProjectArray] = destDir.split('/');
      const slug = destDirWithoutProjectArray.join('/');

      const data: OutputDoc = {
        ...doc,
        cacheDirectory: path.join(pluginDir, destDir),
        repoUrl,
        importBlock: {
          name: doc.displayName,
          path: path.join(packageNameWithScope, slug),
        },
        apiPartial: {
          name: `${capitalize(`${projectName}`)}PropsTable`,
          path: path.join(':docgen', destDir, 'api.mdx'),
        },
        changelogPartial: {
          name: `${capitalize(`${projectName}`)}Changelog`,
          path: path.join(':docgen', destDir, 'changelog.mdx'),
        },
        tab: { label: capitalize(projectName), value: projectName },
        slug,
      };

      docs.add(data);

      /** TODO: Pull codegen 2.0 into separate package and pull in here.
       * Then we can just pass in the directory and it will run codegen on all templates in directory
       * rather than having to define each separately.
       */

      /** Data from react-docgen-typescript */
      filesToWriteToDisk.push({
        data,
        dest: path.join(pluginDir, destDir, 'data.js'),
        template: 'shared/objectMap',
      });

      filesToWriteToDisk.push({
        data: data.props.map((item) => ({ id: item.name, level: 3, value: item.name })),
        dest: path.join(pluginDir, destDir, 'toc-props.js'),
        template: 'shared/objectMap',
      });

      /** Styles API data - extracted from *ClassNames exports */
      if (data.styles && data.styles.selectors.length > 0) {
        filesToWriteToDisk.push({
          data: data.styles,
          dest: path.join(pluginDir, destDir, 'styles-data.js'),
          template: 'shared/objectMap',
        });

        filesToWriteToDisk.push({
          data: [{ id: 'selectors', level: 3, value: 'Selectors' }],
          dest: path.join(pluginDir, destDir, 'toc-styles.js'),
          template: 'shared/objectMap',
        });
      }

      /** MDX file with PropsTable react component. Passes in props from js file in .docusaurus cache */
      filesToWriteToDisk.push({
        data,
        dest: path.join(pluginDir, destDir, 'api.mdx'),
        template: 'doc-item/api',
      });

      if (example) {
        filesToWriteToDisk.push({
          data: { example },
          dest: path.join(pluginDir, destDir, 'example.mdx'),
          template: 'doc-item/example',
        });
      }
    });
  });

  saveDocgenCache(pluginDir, newCacheEntries);

  logger.preppingData();

  if (docsDir) {
    const scaffolds = docgenScaffolder({ docsDir, forceDocs, sourceFiles, docs });
    filesToWriteToDisk = [...filesToWriteToDisk, ...scaffolds];
  }

  /** Output all shared parentTypes to object. We group by parent name, i.e SpacingProps
   * and transform to an object, where each prop for that parent type is defined.
   */
  const groupedObjectTypes = mapValues(
    groupBy(Array.from(sharedParentTypesCache.values()), 'parent'),
    (val) => keyBy(val, 'name'),
  );

  logger.writingData();

  return {
    filesToWrite: [
      ...uniqBy(filesToWriteToDisk, 'dest'),
      {
        dest: `${pluginDir}/_types/sharedParentTypes.js`,
        data: { sharedParentTypes: groupedObjectTypes },
        template: 'shared/objectMap',
      },
      {
        dest: `${pluginDir}/_types/sharedTypeAliases.js`,
        data: { sharedTypeAliases: Object.fromEntries(sharedTypeAliasesCache) },
        template: 'shared/objectMap',
      },
    ],
    projects: parsedProjects,
    parsedDocs: Array.from(docs.values()),
  };
}
