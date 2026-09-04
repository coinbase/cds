import React from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';

import { Button } from '../../buttons';
import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { Link } from '../../typography/Link';
import { Text } from '../../typography/Text';
import type { BannerProps } from '../Banner';
import { Banner } from '../Banner';

const primaryAction = <Link href="https://www.coinbase.com">Primary</Link>;
const secondaryAction = <Link href="https://www.coinbase.com">Secondary</Link>;
const shortMessage = 'Lorem ipsum dolar sit amet, consecturo.';
const longMessage = `${loremIpsum}${loremIpsum}${loremIpsum}${loremIpsum}${loremIpsum}`;
const label = 'Last updated today at 3:33pm';

type ExampleProps = Pick<
  BannerProps,
  | 'title'
  | 'children'
  | 'marginX'
  | 'startIcon'
  | 'startIconActive'
  | 'startIconAccessibilityLabel'
  | 'closeAccessibilityLabel'
  | 'width'
>;

const exampleProps: ExampleProps = {
  title: 'Failure Message',
  startIcon: 'error',
  startIconActive: true,
  startIconAccessibilityLabel: 'Error',
  closeAccessibilityLabel: 'Close',
};

const examplePropsWithMargin: ExampleProps = {
  ...exampleProps,
  marginX: -2,
  children: shortMessage,
  width: 'calc(100% + var(--space-4))',
};

const styleProps: BannerProps[] = [
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

const Banners = ({ title, props }: { title: string; props: BannerProps }) => {
  return (
    <>
      <Text as="h1" display="block" font="title1">
        {title}
      </Text>
      <Banner {...props} />
      <Text as="h1" display="block" font="title1">
        {title} with wrapping Box
      </Text>

      <Box background="bgPositiveWash" height={300}>
        <Banner {...props} />
      </Box>
      <Text as="h1" display="block" font="title1">
        {title} with wrapping VStack
      </Text>

      <VStack background="bgPositiveWash" gap={2} height={300}>
        <Banner {...props} />
        <Banner {...props} />
      </VStack>
      <Text as="h1" display="block" font="title1">
        {title} with wrapping HStack
      </Text>

      <Box background="bgPositiveWash" gap={2} height={300}>
        <Banner {...props} />
        <Banner {...props} />
      </Box>
      <Text as="h1" display="block" font="title1">
        {title} with showDismiss
      </Text>
      <Banner {...props} showDismiss onClose={() => {}} title={`${title} with showDismiss`} />
      <Text as="h1" display="block" font="title1">
        {title} with showDismiss and wrapping Box
      </Text>

      <Box background="bgPositiveWash" height={300}>
        <Banner {...props} showDismiss onClose={() => {}} title={`${title} with showDismiss`} />
      </Box>
      <Text as="h1" display="block" font="title1">
        {title} with showDismiss and wrapping VStack
      </Text>
      <VStack background="bgPositiveWash" gap={2} height={300}>
        <Banner {...props} showDismiss onClose={() => {}} title={`${title} with showDismiss`} />
        <Banner {...props} showDismiss onClose={() => {}} title={`${title} with showDismiss`} />
      </VStack>

      <Text as="h1" display="block" font="title1">
        {title} with showDismiss and wrapping HStack
      </Text>
      <Box background="bgPositiveWash" gap={2} height={300}>
        <Banner {...props} showDismiss onClose={() => {}} title={`${title} with showDismiss`} />
        <Banner {...props} showDismiss onClose={() => {}} title={`${title} with showDismiss`} />
      </Box>

      <Text as="h1" display="block" font="title1">
        {title} with Action
      </Text>
      <Banner {...props} primaryAction={primaryAction} />
      <Text as="h1" display="block" font="title1">
        {title} with multiple Actions
      </Text>
      <Banner {...props} primaryAction={primaryAction} secondaryAction={secondaryAction} />
      <Text as="h1" display="block" font="title1">
        Primary Action is not a Link
      </Text>
      <Banner {...props} primaryAction={<Button compact>Primary Action</Button>} />
      <Text as="h1" display="block" font="title1">
        Secondary Action is not a Link
      </Text>
      <Banner {...props} secondaryAction={<Button compact>Secondary Action</Button>} />
      <Text as="h1" display="block" font="title1">
        {title} Long Text with Action
      </Text>
      <Banner
        {...props}
        primaryAction={primaryAction}
        title={`${title} Long Text with Action. ${longMessage}`}
      >
        {longMessage}
      </Banner>
      <Text as="h1" display="block" font="title1">
        {title} with Action and showDismiss
      </Text>
      <Banner
        {...props}
        showDismiss
        onClose={() => {}}
        primaryAction={primaryAction}
        title={`${title} with Action and showDismiss`}
      />
      <Text as="h1" display="block" font="title1">
        {title} Long Text and showDismiss
      </Text>
      <Banner
        {...props}
        showDismiss
        onClose={() => {}}
        title={`${title} Long Text and showDismiss. ${longMessage}`}
      >
        {longMessage}
      </Banner>
      <Text as="h1" display="block" font="title1">
        {title} Long Text with Action and showDismiss
      </Text>
      <Banner
        {...props}
        showDismiss
        onClose={() => {}}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        title={`${title} Long Text with Action and showDismiss. ${longMessage}`}
      >
        {longMessage}
      </Banner>
    </>
  );
};

export const All = () => {
  return (
    <VStack gap={2}>
      {styleProps.map((props) => (
        <VStack key={`styles-${props.variant}`} gap={2}>
          <Banners props={props} title={`Contextual ${props.variant}`} />
          <Banners props={{ ...props, styleVariant: 'inline' }} title={`Inline ${props.variant}`} />
          <Banners
            props={{ ...props, label, styleVariant: 'global' }}
            title={`Global ${props.variant}`}
          />
        </VStack>
      ))}
    </VStack>
  );
};

export const BannerWithLink = () => {
  return (
    <VStack gap={2}>
      <Text as="h1" display="block" font="title1">
        Global
      </Text>
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
        <Text as="p" display="block" font="label2">
          {shortMessage} <Link href="https://www.coinbase.com">Learn more</Link>
        </Text>
      </Banner>
      <Text as="h1" display="block" font="title1">
        Inline
      </Text>
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
        <Link font="label2" href="https://www.coinbase.com">
          Learn more
        </Link>
      </Banner>
      <Text as="h1" display="block" font="title1">
        Contextual
      </Text>
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
        <Text as="p" display="block" font="label2">
          {shortMessage} <Link href="https://www.coinbase.com">Learn more</Link>
        </Text>
      </Banner>
    </VStack>
  );
};

export const CustomMargin = () => {
  return (
    <VStack gap={2} paddingX={2}>
      <Text as="h1" display="block" font="title1">
        Global
      </Text>
      <Banner
        {...examplePropsWithMargin}
        showDismiss
        startIconAccessibilityLabel="Information"
        styleVariant="global"
        title="Global informational Message"
        variant="informational"
      />
      <Banner
        {...examplePropsWithMargin}
        showDismiss
        startIconAccessibilityLabel="Information"
        styleVariant="global"
        title="Global promotional Message"
        variant="promotional"
      />
      <Banner
        {...examplePropsWithMargin}
        startIconActive
        startIcon="warning"
        startIconAccessibilityLabel="Warning"
        styleVariant="global"
        variant="warning"
      />
      <Banner {...examplePropsWithMargin} styleVariant="global" variant="error" />
      <Text as="h1" display="block" font="title1">
        Inline
      </Text>
      <Banner
        {...examplePropsWithMargin}
        showDismiss
        startIconAccessibilityLabel="Information"
        styleVariant="inline"
        title="Inline informational Message"
        variant="informational"
      />
      <Banner
        {...examplePropsWithMargin}
        showDismiss
        startIconAccessibilityLabel="Information"
        styleVariant="inline"
        title="Inline promotional Message"
        variant="promotional"
      />
      <Banner
        {...examplePropsWithMargin}
        startIconActive
        startIcon="warning"
        startIconAccessibilityLabel="Warning"
        styleVariant="inline"
        variant="warning"
      />
      <Banner {...examplePropsWithMargin} styleVariant="inline" variant="error" />
    </VStack>
  );
};

const borderRadiusValues = [0, 200, 400] as const;

export const BorderRadiusExamples = () => {
  return (
    <VStack gap={2}>
      <Text as="h1" display="block" font="title1">
        Contextual
      </Text>
      <VStack gap={2}>
        {borderRadiusValues.map((radius) => (
          <Banner
            key={`contextual-${radius}`}
            {...exampleProps}
            borderRadius={radius}
            title={`Contextual radius ${radius}`}
            variant="informational"
          >
            {shortMessage}
          </Banner>
        ))}
      </VStack>
      <Text as="h1" display="block" font="title1">
        Inline
      </Text>
      <VStack gap={2}>
        {borderRadiusValues.map((radius) => (
          <Banner
            key={`inline-${radius}`}
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
  );
};

export const CustomAlignment = () => {
  return (
    <VStack gap={2}>
      <Text as="h1" display="block" font="title1">
        Vertical Align
      </Text>
      <Banner
        {...exampleProps}
        alignItems="center"
        startIconAccessibilityLabel="Information"
        variant="informational"
      />
      <Banner
        {...exampleProps}
        showDismiss
        alignItems="center"
        startIconAccessibilityLabel="Information"
        title="Promotional Message"
        variant="promotional"
      />
      <Banner
        {...exampleProps}
        alignItems={{
          base: 'flex-start',
          tablet: 'center',
          desktop: 'center',
        }}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        variant="error"
      />
      <Banner
        {...exampleProps}
        showDismiss
        startIconActive
        alignItems={{
          base: 'flex-start',
          tablet: 'center',
          desktop: 'center',
        }}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        startIcon="warning"
        startIconAccessibilityLabel="Warning"
        title="Warning Message"
        variant="warning"
      />
    </VStack>
  );
};

export default {
  component: Banner,
  title: 'Components/Banner',
};
