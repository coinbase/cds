import React, { memo } from 'react';
import type { LogoMarkParams } from '@coinbase/cds-common/hooks/useLogo';
import { useLogoMark } from '@coinbase/cds-common/hooks/useLogo';
import { css } from '@linaria/core';

import { useTheme } from '../hooks/useTheme';

const iconCss = css`
  color: currentColor;
  font-family: 'CoinbaseIcons';
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  flex-shrink: 0;
  display: block;
  text-decoration: none;
`;

const transitionCss = css`
  transition: fill 150ms ease-in-out;
`;

export const LogoMark = memo(({ size, foreground }: Omit<LogoMarkParams, 'colorScheme'>) => {
  const { activeColorScheme } = useTheme();
  const { viewBox, width, height, path, color } = useLogoMark({
    size,
    foreground,
    colorScheme: activeColorScheme,
  });

  return (
    <svg
      aria-label="Coinbase logo"
      className={iconCss}
      height={height}
      role="img"
      viewBox={viewBox}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Coinbase logo</title>
      <path className={transitionCss} d={path} fill={color} />
    </svg>
  );
});
