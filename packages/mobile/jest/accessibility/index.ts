/**
 * Custom accessibility testing module for React Native.
 * Replaces react-native-accessibility-engine with a React 19-compatible implementation.
 *
 * Usage:
 * Import this module in your Jest setup file to add the toBeAccessible() matcher.
 *
 * @example
 * // In jest/setup.js
 * import './accessibility';
 *
 * // In tests
 * expect(screen.getByTestId('my-button')).toBeAccessible();
 */
import { toBeAccessible } from './matchers';

// Extend Jest's expect with the toBeAccessible matcher
expect.extend({ toBeAccessible });

// Export for direct use if needed
export { toBeAccessible };
export type { EngineOptions, Violation } from './engine';
export { checkAccessibility } from './engine';
export type { Rule, RuleHelp } from './rules';
export { rules } from './rules';
