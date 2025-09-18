import { globSync } from 'glob';
import fs from 'node:fs';
import path from 'node:path';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

const packageRoot = path.resolve(MONOREPO_ROOT, 'packages/web');

// Optimize media queries in the responsive style props CSS
const responsiveStyleFilepaths = [
  path.resolve(packageRoot, 'esm/styles/responsive/phone.css'),
  path.resolve(packageRoot, 'esm/styles/responsive/tablet.css'),
  path.resolve(packageRoot, 'esm/styles/responsive/desktop.css'),
];

for (const filepath of responsiveStyleFilepaths) {
  if (!fs.existsSync(filepath)) throw Error(`No file exists at filepath: ${filepath}`);
  const content = fs.readFileSync(filepath, 'utf-8');
  const mediaQuery = content.match(/@media.*?\{/g)?.[0];
  if (!mediaQuery) throw Error(`No media query exists in filepath: ${filepath}`);
  const newContent = content.replaceAll(mediaQuery, '').replaceAll('}}', '}').replaceAll('\n', '');
  fs.writeFileSync(filepath, `${mediaQuery}${newContent}}`);
}

// Add CSS layer directives to all CSS files
const cssFilepaths = globSync(`${packageRoot}/esm/**/*.css`);

for (const filepath of cssFilepaths) {
  if (!fs.existsSync(filepath)) throw Error(`No file exists at filepath: ${filepath}`);
  const content = fs.readFileSync(filepath, 'utf-8');
  const newContent = `@layer cds{${content}}`;
  fs.writeFileSync(filepath, newContent);
}
