import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import { createDescriptionGraph } from './helpers/createDescriptionGraph';
import type { SyncedLibrary } from './helpers/fetchIllustrationLibrary';
import { getOutputDirectories } from './helpers/getOutputDirectories';
import { getRelativePathForImport } from './helpers/getRelativePathForImport';
import { createPngContent } from './helpers/image/createPngContent';
import { createSvgContent } from './helpers/image/createSvgContent';
import { getIdMappedSvg } from './helpers/image/getIdMappedSvg';
import { sortByCreatedAt } from './helpers/sortByCreatedAt';
import { Component } from './tools/Component';
import { Manifest, type ManifestShape, type ManifestTaskOptions } from './tools/Manifest';
import { config } from './config';
import { generateVersionPlan } from './generateVersionPlan';
import { commitAndPushChanges, deleteBranch, ensureCleanBranch, todaysDate } from './git';
import { svgoConfig } from './svgoConfig';
import {
  getAbsolutePath,
  pascalCase,
  sortByAlphabet,
  tokensSortedTemplate,
  tokensTemplate,
  typescriptTypesTemplate,
  writePrettyFile,
} from './utils';

const args = process.argv.slice(2);
const doSyncAll = config.options.syncAll || args.includes('--sync-all');

/**
 * Only date-derived content: illustration names come from Figma and must not reach the shell
 * command that commits this.
 */
const commitMessage = `feat: Publish illustrations ${todaysDate}`;

export type IllustrationsManifestShape = ManifestShape<Component>;

async function getHashSourceMap(id: string, syncedLibrary: SyncedLibrary) {
  return getIdMappedSvg(id, syncedLibrary, svgoConfig);
}

async function createItem(manifest: Manifest<ManifestShape<Component>>) {
  return Component.create(manifest, getHashSourceMap);
}

export const main = async () => {
  const codegenHeader = `
      /**
       * DO NOT MODIFY
       * Generated from yarn nx run ${config.projectName}:${config.targetName}
      */
    `;

  if (!fs.existsSync(config.versionPlansPath))
    fs.mkdirSync(config.versionPlansPath, { recursive: true });

  const { branchName: newBranchName, defaultBranch } = ensureCleanBranch(config.repoRoot);

  process.on('exit', (code) => {
    if (code === 0) return;
    // Clean up the working branch if the illustrations sync fails
    console.log('Illustrations sync failed, deleting working branch...');
    deleteBranch(config.repoRoot, defaultBranch, newBranchName);
  });

  const { manifest, colorStyles } = await Manifest.init<
    IllustrationsManifestShape,
    ManifestTaskOptions
  >(
    { ...config, options: { ...config.options, syncAll: doSyncAll } },
    {
      createItem,
      versioned: true,
    },
  );

  const resolveManifestPath = (relOrAbsPath: string): string =>
    path.isAbsolute(relOrAbsPath)
      ? relOrAbsPath
      : path.normalize(`${manifest.generatedDirectory}/${relOrAbsPath}`);

  if (colorStyles) {
    manifest.setColors(colorStyles);
  }

  const generatedDirectory = getAbsolutePath(config, config.options.generatedDirectory);

  const illustrationEntries = manifest.groupedItems;

  const invalidItems: Record<
    string,
    {
      name: string;
      figmaUrl: string;
    }[]
  > = {};

  function generateImageFormatsForItem(type: string) {
    return async (item: Component) => {
      if (!item.hasVisualChange) {
        return item;
      }

      // empty out existing outputs
      item.addToOutputs({});

      const { svgDir, svgJsDir, svgEsmDir, pngDir } = getOutputDirectories({
        type,
        generatedDirectory,
      });
      let imageOutputs: Record<string, string> = {};
      const imageName = `${item.name}-${item.version}`;

      const figmaUrl = manifest.syncedLibrary.imageUrls.svg[item.id];
      const { svgContent, outputs: svgOutputs } = await createSvgContent({
        svg: item.hashSource,
        imageName,
        svgDir,
        svgJsDir,
        svgEsmDir,
        colorStyles,
      });

      imageOutputs = { ...imageOutputs, ...svgOutputs };

      const { outputs: pngOutputs } = await createPngContent({
        imageName,
        pngDir,
        svgContent,
      });

      imageOutputs = { ...imageOutputs, ...pngOutputs };

      item.addToOutputs(imageOutputs);

      if (!svgContent.light) {
        if (!invalidItems[type]) {
          invalidItems[type] = [];
        }

        invalidItems[type].push({
          name: item.name,
          figmaUrl,
        });
      }

      return item;
    };
  }

  await Promise.all(
    illustrationEntries.map(async ([illustrationType, illustrationsForType]) => {
      const pascalCaseIllustrationType = pascalCase(illustrationType); // convert heroSquare to HeroSquare
      const { dataDir, typescriptDir } = getOutputDirectories({
        type: illustrationType,
        generatedDirectory,
      });

      const illustrations = await Promise.all(
        illustrationsForType.map(generateImageFormatsForItem(illustrationType)),
      );

      if (invalidItems[illustrationType]?.length) {
        console.log(`
  /* -------------------------------------------------------------------------- */
  /*                         ${illustrationType.toUpperCase()} INVALID ITEMS    */
  /* -------------------------------------------------------------------------- */
  `);
        console.table(invalidItems[illustrationType]);
      }

      const typescriptData = {
        exportName: `${pascalCaseIllustrationType}Name`, // HeroSquareName, SpotSquareName, etc
        get dest() {
          return `${typescriptDir}/${this.exportName}.ts`;
        },
        get content() {
          return typescriptTypesTemplate`
              ${codegenHeader}
            
              export type ${this.exportName} = ${illustrationsForType.map((item) => item.name)};
            `;
        },
      };

      const websiteSheetData = {
        dest: `${dataDir}/names.ts`,
        get content() {
          const destDir = path.dirname(this.dest);
          const relativeTypes = getRelativePathForImport(destDir, typescriptData.dest);

          return tokensSortedTemplate`
              ${codegenHeader}
              
              import type { ${typescriptData.exportName} } from '${relativeTypes}';
              
              /** 
                * An array of all ${pascalCaseIllustrationType} illustrations.
                * This is being used to display a sheet of all ${pascalCaseIllustrationType} illustration on the CDS website.
                */
              const names: ${typescriptData.exportName}[] = ${illustrations.map(
                (item) => item.name,
              )};

              export default names;
            `;
        },
      };

      const websiteSearchData = {
        dest: `${dataDir}/descriptionMap.ts`,
        get content() {
          return tokensTemplate`
                ${codegenHeader}
                
                /** 
                  * Mapping of descriptions to associated illustrations.
                  * This is being used on the search portion of the ${pascalCaseIllustrationType} page on the CDS website.
                  * The search query filters the shown illustrations based on matches with name or description. 
                  */ 
                const descriptionMap: Record<string, string[]> = ${createDescriptionGraph(
                  illustrations,
                )};

                export default descriptionMap;
              `;
        },
      };

      const versionMapData = {
        dest: `${dataDir}/versionMap.ts`,
        get content() {
          const destDir = path.dirname(this.dest);
          const relativeTypes = getRelativePathForImport(destDir, typescriptData.dest);

          const sortedItemsForVersion = Object.fromEntries(
            illustrations.sort(sortByCreatedAt).map((item) => [item.name, item.version]),
          );

          return tokensTemplate`
              ${codegenHeader}

              import type { ${typescriptData.exportName} } from '${relativeTypes}';

              /** 
               * Currently used on web for interpolating the URL to CDN hosted asset using the name and version number.
               *
               * For example, given the following ${pascalCaseIllustrationType} versionMap, '{ someIllustration: 2 }', and 
               * JSX such as '<${pascalCaseIllustrationType} name="someIllustration />' will result in an image with the following URL:
               * 
               * 'https://static-assets.coinbase.com/design-system/illustrations/${illustrationType}/light/someIllustration-2.svg
               * 
               * In addition, this file is used to populate ${pascalCaseIllustrationType} stories in percy, so the sort order based on createdAt is important.
               */
              const versionMap: Record<${typescriptData.exportName}, number> = ${sortedItemsForVersion};

              export default versionMap;
            `;
        },
      };

      const sortedIllustrations = [...illustrations].sort((a, b) => sortByAlphabet(a.name, b.name));

      const jsData = {
        dest: `${dataDir}/svgJsMap.ts`,
        get content() {
          const destDir = path.dirname(this.dest);
          const relativeTypes = getRelativePathForImport(destDir, typescriptData.dest);

          const contentAsString = sortedIllustrations.reduce((acc, item) => {
            if (!item.outputs.svgJsLight) {
              throw new Error(`Unable to find svgJsLight file path for ${item.name}`);
            }
            if (!item.outputs.svgJsDark) {
              throw new Error(`Unable to find svgJsDark file path for ${item.name}`);
            }

            const relativeLight = getRelativePathForImport(
              destDir,
              resolveManifestPath(item.outputs.svgJsLight),
            );
            const relativeDark = getRelativePathForImport(
              destDir,
              resolveManifestPath(item.outputs.svgJsDark),
            );
            const relativeThemed = item.outputs.svgJsThemed
              ? getRelativePathForImport(destDir, resolveManifestPath(item.outputs.svgJsThemed))
              : undefined;

            return (
              acc +
              `'${item.name}': {\n` +
              `  light: () => require('${relativeLight}.js').content,\n` +
              `  dark: () => require('${relativeDark}.js').content,\n` +
              (relativeThemed
                ? `  themeable: () => require('${relativeThemed}.js').content,\n`
                : '') +
              `},\n`
            );
          }, '');

          return tokensTemplate`
              import type { ${typescriptData.exportName} } from '${relativeTypes}';
              
              ${codegenHeader}
              
              const svgJsMap = {
                ${contentAsString}
              } as Record<
                ${typescriptData.exportName},
                { light: () => string; dark: () => string; themeable?: () => string }
              >;

              export default svgJsMap;
            `;
        },
      };

      const esmData = {
        dest: `${dataDir}/svgEsmMap.ts`,
        get content() {
          const destDir = path.dirname(this.dest);
          const relativeTypes = getRelativePathForImport(destDir, typescriptData.dest);

          const contentAsString = sortedIllustrations.reduce((acc, item) => {
            if (!item.outputs.svgEsmThemed) return acc;

            const relativeThemed = getRelativePathForImport(
              destDir,
              resolveManifestPath(item.outputs.svgEsmThemed),
            );

            return (
              acc +
              `'${item.name}': {\n` +
              `  themeable: () => import('${relativeThemed}.js').then((m) => m.default as string),\n` +
              `},\n`
            );
          }, '');

          return tokensTemplate`
              import type { ${typescriptData.exportName} } from '${relativeTypes}';
              
              ${codegenHeader}
              
              const svgEsmMap = {
                ${contentAsString}
              } as Partial<Record<
                ${typescriptData.exportName},
                { themeable: () => Promise<string> }
              >>;

              export default svgEsmMap;
            `;
        },
      };

      await Promise.all([
        writePrettyFile(typescriptData.dest, typescriptData.content),
        writePrettyFile(websiteSheetData.dest, websiteSheetData.content),
        writePrettyFile(websiteSearchData.dest, websiteSearchData.content),
        writePrettyFile(versionMapData.dest, versionMapData.content),
        writePrettyFile(jsData.dest, jsData.content),
        writePrettyFile(esmData.dest, esmData.content),
      ]);
    }),
  );

  /**
   * `Manifest.init` exits early when Figma reports no changes, so reaching this point means there
   * is something to release.
   */
  console.log('Writing version plan...');
  fs.writeFileSync(
    path.join(config.versionPlansPath, `illustrations-${todaysDate}.md`),
    generateVersionPlan(manifest.syncResults, todaysDate),
  );

  // Writes manifest.json, logs the change summary, and warns on breaking changes.
  await manifest.generateFile(config);

  // The docsite stories are built from the generated `names` files, so they go stale on every sync.
  console.log('Regenerating illustration stories...');
  execSync('yarn nx run illustrations:generate-stories', {
    cwd: config.repoRoot,
    stdio: 'inherit',
  });

  return { success: true };
};

process.on('exit', (code) => {
  if (code !== 0)
    return console.log('\n❌ Error: Something went wrong with the illustrations sync');
  console.log('\n✅ Success: Illustrations sync completed successfully!');
  console.log('\nCommitting and pushing changes...\n');
  commitAndPushChanges(config.repoRoot, commitMessage);
});

main();
