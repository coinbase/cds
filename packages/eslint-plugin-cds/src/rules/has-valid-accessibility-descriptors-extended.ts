/**
 * For Mobile.
 * ESLint rule for has-valid-accessibility-descriptors with extended CDS specific component targeting.
 * Checks for the presence of an `accessibilityLabel` on designated Mobile CDS components.
 * The rule does not flag components:
 * - they contain inner text or
 * - have props spread.
 */

import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

import { extractA11yAttributesState } from '../utils/extractA11yAttributesState';
import { getSimpleNameFromJSX } from '../utils/getSimpleNameFromJSX';

const ruleCreator = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/coinbase/cds/blob/master/packages/eslint-plugin-cds/README.md#${name}`,
);

type MessageIds =
  | 'missingAccessibilityLabel'
  | 'missingAccessibilityLabelSuggestion'
  | 'missingAccessibleName'
  | 'missingAccessibilityHint'
  | 'missingHiddenSelectedOptionsLabel'
  | 'missingHandleBarAccessibilityLabel'
  | 'missingHelperTextErrorIconAccessibilityLabel'
  | 'missingCalendarOpenCloseAccessibilityLabels'
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
    'StickyFooter',
    'ProgressBar',
    'Select',
    'NavigationBar',
    'Sidebar',
    'Popover',
    'SegmentedTabs',
  ],
  checkForInteractiveAccessibilityLabelProps: ['Chip', 'MediaChip', 'ListCell'],
  checkForComboboxAccessibilityLabelProps: ['Combobox'],
  checkForComboboxMultiSelectionAccessibilityLabelProps: ['Combobox'],
  checkForComboboxAccessibilityHintProps: ['Combobox'],
  checkForAccessibleNameProps: ['Tray'],
  checkForMissingHandleBarAccessibilityLabel: ['Drawer', 'SelectChip', 'Tray'],
  checkForHelperTextErrorIconAccessibilityLabelProps: ['TextInput'],
  checkForCalendarOpenCloseAccessibilityLabelProps: ['DatePicker'],
  checkForCardDismissAccessibilityLabelProps: ['NudgeCard', 'UpsellCard'],
  checkForSearchInputAccessibilityLabelProps: ['SearchInput'],

  allowedPackages: [
    '@coinbase/cds-common',
    '@coinbase/cds-mobile',
    '@coinbase/cds-mobile-visualization',
  ],
};

export const hasValidA11yDescriptorsExtended = ruleCreator({
  name: 'has-valid-accessibility-descriptors-extended',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Checks for the presence of accessibilityLabel on Web CDS components. Will not flag it component has text content inside the element.',
    },
    messages: {
      missingAccessibilityLabel: `Missing 'accessibilityLabel' on <{{componentName}}>.`,
      missingAccessibilityLabelSuggestion: `Add missing accessibility label`,
      missingAccessibleName: `Missing an accessible name on <{{componentName}}>. Add 'accessibilityLabel' or 'accessibilityLabelledBy'.`,
      missingAccessibilityHint: `Missing 'accessibilityHint' on <{{componentName}}>.`,
      missingHiddenSelectedOptionsLabel: `Missing 'hiddenSelectedOptionsLabel' on <{{componentName}}> when type='multi'.`,
      missingHandleBarAccessibilityLabel: `Missing 'handleBarAccessibilityLabel' on <{{componentName}}>.`,
      missingHelperTextErrorIconAccessibilityLabel: `Missing 'helperTextErrorIconAccessibilityLabel' on <{{componentName}}>.`,
      missingCalendarOpenCloseAccessibilityLabels: `Missing calendar open/close accessibility label on <{{componentName}}>. Provide both 'openCalendarAccessibilityLabel' and 'closeCalendarAccessibilityLabel' (or deprecated 'calendarIconButtonAccessibilityLabel').`,
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
          hasAccessibilityLabelledBy,
          hasHiddenSelectedOptionsLabel,
          hasAccessibilityHint,
          hasSpreadProps,
          componentName,
          hasInnerText,
          hasHandleBarAccessibilityLabelProps,
          hasHelperTextErrorIconAccessibilityLabel,
          hasOpenCalendarAccessibilityLabel,
          hasCloseCalendarAccessibilityLabel,
          hasDeprecatedCalendarIconButtonAccessibilityLabel,
          hasOnDismissPressProp,
          hasOnClickProp,
          hasOnPressProp,
          hasMissingStartIconAccessibilityLabel,
          hasMissingClearIconAccessibilityLabel,
        } = extractA11yAttributesState(node, node.openingElement);

        // TODO need test cases for TextInput
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
          // Not a TextInput
          isTextInputWithNegativeVariant = false;
        }

        let isComboboxWithMultiType = false;
        if (getSimpleNameFromJSX(node.openingElement) === 'Combobox') {
          const attributes = node.openingElement.attributes as TSESTree.JSXAttribute[];
          const typeAttribute = attributes.find((attr) => attr.name?.name === 'type');
          if (typeAttribute) {
            const typeValue = typeAttribute.value;
            if (typeValue && typeValue.type === AST_NODE_TYPES.Literal) {
              isComboboxWithMultiType = typeValue.value === 'multi';
            }
          }
        }

        const conditionalChecks: ConditionalCheckType[] = [
          {
            configArray: config.componentsRequiringAccessibilityLabel,
            condition:
              !hasAccessibilityLabel &&
              !hasAccessibilityLabelledBy &&
              !(hasSpreadProps || hasInnerText || hasLabel),
            messageId: 'missingAccessibilityLabel',
            suggestedPropToAdd: 'accessibilityLabel',
          },
          {
            configArray: config.checkForInteractiveAccessibilityLabelProps,
            condition:
              (hasOnClickProp || hasOnPressProp) &&
              !hasAccessibilityLabel &&
              !hasAccessibilityLabelledBy,
            messageId: 'missingAccessibilityLabel',
            suggestedPropToAdd: 'accessibilityLabel',
          },
          {
            configArray: config.checkForComboboxAccessibilityLabelProps,
            condition: !hasAccessibilityLabel && !hasAccessibilityLabelledBy,
            messageId: 'missingAccessibleName',
            suggestedPropToAdd: 'accessibilityLabel',
          },
          {
            configArray: config.checkForComboboxAccessibilityHintProps,
            condition: !hasAccessibilityHint,
            messageId: 'missingAccessibilityHint',
            suggestedPropToAdd: 'accessibilityHint',
          },
          {
            configArray: config.checkForComboboxMultiSelectionAccessibilityLabelProps,
            condition: isComboboxWithMultiType && !hasHiddenSelectedOptionsLabel,
            messageId: 'missingHiddenSelectedOptionsLabel',
            suggestedPropToAdd: 'hiddenSelectedOptionsLabel',
          },
          {
            configArray: config.checkForAccessibleNameProps,
            condition: !hasAccessibilityLabel && !hasAccessibilityLabelledBy,
            messageId: 'missingAccessibleName',
          },
          {
            configArray: config.checkForMissingHandleBarAccessibilityLabel,
            condition: !hasHandleBarAccessibilityLabelProps,
            messageId: 'missingHandleBarAccessibilityLabel',
          },
          {
            configArray: config.checkForHelperTextErrorIconAccessibilityLabelProps,
            condition: !hasHelperTextErrorIconAccessibilityLabel && isTextInputWithNegativeVariant,
            messageId: 'missingHelperTextErrorIconAccessibilityLabel',
            suggestedPropToAdd: 'helperTextErrorIconAccessibilityLabel',
          },
          {
            configArray: config.checkForCalendarOpenCloseAccessibilityLabelProps,
            condition: !(
              (hasOpenCalendarAccessibilityLabel && hasCloseCalendarAccessibilityLabel) ||
              hasDeprecatedCalendarIconButtonAccessibilityLabel
            ),
            messageId: 'missingCalendarOpenCloseAccessibilityLabels',
          },
          {
            // Check for presence of onDismissPress prop and absence of accessibilityLabel
            // Applicable for NudgeCard and UpsellCard where the accessibilityLabel is conditionally rendered
            configArray: config.checkForCardDismissAccessibilityLabelProps,
            condition: !hasAccessibilityLabel && hasOnDismissPressProp,
            messageId: 'missingCardDismissAccessibilityLabel',
          },
          {
            configArray: config.checkForSearchInputAccessibilityLabelProps,
            condition: !hasMissingStartIconAccessibilityLabel,
            messageId: 'missingStartIconAccessibilityLabel',
          },
          {
            configArray: config.checkForSearchInputAccessibilityLabelProps,
            condition: !hasMissingClearIconAccessibilityLabel,
            messageId: 'missingClearIconAccessibilityLabel',
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
