import { memo, useState } from 'react';
import { Pagination } from '@coinbase/cds-web/pagination/Pagination';

export const PaginationExample = memo(() => {
  const [activePage, setActivePage] = useState(1);
  return (
    <Pagination
      activePage={activePage}
      onChange={setActivePage}
      style={{ width: 420 }}
      totalPages={9}
    />
  );
});
