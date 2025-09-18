import React from 'react';
import { assets } from '@cbhq/cds-common/internal/data/assets';

import { DotSymbol } from '../../dots';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { IconCounterButton } from '../IconCounterButton';

const IconCounterButtonScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Normal">
        <HStack gap={4}>
          <IconCounterButton accessibilityLabel="99 likes, like" count={99} icon="heart" />
          <IconCounterButton
            accessibilityLabel="4200 comments, comment"
            count={4200}
            icon="comment"
          />
          <IconCounterButton
            accessibilityLabel="9.9 million shares, share"
            count={9900000}
            icon="arrowsHorizontal"
          />
        </HStack>
      </Example>
      <Example title="Colored">
        <HStack gap={4}>
          <IconCounterButton
            active
            accessibilityLabel="99 likes, like"
            color="fgNegative"
            count={99}
            icon="heart"
          />
          <IconCounterButton
            accessibilityLabel="4200 comments, comment"
            color="fgPrimary"
            count={4200}
            icon="comment"
          />
          <IconCounterButton
            accessibilityLabel="6.9 million shares, share"
            count={69000000}
            dangerouslySetColor="orange"
            icon="arrowsHorizontal"
          />
        </HStack>
      </Example>
      <Example title="Custom Icon">
        <HStack gap={4}>
          <IconCounterButton
            count={99}
            icon={
              <DotSymbol accessibilityLabel="Bitcoin, 99$" size="m" source={assets.btc.imageUrl} />
            }
          />
          <IconCounterButton
            count={4200}
            icon={
              <DotSymbol
                accessibilityLabel="Ethereum, 4200$"
                size="m"
                source={assets.eth.imageUrl}
              />
            }
          />
          <IconCounterButton
            count={9900000}
            icon={
              <DotSymbol
                accessibilityLabel="Uniswap, 9.9M$"
                size="m"
                source={assets.uni.imageUrl}
              />
            }
          />
        </HStack>
      </Example>
    </ExampleScreen>
  );
};

export default IconCounterButtonScreen;
