import React from 'react';

import { Link, Text } from '../../typography';
import { Divider } from '../Divider';
import { Grid, type GridDefaultElement, type GridProps } from '../Grid';
import { GridColumn } from '../GridColumn';
import { HStack, type HStackDefaultElement, type HStackProps } from '../HStack';
import { VStack } from '../VStack';

import { LoremIpsum } from './LoremIpsum';

const Item: React.FC<React.PropsWithChildren<HStackProps<HStackDefaultElement>>> = ({
  children,
  ...props
}) => (
  <HStack
    alignItems="center"
    background="bgAlternate"
    justifyContent="center"
    minWidth="100px"
    padding={2}
    {...props}
  >
    {children}
  </HStack>
);

const Example: React.FC<
  React.PropsWithChildren<{ title: string; description?: string | React.ReactNode }>
> = ({ children, title, description }) => {
  return (
    <VStack gap={2}>
      <Text as="h3" display="block" font="title3">
        {title}
      </Text>
      {description}
      {children}
    </VStack>
  );
};

const sharedWrapperProps: Pick<
  HStackProps<HStackDefaultElement>,
  'borderColor' | 'padding' | 'gap' | 'borderWidth'
> = {
  borderColor: 'bgLine',
  borderWidth: 100,
  padding: 1,
  gap: 1,
};

const FlexLayout = () => {
  return (
    <HStack {...sharedWrapperProps}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Item key={idx}>
          <Text as="p" display="block" font="body">
            {idx + 1}
          </Text>
        </Item>
      ))}
    </HStack>
  );
};

const HStackWithGap = () => {
  return (
    <HStack bordered gap={1} padding={1}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Item key={idx}>
          <Text as="p" display="block" font="body">
            {idx + 1}
          </Text>
        </Item>
      ))}
    </HStack>
  );
};

const VStackWithGap = () => {
  return (
    <VStack bordered gap={1} padding={1}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Item key={idx}>
          <Text as="p" display="block" font="body">
            {idx + 1}
          </Text>
        </Item>
      ))}
    </VStack>
  );
};

const FlexGrow = () => {
  return (
    <HStack {...sharedWrapperProps}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Item key={idx} flexGrow={1}>
          <Text as="p" display="block" font="body">
            {idx + 1}
          </Text>
        </Item>
      ))}
    </HStack>
  );
};

const RatioLayout = () => {
  return (
    <HStack {...sharedWrapperProps} flexWrap="wrap">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Item key={idx} flexGrow={idx}>
          <Text as="p" display="block" font="body">
            {idx + 1}
          </Text>
        </Item>
      ))}
    </HStack>
  );
};

const HolyGrailLayout = () => {
  return (
    <HStack {...sharedWrapperProps} flexWrap="wrap">
      <Item flexBasis="200px">
        <Text as="p" display="block" font="body">
          Navigation
        </Text>
      </Item>
      <Item flexGrow={1}>
        <Text as="p" display="block" font="body">
          Main Content
        </Text>
      </Item>
      <Item flexBasis="200px">
        <Text as="p" display="block" font="body">
          Sidebar
        </Text>
      </Item>
    </HStack>
  );
};

const FlexboxImplicitLayout = () => {
  return (
    <HStack flexWrap="wrap" {...sharedWrapperProps}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <Item
          key={idx}
          background={idx % 2 ? 'bgPrimaryWash' : 'bgAlternate'}
          flexBasis={idx % 2 ? '200px' : '100px'}
        >
          <Text as="p" display="block" font="body">
            {idx + 1}
          </Text>
        </Item>
      ))}
    </HStack>
  );
};

const FlexboxImplicitTextLayout = () => {
  return (
    <HStack flexWrap="wrap" {...sharedWrapperProps}>
      <Item>
        <Text as="p" display="block" font="body">
          Small
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          This is a medium block of text
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          1
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          2
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          3
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          4
        </Text>
      </Item>
      <Item>
        <LoremIpsum />
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          Small
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          Small
        </Text>
      </Item>
      <Item>
        <LoremIpsum />
      </Item>
    </HStack>
  );
};

const GridLayout = ({
  columnCount = 5,
  ...props
}: GridProps<GridDefaultElement> & { columnCount?: number }) => {
  return (
    <Grid {...sharedWrapperProps} {...props}>
      {Array.from({ length: columnCount }).map((_, idx) => (
        <Item key={idx}>
          <Text as="p" display="block" font="body">
            {idx + 1}
          </Text>
        </Item>
      ))}
    </Grid>
  );
};

const GridImplicitLayout = () => {
  return (
    <Grid columnMax="1fr" columnMin="100px" {...sharedWrapperProps}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <Item key={idx} background="bgAlternate" width="100px">
          <Text as="p" display="block" font="body">
            {idx + 1}
          </Text>
        </Item>
      ))}
    </Grid>
  );
};

const GridTwelveColLayout = () => {
  return (
    <Grid columns={12} {...sharedWrapperProps}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <Item key={idx} background={idx === 0 || idx === 11 ? 'bg' : 'bgAlternate'}>
          <Text as="p" display="block" font="body">
            {idx + 1}
          </Text>
        </Item>
      ))}
    </Grid>
  );
};

const FullBleedGrid = () => {
  return (
    <Grid columns={12} {...sharedWrapperProps}>
      <GridColumn background="bgAlternate" colSpan={12}>
        <Text as="p" display="block" font="body">
          Full Bleed
        </Text>
      </GridColumn>
    </Grid>
  );
};

const GridImplicitTextLayout = () => {
  return (
    <Grid columnMax="300px" columnMin="max-content" {...sharedWrapperProps}>
      <Item>
        <Text as="p" display="block" font="body">
          Small
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          This is a medium block of text
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          1
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          2
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          3
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          4
        </Text>
      </Item>
      <Item>
        <LoremIpsum />
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          Small
        </Text>
      </Item>
      <Item>
        <Text as="p" display="block" font="body">
          Small
        </Text>
      </Item>
      <Item>
        <LoremIpsum />
      </Item>
    </Grid>
  );
};

export const Examples = () => {
  return (
    <VStack>
      <Text as="h1" display="block" font="display1" paddingBottom={3}>
        Explicit Layouts
      </Text>
      <Text as="h2" display="block" font="headline" paddingBottom={4}>
        Explicit layouts let you declare every track size to create custom layouts.
      </Text>
      <Text as="h3" display="block" font="display2" paddingBottom={2}>
        Flexbox
      </Text>
      <VStack gap={4}>
        <Example
          description={
            <Text as="p" display="block" font="body">
              This layout is essentially <code>display: flex</code>. It fills the parent container
              and children are sized by <code>width: auto</code>.
            </Text>
          }
          title="HStack with No Props"
        >
          <FlexLayout />
        </Example>
        <Example
          description={
            <Text as="p" display="block" font="body">
              The children <em>grow</em> to equally fill the available space when you pass{' '}
              <code>flex-grow: 1</code> to each child.
            </Text>
          }
          title="Stretch/Grow Equal Columns"
        >
          <FlexGrow />
        </Example>
        <Example
          description={
            <Text as="p" display="block" font="body">
              Children will grow proportionally depending on available space and their value of{' '}
              <code>flex-grow</code>.
            </Text>
          }
          title="Ratio Based Column Layout"
        >
          <RatioLayout />
        </Example>
        <Example
          description={
            <Text as="p" display="block" font="body">
              The first and last child are given explicit sizes via <code>flex-basis</code>, while
              the middle child grows to fill the available remaining space using{' '}
              <code>flex-grow: 1</code>.
            </Text>
          }
          title="The Holy Grail Layout"
        >
          <HolyGrailLayout />
        </Example>
        <Example title="Stacks with gaps">
          <HStackWithGap />
          <VStackWithGap />
        </Example>
      </VStack>
      <Divider paddingY={4} />
      <Text as="h2" display="block" font="display2" paddingBottom={2}>
        Grid
      </Text>
      <Text as="p" display="block" font="body" paddingBottom={2}>
        These Grid layouts are the same as the ones we just saw, but instead of using flexbox they
        use CSS grid. Grid column dimensions are passed explicitly to the parent via the{' '}
        <code>columns</code> prop, rather than adding styles to each individual child. Read more
        about
        <Link href="https://www.w3.org/TR/css3-grid-layout/#explicit-grids">Explicit Grids</Link>.
      </Text>
      <VStack gap={4}>
        <Example
          description={
            <Text as="p" display="block" font="body">
              This layout is essentially <code>display: grid</code>. The Grid fills the width of the
              parent container and children also fill the width of the parent, respectively. Since
              no tracks have been defined, it will appear as a single column of children.
            </Text>
          }
          title="Grid with No Props"
        >
          <GridLayout />
        </Example>
        <Example
          description={
            <VStack gap={1}>
              <Text as="p" display="block" font="body">
                The available space will be divided into equal columns.
              </Text>
              <Text as="h4" display="block" font="title4" paddingTop={2}>
                Tradeoffs
              </Text>
              <ul>
                <Text as="li" display="list-item" font="body">
                  Explicit columns are not responsive. They will not wrap to the next line, and the
                  Grid will actually clip the content when the viewport shrinks.
                </Text>
                <Text as="li" display="list-item" font="body">
                  Under the hood we&apos;re actually saying{' '}
                  <code>grid-template-columns: repeat(COLUMNS, minmax(0, 1fr))</code> where{' '}
                  <code>COLUMNS</code> is the number of equal width columns you want per row. This
                  means the minimum size of each column is actually 0, rather than{' '}
                  <code>min-content</code>, so it will get clipped when the content overflows the
                  available space.
                </Text>
              </ul>
            </VStack>
          }
          title="Equal Columns"
        >
          <GridLayout columns={5} />
        </Example>
        <Example
          description={
            <Text as="p" display="block" font="body">
              You can pass responsive styles to <code>gridTemplateColumns</code> and specify number
              of columns at each device breakpoint to make a Grid responsive.{' '}
            </Text>
          }
          title="Responsive Equal Columns"
        >
          <GridLayout
            gridTemplateColumns={{
              phone: 'repeat(1, 1fr)',
              tablet: 'repeat(3, 1fr)',
              desktop: 'repeat(5, 1fr)',
            }}
          />
        </Example>
        <Example
          description={
            <Text as="p" display="block" font="body">
              In the context of Grid free space is referred to as <code>fr</code> and it can be
              divvied between children proportionally. For example: <code>1fr 2fr 3fr</code> will
              create 3 columns that take up the available space of the parent and columns are
              proportionately sized by the number of <code>fr</code>.
            </Text>
          }
          title="Ratio Based Column Layout"
        >
          <GridLayout columnCount={3} templateColumns="1fr 2fr 3fr" />
        </Example>
        <Example
          description={
            <Text as="p" display="block" font="body">
              Column widths will also apply to all other rows within the Grid.
            </Text>
          }
          title="The Holy Grail Layout"
        >
          <GridLayout columnCount={3} templateColumns="200px 1fr 200px" />
        </Example>
        <Example title="Twelve Column Layout">
          <GridTwelveColLayout />
        </Example>
        <Example title="Full Bleed Layout">
          <FullBleedGrid />
        </Example>
        <Divider paddingY={4} />
        <VStack>
          <Text as="h1" display="block" font="display1" paddingBottom={3}>
            Implicit Layouts
          </Text>
          <Text as="h2" display="block" font="headline" paddingBottom={4}>
            Implicit layouts allow the content to shape the layout. They are particularly useful
            when content size is unknown or varied.
          </Text>
          <VStack gap={4}>
            <Text as="h3" display="block" font="display2" paddingBottom={2}>
              Flexbox
            </Text>
            <Example
              description={
                <VStack gap={1}>
                  <Text as="p" display="block" font="body">
                    Implicit layouts let the content decide how tracks will be defined and laid out
                    based on the size of the children.
                  </Text>
                  <Text as="p" display="block" font="body">
                    Columns are sized based on the content of each child and will fill the available
                    space in each row with as many children that can fit. Subsequent rows may vary
                    in column sizes since each column is sized based on the child&apos;s content.
                  </Text>
                  <Text as="p" display="block" font="body">
                    Flexbox does not support gaps between rows, though, so may look problematic when
                    items start to wrap.
                  </Text>
                </VStack>
              }
              title="Implicit Flexbox Layout"
            >
              <FlexboxImplicitLayout />
            </Example>
            <Example
              description={
                <Text as="p" display="block" font="body">
                  In this example all items are sized based on their content. We apply{' '}
                  <code>display: flex</code> and <code>flex-wrap: wrap</code> to the parent, and all
                  the children flow into an implicit grid.
                </Text>
              }
              title="Implicit Layout with Inferred Column Sizes"
            >
              <FlexboxImplicitTextLayout />
            </Example>
            <Divider paddingY={4} />
            <Text as="h2" display="block" font="display2" paddingBottom={2}>
              Grid
            </Text>
            <Text as="p" display="block" font="body" paddingBottom={1}>
              When no columns are explicitly passed to a Grid component, it will create an implied
              grid based on the content&apos; relationship to the available space. Under the hood,
              Grid is measuring the available space and calculating how many items it can fit in
              each row. A minimum column size is required because it cannot be inferred. Read more
              about{' '}
              <Link href="https://www.w3.org/TR/css3-grid-layout/#implicit-grids">
                Implicit Grids
              </Link>
              .
            </Text>
            <Example
              description={
                <VStack gap={1}>
                  <Text as="p" display="block" font="body">
                    If you don&apos;t pass a <code>columns</code> prop, the Grid will automatically
                    lay out children by how many will fit within the available space. You must
                    declare a minimum <code>columnMin</code> dimension which will create implied
                    columns that will be a minimum of the declared size. You can optionally pass a{' '}
                    <code>columnMax</code> prop to clamp the upperbound of columns. This is similar
                    to setting a <code>flex-basis</code> and a <code>max-width</code> on each child
                    as you would in a Flexbox implementation.
                  </Text>
                  <Text as="h4" display="block" font="title4" paddingTop={2}>
                    Tradeoffs
                  </Text>
                  <ul>
                    <Text as="li" display="list-item" font="body">
                      Implicit columns will automatically wrap content to the next row and add a gap
                      between rows as well, that matches the gap between columns.
                    </Text>
                    <Text as="li" display="list-item" font="body">
                      Implicit layouts are useful when you don&apos;t know how many children there
                      will be, but you know their size.
                    </Text>
                    <Text as="li" display="list-item" font="body">
                      Implicit Grids do not support different column sizes, nor do they support the
                      <code>grid-column</code> prop on children if you try to for a child to span
                      more than one column.
                    </Text>
                    <Text as="li" display="list-item" font="body">
                      It&apos; also important to not that the grid column sizes are calculated based
                      on <em>all of the children</em>, not by the children in each row. So column
                      sizes will carry over from one row to the next.
                    </Text>
                  </ul>
                </VStack>
              }
              title="Implicit Grid Layout"
            >
              <GridImplicitLayout />
            </Example>
            <Example
              description={
                <VStack gap={1}>
                  <Text as="p" display="block" font="body">
                    The closest you can get to inferring the size of each item is to pass{' '}
                    <code>columnMin=&quot;max-content&quot;</code>. Keep in mind, if an item
                    contains typography it will not wrap to the next line, even if it runs out of
                    room within the row.
                  </Text>
                  <Text as="p" display="block" font="body">
                    You might think you can pass a <code>columnMax</code> to clamp the upperbound of
                    the column size, but under the hood the CSS grid&apos; <code>minmax</code>{' '}
                    method will actually ignore the <code>max</code> value since it is less than the{' '}
                    <code>min</code> value.
                  </Text>
                </VStack>
              }
              title="Implicit Grid with Inferred Column Sizes"
            >
              <GridImplicitTextLayout />
            </Example>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default {
  title: 'Examples/Layouts',
  component: FlexLayout,
};
