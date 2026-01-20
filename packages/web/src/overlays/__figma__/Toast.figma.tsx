/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from 'react';
import { figma } from '@figma/code-connect';

import { Button } from '../../buttons';
import { PortalProvider } from '../PortalProvider';
import { Toast } from '../Toast';
import { useToast } from '../useToast';

figma.connect(
  Toast,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=8500%3A674',
  {
    imports: ["import { useToast } from '@coinbase/cds-web/overlays/useToast'"],
    props: {
      hideCloseButton: figma.boolean('close', {
        true: undefined,
        false: true,
      }),
      content: figma.nestedProps('string.toast', {
        string: figma.enum('Ready-made', {
          Custom: figma.string('string'),
          Transaction: figma.textContent('toast-label'),
          'Copied to clipboard': figma.textContent('toast-label'),
          Reward: figma.textContent('toast-label'),
        }),
      }),
      action: figma.boolean('action', {
        true: { label: 'Button', onPress: () => {} },
        false: undefined,
      }),
    },
    example: () => {
      const toast = useToast();
      const handleShowToast = useCallback(() => {
        toast.show('Toast content', {
          action: { label: 'Action', onPress: () => {} },
          onWillHide: () => {},
          onDidHide: () => {},
        });
      }, [toast]);

      return (
        <PortalProvider>
          <Button onClick={handleShowToast}>Show Toast</Button>
        </PortalProvider>
      );
    },
  },
);
