import path from 'node:path';
import { $ } from 'zx';

$.verbose = true;

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

const getPercyToken = (): string | undefined => {
  const token = process.env.PERCY_TOKEN;

  if (token) {
    return token;
  }

  const envVarName = `PERCY_TOKEN_${String(process.env.NX_PROJECT_NAME)
    .toUpperCase()
    .replace(/[-/]/g, '_')}`;

  if (process.env[envVarName]) {
    return process.env[envVarName];
  }

  throw new Error(
    `A PERCY_TOKEN or ${envVarName} environment variable is required for running Percy in the "${process.env.NX_PROJECT_NAME}" project.`,
  );
};

const main = async () => {
  process.env.PERCY_TOKEN = getPercyToken();
  await $`percy storybook ${path.join(MONOREPO_ROOT, 'apps/storybook/dist')}`;
};

void main();
