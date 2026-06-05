import { UpsellCard } from '@coinbase/cds-web/cards';
import { Box } from '@coinbase/cds-web/layout';
import { RemoteImage } from '@coinbase/cds-web/media';
import { Text } from '@coinbase/cds-web/typography';

export const ETHStakingCard = () => {
  return (
    <UpsellCard
      action="Start earning"
      description={
        <Text as="p" color="fgInverse" font="label2" numberOfLines={3}>
          Earn staking rewards on ETH by holding it on Coinbase
        </Text>
      }
      media={
        <Box left={16} position="relative" top={12}>
          <RemoteImage height={174} source="/staking.png" />
        </Box>
      }
      style={{ backgroundColor: 'rgb(var(--purple70))' }}
      title={
        <Text as="h3" color="fgInverse" font="headline">
          Up to 3.29% APR on ETHs
        </Text>
      }
    />
  );
};
