import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import debounce from 'lodash/debounce';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import * as estreePlugin from 'prettier/plugins/estree.js';
import * as typescriptPlugin from 'prettier/plugins/typescript.js';
import { format } from 'prettier/standalone';

import { usePlaygroundTheme } from '../../../theme/Layout/Provider/UnifiedThemeContext';
import ReactLiveScope from '../../../theme/ReactLiveScope';

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

const getSharedCode = () => {
  if (typeof window === 'undefined') return;
  const urlParams = new URLSearchParams(window.location.search);
  const sharedCode = urlParams.get('code');
  if (sharedCode) return decompressFromEncodedURIComponent(sharedCode);
};

const defaultCodeExample = `// Create your own example components and hooks, then call render() to render them

type CounterProps = {
  label: string;
};

const Counter = ({ label }: CounterProps) => {
  const [count, setCount] = useState<number>(0);
  return (
    <VStack background="bgAlternate" borderRadius={200} padding={2}>
      <Text font="title1" paddingBottom={1.5}>
        {label}: {count}
      </Text>
      <Button onClick={() => setCount((c) => ++c)}>Increment</Button>
    </VStack>
  );
};

// You must call render() to render your code
render(<Counter label="My cool counter" />);
`;

const prettierOptions = {
  parser: 'typescript',
  plugins: [estreePlugin, typescriptPlugin] as any,
  arrowParens: 'always',
  bracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
} as const;

type PlaygroundControlsProps = {
  onClickCopy: () => void;
  onClickShare: () => void;
};

const PlaygroundControls = memo(({ onClickCopy, onClickShare }: PlaygroundControlsProps) => {
  return (
    <HStack alignItems="center" gap={2} paddingTop={0.5}>
      <Pressable noScaleOnPress accessibilityLabel="Copy code" onClick={onClickCopy}>
        <HStack alignItems="center">
          <Icon name="copy" paddingEnd={0.5} size="xs" />
          <Text color="fgPrimary" font="label1">
            Copy code
          </Text>
        </HStack>
      </Pressable>
      <Pressable noScaleOnPress accessibilityLabel="Share code" onClick={onClickShare}>
        <HStack alignItems="center">
          <Icon name="share" paddingEnd={0.5} size="xs" />
          <Text color="fgPrimary" font="label1">
            Share code
          </Text>
        </HStack>
      </Pressable>
    </HStack>
  );
});

type LiveProviderProps = React.ComponentProps<typeof LiveProvider>;

type ShareablePlaygroundProps = Omit<LiveProviderProps, 'children' | 'code' | 'transformCode'> & {
  /** The default initial code to display in the playground if no code was provided via the URL. */
  defaultInitialCode: string;
};

export const ShareablePlayground = memo(function Playground({
  defaultInitialCode: defaultInitialCodeProp = defaultCodeExample,
  ...props
}: ShareablePlaygroundProps): JSX.Element {
  const defaultInitialCode = useMemo(
    () => defaultInitialCodeProp.replace(/\n$/, ''),
    [defaultInitialCodeProp],
  );
  const [code, setCode] = useState(() => getSharedCode() ?? defaultInitialCode);
  const codeRef = useRef(code);
  const toast = useToast();
  const { colorScheme, theme, prismTheme } = usePlaygroundTheme();

  const handleUrlUpdate = useMemo(
    () =>
      debounce((code: string) => {
        const compressedCode = compressToEncodedURIComponent(code);
        const url = new URL(window.location.href);
        url.searchParams.set('code', compressedCode);
        window.history.replaceState({}, '', url.toString());
      }, 500),
    [],
  );

  const handleCodeChange = useCallback(
    (code: string) => {
      codeRef.current = code;
      handleUrlUpdate(code);
      setCode(code);
    },
    [handleUrlUpdate],
  );

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(codeRef.current)
      .then(() => toast.show('Copied to clipboard'))
      .catch(() => toast.show('Failed to copy to clipboard'));
  }, [toast]);

  const handleShareCode = useCallback(() => {
    try {
      const compressedCode = compressToEncodedURIComponent(codeRef.current);
      const url = new URL(window.location.href);
      // If the code has changed from the default value we include it in the URL
      if (codeRef.current !== defaultInitialCode) url.searchParams.set('code', compressedCode);

      navigator.clipboard
        .writeText(url.toString())
        .then(() => toast.show('Share link copied to clipboard'));
    } catch (error) {
      toast.show('Failed to copy share link');
    }
  }, [defaultInitialCode, toast]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'KeyS' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        format(codeRef.current, prettierOptions).then(handleCodeChange);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleCodeChange]);

  return (
    <VStack paddingBottom={3}>
      <ThemeProvider activeColorScheme={colorScheme} theme={theme}>
        <LiveProvider
          enableTypeScript
          code={code}
          language="tsx"
          noInline={true}
          scope={ReactLiveScope}
          theme={prismTheme}
          {...props}
        >
          <VStack background="bg" borderRadius={400} color="fg" font="body" padding={3}>
            <BrowserOnly fallback={<div>Loading...</div>}>{previewComponent}</BrowserOnly>
          </VStack>
          <VStack paddingBottom={0.5} paddingTop={1}>
            <VStack background="bg" borderRadius={400} overflow="hidden" width="100%">
              <PlaygroundEditorHeader />
              <LiveEditor className={styles.playgroundEditor} onChange={handleCodeChange} />
            </VStack>
          </VStack>
          <PlaygroundControls onClickCopy={handleCopyToClipboard} onClickShare={handleShareCode} />
        </LiveProvider>
      </ThemeProvider>
    </VStack>
  );
});
