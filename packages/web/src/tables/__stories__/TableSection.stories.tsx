import React from 'react';
import type { Meta, Story } from '@storybook/react';

import { VStack } from '../../layout/VStack';
import { Spinner } from '../../loaders/Spinner';
import { Text } from '../../typography/Text';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '..';

export default {
  title: 'Components/Table/TableSection',
  component: TableBody,
} as Meta;

export const SampleTableSection: Story = () => {
  return (
    <Table bordered variant="ruled">
      <TableHeader>
        <TableRow>
          <TableCell subtitle="This is the TableHeader" title="TableHeader" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell subtitle="This is the TableBody" title="TableBody" />
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell subtitle="This is the TableFooter" title="TableFooter" />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export const SectionFlowControl: Story = () => {
  return (
    <Table bordered variant="ruled">
      <TableBody>
        <TableRow>
          <TableCell subtitle="This is the TableBody" title="TableBody" />
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell subtitle="This is the TableFooter" title="TableFooter" />
        </TableRow>
      </TableFooter>
      <TableHeader>
        <TableRow>
          <TableCell subtitle="This is the TableHeader" title="TableHeader" />
        </TableRow>
      </TableHeader>
    </Table>
  );
};

export const LoadingStateExample: Story = () => {
  return (
    <Table bordered variant="ruled">
      <TableHeader>
        <TableRow>
          <TableCell title="TableHeader" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <VStack alignItems="center" justifyContent="center" minHeight={500}>
          <Spinner color="bgPrimary" size={4} />
          <Text as="p" color="fgMuted" display="block" font="headline" paddingTop={2}>
            Loading content...
          </Text>
        </VStack>
      </TableBody>
    </Table>
  );
};
