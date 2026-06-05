import React, { useState } from 'react';

export const SearchFilterContext = React.createContext('');
export const SetSearchFilterContext = React.createContext<
  React.Dispatch<React.SetStateAction<string>>
>(() => {});

export const ExamplesSearchProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [filter, setFilter] = useState('');

  return (
    <SetSearchFilterContext.Provider value={setFilter}>
      <SearchFilterContext.Provider value={filter}>{children}</SearchFilterContext.Provider>
    </SetSearchFilterContext.Provider>
  );
};
