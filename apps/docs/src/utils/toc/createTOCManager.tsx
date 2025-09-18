import React, { createContext, memo, useContext, useEffect, useMemo, useState } from 'react';
import type { TOCItem } from '@docusaurus/mdx-loader';

type TOCItems = TOCItem[] | undefined;

type TOCContextValue = {
  items: TOCItems;
  update: (items: TOCItems) => void;
};

export type TOCProviderProps = {
  children: React.ReactNode;
};
export type TOCUpdaterProps = { toc: TOCItems };

const fallback = {
  items: undefined,
  update: () => {},
};

function createTOCManager() {
  const TOCContext = createContext<TOCContextValue>(fallback);

  function useTOC() {
    return useContext(TOCContext);
  }

  /** Needed to override the table of contents in the right sidebar when rendering multiple mdx files on single page. */
  const TOCProvider = memo(({ children }: TOCProviderProps) => {
    const [items, update] = useState<TOCItems>();
    const value = useMemo(() => ({ items, update }), [items]);
    return <TOCContext.Provider value={value}>{children}</TOCContext.Provider>;
  });

  /** Use this when dynamically rendering MDX files. `toc` is available as const in all mdx files and can be passed as prop into this component.  */
  const TOCUpdater = memo(function TOCUpdater({ toc }: TOCUpdaterProps) {
    const { update } = useTOC();
    useEffect(() => {
      if (toc) {
        update(toc);
      }

      return () => {
        update(undefined);
      };
    }, [toc, update]);
    return null;
  });

  return {
    useTOC,
    TOCProvider,
    TOCUpdater,
  };
}

export default createTOCManager;
