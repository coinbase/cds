import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Collapsible } from '@coinbase/cds-web/collapsible/Collapsible';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { Box } from '@coinbase/cds-web/layout';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { useToast } from '@coinbase/cds-web/overlays/useToast';
import { Pressable } from '@coinbase/cds-web/system';
import { ThemeProvider } from '@coinbase/cds-web/system/ThemeProvider';
import { Text } from '@coinbase/cds-web/typography/Text';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { ErrorBoundaryErrorMessageFallback } from '@docusaurus/theme-common';
import { themes as prismThemes } from 'prism-react-renderer';

import { usePlaygroundTheme } from '../Layout/Provider/UnifiedThemeContext';

import styles from './styles.module.css';

type PlaygroundProps = Omit<React.ComponentProps<typeof LiveProvider>, 'transformCode'> & {
  transformCode?: (val: string) => string;
  children: string;
  hideControls?: boolean;
  hidePreview?: boolean;
  editorStartsExpanded?: boolean;
};

const renderErrorFallback = (params: any) => <ErrorBoundaryErrorMessageFallback {...params} />;

const previewComponent = () => (
  <>
    <ErrorBoundary fallback={renderErrorFallback}>
      <LivePreview />
    </ErrorBoundary>
    <LiveError />
  </>
);

const isHeader = (element: HTMLElement): boolean => {
  return (
    element.tagName === 'H1' ||
    element.tagName === 'H2' ||
    element.tagName === 'H3' ||
    element.tagName === 'H4' ||
    element.tagName === 'H5' ||
    element.tagName === 'H6'
  );
};

const useGetHeadingText = () => {
  const [headingText, setHeadingText] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the heading text from the previous header sibling
    if (!editorRef.current?.parentElement) return;

    let currentElement = editorRef.current.parentElement;
    if (isHeader(currentElement) && currentElement.classList.contains('anchor')) {
      setHeadingText(currentElement.textContent?.toLowerCase() || '');
      return;
    }

    // Look through previous siblings for a header
    while (currentElement.previousElementSibling) {
      currentElement = currentElement.previousElementSibling as HTMLElement;
      if (isHeader(currentElement) && currentElement.classList.contains('anchor')) {
        setHeadingText(currentElement.textContent?.toLowerCase() || '');
        return;
      }
    }

    // No appropriate heading found
    setHeadingText('');
  }, []);

  return { editorRef, headingText };
};

const Playground = memo(function Playground({
  children,
  transformCode,
  hideControls,
  hidePreview,
  editorStartsExpanded,
  ...props
}: PlaygroundProps): JSX.Element {
  const initialCode = children.replace(/\n$/, '');
  const codeRef = useRef(initialCode);

  const [collapsed, setIsCollapsed] = useState(!editorStartsExpanded);
  const toggleCollapsed = useCallback(() => setIsCollapsed((collapsed) => !collapsed), []);
  const toast = useToast();
  const { colorScheme, theme } = usePlaygroundTheme();
  // If you update this you also need to update the prismThemes in apps/docs/docusaurus.config.ts and apps/docs/src/theme/CodeBlock/Content/String.tsx
  const prismTheme = colorScheme === 'dark' ? prismThemes.nightOwl : prismThemes.github;

  const { editorRef, headingText } = useGetHeadingText();

  // We treat the LiveProvider like an uncontrolled component, but
  // we want to be able to copy the edited code so we need to keep
  // track of the code in a ref
  const handleTransformCode = useCallback(
    (code: string) => {
      codeRef.current = code;
      if (transformCode) return transformCode(code);
      return code;
    },
    [transformCode],
  );

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(codeRef.current)
      .then(() => toast.show('Copied to clipboard'))
      .catch(() => toast.show('Failed to copy to clipboard'));
  }, [toast]);

  return (
    <VStack ref={editorRef} paddingBottom={3} position="relative" zIndex={0}>
      <ThemeProvider activeColorScheme={colorScheme} theme={theme}>
        <LiveProvider
          code={initialCode}
          theme={prismTheme}
          transformCode={handleTransformCode}
          {...props}
        >
          {!hidePreview && (
            <VStack
              background="bg"
              borderRadius={400}
              color="fg"
              font="body"
              padding={3}
              position="relative"
              zIndex={0}
            >
              <BrowserOnly fallback={<div>Loading...</div>}>{previewComponent}</BrowserOnly>
            </VStack>
          )}
          <Collapsible collapsed={collapsed} paddingBottom={0.5} paddingTop={1}>
            <VStack background="bg" borderRadius={400} overflow="hidden" width="100%">
              <Box borderedBottom paddingBottom={0.5} paddingTop={0.75} paddingX={1} width="100%">
                <Text
                  alignItems="center"
                  color="fgMuted"
                  display="flex"
                  font="label1"
                  userSelect="none"
                >
                  <Icon active color="fgMuted" name="pencil" paddingEnd={0.5} size="xs" /> Live Code
                </Text>
              </Box>
              <LiveEditor className={styles.playgroundEditor} />
            </VStack>
          </Collapsible>
          {!hideControls && (
            <HStack alignItems="center" gap={2} paddingTop={0.5}>
              <Pressable
                noScaleOnPress
                accessibilityLabel={`${collapsed ? 'Show' : 'Hide'} code${
                  headingText ? ` for ${headingText} example` : ''
                }`}
                onClick={toggleCollapsed}
              >
                <HStack alignItems="center">
                  <Icon name={collapsed ? 'caretDown' : 'caretUp'} paddingEnd={0.5} size="xs" />
                  <Text color="fgPrimary" font="label1">
                    {collapsed ? 'Show code' : 'Hide code'}
                  </Text>
                </HStack>
              </Pressable>
              <Pressable
                noScaleOnPress
                accessibilityLabel={`Copy code${headingText ? ` for ${headingText} example` : ''}`}
                onClick={handleCopyToClipboard}
              >
                <HStack alignItems="center">
                  <Icon name="copy" paddingEnd={0.5} size="xs" />
                  <Text color="fgPrimary" font="label1">
                    Copy code
                  </Text>
                </HStack>
              </Pressable>
            </HStack>
          )}
        </LiveProvider>
      </ThemeProvider>
    </VStack>
  );
});

export default Playground;
