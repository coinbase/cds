import parser from 'yargs-parser';

import { codegen } from './codegen';

// The first two items in process.argv is path to process and path of this file, which are not needed.
const args = process.argv.slice(2);
const { _: template, ...cliArgs } = parser(args);

/**
 * Execute hygen via terminal with optional args.
 * Custom config for this CDS version of hygen can be found in codegen/config.ts file.
 * @example
 * ```sh
 * yarn codegen cli
 * ```
 * @link http://www.hygen.io/docs/generators#interactive-prompt
 */
void codegen(template.join('/'), cliArgs);
