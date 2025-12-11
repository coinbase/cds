import React, { memo } from 'react';
import { Banner } from '@coinbase/cds-web/banner/Banner';
import { Grid } from '@coinbase/cds-web/layout';
import { Divider } from '@coinbase/cds-web/layout/Divider';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Link } from '@coinbase/cds-web/typography/Link';
import { Text } from '@coinbase/cds-web/typography/Text';
import DocusaurusLink from '@docusaurus/Link';
import { LLMDocButtons } from '@site/src/components/page/LLMDocButton';
import { VersionLabel } from '@site/src/components/page/VersionLabel';
import { useDocsTheme } from '@site/src/theme/Layout/Provider/UnifiedThemeContext';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import CodeBlock from '@theme/CodeBlock';

import styles from './styles.module.css';

type RelatedComponent = {
  /** The URL that the related component links to */
  url: string;
  /** The display label for the related component */
  label: string;
};

export type Dependency = {
  /** The name of the dependency package */
  name: string;
  /** Optional version requirement */
  version?: string;
  /** Optional URL to the package */
  url?: string;
};

type MetadataType = {
  import: string;
  source: string;
  changelog?: string;
  storybook?: string;
  figma?: string;
  description?: string;
  warning?: string;
  /** Indicates that this component is in alpha status */
  alpha?: boolean;
  relatedComponents?: RelatedComponent[];
  /** Dependencies required by this component */
  dependencies?: Dependency[];
};

type ContentHeaderProps = {
  /** The title of the component */
  title: string;
  /** Optional description of the component */
  description?: string;
  /** Metadata for web platform */
  webMetadata?: MetadataType;
  /** Metadata for mobile platform */
  mobileMetadata?: MetadataType;
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

type MetadataItemProps = {
  label: string;
  children: React.ReactNode;
};

const MetadataItem = ({ label, children }: MetadataItemProps) => (
  <>
    <Text font="label1">{label}</Text>
    {children}
  </>
);

export const ComponentHeader = memo(
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
        <VStack gap={4} padding={{ base: 4, phone: 2 }}>
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
          {activeMetadata && (
            <Grid
              alignItems="center"
              columnGap={2}
              gridTemplateColumns={{ base: '100px minmax(0, 1fr)', phone: 'minmax(0, 1fr)' }}
              overflow="hidden"
              rowGap={{ base: 1.5, phone: 1 }}
            >
              {importText && (
                <MetadataItem label="Import">
                  <CodeBlock className={styles.importText} language="tsx">
                    {importText}
                  </CodeBlock>
                </MetadataItem>
              )}
              {changelog && (
                <MetadataItem label="Changelog">
                  <Text font="body">
                    <Link as={DocusaurusLink} target="_blank" to={changelog}>
                      View changelog
                    </Link>
                  </Text>
                </MetadataItem>
              )}
              {source && (
                <MetadataItem label="Source">
                  <Text font="body">
                    <Link as={DocusaurusLink} target="_blank" to={source}>
                      View source code
                    </Link>
                  </Text>
                </MetadataItem>
              )}
              {storybook && (
                <MetadataItem label="Storybook">
                  <Text font="body">
                    <Link as={DocusaurusLink} target="_blank" to={storybook}>
                      View Storybook
                    </Link>
                  </Text>
                </MetadataItem>
              )}
              {figma && (
                <MetadataItem label="Figma">
                  <Text font="body">
                    <Link as={DocusaurusLink} target="_blank" to={figma}>
                      View Figma (internal only)
                    </Link>
                  </Text>
                </MetadataItem>
              )}
            </Grid>
          )}
        </VStack>

        {dependencies && dependencies.length > 0 && (
          <>
            <Divider />
            <VStack gap={{ base: 1, phone: 0 }} paddingX={{ base: 4, phone: 2 }} paddingY={2}>
              <Text font="label1">Peer dependencies</Text>
              <HStack
                as="ul"
                flexWrap="wrap"
                margin={0}
                padding={0}
                style={{
                  listStyleType: 'none',
                }}
              >
                {dependencies.map((dependency, index) => (
                  <li key={dependency.name}>
                    <Text font="label2" style={{ whiteSpace: 'pre-wrap' }}>
                      {dependency.url ? (
                        <Link as={DocusaurusLink} target="_blank" to={dependency.url}>
                          {dependency.name}
                        </Link>
                      ) : (
                        dependency.name
                      )}
                      {dependency.version && <span>{`: ${dependency.version}`}</span>}
                      {index < dependencies.length - 1 && ', '}
                    </Text>
                  </li>
                ))}
              </HStack>
            </VStack>
          </>
        )}

        {relatedComponents && relatedComponents.length > 0 && (
          <>
            <Divider />
            <VStack gap={{ base: 1, phone: 0 }} paddingX={{ base: 4, phone: 2 }} paddingY={2}>
              <Text font="label1">Related components</Text>
              <HStack
                as="ul"
                flexWrap="wrap"
                margin={0}
                padding={0}
                style={{
                  listStyleType: 'none',
                }}
              >
                {relatedComponents.map((component, index) => (
                  <li key={component.url}>
                    <Text font="label2" style={{ whiteSpace: 'pre-wrap' }}>
                      <Link as={DocusaurusLink} to={component.url}>
                        {component.label}
                      </Link>
                      {index < relatedComponents.length - 1 && ', '}
                    </Text>
                  </li>
                ))}
              </HStack>
            </VStack>
          </>
        )}
        <Divider />
        <HStack paddingX={{ base: 4, phone: 2 }} paddingY={2}>
          <LLMDocButtons />
        </HStack>
      </VStack>
    );
  },
);
