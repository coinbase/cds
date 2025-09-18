import { figma } from '@figma/code-connect';

import { Button } from '../../buttons/Button';
import { Dropdown } from '../Dropdown';

figma.connect(
  Dropdown,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=696-13841&m=dev',
  {
    imports: [
      "import { Dropdown } from '@cbhq/cds-web/dropdown';",
      "import {Button} from '@cbhq/cds-web/buttons/Button';",
    ],
    props: {
      content: figma.children('*'),
    },
    example: (props) => (
      <Dropdown {...props}>
        <Button>Button</Button>
      </Dropdown>
    ),
  },
);
