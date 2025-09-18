import { UpsellCard } from '@cbhq/cds-web/cards';
import { Box } from '@cbhq/cds-web/layout';
import { RemoteImage } from '@cbhq/cds-web/media';
import { Text } from '@cbhq/cds-web/typography';

export const ETHStakingCard = () => {
  return (
    <UpsellCard
      dangerouslySetBackground="rgb(var(--purple70))"
      title={
        <Text as="h3" font="headline" color="fgInverse">
          Up to 3.29% APR on ETHs
        </Text>
      }
      description={
        <Text as="p" font="label2" color="fgInverse" numberOfLines={3}>
          Earn staking rewards on ETH by holding it on Coinbase
        </Text>
      }
      action="Start earning"
      media={
        <Box position="relative" left={16} top={12}>
          <RemoteImage source="/staking.png" height={174} />
        </Box>
      }
    />
  );
};
