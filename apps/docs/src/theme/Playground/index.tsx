import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider, withLive } from 'react-live';
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
import * as estreePlugin from 'prettier/plugins/estree.js';
import * as typescriptPlugin from 'prettier/plugins/typescript.js';
import { format } from 'prettier/standalone';
import { themes as prismThemes } from 'prism-react-renderer';

import { usePlaygroundTheme } from '../Layout/Provider/UnifiedThemeContext';

import styles from './styles.module.css';

const PlaygroundEditorHeader = memo(() => {
  return (
    <Box borderedBottom paddingBottom={0.5} paddingTop={0.75} paddingX={1} width="100%">
      <Text alignItems="center" color="fgMuted" display="flex" font="label1" userSelect="none">
        <Icon active color="fgMuted" name="pencil" paddingEnd={0.5} size="xs" /> Live Code
      </Text>
    </Box>
  );
});

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

const prettierOptions = {
  parser: 'typescript',
  plugins: [estreePlugin, typescriptPlugin] as any,
};

type PlaygroundControlsProps = {
  collapsed: boolean;
  headingText: string;
  onClickCopy: () => void;
  onToggleCollapsed: () => void;
};

const PlaygroundControls = memo(
  ({ collapsed, headingText, onClickCopy, onToggleCollapsed }: PlaygroundControlsProps) => {
    return (
      <HStack alignItems="center" gap={2} paddingTop={0.5}>
        <Pressable
          noScaleOnPress
          accessibilityLabel={`${collapsed ? 'Show' : 'Hide'} code${
            headingText ? ` for ${headingText} example` : ''
          }`}
          onClick={onToggleCollapsed}
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
          onClick={onClickCopy}
        >
          <HStack alignItems="center">
            <Icon name="copy" paddingEnd={0.5} size="xs" />
            <Text color="fgPrimary" font="label1">
              Copy code
            </Text>
          </HStack>
        </Pressable>
      </HStack>
    );
  },
);

type PlaygroundProps = Omit<React.ComponentProps<typeof LiveProvider>, 'transformCode'> & {
  transformCode?: (val: string) => string;
  children: string;
  hideControls?: boolean;
  hidePreview?: boolean;
  editorStartsExpanded?: boolean;
};

const Playground = memo(function Playground({
  children,
  transformCode,
  hideControls,
  hidePreview,
  editorStartsExpanded,
  code: codeProp,
  ...props
}: PlaygroundProps): JSX.Element {
  const [code, setCode] = useState((codeProp ?? children ?? '').replace(/\n$/, ''));
  const codeRef = useRef(code);

  const [collapsed, setIsCollapsed] = useState(!editorStartsExpanded);
  const toggleCollapsed = useCallback(() => setIsCollapsed((collapsed) => !collapsed), []);
  const toast = useToast();
  const { colorScheme, theme } = usePlaygroundTheme();
  // If you update this you also need to update the prismThemes in apps/docs/docusaurus.config.ts and apps/docs/src/theme/CodeBlock/Content/String.tsx
  const prismTheme = colorScheme === 'dark' ? prismThemes.nightOwl : prismThemes.github;

  const { editorRef, headingText } = useGetHeadingText();

  const handleCodeChange = useCallback((code: string) => {
    codeRef.current = code;
    setCode(code);
  }, []);

  const handleTransformCode = useCallback(
    (code: string) => {
      const transformedCode = transformCode ? transformCode(code) : code;
      codeRef.current = transformedCode;
      setCode(transformedCode);
    },
    [transformCode],
  );

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(codeRef.current)
      .then(() => toast.show('Copied to clipboard'))
      .catch(() => toast.show('Failed to copy to clipboard'));
  }, [toast]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'KeyS' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        format(codeRef.current, prettierOptions).then(handleTransformCode);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleTransformCode]);

  return (
    <VStack ref={editorRef} paddingBottom={3} position="relative" zIndex={0}>
      <ThemeProvider activeColorScheme={colorScheme} theme={theme}>
        <LiveProvider code={code} theme={prismTheme} {...props}>
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
              <PlaygroundEditorHeader />
              <LiveEditor className={styles.playgroundEditor} onChange={handleCodeChange} />
            </VStack>
          </Collapsible>
          {!hideControls && (
            <PlaygroundControls
              collapsed={collapsed}
              headingText={headingText}
              onClickCopy={handleCopyToClipboard}
              onToggleCollapsed={toggleCollapsed}
            />
          )}
        </LiveProvider>
      </ThemeProvider>
    </VStack>
  );
});

export default Playground;
