import { Button } from '@cbhq/cds-web/buttons';
import { UpsellCard } from '@cbhq/cds-web/cards';
import { Box } from '@cbhq/cds-web/layout';
import { Pictogram } from '@cbhq/cds-web/illustrations';

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
