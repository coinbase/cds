/// <reference types='react-native-gesture-handler/jestSetup' />

/**
 * Custom accessibility matcher type declaration.
 * Replaces the react-native-accessibility-engine types.
 */

type AccessibilityViolation = {
  pathToComponent: string[];
  problem: string;
  solution: string;
  link: string;
};

type AccessibilityOptions = {
  /** Specific rule IDs to check. If not provided, all rules are checked. */
  rules?: string[];
  /** Custom handler to filter or modify violations before the assertion. */
  customViolationHandler?: (violations: AccessibilityViolation[]) => AccessibilityViolation[];
};

type AccessibilityMatchers<R> = {
  /**
   * Check if a component is accessible according to React Native accessibility rules.
   *
   * @param options - Optional configuration for accessibility checks
   * @example
   * expect(screen.getByTestId('my-button')).toBeAccessible();
   * expect(screen.getByTestId('my-button')).toBeAccessible({
   *   customViolationHandler: (violations) => violations.filter(v => v.problem !== 'some problem')
   * });
   */
  toBeAccessible(options?: AccessibilityOptions): R;
};

// Implicit Jest global `expect`.
declare global {
  namespace jest {
    // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-empty-object-type
    interface Matchers<R, T = object> extends AccessibilityMatchers<R> {}
  }
}

// Explicit `@jest/globals` `expect` matchers.
declare module '@jest/expect' {
  // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-empty-object-type
  interface Matchers<R extends void | Promise<void>> extends AccessibilityMatchers<R> {}
}

export {};
