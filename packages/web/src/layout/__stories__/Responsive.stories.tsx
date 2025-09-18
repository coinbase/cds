import React from 'react';
import { css } from '@linaria/core';

import { Button } from '../../buttons';
import { IconButton } from '../../buttons/IconButton';
import { CardHeader } from '../../cards';
import { Card } from '../../cards/Card';
import { CellMedia, ContentCell, ListCell } from '../../cells';
import { type CellSpacing } from '../../cells/Cell';
import { Table, TableBody, TableCell, TableRow } from '../../tables';
import { Text } from '../../typography/Text';
import { Box, type BoxBaseProps } from '../Box';
import { Divider } from '../Divider';
// import { Divider } from '../Divider';
import { HStack } from '../HStack';
import { VStack } from '../VStack';

const animationCss = css`
  /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
  transition: ease all 0.4s;
`;

const responsiveProps: BoxBaseProps = {
  padding: { phone: 4, tablet: 3, desktop: 2 },
  gap: { phone: 0.5, tablet: 2, desktop: 3 },
  justifyContent: { phone: 'flex-end', tablet: 'flex-start', desktop: 'space-between' },
  alignItems: { phone: 'flex-end', tablet: 'flex-start', desktop: 'center' },
};

const itemProps: BoxBaseProps = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 100,
  background: 'bgAlternate',
  paddingX: 3,
};

const ExampleBox = (props: BoxBaseProps) => {
  return (
    <VStack gap={2}>
      <Text as="h2" display="block" font="display2">
        Responsive Flex Props
      </Text>
      <Box
        borderColor="bgLine"
        borderWidth={100}
        className={animationCss}
        minHeight={200}
        {...props}
      >
        <HStack {...itemProps}>
          <Text as="h3" display="block" font="headline">
            Item 1
          </Text>
        </HStack>
        <HStack {...itemProps}>
          <Text as="h3" display="block" font="headline">
            Item 2
          </Text>
        </HStack>
        <HStack {...itemProps}>
          <Text as="h3" display="block" font="headline">
            Item 3
          </Text>
        </HStack>
      </Box>
      <Text as="h2" display="block" font="display2">
        Responsive Ratio Layout
      </Text>
      <HStack borderColor="bgLine" borderWidth={100} gap={1} padding={1}>
        <HStack
          background="bgAlternate"
          flexGrow={{ phone: 1, tablet: 2, desktop: 3 }}
          {...itemProps}
        >
          <Text as="h3" display="block" font="headline">
            Item 1
          </Text>
        </HStack>
        <HStack background="bgAlternate" flexGrow={1} {...itemProps}>
          <Text as="h3" display="block" font="headline">
            Item 2
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
};

export const ResponsiveBox = () => <ExampleBox {...responsiveProps} />;

export const ResponsiveBoxHoistedPerformance = () => <ExampleBox {...responsiveProps} />;

export const HideOnMobile = () => (
  <ExampleBox visibility={{ phone: 'hidden', tablet: 'visible' }} />
);

export const ResponsiveStacks = () => (
  <HStack {...responsiveProps}>
    <VStack background="bgAlternate" borderRadius={200} {...responsiveProps}>
      <ListCell description="Description" title="Title" />
      <ListCell description="Description" title="Title" />
      <ListCell description="Description" title="Title" />
    </VStack>
    <VStack background="bgAlternate" borderRadius={200} {...responsiveProps}>
      <ListCell description="Description" title="Title" />
      <ListCell description="Description" title="Title" />
      <ListCell description="Description" title="Title" />
    </VStack>
  </HStack>
);

const cardResponsiveProps: Pick<BoxBaseProps, 'paddingX' | 'paddingY'> = {
  paddingX: { base: 3, phone: 2 },
  paddingY: { base: 3, phone: 1 },
};

export const ResponsiveCard = () => {
  return (
    <Card {...cardResponsiveProps}>
      <CardHeader
        action={
          <IconButton transparent accessibilityLabel="More" name="more" variant="foregroundMuted" />
        }
        avatar="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
        description="Earn crypto"
        metaData="Dec 18"
      />
    </Card>
  );
};

const innerSpacing: CellSpacing = {
  paddingX: { phone: 2, tablet: 4, desktop: 4 },
};
const outerSpacing: CellSpacing = {
  paddingY: { phone: 1, tablet: 2, desktop: 2 },
};
export const ResponsiveCells = () => {
  return (
    <>
      <ListCell
        description="Description"
        innerSpacing={innerSpacing}
        onClick={() => {}}
        outerSpacing={outerSpacing}
        title="Title"
      />
      <ListCell
        description="Description"
        innerSpacing={innerSpacing}
        onClick={() => {}}
        outerSpacing={outerSpacing}
        title="Title"
      />
      <ListCell
        description="Description"
        innerSpacing={innerSpacing}
        onClick={() => {}}
        outerSpacing={outerSpacing}
        title="Title"
      />
      <Divider />
      <ContentCell
        description="On this episode of The Scoop, Ethereum 2.0 developer and Prysmatic Labs founder Preston Van Loon and Joe Sticco broke down Cryptex. The post A deep dive into Eth 2.0, scaling and a project that lets users buy the entire crypto market appeared first on The Block."
        innerSpacing={innerSpacing}
        media={
          <CellMedia
            source="https://dynamic-assets.coinbase.com/2954170d91149bea19e2d2eab8acc2f50ff4446b4b6fb09a7983ad7a481c636e6b29c5e09cf90f49f57dcef30ef7ff50bb99ad4fc068cf43265ad135c590fa7d/news_article_images/28216c10d33e3f2147fe05aa8a27bf4b9620dd658ce0be6c482b5629176e52e4.png"
            type="image"
          />
        }
        meta="March 2nd, 2021"
        onClick={() => {}}
        outerSpacing={outerSpacing}
        subtitle="The Block - Ethereum 2"
        title="A deep dive into Eth 2.0, scaling that lets users buy the entire crypto market"
      />
    </>
  );
};

export const ResponsiveTable = () => {
  return (
    <Table bordered variant="ruled">
      <TableBody>
        <TableRow>
          <TableCell direction="horizontal" innerSpacing={innerSpacing} outerSpacing={outerSpacing}>
            <Text as="h2" display="block" font="headline">
              Sample Row 1
            </Text>
            <Button compact onClick={() => {}} variant="secondary">
              Export
            </Button>
          </TableCell>
        </TableRow>
        <TableRow
          fullWidth
          backgroundColor="bgAlternate"
          innerSpacing={innerSpacing}
          outerSpacing={outerSpacing}
        >
          <TableCell
            direction="horizontal"
            end={
              <Button compact onClick={() => {}} variant="secondary">
                Export
              </Button>
            }
            title="Sample Row 2 (with background set)"
          />
        </TableRow>
        <TableRow disableHoverIndicator>
          <TableCell direction="horizontal" innerSpacing={innerSpacing} outerSpacing={outerSpacing}>
            <Text as="h2" display="block" font="headline">
              Sample Row 3
            </Text>
            <Button compact onClick={() => {}} variant="secondary">
              Export
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const typographyResponsiveProps: Pick<BoxBaseProps, 'display' | 'padding'> = {
  display: { phone: 'block', tablet: 'inline-block' },
  padding: { phone: 4, tablet: 2 },
};

export const ResponsiveTypography = () => {
  return (
    <VStack>
      <Text as="h1" font="display1" {...typographyResponsiveProps}>
        Headline
      </Text>
      <Text as="h2" font="title1" {...typographyResponsiveProps}>
        Headline
      </Text>
      <Text as="h3" font="headline" {...typographyResponsiveProps}>
        Headline
      </Text>
      <Text as="p" font="body" {...typographyResponsiveProps}>
        Headline
      </Text>
    </VStack>
  );
};

export default {
  title: 'Components/Responsive Props',
  component: ResponsiveBox,
  excludeStories: /.*Performance$/,
};
