import { Button } from '@coinbase/cds-web/buttons';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { SpotSquare } from '@coinbase/cds-web/illustrations/SpotSquare';
import { TextBody, TextTitle3 } from '@coinbase/cds-web/typography';

/** Representative pattern: stacked layout + illustration + tertiary action after a confirmation. */
export function SurveyConfirmationPanel() {
  const handleAction = () => {};

  return (
    <Box height="100%" width="100%" overflow="auto">
      <VStack
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap={2}
        padding={4}
      >
        <SpotSquare name="baseCheckMedium" />
        <TextTitle3 as="h2">Submitted</TextTitle3>
        <TextBody as="p" color="fgMuted" textAlign="center">
          Your response was recorded.
        </TextBody>
        <Button variant="tertiary" onClick={handleAction} compact>
          Submit another response
        </Button>
      </VStack>
    </Box>
  );
}
