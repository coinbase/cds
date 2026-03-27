#!/usr/bin/env node

/**
 * Scaffolds a new ESLint rule with a matching test file.
 *
 * Usage:
 *   yarn node packages/eslint-plugin-cds/scripts/scaffold-new-rule.mjs <rule-name>
 *
 * Example:
 *   yarn node packages/eslint-plugin-cds/scripts/scaffold-new-rule.mjs no-deprecated-tokens
 *
 * This will create:
 *   - src/rules/no-deprecated-tokens.ts
 *   - tests/no-deprecated-tokens.test.ts
 *   - An import + registration entry in src/rules.ts
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(__dirname, '..');

function toCamelCase(kebab) {
  return kebab.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function createRule(ruleName) {
  if (!ruleName) {
    console.error('Usage: create-rule.mjs <rule-name>');
    console.error('Example: create-rule.mjs no-deprecated-tokens');
    process.exit(1);
  }

  if (!/^[a-z][a-z0-9-]*$/.test(ruleName)) {
    console.error(
      `Invalid rule name "${ruleName}". Use lowercase kebab-case (e.g. "no-deprecated-tokens").`,
    );
    process.exit(1);
  }

  const exportName = toCamelCase(ruleName);
  const ruleFile = resolve(PACKAGE_ROOT, 'src', 'rules', `${ruleName}.ts`);
  const testFile = resolve(PACKAGE_ROOT, 'tests', `${ruleName}.test.ts`);
  const rulesRegistryFile = resolve(PACKAGE_ROOT, 'src', 'rules.ts');

  if (existsSync(ruleFile)) {
    console.error(`Rule file already exists: ${ruleFile}`);
    process.exit(1);
  }

  if (existsSync(testFile)) {
    console.error(`Test file already exists: ${testFile}`);
    process.exit(1);
  }

  const ruleContent = `import type { TSESLint } from '@typescript-eslint/utils';

type MessageIds = 'TODO_REPLACE_ME';

export const ${exportName}: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description: 'TODO: describe what this rule enforces',
    },
    messages: {
      TODO_REPLACE_ME: 'TODO: error message shown to the user',
    },
    schema: [],
  },
  create(context) {
    return {
      // TODO: add AST visitor methods
      // See https://astexplorer.net/ (set parser to @typescript-eslint/parser)
    };
  },
};
`;

  const testContent = `import { RuleTester } from '@typescript-eslint/rule-tester';

import { ${exportName} } from '../src/rules/${ruleName}';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

// @ts-expect-error - not sure why the rule type is not matching up with the rule tester
ruleTester.run('${ruleName}', ${exportName}, {
  valid: [
    // TODO: add valid test cases
  ],
  invalid: [
    // TODO: add invalid test cases
  ],
});
`;

  writeFileSync(ruleFile, ruleContent);
  console.log(`Created rule:  src/rules/${ruleName}.ts`);

  writeFileSync(testFile, testContent);
  console.log(`Created test:  tests/${ruleName}.test.ts`);

  const registryContent = readFileSync(rulesRegistryFile, 'utf-8');

  const importLine = `import { ${exportName} } from './rules/${ruleName}';`;
  const registryEntry = `  '${ruleName}': ${exportName},`;

  const lastImportIndex = registryContent.lastIndexOf('import ');
  const endOfLastImport = registryContent.indexOf('\n', lastImportIndex);
  const withImport =
    registryContent.slice(0, endOfLastImport + 1) +
    importLine +
    '\n' +
    registryContent.slice(endOfLastImport + 1);

  const closingBrace = withImport.lastIndexOf('} as const');
  const withEntry =
    withImport.slice(0, closingBrace) + registryEntry + '\n' + withImport.slice(closingBrace);

  writeFileSync(rulesRegistryFile, withEntry);
  console.log(`Registered in: src/rules.ts`);

  console.log(`
Next steps:
  1. Implement your rule logic in src/rules/${ruleName}.ts
  2. Write test cases in tests/${ruleName}.test.ts
  3. Add the rule to the appropriate config in src/configs/
  4. Document the rule in README.md
  5. Run: yarn nx run eslint-plugin-cds:test`);
}

createRule(process.argv[2]);
