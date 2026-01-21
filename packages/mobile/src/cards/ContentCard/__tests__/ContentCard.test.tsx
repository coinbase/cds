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

  it('renders thumbnail', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader thumbnail={<Text>Test Thumbnail</Text>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Thumbnail')).toBeTruthy();
  });

  it('renders subtitle', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader subtitle={<Text>Test Subtitle</Text>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Subtitle')).toBeTruthy();
  });

  it('renders actions', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader actions={<Text>Test Actions</Text>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Actions')).toBeTruthy();
  });
});

describe('ContentCardBody', () => {
  it('has no accessibility violations', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody
          description="Test Description"
          label="Test Label"
          testID="content-card-test-id"
          title="Test Title"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('content-card-test-id')).toBeAccessible();
  });
  it('renders title and description', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody description="Test Description" title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Title')).toBeTruthy();
    expect(screen.getByText('Test Description')).toBeTruthy();
  });

  it('renders label', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody label="Test Label" title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Label')).toBeTruthy();
  });

  it('renders media', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody media={<Text>Test Media</Text>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Media')).toBeTruthy();
  });

  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody description="Test Description" title="Test Title">
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
