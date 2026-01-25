import StylesTableRow from './StylesTableRow';
import type { StylesTableProps } from './types';

const tableStyle = { marginBottom: 0 };
const theadStyle = { backgroundColor: 'transparent' };
const th20Style = { width: '20%' };
const th30Style = { width: '30%' };
const th50Style = { width: '50%' };

function StylesTable({ styles }: StylesTableProps) {
  return (
    <table style={tableStyle}>
      <thead style={theadStyle}>
        <tr>
          <th style={th20Style}>Selector</th>
          <th style={th30Style}>Static class name</th>
          <th style={th50Style}>Description</th>
        </tr>
      </thead>
      <tbody>
        {styles.selectors.map((selector) => (
          <StylesTableRow key={selector.selector} selector={selector} />
        ))}
      </tbody>
    </table>
  );
}

export default StylesTable;
