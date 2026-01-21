import React, { memo } from 'react';
import { Banner } from '@coinbase/cds-web/banner/Banner';
import { Divider } from '@coinbase/cds-web/layout/Divider';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import {
  type Metadata,
  MetadataDependencies,
  MetadataLinks,
  MetadataRelatedComponents,
} from '@site/src/components/page/Metadata';
import { VersionLabel } from '@site/src/components/page/VersionLabel';
import { useDocsTheme } from '@site/src/theme/Layout/Provider/UnifiedThemeContext';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import CodeBlock from '@theme/CodeBlock';

import styles from './styles.module.css';

export type ComponentMetadata = Metadata & {
  warning?: string;
  /** Indicates that this component is in alpha status */
  alpha?: boolean;
};

type ComponentHeaderProps = {
  /** The title of the component */
  title: string;
  /** Optional description of the component */
  description?: string;
  /** Metadata for web platform */
  webMetadata?: ComponentMetadata;
  /** Metadata for mobile platform */
  mobileMetadata?: ComponentMetadata;
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

export const ComponentHeader = memo(
  ({
    title,
    description,
    webMetadata,
    mobileMetadata,
    banner,
    bannerDark,
  }: ComponentHeaderProps) => {
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
      warning,
      alpha,
    } = activeMetadata ?? {};

    const descriptionText = activeMetadata?.description ?? description;

    const partialPackageName = importText?.split('/')[1].replaceAll("'", '');
    const packageName = `@coinbase/${partialPackageName}`;

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
            <HStack alignItems="center" flexWrap="wrap" gap={2} justifyContent="space-between">
              <Text font="display2">{title}</Text>
              <VersionLabel packageName={packageName} />
            </HStack>
            {descriptionText && <Text font="title4">{descriptionText}</Text>}
            {warning && (
              <Banner startIcon="warning" variant="warning">
                {warning}
              </Banner>
            )}
            {alpha && (
              <Banner startIcon="info" title="Alpha component" variant="informational">
                Alpha components are stable and safe to use. They allow us to provide new and
                powerful features quickly, without forcing breaking changes. Components will exit
                the alpha status when their deprecated counterpart is removed in the next major
                version.
              </Banner>
            )}
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
