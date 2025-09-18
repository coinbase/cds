import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export function runCmd(cmd: string) {
  try {
    console.log('runCmd:\n', cmd);
    const output = execSync(cmd, { encoding: 'utf-8' }); // the default is 'buffer'
    console.log('Output was:\n', output);
  } catch (err) {
    console.log(`Error was:\n${err}`);
  }
}

export function ensureDirExists(dirPath: string) {
  const dir = path.dirname(dirPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function removeAllFilesFromDir(dirPath: string) {
  runCmd(`rm -rf ${dirPath}`);
}
