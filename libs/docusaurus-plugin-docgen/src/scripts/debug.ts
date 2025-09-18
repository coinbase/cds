import path from 'node:path';

import { docgenRunner } from './docgenRunner';

const sourceFiles = [
  'accordion/Accordion',
  'accordion/AccordionItem',
  'layout/Box',
  'layout/HStack',
  'layout/VStack',
  'layout/Group',
  'buttons/Button',
  'buttons/ButtonGroup',
  'system/Pressable',
  'system/PressableOpacity',
  'cells/Cell',
  'cells/CellAccessory',
  'cells/CellDetail',
  'cells/CellMedia',
  'cells/ListCell',
  'cells/ListCellFallback',
  'cells/ContentCell',
  'cells/ContentCellFallback',
  'controls/Checkbox',
];

const rootPath = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT ?? '';

async function debug() {
  const testsDir = path.resolve(__dirname, '../../__tests__');
  const webTsconfig = path.resolve(rootPath, 'packages/web/tsconfig.json');
  const mobileTsconfig = path.resolve(rootPath, 'packages/mobile/tsconfig.json');
  const docs = await docgenRunner({
    entryPoints: [webTsconfig, mobileTsconfig],
    sourceFiles,
    docsDir: path.resolve(testsDir, 'docs'),
    pluginDir: path.resolve(testsDir, '.docusaurus'),
  });
  console.log(docs);
}

void debug();
