import { Text } from '@coinbase/cds-web/typography';
import type { StyleSelector } from '@coinbase/docusaurus-plugin-docgen/types';

import styles from './styles.module.css';

export type StylesTableRowProps = {
  selector: StyleSelector;
  showClassName: boolean;
};

function StylesTableRow({ selector, showClassName }: StylesTableRowProps) {
  const { selector: selectorName, className, description } = selector;

  return (
    <tr>
      <td className={styles.stylesTableCell}>
        <Text mono font="body">
          {selectorName}
        </Text>
      </td>
      {showClassName && (
        <td className={styles.stylesTableCell}>
          <Text mono font="body">
            {className || '--'}
          </Text>
        </td>
      )}
      <td className={styles.stylesTableCell}>
        <Text color="fgMuted" font="body">
          {description || '--'}
        </Text>
      </td>
    </tr>
  );
}

export default StylesTableRow;
