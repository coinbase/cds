import { Button, IconButton } from '@coinbase/cds-web/buttons';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

/** Representative pattern: header IconButton + centered tertiary Button in a vertical stack. */
export function ChatToolbarActions() {
  const handleBack = () => {};
  const handleLoadOlder = () => {};

  return (
    <VStack gap={0} alignItems="stretch">
      <HStack justifyContent="space-between" alignItems="center" padding={2} paddingX={3}>
        <HStack gap={1.5} alignItems="center">
          <IconButton name="arrowLeft" onClick={handleBack} variant="tertiary" compact />
          <Text font="headline" fontSize="title3">
            Conversation
          </Text>
        </HStack>
      </HStack>
      <Box textAlign="center" paddingY={1}>
        <Button variant="tertiary" compact onClick={handleLoadOlder} disabled={false}>
          Load older messages
        </Button>
      </Box>
    </VStack>
  );
}
