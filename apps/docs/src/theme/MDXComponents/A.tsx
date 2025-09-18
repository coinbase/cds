import React, { forwardRef } from 'react';
import { Link } from '@cbhq/cds-web/typography/Link';
import type { Props } from '@theme/MDXComponents/A';

/**
 * Custom MDX link component that overrides Docusaurus's default link behavior.
 *
 * IMPORTANT: Why are we overriding the CSS variable?
 * ----------------------------------------------------
 * Docusaurus uses a global theming system with CSS variables (--ifm-*) that cascade
 * throughout the entire application. These affect ALL links site-wide via selectors like:
 *
 * a:hover {
 *   color: var(--ifm-link-hover-color);
 * }
 *
 * This creates unintended styling in unrelated components
 * because the global styles apply to all <a> elements regardless of which component renders them.
 *
 * Our solution:
 * - We override the --ifm-link-hover-color variable with inline styles
 * - This has higher specificity than global styles
 * - It "opts out" our links from Docusaurus's global styling system
 * - The variable is set to --color-fgPrimary to maintain consistent theme styling
 */
const MDXA = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  // Extract color prop to avoid type incompatibility

  const { color, style, ...restProps } = props;

  // Override the hover color behavior by adding a style that maintains the same color on hover
  const mergedStyle = {
    ...style,
    // This will ensure the link color doesn't change on hover
    '--ifm-link-hover-color': 'var(--color-fgPrimary)',
  };

  // Only pass compatible props to Link
  return <Link {...restProps} ref={ref} style={mergedStyle} />;
});

export default MDXA;
