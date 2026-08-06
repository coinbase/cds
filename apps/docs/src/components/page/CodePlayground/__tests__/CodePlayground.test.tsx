/** @jest-environment jsdom */

import React, { act, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { format } from 'prettier/standalone';

import { CodePlayground } from '..';

jest.mock('@cbhq/cds-web/icons/Icon', () => ({ Icon: () => null }));
jest.mock('@cbhq/cds-web/layout', () => ({
  Box: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
}));
jest.mock('@cbhq/cds-web/layout/HStack', () => ({
  HStack: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
}));
jest.mock('@cbhq/cds-web/layout/VStack', () => ({
  VStack: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
}));
jest.mock('@cbhq/cds-web/overlays/useToast', () => ({
  useToast: () => ({ show: jest.fn() }),
}));
jest.mock('@cbhq/cds-web/system', () => ({
  Pressable: ({
    accessibilityLabel,
    children,
    onClick,
  }: {
    accessibilityLabel: string;
    children?: ReactNode;
    onClick: () => void;
  }) => (
    <button aria-label={accessibilityLabel} onClick={onClick} type="button">
      {children}
    </button>
  ),
}));
jest.mock('@cbhq/cds-web/system/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children?: ReactNode }) => <>{children}</>,
}));
jest.mock('@cbhq/cds-web/typography/Text', () => ({
  Text: ({ children }: { children?: ReactNode }) => <span>{children}</span>,
}));
jest.mock(
  '@docusaurus/BrowserOnly',
  () => ({
    __esModule: true,
    default: ({ children }: { children: ReactNode | (() => ReactNode) }) => (
      <>{typeof children === 'function' ? children() : children}</>
    ),
  }),
  { virtual: true },
);
jest.mock(
  '@docusaurus/ErrorBoundary',
  () => ({
    __esModule: true,
    default: ({ children }: { children?: ReactNode }) => <>{children}</>,
  }),
  { virtual: true },
);
jest.mock('@docusaurus/theme-common', () => ({
  ErrorBoundaryErrorMessageFallback: () => <div>Error boundary</div>,
}));
jest.mock('../../../../theme/Layout/Provider/UnifiedThemeContext', () => ({
  usePlaygroundTheme: () => ({ colorScheme: 'light', prismTheme: {}, theme: {} }),
}));
jest.mock('../../../../theme/ReactLiveScope', () => ({ __esModule: true, default: {} }));
jest.mock('prettier/plugins/estree.js', () => ({}));
jest.mock('prettier/plugins/typescript.js', () => ({}));
jest.mock('prettier/standalone', () => ({
  format: jest.fn((code: string) => Promise.resolve(`formatted: ${code}`)),
}));
jest.mock('react-live', () => {
  const { createContext, useContext } = jest.requireActual<typeof React>('react');
  const LiveCodeContext = createContext('');

  return {
    LiveEditor: ({ onChange }: { onChange: (code: string) => void }) => {
      const code = useContext(LiveCodeContext);
      return (
        <textarea
          aria-label="Code editor"
          onInput={(event) => onChange(event.currentTarget.value)}
          value={code}
        />
      );
    },
    LiveError: () => <div>Error output</div>,
    LivePreview: () => {
      const code = useContext(LiveCodeContext);
      return <div data-testid="preview">{code}</div>;
    },
    LiveProvider: ({ children, code }: { children?: ReactNode; code: string }) => (
      <LiveCodeContext.Provider value={code}>{children}</LiveCodeContext.Provider>
    ),
  };
});

describe('CodePlayground', () => {
  let container: HTMLDivElement;
  let root: Root;
  const writeText = jest.fn(() => Promise.resolve());
  const reactActEnvironment = globalThis as typeof globalThis & {
    IS_REACT_ACT_ENVIRONMENT: boolean;
  };

  beforeAll(() => {
    reactActEnvironment.IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterAll(() => {
    reactActEnvironment.IS_REACT_ACT_ENVIRONMENT = false;
  });

  beforeEach(() => {
    window.history.replaceState({}, '', '/getting-started/playground?code=render-malicious-code');
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  const renderPlayground = (defaultInitialCode = 'render(<Text>Local code</Text>);') => {
    act(() => root.render(<CodePlayground defaultInitialCode={defaultInitialCode} />));
  };

  it('ignores URL code and does not render a Share code control', () => {
    renderPlayground();

    expect(container.querySelector<HTMLTextAreaElement>('[aria-label="Code editor"]')?.value).toBe(
      'render(<Text>Local code</Text>);',
    );
    expect(container.querySelector('[aria-label="Share code"]')).toBeNull();
    expect(window.location.search).toBe('?code=render-malicious-code');
  });

  it('keeps local editing, preview, errors, and Copy code available', async () => {
    renderPlayground();
    const editor = container.querySelector<HTMLTextAreaElement>('[aria-label="Code editor"]');

    act(() => {
      if (!editor) throw new Error('Code editor not found');
      editor.value = 'render(<Text>Edited code</Text>);';
      editor.dispatchEvent(new Event('input', { bubbles: true }));
    });

    expect(container.querySelector('[data-testid="preview"]')).toHaveTextContent(
      'render(<Text>Edited code</Text>);',
    );
    expect(container).toHaveTextContent('Error output');

    await act(async () => {
      container.querySelector<HTMLButtonElement>('[aria-label="Copy code"]')?.click();
    });
    expect(writeText).toHaveBeenCalledWith('render(<Text>Edited code</Text>);');
  });

  it('formats the locally edited code with the save shortcut', async () => {
    renderPlayground('unformatted code');

    await act(async () => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { bubbles: true, code: 'KeyS', ctrlKey: true }),
      );
    });

    expect(format).toHaveBeenCalledWith('unformatted code', expect.any(Object));
    expect(container.querySelector<HTMLTextAreaElement>('[aria-label="Code editor"]')?.value).toBe(
      'formatted: unformatted code',
    );
  });
});
