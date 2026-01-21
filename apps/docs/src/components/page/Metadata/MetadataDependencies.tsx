import React, { memo } from 'react';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Link } from '@coinbase/cds-web/typography/Link';
import { Text } from '@coinbase/cds-web/typography/Text';
import DocusaurusLink from '@docusaurus/Link';

import type { Dependency } from '.';

type MetadataDependenciesProps = {
  /** List of dependencies to display */
  dependencies: Dependency[];
};

/**
 * Displays a list of peer dependencies with optional version info and links.
 */
export const MetadataDependencies = memo(({ dependencies }: MetadataDependenciesProps) => {
  if (dependencies.length === 0) {
    return null;
  }

  return (
    <VStack gap={{ base: 1, phone: 0 }} paddingX={{ base: 4, phone: 2 }} paddingY={2}>
      <Text font="label1">Peer dependencies</Text>
      <HStack
        as="ul"
        flexWrap="wrap"
        margin={0}
        padding={0}
        style={{
          listStyleType: 'none',
        }}
      >
        {dependencies.map((dependency, index) => (
          <li key={dependency.name}>
            <Text font="label2" style={{ whiteSpace: 'pre-wrap' }}>
              {dependency.url ? (
                <Link as={DocusaurusLink} target="_blank" to={dependency.url}>
                  {dependency.name}
                </Link>
              ) : (
                dependency.name
              )}
              {dependency.version && <span>{`: ${dependency.version}`}</span>}
              {index < dependencies.length - 1 && ', '}
            </Text>
          </li>
        ))}
      </HStack>
    </VStack>
  );
});
