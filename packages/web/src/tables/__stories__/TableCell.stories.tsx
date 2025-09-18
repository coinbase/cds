import React from 'react';
import { css } from '@linaria/core';
import type { Meta, Story } from '@storybook/react';

import { Accordion, AccordionItem } from '../../accordion';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../../media';
import { ThemeProvider } from '../../system';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '..';

export default {
  title: 'Components/Table/TableCell',
  component: TableCell,
} as Meta;

const handleClick = console.log;

const spacingConfig = {
  flush: {
    outer: { padding: 0, paddingY: 0, paddingX: 2 },
    inner: { padding: 0, paddingY: 0, paddingX: 0 },
  },
  normal: { padding: 2 },
  big: { padding: 5 },
  huge: { padding: 7 },
} as const;

export const CellSpacing: Story = () => {
  return (
    <Table bordered cellSpacing={spacingConfig.flush} variant="ruled">
      <TableHeader>
        <TableRow backgroundColor="bgAlternate">
          <TableCell title="First Header" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell subtitle="0.11882557" title="$2,475.68" />
        </TableRow>
      </TableBody>
    </Table>
  );
};

const flexCss = css`
  display: flex;
`;

export const VerticallyAlignedTableCell: Story = () => {
  return (
    <Table bordered cellSpacing={spacingConfig.flush} variant="ruled">
      <TableBody>
        <TableRow>
          <TableCell
            alignItems="flex-start"
            className={flexCss}
            title="This TableCell will be aligned to the top of its parent"
            width={300}
          />
          <TableCell>
            <Accordion>
              <AccordionItem itemKey="1" title="Accordion Item">
                <Text as="p" display="block" font="body">
                  <LoremIpsum repeat={3} />
                </Text>
              </AccordionItem>
            </Accordion>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export const ComplexSpacingOverride: Story = () => {
  return (
    <VStack gap={2}>
      <Text as="p" display="block" font="body">
        This story is complex on purpose - it is intended to provide visgreg testing to ensure crazy
        spacing configs do what they are supposed to do:
      </Text>
      <Table bordered cellSpacing={spacingConfig.flush} variant="ruled">
        <TableHeader>
          <TableRow backgroundColor="bgAlternate">
            <TableCell subtitle="Default set on Table" title="Flush first column" />
            <TableCell subtitle="Default set on Table" title="Flush second column" />
            <TableCell subtitle="Default set on Table" title="Flush third column" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              innerSpacing={spacingConfig.normal}
              onClick={handleClick}
              subtitle={`innerSpacing ${JSON.stringify(spacingConfig.normal)}`}
              title="TableCell with defined innerSpacing"
            />
            <TableCell
              innerSpacing={spacingConfig.big}
              onClick={handleClick}
              subtitle={`innerSpacing ${JSON.stringify(spacingConfig.big)}`}
              title="TableCell with defined innerSpacing"
            />
            <TableCell
              innerSpacing={spacingConfig.huge}
              onClick={handleClick}
              subtitle={`innerSpacing ${JSON.stringify(spacingConfig.huge)}`}
              title="TableCell with defined innerSpacing"
            />
          </TableRow>
          <TableRow backgroundColor="bgAlternate">
            <TableCell
              onClick={handleClick}
              outerSpacing={spacingConfig.normal}
              subtitle={`outerSpacing ${JSON.stringify(spacingConfig.normal)}`}
              title="TableCell with defined innerSpacing"
            />
            <TableCell
              onClick={handleClick}
              outerSpacing={spacingConfig.big}
              subtitle={`outerSpacing ${JSON.stringify(spacingConfig.big)}`}
              title="TableCell with defined outerSpacing"
            />
            <TableCell
              onClick={handleClick}
              outerSpacing={spacingConfig.huge}
              subtitle={`outerSpacing ${JSON.stringify(spacingConfig.huge)}`}
              title="TableCell with defined outerSpacing"
            />
          </TableRow>
          <TableRow>
            <TableCell
              innerSpacing={spacingConfig.normal}
              onClick={handleClick}
              outerSpacing={spacingConfig.normal}
              subtitle={`innerSpacing/outerSpacing ${JSON.stringify(spacingConfig.normal)}`}
              title="TableCell with defined spacing"
            />
            <TableCell
              innerSpacing={spacingConfig.big}
              onClick={handleClick}
              outerSpacing={spacingConfig.big}
              subtitle={`innerSpacing/outerSpacing ${JSON.stringify(spacingConfig.big)}`}
              title="TableCell with defined spacing"
            />
            <TableCell
              innerSpacing={spacingConfig.huge}
              onClick={handleClick}
              outerSpacing={spacingConfig.huge}
              subtitle={`innerSpacing/outerSpacing ${JSON.stringify(spacingConfig.huge)}`}
              title="TableCell with defined spacing"
            />
          </TableRow>
        </TableBody>
      </Table>
    </VStack>
  );
};

export const SampleCells: Story = () => {
  return (
    <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
      <Table bordered variant="ruled">
        <TableHeader>
          <TableRow backgroundColor="bgAlternate">
            <TableCell title="First Header" />
            <TableCell>
              <Text as="p" color="currentColor" display="block" font="headline">
                Second Header
              </Text>
            </TableCell>
            <TableCell title="Third Header" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              overflow="truncate"
              start={
                <Avatar
                  alt="test-avatar"
                  size="l"
                  src="https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg"
                />
              }
              subtitle="BTC and I'm like please please truncate me"
              title="Bitcoin"
            />
            <TableCell subtitle="0.11882557" title="$2,475.68" />
            <TableCell>
              <Text as="h2" color="currentColor" display="block" font="headline">
                $2,221.01
              </Text>
              <Text as="p" color="fgMuted" display="block" font="label2">
                0.1519581 BTC
              </Text>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell title="First Item (footer)" />
            <TableCell title="Second Item (footer)" />
            <TableCell title="Third Item (footer)" />
          </TableRow>
        </TableFooter>
      </Table>
    </ThemeProvider>
  );
};

export const SampleFixedLayout: Story = () => {
  return (
    <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
      <Table bordered tableLayout="fixed" variant="ruled">
        <TableHeader>
          <TableRow backgroundColor="bgAlternate">
            <TableCell title="First Header" width="20%" />
            <TableCell>
              <Text as="p" color="currentColor" display="block" font="headline">
                Second Header
              </Text>
            </TableCell>
            <TableCell title="Third Header" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              overflow="truncate"
              start={
                <Avatar
                  alt="test-avatar"
                  size="l"
                  src="https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg"
                />
              }
              subtitle="BTC and I'm like please please truncate me"
              title="Bitcoin"
            />
            <TableCell subtitle="0.11882557" title="$2,475.68" />
            <TableCell>
              <Text as="h2" color="currentColor" display="block" font="headline">
                $2,221.01
              </Text>
              <Text as="p" color="fgMuted" display="block" font="label2">
                0.1519581 BTC
              </Text>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell title="First Item (footer)" />
            <TableCell title="Second Item (footer)" />
            <TableCell title="Third Item (footer)" />
          </TableRow>
        </TableFooter>
      </Table>
    </ThemeProvider>
  );
};
