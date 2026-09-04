import type { SpotSquareName } from '@coinbase/cds-illustrations';

const onPress = () => console.log('pressed');
export const featureEntryCards = [
  {
    key: 'card1',
    title: 'Recurring buys',
    description: 'Unsure when to buy? Try dollar cost averaging with a recurring.',
    spotSquare: 'nuxEarnCrypto' as SpotSquareName,
    actionLabel: 'Get started',
    onActionPress: onPress,
  },
  {
    key: 'card2',
    title: 'Not sure when to buy?',
    description: 'Use dollar cost averaging to buy crypto',
    spotSquare: 'moneyRewards' as SpotSquareName,
    actionLabel: 'Schedule',
    onActionPress: onPress,
  },
  {
    key: 'card3',
    title: 'Coinbase Card',
    description: 'We need to verify your address before we can issue your card.',
    spotSquare: 'confirmEmail' as SpotSquareName,
    actionLabel: 'Verify address',
    onActionPress: onPress,
  },
  {
    key: 'card4',
    title: 'Coinbase Card',
    description: 'As soon as we complete our review of your upload, we’ll send you an email.',
    spotSquare: 'confirmEmail' as SpotSquareName,
  },
];
