import React from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { NoopFn as noopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { Banner } from '../Banner';

const shortMessage = 'Lorem ipsum dolar sit amet, consecturo.';
const longMessage = `${loremIpsum.slice(0, 200)}...`;
const label = 'Last updated today at 3:33pm';

const BannerScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Variants">
        <VStack gap={2}>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            title="Warning message"
            variant="warning"
          >
            {shortMessage}
          </Banner>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Informative message"
            variant="informational"
          >
            {shortMessage}
          </Banner>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Promotional message"
            variant="promotional"
          >
            {shortMessage}
          </Banner>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            startIcon="error"
            startIconAccessibilityLabel="Error"
            title="Error message"
            variant="error"
          >
            {shortMessage}
          </Banner>
        </VStack>
      </Example>

      <Example title="Style Variants">
        <VStack gap={2}>
          <Text font="headline">Contextual (default)</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Contextual banner"
            variant="informational"
          >
            Used for messages within a specific context or section
          </Banner>

          <Text font="headline">Inline</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            styleVariant="inline"
            title="Inline banner"
            variant="warning"
          >
            Used for inline messages with reduced visual emphasis
          </Banner>

          <Text font="headline">Global</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            label={label}
            startIcon="error"
            startIconAccessibilityLabel="Error"
            styleVariant="global"
            title="Global banner"
            variant="error"
          >
            Used for system-wide notifications and alerts
          </Banner>
        </VStack>
      </Example>

      <Example title="Dismissible">
        <VStack gap={2}>
          <Text font="headline">Warning with Dismiss</Text>
          <Banner
            showDismiss
            startIconActive
            closeAccessibilityLabel="Close"
            onClose={noopFn}
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            title="Dismissible warning"
            variant="warning"
          >
            This warning can be dismissed by the user
          </Banner>

          <Text font="headline">Promotional with Dismiss</Text>
          <Banner
            showDismiss
            startIconActive
            closeAccessibilityLabel="Close"
            onClose={noopFn}
            startIcon="info"
            startIconAccessibilityLabel="Information"
            styleVariant="inline"
            title="Limited time offer"
            variant="promotional"
          >
            Special promotion that can be dismissed
          </Banner>
        </VStack>
      </Example>

      <Example title="Long Content">
        <VStack gap={2}>
          <Text font="headline">Long Message</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Information with extended content"
            variant="informational"
          >
            {longMessage}
          </Banner>

          <Text font="headline">Long Title</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            startIcon="error"
            startIconAccessibilityLabel="Error"
            title={`Critical error detected: ${longMessage}`}
            variant="error"
          >
            {shortMessage}
          </Banner>

          <Text font="headline">Long Content with Dismiss</Text>
          <Banner
            showDismiss
            startIconActive
            closeAccessibilityLabel="Close"
            onClose={noopFn}
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            title="Detailed warning message"
            variant="warning"
          >
            {longMessage}
          </Banner>
        </VStack>
      </Example>

      <Example title="With Labels">
        <VStack gap={2}>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            label="Version 2.4.1 released"
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Update available"
            variant="informational"
          >
            A new version of the app is available with bug fixes and improvements
          </Banner>

          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            label={label}
            startIcon="error"
            startIconAccessibilityLabel="Error"
            styleVariant="global"
            title="System maintenance"
            variant="error"
          >
            Services will be unavailable during the maintenance window
          </Banner>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default BannerScreen;
