import { kebabCase, pascalCase, toCssVar, toCssVarFn } from '@cbhq/cds-utils';
import enquirer from 'enquirer';
import type { Options } from 'execa';
import { command } from 'execa';
import HygenLogger from 'hygen/dist/logger';
import type { RunnerConfig } from 'hygen/dist/types';
import lodash from 'lodash';
import fs from 'node:fs';
import path from 'node:path';

import { formatTemplateType } from './utils/formatTemplateType';
import { getHeaderCommentForFileType } from './utils/getHeaderCommentForFileType';
import { getPrettierParser } from './utils/getPrettierParser';
import { getSourcePath } from './utils/getSourcePath';
import { writePrettyFile } from './utils/writePrettyFile';

const root = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
const templates = getSourcePath('libs/codegen/src/templates');

const { camelCase } = lodash;

const Logger = (HygenLogger as any).default as HygenLogger;

type WriteFileConfig = {
  defaultExport?: boolean;
  commonJS?: boolean;
  disableAsConst?: boolean;
  disableStringify?: boolean;
  disablePrettier?: boolean;
  sort?: boolean;
};

/** Custom write file fn for hygen to format contents with prettier and add header comment. */
async function writeFile(dest: string, contents: string, { config }: { config?: string }) {
  const { disablePrettier } = (config ? JSON.parse(config) : {}) as WriteFileConfig;
  try {
    const ext = path.extname(dest);
    const newContents = getHeaderCommentForFileType(ext) + contents;
    const dirForFile = path.dirname(dest);
    // If directory doesn't already exist, create it.
    fs.mkdirSync(dirForFile, { recursive: true });
    if (disablePrettier) {
      await fs.promises.writeFile(dest, newContents, { encoding: 'utf8', flag: 'w' });
    } else {
      await writePrettyFile({
        outFile: dest,
        contents: newContents,
        logInfo: false,
        parser: getPrettierParser(ext),
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`Couldn't generate ${dest}.`);
    } else {
      throw error;
    }
  }
}

/** Accessible in templates directly.
 * @example
 * ```sh
 * ---
 * to: packages/common/src/internal/data/iconData.ts
 * force: true
 * ---
 * <%- include(partial.objectMap, { data: iconData }); %>
 * ```
 */
const localsDefaults = {
  partial: {
    objectMap: path.join(templates, `partials/objectMap.ejs.t`),
    typescript: path.join(templates, `partials/typescript.ejs.t`),
  },
};

/**
 *
 * @param prefix - the prefix you want the css variable to use. This will be the broader cateogry a token belongs to like sizing or palette.
 * @param alias - the alias for this token. i.e. rounded or xs
 * @returns string - the final css variable
 */
function getCssAlias(prefix: string, alias: string) {
  return `${kebabCase(prefix)}-${alias}`;
}

function toCssVarSetter(prefix: string, alias: string) {
  return toCssVar(getCssAlias(prefix, alias));
}

function toCssVarGetter(prefix: string, alias: string) {
  return toCssVarFn(getCssAlias(prefix, alias));
}

/**
 * Add any helpers you want to have accessible in hygen templates i.e `h.camelCase`
 * @link http://www.hygen.io/docs/templates
 * @example
 * ```sh
 * ---
 * to: apps/website/docs/components/<%- h.pascalCase(name) %>.tsx
 * force: true
 * ---
 * ```
 */
const helpers = {
  camelCase,
  kebabCase,
  format: formatTemplateType,
  pascalCase,
  toCssVarGetter,
  toCssVarSetter,
};

export const config: RunnerConfig = {
  cwd: root,
  templates,
  // @ts-expect-error HygenLogger types are invalid
  logger: new Logger(console.log.bind(console)),
  debug: !!process.env.DEBUG,
  exec: async (action: string, body: string) => {
    const opts: Options<string> = { input: body && body.length > 0 ? body : '' };
    return command(action, { ...opts, shell: true });
  },
  // @ts-expect-error Enquirer types are narrower then hygen prompter types
  createPrompter: () => enquirer,
  localsDefaults,
  helpers,
  writeFile,
};
