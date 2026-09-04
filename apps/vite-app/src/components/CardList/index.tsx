import { Divider, VStack } from '@coinbase/cds-web/layout';

import { DataCardWithCircle } from './DataCardWithCircle';
import { ETHStakingCard } from './ETHStakingCard';
import { RecurringBuyCard } from './RecurringBuyCard';

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
