import React from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { NoopFn as noopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Spacer, VStack } from '../../layout';
import { Link } from '../../typography/Link';
import { Text } from '../../typography/Text';
import type { MobileBannerProps } from '../Banner';
import { Banner } from '../Banner';

const primaryAction = <Link to="https://www.coinbase.com">Primary</Link>;
const secondaryAction = <Link to="https://www.coinbase.com">Secondary</Link>;
const shortMessage = 'Lorem ipsum dolar sit amet, consecturo.';
const longMessage = `${loremIpsum}${loremIpsum}${loremIpsum}${loremIpsum}${loremIpsum}`;
const label = 'Last updated today at 3:33pm';

type ExampleProps = Pick<
  MobileBannerProps,
  | 'title'
  | 'children'
  | 'marginX'
  | 'startIcon'
  | 'startIconActive'
  | 'startIconAccessibilityLabel'
  | 'closeAccessibilityLabel'
>;

const exampleProps: ExampleProps = {
  title: 'Failure Message',
  startIcon: 'error',
  startIconActive: true,
  startIconAccessibilityLabel: 'Error',
  closeAccessibilityLabel: 'Close',
};

const examplePropsWithOffset: ExampleProps = {
  ...exampleProps,
  marginX: -2,
  children: 'Lorem ipsum dolar sit amet',
};

const borderRadiusValues = [0, 200, 400] as const;

const styleProps: MobileBannerProps[] = [
  {
    variant: 'warning',
    title: 'Warning message',
    startIcon: 'warning',
    startIconActive: true,
    children: shortMessage,
    startIconAccessibilityLabel: 'Warning',
    closeAccessibilityLabel: 'Close',
  },
  {
    variant: 'informational',
    title: 'Informative message',
    startIcon: 'info',
    startIconActive: true,
    children: shortMessage,
    startIconAccessibilityLabel: 'Information',
    closeAccessibilityLabel: 'Close',
  },
  {
    variant: 'promotional',
    title: 'Promotional message',
    startIcon: 'info',
    startIconActive: true,
    children: shortMessage,
    startIconAccessibilityLabel: 'Information',
    closeAccessibilityLabel: 'Close',
  },
  {
    variant: 'error',
    title: 'Error message',
    startIcon: 'error',
    startIconActive: true,
    children: shortMessage,
    startIconAccessibilityLabel: 'Error',
    closeAccessibilityLabel: 'Close',
  },
];

const Banners = ({ title, props }: { title: string; props: MobileBannerProps }) => {
  return (
    <VStack gap={2}>
      <Text font="title1">{title}</Text>
      <Banner {...props} />
      <Text font="title1">{title} with showDismiss</Text>
      <Banner {...props} showDismiss onClose={noopFn} title={`${title} with showDismiss`} />
      <Text font="title1">{title} with Action</Text>
      <Banner {...props} primaryAction={primaryAction} />
      <Text font="title1">{title} with multiple Actions</Text>
      <Banner {...props} primaryAction={primaryAction} secondaryAction={secondaryAction} />
      <Text font="title1">Primary Action is not a Link</Text>
      <Banner {...props} primaryAction={<Button compact>Primary Action</Button>} />
      <Text font="title1">Secondary Action is not a Link</Text>
      <Banner {...props} secondaryAction={<Button compact>Secondary Action</Button>} />
      <Text font="title1">{title} Long Text with Action</Text>
      <Banner
        {...props}
        primaryAction={primaryAction}
        title={`${title} Long Text with Action. ${longMessage}`}
      >
        {longMessage}
      </Banner>
      <Text font="title1">{title} with Action and showDismiss</Text>
      <Banner
        {...props}
        showDismiss
        onClose={noopFn}
        primaryAction={primaryAction}
        title={`${title} with Action and showDismiss`}
      />
      <Text font="title1">{title} Long Text and showDismiss</Text>
      <Banner
        {...props}
        showDismiss
        onClose={noopFn}
        title={`${title} Long Text and showDismiss. ${longMessage}`}
      >
        {longMessage}
      </Banner>
      <Text font="title1">{title} Long Text with Action and showDismiss</Text>
      <Banner
        {...props}
        showDismiss
        onClose={noopFn}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        title={`${title} Long Text with Action and showDismiss. ${longMessage}`}
      >
        {longMessage}
      </Banner>
    </VStack>
  );
};

const All = () => {
  return (
    <VStack gap={2}>
      {styleProps.map((props) => {
        return (
          <VStack key={`styles-${props.variant}`} gap={2}>
            <Banners props={props} title={`Contextual ${props.variant}`} />
            <Banners
              props={{ ...props, styleVariant: 'inline' }}
              title={`Inline ${props.variant}`}
            />
            <Banners
              props={{ ...props, label, styleVariant: 'global' }}
              title={`Global ${props.variant}`}
            />
          </VStack>
        );
      })}
    </VStack>
  );
};

const BannerScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Banners">
        <All />
      </Example>
      <Example title="With Link">
        <VStack gap={2}>
          <Text font="title1">Global</Text>
          <Banner
            showDismiss
            startIconActive
            closeAccessibilityLabel="Close"
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            startIcon="error"
            startIconAccessibilityLabel="Error"
            styleVariant="global"
            title={`Global ${shortMessage}`}
            variant="error"
          >
            <Text font="label2">
              {shortMessage}
              <Link to="https://www.coinbase.com"> Learn more</Link>
            </Text>
          </Banner>
          <Text font="title1">Inline</Text>
          <Banner
            showDismiss
            startIconActive
            closeAccessibilityLabel="Close"
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            styleVariant="inline"
            title={`Inline ${shortMessage}`}
            variant="warning"
          >
            <Link font="label2" to="https://www.coinbase.com">
              Learn more
            </Link>
          </Banner>
          <Text font="title1">Contextual</Text>
          <Banner
            showDismiss
            startIconActive
            closeAccessibilityLabel="Close"
            label={label}
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            startIcon="info"
            startIconAccessibilityLabel="Information"
            variant="promotional"
          >
            <Text font="label2">
              {shortMessage}
              <Link to="https://www.coinbase.com"> Learn more</Link>
            </Text>
          </Banner>
        </VStack>
      </Example>
      <Example title="Custom Offset">
        <VStack gap={2}>
          <Spacer />
          <Text font="title1">Global</Text>
          <Banner
            {...examplePropsWithOffset}
            showDismiss
            startIconAccessibilityLabel="Information"
            styleVariant="global"
            variant="informational"
          />
          <Banner
            {...examplePropsWithOffset}
            showDismiss
            startIconAccessibilityLabel="Information"
            styleVariant="global"
            variant="promotional"
          />
          <Banner
            {...examplePropsWithOffset}
            startIconActive
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            styleVariant="global"
            variant="warning"
          />

          <Banner {...examplePropsWithOffset} styleVariant="global" variant="error" />
          <Spacer />
          <Text font="title1">Inline</Text>
          <Banner
            {...examplePropsWithOffset}
            showDismiss
            startIconAccessibilityLabel="Information"
            styleVariant="inline"
            variant="informational"
          />
          <Banner
            {...examplePropsWithOffset}
            showDismiss
            startIconAccessibilityLabel="Information"
            styleVariant="inline"
            variant="promotional"
          />
          <Banner
            {...examplePropsWithOffset}
            startIconActive
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            styleVariant="inline"
            variant="warning"
          />
          <Banner {...examplePropsWithOffset} styleVariant="inline" variant="error" />
        </VStack>
      </Example>
      <Example>
        <Text font="title1">Vertical Align</Text>
        <VStack gap={2}>
          <Banner
            {...exampleProps}
            alignItems="center"
            startIconAccessibilityLabel="Information"
            title={undefined}
            variant="informational"
          >
            {examplePropsWithOffset.children}
          </Banner>
          <Banner
            {...exampleProps}
            showDismiss
            alignItems="center"
            startIconAccessibilityLabel="Information"
            title={undefined}
            variant="promotional"
          >
            {examplePropsWithOffset.children}
          </Banner>
          <Banner {...exampleProps} alignItems="center" variant="error" />
          <Banner
            {...exampleProps}
            showDismiss
            startIconActive
            alignItems="center"
            startIcon="warning"
            startIconAccessibilityLabel="Warning"
            variant="warning"
          />
        </VStack>
      </Example>
      <Example title="Border Radius">
        <VStack gap={2}>
          <Text font="title1">Contextual</Text>
          <VStack gap={2}>
            {borderRadiusValues.map((radius) => (
              <Banner
                key={`mobile-contextual-${radius}`}
                {...exampleProps}
                borderRadius={radius}
                title={`Contextual radius ${radius}`}
                variant="informational"
              >
                {shortMessage}
              </Banner>
            ))}
          </VStack>
          <Text font="title1">Inline</Text>
          <VStack gap={2}>
            {borderRadiusValues.map((radius) => (
              <Banner
                key={`mobile-inline-${radius}`}
                {...exampleProps}
                borderRadius={radius}
                styleVariant="inline"
                title={`Inline radius ${radius}`}
                variant="informational"
              >
                {shortMessage}
              </Banner>
            ))}
          </VStack>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default BannerScreen;
