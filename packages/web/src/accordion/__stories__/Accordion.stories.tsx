import React, { useMemo, useState } from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { noop } from '@coinbase/cds-utils';

import { Button } from '../../buttons/Button';
import { CellMedia } from '../../cells/CellMedia';
import { TextInput } from '../../controls/TextInput';
import { Text } from '../../typography/Text';
import { Accordion, AccordionItem } from '..';

export default {
  component: Accordion,
  title: 'Components/Accordion',
};

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
        onClick={handlePress}
        subtitle="subtitle2"
        title="Accordion #2"
      >
        <Text as="p" display="block" font="body">
          Accordion Content
        </Text>
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
      <AccordionItem itemKey="2" onClick={handlePress} subtitle="subtitle2" title="Accordion #2">
        <Text as="p" display="block" font="body">
          Accordion Content
        </Text>
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
        onClick={handlePress}
        title="Accordion #2"
      >
        <Text as="p" display="block" font="body">
          Accordion Content
        </Text>
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
        onClick={handlePress}
        subtitle="subtitle2"
        title="Accordion #2"
      >
        <Text as="p" display="block" font="body">
          Accordion Content
        </Text>
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
      <AccordionItem itemKey="2" onClick={handlePress} title="Accordion #2">
        <Text as="p" display="block" font="body">
          Accordion Content
        </Text>
      </AccordionItem>
    </Accordion>
  );
};

const LongContent = () => {
  return (
    <Accordion defaultActiveKey="2" onChange={handlePress}>
      <AccordionItem itemKey="1" title="Accordion #1">
        <Text as="p" display="block" font="body">
          {loremIpsum.repeat(10)}
        </Text>
      </AccordionItem>
      <AccordionItem itemKey="2" onClick={handlePress} title="Accordion #2">
        <Text as="p" display="block" font="body">
          Accordion Content
        </Text>
      </AccordionItem>
    </Accordion>
  );
};

const CustomStyle = () => {
  const customStyle = useMemo(
    () => ({
      paddingLeft: '20px',
      paddingRight: '20px',
    }),
    [],
  );
  return (
    <Accordion defaultActiveKey="2" onChange={noop} style={customStyle}>
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
        onClick={noop}
        style={customStyle}
        subtitle="subtitle2"
        title="Accordion #2"
      >
        <Text as="p" display="block" font="body">
          Accordion Content
        </Text>
      </AccordionItem>
    </Accordion>
  );
};

export const NestedButtons = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  return (
    <Accordion activeKey={activeKey} setActiveKey={setActiveKey}>
      {STEPS.map(({ itemKey, nextKey }) => (
        <AccordionItem
          key={itemKey}
          itemKey={itemKey}
          media={<CellMedia active name="wallet" type="icon" />}
          title={`Item ${itemKey}`}
        >
          <Button onClick={() => setActiveKey(nextKey)}>
            <Text color="fgInverse" font="body">
              Open Item {nextKey}
            </Text>
          </Button>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
export {
  BasicAccordion,
  CustomStyle,
  LongContent,
  NoMedia,
  NoSubtitle,
  SubtitleWithoutTertiaryTitle,
  TitleOnly,
};
