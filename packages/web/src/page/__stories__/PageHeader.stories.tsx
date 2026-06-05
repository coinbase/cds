import React from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonGroup, IconButton } from '../../buttons';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { LogoMark } from '../../icons';
import { HeroSquare } from '../../illustrations';
import { Box, Divider, HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Link, Text } from '../../typography';
import { PageFooter } from '../PageFooter';
import { PageHeader, type PageHeaderProps } from '../PageHeader';

const shiftStartStyles = {
  start: {
    paddingLeft: 'calc(var(--space-1_5) + var(--space-1))',
  },
};

const shiftEndStyles = {
  end: {
    paddingRight: 'calc(var(--space-1_5) + var(--space-1))',
  },
};

const exampleProps = {
  logoMark1: (
    <RemoteImage alt="btcLogoImage" shape="circle" size="m" source={assets.btc.imageUrl} />
  ),
  logoMark2: <LogoMark size={32} />,
  start1: (
    <Box>
      <IconButton
        transparent
        accessibilityLabel="Go Back"
        name="backArrow"
        onClick={() => {}}
        testID="header-back-button"
      />
    </Box>
  ),
  start2: (
    <Box>
      <IconButton
        accessibilityLabel="Go Back"
        name="backArrow"
        onClick={() => {}}
        testID="header-back-button"
      />
    </Box>
  ),
  title1: (
    <Text as="h1" display="block" font="title1">
      Page Title
    </Text>
  ),
  title2: (
    <Box flexGrow={1} flexShrink={1} justifyContent="center">
      <Text as="h1" display="block" font="title1" numberOfLines={1}>
        Centered Title
      </Text>
    </Box>
  ),
  title3: (
    <Text as="h3" display="block" font="title1" numberOfLines={1}>
      Title
    </Text>
  ),
  intermediary1: (
    <Text as="h1" display="block" font="headline">
      Intermediary Content
    </Text>
  ),
  intermediary2: (
    <Box style={{ backgroundColor: 'red' }}>
      <Text as="sub" font="body">
        Hello there. This is a rather long text sentence since I do not have lorem ipsum handy.
        Hello there. This is a rather long text sentence since I do not have lorem ipsum handy.
      </Text>
    </Box>
  ),
  end1: (
    <IconButton
      active
      transparent
      accessibilityLabel="Show info"
      name="info"
      onClick={() => {}}
      testID="header-info-button"
    />
  ),
  end2: (
    <HStack alignItems="center" gap={2}>
      <Link href="https://cds.coinbase.com/components/link">
        <Text as="p" color="fgPrimary" display="block" font="headline">
          Help
        </Text>
      </Link>
      <HStack gap={1}>
        <IconButton
          transparent
          accessibilityLabel="Share"
          name="externalLink"
          onClick={() => {}}
          testID="header-external-link-button"
        />
        <IconButton
          transparent
          accessibilityLabel="Close"
          name="close"
          onClick={() => {}}
          testID="header-close-button"
        />
      </HStack>
    </HStack>
  ),
  end3: (
    <IconButton
      transparent
      accessibilityLabel="Close"
      name="close"
      onClick={() => {}}
      testID="header-close-button"
    />
  ),
  end4: (
    <IconButton
      accessibilityLabel="Close"
      name="close"
      onClick={() => {}}
      testID="header-close-button"
    />
  ),
  endButtons2: (
    <ButtonGroup accessibilityLabel="Group">
      <Button accessibilityLabel="Go Back" variant="secondary">
        Back
      </Button>
      <Button accessibilityLabel="Go Next" variant="primary">
        Next
      </Button>
    </ButtonGroup>
  ),
  endButtons3: (
    <ButtonGroup accessibilityLabel="Group">
      <Button accessibilityLabel="Go Back" variant="secondary">
        Button
      </Button>
      <Button accessibilityLabel="Go Next" variant="primary">
        Button
      </Button>
    </ButtonGroup>
  ),
  endButtonsBlock3: (
    <VStack flexGrow={1}>
      <ButtonGroup block accessibilityLabel="Group">
        <Button accessibilityLabel="Go Back" variant="secondary">
          Button
        </Button>
        <Button accessibilityLabel="Go Next" variant="primary">
          Button
        </Button>
      </ButtonGroup>
    </VStack>
  ),
};

type Story = StoryObj<PageHeaderProps>;

export const InteractiveHeader: Story = {
  render: (args) => <PageHeader {...args} />,
  args: {
    background: 'bg',
    start: 'logoMark2',
    title: 'title1',
    end: 'end2',
  },
};

export const Examples: Story = {
  render: () => (
    <VStack gap={2} left={0} position="absolute" top={0} width="100%">
      <PageHeader
        background="bgPrimaryWash"
        end={exampleProps.end2}
        start={exampleProps.logoMark2}
        styles={shiftEndStyles}
        title={exampleProps.title1}
      />
      <Divider />
      <PageHeader
        background="bgPrimaryWash"
        end={exampleProps.end2}
        styles={shiftEndStyles}
        title={exampleProps.title1}
      />
      <Divider />
      <PageHeader
        background="bgPrimaryWash"
        start={exampleProps.logoMark2}
        title={exampleProps.title1}
      />
      <Divider />
      <PageHeader
        background="bgPrimaryWash"
        end={exampleProps.end2}
        start={exampleProps.logoMark2}
        styles={shiftEndStyles}
        title={exampleProps.intermediary1}
      />
      <Divider />
      <PageHeader
        background="bgPrimaryWash"
        end={exampleProps.end2}
        start={exampleProps.logoMark2}
        styles={shiftEndStyles}
        title={exampleProps.title2}
      />
      <Divider />
      <PageHeader
        background="bg"
        end={exampleProps.end3}
        start={exampleProps.start1}
        styles={{ ...shiftStartStyles, ...shiftEndStyles }}
        title={exampleProps.intermediary1}
      />
      <Divider />
      <PageHeader
        background="bg"
        end={exampleProps.end3}
        start={exampleProps.start1}
        styles={{ ...shiftStartStyles, ...shiftEndStyles }}
        title={exampleProps.title1}
      />
      <Divider />
      <PageHeader
        background="bg"
        end={exampleProps.end3}
        start={exampleProps.start1}
        styles={{ ...shiftStartStyles, ...shiftEndStyles }}
        title={exampleProps.title2}
      />
      <Divider />
      <PageHeader
        background="bg"
        end={exampleProps.end3}
        start={exampleProps.start1}
        styles={{ ...shiftStartStyles, ...shiftEndStyles }}
      />
      <Divider />
      <PageHeader
        background="bgPrimaryWash"
        end={exampleProps.end3}
        styles={shiftEndStyles}
        title="Intermediary Node Text"
      />
      <Divider />
      <PageHeader
        background="bgPrimaryWash"
        end={exampleProps.end2}
        start={exampleProps.logoMark2}
        styles={shiftEndStyles}
        title={exampleProps.intermediary2}
      />
    </VStack>
  ),
  parameters: {
    a11y: {
      config: {
        /**
         * It is expected to include multiple PageHeaders with same landmark in this story
         * @link https://dequeuniversity.com/rules/axe/4.6/landmark-no-duplicate-banner?application=axeAPI
         */
        rules: [
          { id: 'landmark-no-duplicate-banner', enabled: false },
          { id: 'landmark-unique', enabled: false },
        ],
      },
    },
  },
};

export const PageHeaderInErrorEmptyState: Story = {
  render: () => (
    <VStack gap={0} left={0} position="absolute" top={0} width="100%">
      <PageHeader background="bg" position="sticky" start={exampleProps.logoMark2} top="0" />
      <Box background="bgPrimaryWash">
        <VStack
          alignContent="center"
          alignItems="center"
          flexGrow={1}
          flexShrink={1}
          justifyContent="center"
          paddingX={4}
          paddingY={10}
        >
          <HeroSquare name="bigWarning" />
          <Text as="h3" display="block" font="title1">
            You need to X before you Y
          </Text>
          <Text as="sub" font="body" textAlign="center">
            You&apos;ll need to [add funds] before you can [complete this transaction]
          </Text>
        </VStack>
      </Box>
    </VStack>
  ),
};

const PageHeaderInPageRender = () => {
  const { isPhone } = useBreakpoints();
  const setEndButtonMobile = isPhone ? exampleProps.endButtonsBlock3 : exampleProps.endButtons3;

  return (
    <VStack gap={0} left={0} position="absolute" top={0} width="100%">
      <PageHeader
        background="bg"
        end={
          <IconButton
            transparent
            accessibilityLabel="Close"
            name="close"
            testID="header-close-button"
          />
        }
        position="sticky"
        start={exampleProps.start1}
        styles={{
          start: {
            paddingLeft: 'var(--space-1_5)',
          },
          end: {
            paddingRight: 'var(--space-1_5)',
          },
        }}
        title={exampleProps.title3}
        top="0"
      />
      <VStack
        alignContent="center"
        alignItems="center"
        flexGrow={1}
        flexShrink={1}
        height="400px"
        justifyContent="center"
        padding={3}
        style={{ backgroundColor: '#FADADD' }}
      >
        <Text as="h3" display="block" font="title1">
          Primary Content
        </Text>
      </VStack>
      <Box height="500px" style={{ backgroundColor: 'gray' }} />
      <Box height="500px" style={{ backgroundColor: 'orange' }} />
      <PageFooter action={setEndButtonMobile} />
    </VStack>
  );
};

export const PageHeaderInPage: Story = {
  render: () => <PageHeaderInPageRender />,
};

const meta: Meta<PageHeaderProps> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  argTypes: {
    position: {
      table: {
        disable: true,
      },
    },
    top: {
      table: {
        disable: true,
      },
    },
    left: {
      table: {
        disable: true,
      },
    },
    bottom: {
      table: {
        disable: true,
      },
    },
    right: {
      table: {
        disable: true,
      },
    },

    background: {
      control: 'text',
    },
    start: {
      control: 'select',
      options: ['None', 'logoMark1', 'logoMark2', 'start1', 'start2', 'startTitle'],
      mapping: {
        None: null,
        logoMark1: exampleProps.logoMark1,
        logoMark2: exampleProps.logoMark2,
        start1: exampleProps.start1,
        start2: exampleProps.start2,
        startTitle: exampleProps.title1,
      },
    },
    title: {
      control: 'select',
      options: ['None', 'title1', 'title2', 'title3', 'title4', 'intermediary1', 'intermediary2'],
      mapping: {
        None: null,
        title1: exampleProps.title1,
        title2: exampleProps.title2,
        title3: exampleProps.title3,
        title4: (
          <Text as="h3" display="block" font="title1" numberOfLines={1}>
            Very Very Very Very Very Very Very Very Long Long Long Long Long Long Long Long Title
          </Text>
        ),
        intermediary1: exampleProps.intermediary1,
        intermediary2: exampleProps.intermediary2,
      },
    },
    end: {
      control: 'select',
      options: ['None', 'end1', 'end2', 'end3', 'end4'],
      mapping: {
        None: null,
        end1: exampleProps.end1,
        end2: exampleProps.end2,
        end3: exampleProps.end3,
        end4: exampleProps.end4,
      },
    },
  },
};

export default meta;
