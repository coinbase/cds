import { useCallback, useRef, useState } from 'react';
import { figma } from '@figma/code-connect';
import { css } from '@linaria/core';

import { Button } from '../../../buttons';
import { FullscreenModal } from '../FullscreenModal';

figma.connect(
  FullscreenModal,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=302%3A20262',
  {
    imports: ["import { FullscreenModal } from '@coinbase/cds-web/overlays/Modal/FullscreenModal'"],
    variant: { layout: 'primary + secondary' },
    props: {
      showSecondaryContentDivider: figma.boolean('show divider'),
      secondaryContent: figma.instance('🔄 secondary content'),
      primaryContent: figma.instance('🔄 primary content'),
    },
    example: function Example(props) {
      const [visible, setVisible] = useState(true);
      const triggerRef = useRef<HTMLButtonElement>(null);
      const focusTrigger = useCallback(() => {
        triggerRef.current?.focus();
      }, []);

      return (
        <>
          <Button ref={triggerRef} onClick={() => setVisible(true)}>
            Open Modal
          </Button>
          <FullscreenModal
            onDidClose={focusTrigger}
            onRequestClose={() => setVisible(false)}
            title="Modal title"
            visible={visible}
            {...props}
          />
        </>
      );
    },
  },
);

figma.connect(
  FullscreenModal,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=302%3A20262',
  {
    imports: ["import { FullscreenModal } from '@coinbase/cds-web/overlays/Modal/FullscreenModal'"],
    variant: { layout: 'primary left aligned' },
    props: {
      showSecondaryContentDivider: figma.boolean('show divider'),
      primaryContent: figma.instance('🔄 primary content'),
    },
    example: function Example(props) {
      const [visible, setVisible] = useState(true);
      const triggerRef = useRef<HTMLButtonElement>(null);
      const focusTrigger = useCallback(() => {
        triggerRef.current?.focus();
      }, []);

      return (
        <>
          <Button ref={triggerRef} onClick={() => setVisible(true)}>
            Open Modal
          </Button>
          <FullscreenModal
            onDidClose={focusTrigger}
            onRequestClose={() => setVisible(false)}
            title="Modal title"
            visible={visible}
            {...props}
          />
        </>
      );
    },
  },
);

figma.connect(
  FullscreenModal,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=302%3A20262',
  {
    imports: ["import { FullscreenModal } from '@coinbase/cds-web/overlays/Modal/FullscreenModal'"],
    variant: { layout: 'primary centered' },
    props: {
      showSecondaryContentDivider: figma.boolean('show divider'),
      secondaryContent: figma.instance('🔄 secondary content'),
      primaryContent: figma.instance('🔄 primary content'),
    },
    example: function Example(props) {
      const [visible, setVisible] = useState(true);
      const triggerRef = useRef<HTMLButtonElement>(null);
      const focusTrigger = useCallback(() => {
        triggerRef.current?.focus();
      }, []);

      return (
        <>
          <Button ref={triggerRef} onClick={() => setVisible(true)}>
            Open Modal
          </Button>
          <FullscreenModal
            contentContainerClassName={css`
              margin-inline-start: auto;
              justify-content: center;
            `}
            onDidClose={focusTrigger}
            onRequestClose={() => setVisible(false)}
            title="Modal title"
            visible={visible}
            {...props}
          />
        </>
      );
    },
  },
);
