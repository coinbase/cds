import type { AnyObject } from '@coinbase/cds-utils/types';

import { logError } from './logError';
import type { TemplateMap } from './writeFile';
import { writeFile } from './writeFile';

export type { TemplateMap };
export const buildTemplates = async (templates: TemplateMap) => {
  const templateInputs: {
    template: string;
    dest: string;
    data: unknown;
    types?: Record<string, string>;
    config?: AnyObject;
  }[] = [];

  try {
    Object.entries(templates).forEach(([template, items]) => {
      items.forEach(({ dest, data, types, config = {} }) => {
        templateInputs.push({
          template,
          dest,
          data,
          types,
          config,
        });
      });
    });

    await Promise.all(templateInputs.map(writeFile));
  } catch (err) {
    if (err instanceof Error) {
      logError(err.message);
    } else {
      throw err;
    }
  }
};
