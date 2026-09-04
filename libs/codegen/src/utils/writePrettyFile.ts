import chalk from 'chalk';
import fs from 'node:fs';
import prettier from 'prettier';

export async function writePrettyFile({
  outFile,
  contents,
  parser,
  logInfo,
}: {
  outFile: string;
  contents: string;
  parser?: prettier.BuiltInParserName;
  logInfo?: string | boolean;
}): Promise<string> {
  const prettierOptions = await prettier.resolveConfig('../configs/prettierConfig.json');
  const prettiered = await prettier.format(contents, {
    ...prettierOptions,
    parser: parser ?? 'typescript',
  });

  await fs.promises.writeFile(outFile, prettiered, { encoding: 'utf8', flag: 'w' });

  if (logInfo !== false) {
    console.info(
      `${chalk.greenBright('success')} Wrote ${logInfo ? ` ${logInfo} to` : ''} ${outFile}`,
    );
  }

  return prettiered;
}
