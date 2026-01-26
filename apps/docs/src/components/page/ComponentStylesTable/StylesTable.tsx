import { useMemo } from 'react';

import StylesTableRow from './StylesTableRow';
import type { StylesTableProps } from './types';

const tableStyle = { marginBottom: 0 };
const theadStyle = { backgroundColor: 'transparent' };
const th30Style = { width: '30%' };
const th70Style = { width: '70%' };

function StylesTable({ styles }: StylesTableProps) {
  const hasAnyClassName = useMemo(
    () => styles.selectors.some((selector) => selector.className),
    [styles.selectors],
  );

  return (
    <table style={tableStyle}>
      <thead style={theadStyle}>
        <tr>
          <th style={th30Style}>Selector</th>
          {hasAnyClassName && <th style={th30Style}>Static class name</th>}
          <th style={hasAnyClassName ? th30Style : th70Style}>Description</th>
        </tr>
      </thead>
      <tbody>
        {styles.selectors.map((selector) => (
          <StylesTableRow
            key={selector.selector}
            selector={selector}
            showClassName={hasAnyClassName}
          />
        ))}
      </tbody>
    </table>
  );
}

export default StylesTable;
