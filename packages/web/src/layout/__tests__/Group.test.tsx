import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Group } from '../Group';

describe('Group', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Group>Child</Group>)).toHaveNoViolations();
  });

  it('defaults to role=group', () => {
    render(<Group>Child</Group>);
    expect(screen.getByRole('group')).not.toBeNull();
  });
});
