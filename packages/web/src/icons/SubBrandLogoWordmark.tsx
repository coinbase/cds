import React, { memo } from 'react';
import type { SubBrandLogoWordmarkParams } from '@coinbase/cds-common/hooks/useSubBrandLogo';
import { useSubBrandLogoWordmark } from '@coinbase/cds-common/hooks/useSubBrandLogo';
import { css } from '@linaria/core';

import { useComponentConfig } from '../hooks/useComponentConfig';
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

export type SubBrandLogoWordmarkBaseProps = Omit<SubBrandLogoWordmarkParams, 'colorScheme'>;

export const SubBrandLogoWordmark = memo((_props: SubBrandLogoWordmarkBaseProps) => {
  const mergedProps = useComponentConfig('SubBrandLogoWordmark', _props);
  const { type, ...props } = mergedProps;
  const { activeColorScheme } = useTheme();
  const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoWordmark({
    type,
    ...props,
    colorScheme: activeColorScheme,
  });
  const title = `Coinbase ${type} logo`;

  return (
    <svg
      aria-labelledby="sub-brand-logo-wordmark-title"
      className={iconCss}
      role="img"
      viewBox={viewBox}
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="sub-brand-logo-wordmark-title">{title}</title>
      <g>
        <path className={transitionCss} d={logoPath} fill={logoColor} />
        <path className={transitionCss} d={typePath} fill={typeColor} />
      </g>
    </svg>
  );
});
