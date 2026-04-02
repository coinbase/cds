import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

export const stickerSheetSelectOptions = [
  { value: null, label: 'Clear' },
  { value: 'btc', label: 'Bitcoin' },
  { value: 'eth', label: 'Ethereum' },
  { value: 'sol', label: 'Solana' },
];

export const segmentedTabs: TabValue<'buy' | 'sell' | 'convert'>[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

export const tabNavigationTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'details', label: 'Details' },
] as const;
