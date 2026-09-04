import React from 'react';
import { useToggler } from '@coinbase/cds-common/hooks/useToggler';
import type { Meta, StoryObj } from '@storybook/react';

import { CellMedia, type CellMediaType } from '../../cells/CellMedia';
import { Switch } from '../../controls/Switch';
import { HStack } from '../../layout/HStack';
import { ThemeProvider } from '../../system';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { assetHubMock } from '../__mocks__';
import { Table, TableBody, TableCell, TableCellFallback, TableHeader, TableRow } from '..';

const meta: Meta = {
  title: 'Components/Table/TableCellFallback',
  component: TableCellFallback,
};

export default meta;
type Story = StoryObj;

const LABELS = ['name', 'ticker', 'appStatus'];
const mediaTypes: CellMediaType[] = ['asset', 'avatar', 'icon', 'image', 'pictogram'];

const TableCellFallbackExampleRender = () => {
  const [loading, { toggle }] = useToggler();
  const data = assetHubMock.slice(0, 20);

  return (
    <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
      <Table bordered variant="ruled">
        <TableHeader>
          <TableRow fullWidth>
            <HStack alignItems="center" flexGrow={1} justifyContent="space-between">
              <Text as="h2" display="block" font="display2">
                Sample Table
              </Text>
              <Switch checked={loading} onChange={toggle}>
                Loading
              </Switch>
            </HStack>
          </TableRow>
          <TableRow backgroundColor="bgAlternate">
            {LABELS.map((label) =>
              loading ? (
                <TableCellFallback
                  key={`header-fallback-cell${label}`}
                  disableRandomRectWidth
                  title
                />
              ) : (
                <TableCell key={`header-cell-${label}`} title={label} />
              ),
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => {
            const isEven = index % 2 === 0;

            return (
              <TableRow key={`row-${row.name}--${row.appSubmittedAt}`}>
                {Object.entries(row)
                  .filter(([label]) => LABELS.includes(label))
                  .map(([key, val], rowIndex) => {
                    const mediaType = mediaTypes[index % mediaTypes.length];
                    return loading ? (
                      <TableCellFallback
                        key={`fallback-cell-${key}`}
                        subtitle
                        title
                        disableRandomRectWidth={isEven}
                        rectWidthVariant={!isEven ? index + rowIndex : undefined}
                        start={mediaTypes[index % mediaTypes.length]}
                        width="33%"
                      />
                    ) : (
                      <TableCell
                        key={`cell-${key}`}
                        start={
                          mediaType === 'image' ? (
                            <CellMedia
                              source="https://images.coinbase.com/avatar?s=56"
                              type="image"
                            />
                          ) : (
                            <CellMedia
                              source="https://images.coinbase.com/avatar?s=56"
                              type="avatar"
                            />
                          )
                        }
                        subtitle="Some subtitle"
                        title={`${val}`}
                        width="33%"
                      />
                    );
                  })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
};

export const TableCellFallbackExample: Story = {
  render: () => <TableCellFallbackExampleRender />,
};
