import { memo } from 'react';
import { ListCell } from '@coinbase/cds-web/cells';
import { VStack } from '@coinbase/cds-web/layout';

export type SettingsScreenProps = {
  navigate: (path: string) => void;
};

export const SettingsScreen = memo(({ navigate: _navigate }: SettingsScreenProps) => {
  return (
    <VStack>
      <ListCell accessory="arrow" title="Profile" />
      <ListCell accessory="arrow" title="Security" />
      <ListCell accessory="arrow" title="Notifications" />
    </VStack>
  );
});

SettingsScreen.displayName = 'SettingsScreen';
