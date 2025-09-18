import React from 'react';

import { Text } from '../../typography/Text';
import { Grid, type GridDefaultElement, type GridProps } from '../Grid';
import { GridColumn } from '../GridColumn';
import { HStack, type HStackProps } from '../HStack';
import { VStack } from '../VStack';

import { LoremIpsum } from './LoremIpsum';

const Item: React.FC<React.PropsWithChildren<HStackProps<'div' | 'li'>>> = ({
  children,
  ...props
}) => (
  <HStack
    alignItems="center"
    background="bgAlternate"
    justifyContent="center"
    padding={2}
    {...props}
  >
    {children}
  </HStack>
);

const responsiveGapConfig = { phone: 2, tablet: 1, desktop: 0.5 } as const;
const GridBase = (props: GridProps<'div' | 'ul'>) => {
  return (
    <Grid gap={responsiveGapConfig} {...props}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <Item key={idx} as={props.as === 'ul' ? 'li' : 'div'}>
          <Text as="h3" display="block" font="title1">
            {idx + 1}
          </Text>
        </Item>
      ))}
    </Grid>
  );
};

const ImplicitGrid = (props: GridProps<GridDefaultElement>) => {
  return (
    <Grid {...props} gap={0.5}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <Item key={idx}>
          <Text as="h3" display="block" font="title1">
            {idx + 1}
          </Text>
        </Item>
      ))}
    </Grid>
  );
};

const ImplicitGridClamped = (props: GridProps<GridDefaultElement>) => {
  return (
    <Grid {...props} gap={0.5}>
      <Item>
        <LoremIpsum />
      </Item>
      <Item>
        <LoremIpsum repeat={3} />
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          Small
        </Text>
      </Item>
      <Item>
        <LoremIpsum />
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          1
        </Text>
      </Item>
      <Item>
        <LoremIpsum repeat={2} />
      </Item>
      <Item>
        <LoremIpsum />
      </Item>
    </Grid>
  );
};

type GridColumnProps = {
  responsive?: boolean;
};

const responsiveColStartConfig = (idx: number) => ({
  phone: idx + 1,
  tablet: idx + 1,
  desktop: 1,
});
const responsiveColEndConfig = (idx: number) => ({
  phone: idx + 6 > 13 ? -1 : idx + 6,
  tablet: idx + 4 > 13 ? -1 : idx + 4,
  desktop: idx + 2,
});

const ColumnExamples = ({ responsive }: GridColumnProps) => {
  return (
    <Grid columns={12} gap={0.5}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <GridColumn
          key={idx}
          background="bgPrimary"
          gridColumnEnd={responsive ? responsiveColEndConfig(idx) : idx + 2}
          gridColumnStart={responsive ? responsiveColStartConfig(idx) : 1}
          padding={2}
        />
      ))}
    </Grid>
  );
};

const FullBleedExample = () => {
  return (
    <Grid gap={0.5} templateColumns="100px 1fr 100px">
      <Item background="bg">
        <Text as="p" display="block" font="body">
          Gutter
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          Body
        </Text>
      </Item>
      <Item background="bg">
        <Text as="p" display="block" font="body">
          Gutter
        </Text>
      </Item>
      <GridColumn background="bgAlternate" gridColumn="1 / -1" justifyContent="center" padding={2}>
        <Text as="p" display="block" font="body">
          Full Bleed
        </Text>
      </GridColumn>
    </Grid>
  );
};

const responsiveGridColumnConfig = {
  phone: 'repeat(3, minmax(0, 1fr))',
  tablet: 'repeat(6, minmax(0, 1fr))',
  desktop: 'repeat(12, minmax(0, 1fr))',
} as const;

export const GridExamples = () => {
  return (
    <VStack gap={4}>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Twelve Column Grid
        </Text>
        <GridBase gridTemplateColumns={responsiveGridColumnConfig} />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Columns as String
        </Text>
        <Text as="h3" display="block" font="title3">
          100px 20% 1fr
        </Text>
        <GridBase templateColumns="100px 20% 1fr" />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          As a List
        </Text>
        <GridBase as="ul" gridTemplateColumns={responsiveGridColumnConfig} />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Implicit Grid
        </Text>
        <ImplicitGrid columnMin="100px" />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Implicit Grid with Clamps
        </Text>
        <ImplicitGridClamped columnMax="200px" columnMin="min-content" />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Column Span
        </Text>
        <ColumnExamples />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Responsive Column Span
        </Text>
        <ColumnExamples responsive />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Full Bleed
        </Text>
        <FullBleedExample />
      </VStack>
    </VStack>
  );
};

export default {
  title: 'Components/Grid',
  component: GridExamples,
};
