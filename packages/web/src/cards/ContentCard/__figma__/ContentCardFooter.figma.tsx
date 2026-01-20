import React from 'react';
import { figma } from '@figma/code-connect';

import { IconCounterButton } from '../../../buttons';
import { HStack, VStack } from '../../../layout';
import { Avatar, RemoteImageGroup } from '../../../media';
import { Text } from '../../../typography';
import { ContentCardFooter } from '../ContentCardFooter';

const URL =
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14705-24360';

figma.connect(ContentCardFooter, URL, {
  imports: [
    "import { ContentCardFooter } from '@coinbase/cds-web/cards/ContentCard/ContentCardFooter'",
  ],
  variant: {
    type: 'button',
  },
  props: {
    children: figma.children('action'),
  },
  example: ({ children, ...props }) => (
    <ContentCardFooter justifyContent="flex-end" {...props}>
      {children}
    </ContentCardFooter>
  ),
});

figma.connect(ContentCardFooter, URL, {
  imports: [
    "import { ContentCardFooter } from '@coinbase/cds-web/cards/ContentCard/ContentCardFooter'",
    "import { RemoteImageGroup } from '@coinbase/cds-web/media/RemoteImageGroup'",
  ],
  variant: {
    type: 'media + button',
  },
  props: {
    children: figma.children('action'),
  },
  example: ({ children, ...props }) => (
    <ContentCardFooter {...props}>
      <RemoteImageGroup />
      {children}
    </ContentCardFooter>
  ),
});

figma.connect(ContentCardFooter, URL, {
  imports: [
    "import { ContentCardFooter } from '@coinbase/cds-web/cards/ContentCard/ContentCardFooter'",
    "import { Avatar } from '@coinbase/cds-web/media/Avatar'",
    "import { VStack } from '@coinbase/cds-web/layout/VStack'",
    "import { HStack } from '@coinbase/cds-web/layout/HStack'",
    "import { Text } from '@coinbase/cds-web/typography/Text'",
    "import { Text } from '@coinbase/cds-web/typography/Text'",
  ],
  variant: {
    type: 'custom',
  },
  props: {
    children: figma.children('action'),
  },
  example: ({ children, ...props }) => (
    <ContentCardFooter {...props}>
      <HStack gap={1}>
        <Avatar alt="" shape="circle" size="xl" src="" />
        <VStack>
          <Text as="span" color="fgMuted">
            Reward
          </Text>
          <Text as="span">+$15 ACS</Text>
        </VStack>
      </HStack>
      {children}
    </ContentCardFooter>
  ),
});

figma.connect(ContentCardFooter, URL, {
  imports: [
    "import { ContentCardFooter } from '@coinbase/cds-web/cards/ContentCard/ContentCardFooter'",
    "import { IconCounterButton } from '@coinbase/cds-web/buttons/IconCounterButton'",
    "import { HStack } from '@coinbase/cds-web/layout/HStack'",
  ],
  variant: {
    type: 'engagement + button',
  },
  props: {
    children: figma.children('action'),
  },
  example: ({ children, ...props }) => (
    <ContentCardFooter {...props}>
      <HStack gap={1}>
        <IconCounterButton
          active
          accessibilityLabel="20 likes, like"
          color="fgNegative"
          count={20}
          icon="heart"
        />
        <IconCounterButton accessibilityLabel="share" icon="share" />
      </HStack>
      {children}
    </ContentCardFooter>
  ),
});

figma.connect(ContentCardFooter, URL, {
  imports: [
    "import { ContentCardFooter } from '@coinbase/cds-web/cards/ContentCard/ContentCardFooter'",
    "import { IconCounterButton } from '@coinbase/cds-web/buttons/IconCounterButton'",
    "import { HStack } from '@coinbase/cds-web/layout/HStack'",
  ],
  variant: {
    type: 'engagement',
  },
  props: {},
  example: ({ ...props }) => (
    <ContentCardFooter {...props}>
      <IconCounterButton accessibilityLabel="20 likes, like" count={20} icon="heartInactive" />
      <IconCounterButton accessibilityLabel="40 comments, comment" count={40} icon="comment" />
      <IconCounterButton accessibilityLabel="32 shares, share" count={32} icon="wireTransfer" />
    </ContentCardFooter>
  ),
});
