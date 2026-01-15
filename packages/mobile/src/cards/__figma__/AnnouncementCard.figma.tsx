import { figma } from '@figma/code-connect';

import { AnnouncementCard } from '../AnnouncementCard';

figma.connect(
  AnnouncementCard,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=61%3A956',
  {
    imports: ["import { AnnouncementCard } from '@coinbase/cds-mobile/cards/AnnouncementCard';"],
    props: {
      showtopdivider29390: figma.boolean('show top divider'),
      illustration5960: figma.instance('illustration'),
      description110511: figma.string('description'),
      showbottomdivider59619: figma.boolean('show bottom divider'),
      title110512: figma.string('title'),
      showbutton15215: figma.boolean('show button'),
      platform: figma.enum('platform', {
        '📱 mobile': '---mobile',
        '🖥 desktop': '---desktop',
      }),
    },
    example: () => <AnnouncementCard />,
  },
);
