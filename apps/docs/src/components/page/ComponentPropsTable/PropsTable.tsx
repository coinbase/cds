import PropsTableRow from './PropsTableRow';
import type { PropsTableProps } from './types';

const tableStyle = { marginBottom: 0 };
const theadStyle = { backgroundColor: 'transparent' };
const th40Style = { width: '40%' };
const th20Style = { width: '20%' };

function PropsTable({ props, sharedTypeAliases, searchTerm }: PropsTableProps) {
  return (
    <table style={tableStyle}>
      <thead style={theadStyle}>
        <tr>
          <th style={th40Style}>Name</th>
          <th style={th40Style}>Type</th>
          <th style={th20Style}>Default</th>
        </tr>
      </thead>
      <tbody>
        {props.map((item) => (
          <PropsTableRow
            key={item.name}
            prop={item}
            searchTerm={searchTerm}
            sharedTypeAliases={sharedTypeAliases}
          />
        ))}
      </tbody>
    </table>
  );
}

export default PropsTable;
