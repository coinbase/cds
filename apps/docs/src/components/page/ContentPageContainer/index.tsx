import React from 'react';
import type { TOCItem } from '@docusaurus/mdx-loader';
import { usePlatformContext } from '@site/src/utils/PlatformContext';

import { TOCUpdater } from '../../../utils/toc/TOCManager';

type ContentMetaContainerProps = {
  webContent?: React.ReactNode;
  mobileContent?: React.ReactNode;
  webContentToc?: TOCItem[];
  mobileContentToc?: TOCItem[];
};

export const ContentPageContainer: React.FC<ContentMetaContainerProps> = ({
  webContent,
  mobileContent,
  webContentToc,
  mobileContentToc,
}) => {
  const { platform } = usePlatformContext();
  const isWeb = platform === 'web';
  const isMobile = platform === 'mobile';

  return (
    <>
      <TOCUpdater toc={isWeb ? webContentToc : mobileContentToc} />
      {isWeb && webContent}
      {isMobile && mobileContent}
    </>
  );
};
