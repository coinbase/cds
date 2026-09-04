import React, { type ReactNode } from 'react';
import { HStack } from '@coinbase/cds-web/layout';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useAnnouncementBar } from '@docusaurus/theme-common/internal';
import AnnouncementBarCloseButton from '@theme/AnnouncementBar/CloseButton';
import AnnouncementBarContent from '@theme/AnnouncementBar/Content';

export default function AnnouncementBar(): ReactNode {
  const { announcementBar } = useThemeConfig();
  const { isActive, close } = useAnnouncementBar();
  if (!isActive) {
    return null;
  }
  const { backgroundColor = 'rgb(var(--purple20))', textColor, isCloseable } = announcementBar!;
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      paddingX={2}
      paddingY={1}
      role="banner"
      style={{ backgroundColor, color: textColor }}
    >
      <AnnouncementBarContent />
      {isCloseable && <AnnouncementBarCloseButton onClick={close} />}
    </HStack>
  );
}
