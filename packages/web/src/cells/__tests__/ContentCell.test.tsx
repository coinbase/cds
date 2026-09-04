import { noop } from '@coinbase/cds-utils';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { CellMedia } from '../CellMedia';
import { ContentCell } from '../ContentCell';

const URL = 'https://www.google.com';
const A11Y_TEXT = 'Some accessible text';

describe('ContentCell', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <ContentCell description="Description" meta="Meta" subtitle="Subtitle" title="Title" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility when a button', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <ContentCell
            description="Description"
            meta="Meta"
            onClick={noop}
            subtitle="Subtitle"
            title="Title"
          />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility when a link', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <ContentCell
            description="Description"
            href={URL}
            meta="Meta"
            subtitle="Subtitle"
            title="Title"
          />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('sets an accessibile label with accessibilityLabel when pressable', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell accessibilityLabel={A11Y_TEXT} onClick={noop} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessibile label with accessibilityLabelledBy when pressable', () => {
    const labelId = 'label-id';

    render(
      <DefaultThemeProvider>
        <span id={labelId}>{A11Y_TEXT}</span>
        <ContentCell accessibilityLabelledBy={labelId} onClick={noop} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessibile description with accessibilityHint when pressable', () => {
    const descriptionId = 'description-id';

    render(
      <DefaultThemeProvider>
        <span id={descriptionId}>{A11Y_TEXT}</span>
        <ContentCell accessibilityHint={descriptionId} onClick={noop} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleDescription(A11Y_TEXT);
  });

  it('errors if meta is provided without title/subtitle', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <DefaultThemeProvider>
        <ContentCell meta="Meta" />
      </DefaultThemeProvider>,
    );

    expect(spy).toHaveBeenCalledWith(
      'ContentCell: Cannot use meta content without a title or subtitle.',
    );

    spy.mockRestore();
  });

  it('renders a title', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell title={<div data-testid="title">Title</div>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('title')).toBeVisible();
  });

  it('renders a subtitle', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell subtitle={<div data-testid="subtitle">Subtitle</div>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('subtitle')).toBeVisible();
  });

  it('renders a description', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell description={<div data-testid="description">Description</div>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('description')).toBeVisible();
  });

  it('renders meta', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell meta={<div data-testid="meta">Meta</div>} title="Title" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('meta')).toBeVisible();
  });

  it('renders media', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell media={<CellMedia active name="add" testID="media" type="icon" />} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('media')).toBeVisible();
  });

  it('renders an accessory', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell accessory="arrow" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('accessory')).toBeVisible();
  });

  it('renders override nodes when provided', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell
          accessoryNode={<div data-testid="accessory-node">Accessory Node</div>}
          description="Description"
          descriptionNode={<div data-testid="description-node">Description Node</div>}
          meta="Meta"
          metaNode={<div data-testid="meta-node">Meta Node</div>}
          subtitle="Subtitle"
          subtitleNode={<div data-testid="subtitle-node">Subtitle Node</div>}
          title="Title"
          titleNode={<div data-testid="title-node">Title Node</div>}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('title-node')).toBeVisible();
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
    expect(screen.getByTestId('subtitle-node')).toBeVisible();
    expect(screen.queryByText('Subtitle')).not.toBeInTheDocument();
    expect(screen.getByTestId('description-node')).toBeVisible();
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
    expect(screen.getByTestId('meta-node')).toBeVisible();
    expect(screen.queryByText('Meta')).not.toBeInTheDocument();
    expect(screen.getByTestId('accessory-node')).toBeVisible();
  });

  it('renders button when onClick is defined', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell onClick={noop} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyPress is defined', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell onClick={noop} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyDown is defined', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell onKeyDown={noop} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders link when to is set with a url', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell href={URL} />
      </DefaultThemeProvider>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when href is set with a url', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell href={URL} />
      </DefaultThemeProvider>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but to is set with a url', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell href={URL} onClick={noop} />
      </DefaultThemeProvider>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but href is set with a url', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell href={URL} onClick={noop} />
      </DefaultThemeProvider>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('sets target on link when target is defined', () => {
    const target = '_blank';

    render(
      <DefaultThemeProvider>
        <ContentCell href={URL} target={target} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('target', target);
  });

  it('allows title to wrap to two lines in condensed spacing', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell description="Description" spacingVariant="condensed" title="Title" />
      </DefaultThemeProvider>,
    );

    const title = screen.getByText('Title');

    expect(title).toHaveStyle('--text-numberOfLines: 2');
  });

  it('limits title to a single line when description is present outside condensed spacing', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell description="Description" spacingVariant="normal" title="Title" />
      </DefaultThemeProvider>,
    );

    const title = screen.getByText('Title');

    expect(title).toHaveStyle('--text-numberOfLines: 1');
  });

  it('fires onClick', () => {
    const onClickSpy = jest.fn();

    render(
      <DefaultThemeProvider>
        <ContentCell onClick={onClickSpy} />
      </DefaultThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button'));

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyUp', () => {
    const onKeyUpSpy = jest.fn();

    render(
      <DefaultThemeProvider>
        <ContentCell onKeyUp={onKeyUpSpy} />
      </DefaultThemeProvider>,
    );
    fireEvent.keyUp(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyUpSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyDown', () => {
    const onKeyDownSpy = jest.fn();

    render(
      <DefaultThemeProvider>
        <ContentCell onKeyDown={onKeyDownSpy} />
      </DefaultThemeProvider>,
    );
    fireEvent.keyDown(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });
});
