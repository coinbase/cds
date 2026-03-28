import React, { memo } from 'react';
import type { LogoWordmarkParams } from '@coinbase/cds-common/hooks/useLogo';
import { useLogoWordmark } from '@coinbase/cds-common/hooks/useLogo';
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

export const LogoWordmark = memo(({ foreground }: Omit<LogoWordmarkParams, 'colorScheme'>) => {
  const { activeColorScheme } = useTheme();
  const { viewBox, path, color } = useLogoWordmark({ foreground, colorScheme: activeColorScheme });

  return (
    <svg
      aria-labelledby="logo-wordmark-title"
      className={iconCss}
      role="img"
      viewBox={viewBox}
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="logo-wordmark-title">Coinbase logo</title>
      <path className={transitionCss} d={path} fill={color} />
    </svg>
  );
});
