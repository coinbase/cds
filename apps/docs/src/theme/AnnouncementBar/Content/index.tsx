import { type ReactNode } from 'react';
import { Text } from '@coinbase/cds-web/typography';
import { useThemeConfig } from '@docusaurus/theme-common';

import styles from './styles.module.css';

export default function AnnouncementBarContent(): ReactNode {
  const { announcementBar } = useThemeConfig();
  const { content } = announcementBar!;
  return (
    <Text
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: content }}
      flexGrow={1}
      font="headline"
    />
  );
}
