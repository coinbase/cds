'use client';
import { useTheme } from '@cbhq/cds-web';
import { IconButton } from '@cbhq/cds-web/buttons';
import { Box, HStack } from '@cbhq/cds-web/layout';
import { NavigationBar, NavigationTitle } from '@cbhq/cds-web/navigation';

import { MoreMenu } from './MoreMenu';
import { UserMenu } from './UserMenu';

export const Navbar = ({
  title,
  toggleColorScheme,
}: {
  title?: React.ReactNode;
  toggleColorScheme?: () => void;
}) => {
  const theme = useTheme();
  const isDark = theme.activeColorScheme === 'dark';
  return (
    <NavigationBar
      end={
        <HStack alignItems="center" gap={1}>
          <MoreMenu />
          <IconButton
            accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            name={isDark ? 'moon' : 'light'}
            onClick={toggleColorScheme}
          />
          <UserMenu />
        </HStack>
      }
    >
      <Box flexGrow={1} width="100%">
        <NavigationTitle flexGrow={1} width="100%">
          {title}
        </NavigationTitle>
      </Box>
    </NavigationBar>
  );
};
