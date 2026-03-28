import { Button } from '@coinbase/cds-web/buttons';
import { UpsellCard } from '@coinbase/cds-web/cards';
import { Pictogram } from '@coinbase/cds-web/illustrations';
import { Box } from '@coinbase/cds-web/layout';

export const RecurringBuyCard = () => {
  return (
    <UpsellCard
      accessibilityLabel="Dismiss recurring buy promotion"
      action={
        <Button compact flush="start">
          Get started
        </Button>
      }
      description="Want to add funds to your card every week or month?"
      media={
        <Box bottom={6} position="relative" right={24}>
          <Pictogram dimension="64x64" name="recurringPurchases" />
        </Box>
      }
      onDismissPress={() => {}}
      title="Recurring Buy"
    />
  );
};
