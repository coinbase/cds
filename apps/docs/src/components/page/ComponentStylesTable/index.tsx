import { memo } from 'react';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { Link } from '@coinbase/cds-web/typography/Link';
import { Text } from '@coinbase/cds-web/typography/Text';
import type { StylesData } from '@coinbase/docusaurus-plugin-docgen/types';
import DocusaurusLink from '@docusaurus/Link';

import { StylesTable } from './StylesTable';

type ComponentStylesTableProps = {
  styles: StylesData;
  componentName: string;
};

export const ComponentStylesTable = memo(({ styles, componentName }: ComponentStylesTableProps) => {
  return (
    <VStack gap={0.5} paddingBottom={3}>
      <Text as="p" color="fgMuted" font="body">
        You can customize {componentName} using selectors for any of the supported{' '}
        <Link as={DocusaurusLink} to="/getting-started/styling">
          styling
        </Link>{' '}
        patterns.
      </Text>
      <Box maxWidth="100%">
        <StylesTable styles={styles} />
      </Box>
    </VStack>
  );
});
