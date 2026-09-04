import React, { useCallback, useState } from 'react';
import { usePrefixedId } from '@coinbase/cds-common/hooks/usePrefixedId';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';

import { Button } from '../../buttons';
import { DotCount } from '../../dots';
import { HStack } from '../../layout';
import { Text } from '../../typography/Text';
import { Collapsible } from '..';

export default {
  component: Collapsible,
  title: 'Components/Collapsible',
};

export const BasicCollapsible = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

  const toggleCollapsed = useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    [setCollapsed],
  );

  return (
    <>
      <Button
        aria-controls={collapsibleId}
        aria-expanded={!collapsed}
        id={triggerId}
        onClick={toggleCollapsed}
      >
        Click me!
      </Button>
      <Collapsible accessibilityLabelledBy={triggerId} collapsed={collapsed} id={collapsibleId}>
        <Text font="body">{loremIpsum}</Text>
      </Collapsible>
    </>
  );
};

export const DefaultExpanded = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

  const toggleCollapsed = useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    [setCollapsed],
  );

  return (
    <>
      <Button
        aria-controls={collapsibleId}
        aria-expanded={!collapsed}
        id={triggerId}
        onClick={toggleCollapsed}
      >
        Click me!
      </Button>
      <Collapsible accessibilityLabelledBy={triggerId} collapsed={collapsed} id={collapsibleId}>
        <Text font="body">{loremIpsum}</Text>
      </Collapsible>
    </>
  );
};

export const Horizontal = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

  const toggleCollapsed = useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    [setCollapsed],
  );

  return (
    <HStack alignItems="center">
      <Button
        aria-controls={collapsibleId}
        aria-expanded={!collapsed}
        id={triggerId}
        onClick={toggleCollapsed}
      >
        Click me!
      </Button>
      <Collapsible
        accessibilityLabelledBy={triggerId}
        collapsed={collapsed}
        direction="horizontal"
        id={collapsibleId}
        maxHeight={400}
      >
        <DotCount count={100} />
        <DotCount count={1} />
        <DotCount count={99} />
      </Collapsible>
    </HStack>
  );
};

export const RevealTop = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

  const toggleCollapsed = useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    [setCollapsed],
  );

  return (
    <>
      <Collapsible accessibilityLabelledBy={triggerId} collapsed={collapsed} id={collapsibleId}>
        <Text font="body">{loremIpsum}</Text>
      </Collapsible>
      <Button aria-controls={collapsibleId} id={triggerId} onClick={toggleCollapsed}>
        Click me!
      </Button>
    </>
  );
};

export const Scroll = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

  const toggleCollapsed = useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    [setCollapsed],
  );

  return (
    <>
      <Button
        aria-controls={collapsibleId}
        aria-expanded={!collapsed}
        id={triggerId}
        onClick={toggleCollapsed}
      >
        Click me!
      </Button>
      <Collapsible
        accessibilityLabelledBy={triggerId}
        collapsed={collapsed}
        id={collapsibleId}
        maxHeight={400}
      >
        <Text font="body">{loremIpsum.repeat(10)}</Text>
      </Collapsible>
    </>
  );
};
