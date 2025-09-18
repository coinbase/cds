import React, { useEffect } from 'react';
import { PropsTOCProvider } from '@site/src/utils/toc/PropsTOCManager';
import { TOCProvider } from '@site/src/utils/toc/TOCManager';

export default function Root({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);

  return (
    <TOCProvider>
      <PropsTOCProvider>{children}</PropsTOCProvider>
    </TOCProvider>
  );
}
