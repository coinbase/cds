import React from 'react';
import { NoopFn as noopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Spacer, VStack } from '../../layout';
import { Link } from '../../typography/Link';
import { Text } from '../../typography/Text';
import { Banner } from '../Banner';

const shortMessage = 'Lorem ipsum dolar sit amet';
const borderRadiusValues = [0, 200, 400] as const;

const BannerLayoutScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Custom Margins">
        <VStack gap={2}>
          <Text font="headline">Negative Margin Offset</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            marginX={-2}
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Custom offset banner"
            variant="informational"
          >
            {shortMessage}
          </Banner>

          <Text font="headline">Custom Margins - Inline</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            marginX={-2}
            startIcon="info"
            startIconAccessibilityLabel="Information"
            styleVariant="inline"
            title="Inline with offset"
            variant="promotional"
          >
            {shortMessage}
          </Banner>

          <Text font="headline">Custom Margins - Global</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            marginX={-2}
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            styleVariant="global"
            title="Global with offset"
            variant="warning"
          >
            {shortMessage}
          </Banner>

          <Text font="headline">With Dismiss and Offset</Text>
          <Banner
            showDismiss
            startIconActive
            closeAccessibilityLabel="Close"
            marginX={-2}
            onClose={noopFn}
            startIcon="error"
            startIconAccessibilityLabel="Error"
            title="Error with custom margin"
            variant="error"
          >
            {shortMessage}
          </Banner>
        </VStack>
      </Example>

      <Example title="Vertical Alignment">
        <VStack gap={2}>
          <Text font="headline">Center Aligned Content</Text>
          <Banner
            startIconActive
            alignItems="center"
            closeAccessibilityLabel="Close"
            startIcon="info"
            startIconAccessibilityLabel="Information"
            variant="informational"
          >
            Center aligned content without title
          </Banner>

          <Banner
            startIconActive
            alignItems="center"
            closeAccessibilityLabel="Close"
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Center aligned with title"
            variant="promotional"
          >
            {shortMessage}
          </Banner>

          <Text font="headline">Center Aligned with Dismiss</Text>
          <Banner
            showDismiss
            startIconActive
            alignItems="center"
            closeAccessibilityLabel="Close"
            onClose={noopFn}
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            title="Centered dismissible banner"
            variant="warning"
          >
            Content is vertically centered
          </Banner>

          <Text font="headline">Center Aligned with Actions</Text>
          <Banner
            startIconActive
            alignItems="center"
            closeAccessibilityLabel="Close"
            primaryAction={<Link to="https://www.coinbase.com">Action</Link>}
            startIcon="error"
            startIconAccessibilityLabel="Error"
            variant="error"
          >
            Centered content with action button
          </Banner>
        </VStack>
      </Example>

      <Example title="Border Radius">
        <VStack gap={2}>
          <Text font="headline">Contextual Style</Text>
          <VStack gap={1}>
            {borderRadiusValues.map((radius) => (
              <Banner
                key={`contextual-${radius}`}
                startIconActive
                borderRadius={radius}
                closeAccessibilityLabel="Close"
                startIcon="info"
                startIconAccessibilityLabel="Information"
                title={`Border radius: ${radius}`}
                variant="informational"
              >
                {shortMessage}
              </Banner>
            ))}
          </VStack>

          <Spacer />

          <Text font="headline">Inline Style</Text>
          <VStack gap={1}>
            {borderRadiusValues.map((radius) => (
              <Banner
                key={`inline-${radius}`}
                startIconActive
                borderRadius={radius}
                closeAccessibilityLabel="Close"
                startIcon="warning"
                startIconAccessibilityLabel="Warning"
                styleVariant="inline"
                title={`Border radius: ${radius}`}
                variant="warning"
              >
                {shortMessage}
              </Banner>
            ))}
          </VStack>

          <Spacer />

          <Text font="headline">With Dismiss</Text>
          <Banner
            showDismiss
            startIconActive
            borderRadius={100}
            closeAccessibilityLabel="Close"
            onClose={noopFn}
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Custom border radius"
            variant="promotional"
          >
            Banner with 100px border radius and dismiss button
          </Banner>
        </VStack>
      </Example>

      <Example title="Labels">
        <VStack gap={2}>
          <Text font="headline">With Timestamp</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            label="Last updated today at 3:33pm"
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Update notification"
            variant="informational"
          >
            System update completed successfully
          </Banner>

          <Text font="headline">With Status Label</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            label="Expires in 2 days"
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Limited time offer"
            variant="promotional"
          >
            Special promotion for selected users
          </Banner>

          <Text font="headline">Global with Label</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            label="Scheduled: Tonight 2-4 AM"
            startIcon="error"
            startIconAccessibilityLabel="Error"
            styleVariant="global"
            title="System maintenance"
            variant="error"
          >
            Services will be temporarily unavailable
          </Banner>

          <Text font="headline">Label with Actions</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            label="Deadline: December 31"
            primaryAction={<Link to="https://www.coinbase.com">Complete Now</Link>}
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            title="Action required"
            variant="warning"
          >
            Please complete your verification
          </Banner>
        </VStack>
      </Example>

      <Example title="Complex Layouts">
        <VStack gap={2}>
          <Text font="headline">All Features Combined</Text>
          <Banner
            showDismiss
            startIconActive
            alignItems="center"
            borderRadius={200}
            closeAccessibilityLabel="Close"
            label="Priority: High"
            marginX={-2}
            onClose={noopFn}
            primaryAction={<Link to="https://www.coinbase.com">View Details</Link>}
            secondaryAction={<Link to="https://www.coinbase.com">Contact Support</Link>}
            startIcon="error"
            startIconAccessibilityLabel="Error"
            styleVariant="global"
            title="Critical system alert"
            variant="error"
          >
            <Text font="label2">
              System issues detected. <Link to="https://www.coinbase.com">Learn more</Link> about
              the current status.
            </Text>
          </Banner>

          <Text font="headline">Inline Complex</Text>
          <Banner
            startIconActive
            borderRadius={100}
            closeAccessibilityLabel="Close"
            label="Beta"
            primaryAction={<Link to="https://www.coinbase.com">Try It</Link>}
            startIcon="info"
            startIconAccessibilityLabel="Information"
            styleVariant="inline"
            title="New feature"
            variant="promotional"
          >
            Experience our latest features before general release
          </Banner>
        </VStack>
      </Example>

      <Example title="Without Title">
        <VStack gap={2}>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            startIcon="info"
            startIconAccessibilityLabel="Information"
            variant="informational"
          >
            Simple message without a title
          </Banner>

          <Banner
            showDismiss
            startIconActive
            closeAccessibilityLabel="Close"
            onClose={noopFn}
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            styleVariant="inline"
            variant="warning"
          >
            Inline warning without title but with dismiss
          </Banner>

          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            primaryAction={<Link to="https://www.coinbase.com">Learn More</Link>}
            startIcon="info"
            startIconAccessibilityLabel="Information"
            variant="promotional"
          >
            No title but includes an action
          </Banner>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default BannerLayoutScreen;
