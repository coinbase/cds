import React from 'react';
import { gutter } from '@coinbase/cds-common/tokens/sizing';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Text } from '../../typography/Text';
import type { BoxProps } from '../Box';
import { Box } from '../Box';
import { Divider } from '../Divider';
import type { RenderGroupItem } from '../Group';
import { Group } from '../Group';

function createCustomDivider(wrapperProps?: BoxProps, dividerProps?: BoxProps) {
  function CustomDivider() {
    return (
      <Box {...wrapperProps}>
        <Box background="bgPrimary" height={4} width="100%" {...dividerProps} />
      </Box>
    );
  }

  return CustomDivider;
}

const CustomDivider1 = createCustomDivider();
const CustomDivider2 = createCustomDivider({ paddingBottom: gutter });
const customRenderItem: RenderGroupItem = ({ item, Wrapper, isFirst, isLast }) => {
  return (
    <Wrapper borderColor="bgLineHeavy" borderedBottom={isLast} borderedTop={isFirst}>
      {item}
    </Wrapper>
  );
};

const GroupScreen = () => {
  const boxes = (
    <>
      <Box background="bgAlternate" padding={1}>
        <Text font="body">Box 1</Text>
      </Box>
      <Box background="bgAlternate" padding={1}>
        <Text font="body">Box 2</Text>
      </Box>
      <Box background="bgAlternate" padding={1}>
        <Text font="body">Box 3</Text>
      </Box>
    </>
  );
  return (
    <ExampleScreen>
      <Example title="Default">
        <Group>{boxes}</Group>
      </Example>
      <Example title="With gap">
        <Group gap={3}>{boxes}</Group>
      </Example>
      <Example title="With divider">
        <Group divider={Divider}>{boxes}</Group>
      </Example>
      <Example title="With custom divider">
        <Group divider={CustomDivider1}>{boxes}</Group>
      </Example>
      <Example title="With custom divider and gap">
        <Group divider={CustomDivider2} gap={gutter}>
          {boxes}
        </Group>
      </Example>
      <Example title="Custom renderItem callback">
        <Text font="body">
          Apply borderedTop and borderedBottom to first and last items in group
        </Text>
        <Group gap={0} renderItem={customRenderItem}>
          {boxes}
        </Group>
      </Example>
    </ExampleScreen>
  );
};

export default GroupScreen;
