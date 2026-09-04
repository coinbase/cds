import React, { useCallback, useState } from 'react';
import { useSort } from '@coinbase/cds-common/hooks/useSort';
import { useToggler } from '@coinbase/cds-common/hooks/useToggler';
import type { Meta } from '@storybook/react';
import startCase from 'lodash/startCase';

import { Button } from '../../buttons/Button';
import { CellMedia, type CellMediaType } from '../../cells/CellMedia';
import { Switch } from '../../controls/Switch';
import { HStack } from '../../layout/HStack';
import type { TableVariant } from '..';
import { assetHubMock } from '../__mocks__';
import type { UseSortableCellProps } from '../hooks/useSortableCell';
import { useSortableCell } from '../hooks/useSortableCell';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from '..';

const LABELS = ['name', 'ticker', 'appStatus', 'type', 'bookmarked'];
const LABELS_SHORT = LABELS.slice(0, 3);
export default {
  title: 'Components/Table/Table',
  component: Table,
} as Meta;

export const SampleTable = () => {
  const [hasBorder, { toggle }] = useToggler();
  const [variant, setVariant] = useState<TableVariant | undefined>('default');

  const data = assetHubMock.slice(0, 6);
  const variants: TableVariant[] = ['default', 'graph', 'ruled'];

  const handlePress = (name: string) => {
    alert(`hi ${name}`);
  };
  // Only apply a press event to a few items
  const clickEvents = (name: string) => ({
    onClick: name === 'Ethereum' ? () => handlePress(name) : undefined,
  });

  return (
    <>
      <HStack alignItems="center" gap={1} justifyContent="flex-end" paddingBottom={3}>
        {variants.map((v: TableVariant) => (
          <Button
            key={v}
            compact
            onClick={() => setVariant(v)}
            variant={v === variant ? 'primary' : 'secondary'}
          >
            {v}
          </Button>
        ))}
        <Switch checked={hasBorder} onChange={toggle}>
          Border
        </Switch>
      </HStack>
      <Table bordered={hasBorder} variant={variant}>
        <TableCaption as="h2">Sample Table</TableCaption>
        <TableHeader>
          <TableRow backgroundColor="bgAlternate">
            {LABELS_SHORT.map((label) => (
              <TableCell key={`${label}--idk`} title={startCase(label)} />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={`row-${row.name}--${row.appSubmittedAt}`} {...clickEvents(row.name)}>
              {Object.entries(row)
                .filter(([label]) => LABELS_SHORT.includes(label))
                .map(([key, val]) => (
                  <TableCell key={`${key}--idk`}>{val}</TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

type Columns = 'name' | 'ticker' | 'appStatus';

export const StickyHeaderSortingExample = () => {
  const [{ sortBy, sortDirection }, setSort] = useState<{
    sortBy: Columns;
    sortDirection: UseSortableCellProps['sortDirection'];
  }>({
    sortBy: 'name',
    sortDirection: 'ascending',
  });

  // Config to handle sortiing
  const data = useSort({ data: assetHubMock, sortDirection, sortBy });
  const onChange = useCallback(
    (by: Columns) => {
      const flipSort = by === sortBy && sortDirection === 'ascending';
      setSort({ sortBy: by, sortDirection: flipSort ? 'descending' : 'ascending' });
    },
    [sortBy, sortDirection],
  );
  const getSortableProps = useSortableCell({ sortBy, sortDirection, onChange });

  return (
    <Table bordered maxHeight={500} variant="ruled">
      <TableCaption as="h2" backgroundColor="bg">
        Sticky Header + Sorting Table
      </TableCaption>
      <TableHeader sticky>
        <TableRow backgroundColor="bgAlternate">
          <TableCell title="Asset" {...getSortableProps('name')} />
          <TableCell title="Ticker" {...getSortableProps('name')} />
          <TableCell title="Application Status" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={`row-${row.name}--${row.appSubmittedAt}`}>
            <TableCell title={row.name} />
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.appStatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const FixedLayoutExample = () => {
  const [isFixed, { toggle }] = useToggler(true);

  const data = assetHubMock.slice(0, 6);
  const handlePress = (name: string) => {
    alert(`hi ${name}`);
  };
  // Only apply a press event to a few items
  const clickEvents = (name: string) => ({
    onClick: name === 'Ethereum' ? () => handlePress(name) : undefined,
  });
  const widths = ['20%', '10%', '30%', '20%', '30%'];

  return (
    <>
      <HStack alignItems="center" flexGrow={1} justifyContent="flex-end" paddingBottom={3}>
        <Switch checked={isFixed} onChange={toggle}>
          Fixed Layout
        </Switch>
      </HStack>
      <Table bordered tableLayout={isFixed ? 'fixed' : 'auto'} variant="graph">
        <TableCaption as="h2" backgroundColor="bg">
          Fixed Layout Table
        </TableCaption>
        <TableHeader>
          <TableRow backgroundColor="bgAlternate">
            {LABELS.map((label, index) => (
              <TableCell
                key={`fixed-table-cell--${label}`}
                title={startCase(label)}
                width={widths[index]}
              />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={`row-${row.name}--${row.appSubmittedAt}`} {...clickEvents(row.name)}>
              {Object.entries(row)
                .filter(([label]) => LABELS.includes(label))
                .map(([key, val]) => (
                  <TableCell
                    key={`fixed-table-cell--${key}`}
                    overflow="truncate"
                    title={`${val} and a little more`}
                  />
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

const COMPACT_LABELS = ['name', 'ticker', 'appStatus'];
const mediaTypes: CellMediaType[] = ['asset', 'avatar', 'icon', 'image', 'pictogram'];

export const CompactExample = () => {
  const [compact, { toggle }] = useToggler(true);
  const data = assetHubMock.slice(0, 20);

  return (
    <>
      <HStack alignItems="center" justifyContent="flex-end" paddingBottom={3}>
        <Switch checked={compact} onChange={toggle}>
          Compact
        </Switch>
      </HStack>
      <Table bordered compact={compact} variant="ruled">
        <TableCaption as="h2" backgroundColor="bg">
          Compact Table
        </TableCaption>
        <TableHeader>
          <TableRow backgroundColor="bgAlternate">
            {COMPACT_LABELS.map((label) => (
              <TableCell key={`header-cell-${label}`} title={label} />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell title="Title" />
            <TableCell title="Title" />
            <TableCell title="Title" />
          </TableRow>
          <TableRow>
            <TableCell subtitle="A description" title="Title" />
            <TableCell subtitle="A description" title="Title" />
            <TableCell subtitle="A description" title="Title" />
          </TableRow>
          {data.map((row, index) => (
            <TableRow key={`row-${row.name}--${row.appSubmittedAt}`}>
              {Object.entries(row)
                .filter(([label]) => COMPACT_LABELS.includes(label))
                .map(([key, val]) => {
                  const mediaType = mediaTypes[index % mediaTypes.length];
                  return (
                    <TableCell
                      key={`cell-${key}`}
                      start={
                        mediaType === 'image' ? (
                          <CellMedia
                            source="https://images.coinbase.com/avatar?s=350"
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
                    />
                  );
                })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
