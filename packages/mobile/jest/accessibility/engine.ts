/* eslint-disable no-restricted-syntax */
/**
 * Accessibility engine that checks React Native components for accessibility violations.
 * Works directly with test instances from @testing-library/react-native.
 */
import { getPathToComponent, isHidden } from './helpers';
import { type Rule, type RuleHelp, rules } from './rules';
import type { TestInstance } from './types';

export interface Violation extends RuleHelp {
  pathToComponent: string[];
}

export interface EngineOptions {
  /** Specific rule IDs to check. If not provided, all rules are checked. */
  rules?: string[];
  /** Custom handler to filter or modify violations before the assertion. */
  customViolationHandler?: (violations: Violation[]) => Violation[];
}

/**
 * Check a React test instance for accessibility violations.
 *
 * @param testInstance - The TestInstance to check (from RNTL's screen queries)
 * @param options - Optional configuration for which rules to run
 * @returns Array of violations found
 */
export function checkAccessibility(
  testInstance: TestInstance,
  options?: EngineOptions,
): Violation[] {
  // Filter rules if specific rule IDs are provided
  const rulesToCheck: Rule[] = options?.rules
    ? rules.filter((rule) => options.rules?.includes(rule.id))
    : rules;

  const violations: Violation[] = [];

  // For every rule
  for (const rule of rulesToCheck) {
    // Traverse the component tree below the root to find components that should be tested
    const matchedComponents = testInstance.findAll(rule.matcher, { deep: true });

    // Check if the root of the tree should be tested as well
    if (rule.matcher(testInstance)) {
      matchedComponents.push(testInstance);
    }

    // For all the components that were found
    for (const component of matchedComponents) {
      let didPassAssertion = false;

      if (isHidden(component)) {
        // Skip checks on hidden components
        didPassAssertion = true;
      } else {
        // Check if the component meets the rule's assertion
        didPassAssertion = rule.assertion(component);
      }

      // If not, add component to violation array
      if (!didPassAssertion) {
        violations.push({
          pathToComponent: getPathToComponent(component),
          ...rule.help,
        });
      }
    }
  }

  return violations;
}
