'use client';
import { Box, HStack } from '@coinbase/cds-web/layout';
import { NavigationBar, NavigationTitle } from '@coinbase/cds-web/navigation';
import { MoreMenu } from './MoreMenu';
import { UserMenu } from './UserMenu';
import { IconButton } from '@coinbase/cds-web/buttons';
import { useTheme } from '@coinbase/cds-web';

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
          <IconButton onClick={toggleColorScheme} name={isDark ? 'moon' : 'light'} />
          <UserMenu />
        </HStack>
      }
    >
      <Box width="100%" flexGrow={1}>
        <NavigationTitle width="100%" flexGrow={1}>
          {title}
        </NavigationTitle>
      </Box>
    </NavigationBar>
  );
};
