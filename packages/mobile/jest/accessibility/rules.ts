/**
 * Accessibility rules for React Native components.
 * Each rule has:
 * - id: Unique identifier for the rule
 * - matcher: Function that determines if a component should be checked
 * - assertion: Function that returns true if the component passes the rule
 * - help: Object with problem description and solution
 */
import {
  canBeDisabled,
  findTextNode,
  isAdjustable,
  isCheckbox,
  isPressable,
  isText,
} from './helpers';
import type { TestInstance } from './types';

export type RuleHelp = {
  problem: string;
  solution: string;
  link: string;
};

export type Rule = {
  id: string;
  matcher: (node: TestInstance) => boolean;
  assertion: (node: TestInstance) => boolean;
  help: RuleHelp;
};

const ALLOWED_PRESSABLE_ROLES = [
  'button',
  'link',
  'imagebutton',
  'radio',
  'tab',
  'checkbox',
  'switch',
];
const ALLOWED_PRESSABLE_ROLES_MESSAGE = ALLOWED_PRESSABLE_ROLES.join(' or ');

const ALLOWED_CHECKED_VALUES = [true, false, 'mixed'];
const ALLOWED_CHECKED_VALUES_MESSAGE = ALLOWED_CHECKED_VALUES.join(' or ');

/**
 * Pressable components must have an accessibility role.
 */
const pressableRoleRequired: Rule = {
  id: 'pressable-role-required',
  matcher: (node) => isPressable(node),
  assertion: (node) => ALLOWED_PRESSABLE_ROLES.includes(node.props.accessibilityRole),
  help: {
    problem:
      "This component is pressable but the user hasn't been informed that it behaves like a button/link/radio",
    solution: `Set the 'accessibilityRole' prop to ${ALLOWED_PRESSABLE_ROLES_MESSAGE}`,
    link: '',
  },
};

/**
 * Pressable components must be accessible (not have accessible=false).
 */
const pressableAccessibleRequired: Rule = {
  id: 'pressable-accessible-required',
  matcher: (node) => isPressable(node),
  assertion: (node) => node.props.accessible !== false,
  help: {
    problem: 'This button is not accessible (selectable) to the user',
    solution:
      "Set the 'accessible' prop to 'true' or remove it (pressables are accessible by default)",
    link: '',
  },
};

/**
 * Pressable components must have a label (either from text content or accessibilityLabel).
 */
const pressableLabelRequired: Rule = {
  id: 'pressable-label-required',
  matcher: (node) => isPressable(node),
  assertion: (node) => {
    const textNode = findTextNode(node);
    const textContent = textNode?.props?.children;
    const accessibilityLabel = node.props.accessibilityLabel;

    if (!accessibilityLabel && !textContent) {
      return false;
    }
    return true;
  },
  help: {
    problem:
      "This pressable has no text content, so an accessibility label can't be automatically inferred",
    solution: "Place a text component in the button or define an 'accessibilityLabel' prop",
    link: '',
  },
};

/**
 * Components with disabled/enabled props must expose disabled state.
 */
const disabledStateRequired: Rule = {
  id: 'disabled-state-required',
  matcher: (node) => canBeDisabled(node),
  assertion: (node) => node.props.accessibilityState?.disabled !== undefined,
  help: {
    problem: "This component has a disabled state but it isn't exposed to the user",
    solution: "Set the 'accessibilityState' prop to an object containing a boolean 'disabled' key",
    link: '',
  },
};

/**
 * Checkbox components must have a checked state.
 */
const checkedStateRequired: Rule = {
  id: 'checked-state-required',
  matcher: (node) => isCheckbox(node),
  assertion: (node) => ALLOWED_CHECKED_VALUES.includes(node.props.accessibilityState?.checked),
  help: {
    problem:
      "This component has an accessibility role of 'checkbox' but doesn't have a checked state",
    solution: `Set the 'accessibilityState' prop to an object like this: { checked: ${ALLOWED_CHECKED_VALUES_MESSAGE} }`,
    link: 'https://www.w3.org/WAI/ARIA/apg/example-index/checkbox/checkbox.html',
  },
};

/**
 * Adjustable components (Slider) must have accessibilityRole="adjustable".
 */
const adjustableRoleRequired: Rule = {
  id: 'adjustable-role-required',
  matcher: (node) => isAdjustable(node),
  assertion: (node) => node.props.accessibilityRole === 'adjustable',
  help: {
    problem: "This component has an adjustable value but the user wasn't informed of this",
    solution: "Set the 'accessibilityRole' prop to 'adjustable'",
    link: '',
  },
};

/**
 * Adjustable components must have accessibilityValue with min, max, and now.
 */
const adjustableValueRequired: Rule = {
  id: 'adjustable-value-required',
  matcher: (node) => isAdjustable(node),
  assertion: (node) => {
    const value = node.props.accessibilityValue;
    return value?.now !== undefined && value?.min !== undefined && value?.max !== undefined;
  },
  help: {
    problem:
      "This component has an adjustable value but the user wasn't informed of its min, max, and current value",
    solution: "Set the 'accessibilityValue' prop to an object: { min: ?, max: ?, now: ?}",
    link: '',
  },
};

/**
 * Clickable text must have accessibilityRole="link".
 */
const linkRoleRequired: Rule = {
  id: 'link-role-required',
  matcher: (node) => isText(node),
  assertion: (node) => {
    const { onPress, accessibilityRole } = node.props;
    if (onPress) {
      return accessibilityRole === 'link';
    }
    return true;
  },
  help: {
    problem: "The text is clickable, but the user wasn't informed that it behaves like a link",
    solution: "Set the 'accessibilityRole' prop to 'link' or remove the 'onPress' prop",
    link: '',
  },
};

/**
 * Non-clickable text should not have accessibilityRole="link".
 */
const linkRoleMisused: Rule = {
  id: 'link-role-misused',
  matcher: (node) => isText(node),
  assertion: (node) => {
    const { onPress, accessibilityRole } = node.props;
    if (!onPress) {
      return accessibilityRole !== 'link';
    }
    return true;
  },
  help: {
    problem: "The 'link' role has been used but the text isn't clickable",
    solution: "Set the 'accessibilityRole' prop to 'text' or add an 'onPress' prop",
    link: '',
  },
};

/**
 * Text components must have text content.
 */
const noEmptyText: Rule = {
  id: 'no-empty-text',
  matcher: (node) => isText(node),
  assertion: (node) => !!node.props?.children,
  help: {
    problem: "This text node doesn't contain text and so no accessibility label can be inferred",
    solution: 'Add text content or prevent this component from rendering if it has no content',
    link: '',
  },
};

/**
 * All accessibility rules in the order they should be applied.
 */
export const rules: Rule[] = [
  pressableRoleRequired,
  pressableAccessibleRequired,
  disabledStateRequired,
  checkedStateRequired,
  pressableLabelRequired,
  adjustableRoleRequired,
  adjustableValueRequired,
  linkRoleRequired,
  linkRoleMisused,
  noEmptyText,
];
