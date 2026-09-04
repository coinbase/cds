import { spawnSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';

import { classifyToolchains } from './toolchains.mjs';
import { readWorkspaceProjects } from './workspaceProjects.mjs';

const {
  BASE_SHA: baseSha,
  FORCE_ALL: forceAll,
  GITHUB_EVENT_NAME: eventName,
  GITHUB_OUTPUT: githubOutput,
  HEAD_SHA: headSha,
} = process.env;

function allToolchains() {
  return {
    node: true,
    gradle: true,
    xcode: true,
  };
}

function getChangedFiles() {
  if (forceAll === 'true' || !baseSha || !headSha || /^0+$/.test(baseSha)) {
    return null;
  }

  const separator = eventName === 'pull_request' ? '...' : '..';
  const result = spawnSync('git', ['diff', '--name-only', `${baseSha}${separator}${headSha}`], {
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    console.warn('Unable to classify changed files; running every toolchain as a safe fallback.');
    return null;
  }

  return result.stdout.split('\n').filter(Boolean);
}

const changedFiles = getChangedFiles();
const projects = await readWorkspaceProjects();
const result = changedFiles === null ? allToolchains() : classifyToolchains(changedFiles, projects);
const output = Object.entries(result)
  .map(([toolchain, isAffected]) => `${toolchain}=${isAffected}`)
  .join('\n');

console.log(`Affected toolchains:\n${output}`);

if (githubOutput) {
  appendFileSync(githubOutput, `${output}\n`);
}
