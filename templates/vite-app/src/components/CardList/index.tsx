import { DataCardWithCircle } from './DataCardWithCircle';
import { RecurringBuyCard } from './RecurringBuyCard';
import { ETHStakingCard } from './ETHStakingCard';
import { Divider, VStack } from '@cbhq/cds-web/layout';

export const CardList = () => {
  return (
    <VStack gap={2}>
      <RecurringBuyCard />
      <Divider />
      <DataCardWithCircle />
      <Divider />
      <ETHStakingCard />
    </VStack>
  );
};
