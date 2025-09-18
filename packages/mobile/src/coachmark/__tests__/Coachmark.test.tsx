import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls';
import { RemoteImage } from '../../media';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Coachmark, type CoachmarkProps } from '../Coachmark';

const exampleProps: CoachmarkProps = {
  title: 'Title',
  content: 'Content',
  action: <Button>button</Button>,
  testID: 'coachmark-test',
};

describe('Coachmark', () => {
  it('passes accessibility', async () => {
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(exampleProps.testID as string)).toBeAccessible();
  });

  it('renders title and content', () => {
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('renders checkbox', () => {
    const checkbox = <Checkbox>Checked</Checkbox>;
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} checkbox={checkbox} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('checkbox')).toBeTruthy();
  });

  it('renders action button', () => {
    const action = <Button>Action</Button>;
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} action={action} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button', { name: 'Action' })).toBeTruthy();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} closeButtonAccessibilityLabel="close" onClose={onClose} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByLabelText('close'));

    expect(onClose).toHaveBeenCalled();
  });

  it('renders media', () => {
    const media = (
      <RemoteImage
        borderColor="bgPrimary"
        source="https://images.coinbase.com/avatar?s=56"
        testID="remoteimage"
      />
    );
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} media={media} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('remoteimage')).toBeTruthy();
  });

  it('renders with custom width', () => {
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} width={500} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('coachmark-test')).toHaveStyle({ width: 500 });
  });
});
