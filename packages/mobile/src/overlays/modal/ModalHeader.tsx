import React from 'react';
import { type GestureResponderEvent } from 'react-native';
import { useModalContext } from '@coinbase/cds-common/overlays/ModalContext';
import type { SharedAccessibilityProps, SharedProps } from '@coinbase/cds-common/types';

import { IconButton } from '../../buttons';
import { Box, HStack } from '../../layout';
import { Text } from '../../typography/Text';

export type ModalHeaderBaseProps = SharedProps & {
  /** Handles back button press */
  onBackButtonClick?: (event: GestureResponderEvent) => void;
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
};

export type ModalHeaderProps = ModalHeaderBaseProps;

export const ModalHeader: React.FC<React.PropsWithChildren<ModalHeaderProps>> = ({
  title,
  onBackButtonClick,
  backAccessibilityLabel,
  backAccessibilityHint,
  closeAccessibilityLabel,
  closeAccessibilityHint,
  testID,
}) => {
  const { onRequestClose, hideCloseButton, hideDividers } = useModalContext();

  return (
    <HStack
      alignItems="center"
      borderedBottom={!hideDividers}
      paddingX={3}
      paddingY={2}
      testID={testID}
    >
      <Box flexBasis={0} flexGrow={1}>
        {!!onBackButtonClick && (
          <IconButton
            transparent
            accessibilityHint={backAccessibilityHint}
            accessibilityLabel={backAccessibilityLabel}
            name="backArrow"
            onPress={onBackButtonClick}
            testID="modal-back-button"
          />
        )}
      </Box>
      <Box alignItems="center" flexBasis={0} flexGrow={6} justifyContent="center">
        {title && (
          <Text align="center" font="headline">
            {title}
          </Text>
        )}
      </Box>
      <Box alignItems="flex-end" flexBasis={0} flexGrow={1}>
        {!hideCloseButton && (
          <IconButton
            transparent
            accessibilityHint={closeAccessibilityHint}
            accessibilityLabel={closeAccessibilityLabel}
            name="close"
            onPress={onRequestClose}
            testID="modal-close-button"
          />
        )}
      </Box>
    </HStack>
  );
};
