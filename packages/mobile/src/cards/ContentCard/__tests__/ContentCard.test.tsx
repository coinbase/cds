import { Text } from 'react-native';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../../buttons/Button';
import { Avatar } from '../../../media/Avatar';
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

  it('renders with background prop', () => {
    render(
      <DefaultThemeProvider>
        <ContentCard background="bgAlternate" testID="content-card-test-id">
          <Text>Test Content</Text>
        </ContentCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('content-card-test-id')).toBeTruthy();
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

  it('renders custom title node', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader title={<Text testID="custom-title">Custom Title</Text>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-title')).toBeTruthy();
  });

  it('renders thumbnail', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader thumbnail={<Text>Test Thumbnail</Text>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Thumbnail')).toBeTruthy();
  });

  it('renders Avatar as thumbnail', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader thumbnail={<Avatar name="Test" />} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('renders subtitle', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader subtitle="Test Subtitle" title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Subtitle')).toBeTruthy();
  });

  it('renders custom subtitle node', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader
          subtitle={<Text testID="custom-subtitle">Custom Subtitle</Text>}
          title="Test Title"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-subtitle')).toBeTruthy();
  });

  it('renders actions', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardHeader actions={<Text>Test Actions</Text>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Test Actions')).toBeTruthy();
  });

  it('renders actions with Button', () => {
    const onPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <ContentCardHeader actions={<Button onPress={onPress}>Action</Button>} title="Test Title" />
      </DefaultThemeProvider>,
    );
    fireEvent.press(screen.getByText('Action'));
    expect(onPress).toHaveBeenCalled();
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

  it('renders custom title node', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody title={<Text testID="custom-title">Custom Title</Text>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-title')).toBeTruthy();
  });

  it('renders custom description node', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody
          description={<Text testID="custom-description">Custom Description</Text>}
          title="Test Title"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('custom-description')).toBeTruthy();
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

  it('renders media with mediaPlacement top', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody
          media={<Text testID="test-media">Test Media</Text>}
          mediaPlacement="top"
          title="Test Title"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-media')).toBeTruthy();
    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('renders media with mediaPlacement bottom', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody
          media={<Text testID="test-media">Test Media</Text>}
          mediaPlacement="bottom"
          title="Test Title"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-media')).toBeTruthy();
    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('renders media with mediaPlacement start', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody
          media={<Text testID="test-media">Test Media</Text>}
          mediaPlacement="start"
          title="Test Title"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-media')).toBeTruthy();
    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('renders media with mediaPlacement end', () => {
    render(
      <DefaultThemeProvider>
        <ContentCardBody
          media={<Text testID="test-media">Test Media</Text>}
          mediaPlacement="end"
          title="Test Title"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('test-media')).toBeTruthy();
    expect(screen.getByText('Test Title')).toBeTruthy();
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
  it('has no accessibility violations', () => {
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

  it('renders with Button children', () => {
    const onPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <ContentCardFooter>
          <Button onPress={onPress}>Primary Action</Button>
          <Button variant="tertiary">Secondary Action</Button>
        </ContentCardFooter>
      </DefaultThemeProvider>,
    );
    fireEvent.press(screen.getByText('Primary Action'));
    expect(onPress).toHaveBeenCalled();
    expect(screen.getByText('Secondary Action')).toBeTruthy();
  });
});

describe('ContentCard composition', () => {
  it('renders complete card with all subcomponents', () => {
    render(
      <DefaultThemeProvider>
        <ContentCard testID="content-card-test-id">
          <ContentCardHeader
            subtitle="Subtitle"
            thumbnail={<Avatar name="Test" />}
            title="Header Title"
          />
          <ContentCardBody description="Body Description" title="Body Title" />
          <ContentCardFooter>
            <Button>Action</Button>
          </ContentCardFooter>
        </ContentCard>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Header Title')).toBeTruthy();
    expect(screen.getByText('Subtitle')).toBeTruthy();
    expect(screen.getByText('Body Title')).toBeTruthy();
    expect(screen.getByText('Body Description')).toBeTruthy();
    expect(screen.getByText('Action')).toBeTruthy();
  });
});
