import { useWindowSize } from '@docusaurus/theme-common';
import { DESKTOP_BREAKPOINT } from '@site/src/constants';

export function useWindowSizeWithBreakpointOverride() {
  const windowSize = useWindowSize({ desktopBreakpoint: DESKTOP_BREAKPOINT });
  return windowSize;
}
