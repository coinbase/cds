import React, { type JSX } from 'react';
import { cx } from '@coinbase/cds-web';
import { Button, type ButtonProps } from '@coinbase/cds-web/buttons';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

type ButtonLinkProps = ButtonProps<typeof Link>;

/**
 * ButtonLink combines Button styling with Link functionality.
 * It maintains the Button's hover behavior while providing navigation capabilities.
 * When used with transparent={true}, it will use fgPrimary as hover color.
 * Handles both internal and external links appropriately.
 *
 * @example
 * <ButtonLink to="/docs" variant="primary">Internal link</ButtonLink>
 * <ButtonLink href="https://example.com" transparent>External link</ButtonLink>
 */
export function ButtonLink({
  to,
  href,
  className,
  transparent,
  ...props
}: ButtonLinkProps): JSX.Element {
  const destination = to || href;
  const isInternal = destination ? isInternalUrl(destination) : false;

  return (
    <Button
      as={Link}
      className={cx(transparent ? styles.transparent : styles.default, className)}
      {...(isInternal
        ? { to: destination }
        : { href: destination, rel: 'noopener noreferrer', target: '_blank' })}
      transparent={transparent}
      {...props}
    />
  );
}
