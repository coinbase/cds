import React, { useCallback, useState } from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';

import { Button } from '../../buttons';
import { DotCount } from '../../dots';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { Text } from '../../typography/Text';
import { Collapsible } from '../Collapsible';

const BasicCollapsible = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    [setCollapsed],
  );

  return (
    <>
      <Button disableDebounce onPress={toggleCollapsed}>
        Click me!
      </Button>
      <Collapsible collapsed={collapsed}>
        <Text font="body">{loremIpsum}</Text>
      </Collapsible>
    </>
  );
};

const RevealTop = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    [setCollapsed],
  );

  return (
    <>
      <Collapsible collapsed={collapsed}>
        <Text font="body">{loremIpsum}</Text>
      </Collapsible>
      <Button disableDebounce onPress={toggleCollapsed}>
        Click me!
      </Button>
    </>
  );
};

const DefaultExpanded = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    [setCollapsed],
  );

  return (
    <>
      <Button disableDebounce onPress={toggleCollapsed}>
        Click me!
      </Button>
      <Collapsible collapsed={collapsed}>
        <Text font="body">{loremIpsum}</Text>
      </Collapsible>
    </>
  );
};

const Scroll = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    [setCollapsed],
  );

  return (
    <>
      <Button disableDebounce onPress={toggleCollapsed}>
        Click me!
      </Button>
      <Collapsible collapsed={collapsed} maxHeight={400}>
        <Text font="body">{loremIpsum.repeat(10)}</Text>
      </Collapsible>
    </>
  );
};

const Horizontal = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    [setCollapsed],
  );

  return (
    <HStack alignItems="center">
      <Button disableDebounce onPress={toggleCollapsed}>
        Click me!
      </Button>
      <Collapsible collapsed={collapsed} direction="horizontal" maxHeight={400}>
        <DotCount count={100} />
        <DotCount count={1} />
        <DotCount count={99} />
      </Collapsible>
    </HStack>
  );
};

const CollapseScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Basic Collapsible">
        <BasicCollapsible />
      </Example>
      <Example inline title="Reveal top">
        <RevealTop />
      </Example>
      <Example inline title="Horizontal">
        <Horizontal />
      </Example>
      <Example inline title="Default Expanded">
        <DefaultExpanded />
      </Example>
      <Example inline title="Scroll content">
        <Scroll />
      </Example>
    </ExampleScreen>
  );
};

export default CollapseScreen;
