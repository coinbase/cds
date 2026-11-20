/** Makes a sync download and compare every asset, instead of only the ones Figma reports as changed. */
export const FULL_COMPARE_FLAG = '--full-compare';

/** What the flag was called before; still accepted. */
const DEPRECATED_FLAG = '--sync-all';

/** Whether the command line asks for a full comparison. */
export const hasFullCompare = (
  args: readonly string[],
  warn: (message: string) => void = console.warn,
) => {
  if (args.includes(DEPRECATED_FLAG)) {
    warn(`${DEPRECATED_FLAG} is deprecated; use ${FULL_COMPARE_FLAG}.`);
  }
  return args.includes(FULL_COMPARE_FLAG) || args.includes(DEPRECATED_FLAG);
};
