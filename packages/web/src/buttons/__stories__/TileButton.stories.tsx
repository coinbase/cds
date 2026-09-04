import React from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';

import { HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { TileButton } from '../TileButton';

export default {
  title: 'Components/Buttons/TileButton',
  component: TileButton,
};

const handlePress = () => console.log('Pressed');

const getZIndexFromRow = (row: number, totalRows: number) => totalRows - row + zIndex.interactable;

export const TileButtonPictogram = () => {
  return (
    <VStack gap={0.5}>
      <HStack zIndex={getZIndexFromRow(1, 3)}>
        <TileButton onClick={handlePress} pictogram="2fa" title="Coinbase" />
        <TileButton
          showOverflow
          onClick={handlePress}
          pictogram="addToWatchlist"
          title="Private Client"
        />
        <TileButton
          onClick={handlePress}
          pictogram="authenticatorProgress"
          showOverflow={false}
          title="This Title Will Be Three Lines"
        />
      </HStack>
      <HStack zIndex={getZIndexFromRow(2, 3)}>
        <TileButton onClick={handlePress} pictogram="addCard" title="Pro" />
        <TileButton onClick={handlePress} pictogram="phone" title="I'm a Two Line Title" />
        <TileButton onClick={handlePress} pictogram="bitcoinWhitePaper" title="Asset Hub" />
      </HStack>
      <HStack zIndex={getZIndexFromRow(3, 3)}>
        <TileButton onClick={handlePress} pictogram="cardDeclined" title="Wallet" />
        <TileButton onClick={handlePress} pictogram="coinbaseOneLogo" title="Commerce" />
        <TileButton onClick={handlePress} pictogram="chart" title="Analytics" />
      </HStack>
      <HStack zIndex={getZIndexFromRow(4, 3)}>
        <TileButton count={0} onClick={handlePress} title="Bitcoin">
          <RemoteImage height={38.4} source={assets.btc.imageUrl} width={38.4} />
        </TileButton>
        <TileButton count={1} onClick={handlePress} title="Ethereum">
          <RemoteImage height={38.4} source={assets.eth.imageUrl} width={38.4} />
        </TileButton>
        <TileButton count={100} onClick={handlePress} title="Sushi">
          <RemoteImage height={38.4} source={assets.sushi.imageUrl} width={38.4} />
        </TileButton>
      </HStack>
    </VStack>
  );
};
