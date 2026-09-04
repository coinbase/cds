import '@testing-library/jest-dom';

import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { HexagonBorder } from '../Hexagon';

const TEST_ID = 'cds-hexagon-test';
describe('HexagonBorder', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<HexagonBorder strokeColor="blue" />)).toHaveNoViolations();
  });

  it('renders with no offset by default', () => {
    render(<HexagonBorder strokeColor="blue" testID={TEST_ID} />);

    const container = screen.getByTestId(TEST_ID);
    expect(container).toHaveAttribute('data-offset', 'false');
  });

  it('renders with offset when offset prop is true', () => {
    render(<HexagonBorder offset strokeColor="var(--primary)" testID={TEST_ID} />);

    const container = screen.getByTestId(TEST_ID);
    expect(container).toHaveAttribute('data-offset', 'true');
  });

  it('renders with the correct border color', () => {
    render(<HexagonBorder strokeColor="blue" testID={TEST_ID} />);

    const path = screen.getByTestId(`${TEST_ID}-path`);
    expect(path).toHaveAttribute('stroke', 'blue');
  });
});
