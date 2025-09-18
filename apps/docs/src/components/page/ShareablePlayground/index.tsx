import React, { memo, useCallback, useMemo, useRef } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Collapsible } from '@cbhq/cds-web/collapsible/Collapsible';
import { Icon } from '@cbhq/cds-web/icons/Icon';
import { Box } from '@cbhq/cds-web/layout';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { Pressable } from '@cbhq/cds-web/system';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { Text } from '@cbhq/cds-web/typography/Text';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { ErrorBoundaryErrorMessageFallback } from '@docusaurus/theme-common';
import debounce from 'lodash/debounce';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { themes as prismThemes } from 'prism-react-renderer';

import { usePlaygroundTheme } from '../../../theme/Layout/Provider/UnifiedThemeContext';
import ReactLiveScope from '../../../theme/ReactLiveScope';

import styles from './styles.module.css';

type ShareablePlaygroundProps = Omit<React.ComponentProps<typeof LiveProvider>, 'transformCode'> & {
  transformCode?: (val: string) => string;
  /** The default initial code to display in the playground if no code was provided via the URL. */
  defaultInitialCode: string;
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

const getSharedCode = () => {
  if (typeof window === 'undefined') return;
  const urlParams = new URLSearchParams(window.location.search);
  const sharedCode = urlParams.get('code');
  if (sharedCode) return decompressFromEncodedURIComponent(sharedCode);
};

const defaultCodeExample = `// Create your own example components and hooks, then call render() to render them

type CounterProps = {
  label: string
}

const Counter = ({ label }: CounterProps) => {
  const [count, setCount] = useState<number>(0)
  return (
    <VStack background="bgAlternate" borderRadius={200} padding={2}>
      <Text font="title1" paddingBottom={1.5}>
        {label}: {count}
      </Text>
      <Button onClick={() => setCount(c => ++c)}>
        Increment
      </Button>
    </VStack>
  )
}

// You must call render() to render your code
render(<Counter label="My cool counter" />)
`;

export const ShareablePlayground = memo(function Playground({
  children,
  transformCode,
  defaultInitialCode: defaultInitialCodeProp = defaultCodeExample,
  ...props
}: ShareablePlaygroundProps): JSX.Element {
  const defaultInitialCode = defaultInitialCodeProp.replace(/\n$/, '');
  const initialCode = getSharedCode() ?? defaultInitialCode;
  // The current code in the editor, used for copying and sharing
  const codeRef = useRef(initialCode);
  const toast = useToast();
  const { colorScheme, theme } = usePlaygroundTheme();
  // If you update this you also need to update the prismThemes in apps/docs/docusaurus.config.ts and apps/docs/src/theme/CodeBlock/Content/String.tsx and apps/docs/src/theme/Playground/index.tsx
  const prismTheme = colorScheme === 'dark' ? prismThemes.nightOwl : prismThemes.github;

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

  // We treat the LiveProvider like an uncontrolled component, but
  // we want to be able to copy the edited code so we need to keep
  // track of the code in a ref. We also update the URL with the
  // compressed code so that the playground can be shared.
  const handleTransformCode = useCallback(
    (code: string) => {
      // If the code hasn't changed we don't need to update anything
      if (code === codeRef.current) return code;
      // Otherwise we update the ref and the URL
      codeRef.current = code;
      handleUrlUpdate(code);
      if (transformCode) return transformCode(code);
      return code;
    },
    [transformCode, handleUrlUpdate],
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

  return (
    <VStack paddingBottom={3}>
      <ThemeProvider activeColorScheme={colorScheme} theme={theme}>
        <LiveProvider
          enableTypeScript
          code={initialCode}
          language="tsx"
          noInline={true}
          scope={ReactLiveScope}
          theme={prismTheme}
          transformCode={handleTransformCode}
          {...props}
        >
          <VStack background="bg" borderRadius={400} color="fg" font="body" padding={3}>
            <BrowserOnly fallback={<div>Loading...</div>}>{previewComponent}</BrowserOnly>
          </VStack>
          <VStack paddingBottom={0.5} paddingTop={1}>
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
          </VStack>
          <HStack alignItems="center" gap={2} paddingTop={0.5}>
            <Pressable
              noScaleOnPress
              accessibilityLabel="Copy code"
              onClick={handleCopyToClipboard}
            >
              <HStack alignItems="center">
                <Icon name="copy" paddingEnd={0.5} size="xs" />
                <Text color="fgPrimary" font="label1">
                  Copy code
                </Text>
              </HStack>
            </Pressable>
            <Pressable noScaleOnPress accessibilityLabel="Share code" onClick={handleShareCode}>
              <HStack alignItems="center">
                <Icon name="share" paddingEnd={0.5} size="xs" />
                <Text color="fgPrimary" font="label1">
                  Share code
                </Text>
              </HStack>
            </Pressable>
          </HStack>
        </LiveProvider>
      </ThemeProvider>
    </VStack>
  );
});
