import React from 'react';
import { NoopFn as noopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { Link } from '../../typography/Link';
import { Text } from '../../typography/Text';
import { Banner } from '../Banner';

const primaryAction = <Link to="https://www.coinbase.com">Primary</Link>;
const secondaryAction = <Link to="https://www.coinbase.com">Secondary</Link>;
const shortMessage = 'Lorem ipsum dolar sit amet, consecturo.';

const BannerActionsScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Primary Actions">
        <VStack gap={2}>
          <Text font="headline">Link as Primary Action</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            primaryAction={primaryAction}
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Info with link action"
            variant="informational"
          >
            {shortMessage}
          </Banner>

          <Text font="headline">Button as Primary Action</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            primaryAction={<Button compact>Get Started</Button>}
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Promo with button action"
            variant="promotional"
          >
            {shortMessage}
          </Banner>

          <Text font="headline">Custom Button Variants</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            primaryAction={
              <Button compact variant="negative">
                Fix Now
              </Button>
            }
            startIcon="error"
            startIconAccessibilityLabel="Error"
            title="Error with action"
            variant="error"
          >
            Critical issue requires immediate action
          </Banner>
        </VStack>
      </Example>

      <Example title="Multiple Actions">
        <VStack gap={2}>
          <Text font="headline">Primary and Secondary Links</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            title="Warning with two actions"
            variant="warning"
          >
            {shortMessage}
          </Banner>

          <Text font="headline">Mixed Action Types</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            primaryAction={
              <Button compact variant="positive">
                Claim Offer
              </Button>
            }
            secondaryAction={<Link to="https://www.coinbase.com">Learn More</Link>}
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Special offer"
            variant="promotional"
          >
            Limited time promotion available
          </Banner>

          <Text font="headline">Button Actions Only</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            primaryAction={<Button compact>Accept</Button>}
            secondaryAction={
              <Button compact variant="secondary">
                Decline
              </Button>
            }
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Choose your action"
            variant="informational"
          >
            Make your selection below
          </Banner>
        </VStack>
      </Example>

      <Example title="Actions with Dismiss">
        <VStack gap={2}>
          <Text font="headline">Single Action with Dismiss</Text>
          <Banner
            showDismiss
            startIconActive
            closeAccessibilityLabel="Close"
            onClose={noopFn}
            primaryAction={<Link to="https://www.coinbase.com">Try Now</Link>}
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="New feature available"
            variant="promotional"
          >
            Explore our latest features
          </Banner>

          <Text font="headline">Multiple Actions with Dismiss</Text>
          <Banner
            showDismiss
            startIconActive
            closeAccessibilityLabel="Close"
            onClose={noopFn}
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            title="Action required"
            variant="warning"
          >
            Complete your profile to continue
          </Banner>
        </VStack>
      </Example>

      <Example title="Inline Links">
        <VStack gap={2}>
          <Text font="headline">Link in Content</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Learn more about our services"
            variant="informational"
          >
            <Text font="label2">
              Discover new features and updates.{' '}
              <Link to="https://www.coinbase.com">Read more</Link> about the latest improvements.
            </Text>
          </Banner>

          <Text font="headline">Multiple Links in Content</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            startIcon="info"
            startIconAccessibilityLabel="Information"
            title="Resources available"
            variant="promotional"
          >
            <Text font="label2">
              Check our <Link to="https://www.coinbase.com">documentation</Link> or visit the{' '}
              <Link to="https://www.coinbase.com">help center</Link> for assistance.
            </Text>
          </Banner>

          <Text font="headline">Link with Actions</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            primaryAction={
              <Button compact variant="negative">
                Get Updates
              </Button>
            }
            startIcon="error"
            startIconAccessibilityLabel="Error"
            styleVariant="global"
            title="Service disruption"
            variant="error"
          >
            <Text font="label2">
              Some services are currently unavailable.{' '}
              <Link to="https://www.coinbase.com">View status page</Link> for details.
            </Text>
          </Banner>
        </VStack>
      </Example>

      <Example title="Style Variants with Actions">
        <VStack gap={2}>
          <Text font="headline">Inline with Actions</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            primaryAction={primaryAction}
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            styleVariant="inline"
            title="Inline warning"
            variant="warning"
          >
            Compact inline style with action
          </Banner>

          <Text font="headline">Global with Actions</Text>
          <Banner
            startIconActive
            closeAccessibilityLabel="Close"
            label="Critical"
            primaryAction={<Link to="https://www.coinbase.com">View Details</Link>}
            secondaryAction={<Link to="https://www.coinbase.com">Contact Support</Link>}
            startIcon="error"
            startIconAccessibilityLabel="Error"
            styleVariant="global"
            title="System alert"
            variant="error"
          >
            System-wide message with multiple actions
          </Banner>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default BannerActionsScreen;
