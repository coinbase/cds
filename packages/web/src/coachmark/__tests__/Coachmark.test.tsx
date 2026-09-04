import { renderA11y } from '@coinbase/cds-web-utils';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Coachmark, type CoachmarkProps } from '../Coachmark';

const exampleProps: CoachmarkProps = {
  title: 'Title',
  content: 'Content',
  action: <button type="button">button</button>,
  testID: 'coachmark-test',
};

describe('Coachmark', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <Coachmark {...exampleProps} />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders title and content', () => {
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders checkbox', () => {
    const checkbox = <input type="checkbox" />;
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} checkbox={checkbox} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders action button', () => {
    const action = <button type="button">Action</button>;
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} action={action} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} closeButtonAccessibilityLabel="close" onClose={onClose} />
      </DefaultThemeProvider>,
    );

    screen.getByLabelText('close').click();

    expect(onClose).toHaveBeenCalled();
  });

  it('renders media', () => {
    const media = <img alt="Media" src="image.png" />;
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} media={media} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByAltText('Media')).toBeInTheDocument();
  });

  it('renders with custom width', () => {
    render(
      <DefaultThemeProvider>
        <Coachmark {...exampleProps} width={500} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('coachmark-test')).toHaveStyle({ '--width': '500px' });
  });
});
