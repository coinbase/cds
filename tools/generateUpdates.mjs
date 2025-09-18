/**
 * Run with `yarn node ./tools/generateUpdates.mjs`
 * We can add a custom # of days to get history. To do so pass in a num arg like
 *
 * To get the commit history of previous 10 days. Note it defaults to 14 if no arg is provided.
 * `yarn node ./tools/generateUpdates.mjs 10`
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const outputFilename = 'cds-biweekly-update.md';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT)
  throw Error(
    'Missing MONOREPO_ROOT environment variable, make sure to run this script with `yarn node ./generateUpdates.mjs`',
  );

const outputFile = path.resolve(MONOREPO_ROOT, outputFilename);

const numberOfDaysArg = parseInt(process.argv[2], 10);
const numberOfDays = Number.isInteger(numberOfDaysArg) ? numberOfDaysArg : 14;

const today = new Date();
const dateInPast = new Date(today.getFullYear(), today.getMonth(), today.getDate() - numberOfDays);

const getCommits = () => {
  const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const dateInPastString = `${dateInPast.getFullYear()}-${
    dateInPast.getMonth() + 1
  }-${dateInPast.getDate()}`;
  const command = `git log --since='${dateInPastString}' --until='${todayString}' --pretty=format:"%s - %an" origin/master`;
  const commands = command.split(' ');

  const result = spawnSync(commands.shift(), commands, {
    encoding: 'utf-8',
    shell: true,
  });

  if (result.error) {
    console.error('Error fetching commits:', result.error);
    console.error('stderr:', result.stderr);
    throw result.error;
  } else if (result.stderr) {
    console.log('Git command stderr:', result.stderr);
    return [];
  } else {
    const regexJira = /\[(DX-\d+)\]/g; // Regex to find Jira ticket numbers
    const prRegex = /\(#(\d+)\)/; // Regex to find PR numbers
    const commits = result.stdout
      .trim()
      .split('\n')
      .map((line) => {
        const parts = line.split(' - ');
        const commitMessage = parts[0];
        const authorTime = parts[1];

        // Check if JIRA is not present, insert [PR] link
        if (!regexJira.test(commitMessage)) {
          const prMatch = prRegex.exec(commitMessage);
          if (prMatch) {
            const prNumber = prMatch[1];
            const prLink = `[[PR](https://github.com/coinbase/cds-staging/pull/${prNumber})]`;
            return `- ${prLink} - ${commitMessage.replace(prRegex, '')} - ${authorTime}`;
          }
        }

        // If JIRA is present, format it as [DX-XXXX] link
        return `- ${commitMessage.replace(
          regexJira,
          (match, ticket) => `[${ticket}]`,
        )} - ${authorTime}`;
      });
    return commits;
  }
};

const checkChangelogs = () => {
  const changelogDir = path.resolve(MONOREPO_ROOT, 'packages');
  const changelogFolders = fs.readdirSync(changelogDir);
  const latestUpdates = {};

  for (const folder of changelogFolders) {
    const changelogPath = path.join(changelogDir, folder, 'CHANGELOG.md');
    if (fs.existsSync(changelogPath)) {
      const content = fs.readFileSync(changelogPath, 'utf8');

      // The updated regex to build the URL to link to our CDS changelog entry.
      const regex =
        /## (\d+\.\d+\.\d+) \({1,2}(\d+\/\d+\/\d+(?:, \s?\d+:\d+\s?(AM|PM)?)?\s?PST)\){1,2}/gi;

      let match;
      while ((match = regex.exec(content)) !== null) {
        const version = match[1];
        const dateStr = match[2].split(' ')[0].replace(',', '');
        const date = new Date(dateStr);

        if (date > dateInPast) {
          const versionForUrl = version.replace(/\./g, '');
          let dateForUrl = dateStr
            .replace(/\//g, '')
            .replace(/, /g, '-')
            .replace(/:/g, '')
            .replace(/\s/g, '')
            .toLowerCase();
          dateForUrl = dateForUrl.replace(/pst$/, ''); // Remove trailing 'pst' if it's at the end

          if (!latestUpdates[folder] || new Date(latestUpdates[folder].date) < date) {
            latestUpdates[folder] = {
              version,
              date: dateStr,
              // TODO: Fix this link
              hyperlink: 'https://coinbase.com',
            };
          }
        }
      }
    }
  }

  const updates = [];
  for (const [folder, info] of Object.entries(latestUpdates)) {
    updates.push(`- [cds-${folder}] [${info.version} (${info.date})](${info.hyperlink})`);
  }

  return updates;
};

const generateReport = () => {
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const dayOfWeek = today.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  let outputContent = [
    `## ${formattedDate}`,
    `Happy ${dayOfWeek} team! I'm happy to share some @ui-systems-team updates from the past two weeks!\n`,
  ];

  const changelogUpdates = checkChangelogs();

  if (changelogUpdates.length > 0) {
    outputContent.push('📢 New Packages');
    changelogUpdates.forEach((update) => {
      outputContent.push(`${update}`);
    });
  } else {
    outputContent.push('📢 No new package updates in the past two weeks.');
  }

  outputContent.push(''); // Add a newline before the Dev Updates section

  try {
    const commits = getCommits();
    outputContent.push('🚀 Dev Updates:');
    if (commits.length > 0) {
      commits.forEach((commit) => {
        // Remove commit hash from the commit string
        const commitMessage = commit.substring(commit.indexOf(' ') + 1);
        outputContent.push(`- ${commitMessage}`);
      });
    } else {
      outputContent.push('No commits found in the past two weeks.');
    }
  } catch (error) {
    console.error('Failed to generate report:', error);
    outputContent.push(`Failed to generate report: ${error}`);
  }

  // Join array into a single string with new lines
  outputContent = outputContent.join('\n');

  // Write the content to the markdown file in the output directory
  fs.writeFileSync(outputFile, outputContent, 'utf8');
  console.log(`Report generated at ${outputFile}`);
};

generateReport();
