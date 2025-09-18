import { $, log } from 'zx'; // https://github.com/google/zx

$.verbose = true;

/**
 * Fail if any installed packages are outdated.
 * https://docs.expo.dev/workflow/expo-cli/#environment-variables:~:text=on%20your%20machine.-,CI,-boolean
 */
const { stdout, stderr } = await $`expo install --check`;
if (stdout) {
  log({ kind: 'stdout', data: stdout });
}

if (stderr) {
  log({ kind: 'stderr', data: stderr });
}
