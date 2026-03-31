import type { Violation } from 'react-native-accessibility-engine';

/**
 * `toBeAccessible()` options that drop the "disabled not exposed" engine violation when
 * `Interactable` uses `disabled` for visuals only—the wrapping `Pressable` already exposes
 * `accessibilityState.disabled`.
 */
export const toBeAccessibleIgnoreEngineDisabledOptions = {
  customViolationHandler: (violations: Violation[]) =>
    violations.filter(
      (v) => v.problem !== "This component has a disabled state but it isn't exposed to the user",
    ),
};
