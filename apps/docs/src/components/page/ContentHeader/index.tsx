import React, { memo } from 'react';
import { Divider } from '@coinbase/cds-web/layout/Divider';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import {
  type Metadata,
  MetadataDependencies,
  MetadataLinks,
  MetadataRelatedComponents,
} from '@site/src/components/page/Metadata';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import CodeBlock from '@theme/CodeBlock';

import { useDocsTheme } from '../../../theme/Layout/Provider/UnifiedThemeContext';

import styles from './styles.module.css';

type ContentHeaderProps = {
  /** The title of the component */
  title: string;
  /** Optional description of the component */
  description?: string;
  /** Metadata for web platform */
  webMetadata?: Metadata;
  /** Metadata for mobile platform */
  mobileMetadata?: Metadata;
  /**
   * Banner to display at the top of the header.
   * Can be either a React node or image URL string.
   * Used for light mode and as fallback for dark mode if bannerDark is not provided.
   */
  banner?: React.ReactNode;
  /**
   * Optional dark mode banner.
   * Can be either a React node or image URL string.
   * Will be shown instead of banner when in dark mode.
   */
  bannerDark?: React.ReactNode;
};

export const ContentHeader = memo(
  ({ title, description, webMetadata, mobileMetadata, banner, bannerDark }: ContentHeaderProps) => {
    const { platform } = usePlatformContext();
    const { colorScheme } = useDocsTheme();

    const activeMetadata = platform === 'web' ? webMetadata : mobileMetadata;
    const activeBanner = colorScheme === 'dark' && bannerDark ? bannerDark : banner;

    const {
      import: importText,
      source,
      changelog,
      storybook,
      figma,
      relatedComponents,
      dependencies,
    } = activeMetadata ?? {};

    const descriptionText = activeMetadata?.description ?? description;

    return (
      <VStack background="bgAlternate" borderRadius={600} overflow="hidden" width="100%">
        {activeBanner && (
          <VStack display={{ base: 'flex', phone: 'none' }} height={200} width="100%">
            {typeof activeBanner === 'string' ? (
              <img
                alt={`${title} banner`}
                src={activeBanner}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              activeBanner
            )}
          </VStack>
        )}
        <VStack gap={2} padding={{ base: 4, phone: 2 }}>
          <VStack gap={3}>
            <Text font="display2">{title}</Text>
            {descriptionText && <Text font="title4">{descriptionText}</Text>}
          </VStack>
          {importText && (
            <CodeBlock className={styles.importText} language="tsx">
              {importText}
            </CodeBlock>
          )}
          <MetadataLinks
            changelog={changelog}
            figma={figma}
            source={source}
            storybook={storybook}
          />
        </VStack>

        {dependencies && dependencies.length > 0 && (
          <>
            <Divider />
            <MetadataDependencies dependencies={dependencies} />
          </>
        )}

        {relatedComponents && relatedComponents.length > 0 && (
          <>
            <Divider />
            <MetadataRelatedComponents relatedComponents={relatedComponents} />
          </>
        )}
      </VStack>
    );
  },
);
