import React from 'react';
import { useModalContext } from '@coinbase/cds-common/overlays/ModalContext';
import { interactableHeight } from '@coinbase/cds-common/tokens/interactableHeight';
import type {
  SharedAccessibilityProps,
  SharedProps,
  ValidateProps,
} from '@coinbase/cds-common/types';

import { IconButton } from '../../buttons/IconButton';
import { Box, type BoxDefaultElement, type BoxProps } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { Text } from '../../typography/Text';

export type ModalHeaderBaseProps = {
  /** Handles back button press */
  onBackButtonClick?: React.MouseEventHandler;
  /** Title of the Modal */
  title?: string;
  /**
   * Sets an accessible label for the back button.
   * On web, maps to `aria-label` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  backAccessibilityLabel?: SharedAccessibilityProps['accessibilityLabel'];
  /**
   * Sets an accessible hint or description for the back button.
   * On web, maps to `aria-describedby` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  backAccessibilityHint?: SharedAccessibilityProps['accessibilityHint'];
  /**
   * Sets an accessible label for the close button.
   * On web, maps to `aria-label` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  closeAccessibilityLabel?: SharedAccessibilityProps['accessibilityLabel'];
  /**
   * Sets an accessible hint or description for the close button.
   * On web, maps to `aria-describedby` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  closeAccessibilityHint?: SharedAccessibilityProps['accessibilityHint'];
} & SharedProps;

export type ModalHeaderProps = ModalHeaderBaseProps & BoxProps<BoxDefaultElement>;

export const ModalHeader = ({
  alignItems = 'center',
  paddingX = 3,
  paddingY = 2,
  title,
  onBackButtonClick,
  backAccessibilityLabel,
  backAccessibilityHint,
  closeAccessibilityLabel,
  closeAccessibilityHint,
  ...props
}: ModalHeaderProps) => {
  const { onRequestClose, accessibilityLabelledBy, hideCloseButton, hideDividers } =
    useModalContext();

  if (!title && !onBackButtonClick && !onRequestClose) return null;

  // use empty placeholder which has the same size as IconButton to maintain horizontal position
  const emptyPlaceholder = (
    <Box height={interactableHeight.compact} width={interactableHeight.compact} />
  );

  return (
    <HStack
      alignItems={alignItems}
      borderedBottom={!hideDividers}
      paddingX={paddingX}
      paddingY={paddingY}
      {...(props satisfies ValidateProps<
        typeof props,
        Omit<ModalHeaderProps, keyof BoxProps<BoxDefaultElement>>
      >)}
    >
      {onBackButtonClick ? (
        <Box>
          <IconButton
            transparent
            accessibilityHint={backAccessibilityHint}
            accessibilityLabel={backAccessibilityLabel}
            name="backArrow"
            onClick={onBackButtonClick}
            testID="modal-back-button"
          />
        </Box>
      ) : (
        emptyPlaceholder
      )}
      <Box alignItems="center" flexGrow={1} justifyContent="center" paddingX={2}>
        {title && (
          <Text
            as="h2"
            display="block"
            font="headline"
            id={accessibilityLabelledBy}
            textAlign="center"
          >
            {title}
          </Text>
        )}
      </Box>
      {!hideCloseButton && (
        <Box justifyContent="flex-end">
          <IconButton
            transparent
            accessibilityHint={closeAccessibilityHint}
            accessibilityLabel={closeAccessibilityLabel}
            name="close"
            onClick={onRequestClose}
            testID="modal-close-button"
          />
        </Box>
      )}
    </HStack>
  );
};
