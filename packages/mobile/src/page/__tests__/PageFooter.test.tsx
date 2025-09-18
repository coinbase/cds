import React from 'react';
import type { View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Box } from '../../layout';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { PageFooter } from '../PageFooter';

const defaultProps = {
  action: (
    <Box>
      <Text font="body">Action</Text>
    </Box>
  ),
  testID: 'page-footer',
};

describe('PageFooter', () => {
  it('passes accessiblility', () => {
    render(
      <DefaultThemeProvider>
        <PageFooter {...defaultProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(defaultProps.testID)).toBeAccessible();
  });

  it('renders action correctly', () => {
    render(
      <DefaultThemeProvider>
        <PageFooter action={<Text font="body">Test</Text>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<View>();
    render(
      <DefaultThemeProvider>
        <PageFooter {...defaultProps} ref={ref} />
      </DefaultThemeProvider>,
    );
    expect(ref.current).not.toBeNull();
  });

  it('applies testID correctly', () => {
    render(
      <DefaultThemeProvider>
        <PageFooter {...defaultProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(defaultProps.testID)).toBeTruthy();
  });
});
