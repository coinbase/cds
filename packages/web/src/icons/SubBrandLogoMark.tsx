import React, { memo } from 'react';
import type { SubBrandLogoMarkParams } from '@coinbase/cds-common/hooks/useSubBrandLogo';
import { useSubBrandLogoMark } from '@coinbase/cds-common/hooks/useSubBrandLogo';
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

export const SubBrandLogoMark = memo(
  ({ type, foreground }: Omit<SubBrandLogoMarkParams, 'colorScheme'>) => {
    const { activeColorScheme } = useTheme();
    const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoMark({
      type,
      foreground,
      colorScheme: activeColorScheme,
    });

    const title = `Coinbase ${type} logo`;

    return (
      <svg
        aria-label={title}
        className={iconCss}
        role="img"
        viewBox={viewBox}
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{title}</title>
        <g>
          <path className={transitionCss} d={logoPath} fill={logoColor} />
          <path className={transitionCss} d={typePath} fill={typeColor} />
        </g>
      </svg>
    );
  },
);
