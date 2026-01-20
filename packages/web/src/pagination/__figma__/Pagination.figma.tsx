import { figma } from '@figma/code-connect';

import { Pagination } from '../Pagination';

figma.connect(
  Pagination,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=49607-6651&m=dev',
  {
    imports: ["import { Pagination } from '@coinbase/cds-web/pagination/Pagination'"],
    props: {
      totalPages: figma.enum('number of pages', {
        '5< pages': 5,
        '5+ pages': 8,
        '50+ pages': 100,
      }),
    },
    example: (props) => <Pagination activePage={1} onChange={() => {}} {...props} />,
  },
);
