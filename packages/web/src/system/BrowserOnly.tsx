import { useIsBrowser } from '../hooks/useIsBrowser';

export type BrowserOnlyProps = {
  children: React.ReactElement;
};

/**
 * Checks if component has mounted and triggers a rerender so SSR UI's can hydrate properly
 * @link https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions
 * Does not render component on the server
 */
export const BrowserOnly = ({ children }: BrowserOnlyProps) => {
  const componentShouldMount = useIsBrowser();

  return componentShouldMount ? children : null;
};
