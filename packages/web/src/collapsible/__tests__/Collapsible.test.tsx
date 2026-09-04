import React, { useCallback, useState } from 'react';
import { usePrefixedId } from '@coinbase/cds-common/hooks/usePrefixedId';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Button } from '../../buttons';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import { Collapsible } from '../Collapsible';

const TestCollapsible = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);

  const toggleCollapsed = useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    [setCollapsed],
  );

  return (
    <>
      <Button
        aria-controls={collapsibleId}
        aria-expanded={!collapsed}
        id={triggerId}
        onClick={toggleCollapsed}
      >
        Click me!
      </Button>
      <Collapsible
        accessibilityLabelledBy={triggerId}
        collapsed={collapsed}
        id={collapsibleId}
        testID="mock-collapse"
      >
        <Text font="body">Collapsible Content</Text>
      </Collapsible>
    </>
  );
};

describe('Collapsible', () => {
  beforeEach(() => {
    jest.spyOn(window, 'scrollTo').mockImplementation();
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <TestCollapsible />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('shows and hides content', async () => {
    render(
      <DefaultThemeProvider>
        <TestCollapsible />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-collapse')).toHaveStyle('display: none');
    expect(screen.getByText('Collapsible Content')).not.toBeVisible();

    fireEvent.click(screen.getByText('Click me!'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-collapse')).not.toHaveStyle('display: none');
    });
    await waitFor(() => {
      expect(screen.getByText('Collapsible Content')).toBeVisible();
    });

    fireEvent.click(screen.getByText('Click me!'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-collapse')).toHaveStyle('display: none');
    });
    await waitFor(() => {
      expect(screen.getByText('Collapsible Content')).not.toBeVisible();
    });
  });
});
