import React from 'react';
import { animations } from '@coinbase/cds-common/motion/tokens';

import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../tables';

export const AnimationTokens = () => {
  return (
    <Table bordered variant="ruled">
      <TableHeader>
        <TableRow>
          <TableCell title="Effects Name" />
          <TableCell title="Property" />
          <TableCell title="Value" />
          <TableCell title="Easing" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(animations).map(([key, value]) => {
          const renderPropertyValue = () => {
            if (value.fromValue) return `${value.fromValue} - ${value.toValue}`;

            return String(value.toValue);
          };

          return (
            <TableRow>
              <TableCell title={key} />
              <TableCell title={value.property} />
              <TableCell title={renderPropertyValue()} />
              <TableCell title={value.easing} />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default {
  component: AnimationTokens,
  title: 'Components/Motion/Tokens',
};
