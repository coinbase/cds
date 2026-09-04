import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../buttons/Button';
import { Text } from '../../typography/Text';
import { Table, TableBody, TableCell, TableRow } from '..';

const meta: Meta = {
  title: 'Components/Table/TableRow',
  component: TableRow,
};

export default meta;
type Story = StoryObj;

const handleClick = console.log;

export const TableRowExample: Story = {
  render: () => (
    <Table bordered variant="ruled">
      <TableBody>
        <TableRow>
          <TableCell direction="horizontal">
            <Text as="h2" display="block" font="headline">
              Sample Row 1
            </Text>
            <Button compact onClick={handleClick} variant="secondary">
              Export
            </Button>
          </TableCell>
        </TableRow>
        <TableRow backgroundColor="bgAlternate">
          <TableCell
            direction="horizontal"
            end={
              <Button compact onClick={handleClick} variant="secondary">
                Export
              </Button>
            }
            title="Sample Row 2 (with background set)"
          />
        </TableRow>
        <TableRow disableHoverIndicator>
          <TableCell direction="horizontal">
            <Text as="h2" display="block" font="headline">
              Sample Row 3 (disable hover indicator)
            </Text>
            <Button compact onClick={handleClick} variant="secondary">
              Export
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
