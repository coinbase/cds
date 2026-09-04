import React, { type JSX } from 'react';
import { Box, HStack } from '@coinbase/cds-web/layout';
import { Pressable } from '@coinbase/cds-web/system';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';
import { isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import type { Props } from '@theme/DocSidebarItem/Link';
import IconExternalLink from '@theme/Icon/ExternalLink';

import styles from './styles.module.css';
export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  ...props
}: Props): JSX.Element {
  const { href, label, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  return (
    <Box key={label} as="li" padding={0.5}>
      <Pressable
        block
        noScaleOnPress
        aria-current={isActive ? 'page' : undefined}
        as={Link}
        autoAddBaseUrl={autoAddBaseUrl}
        background="transparent"
        borderRadius={1000}
        borderWidth={0}
        font={isActive ? 'label1' : 'label2'}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        className={isActive ? styles.linkSelected : styles.link}
        {...props}
      >
        <HStack alignItems="center" gap={1} paddingX={1.5} paddingY={0.5}>
          {label}
          {/* {!isInternalLink && <IconExternalLink />} */}
        </HStack>
      </Pressable>
    </Box>
  );
}
