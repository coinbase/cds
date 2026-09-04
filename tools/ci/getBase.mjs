export function getBase() {
  return process.env.GITHUB_BASE_REF ?? 'origin/master';
}
