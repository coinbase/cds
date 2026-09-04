import React, { memo } from 'react';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Link } from '@coinbase/cds-web/typography/Link';
import { Text } from '@coinbase/cds-web/typography/Text';
import DocusaurusLink from '@docusaurus/Link';

import type { RelatedComponent } from '.';

type MetadataRelatedComponentsProps = {
  /** List of related components to display */
  relatedComponents: RelatedComponent[];
};

/**
 * Displays a list of related components as links.
 */
export const MetadataRelatedComponents = memo(
  ({ relatedComponents }: MetadataRelatedComponentsProps) => {
    if (relatedComponents.length === 0) {
      return null;
    }

    return (
      <VStack gap={{ base: 1, phone: 0 }} paddingX={{ base: 4, phone: 2 }} paddingY={2}>
        <Text font="label1">Related components</Text>
        <HStack
          as="ul"
          flexWrap="wrap"
          margin={0}
          padding={0}
          style={{
            listStyleType: 'none',
          }}
        >
          {relatedComponents.map((component, index) => (
            <li key={component.url}>
              <Text font="label2" style={{ whiteSpace: 'pre-wrap' }}>
                <Link as={DocusaurusLink} to={component.url}>
                  {component.label}
                </Link>
                {index < relatedComponents.length - 1 && ', '}
              </Text>
            </li>
          ))}
        </HStack>
      </VStack>
    );
  },
);
