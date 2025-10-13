import React from 'react';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

export type TemplateCardProps = {
  /** Name of the template/framework */
  name: string;
  /** Description of the template */
  description: string;
  /** GitHub URL for the template */
  href: string;
  /** Icon or logo for the framework */
  icon: React.ReactNode;
};

const titleFontConfig = { base: 'title5', desktop: 'title5' } as const;
const descriptionFontConfig = { base: 'body', desktop: 'body' } as const;

export const TemplateCard = ({ name, description, href, icon }: TemplateCardProps) => {
  return (
    <VStack
      as={Link}
      background="bgSecondary"
      borderRadius={400}
      className={styles.cardWrapper}
      flexBasis={{ base: '100%', desktop: 'calc(33.333% - 16px)' }}
      flexGrow={1}
      flexShrink={0}
      gap={1}
      href={href}
      minWidth={{ base: '100%', tablet: '280px' }}
      paddingX={2}
      paddingY={2}
      rel="noopener noreferrer"
      role="button"
      target="_blank"
      textDecoration="none"
    >
      <HStack alignItems="center" gap={1.5} justifyContent="space-between" width="full">
        <HStack alignItems="center" gap={1.5}>
          <div className={styles.iconWrapper}>{icon}</div>
          <Text
            as="h3"
            className={styles.templateName}
            color="fg"
            fontFamily={titleFontConfig}
            fontSize={titleFontConfig}
            fontWeight={titleFontConfig}
            lineHeight={titleFontConfig}
          >
            {name}
          </Text>
        </HStack>
        <div className={styles.arrowIcon}>
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </div>
      </HStack>
      <Text
        color="fgMuted"
        fontFamily={descriptionFontConfig}
        fontSize={descriptionFontConfig}
        fontWeight={descriptionFontConfig}
        lineHeight={descriptionFontConfig}
      >
        {description}
      </Text>
    </VStack>
  );
};
