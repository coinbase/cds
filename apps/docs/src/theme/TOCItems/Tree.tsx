import React, { type ReactNode, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/TOCItems/Tree';

// Recursive component rendering the toc tree
function TOCItemTree({ toc, className, linkClassName, isChild }: Props): ReactNode {
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash.slice(1));
    };
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  if (!toc.length) {
    return null;
  }

  return (
    <ul className={isChild ? undefined : className}>
      {toc.map((heading) => (
        <li key={heading.id}>
          <Link
            aria-current={currentHash === heading.id}
            className={linkClassName ?? undefined}
            // Developer provided the HTML, so assume it's safe.
            dangerouslySetInnerHTML={{ __html: heading.value }}
            to={`#${heading.id}`}
          />
          <TOCItemTree
            isChild
            className={className}
            linkClassName={linkClassName}
            toc={heading.children}
          />
        </li>
      ))}
    </ul>
  );
}

// Memo only the tree root is enough
export default React.memo(TOCItemTree);
