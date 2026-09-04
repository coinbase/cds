import React from 'react';
import type { Meta } from '@storybook/react';

import { VStack } from '../../layout/VStack';
import { Table, TableCaption } from '..';

export default {
  title: 'Components/Table/TableCaption',
  component: TableCaption,
} as Meta;

const TABLE_SPACING = { outer: { padding: 1 }, inner: { padding: 1 } } as const;
const CAPTION_SPACING = { padding: 3 } as const;

export const SpacingExamples = () => {
  return (
    <VStack gap={2}>
      <Table bordered variant="ruled">
        <TableCaption>Default Spacing</TableCaption>
      </Table>
      <Table bordered cellSpacing={TABLE_SPACING} variant="ruled">
        <TableCaption outerSpacing={CAPTION_SPACING}>
          {'Outer Spacing: { spacing: 3 }'}
        </TableCaption>
      </Table>
      <Table bordered cellSpacing={TABLE_SPACING} variant="ruled">
        <TableCaption innerSpacing={CAPTION_SPACING}>
          {'Inner Spacing: { spacing: 3 }'}
        </TableCaption>
      </Table>
      <Table bordered cellSpacing={TABLE_SPACING} variant="ruled">
        <TableCaption innerSpacing={CAPTION_SPACING} outerSpacing={CAPTION_SPACING}>
          {'Outer Spacing: { spacing: 3 } + Inner Spacing: { spacing: 3 }'}
        </TableCaption>
      </Table>
    </VStack>
  );
};
