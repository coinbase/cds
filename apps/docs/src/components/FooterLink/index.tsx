import React, { type JSX } from 'react';
import { Text, type TextDefaultElement, type TextProps } from '@coinbase/cds-web/typography/Text';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Link, { type Props } from '@docusaurus/Link';

import styles from './styles.module.css';

type FooterLinkProps = Pick<Props, 'isNavLink' | 'to' | 'href' | 'autoAddBaseUrl'> &
  TextProps<TextDefaultElement> & {
    children?: React.ReactNode;
  };

/**
 * FooterLink combines Text styling with Link functionality.
 * It provides consistent typography while handling both internal and external links.
 *
 * @example
 * <FooterLink to="/docs">Internal link</FooterLink>
 * <FooterLink href="https://example.com">External link</FooterLink>
 */
export function FooterLink({
  children,
  className,
  font = 'headline',
  isNavLink,
  to,
  href,
  autoAddBaseUrl,
  ...props
}: FooterLinkProps): JSX.Element {
  const destination = to || href;
  const isInternal = destination ? isInternalUrl(destination) : false;

  return (
    <Link
      className={className}
      {...(isInternal ? { to: destination } : { href: destination })}
      {...(!isInternal && {
        rel: 'noopener noreferrer',
        target: '_blank',
      })}
      autoAddBaseUrl={autoAddBaseUrl}
      isNavLink={isNavLink}
    >
      <Text className={styles.text} font={font} {...props}>
        {children}
      </Text>
    </Link>
  );
}
