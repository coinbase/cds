import CodeBlock from '@theme/CodeBlock';
import type { Serializable } from 'node:child_process';

import styles from './styles.module.css';

export const JSONCodeBlock = ({ json }: { json: Serializable }) => {
  return (
    <CodeBlock className={styles.jsonCodeBlock} language="json">
      {JSON.stringify(json, null, 2)}
    </CodeBlock>
  );
};
