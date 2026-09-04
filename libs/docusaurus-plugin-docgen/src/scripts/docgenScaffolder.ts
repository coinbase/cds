import groupBy from 'lodash/groupBy';
import kebabCase from 'lodash/kebabCase';
import orderBy from 'lodash/orderBy';
import startCase from 'lodash/startCase';
import uniqBy from 'lodash/uniqBy';
import fs from 'node:fs';
import path from 'node:path';

import type { OutputDoc, PluginOptions, WriteFileConfig } from '../types';
import { logger } from '../utils/logger';

type DocgenScaffolderParams = Pick<PluginOptions, 'docsDir' | 'forceDocs' | 'sourceFiles'> & {
  docs: Set<OutputDoc>;
};

function pascalCase(str: string) {
  return startCase(str).split(' ').join('');
}

function getTemplates(outputDir: string) {
  return ['design', 'metadata', 'intro', 'usage', 'example', 'a11y', 'implementation']
    .filter((item) => {
      return fs.existsSync(path.join(outputDir, `_${item}.mdx`));
    })
    .map((item) => {
      return { template: item, component: pascalCase(item), toc: `${item}Toc` };
    });
}

export function docgenScaffolder({
  docsDir = 'docs',
  forceDocs,
  sourceFiles,
  docs,
}: DocgenScaffolderParams) {
  const filesToWriteToDisk: WriteFileConfig[] = [];

  const partials = orderBy(Array.from(docs.values()), ['mdxImport.name']);
  const groupedDocs = groupBy(partials, 'slug');

  Object.entries(groupedDocs).forEach(([slug, dataForGroup]) => {
    const { displayName } = dataForGroup[0];
    const [subdir, component, maybeComponentFile] = slug.split('/');
    const outputDir = path.join(docsDir, subdir, maybeComponentFile ?? component);
    const kebabCaseName = kebabCase(displayName);
    const docDest = path.join(outputDir, `${kebabCaseName}.mdx`);
    const templates = getTemplates(outputDir);
    const hasDesign = templates.map((item) => item.template).includes('design');

    const addToFilesToWrite = () => {
      const data = {
        title: startCase(displayName),
        kebabCaseName,
        apiPartials: uniqBy(dataForGroup, 'apiPartial.name'),
        templates,
        hasDesign,
      };

      filesToWriteToDisk.push({
        dest: docDest,
        data,
        template: 'doc/component',
      });

      filesToWriteToDisk.push({
        dest: path.join(outputDir, `_implementation.mdx`),
        data,
        template: 'doc/implementation',
      });

      filesToWriteToDisk.push({
        dest: path.join(outputDir, `_metadata.mdx`),
        data,
        template: 'doc/metadata',
      });
    };

    try {
      if (fs.existsSync(docDest)) {
        if (Array.isArray(forceDocs) && forceDocs.includes(displayName)) {
          logger.forceIsTrue();
          addToFilesToWrite();
        } else if (
          forceDocs === true &&
          sourceFiles.map((item) => path.basename(item)).includes(displayName)
        ) {
          logger.forceIsTrue();
          if (fs.existsSync(path.join(outputDir, '_features.mdx'))) {
            fs.rmSync(path.join(outputDir, '_features.mdx'));
          }
          addToFilesToWrite();
        }
      } else if (outputDir === displayName) {
        logger.preppingDoc(displayName);
        addToFilesToWrite();
      }
    } catch (err) {
      console.log(err);
      if (outputDir === displayName) {
        logger.preppingDoc(displayName);
        addToFilesToWrite();
      }
    }
  });

  return filesToWriteToDisk;
}
