import type { API, ImportDeclaration } from 'jscodeshift';

export type EnsureImportSpecifiersOptions = {
  /**
   * `type` → TypeScript `import type { … } from '…'`.
   * `value` → `import { … } from '…'` (no `importKind` on the declaration).
   */
  importKind: 'type' | 'value';
};

/**
 * Ensures named imports from `modulePath` exist, merging into an existing import from that path or
 * prepending a new declaration. Returns whether the AST changed.
 *
 * Does not handle default/namespace specifiers or mixed type+value semantics on one declaration;
 * callers must avoid conflicting merges (e.g. adding value bindings to a `import type` line).
 */
export function ensureImportSpecifiers(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  modulePath: string,
  names: string[],
  options: EnsureImportSpecifiersOptions = { importKind: 'type' },
): boolean {
  const wantsTypeOnly = options.importKind === 'type';

  const existing = root.find(j.ImportDeclaration, { source: { value: modulePath } });

  if (existing.length === 0) {
    const specifiers = names.map((n) => j.importSpecifier(j.identifier(n), j.identifier(n)));
    const decl: ImportDeclaration = j.importDeclaration(specifiers, j.stringLiteral(modulePath));
    if (wantsTypeOnly) {
      decl.importKind = 'type';
    }
    root.get().value.program.body.unshift(decl);
    return true;
  }

  let anyMerged = false;
  existing.forEach((path) => {
    let pathMerged = false;
    const had = new Set<string>();
    for (const spec of path.value.specifiers ?? []) {
      if (j.ImportSpecifier.check(spec) && j.Identifier.check(spec.imported)) {
        had.add(spec.imported.name);
      }
    }
    for (const n of names) {
      if (!had.has(n)) {
        path.value.specifiers = path.value.specifiers ?? [];
        path.value.specifiers.push(j.importSpecifier(j.identifier(n), j.identifier(n)));
        had.add(n);
        pathMerged = true;
        anyMerged = true;
      }
    }
    if (pathMerged && wantsTypeOnly && path.value.importKind !== 'type') {
      path.value.importKind = 'type';
    }
  });

  return anyMerged;
}
