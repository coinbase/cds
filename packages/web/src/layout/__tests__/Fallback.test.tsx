import { renderA11y } from '@cbhq/cds-web-utils/jest/renderA11y';

import { Fallback } from '../Fallback';

const testID = 'test-fallback';
const props = {
  width: 100,
  height: 50,
  testID,
};

describe('Fallback', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Fallback {...props} />)).toHaveNoViolations();
  });
});
