/**
 * For Web.
 * ESLint rule for control-has-associated-label with extended CDS specific component targeting.
 * Checks for the presence of an `accessibilityLabel` on designated Web CDS components.
 * It enforces that components listed under `componentsRequiringAccessibilityLabel` have an `accessibilityLabel`
 * attribute unless
 * - they contain inner text or
 * - have props spread.
 *
 * For components listed under `collapsibleCheckForControlledElementAccessibilityProps` and `dropdownCheckForControlledElementAccessibilityProps`, this rule
 * ensures that `controlledElementAccessibilityProps` are provided.
 */

import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';

import { extractA11yAttributesState } from '../utils/extractA11yAttributesState';
import { getSimpleNameFromJSX } from '../utils/getSimpleNameFromJSX';

const ruleCreator = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/coinbase/cds/blob/master/packages/eslint-plugin-cds/README.md#${name}`,
);

type MessageIds =
  | 'missingAccessibilityLabel'
  | 'missingAccessibilityLabelSuggestion'
  | 'missingControlledElementAccessibilityProps'
  | 'missingControlledElementAccessibilityPropsDropdown'
  | 'missingHelperTextErrorIconAccessibilityLabel'
  | 'missingCalendarIconButtonAccessibilityLabel'
  | 'missingNextArrowAccessibilityLabel'
  | 'missingPreviousArrowAccessibilityLabel'
  | 'missingCardDismissAccessibilityLabel'
  | 'missingStartIconAccessibilityLabel'
  | 'missingClearIconAccessibilityLabel';

type ConditionalCheckType = {
  configArray: string[];
  condition: boolean;
  messageId: MessageIds;
  suggestedPropToAdd?: string;
};

const config = {
  componentsRequiringAccessibilityLabel: [
    'Button',
    'Checkbox',
    'InputChip',
    'IconButton',
    'IconCounterButton',
    'Pressable',
    'Switch',
    'TextInput',
    'FeedCard',
    'ProgressBar',
    'Select',
    'NavigationBar',
    'Sidebar',
    'Popover',
  ],
  collapsibleCheckForControlledElementAccessibilityProps: ['Collapsible'],
  dropdownCheckForControlledElementAccessibilityProps: ['Dropdown'],
  checkForHelperTextErrorIconAccessibilityLabelProps: ['TextInput', 'SelectStack'],
  checkForCalendarIconButtonAccessibilityLabelProps: ['DatePicker'],
  checkForArrowAccessibilityProps: ['DatePicker', 'Calendar', 'TabNavigation'],
  checkForCardDismissAccessibilityLabelProps: ['NudgeCard', 'UpsellCard'],
  checkForSearchInputAccessibilityLabelProps: ['SearchInput'],

  allowedPackages: ['@coinbase/cds-common', '@coinbase/cds-web', '@coinbase/cds-web-visualization'],
};

export const controlHasAssociatedLabelExtended = ruleCreator({
  name: 'control-has-associated-label-extended',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Checks for the presence of accessibilityLabel on Mobile CDS components. Will not flag it component has text content inside the element.',
    },
    messages: {
      missingAccessibilityLabel: `Missing 'accessibilityLabel' on <{{componentName}}>.`,
      missingAccessibilityLabelSuggestion: `Add missing accessibility label`,
      missingControlledElementAccessibilityProps: `Missing 'controlledElementAccessibilityProps' on <{{componentName}}>. More info: https://cds.coinbase.com/components/collapsible#[object%20Object],Accessibility%20tip%20(web)`,
      missingControlledElementAccessibilityPropsDropdown: `Missing 'controlledElementAccessibilityProps' on <{{componentName}}>. More info: https://cds.coinbase.com/components/dropdown#page=implementation`,
      missingHelperTextErrorIconAccessibilityLabel: `Missing 'helperTextErrorIconAccessibilityLabel' on <{{componentName}}>.`,
      missingCalendarIconButtonAccessibilityLabel: `Missing 'calendarIconButtonAccessibilityLabel' on <{{componentName}}>.`,
      missingNextArrowAccessibilityLabel: `Missing 'nextArrowAccessibilityLabel' on <{{componentName}}>.`,
      missingPreviousArrowAccessibilityLabel: `Missing 'previousArrowAccessibilityLabel' on <{{componentName}}>.`,
      missingCardDismissAccessibilityLabel: `Missing 'accessibilityLabel' on <{{componentName}}> for dismiss button.`,
      missingStartIconAccessibilityLabel: `Missing 'startIconAccessibilityLabel' on <{{componentName}}>.`,
      missingClearIconAccessibilityLabel: `Missing 'clearIconAccessibilityLabel' on <{{componentName}}>.`,
    },
    hasSuggestions: true,
    fixable: 'code',
    schema: [],
  },
  create(context) {
    const importedComponents: Record<string, string> = {};

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const packageName = node.source.value;

        if (
          typeof packageName === 'string' &&
          config.allowedPackages.some(
            (pkg) => packageName === pkg || packageName.startsWith(`${pkg}/`),
          )
        ) {
          node.specifiers.forEach((specifier) => {
            switch (specifier.type) {
              case 'ImportSpecifier':
              case 'ImportDefaultSpecifier':
              case 'ImportNamespaceSpecifier':
                importedComponents[specifier.local.name] = packageName;
                break;
              default:
                break;
            }
          });
        }
      },
      JSXElement(node) {
        const {
          hasLabel,
          hasAccessibilityLabel,
          hasControlledElementAccessibilityProps,
          hasSpreadProps,
          componentName,
          hasInnerText,
          hasHelperTextErrorIconAccessibilityLabel,
          hasCalendarIconButtonAccessibilityLabel,
          hasMissingNextArrowAccessibilityLabel,
          hasMissingPreviousArrowAccessibilityLabel,
          hasOnDismissPressProp,
          hasMissingStartIconAccessibilityLabel,
          hasMissingClearIconAccessibilityLabel,
        } = extractA11yAttributesState(node, node.openingElement);

        let isTextInputWithNegativeVariant = true;
        if (getSimpleNameFromJSX(node.openingElement) === 'TextInput') {
          const attributes = node.openingElement.attributes as TSESTree.JSXAttribute[];
          const variantAttribute = attributes.find((attr) => attr.name?.name === 'variant');
          if (variantAttribute) {
            const variantValue = variantAttribute.value;
            if (variantValue && variantValue.type === AST_NODE_TYPES.Literal) {
              isTextInputWithNegativeVariant = variantValue.value === 'negative';
            }
          } else {
            // No variant attribute found
            isTextInputWithNegativeVariant = false;
          }
        } else {
          // Not a TextInput component
          isTextInputWithNegativeVariant = false;
        }

        const conditionalChecks: ConditionalCheckType[] = [
          {
            configArray: config.componentsRequiringAccessibilityLabel,
            condition: !hasAccessibilityLabel && !(hasSpreadProps || hasInnerText || hasLabel),
            messageId: 'missingAccessibilityLabel',
            suggestedPropToAdd: 'accessibilityLabel',
          },
          {
            configArray: config.dropdownCheckForControlledElementAccessibilityProps,
            condition: !hasControlledElementAccessibilityProps,
            messageId: 'missingControlledElementAccessibilityPropsDropdown',
          },
          {
            configArray: config.checkForHelperTextErrorIconAccessibilityLabelProps,
            condition: !hasHelperTextErrorIconAccessibilityLabel && isTextInputWithNegativeVariant,
            messageId: 'missingHelperTextErrorIconAccessibilityLabel',
            suggestedPropToAdd: 'helperTextErrorIconAccessibilityLabel',
          },
          {
            configArray: config.checkForCalendarIconButtonAccessibilityLabelProps,
            condition: !hasCalendarIconButtonAccessibilityLabel,
            messageId: 'missingCalendarIconButtonAccessibilityLabel',
            suggestedPropToAdd: 'calendarIconButtonAccessibilityLabel',
          },
          {
            configArray: config.checkForArrowAccessibilityProps,
            condition: !hasMissingNextArrowAccessibilityLabel,
            messageId: 'missingNextArrowAccessibilityLabel',
            suggestedPropToAdd: 'nextArrowAccessibilityLabel',
          },
          {
            configArray: config.checkForArrowAccessibilityProps,
            condition: !hasMissingPreviousArrowAccessibilityLabel,
            messageId: 'missingPreviousArrowAccessibilityLabel',
            suggestedPropToAdd: 'previousArrowAccessibilityLabel',
          },
          {
            // Check for presence of onDismissPress prop and absence of accessibilityLabel
            // Applicable for NudgeCard and UpsellCard where the accessibilityLabel is conditionally rendered
            configArray: config.checkForCardDismissAccessibilityLabelProps,
            condition: !hasAccessibilityLabel && hasOnDismissPressProp,
            messageId: 'missingCardDismissAccessibilityLabel',
            suggestedPropToAdd: 'accessibilityLabel',
          },
          {
            configArray: config.checkForSearchInputAccessibilityLabelProps,
            condition: !hasMissingStartIconAccessibilityLabel,
            messageId: 'missingStartIconAccessibilityLabel',
            suggestedPropToAdd: 'startIconAccessibilityLabel',
          },
          {
            configArray: config.checkForSearchInputAccessibilityLabelProps,
            condition: !hasMissingClearIconAccessibilityLabel,
            messageId: 'missingClearIconAccessibilityLabel',
            suggestedPropToAdd: 'clearIconAccessibilityLabel',
          },
        ];

        conditionalChecks.forEach(({ configArray, condition, messageId, suggestedPropToAdd }) => {
          if (
            importedComponents[componentName] &&
            configArray.includes(componentName) &&
            condition
          ) {
            context.report({
              node,
              messageId,
              data: { componentName },
              suggest: suggestedPropToAdd
                ? [
                    {
                      messageId: 'missingAccessibilityLabelSuggestion',
                      fix(fixer) {
                        return fixer.insertTextAfter(
                          node.openingElement.name,
                          ` ${suggestedPropToAdd}=""`,
                        );
                      },
                    },
                  ]
                : [],
            });
          }
        });
      },
    };
  },
});
