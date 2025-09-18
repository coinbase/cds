import * as chalk from 'chalk';

export const logError = (message: string) => {
  console.error(chalk.bgRgb(155, 7, 19)(`FAIL: ${message}`));
};
