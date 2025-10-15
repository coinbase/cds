import React, { memo, useCallback, useMemo } from 'react';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { ButtonGroup } from '@coinbase/cds-web/buttons/ButtonGroup';
import { Box } from '@coinbase/cds-web/layout';
import { Tooltip } from '@coinbase/cds-web/overlays/tooltip/Tooltip';
import { useToast } from '@coinbase/cds-web/overlays/useToast';
import { useLocation } from '@docusaurus/router';
import { usePlatformContext } from '@site/src/utils/PlatformContext';

/**
 * A button group that provides access to LLM-friendly documentation.
 */
export const LLMDocButtons = memo(() => {
  const { platform } = usePlatformContext();
  const toast = useToast();
  const location = useLocation();

  // Parse the current URL to determine doc type and title
  const { docType, title } = useMemo(() => {
    const pathname = location.pathname;
    const parts = pathname.split('/').filter(Boolean);

    // Extract doc type (first segment) and title (last segment) from URL
    // e.g., /components/Button -> { docType: 'components', title: 'Button' }
    // e.g., /components/layout/AccordionItem -> { docType: 'components', title: 'AccordionItem' }
    // e.g., /hooks/useTheme -> { docType: 'hooks', title: 'useTheme' }
    // e.g., /getting-started/installation -> { docType: 'getting-started', title: 'installation' }

    if (parts.length >= 2) {
      const docType = parts[0];
      const title = parts[parts.length - 1]; // Get the last segment
      return {
        docType,
        title,
      };
    }

    // Fallback
    return { docType: 'components', title: 'unknown' };
  }, [location.pathname]);

  // Construct the URL path to the LLM text file
  const llmDocUrl = `/llms/${platform}/${docType}/${title}.txt`;

  const handleCopy = useCallback(async () => {
    try {
      // Fetch the text file content
      const response = await fetch(llmDocUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch LLM doc');
      }
      const text = await response.text();

      // Copy to clipboard
      await navigator.clipboard.writeText(text);
      toast.show('Copied to clipboard');
    } catch (error) {
      console.error('Failed to copy LLM doc:', error);
      toast.show('Failed to copy to clipboard');
    }
  }, [llmDocUrl, toast]);

  return (
    <Box flexDirection={{ base: 'row', phone: 'column' }} gap={1}>
      <Button compact transparent onClick={handleCopy} startIcon="copy">
        Copy for LLM
      </Button>
      <Button
        compact
        transparent
        as="a"
        href={llmDocUrl}
        rel="noopener noreferrer"
        startIcon="externalLink"
        target="_blank"
      >
        View as Markdown
      </Button>
    </Box>
  );
});
