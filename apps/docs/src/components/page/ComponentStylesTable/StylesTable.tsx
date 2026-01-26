import { memo, useMemo } from 'react';

import styles from './styles.module.css';
import StylesTableRow from './StylesTableRow';
import type { StylesTableProps } from './types';

export const StylesTable = memo(({ styles: stylesData }: StylesTableProps) => {
  const hasAnyClassName = useMemo(
    () => stylesData.selectors.some((selector) => selector.className),
    [stylesData.selectors],
  );

  return (
    <table className={styles.stylesTable}>
      <thead className={styles.stylesTableHead}>
        <tr>
          <th className={hasAnyClassName ? styles.thThreeColSmall : styles.thTwoColSelector}>
            Selector
          </th>
          {hasAnyClassName && <th className={styles.thThreeColSmall}>Static class name</th>}
          <th className={hasAnyClassName ? styles.thThreeColLarge : styles.thTwoColDescription}>
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {stylesData.selectors.map((selector) => (
          <StylesTableRow
            key={selector.selector}
            selector={selector}
            showClassName={hasAnyClassName}
          />
        ))}
      </tbody>
    </table>
  );
});
