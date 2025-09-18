import React from 'react';
import type { Story } from '@storybook/react';

import { Button, ButtonGroup, IconButton } from '../../buttons';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { Icon } from '../../icons';
import { Box, Divider, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { PageFooter, type PageFooterProps } from '../PageFooter';

const exampleProps = {
  start1: (
    <IconButton
      transparent
      accessibilityLabel="Go Back"
      name="backArrow"
      onClick={() => {}}
      testID="header-back-button"
    />
  ),
  end: <Icon active accessibilityLabel="Show info" name="info" size="s" />,
  endButton: <Button accessibilityLabel="Go Next">Next</Button>,
  endButtons: (
    <ButtonGroup accessibilityLabel="Group">
      <Button accessibilityLabel="Cancel" variant="secondary">
        Cancel
      </Button>
      <Button accessibilityLabel="Delete" variant="negative">
        Delete
      </Button>
    </ButtonGroup>
  ),
  endButtons2: (
    <Box display="flex">
      <ButtonGroup block accessibilityLabel="Group2">
        <Button accessibilityLabel="Go Back" variant="secondary">
          Back
        </Button>
        <Button accessibilityLabel="Go Next" variant="primary">
          Next
        </Button>
      </ButtonGroup>
    </Box>
  ),
  endButtonsBlock2: (
    <VStack flexGrow={1} width="100%">
      <ButtonGroup block accessibilityLabel="Group2">
        <Button accessibilityLabel="Go Back" variant="secondary">
          Back
        </Button>
        <Button accessibilityLabel="Go Next" variant="primary">
          Next
        </Button>
      </ButtonGroup>
    </VStack>
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
  intermediary1: (
    <Text as="h1" display="block" font="headline">
      Page Title
    </Text>
  ),
};

const Template: Story<PageFooterProps> = (args) => <PageFooter {...args} />;

export const InteractiveFooter = Template.bind({});

InteractiveFooter.args = {
  background: 'bg',
  action: 'endButtons',
};

export const Examples = () => {
  const { isPhone } = useBreakpoints();
  const setEndButtonMobile = isPhone ? exampleProps.endButtonsBlock2 : exampleProps.endButtons2;

  return (
    <VStack gap={1}>
      <PageFooter action={exampleProps.endButton} background="bgPrimaryWash" />
      <Divider />
      <PageFooter action={exampleProps.endButtons} />
      <Divider />
      <PageFooter action={setEndButtonMobile} />
      <Divider />
    </VStack>
  );
};

Examples.parameters = {
  a11y: {
    config: {
      /**
       * It is expected to include multiple PageFooter with same landmark in this story
       * @link https://dequeuniversity.com/rules/axe/4.6/landmark-no-duplicate-contentinfo?application=axeAPI
       */
      rules: [
        { id: 'landmark-no-duplicate-contentinfo', enabled: false },
        { id: 'landmark-unique', enabled: false },
      ],
    },
  },
};

export const PageFooterInPage = () => {
  const { isPhone } = useBreakpoints();
  const setEndButtonMobile = isPhone ? exampleProps.endButtonsBlock2 : exampleProps.endButtons2;

  return (
    <VStack gap={0} left={0} position="absolute" top={0} width="100%">
      <VStack
        alignContent="center"
        alignItems="center"
        dangerouslySetBackground="#FADADD"
        flexGrow={1}
        flexShrink={1}
        height="400px"
        justifyContent="center"
      >
        <Text as="h3" display="block" font="title1">
          Primary Content
        </Text>
      </VStack>
      <Box dangerouslySetBackground="gray" height="500px" />
      <Box dangerouslySetBackground="orange" height="500px" />
      <PageFooter action={setEndButtonMobile} bottom="0" />
    </VStack>
  );
};

export default {
  title: 'Components/PageFooter',
  component: PageFooter,
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
    action: {
      control: 'select',
      options: ['None', 'endButton', 'endButtons', 'endButtons2', 'endButtonsBlock2'],
      mapping: {
        None: null,
        endButton: exampleProps.endButton,
        endButtons: exampleProps.endButtons,
        endButtons2: exampleProps.endButtons2,
        endButtonsBlock2: exampleProps.endButtonsBlock2,
      },
    },
  },
};
