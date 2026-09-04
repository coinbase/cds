import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { ElevationLevels } from '@coinbase/cds-common/types/ElevationLevels';

import { useTheme } from '../hooks/useTheme';
import { Box, Grid, VStack } from '../layout';
import { Text } from '../typography/Text';

const Colors = () => {
  const theme = useTheme();

  return (
    <Grid background="bg" columnMax="200px" columnMin="min-content">
      {Object.keys(theme.color).map((name) => {
        return (
          <Box
            key={name}
            alignItems="center"
            background={name as ThemeVars.Color}
            height={200}
            justifyContent="center"
            width={200}
          >
            <VStack background="bg">
              <Text as="p" display="block" font="caption" textAlign="center">
                {name}
              </Text>
            </VStack>
          </Box>
        );
      })}
    </Grid>
  );
};

export const Default = () => <Colors />;

export default {
  title: 'Colors',
  component: Colors,
};
