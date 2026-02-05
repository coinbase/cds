import React, { useState } from 'react';
export const SearchFilterContext = React.createContext('');
export const SetSearchFilterContext = React.createContext(() => { });
export const ExamplesSearchProvider = ({ children, }) => {
    const [filter, setFilter] = useState('');
    return (<SetSearchFilterContext.Provider value={setFilter}>
      <SearchFilterContext.Provider value={filter}>{children}</SearchFilterContext.Provider>
    </SetSearchFilterContext.Provider>);
};
//# sourceMappingURL=ExamplesSearchProvider.js.map