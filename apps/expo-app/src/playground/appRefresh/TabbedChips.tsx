import { useState } from 'react';
import {
  type TabbedChipProps,
  TabbedChips as TabbedChipsComponent,
} from '@coinbase/cds-mobile/alpha/tabbed-chips';
import { Icon } from '@coinbase/cds-mobile/icons';

const tabs: TabbedChipProps[] = [
  { id: 'live', label: 'Live' },
  { id: 'all', label: 'All' },
  {
    id: 'marchMadness',
    label: 'March Madness',
    start: <Icon color="fg" name="basketball" size="s" />,
  },
  { id: 'football', label: 'Football', start: <Icon color="fg" name="football" size="s" /> },
];

export function TabbedChips() {
  const [activeTab, setActiveTab] = useState<TabbedChipProps | null>(tabs[0]);
  return (
    <TabbedChipsComponent
      compact
      activeColor="accentBoldGreen"
      activeTab={activeTab}
      color="fg"
      onChange={setActiveTab}
      tabs={tabs}
    />
  );
}
