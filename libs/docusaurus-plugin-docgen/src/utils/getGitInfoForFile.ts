import { exec } from 'node:child_process';

import { formatString } from '../scripts/docgenParser';

type Log = {
  sha: string;
  date: string;
  dateIso: string;
  author: string;
  commit: string;
  commitUrl?: string;
  pr?: string;
};

function trimScopeOrPr(str: string) {
  return str.replace('(', '').replace(')', '').replace('#', '');
}

async function gitCommand(cmd: string) {
  return new Promise<string>((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      const result = String(stdout);
      resolve(result);
    });
  });
}

export async function getGitInfoForFile({
  file,
  repoUrl: repoPrefix,
}: {
  file: string;
  repoUrl?: string;
}): Promise<Log[]> {
  const logs = await gitCommand(
    `git --no-pager log --follow --pretty=format:'%h||%at||%an||%s' -- ${file}`,
  );
  return Promise.all(
    logs.split('\n').map(async (line) => {
      const [sha, date, author, commit] = line.split('||');
      const message = commit.replace(/\(([^()]*)\)/gm, '').trim();
      const scopeAndPr = (commit.match(/\(([^()]*)\)/gm) as [string, string]) ?? [''];
      let pr = trimScopeOrPr(scopeAndPr[0]);
      if (scopeAndPr.length > 1) {
        pr = trimScopeOrPr(scopeAndPr[1]);
      }

      const release = (await gitCommand(`git tag --contains ${sha}`)) ?? 'v1.0.0';

      return {
        sha,
        dateIso: date,
        date: `${new Date(Number(date) * 1000).toLocaleString('en-US', {
          timeZone: 'America/Los_Angeles',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })} PST`,
        author,
        commit: formatString(message),
        commitUrl: repoPrefix ? `${repoPrefix}/commit/${sha}` : undefined,
        pr,
        release: release.split('\n')[0],
      };
    }),
  );
}
