import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { ContentCard, ContentCardBody, ContentCardFooter, ContentCardHeader } from '..';

describe('ContentCard', () => {
  it('has no accessibility violations', () => {
    render(
      <DefaultThemeProvider>
        <ContentCard testID="content-card-test-id">
          <Text>Test Content</Text>
        </ContentCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('content-card-test-id')).toBeAccessible();
  });
  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <ContentCard>
          <Text>Test Content</Text>
        </ContentCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Content')).toBeTruthy();
  });
});

describe('ContentCardHeader', () => {
  it('has no accessibility violations', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader testID="content-card-test-id" title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('content-card-test-id')).toBeAccessible();
  });
  it('renders title', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('renders avatar', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader avatar={<Text>Test Avatar</Text>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Avatar')).toBeTruthy();
  });

  it('renders meta', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader meta={<Text>Test Meta</Text>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Meta')).toBeTruthy();
  });

  it('renders end', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader end={<Text>Test End</Text>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test End')).toBeTruthy();
  });
});

describe('ContentCardBody', () => {
  it('has no accessibility violations', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody body="Test Body" label="Test Label" testID="content-card-test-id" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('content-card-test-id')).toBeAccessible();
  });
  it('renders body and label', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody body="Test Body" label="Test Label" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Body')).toBeTruthy();
    expect(screen.getByText('Test Label')).toBeTruthy();
  });

  it('renders media', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody media={<Text>Test Media</Text>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Media')).toBeTruthy();
  });

  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody body="Test Body" label="Test Label">
          <Text>Test Children</Text>
        </ContentCardBody>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Children')).toBeTruthy();
  });
});

describe('ContentCardFooter', () => {
  it('has no accessibility violations', async () => {
    render(
      <DefaultThemeProvider>
        <ContentCardFooter testID="content-card-test-id">
          <Text>Test Footer</Text>
        </ContentCardFooter>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('content-card-test-id')).toBeAccessible();
  });
  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardFooter>
          <Text>Test Footer</Text>
        </ContentCardFooter>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Footer')).toBeTruthy();
  });

  it('renders multiple children', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardFooter>
          <Text>Child 1</Text>
          <Text>Child 2</Text>
        </ContentCardFooter>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Child 1')).toBeTruthy();
    expect(screen.getByText('Child 2')).toBeTruthy();
  });
});
