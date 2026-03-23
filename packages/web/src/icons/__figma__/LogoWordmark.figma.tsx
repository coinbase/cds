import { figma } from '@figma/code-connect';

import { ThemeProvider } from '../../system';
import { defaultTheme } from '../../themes/defaultTheme';
import { LogoWordmark } from '../LogoWordmark';

figma.connect(
  LogoWordmark,
  'https://www.figma.com/design/46lNmiV1z8I888My5kNq7R/%E2%9C%A8-Logos?node-id=1269-502',
  {
    imports: ["import { LogoWordmark } from '@coinbase/cds-web/icons/LogoWordmark'"],
    props: {
      foreground: figma.enum('color', {
        primary: undefined,
        foreground: true,
        'primary Foreground': undefined,
      }),
    },
    example: (props) => <LogoWordmark {...props} />,
  },
);

figma.connect(
  LogoWordmark,
  'https://www.figma.com/design/46lNmiV1z8I888My5kNq7R/%E2%9C%A8-Logos?node-id=1269-502',
  {
    imports: [
      "import { LogoWordmark } from '@coinbase/cds-web/icons/LogoWordmark'",
      "import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme'",
    ],
    variant: { color: 'primary Foreground' },
    props: {},
    example: (props) => (
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <LogoWordmark foreground {...props} />
      </ThemeProvider>
    ),
  },
);
