import { Button } from '@cbhq/cds-web/buttons';
import { UpsellCard } from '@cbhq/cds-web/cards';
import { Pictogram } from '@cbhq/cds-web/illustrations';
import { Box } from '@cbhq/cds-web/layout';

export const RecurringBuyCard = () => {
  return (
    <UpsellCard
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
