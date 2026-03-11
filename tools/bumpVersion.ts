import { confirm, input, select } from '@inquirer/prompts';
import { createProjectGraphAsync } from '@nx/devkit';
import { execSync } from 'child_process';
import execa from 'execa';
import fs from 'fs';
import path from 'path';
import semver from 'semver';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { projectsNeedingVersion } from './ci/getProjectsNeedingVersion';
import { color, log, logInfo, logNewLine, logWarn } from './ci/logging';

const UNRELEASED_HEADER = '## Unreleased';
const TEMPLATE_TOKEN = '<!-- template-start -->';

export type VersionBump = 'major' | 'minor' | 'patch' | 'none';

interface LogEntry {
  bump: VersionBump;
  pr?: string;
  message: string;
}

interface PrefillOptions {
  message?: string;
  bump?: VersionBump;
  pr?: string;
}

interface VersionOptions {
  project?: string;
  all?: boolean;
  message?: string;
  bump?: VersionBump;
  pr?: string;
}

export async function getRemoteRepoUrl(): Promise<string> {
  if (process.env.CB_GHA_REPO) {
    return `https://github.com/${process.env.CB_GHA_REPO}`;
  }
  const url = (await execa('git', ['config', '--get', 'remote.origin.url'])).stdout.trim();

  // https://github.com/coinbase/cds.git -> https://github.com/coinbase/cds
  if (url.startsWith('https://')) {
    return url.replace(/\.git$/, '');
  }

  // git@github.com:coinbase/cds.git ->  https://github.com/coinbase/cds
  return url
    .replace('git@', 'https://')
    .replace('net:', 'net/')
    .replace('com:', 'com/')
    .replace(/\.git$/, '');
}

export async function getWorkspaceData() {
  const projectGraph = await createProjectGraphAsync();
  // Taken from: https://github.com/nrwl/nx/blob/1d773c0d352631db9bb463e2f21813914111c4ba/packages/nx/src/project-graph/project-graph.ts#L63
  return Object.fromEntries(
    Object.entries(projectGraph.nodes).map(([project, { data }]) => [project, data]),
  );
}

function determineNextVersion(logs: LogEntry[], currentVersion: string): string | null {
  const isAlpha = currentVersion.startsWith('0.');
  let major = 0;
  let minor = 0;
  let patch = 0;

  logs.forEach(({ bump }) => {
    if (bump === 'major') {
      major += 1;
    } else if (bump === 'minor') {
      minor += 1;
    } else if (bump === 'patch') {
      patch += 1;
    }
  });

  if (major > 0) {
    return semver.inc(currentVersion, isAlpha ? 'minor' : 'major');
  }

  if (minor > 0) {
    return semver.inc(currentVersion, isAlpha ? 'patch' : 'minor');
  }

  if (patch > 0) {
    return semver.inc(currentVersion, 'patch');
  }

  return null;
}

function sentenceCase(message: string): string {
  let msg = message.trim();

  if (!msg.startsWith('`')) {
    msg = msg[0].toLocaleUpperCase() + msg.slice(1);
  }

  if (msg[msg.length - 1].match(/[^.!?]/i)) {
    msg += '.';
  }

  return msg;
}

async function formatLogs(logs: LogEntry[], version: string | null): Promise<string> {
  const repoUrl = await getRemoteRepoUrl();
  const groups: Record<VersionBump, string[]> = {
    major: ['#### 💥 Breaking', ''],
    minor: ['#### 🚀 Updates', ''],
    patch: ['#### 🐞 Fixes', ''],
    none: ['#### 📘 Misc', ''],
  };

  logs.forEach((logItem) => {
    let line = sentenceCase(logItem.message);

    if (logItem.pr) {
      line += ` [[#${logItem.pr}](${repoUrl}/pull/${logItem.pr})]`;
    }

    groups[logItem.bump || 'none'].push(`- ${line}`);
  });

  const block: string[] = [
    version
      ? `## ${version} (${new Date().toLocaleString('en-US', {
          timeZone: 'America/Los_Angeles',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })} PST)`
      : UNRELEASED_HEADER,
  ];

  Object.values(groups).forEach((group) => {
    if (group.length > 2) {
      block.push('', ...group);
    }
  });

  return block.join('\n');
}

async function gatherLogs(
  projectName: string,
  logs: LogEntry[],
  prefills?: PrefillOptions,
): Promise<boolean> {
  let addingLogs = true;
  while (addingLogs) {
    const bump = await select<VersionBump>({
      message: 'Type of change?',
      choices: [
        {
          value: 'major' as VersionBump,
          name: `Breaking ${color.muted('→ backwards incompatible changes')}`,
        },
        {
          value: 'minor' as VersionBump,
          name: `Update ${color.muted('→ new features, updated functionality')}`,
        },
        {
          value: 'patch' as VersionBump,
          name: `Fix ${color.muted('→ bug fixes, types, linting, chores')}`,
        },
        {
          value: 'none' as VersionBump,
          name: `Tests ${color.muted('→ increased testing and code coverage')}`,
        },
        {
          value: 'patch' as VersionBump,
          name: `Dependencies ${color.muted('→ added, upgraded, or removed deps')}`,
        },
        {
          value: 'none' as VersionBump,
          name: `Internal ${color.muted('→ documentation, CI & pipeline changes')}`,
        },
      ],
    });

    const message = await input({
      message: 'Changelog message?',
      default: prefills?.message,
      validate: (value: string) => (!value ? 'Cannot be empty' : true),
    });

    const pr = await input({
      message: 'PR number (e.g. 123)?',
      default: '',
      validate: (value: string) => (value && !value.match(/^\d+$/) ? 'Must be a number' : true),
    });

    const again = await confirm({
      message: `Add another entry for ${projectName}?`,
      default: false,
    });

    const logItem = { bump, message, pr: pr || undefined };
    logs.push(logItem);
    if (again) {
      logNewLine();
      addingLogs = true;
    } else {
      addingLogs = false;
    }
  }

  const another = await confirm({
    message: `Add entry for another project?`,
    default: false,
  });

  if (another) {
    logNewLine();
    return true;
  }

  return false;
}

async function updateChangelog(
  projectRoot: string,
  logs: LogEntry[],
  nextVersion: string | null,
): Promise<string | null> {
  const logPath = path.join(projectRoot, 'CHANGELOG.md');

  if (!fs.existsSync(logPath)) {
    await fs.promises.writeFile(logPath, '# Changelog', 'utf8');
  }

  const section = await formatLogs(logs, nextVersion);
  let contents = await fs.promises.readFile(logPath, 'utf8');

  // Insert the new section after one of these tokens
  const inserted = [UNRELEASED_HEADER, TEMPLATE_TOKEN, '# Changelog'].some((templateToken) => {
    const index = contents.indexOf(templateToken);

    if (index >= 0) {
      const endIndex = index + templateToken.length;

      contents = [
        // Omit the unreleased header if were adding another entry
        contents.slice(0, templateToken === UNRELEASED_HEADER ? index : endIndex).trim(),
        section,
        contents.slice(endIndex + 1).trim(),
      ].join('\n\n');

      return true;
    }

    return false;
  });

  // Insert the section at the top of the file
  if (!inserted) {
    contents = `${section}\n\n${contents}`.trim();
  }

  // Add trailing newline
  contents += '\n';

  await fs.promises.writeFile(logPath, contents, 'utf8');

  return nextVersion;
}

export async function bumpVersion(optionalProjectName?: string, prefills?: PrefillOptions) {
  const workspace = await getWorkspaceData();
  const unversionedPackages = await projectsNeedingVersion(logInfo);
  let projectNameSelected = optionalProjectName;
  if (!projectNameSelected) {
    if (!unversionedPackages.length) {
      log('No changed projects for current git HEAD.');
      process.exit(0);
    }
    const chosenProject = await select({
      message: 'Which project?',
      choices: unversionedPackages.map((p) => ({
        value: p,
        name: p,
      })),
    });
    projectNameSelected = chosenProject;
  }

  const projectNames = optionalProjectName === 'all' ? unversionedPackages : [projectNameSelected];
  for (const projectName of projectNames) {
    const projectPath = workspace[projectName].root;

    const projectRoot = path.join(process.cwd(), projectPath);

    logNewLine();
    log(`Versioning project ${color.project(projectName)} ${color.muted(`(${projectPath})`)}`);

    const pkgPath = path.join(projectRoot, 'package.json');

    const pkg = JSON.parse(await fs.promises.readFile(pkgPath, 'utf8')) as {
      name: string;
      version: string;
    };

    log('Gathering changelog entries');

    const logs: LogEntry[] = [];
    let again = false;
    const bump = prefills?.bump;
    const message = prefills?.message;
    if (projectName && bump && message) {
      const pr = prefills?.pr;
      // validate pr
      if (pr && !/^[0-9]+$/.test(pr || '')) {
        throw new Error(`Invalid pr: ${pr}`);
      }
      logs.push({
        bump,
        message,
        pr: prefills?.pr,
      });
    } else {
      again = await gatherLogs(projectName, logs, prefills);
    }
    const nextVersion = determineNextVersion(logs, pkg.version);

    if (logs.length === 0) {
      logWarn('Nothing to release');

      return;
    }

    log(`Updating changelog with ${logs.length} entries`);

    await updateChangelog(projectRoot, logs, nextVersion);

    if (nextVersion) {
      log(
        `Bumping ${color.project(pkg.name)} to ${nextVersion} ${color.muted(
          `(from ${pkg.version})`,
        )}`,
      );

      pkg.version = nextVersion;

      await fs.promises.writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
    } else {
      log(`Added an unreleased entry to ${color.project(pkg.name)}`);
    }

    logNewLine();
    if (again) {
      await bumpVersion('', prefills);
    }
  }
}

function parseArgs(): VersionOptions {
  const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 [options] [project]')
    .option('all', {
      alias: 'a',
      type: 'boolean',
      description: 'Bump version for all changed projects',
    })
    .option('message', {
      alias: 'm',
      type: 'string',
      description: 'Changelog message',
    })
    .option('bump', {
      alias: 'b',
      type: 'string',
      choices: ['major', 'minor', 'patch', 'none'],
      description: 'Version bump type',
    })
    .option('pr', {
      type: 'string',
      description: 'PR number (e.g. 123)',
    })
    .positional('project', {
      type: 'string',
      description: 'Project name to bump version for',
    })
    .check((argv) => {
      if (argv.all && (!argv.message || !argv.bump)) {
        throw new Error('A message and bump type are required when bumping all projects');
      }
      return true;
    })
    .help()
    .alias('help', 'h')
    .parseSync();

  return {
    project: (argv._[0] as string) || (argv.project as string),
    all: argv.all,
    message: argv.message,
    bump: argv.bump as VersionBump | undefined,
    pr: argv.pr,
  };
}

async function main() {
  const options = parseArgs();

  let lastCommitMessage = '';
  try {
    lastCommitMessage = execSync(
      'git log -1 --no-merges --pretty=%B $(git merge-base master HEAD)..HEAD',
      { encoding: 'utf-8' },
    ).trim();
  } catch (e) {
    logInfo((e as Error)?.message);
  }

  const message = options.message || lastCommitMessage;
  const selectedProject = options.all ? 'all' : options.project;

  await bumpVersion(selectedProject, {
    message,
    bump: options.bump,
    pr: options.pr,
  });
}

if (require.main === module) {
  main()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      // Gracefully exit if the user cancels the prompt.
      if (error instanceof Error && error.name === 'ExitPromptError') {
        console.log('Process cancelled, see you next time! 👋');
        process.exit(0);
      }
      console.error(error);
      process.exit(1);
    });
}
