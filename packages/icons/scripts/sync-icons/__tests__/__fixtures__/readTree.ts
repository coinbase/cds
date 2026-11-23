import fs from 'node:fs';
import path from 'node:path';

const walk = (directory: string): string[] =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(directory, entry.name))
        : [path.join(directory, entry.name)],
    );

const fontHash = /-[0-9a-f]{13}\.woff2/g;

/**
 * Every file under `root` by relative path: its text, or `{ binary: true }` for the font files,
 * whose bytes change with the font tooling. Dates and the font hash are replaced, so that two
 * runs of the same sync read the same.
 */
export const readTree = (root: string) => {
  const tree: Record<string, string | { binary: true }> = {};
  for (const file of walk(root).sort()) {
    const relative = path.relative(root, file).replace(/icons-\d{4}-\d{2}-\d{2}/, 'icons-<date>');
    if (/\.(woff2|ttf)$/.test(file)) {
      tree[relative.replace(fontHash, '-HASH.woff2')] = { binary: true };
      continue;
    }
    let text = fs.readFileSync(file, 'utf-8');
    if (relative.endsWith('manifest.json')) {
      const manifest = JSON.parse(text);
      manifest.lastUpdated = manifest.lastUpdated ? '<date>' : '';
      text = JSON.stringify(manifest, null, 2);
    }
    tree[relative] = text
      .replace(fontHash, '-HASH.woff2')
      .replace(/icons-\d{4}-\d{2}-\d{2}/g, 'icons-<date>')
      .replace(
        /Publish (retail )?icons \d{4}-\d{2}-\d{2}/g,
        (_match, retail) => `Publish ${retail ?? ''}icons <date>`,
      );
  }
  return tree;
};
