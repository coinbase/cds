import { renderA11y } from '@cbhq/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { VStack } from '../VStack';

describe('VStack', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<VStack>Child</VStack>)).toHaveNoViolations();
  });

  it('applies column class', () => {
    render(<VStack>Child</VStack>);
    expect(screen.getByText('Child').className).toContain('column');
  });
});
