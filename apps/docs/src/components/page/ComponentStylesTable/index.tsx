import { Box, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Link } from '@coinbase/cds-web/typography/Link';
import type { StylesData } from '@coinbase/docusaurus-plugin-docgen/types';
import DocusaurusLink from '@docusaurus/Link';

import StylesTable from './StylesTable';

type ComponentStylesTableProps = {
  styles: StylesData;
  componentName: string;
};

function ComponentStylesTable({ styles, componentName }: ComponentStylesTableProps) {
  return (
    <VStack
      gap={2}
      maxWidth="100%"
      paddingBottom={{ base: 4, phone: 2 }}
      paddingTop={2}
      paddingX={{ base: 4, phone: 2 }}
      width="100%"
    >
      <VStack gap={0.5}>
        <Text as="h3" font="title3">
          Selectors
        </Text>
        <Text as="p" color="fgMuted" font="body">
          You can customize{' '}
          <Text mono as="span" font="body">
            {componentName}
          </Text>{' '}
          using selectors for any of the supported{' '}
          <Link as={DocusaurusLink} to="/getting-started/styling">
            styling
          </Link>{' '}
          patterns.
        </Text>
      </VStack>
      <Box maxWidth="100%">
        <StylesTable styles={styles} />
      </Box>
    </VStack>
  );
}

export default ComponentStylesTable;
