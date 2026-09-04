import type { SpotSquareName } from '@coinbase/cds-illustrations';

const onPress = () => console.log('pressed');
export const announcementCards = [
  {
    title: 'Crypto gifts',
    description: 'Give crypto to your family and friends',
    spotSquare: 'guideStartInvesting' as SpotSquareName,
    actionLabel: 'Contact support',
    onActionPress: onPress,
    key: 'card1',
  },
  {
    title: 'Want more assets?',
    description: 'Trade over 4,000 assets with Coinbase Wallet',
    spotSquare: 'addMultipleCrypto' as SpotSquareName,
    actionLabel: 'Contact support',
    onActionPress: onPress,
    key: 'card2',
  },
  {
    title: 'Introducing SHIB',
    description: 'Shiba Inu (SHIB) is now on Coinbase',
    spotSquare: 'cardShipped' as SpotSquareName,
    actionLabel: 'Contact support',
    onActionPress: onPress,
    key: 'card3',
  },
];
