import { runner } from 'hygen/dist/index';

import { config } from './config';

function parseArgs(template: string, opts: Record<string, unknown>) {
  const [generator, action, subaction] = template.split('/');
  const formattedOpts = Object.entries(opts).reduce((prev, [key, value]) => {
    /** Hygen accepts args via cli which requires the value to be converted to a string */
    const sanitizedValue = typeof value === 'object' ? JSON.stringify(value) : value;
    return [...prev, `--${key}=${sanitizedValue}`];
  }, [] as string[]);

  return [generator, subaction ? `${action}:${subaction}` : action, ...formattedOpts];
}

export async function codegen<T>(template: string, opts?: T) {
  await runner(parseArgs(template, opts ?? {}), config).then(({ failure }) => {
    if (failure) {
      process.exit(1);
    }
  });
}
