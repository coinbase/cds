import React, { memo } from 'react';

import { useTheme } from '../../hooks/useTheme';
import { Box, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';

export const IllustrationExample = memo(function IllustrationExample({
  children,
}: React.PropsWithChildren<unknown>) {
  const theme = useTheme();
  return (
    <VStack alignItems="flex-start" gap={2}>
      <ThemeProvider activeColorScheme="light" theme={theme}>
        <Box background="bg">{children}</Box>
      </ThemeProvider>
      <ThemeProvider activeColorScheme="dark" theme={theme}>
        <Box background="bg">{children}</Box>
      </ThemeProvider>
    </VStack>
  );
});
