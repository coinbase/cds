import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
const PLATFORM_STORAGE_KEY = 'cdsPlatform';
const DEFAULT_PLATFORM = 'web';

export const PlatformContextProvider = ({ children }: { children: React.ReactNode }) => {
  const history = useHistory();
  const { search } = useLocation();
  const { frontMatter } = useDoc();
  const typedFrontMatter = frontMatter as DocFrontMatterExtended;
  const supportsWeb = typedFrontMatter.platform_switcher_options?.web || false;
  const supportsMobile = typedFrontMatter.platform_switcher_options?.mobile || false;

  const getDefaultPlatform = useCallback((): Platform => {
    const urlPlatform = new URLSearchParams(search).get(PLATFORM_SEARCH_PARAM_KEY);

    if (urlPlatform) {
      const isSupported =
        (urlPlatform === 'web' && supportsWeb) || (urlPlatform === 'mobile' && supportsMobile);

      if (isSupported) {
        return urlPlatform as Platform;
      }
    }

    // Fall back to page defaults
    if (supportsWeb) {
      return 'web';
    }
    if (supportsMobile) {
      return 'mobile';
    }
    return DEFAULT_PLATFORM;
  }, [search, supportsMobile, supportsWeb]);

  const [platform, setPlatformState] = useState<Platform>(getDefaultPlatform);

  const setPlatform = useCallback(
    (platformUpdater: Platform | ((prevPlatform: Platform) => Platform)) => {
      setPlatformState((currentPlatform) => {
        const newPlatform =
          typeof platformUpdater === 'function'
            ? platformUpdater(currentPlatform)
            : platformUpdater;

        if (typeof window !== 'undefined') {
          localStorage.setItem(PLATFORM_STORAGE_KEY, newPlatform);
        }

        const searchParams = new URLSearchParams(search);
        searchParams.set(PLATFORM_SEARCH_PARAM_KEY, newPlatform);
        history.push({ search: searchParams.toString() });

        return newPlatform;
      });
    },
    [history, search],
  );
  useEffect(() => {
    const urlPlatform = new URLSearchParams(search).get(PLATFORM_SEARCH_PARAM_KEY);

    // Update platform if no URL param and localStorage is available
    if (!urlPlatform && typeof window !== 'undefined') {
      const savedPlatform = localStorage.getItem(PLATFORM_STORAGE_KEY);

      if (savedPlatform) {
        const isSupported =
          (savedPlatform === 'web' && supportsWeb) ||
          (savedPlatform === 'mobile' && supportsMobile);

        if (isSupported) {
          setPlatformState(savedPlatform as Platform);
        }
      }
    }
  }, [search, supportsMobile, supportsWeb]);

  const value = useMemo(
    () => ({ platform, setPlatform, supportsMobile, supportsWeb }),
    [platform, setPlatform, supportsMobile, supportsWeb],
  );
  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
};

export const usePlatformContext = () => {
  return useContext(PlatformContext);
};
