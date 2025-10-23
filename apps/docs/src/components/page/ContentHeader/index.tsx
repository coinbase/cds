import React, { memo } from 'react';
import { Grid } from '@coinbase/cds-web/layout';
import { Divider } from '@coinbase/cds-web/layout/Divider';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Link } from '@coinbase/cds-web/typography/Link';
import { Text } from '@coinbase/cds-web/typography/Text';
import DocusaurusLink from '@docusaurus/Link';
import { LLMDocButtons } from '@site/src/components/page/LLMDocButton';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import CodeBlock from '@theme/CodeBlock';

import { useDocsTheme } from '../../../theme/Layout/Provider/UnifiedThemeContext';

import styles from './styles.module.css';

type RelatedComponent = {
  /** The URL that the related component links to */
  url: string;
  /** The display label for the related component */
  label: string;
};

type Dependency = {
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
  relatedComponents?: RelatedComponent[];
  /** Dependencies required by this component */
  dependencies?: Dependency[];
};

type ComponentHeaderProps = {
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

export const ContentHeader = memo(
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
    } = activeMetadata ?? {};

    const descriptionText = activeMetadata?.description ?? description;
    const hasMetadataItems = importText || changelog || source || storybook || figma;

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
        <VStack gap={4} padding={4} paddingTop={4}>
          <VStack gap={3}>
            <Text font="display2">{title}</Text>
            {descriptionText && <Text font="title4">{descriptionText}</Text>}
          </VStack>
          {hasMetadataItems && (
            <Grid
              alignItems="center"
              columnGap={2}
              columns={2}
              gridTemplateColumns="100px 1fr"
              rowGap={1.5}
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
            <VStack gap={1} padding={4}>
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
                      {dependency.version && <span>{`@${dependency.version}`}</span>}
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
            <VStack gap={1} padding={4}>
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
