import React, { createContext, useCallback, useContext, useMemo } from 'react';
import type { DocFrontMatter } from '@docusaurus/plugin-content-docs';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useHistory, useLocation } from '@docusaurus/router';

type DocFrontMatterExtended = DocFrontMatter & {
  platform_switcher_options?: { web: boolean; mobile: boolean };
};

export type Platform = 'web' | 'mobile';

export type PlatformContextValue = {
  platform: Platform;
  setPlatform: React.Dispatch<React.SetStateAction<Platform>>;
  supportsWeb: boolean;
  supportsMobile: boolean;
};

const PlatformContext = createContext<PlatformContextValue>({
  platform: 'web',
  setPlatform: () => {},
  supportsWeb: false,
  supportsMobile: false,
});

const PLATFORM_SEARCH_PARAM_KEY = 'platform';

export const PlatformContextProvider = ({ children }: { children: React.ReactNode }) => {
  const history = useHistory();
  const { search } = useLocation();
  const { frontMatter } = useDoc();
  const typedFrontMatter = frontMatter as DocFrontMatterExtended;
  const supportsWeb = typedFrontMatter.platform_switcher_options?.web || false;
  const supportsMobile = typedFrontMatter.platform_switcher_options?.mobile || false;

  const platform = useMemo<Platform>(() => {
    const platform = new URLSearchParams(search).get(PLATFORM_SEARCH_PARAM_KEY);
    if (platform === 'web' || platform === 'mobile') {
      return platform;
    }
    if (supportsWeb) {
      return 'web';
    }
    if (supportsMobile) {
      return 'mobile';
    }
    return 'web';
  }, [search, supportsMobile, supportsWeb]);

  const setPlatform = useCallback(
    (platformUpdater: Platform | ((prevPlatform: Platform) => Platform)) => {
      const searchParams = new URLSearchParams(search);
      let currentPlatform = searchParams.get(PLATFORM_SEARCH_PARAM_KEY);
      if (currentPlatform !== 'web' && currentPlatform !== 'mobile') {
        currentPlatform = 'web';
      }
      const newPlatform =
        typeof platformUpdater === 'function'
          ? platformUpdater(currentPlatform as 'mobile' | 'web')
          : platformUpdater;
      searchParams.set(PLATFORM_SEARCH_PARAM_KEY, newPlatform);
      history.push({ search: searchParams.toString() });
    },
    [history, search],
  );

  const value = useMemo(
    () => ({ platform, setPlatform, supportsMobile, supportsWeb }),
    [platform, setPlatform, supportsMobile, supportsWeb],
  );
  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
};

export const usePlatformContext = () => {
  return useContext(PlatformContext);
};
