import * as ejs from 'ejs';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { formatTemplateType } from './formatTemplateType';
import { getHeaderCommentForFileType } from './getHeaderCommentForFileType';
import { getPrettierParser } from './getPrettierParser';
import { getSourcePath } from './getSourcePath';
import { writePrettyFile } from './writePrettyFile';

export type TemplateConfig<T = unknown> = {
  dest: string;
  data: T;
  types?: Record<string, string>;
  config?: {
    defaultExport?: boolean;
    commonJS?: boolean;
    disableAsConst?: boolean;
    disableStringify?: boolean;
    disablePrettier?: boolean;
    imports?: {
      func: string;
      module: string;
    }[];
    sort?: boolean;
  };
  header?: string;
};

export type TemplateMap = Record<string, TemplateConfig[]>;
type WriteFileParams = {
  template?: string;
} & TemplateConfig;

export const writeFile = async ({
  template,
  data,
  types = {},
  dest,
  config = {},
  header = '',
}: WriteFileParams) => {
  try {
    let contents = data as string;
    const outFile = getSourcePath(dest);
    const ext = path.extname(outFile);

    if (template) {
      const templatePath = getSourcePath(`libs/codegen/src/templates/${template}`);
      const code = await ejs.renderFile(templatePath, {
        data,
        format: formatTemplateType,
        config,
        types,
      });
      contents = getHeaderCommentForFileType(ext) + header + code;
    }

    const dirForFile = path.dirname(outFile);
    // If directory doesn't already exist, create it.
    fs.mkdirSync(dirForFile, { recursive: true });

    if (config?.disablePrettier) {
      await fs.promises.writeFile(outFile, contents, { encoding: 'utf8', flag: 'w' });
    } else {
      await writePrettyFile({
        outFile,
        contents,
        logInfo: dest,
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
};
