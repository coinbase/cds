import { tagColorMap, tagEmphasisColorMap } from '@coinbase/cds-common/tokens/tags';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import { Tag } from '../Tag';

describe('Tag', () => {
  const TEST_ID = 'cds-tag-test';
  it('should render text', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue">
          <Text as="p" display="block" font="body">
            Tag
          </Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Tag')).toBeDefined();
  });

  it('attaches testId', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue" testID={TEST_ID}>
          <Text as="p" display="block" font="body">
            Tag
          </Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toBeDefined();
  });

  it('check Tag passes a11y', async () => {
    const TagMock = () => (
      <DefaultThemeProvider>
        <Tag colorScheme="blue" testID={TEST_ID}>
          <Text as="p" display="block" font="body">
            Tag
          </Text>
        </Tag>
      </DefaultThemeProvider>
    );
    expect(await renderA11y(<TagMock />)).toHaveNoViolations();
  });

  it('set small border-radius when intent is informational', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue" testID={TEST_ID}>
          <Text font="body">Tag</Text>
        </Tag>
      </DefaultThemeProvider>,
    );

    // The border radius is set with a linaria class, so we need to check the className
    expect(screen.getByTestId(TEST_ID).className).toContain('100');
  });

  it('set full border-radius when intent is promotional', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue" intent="promotional" testID={TEST_ID}>
          <Text font="body">Tag</Text>
        </Tag>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID).className).toContain('1000');
  });

  it('can set different color scheme', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="red" testID={TEST_ID}>
          <Text as="p" display="block" font="body">
            Tag
          </Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: 'rgb(var(--red0))',
    });
  });

  it('sets promotional background when emphasis is high', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue" emphasis="high" testID={TEST_ID}>
          <Text font="body">Tag</Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: 'rgb(var(--blue60))',
    });
  });

  it('sets informational background when emphasis is low', () => {
    render(
      <DefaultThemeProvider>
        <Tag colorScheme="blue" emphasis="low" testID={TEST_ID}>
          <Text font="body">Tag</Text>
        </Tag>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: 'rgb(var(--blue0))',
    });
  });

  it('verifies tagColorMap maps correctly to tagEmphasisColorMap for backward compatibility', () => {
    expect(tagColorMap.informational).toEqual(tagEmphasisColorMap.low);
    expect(tagColorMap.promotional).toEqual(tagEmphasisColorMap.high);
    expect(tagColorMap.informational.blue.background).toBe('blue0');
    expect(tagColorMap.promotional.blue.background).toBe('blue60');
  });
});
