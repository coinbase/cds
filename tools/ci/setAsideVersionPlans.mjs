import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * `nx release --projects=<package>` only looks at the release group of that package, and it stops
 * with an error when a pending version plan names a package outside the group, such as a `web` or
 * `mobile` change waiting for its own release. The Figma sync releases its package in its own
 * branch, so it sets those plans aside before it releases and puts them back after.
 */

export const VERSION_PLANS_DIRECTORY = '.nx/version-plans';

/** The packages a version plan names: the keys of its front matter. */
export const projectsOfPlan = (content) => {
  const lines = content.split('\n');
  if (lines[0].trim() !== '---') return [];
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (end < 0) return [];
  return lines
    .slice(1, end)
    .map((line) => line.split(':')[0].trim())
    .filter(Boolean);
};

/** The packages of the release group that a release of `project` looks at, `project` included. */
export const releaseGroupProjects = (nxJson, project) => [
  ...new Set(
    Object.values(nxJson.release?.groups ?? {})
      .filter((group) => group.projects?.includes(project))
      .flatMap((group) => group.projects),
  ),
];

/** The plans that name a package outside the group, which a release of the group would refuse. */
export const plansToSetAside = ({ plans, groupProjects }) =>
  plans
    .filter(({ content }) =>
      projectsOfPlan(content).some((project) => !groupProjects.includes(project)),
    )
    .map(({ file }) => file);

const readPlans = (directory) =>
  existsSync(directory)
    ? readdirSync(directory)
        .filter((file) => file.endsWith('.md') && file.toLowerCase() !== 'readme.md')
        .map((file) => ({ file, content: readFileSync(path.join(directory, file), 'utf-8') }))
    : [];

const move = (file, from, to) => {
  mkdirSync(to, { recursive: true });
  copyFileSync(path.join(from, file), path.join(to, file));
  rmSync(path.join(from, file));
};

/** Moves the plans a release of `project` would refuse out of the version plans folder. */
export const setAside = ({ root = '.', project, asideDirectory }) => {
  const nxJson = JSON.parse(readFileSync(path.join(root, 'nx.json'), 'utf-8'));
  const plansDirectory = path.join(root, VERSION_PLANS_DIRECTORY);
  const files = plansToSetAside({
    plans: readPlans(plansDirectory),
    groupProjects: releaseGroupProjects(nxJson, project),
  });
  for (const file of files) move(file, plansDirectory, asideDirectory);
  return files;
};

/** Puts the plans that were set aside back where they were. */
export const restore = ({ root = '.', asideDirectory }) => {
  const plansDirectory = path.join(root, VERSION_PLANS_DIRECTORY);
  const files = existsSync(asideDirectory) ? readdirSync(asideDirectory) : [];
  for (const file of files) move(file, asideDirectory, plansDirectory);
  return files;
};

const main = () => {
  const [command, ...args] = process.argv.slice(2);
  if (command === 'aside' && args.length === 2) {
    const files = setAside({ project: args[0], asideDirectory: args[1] });
    console.log(
      files.length
        ? `Set aside ${files.length} version plan(s) that name packages outside the release group of ${args[0]}: ${files.join(', ')}`
        : 'No version plan names a package outside the release group.',
    );
  } else if (command === 'restore' && args.length === 1) {
    const files = restore({ asideDirectory: args[0] });
    console.log(
      files.length ? `Put back ${files.length} version plan(s).` : 'Nothing to put back.',
    );
  } else {
    console.error(
      'Usage: setAsideVersionPlans.mjs aside <package> <directory> | restore <directory>',
    );
    process.exit(1);
  }
};

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
