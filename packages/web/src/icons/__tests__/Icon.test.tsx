import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Icon } from '../Icon';

type IconExampleProps = {
  accessibilityLabel?: string;
  title?: string;
};

const IconExample = (props: IconExampleProps) => (
  <DefaultThemeProvider>
    <Icon name="copy" size="m" {...props} />
  </DefaultThemeProvider>
);

describe('Icon', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<IconExample />)).toHaveNoViolations();
  });

  it('is aria hidden by default', () => {
    render(<IconExample />);

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('is not aria hidden and has an accessible label when `accessibilityLabel` is defined', () => {
    const label = 'some label';

    render(<IconExample accessibilityLabel={label} />);

    const icon = screen.getByRole('img');

    expect(icon).toBeTruthy();
    expect(icon).toHaveAttribute('aria-label', label);
    expect(icon).toHaveAttribute('title', label);
  });
});
