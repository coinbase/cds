import { spawn } from 'node:child_process';

/**
 * Runs a command with inherited stdio (output goes to terminal).
 */
export function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    if (!options.silent) {
      console.log(`> ${command} ${args.join(' ')}`);
    }
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: false,
      ...options,
    });
    child.on('close', (code) => {
      if (code === 0 || options.ignoreError) resolve();
      else reject(new Error(`Command failed with code ${code}`));
    });
    child.on('error', (err) => {
      if (options.ignoreError) resolve();
      else reject(err);
    });
  });
}

/**
 * Runs a command and captures its stdout (instead of inheriting stdio).
 * Used when we need to parse the output of a command.
 */
export function runCapture(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { shell: false });
    let stdout = '';
    child.stdout.on('data', (data) => {
      stdout += data;
    });
    child.on('close', (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(`Command failed with code ${code}`));
    });
    child.on('error', reject);
  });
}
