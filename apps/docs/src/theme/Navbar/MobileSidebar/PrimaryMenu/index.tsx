import React, { type JSX } from 'react';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Pressable } from '@coinbase/cds-web/system/Pressable';
import { Text } from '@coinbase/cds-web/typography/Text';
import { useThemeConfig } from '@docusaurus/theme-common';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu(): JSX.Element {
  const items = useNavbarItems();
  const filterdItems = items?.filter((item) => item.type === 'default' || !item.type);
  const parsedItems = filterdItems?.map(({ label, href }) => ({
    label: label?.toString() || '',
    href: (href as string) || '',
  }));

  return (
    <VStack as="ul" gap={1} marginBottom={0} paddingEnd={1.5} paddingStart={2}>
      {parsedItems?.map(({ href, label }) => (
        <VStack key={label} as="li">
          <Pressable
            block
            as="a"
            background="transparent"
            borderRadius={1000}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <HStack
              alignItems="center"
              gap={0.5}
              justifyContent="space-between"
              paddingX={2}
              paddingY={1}
            >
              <Text font="label2">{label}</Text>
              <Icon color="fg" name="externalLink" size="s" />
            </HStack>
          </Pressable>
        </VStack>
      ))}
    </VStack>
  );
}
