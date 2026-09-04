import React, { type ReactNode, useCallback } from 'react';
import { IconButton } from '@coinbase/cds-web/buttons/IconButton';
import { Tooltip } from '@coinbase/cds-web/overlays/tooltip/Tooltip';
import { useToast } from '@coinbase/cds-web/overlays/useToast';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/CodeBlock/CopyButton';

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  return false;
}

export default function CopyButton({ code }: Props): ReactNode {
  const toast = useToast();
  const handleCopyCode = useCallback(async () => {
    const success = await copyTextToClipboard(code);
    if (success) {
      toast.show(
        translate({
          id: 'theme.CodeBlock.copied',
          message: 'Copied',
          description: 'The copied button label on code blocks',
        }),
      );
    }
  }, [code, toast]);

  return (
    <Tooltip
      content={translate({
        id: 'theme.CodeBlock.copyButtonAriaLabel',
        message: 'Copy code to clipboard',
        description: 'The ARIA label for copy code blocks button',
      })}
      placement="top"
    >
      <IconButton
        compact
        transparent
        accessibilityLabel={translate({
          id: 'theme.CodeBlock.copyButtonAriaLabel',
          message: 'Copy code to clipboard',
          description: 'The ARIA label for copy code blocks button',
        })}
        name="copy"
        onClick={handleCopyCode}
      />
    </Tooltip>
  );
}
