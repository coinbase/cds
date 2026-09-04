import React from 'react';
import { Icon } from '@coinbase/cds-web/icons';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

export type TemplateCardProps = {
  /** Name of the template/framework (optional if logo includes text) */
  name?: string;
  /** Description of the template */
  description: string;
  /** GitHub URL for the template */
  href: string;
  /** Icon or logo React node */
  icon: React.ReactNode;
};

export const TemplateCard = ({ name, description, href, icon }: TemplateCardProps) => {
  return (
    <VStack
      as={Link}
      background="bgSecondary"
      borderRadius={400}
      className={styles.cardWrapper}
      gap={1}
      href={href}
      padding={2}
      rel="noopener noreferrer"
      role="button"
      style={{ border: '1px solid rgb(var(--gray15))' }}
      target="_blank"
      textDecoration="none"
      width="100%"
    >
      <HStack alignItems="center" gap={1.5} justifyContent="space-between" width="full">
        <HStack alignItems="center" gap={1.5} height={48}>
          {icon}
          {name && (
            <Text as="h3" color="fg" font="title3">
              {name}
            </Text>
          )}
        </HStack>
        <Icon name="externalLink" size="s" />
      </HStack>
      <Text color="fgMuted" font="body">
        {description}
      </Text>
    </VStack>
  );
};
