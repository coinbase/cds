import sdk from '@stackblitz/sdk';

import { stackBlitzImportMap as importMap } from '../ReactLiveScope';

// ---------------------------------------------------------------------------
// Project template strings
// ---------------------------------------------------------------------------

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CDS Example</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body style="font-family: 'Inter', sans-serif">
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>`;

const PACKAGE_JSON = JSON.stringify(
  {
    name: 'cds-example',
    private: true,
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
    },
    dependencies: {
      react: '^18.0.0',
      'react-dom': '^18.0.0',
      '@coinbase/cds-web': 'latest',
      '@coinbase/cds-common': 'latest',
      '@coinbase/cds-icons': 'latest',
      '@coinbase/cds-illustrations': 'latest',
      '@coinbase/cds-web-visualization': 'beta',
      'framer-motion': '^10.18.0',
    },
    devDependencies: {
      typescript: '^5.0.0',
      vite: '^5.0.0',
      '@vitejs/plugin-react': '^4.0.0',
      '@types/react': '^18.0.0',
      '@types/react-dom': '^18.0.0',
    },
  },
  null,
  2,
);

const VITE_CONFIG = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;

const TSCONFIG = JSON.stringify(
  {
    compilerOptions: {
      target: 'ES2020',
      useDefineForClassFields: true,
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
    },
    include: ['src'],
  },
  null,
  2,
);

const INDEX_TSX = `import '@coinbase/cds-icons/fonts/web/icon-font.css';
import '@coinbase/cds-web/defaultFontStyles';
import '@coinbase/cds-web/globalStyles';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { ThemeProvider } from '@coinbase/cds-web/system/ThemeProvider';
import { MediaQueryProvider } from '@coinbase/cds-web/system/MediaQueryProvider';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <MediaQueryProvider>
      <ThemeProvider theme={defaultTheme} activeColorScheme="light">
        <VStack padding={3}>
          <App />
        </VStack>
      </ThemeProvider>
    </MediaQueryProvider>
  </React.StrictMode>,
);
`;

// ---------------------------------------------------------------------------
// Import generation helpers
// ---------------------------------------------------------------------------

/**
 * Strips string literals and comments from code so that words inside
 * "wrap", 'primary', `template`, // comments, etc. don't trigger false
 * positive imports.
 */
function stripNonCode(code: string): string {
  return (
    code
      // Remove single-line comments
      .replace(/\/\/.*$/gm, '')
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove template literals (simplified — doesn't handle nested ${})
      .replace(/`(?:[^`\\]|\\.)*`/g, '``')
      // Remove double-quoted strings
      .replace(/"(?:[^"\\]|\\.)*"/g, '""')
      // Remove single-quoted strings
      .replace(/'(?:[^'\\]|\\.)*'/g, "''")
  );
}

/**
 * Checks if an identifier is declared locally in the code, to avoid
 * generating a false-positive import for it.
 */
function isDeclaredLocally(name: string, code: string): boolean {
  const patterns = [
    // const prices = ... / let prices / var prices
    new RegExp(`(?:const|let|var)\\s+${name}\\b`),
    // function formatPrice(...)
    new RegExp(`function\\s+${name}\\b`),
    // const { title } = props  (destructuring in declarations)
    new RegExp(`(?:const|let|var)\\s+\\{[^}]*\\b${name}\\b`),
    // ({ title, description })  (destructuring in function params)
    new RegExp(`\\(\\s*\\{[^)]*\\b${name}\\b[^)]*\\}\\s*\\)`),
  ];
  return patterns.some((p) => p.test(code));
}

/**
 * Scans code for identifiers present in the import map and generates
 * the corresponding import statements. Groups imports by package.
 */
function generateImports(code: string): string {
  // Strip strings and comments so words inside them don't trigger imports
  const strippedCode = stripNonCode(code);

  // Collect which identifiers from the map are used in the code
  const usedBySource = new Map<string, { local: string; exported: string }[]>();

  for (const [name, entry] of Object.entries(importMap)) {
    // Skip identifiers that don't appear in the code (checked against stripped version)
    const regex = new RegExp(`\\b${name}\\b`);
    if (!regex.test(strippedCode)) continue;

    // Skip identifiers that only appear as JSX prop names (e.g. progress={0}).
    // If every occurrence is followed by = (but not == or ===), it's a prop.
    const usedAsValue = new RegExp(`\\b${name}\\b(?!\\s*=(?!=))`);
    if (!usedAsValue.test(strippedCode)) continue;

    // Skip identifiers that are declared locally
    if (isDeclaredLocally(name, code)) continue;

    const exported = entry.exportedAs ?? name;
    const existing = usedBySource.get(entry.source) ?? [];
    existing.push({ local: name, exported });
    usedBySource.set(entry.source, existing);
  }

  const lines: string[] = ["import React from 'react';"];

  // Remove React's own named imports from the 'react' source since we
  // already have the default import. Instead, generate named imports.
  const reactImports = usedBySource.get('react');
  if (reactImports && reactImports.length > 0) {
    const names = reactImports.map((i) => i.local).join(', ');
    // Replace the default-only import with a combined one
    lines[0] = `import React, { ${names} } from 'react';`;
    usedBySource.delete('react');
  }

  // Generate import statements for remaining packages, sorted for stability
  const sortedSources = [...usedBySource.keys()].sort();
  for (const source of sortedSources) {
    const imports = usedBySource.get(source)!;
    const specifiers = imports
      .map((i) => (i.local !== i.exported ? `${i.exported} as ${i.local}` : i.local))
      .sort()
      .join(', ');
    lines.push(`import { ${specifiers} } from '${source}';`);
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Default export helpers
// ---------------------------------------------------------------------------

/**
 * Ensures the code has a default export so it can be imported as `App`
 * from the entry point. Handles four cases:
 * 1. Already has `export default` → unchanged
 * 2. Has a PascalCase function declaration → prepend `export default`
 * 3. Has a PascalCase const declaration → append `export default Name;`
 * 4. Bare JSX → wrap in `export default function App() { return (...); }`
 */
function ensureDefaultExport(code: string): string {
  // Case 1: already has a default export
  if (/\bexport\s+default\b/.test(code)) {
    return code;
  }

  // Case 2: function ComponentName() — PascalCase function declaration
  const funcMatch = code.match(/^function\s+([A-Z]\w*)\s*\(/m);
  if (funcMatch) {
    return code.replace(new RegExp(`^(function\\s+${funcMatch[1]})`, 'm'), `export default $1`);
  }

  // Case 3: const ComponentName = ... — PascalCase const declaration
  const constMatch = code.match(/^const\s+([A-Z]\w*)\s*=/m);
  if (constMatch) {
    return `${code}\n\nexport default ${constMatch[1]};`;
  }

  // Case 4: bare JSX — wrap in a component function
  const indented = code
    .split('\n')
    .map((line) => '    ' + line)
    .join('\n');
  return `export default function App() {\n  return (\n${indented}\n  );\n}`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Exports the current playground code to a new StackBlitz project.
 * Generates imports from the import map and wraps the code in a
 * complete Vite + React + CDS project.
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
