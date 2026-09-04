import React, { useState } from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { noop } from '@coinbase/cds-utils';

import { Button } from '../../buttons/Button';
import { CellMedia } from '../../cells';
import { TextInput } from '../../controls';
import type { ExampleProps } from '../../examples/ExampleScreen';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Text } from '../../typography/Text';
import { Accordion, AccordionItem } from '..';

const STEPS = [
  { itemKey: '1', nextKey: '2' },
  { itemKey: '2', nextKey: '3' },
  { itemKey: '3', nextKey: '1' },
];

const handlePress = console.log;

const BasicAccordion = () => {
  return (
    <Accordion defaultActiveKey="2" onChange={handlePress}>
      <AccordionItem
        itemKey="1"
        tertiaryTitle="tertiaryTitle1"
        media={<CellMedia active name="wallet" type="icon" />}
        subtitle="subtitle1"
        title="Accordion #1"
      >
        <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
      </AccordionItem>
      <AccordionItem
        itemKey="2"
        tertiaryTitle="tertiaryTitle2"
        media={<CellMedia active name="wallet" type="icon" />}
        onPress={handlePress}
        subtitle="subtitle2"
        title="Accordion #2"
      >
        <Text font="body">Accordion Content</Text>
      </AccordionItem>
    </Accordion>
  );
};

const NoMedia = () => {
  return (
    <Accordion onChange={handlePress}>
      <AccordionItem itemKey="1" subtitle="subtitle1" title="Accordion #1">
        <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
      </AccordionItem>
      <AccordionItem itemKey="2" onPress={handlePress} subtitle="subtitle2" title="Accordion #2">
        <Text font="body">Accordion Content</Text>
      </AccordionItem>
    </Accordion>
  );
};

const NoSubtitle = () => {
  return (
    <Accordion defaultActiveKey="1" onChange={handlePress}>
      <AccordionItem
        itemKey="1"
        media={<CellMedia active name="wallet" type="icon" />}
        title="Accordion #1"
      >
        <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
      </AccordionItem>
      <AccordionItem
        itemKey="2"
        media={<CellMedia active name="wallet" type="icon" />}
        onPress={handlePress}
        title="Accordion #2"
      >
        <Text font="body">Accordion Content</Text>
      </AccordionItem>
    </Accordion>
  );
};

const SubtitleWithoutTertiaryTitle = () => {
  return (
    <Accordion defaultActiveKey="1" onChange={handlePress}>
      <AccordionItem
        itemKey="1"
        media={<CellMedia active name="wallet" type="icon" />}
        subtitle="subtitle1"
        title="Accordion #1"
      >
        <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
      </AccordionItem>
      <AccordionItem
        itemKey="2"
        media={<CellMedia active name="wallet" type="icon" />}
        onPress={handlePress}
        subtitle="subtitle2"
        title="Accordion #2"
      >
        <Text font="body">Accordion Content</Text>
      </AccordionItem>
    </Accordion>
  );
};

const TitleOnly = () => {
  return (
    <Accordion defaultActiveKey="2" onChange={handlePress}>
      <AccordionItem itemKey="1" title="Accordion #1">
        <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
      </AccordionItem>
      <AccordionItem itemKey="2" onPress={handlePress} title="Accordion #2">
        <Text font="body">Accordion Content</Text>
      </AccordionItem>
    </Accordion>
  );
};

const LongContent = () => {
  return (
    <Accordion defaultActiveKey="2" onChange={handlePress}>
      <AccordionItem itemKey="1" title="Accordion #1">
        <Text font="body">{loremIpsum.repeat(10)}</Text>
      </AccordionItem>
      <AccordionItem itemKey="2" onPress={handlePress} title="Accordion #2">
        <Text font="body">Accordion Content</Text>
      </AccordionItem>
    </Accordion>
  );
};

const AccordionExample = ({ children, title }: ExampleProps) => {
  return (
    <Example padding={0} title={title} titlePadding={{ paddingX: 3, paddingTop: 2 }}>
      {children}
    </Example>
  );
};

const AccordionScreen = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  return (
    <ExampleScreen>
      <AccordionExample title="Basic Accordion">
        <BasicAccordion />
      </AccordionExample>
      <AccordionExample inline title="Long content">
        <LongContent />
      </AccordionExample>
      <AccordionExample inline title="No media + collapsed">
        <NoMedia />
      </AccordionExample>
      <AccordionExample inline title="No subtitle">
        <NoSubtitle />
      </AccordionExample>
      <AccordionExample inline title="Subtitle without tertiary title">
        <SubtitleWithoutTertiaryTitle />
      </AccordionExample>
      <AccordionExample inline title="Title only">
        <TitleOnly />
      </AccordionExample>
      <AccordionExample inline title="Custom Style">
        <Accordion
          defaultActiveKey="2"
          onChange={noop}
          style={{
            paddingHorizontal: 20,
          }}
        >
          <AccordionItem
            itemKey="1"
            media={<CellMedia active name="wallet" type="icon" />}
            subtitle="subtitle1"
            title="Accordion #1"
          >
            <TextInput
              compact
              accessibilityLabel="Text input field"
              label="Amount"
              placeholder="8293323.23"
              suffix="USD"
            />
          </AccordionItem>
          <AccordionItem
            itemKey="2"
            media={<CellMedia active name="wallet" type="icon" />}
            onPress={noop}
            style={{
              paddingHorizontal: 20,
            }}
            subtitle="subtitle2"
            title="Accordion #2"
          >
            <Text font="body">Accordion Content</Text>
          </AccordionItem>
        </Accordion>
      </AccordionExample>
      <AccordionExample title="Nested Buttons">
        <Accordion activeKey={activeKey} setActiveKey={setActiveKey}>
          {STEPS.map(({ itemKey, nextKey }) => (
            <AccordionItem
              key={itemKey}
              itemKey={itemKey}
              media={<CellMedia active name="wallet" type="icon" />}
              title={`Item ${itemKey}`}
            >
              <Button onPress={() => setActiveKey(nextKey)}>
                <Text font="body">Open Item {nextKey}</Text>
              </Button>
            </AccordionItem>
          ))}
        </Accordion>
      </AccordionExample>
    </ExampleScreen>
  );
};

export default AccordionScreen;
