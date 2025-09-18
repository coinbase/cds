export function isCI() {
  return Boolean(process.env.CI);
}
