import React, { forwardRef } from 'react';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import LogoSvg from '@site/static/img/logos/cds_logo.svg';
import type { Props } from '@theme/Logo';

const Logo = forwardRef<HTMLAnchorElement, Props>(
  ({ imageClassName, titleClassName, ...linkProps }, ref) => {
    const { withBaseUrl } = useBaseUrlUtils();

    return (
      <Link ref={ref} to={withBaseUrl('/')} {...linkProps}>
        <LogoSvg title="Coinbase Design System Logo" />
      </Link>
    );
  },
);

Logo.displayName = 'Logo';

export default Logo;
