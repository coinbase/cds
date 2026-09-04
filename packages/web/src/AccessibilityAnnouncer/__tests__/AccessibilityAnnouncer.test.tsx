import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import { AccessibilityAnnouncer } from '../AccessibilityAnnouncer';

const TEST_ID = 'accessibility-announcer-id';
const TEST_MESSAGE = 'This is a really great message!';

describe('AccessibilityAnnouncer', () => {
  it('Passes accessibility (hehe)', async () => {
    expect(
      await renderA11y(<AccessibilityAnnouncer message={TEST_MESSAGE} testID={TEST_ID} />),
    ).toHaveNoViolations();
  });

  it('Properly configures testIDs', () => {
    render(<AccessibilityAnnouncer message={TEST_MESSAGE} testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toBeVisible();
    expect(screen.getByTestId(`${TEST_ID}--message`)).toBeVisible();
  });

  it('Announces messages', () => {
    render(<AccessibilityAnnouncer message={TEST_MESSAGE} testID={TEST_ID} />);

    expect(screen.getByText(TEST_MESSAGE)).toBeVisible();
  });

  it('Is polite by default', () => {
    render(<AccessibilityAnnouncer message={TEST_MESSAGE} testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('aria-live', 'polite');
  });

  it('Is assertive when necessary', () => {
    render(
      <AccessibilityAnnouncer message={TEST_MESSAGE} politeness="assertive" testID={TEST_ID} />,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('aria-live', 'assertive');
  });

  it('Removes itself from the DOM to make room for the next message', async () => {
    render(<AccessibilityAnnouncer message={TEST_MESSAGE} testID={TEST_ID} />);

    expect(screen.getByText(TEST_MESSAGE)).toBeVisible();
    await waitForElementToBeRemoved(screen.queryByText(TEST_MESSAGE), { timeout: 600 });
  });
});
