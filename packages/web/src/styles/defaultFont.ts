import { css } from '@linaria/core';

// eslint-disable-next-line no-restricted-syntax
export const defaultFontStyles = css`
  :global() {
    :root {
      --defaultFont-sans: 'Inter', sans-serif;
      --defaultFont-mono: Menlo, Consolas, monospace;
    }
  }
`;
