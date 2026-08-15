/**
 * Type definitions for the accessibility engine.
 *
 * These types are derived from @testing-library/react-native's exports
 * to avoid importing from the deprecated react-test-renderer package.
 */
import type { RenderResult } from '@testing-library/react-native';

/**
 * A node in the React test instance tree.
 * Derived from RNTL's RenderResult['root'] type.
 */
export type TestInstance = RenderResult['root'];

/**
 * The type of a React component in the test tree.
 */
export type ComponentType = TestInstance['type'];
