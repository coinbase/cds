import crypto from 'node:crypto';

/**
 * Base64 SHA-256 of a JSON-serializable value. This is the change-detection hash that manifests
 * record, so the algorithm must not change: a different hash would re-version every asset.
 */
export const hashJson = (value: unknown) =>
  crypto.createHash('sha256').update(JSON.stringify(value)).digest('base64');

/** Oldest first, then by name, so generated output has a stable order. */
export const sortByCreatedAt = (
  a: { createdAt: string; name: string },
  b: { createdAt: string; name: string },
) => {
  const dateDiff = new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
  return dateDiff !== 0 ? dateDiff : a.name.localeCompare(b.name);
};

/** Splits `items` into batches of at most `size`, in order. */
export const createBatches = <T>(items: readonly T[], size: number): T[][] => {
  const batches: T[][] = [];
  for (let start = 0; start < items.length; start += size) {
    batches.push(items.slice(start, start + size));
  }
  return batches;
};
