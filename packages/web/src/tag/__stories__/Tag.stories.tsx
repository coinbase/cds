import React from 'react';
import startCase from 'lodash/startCase';

import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { Tag, type TagBaseProps } from '../Tag';

export default {
  title: 'Components/Tag',
  component: Tag,
};

type TagPropConfig = {
  intent: TagBaseProps['intent'][];
  emphasis: NonNullable<TagBaseProps['emphasis']>[];
  colorScheme: TagBaseProps['colorScheme'][];
};
const tagProps: TagPropConfig = {
  intent: ['informational', 'promotional'],
  emphasis: ['high', 'low'],
  colorScheme: ['green', 'purple', 'blue', 'yellow', 'red', 'gray'],
};

const tagMap = tagProps.intent
  .map((intent) => {
    return tagProps.colorScheme.map((colorScheme) => ({
      intent,
      colorScheme,
      children: `${startCase(intent)} ${colorScheme}`,
    }));
  })
  .flat();

const tagStories = {
  default: [{ children: 'Default tag', colorScheme: 'blue' }],
  all: tagMap,
  wildcard: [
    {
      children: 'Atlanta',
      background: 'blue100',
      color: 'red10',
    },
    {
      children: 'Los Angeles',
      intent: 'promotional',
      background: 'yellow30',
      color: 'purple80',
    },
  ],
  truncated: [
    {
      children: 'Truncate this long long tag',
      colorScheme: 'green',
      maxWidth: 150,
    },
    {
      children: "Don't truncate this long long tag",
      colorScheme: 'green',
    },
  ],
} as const;

export const Default = () => <Tag {...tagStories.default[0]} />;

export const All = () => (
  <VStack alignItems="flex-start" flexWrap="nowrap" gap={2} padding={0.5}>
    {tagStories.all.map((props) => (
      <Tag key={`tag-${props.intent}-${props.colorScheme}-${props.children}`} {...props} />
    ))}
  </VStack>
);

export const Emphasis = () => (
  <VStack alignItems="flex-start" gap={2} padding={0.5}>
    <Text font="body">High Emphasis (Promotional colors)</Text>
    <HStack gap={2}>
      {tagProps.colorScheme.map((scheme) => (
        <Tag key={`high-${scheme}`} colorScheme={scheme} emphasis="high">
          {startCase(scheme)}
        </Tag>
      ))}
    </HStack>
    <Text font="body">Low Emphasis (Informational colors)</Text>
    <HStack gap={2}>
      {tagProps.colorScheme.map((scheme) => (
        <Tag key={`low-${scheme}`} colorScheme={scheme} emphasis="low">
          {startCase(scheme)}
        </Tag>
      ))}
    </HStack>
  </VStack>
);

export const Wildcard = () => (
  <VStack alignItems="flex-start" flexWrap="nowrap" gap={2} padding={0.5}>
    {tagStories.wildcard.map((props) => (
      <Tag
        key={`tag-wildcard-${props.children}-${props.background || ''}-${props.color || ''}`}
        {...props}
      />
    ))}
  </VStack>
);

export const Truncated = () => (
  <VStack alignItems="flex-start" flexWrap="nowrap" gap={2} padding={0.5}>
    {tagStories.truncated.map((props) => {
      const keyString = `tag-truncated-${props.children}-${
        'maxWidth' in props ? props.maxWidth : 'full'
      }`;
      return <Tag key={keyString} {...props} />;
    })}
  </VStack>
);

const textStyles = {
  padding: 0,
  margin: 0,
  fontSize: 'var(--fontSize-label1)',
  lineHeight: 'var(--lineHeight-label1)',
  fontWeight: 'var(--fontWeight-label1)',
  fontFamily: 'var(--fontFamily-label1)',
};

export const HtmlTag = () => (
  <div
    style={{
      background: 'rgb(var(--blue0))',
      color: 'rgb(var(--blue60))',
      borderRadius: 4,
      padding: '2px 4px',
    }}
  >
    <span style={textStyles}>HTML tag</span>
  </div>
);
