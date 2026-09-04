/**
 * Configuration for the Figma integration audit.
 */

/**
 * Components that are exempt from Code Connect requirements.
 * These are typically utility components, providers, or sub-components
 * that don't have a direct 1:1 mapping in Figma.
 */
export const CODE_CONNECT_IGNORE = [
  'AccordionItem',
  'Box',
  'Collapsible',
  'HStack',
  'Interactable',
  'Lottie',
  'LottieStatusAnimation',
  'MediaQueryProvider',
  'ModalBody',
  'ModalFooter',
  'ModalHeader',
  'Overlay',
  'PortalProvider',
  'Pressable',
  'Spacer',
  'TableBody',
  'TableCaption',
  'TableCellFallback',
  'TableFooter',
  'TableHeader',
  'TableRow',
  'Text',
  'ThemeProvider',
  'VStack',
];
