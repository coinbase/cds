import React, { memo } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';

import { ListCell } from '../../../../cells/ListCell';
import { VStack } from '../../../../layout/VStack';
import { RemoteImage } from '../../../../media/RemoteImage';

export const ListCellExample = memo(() => {
  return (
    <VStack width="100%">
      <ListCell
        accessibilityLabel="Bitcoin asset row"
        description="$64,231.00"
        media={<RemoteImage height={36} shape="circle" source={assets.btc.imageUrl} width={36} />}
        onPress={() => undefined}
        subtitle="BTC"
        title="Bitcoin"
      />
      <ListCell
        accessibilityLabel="Ethereum asset row"
        description="$3,421.50"
        media={<RemoteImage height={36} shape="circle" source={assets.eth.imageUrl} width={36} />}
        onPress={() => undefined}
        subtitle="ETH"
        title="Ethereum"
      />
      <ListCell
        accessibilityLabel="XRP asset row"
        description="$2.15"
        media={<RemoteImage height={36} shape="circle" source={assets.xrp.imageUrl} width={36} />}
        onPress={() => undefined}
        subtitle="XRP"
        title="XRP"
      />
    </VStack>
  );
});
