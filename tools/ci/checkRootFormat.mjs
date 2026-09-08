import { spawnSync } from 'node:child_process';
import path from 'node:path';

import { selectRootFormatFiles } from './toolchains.mjs';
import { readWorkspaceProjects, workspaceRoot } from './workspaceProjects.mjs';

// Root/leftover docs only (skills, docs/, AGENTS.md, native-package markdown). Node package
// format stays on `nx format:check` in the Node workflow. Uses the workspace Prettier config.

const PRETTIER_BATCH_SIZE = 200;
const prettierCli = path.join(workspaceRoot, 'node_modules/prettier/bin/prettier.cjs');

function getChangedFiles() {
  const {
    BASE_SHA: baseSha,
    GITHUB_EVENT_NAME: eventName,
    NX_BASE: nxBase,
    NX_HEAD: nxHead,
    HEAD_SHA: headSha,
  } = process.env;
  const base = nxBase || baseSha;
  const head = nxHead || headSha || 'HEAD';

  if (!base) {
    console.error('NX_BASE or BASE_SHA is required to determine changed files.');
    process.exit(1);
  }

  const separator = eventName === 'pull_request' ? '...' : '..';
  const result = spawnSync(
    'git',
    ['diff', '--name-only', '--diff-filter=ACMR', `${base}${separator}${head}`],
    { encoding: 'utf8' },
  );

  if (result.status !== 0) {
    console.error(result.stderr || 'Unable to list changed files for format check.');
    process.exit(result.status ?? 1);
  }

  return result.stdout.split('\n').filter(Boolean);
}

function runPrettierCheck(files) {
  for (let index = 0; index < files.length; index += PRETTIER_BATCH_SIZE) {
    const batch = files.slice(index, index + PRETTIER_BATCH_SIZE);
    const result = spawnSync(
      process.execPath,
      [prettierCli, '--check', '--ignore-unknown', ...batch],
      {
        cwd: workspaceRoot,
        encoding: 'utf8',
        stdio: 'inherit',
      },
    );

    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  }
}

const changedFiles = getChangedFiles();
const projects = await readWorkspaceProjects();
const files = selectRootFormatFiles(changedFiles, projects);

if (files.length === 0) {
  console.log('No root-level documentation files to format-check.');
  process.exit(0);
}

console.log(
  `Root format check: ${files.length} file(s)\n${files.map((file) => `- ${file}`).join('\n')}`,
);
runPrettierCheck(files);
