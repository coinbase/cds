import React, { memo, useCallback, useMemo } from 'react';
import { Chip } from '@coinbase/cds-web/chips/Chip';
import { Icon } from '@coinbase/cds-web/icons';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { Tooltip } from '@coinbase/cds-web/overlays';
import { useToast } from '@coinbase/cds-web/overlays/useToast';
import { useLocation } from '@docusaurus/router';
import { LinkChip } from '@site/src/components/page/LinkChip';
import { usePlatformContext } from '@site/src/utils/PlatformContext';

type MetadataLinksProps = {
  /** URL to source code */
  source?: string;
  /** URL to Storybook */
  storybook?: string;
  /** URL to changelog */
  changelog?: string;
  /** URL to Figma */
  figma?: string;
};

/**
 * Displays metadata links (Source, Storybook, Changelog, Figma) and LLM doc buttons.
 */
export const MetadataLinks = memo(({ source, storybook, changelog, figma }: MetadataLinksProps) => {
  const { platform } = usePlatformContext();
  const toast = useToast();
  const location = useLocation();

  // Parse the current URL to determine doc type and title
  const llmDocUrl = useMemo(() => {
    const pathname = location.pathname;
    const parts = pathname.split('/').filter(Boolean);

    // Extract doc type (first segment) and title (last segment) from URL
    // e.g., /components/Button -> { docType: 'components', title: 'Button' }
    // e.g., /components/layout/AccordionItem -> { docType: 'components', title: 'AccordionItem' }
    // e.g., /hooks/useTheme -> { docType: 'hooks', title: 'useTheme' }
    // e.g., /getting-started/installation -> { docType: 'getting-started', title: 'installation' }
    const docType = parts.length >= 2 ? parts[0] : 'components';
    const title = parts.length >= 2 ? parts[parts.length - 1] : 'unknown';

    return `/llms/${platform}/${docType}/${title}.txt`;
  }, [location.pathname, platform]);

  const handleCopyLLMDoc = useCallback(async () => {
    try {
      const response = await fetch(llmDocUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch LLM doc');
      }
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      toast.show('Copied to clipboard');
    } catch (error) {
      console.error('Failed to copy LLM doc:', error);
      toast.show('Failed to copy to clipboard');
    }
  }, [llmDocUrl, toast]);

  return (
    <HStack flexWrap="wrap" gap={1}>
      {source && (
        <LinkChip href={source} startIcon="gitHubLogo">
          Source
        </LinkChip>
      )}
      {storybook && <LinkChip href={storybook}>Storybook</LinkChip>}
      {changelog && <LinkChip href={changelog}>Changelog</LinkChip>}
      {figma && (
        <Tooltip content="Internal only">
          <LinkChip endIcon="lock" href={figma}>
            Figma
          </LinkChip>
        </Tooltip>
      )}
      <Chip compact onClick={handleCopyLLMDoc} start={<Icon color="fg" name="copy" size="s" />}>
        Copy for LLM
      </Chip>
      <LinkChip href={llmDocUrl}>View as Markdown</LinkChip>
    </HStack>
  );
});
