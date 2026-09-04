import sdk from '@stackblitz/sdk';

import { ensureDefaultExport } from './ensureDefaultExport';
import { generateImports } from './generateImports';
import { INDEX_HTML, INDEX_TSX, PACKAGE_JSON, TSCONFIG, VITE_CONFIG } from './templateFiles';

/**
 * Exports the current playground code as a complete
 * Vite + React + CDS project to a new StackBlitz project
 */
export function openInStackBlitz(code: string, isTypeScript = true): void {
  const imports = generateImports(code);
  const appCode = `${imports}\n\n${ensureDefaultExport(code)}\n`;
  const appFileName = isTypeScript ? 'src/App.tsx' : 'src/App.jsx';

  sdk.openProject(
    {
      title: 'CDS Example',
      template: 'node',
      files: {
        'index.html': INDEX_HTML,
        'package.json': PACKAGE_JSON,
        'vite.config.ts': VITE_CONFIG,
        'tsconfig.json': TSCONFIG,
        'src/index.tsx': INDEX_TSX,
        [appFileName]: appCode,
      },
    },
    { openFile: appFileName },
  );
}
