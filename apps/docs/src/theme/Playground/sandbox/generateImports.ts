import { sandboxImportMap as importMap } from '../../ReactLiveScope';

type ImportSpecifier = { local: string; exported: string };

/**
 * Strips string literals and comments from code
 */
function stripNonCode(code: string): string {
  return (
    code
      // Remove single-line comments
      .replace(/\/\/.*$/gm, '')
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove template literals
      .replace(/`(?:[^`\\]|\\.)*`/g, '``')
      // Remove double-quoted strings
      .replace(/"(?:[^"\\]|\\.)*"/g, '""')
      // Remove single-quoted strings
      .replace(/'(?:[^'\\]|\\.)*'/g, "''")
  );
}

/**
 * Checks if an identifier is declared locally in the code
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
    new RegExp(`\\(\\s*\\{[^)]*(?<!:\\s*)\\b${name}\\b[^)]*\\}\\s*\\)`),
  ];
  return patterns.some((p) => p.test(code));
}

/**
 * Checks whether an identifier is used as a value in the code and is not declared locally
 */
function isUsedIdentifier(name: string, strippedCode: string): boolean {
  const appearsInCode = new RegExp(`(?<!\\.)\\b${name}\\b`).test(strippedCode);
  const usedAsValue = new RegExp(`(?<!\\.)\\b${name}\\b(?!\\s*[:=](?!=))`).test(strippedCode);
  return appearsInCode && usedAsValue && !isDeclaredLocally(name, strippedCode);
}

/**
 * Groups import-map entries by their source package, collecting the
 * local and exported names for each
 */
function groupBySource(
  entries: [string, { source: string; exportedAs?: string }][],
): Map<string, ImportSpecifier[]> {
  return entries.reduce((acc, [name, entry]) => {
    const exported = entry.exportedAs ?? name;
    const existing = acc.get(entry.source) ?? [];
    existing.push({ local: name, exported });
    acc.set(entry.source, existing);
    return acc;
  }, new Map<string, ImportSpecifier[]>());
}

/**
 * Scans code for identifiers present in the import map and generates
 * the corresponding import statements
 */
export function generateImports(code: string): string {
  const strippedCode = stripNonCode(code);

  const usedBySource = groupBySource(
    Object.entries(importMap).filter(([name]) => isUsedIdentifier(name, strippedCode)),
  );

  const lines: string[] = ["import React from 'react';"];

  // Handle React's named imports alongside the default import
  const reactImports = usedBySource.get('react');
  if (reactImports && reactImports.length > 0) {
    const names = reactImports.map((i) => i.local).join(', ');
    lines[0] = `import React, { ${names} } from 'react';`;
    usedBySource.delete('react');
  }

  // Generate sorted import statements for remaining packages
  [...usedBySource.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([source, imports]) => {
      const specifiers = imports
        .map((i) => (i.local !== i.exported ? `${i.exported} as ${i.local}` : i.local))
        .sort()
        .join(', ');
      lines.push(`import { ${specifiers} } from '${source}';`);
    });

  return lines.join('\n');
}
