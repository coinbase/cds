import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@coinbase/cds-mobile';
import { HStack, Box } from '@coinbase/cds-mobile/layout';
import { Avatar } from '@coinbase/cds-mobile/media';
import { TopNavBar, NavBarIconButton, NavigationTitle } from '@coinbase/cds-mobile/navigation';

export function Navbar({ toggleColorScheme }: { toggleColorScheme: () => void }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isDark = theme.activeColorScheme === 'dark';

  return (
    <Box style={{ paddingTop: insets.top }} background="bg">
      <TopNavBar
        start={<Avatar name="User" size="l" shape="circle" />}
        end={
          <HStack>
            <NavBarIconButton
              name={isDark ? 'moon' : 'light'}
              accessibilityLabel="Toggle color scheme"
              onPress={toggleColorScheme}
            />
            <NavBarIconButton name="bell" accessibilityLabel="Notifications" />
          </HStack>
        }
      >
        <NavigationTitle>Home</NavigationTitle>
      </TopNavBar>
    </Box>
  );
}
