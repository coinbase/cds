import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Tag } from '../Tag';

describe('Tag', () => {
  const TEST_ID = 'cds-tag-test';
  it('should render text', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue">
          <Text>Tag</Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Tag')).toBeDefined();
  });

  it('attaches testId', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue" testID={TEST_ID}>
          <Text>Tag</Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeDefined();
  });

  it('check Tag passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue" testID={TEST_ID}>
          <Text>Tag</Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('set small border-radius when intent is informational', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue" testID={TEST_ID}>
          <Text>Tag</Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      borderRadius: defaultTheme.borderRadius[100],
    });
  });

  it('set full border-radius when intent is promotional', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue" intent="promotional" testID={TEST_ID}>
          <Text>Tag</Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      borderRadius: defaultTheme.borderRadius[1000],
    });
  });

  it('can set different color scheme', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="red" testID={TEST_ID}>
          <Text>Tag</Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bgNegativeWash,
    });
  });

  it('sets promotional background when emphasis is high', () => {
    render(
      <DefaultThemeProvider>
        <Tag emphasis="high" colorScheme="blue" testID={TEST_ID}>
          <Text>Tag</Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bgPrimary,
    });
  });

  it('sets informational background when emphasis is low', () => {
    render(
      <DefaultThemeProvider>
        <Tag emphasis="low" colorScheme="blue" testID={TEST_ID}>
          <Text>Tag</Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bgPrimaryWash,
    });
  });
});
