import { IconButton } from '../buttons';
import { Box, VStack } from '../layout';
import { Text } from '../typography';

const AccessibilityViolations = () => {
  return (
    <VStack gap={2}>
      <VStack gap={1}>
        <Text color="fgNegative" font="headline">
          Missing accessibilityLabel
        </Text>
        <IconButton name="arrowsHorizontal" />
        <Text color="fgPositive" font="headline">
          Correct usage
        </Text>
        <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
      </VStack>
      <VStack gap={1}>
        <Text color="fgNegative" font="headline">
          Incorrect color contrast
        </Text>
        <Box background="bgPrimary" width="fit-content">
          <Text as="h1" font="body">
            This text does not contrast with the background
          </Text>
        </Box>
        <Text color="fgPositive" font="headline">
          Correct color contrast
        </Text>
        <Text as="h1" font="body">
          This text contrasts with the background
        </Text>
      </VStack>
    </VStack>
  );
};

export const Default = () => <AccessibilityViolations />;

export default {
  component: AccessibilityViolations,
  title: 'Accessibility/AccessibilityViolations',
  parameters: {
    a11y: { test: 'todo' },
  },
};
