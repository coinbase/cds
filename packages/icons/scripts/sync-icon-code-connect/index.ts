/**
 * Generates Icon Code Connect files from scratch for both web and mobile packages,
 * driven entirely by the icon component sets in the Figma CDS Components file.
 *
 * Each icon component set (prefixed "ui/" or "nav/") gets its own figma.connect()
 * entry. Active/Inactive-suffixed variants (e.g. "ui/bellActive") are legacy names
 * — their entry still renders the base name (<Icon name="bell" />), since the
 * active state is expressed via the shared `active` prop instead.
 *
 * Called automatically by `icons:sync-icons`, but can also be run standalone:
 *
 *   yarn nx run icons:sync-icon-code-connect
 *
 * Environment:
 *   FIGMA_ACCESS_TOKEN  Required. Figma personal access token.
 */

import { getFileComponentSets } from '@cds/figma-api';
import fs from 'node:fs';
import path from 'node:path';

// The Figma CDS component-library file key — this is where the Icon component
// instances live in Figma, distinct from the icons asset file used by sync-icons.
const CODE_CONNECT_FIGMA_FILE_KEY = 'k5CtyJccNQUGMI5bI4lJ2g';
const FIGMA_BASE_URL = `https://figma.com/file/${CODE_CONNECT_FIGMA_FILE_KEY}/`;

// ─── Name helpers ─────────────────────────────────────────────────────────────

// Icons in the Figma file are prefixed with "ui/" or "nav/" (e.g. "ui/bellActive").
// Strips the prefix, converts to camelCase, then strips legacy Active/Inactive
// suffixes so all variants render as the base icon name in code.
function toIconName(rawName: string): string {
  return rawName
    .replace(/^(?:ui|nav)\//, '')
    .replace(/[-_\s]+(.)/g, (_, c: string) => c.toUpperCase())
    .replace(/^(.)/, (c: string) => c.toLowerCase())
    .replace(/(?:Active|Inactive)$/, '');
}

// ─── File generation ──────────────────────────────────────────────────────────

type Target = {
  label: string;
  filePath: string;
  header: string;
  importPath: string;
};

type ComponentSet = { name: string; node_id: string };

function generateFile(target: Target, iconSets: ComponentSet[]): string {
  const entries = iconSets.map(({ name, node_id }) => {
    const iconName = toIconName(name);
    const url = `${FIGMA_BASE_URL}?node-id=${node_id.replace(':', '-')}`;
    return `figma.connect(Icon, '${url}', {
  imports: ["import { Icon } from '${target.importPath}'"],
  props,
  example: (props) => <Icon name="${iconName}" {...props} />,
});`;
  });

  console.log(`  [${target.label}] ${entries.length} entries generated.`);
  return target.header + entries.join('\n\n') + '\n';
}

// ─── Exported function ────────────────────────────────────────────────────────

// Shared props const written at the top of each generated file.
// Enum keys match the variant property display names used in the Figma file.
const propsConst = `const props = {
  size: figma.enum('size', {
    xs: 'xs',
    s: 's',
    m: 'm',
    l: 'l',
  }),
  active: figma.boolean('active'),
};\n\n`;

export async function syncIconCodeConnect(repoRoot: string) {
  const targets: Target[] = [
    {
      label: 'web',
      filePath: path.join(repoRoot, 'packages/web/src/icons/__figma__/Icon.figma.tsx'),
      importPath: '@coinbase/cds-web/icons/Icon',
      header: `import { figma } from '@figma/code-connect';\n\nimport { Icon } from '../Icon';\n\n${propsConst}`,
    },
    {
      label: 'mobile',
      filePath: path.join(repoRoot, 'packages/mobile/src/icons/__figma__/Icon.figma.tsx'),
      importPath: '@coinbase/cds-mobile/icons/Icon',
      header: `import React from 'react';\nimport { figma } from '@figma/code-connect';\n\nimport { Icon } from '../Icon';\n\n${propsConst}`,
    },
  ];

  console.log('\nSyncing icon Code Connect entries…');
  console.log('Fetching Figma component sets…');
  const { meta } = await getFileComponentSets(CODE_CONNECT_FIGMA_FILE_KEY);
  const allSets = (meta?.component_sets ?? []) as ComponentSet[];
  const iconSets = allSets
    .filter(({ name }) => /^(?:ui|nav)\//.test(name))
    .sort((a, b) => toIconName(a.name).localeCompare(toIconName(b.name)));
  console.log(`  Found ${iconSets.length} icon component sets.`);

  console.log('\nGenerating Code Connect files…');
  for (const target of targets) {
    const content = generateFile(target, iconSets);
    fs.writeFileSync(target.filePath, content, 'utf-8');
    console.log(`  Written to ${path.relative(repoRoot, target.filePath)}`);
  }

  console.log('\n✅ Code Connect files generated.');
}

// ─── CLI entry point ──────────────────────────────────────────────────────────

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

syncIconCodeConnect(MONOREPO_ROOT).catch((err: unknown) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
