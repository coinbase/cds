import React from 'react';
import startCase from 'lodash/startCase';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons/Icon';
import { Tag, type TagBaseProps } from '../Tag';

type TagPropConfig = {
  intent: TagBaseProps['intent'][];
  emphasis: TagBaseProps['emphasis'][];
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
  all: [
    ...tagProps.colorScheme.map((scheme) => ({
      intent: 'informational' as const,
      emphasis: 'high' as const,
      colorScheme: scheme,
      children: `${startCase(scheme)} (High Informational)`,
    })),
    ...tagProps.colorScheme.map((scheme) => ({
      intent: 'promotional' as const,
      colorScheme: scheme,
      children: `${startCase(scheme)} (High)`,
    })),
    ...tagProps.colorScheme.map((scheme) => ({
      intent: 'informational' as const,
      colorScheme: scheme,
      children: `${startCase(scheme)} (Low)`,
    })),
    ...tagProps.colorScheme.map((scheme) => ({
      intent: 'promotional' as const,
      emphasis: 'low' as const,
      colorScheme: scheme,
      children: `${startCase(scheme)} (Low Promotional)`,
    })),
  ],
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

const TagScreen = () => {
  return (
    <ExampleScreen>
      {Object.entries(tagStories).map(([key, story]) => (
        <Example key={key} inline title={startCase(key)}>
          {story.map((props, idx) => {
            return <Tag key={`${props.children}-${idx}`} {...props} />;
          })}
        </Example>
      ))}
      <Example inline title="With Icons">
        <Tag colorScheme="blue" startIcon="add">
          Start icon
        </Tag>
        <Tag colorScheme="green" endIcon="add">
          End icon
        </Tag>
        <Tag colorScheme="purple" endIcon="add" startIcon="add">
          Both icons
        </Tag>
        <Tag colorScheme="red" endIcon="add" intent="promotional" startIcon="add">
          Promotional with icons
        </Tag>
      </Example>
      <Example inline title="With Custom Nodes">
        <Tag colorScheme="blue" start={<Icon color="fgNegative" name="add" size="xs" />}>
          Custom start node
        </Tag>
        <Tag colorScheme="green" end={<Icon color="fgPositive" name="add" size="xs" />}>
          Custom end node
        </Tag>
        <Tag
          colorScheme="purple"
          end={<Icon color="fgNegative" name="close" size="xs" />}
          start={<Icon color="fgPositive" name="add" size="xs" />}
        >
          Both custom nodes
        </Tag>
      </Example>
    </ExampleScreen>
  );
};

export default TagScreen;
