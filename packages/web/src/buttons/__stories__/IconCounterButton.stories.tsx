import React from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';

import { DotSymbol } from '../../dots/DotSymbol';
import { Divider, HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { IconCounterButton } from '../IconCounterButton';

export default {
  title: 'Components/Buttons/IconCounterButton',
  component: IconCounterButton,
};

export const IconCounterButtonExample = () => {
  return (
    <VStack gap={2}>
      <Text as="h3" display="block" font="title3">
        Normal
      </Text>
      <HStack gap={4}>
        <IconCounterButton count={99} icon="heart" />
        <IconCounterButton count={4200} icon="comment" />
        <IconCounterButton count={9900000} icon="arrowsHorizontal" />
      </HStack>
      <Divider />
      <Text as="h3" display="block" font="title3">
        Colored
      </Text>
      <HStack gap={4}>
        <IconCounterButton active color="fgNegative" count={99} icon="heart" />
        <IconCounterButton color="fgPrimary" count={4200} icon="comment" />
        <IconCounterButton
          count={69000000}
          icon="arrowsHorizontal"
          styles={{ icon: { color: 'orange' } }}
        />
      </HStack>
      <Divider />
      <Text as="h3" display="block" font="title3">
        Custom Icon
      </Text>
      <HStack gap={4}>
        <IconCounterButton count={99} icon={<DotSymbol size="m" source={assets.btc.imageUrl} />} />
        <IconCounterButton
          count={4200}
          icon={<DotSymbol size="m" source={assets.eth.imageUrl} />}
        />
        <IconCounterButton
          count={9900000}
          icon={<DotSymbol size="m" source={assets.uni.imageUrl} />}
        />
      </HStack>
    </VStack>
  );
};
