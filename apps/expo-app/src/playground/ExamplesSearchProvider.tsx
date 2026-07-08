import React, { useCallback, useState } from 'react';

type SearchContextValue = {
  filter: string;
  isOpen: boolean;
  setFilter: (filter: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
  /** Close search and clear the filter — called when returning to the home screen. */
  resetSearch: () => void;
};

const defaultValue: SearchContextValue = {
  filter: '',
  isOpen: false,
  setFilter: () => {},
  openSearch: () => {},
  closeSearch: () => {},
  resetSearch: () => {},
};

export const SearchContext = React.createContext<SearchContextValue>(defaultValue);

export const ExamplesSearchProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [filter, setFilterState] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const setFilter = useCallback((value: string) => setFilterState(value), []);
  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setFilterState('');
  }, []);
  const resetSearch = closeSearch;

  return (
    <SearchContext.Provider
      value={{ filter, isOpen, setFilter, openSearch, closeSearch, resetSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};
