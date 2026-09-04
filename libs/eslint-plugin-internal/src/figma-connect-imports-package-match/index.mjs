import fs from 'fs';
import path from 'path';

import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => null);

/**
 * Rule: figma-connect-imports-package-match
 *
 * Ensures that import paths in figma.connect() match the package context.
 */
const rule = createRule({
  name: 'figma-connect-imports-package-match',
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure figma.connect() import paths match the package context',
      recommended: 'error',
    },
    schema: [],
    messages: {
      packageMismatch:
        'Import path "{{ importPath }}" does not match package "{{ expectedPackage }}". Expected imports from "{{ expectedPackage }}".',
    },
  },
  defaultOptions: [],
  create(context) {
    // Allowed packages that can be imported from any context
    const allowedSharedPackages = ['@coinbase/cds-common'];

    /**
     * Finds the nearest package.json and returns its "name" field
     * @param {string} filePath - The path to start searching from
     * @returns {string|null} The package name or null if not found
     */
    function findPackageName(filePath) {
      let currentDir = path.dirname(filePath);
      const root = path.parse(currentDir).root;

      while (currentDir !== root) {
        const packageJsonPath = path.join(currentDir, 'package.json');
        try {
          if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            if (packageJson.name) {
              return packageJson.name;
            }
          }
        } catch {
          // Continue searching up the tree
        }
        currentDir = path.dirname(currentDir);
      }

      return null;
    }

    /**
     * Extracts the package name from an import path string
     * e.g., "import { Button } from '@coinbase/cds-web/buttons/Button';" -> "@coinbase/cds-web"
     * @param {string} importStatement - The full import statement string
     * @returns {string|null} The package name or null if not parseable
     */
    function extractPackageFromImport(importStatement) {
      // Match import paths like '@scope/package' or '@scope/package/...'
      const match = importStatement.match(/from\s+['"](@[^/]+\/[^/'"\s]+)/);
      if (match) {
        return match[1];
      }
      return null;
    }

    /**
     * Checks if a node is a figma.connect() call expression
     * @param {Object} node - The CallExpression node
     * @returns {boolean}
     */
    function isFigmaConnectCall(node) {
      const callee = node.callee;
      return (
        callee.type === 'MemberExpression' &&
        callee.object.type === 'Identifier' &&
        callee.object.name === 'figma' &&
        callee.property.type === 'Identifier' &&
        callee.property.name === 'connect'
      );
    }

    /**
     * Finds the imports property in a config object
     * @param {Object} configNode - The ObjectExpression node
     * @returns {Object|null} The imports property node if found
     */
    function findImportsProperty(configNode) {
      if (configNode.type !== 'ObjectExpression') {
        return null;
      }

      return configNode.properties.find(
        (prop) =>
          prop.type === 'Property' && prop.key.type === 'Identifier' && prop.key.name === 'imports',
      );
    }

    return {
      CallExpression(node) {
        if (!isFigmaConnectCall(node)) {
          return;
        }

        const filename = context.filename ?? context.getFilename?.();
        const expectedPackage = findPackageName(filename);

        if (!expectedPackage) {
          // Cannot determine package context, skip validation
          return;
        }

        // figma.connect takes 3 arguments: Component, URL, config
        const configArg = node.arguments[2];
        if (!configArg || configArg.type !== 'ObjectExpression') {
          return;
        }

        const importsProperty = findImportsProperty(configArg);
        if (!importsProperty) {
          return;
        }

        const importsValue = importsProperty.value;
        if (importsValue.type !== 'ArrayExpression') {
          return;
        }

        // Check each import string
        for (const element of importsValue.elements) {
          if (!element || element.type !== 'Literal' || typeof element.value !== 'string') {
            continue;
          }

          const importStatement = element.value;
          const importedPackage = extractPackageFromImport(importStatement);

          if (!importedPackage) {
            // Cannot parse import path, skip
            continue;
          }

          // Allow shared packages from any context
          if (allowedSharedPackages.includes(importedPackage)) {
            continue;
          }

          // Check if imported package matches expected package
          if (importedPackage !== expectedPackage) {
            context.report({
              node: element,
              messageId: 'packageMismatch',
              data: {
                importPath: importedPackage,
                expectedPackage,
              },
            });
          }
        }
      },
    };
  },
});

export default rule;
