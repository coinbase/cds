import path from 'node:path';

import { ESLintUtils } from '@typescript-eslint/utils';

import getForbiddenImportsModule from './getForbiddenImports.cjs';

const {
  BARREL_TARGET_PATTERN,
  getForbiddenImportsForFile,
  resolveLeafSpecifiers,
  resolveRelativeLeafSpecifiers,
  resolveRelativeBarrel,
} = getForbiddenImportsModule;

const createRule = ESLintUtils.RuleCreator(() => null);

function findBarrelMatch(specifier, forbidden) {
  if (typeof specifier !== 'string' || !forbidden || forbidden.size === 0) {
    return null;
  }
  for (const [pkg, subpaths] of forbidden) {
    if (specifier === pkg) {
      if (subpaths.has('')) {
        return { packageName: pkg, subpath: '' };
      }
      return null;
    }
    if (specifier.startsWith(`${pkg}/`)) {
      const subpath = specifier.slice(pkg.length + 1);
      if (subpaths.has(subpath)) {
        return { packageName: pkg, subpath };
      }
    }
  }
  return null;
}

function getQuote(node) {
  const raw = node.source.raw;
  return raw && raw[0] === '"' ? '"' : "'";
}

// Render a single `{ a, b as c }` clause, honoring per-specifier `type`
// modifiers (skipped when the whole statement is already `type`-only).
function renderNamedClause(specs, isWholeTypeOnly) {
  const parts = specs.map(({ imported, local, typeOnly }) => {
    const prefix = !isWholeTypeOnly && typeOnly ? 'type ' : '';
    return imported === local ? `${prefix}${imported}` : `${prefix}${imported} as ${local}`;
  });
  return `{ ${parts.join(', ')} }`;
}

// Group resolved specifiers by their destination subpath, preserving the order
// in which each destination was first seen.
function groupBySpecifier(specs, resolved) {
  const groups = new Map();
  for (const spec of specs) {
    const target = resolved.get(spec.imported);
    if (!groups.has(target)) {
      groups.set(target, []);
    }
    groups.get(target).push(spec);
  }
  return groups;
}

function buildImportFix(node, match, fromDir, fixer) {
  // Only named and/or default imports can be rewritten to leaf modules.
  // Namespace and side-effect imports have no per-name destination to split to.
  const named = [];
  let defaultSpec = null;
  for (const specifier of node.specifiers) {
    if (specifier.type === 'ImportNamespaceSpecifier') {
      return null;
    }
    if (specifier.type === 'ImportDefaultSpecifier') {
      defaultSpec = { imported: 'default', local: specifier.local.name };
    } else if (specifier.type === 'ImportSpecifier') {
      named.push({
        imported: specifier.imported.name,
        local: specifier.local.name,
        typeOnly: specifier.importKind === 'type',
      });
    }
  }
  if (!defaultSpec && named.length === 0) {
    return null;
  }

  const allSpecs = defaultSpec ? [defaultSpec, ...named] : named;
  const resolved = resolveLeafSpecifiers(
    match.packageName,
    match.subpath,
    allSpecs.map((s) => s.imported),
    fromDir,
  );
  if (!resolved || allSpecs.some((s) => !resolved.get(s.imported))) {
    return null;
  }

  const quote = getQuote(node);
  const isWholeTypeOnly = node.importKind === 'type';
  const groups = groupBySpecifier(allSpecs, resolved);

  const statements = [];
  for (const [target, specs] of groups) {
    const keyword = isWholeTypeOnly ? 'import type' : 'import';
    const defaultInGroup = specs.find((s) => s.imported === 'default');
    const namedInGroup = specs.filter((s) => s.imported !== 'default');
    const bindings = [];
    if (defaultInGroup) {
      bindings.push(defaultInGroup.local);
    }
    if (namedInGroup.length > 0) {
      bindings.push(renderNamedClause(namedInGroup, isWholeTypeOnly));
    }
    statements.push(`${keyword} ${bindings.join(', ')} from ${quote}${target}${quote};`);
  }

  return fixer.replaceText(node, statements.join('\n'));
}

function buildExportFix(node, match, fromDir, fixer) {
  // `export { a, b as c } from 'barrel'` — split per destination subpath.
  const specs = node.specifiers.map((specifier) => ({
    imported: specifier.local.name,
    exported: specifier.exported.name,
    typeOnly: specifier.exportKind === 'type',
  }));
  if (specs.length === 0) {
    return null;
  }

  const resolved = resolveLeafSpecifiers(
    match.packageName,
    match.subpath,
    specs.map((s) => s.imported),
    fromDir,
  );
  if (!resolved || specs.some((s) => !resolved.get(s.imported))) {
    return null;
  }

  const quote = getQuote(node);
  const isWholeTypeOnly = node.exportKind === 'type';
  const groups = groupBySpecifier(specs, resolved);

  const statements = [];
  for (const [target, groupSpecs] of groups) {
    const keyword = isWholeTypeOnly ? 'export type' : 'export';
    const parts = groupSpecs.map(({ imported, exported, typeOnly }) => {
      const prefix = !isWholeTypeOnly && typeOnly ? 'type ' : '';
      return imported === exported ? `${prefix}${imported}` : `${prefix}${imported} as ${exported}`;
    });
    statements.push(`${keyword} { ${parts.join(', ')} } from ${quote}${target}${quote};`);
  }

  return fixer.replaceText(node, statements.join('\n'));
}

function buildRelativeImportFix(node, barrelFile, fromFile, fixer) {
  const named = [];
  let defaultSpec = null;
  for (const specifier of node.specifiers) {
    if (specifier.type === 'ImportNamespaceSpecifier') {
      return null;
    }
    if (specifier.type === 'ImportDefaultSpecifier') {
      defaultSpec = { imported: 'default', local: specifier.local.name };
    } else if (specifier.type === 'ImportSpecifier') {
      named.push({
        imported: specifier.imported.name,
        local: specifier.local.name,
        typeOnly: specifier.importKind === 'type',
      });
    }
  }
  if (!defaultSpec && named.length === 0) {
    return null;
  }

  const allSpecs = defaultSpec ? [defaultSpec, ...named] : named;
  const resolved = resolveRelativeLeafSpecifiers(
    barrelFile,
    fromFile,
    allSpecs.map((s) => s.imported),
  );
  if (!resolved || allSpecs.some((s) => !resolved.get(s.imported))) {
    return null;
  }

  const quote = getQuote(node);
  const isWholeTypeOnly = node.importKind === 'type';
  const groups = groupBySpecifier(allSpecs, resolved);

  const statements = [];
  for (const [target, specs] of groups) {
    const keyword = isWholeTypeOnly ? 'import type' : 'import';
    const defaultInGroup = specs.find((s) => s.imported === 'default');
    const namedInGroup = specs.filter((s) => s.imported !== 'default');
    const bindings = [];
    if (defaultInGroup) {
      bindings.push(defaultInGroup.local);
    }
    if (namedInGroup.length > 0) {
      bindings.push(renderNamedClause(namedInGroup, isWholeTypeOnly));
    }
    statements.push(`${keyword} ${bindings.join(', ')} from ${quote}${target}${quote};`);
  }

  return fixer.replaceText(node, statements.join('\n'));
}

function buildRelativeExportFix(node, barrelFile, fromFile, fixer) {
  const specs = node.specifiers.map((specifier) => ({
    imported: specifier.local.name,
    exported: specifier.exported.name,
    typeOnly: specifier.exportKind === 'type',
  }));
  if (specs.length === 0) {
    return null;
  }

  const resolved = resolveRelativeLeafSpecifiers(
    barrelFile,
    fromFile,
    specs.map((s) => s.imported),
  );
  if (!resolved || specs.some((s) => !resolved.get(s.imported))) {
    return null;
  }

  const quote = getQuote(node);
  const isWholeTypeOnly = node.exportKind === 'type';
  const groups = groupBySpecifier(specs, resolved);

  const statements = [];
  for (const [target, groupSpecs] of groups) {
    const keyword = isWholeTypeOnly ? 'export type' : 'export';
    const parts = groupSpecs.map(({ imported, exported, typeOnly }) => {
      const prefix = !isWholeTypeOnly && typeOnly ? 'type ' : '';
      return imported === exported ? `${prefix}${imported}` : `${prefix}${imported} as ${exported}`;
    });
    statements.push(`${keyword} { ${parts.join(', ')} } from ${quote}${target}${quote};`);
  }

  return fixer.replaceText(node, statements.join('\n'));
}

const rule = createRule({
  name: 'no-cds-barrel-imports',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description:
        'Disallow importing from any barrel/index entry point of a CDS package the workspace depends on. Use deep subpath imports that resolve to a leaf module instead.',
      recommended: 'warn',
    },
    schema: [],
    messages: {
      noCdsRootBarrelImport:
        'Do not import from the root of "{{packageName}}". Use a deep subpath import (e.g. "{{packageName}}/<subpath>") that resolves to a leaf module instead.',
      noCdsSubpathBarrelImport:
        'Do not import from the barrel "{{packageName}}/{{subpath}}". Use a deeper subpath import that resolves to a leaf module instead.',
      noCdsRelativeBarrelImport:
        'Do not import from the barrel "{{specifier}}". Import directly from the leaf module file instead.',
    },
  },
  defaultOptions: [],
  create(context) {
    const filename = context.filename;

    // Barrel files legitimately roll up exports from other barrels. Flagging
    // barrel-to-barrel re-exports would break that pattern, so skip entirely
    // when the source file is itself a barrel (index.*).
    if (BARREL_TARGET_PATTERN.test(filename)) {
      return {};
    }

    const fromDir = path.dirname(filename);
    const forbidden = getForbiddenImportsForFile(filename);
    const hasForbidden = forbidden && forbidden.size > 0;

    function checkPackageBarrel(node, sourceValue, buildFix) {
      if (!hasForbidden) {
        return;
      }
      const match = findBarrelMatch(sourceValue, forbidden);
      if (!match) {
        return;
      }
      const fix = buildFix ? (fixer) => buildFix(node, match, fromDir, fixer) : undefined;
      if (match.subpath === '') {
        context.report({
          node,
          messageId: 'noCdsRootBarrelImport',
          data: { packageName: match.packageName },
          fix,
        });
      } else {
        context.report({
          node,
          messageId: 'noCdsSubpathBarrelImport',
          data: { packageName: match.packageName, subpath: match.subpath },
          fix,
        });
      }
    }

    function checkRelativeBarrel(node, sourceValue, buildFix) {
      const barrelFile = resolveRelativeBarrel(filename, sourceValue);
      if (!barrelFile) {
        return;
      }
      const fix = buildFix ? (fixer) => buildFix(node, barrelFile, filename, fixer) : undefined;
      context.report({
        node,
        messageId: 'noCdsRelativeBarrelImport',
        data: { specifier: sourceValue },
        fix,
      });
    }

    function check(node, sourceValue, buildPackageFix, buildRelativeFix) {
      checkPackageBarrel(node, sourceValue, buildPackageFix);
      checkRelativeBarrel(node, sourceValue, buildRelativeFix);
    }

    return {
      ImportDeclaration(node) {
        check(node, node.source.value, buildImportFix, buildRelativeImportFix);
      },
      ExportAllDeclaration(node) {
        check(node, node.source.value);
      },
      ExportNamedDeclaration(node) {
        if (node.source) {
          check(node, node.source.value, buildExportFix, buildRelativeExportFix);
        }
      },
      ImportExpression(node) {
        if (node.source.type === 'Literal') {
          check(node, node.source.value);
        }
      },
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'require' &&
          node.arguments.length === 1 &&
          node.arguments[0].type === 'Literal'
        ) {
          check(node, node.arguments[0].value);
        }
      },
    };
  },
});

export default rule;
