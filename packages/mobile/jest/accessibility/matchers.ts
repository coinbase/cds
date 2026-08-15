/**
 * Custom Jest matchers for accessibility testing.
 */
import { getLabelPrinter, matcherHint, printExpected, printReceived } from 'jest-matcher-utils';

import { checkAccessibility, type EngineOptions, type Violation } from './engine';
import type { TestInstance } from './types';

const LABEL_PROBLEM = 'Problem';
const LABEL_SOLUTION = 'Solution';

/**
 * Group violations by their path to component.
 */
function groupViolationsByPath(violations: Violation[]): Record<string, Violation[]> {
  const grouped: Record<string, Violation[]> = {};
  for (const violation of violations) {
    const key = violation.pathToComponent.join(',');
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(violation);
  }
  return grouped;
}

/**
 * Generate a formatted error message for accessibility violations.
 */
function generateErrorMessage(violations: Violation[], isNot: boolean): string {
  let errorString = '';
  const matcherName = (isNot ? '.not' : '') + '.toBeAccessible';
  const hint = matcherHint(matcherName, 'component', '') + '\n\n';
  errorString += hint;

  const printLabel = getLabelPrinter(LABEL_PROBLEM, LABEL_SOLUTION);
  const violationsGroupedByPath = groupViolationsByPath(violations);

  for (const path in violationsGroupedByPath) {
    // Prettify path to component
    errorString += path.split(',').join(' > ') + '\n\n';

    for (const violation of violationsGroupedByPath[path]) {
      const violationString =
        printLabel(LABEL_PROBLEM) +
        printReceived(violation.problem) +
        '\n' +
        printLabel(LABEL_SOLUTION) +
        printExpected(violation.solution) +
        '\n\n';
      errorString += violationString;
    }
  }

  return errorString;
}

/**
 * Jest matcher to check if a component is accessible.
 *
 * @example
 * expect(screen.getByTestId('my-button')).toBeAccessible();
 */
export function toBeAccessible(
  this: jest.MatcherContext,
  received: TestInstance,
  options?: EngineOptions,
): jest.CustomMatcherResult {
  let violations = checkAccessibility(received, options);

  // Apply custom violation handler if provided
  if (options?.customViolationHandler) {
    violations = options.customViolationHandler(violations);
  }

  if (violations.length) {
    const message = generateErrorMessage(violations, this.isNot);
    return {
      pass: false,
      message: () => message,
    };
  }

  return {
    pass: true,
    message: () =>
      'Component is accessible.\nDoes it make sense to test a component for NOT being accessible?',
  };
}
