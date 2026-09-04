import { Button } from '@coinbase/cds-web/buttons';
import { UpsellCard } from '@coinbase/cds-web/cards';
import { Box } from '@coinbase/cds-web/layout';
import { Pictogram } from '@coinbase/cds-web/illustrations';

export const RecurringBuyCard = () => {
  return (
    <UpsellCard
      title="Recurring Buy"
      description="Want to add funds to your card every week or month?"
      action={
        <Button compact flush="start">
          Get started
        </Button>
      }
      media={
        <Box position="relative" bottom={6} right={24}>
          <Pictogram dimension="64x64" name="recurringPurchases" />
        </Box>
      }
      onDismissPress={() => {}}
    />
  );
};
