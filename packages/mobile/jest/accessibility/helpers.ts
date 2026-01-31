/**
 * Helper functions for accessibility rules.
 * These functions check component types and properties to determine which accessibility rules apply.
 */
import {
  Pressable,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import type { ComponentType, TestInstance } from './types';

// Components to exclude from component name extraction
const COMPONENT_NAME_BLACKLIST = ['String', 'Component', 'Object'];

// Pressable component type names for string matching
const PRESSABLE_TYPE_NAMES = [
  'TouchableHighlight',
  'TouchableOpacity',
  'TouchableNativeFeedback',
  'TouchableWithoutFeedback',
  'Pressable',
];

/**
 * Get the type name from a component type.
 * Handles both string types (host components) and function/class types (React components).
 */
function getTypeName(type: ComponentType): string {
  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return (type as { displayName?: string; name?: string }).displayName || type.name || '';
  }
  if (typeof type === 'object' && type !== null) {
    const objType = type as { displayName?: string; name?: string };
    return objType.displayName || objType.name || '';
  }
  return '';
}

/**
 * Check if a component type is a pressable element.
 * Includes TouchableHighlight, TouchableOpacity, TouchableNativeFeedback,
 * TouchableWithoutFeedback, and Pressable.
 */
export function isPressable(type: ComponentType): boolean {
  // Direct reference comparison for React component instances
  if (
    type === TouchableHighlight ||
    type === TouchableOpacity ||
    type === TouchableNativeFeedback ||
    type === TouchableWithoutFeedback ||
    type === Pressable
  ) {
    return true;
  }

  // String name comparison for host components or named types
  const typeName = getTypeName(type);
  return PRESSABLE_TYPE_NAMES.some((name) => typeName.includes(name));
}

/**
 * Check if a component type is a Text element.
 */
export function isText(type: ComponentType): boolean {
  // Direct reference comparison
  if (type === Text) {
    return true;
  }

  // String name comparison
  const typeName = getTypeName(type);
  return typeName === 'Text';
}

/**
 * Check if a node is an adjustable component (Slider).
 * Returns false for wrapper components that contain a Slider.
 */
export function isAdjustable(node: TestInstance): boolean {
  const slidersInTree = node.findAll((n) => n.type.toString().includes('Slider'));
  // If this node is a Slider BUT more than one slider is found in the tree
  // that has this node as root, it means that this node must be a SliderWrapper
  // for the actual Slider and should therefore be discarded.
  return node.type.toString().includes('Slider') && slidersInTree.length === 1;
}

/**
 * Check if a node is a checkbox (pressable with role="checkbox").
 */
export function isCheckbox(node: TestInstance): boolean {
  return isPressable(node.type) && node.props.accessibilityRole === 'checkbox';
}

/**
 * Check if a node is hidden from accessibility.
 */
export function isHidden(node: TestInstance): boolean {
  return (
    node.props.accessibilityElementsHidden === true ||
    node.props.importantForAccessibility === 'no-hide-descendants'
  );
}

/**
 * Check if a node can be disabled.
 * Returns false for wrapper components that contain disable-able components.
 */
export function canBeDisabled(node: TestInstance): boolean {
  const inTree = node.findAll(
    (n) => n.props.disabled !== undefined || n.props.enabled !== undefined,
  );
  // If this node can be disabled BUT more than one disable-able component
  // is found in the tree that has this node as root, it means that this node
  // must be a Wrapper for the actual disable-able component and should be discarded.
  return (
    (node.props.disabled !== undefined || node.props.enabled !== undefined) && inTree.length === 1
  );
}

/**
 * Extract the component name from a node's type.
 */
function extractNameFromType(component: TestInstance): string | undefined {
  const type = component.type as { displayName?: string; name?: string };

  if (type.displayName && !COMPONENT_NAME_BLACKLIST.includes(type.displayName)) {
    return type.displayName;
  }

  if (type.name && !COMPONENT_NAME_BLACKLIST.includes(type.name)) {
    return type.name;
  }

  return undefined;
}

/**
 * Get the display name of a component.
 * Handles wrapped components (Animated, Virtualized) by inspecting children.
 */
export function getComponentName(component: TestInstance): string {
  let name = extractNameFromType(component);

  if (!name && component.children.length > 0 && typeof component.children[0] !== 'string') {
    // Some components are wrapped in Animated or Virtualized nodes,
    // and the main component is the child, not the wrapper,
    // so we inspect the child component for name, not the parent.
    name = extractNameFromType(component.children[0] as TestInstance);
  }

  return name || 'Unknown';
}

/**
 * Get the path from root to the given component as an array of component names.
 */
export function getPathToComponent(node: TestInstance): string[] {
  const path: string[] = [];
  let current: TestInstance | null = node;

  while (current) {
    const type = current.type;

    // Skip string types and forward refs
    const shouldSkip =
      typeof type === 'string' ||
      (typeof type === 'object' &&
        type !== null &&
        (type as { $$typeof?: symbol }).$$typeof === Symbol.for('react.forward_ref'));

    if (!shouldSkip) {
      path.push(getComponentName(current));
    }

    current = current.parent;
  }

  return path.reverse();
}

/**
 * Find a Text node within a component tree.
 * Returns null if no Text node is found.
 */
export function findTextNode(node: TestInstance): TestInstance | null {
  try {
    return node.findByType(Text);
  } catch {
    return null;
  }
}
