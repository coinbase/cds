import { renderA11y } from '@cbhq/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { InputIconButton } from '../InputIconButton';
import { SearchInput } from '../SearchInput';

const TEST_ID = 'searchinput';
const ROLE = 'searchbox';

describe('Search', () => {
  const onClearSpy = jest.fn();
  const onChangeTextSpy = jest.fn();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <SearchInput
            accessibilityLabel="Search Assets"
            clearIconAccessibilityLabel="Clear text"
            onChangeText={onChangeTextSpy}
            placeholder="Placeholder"
            startIconAccessibilityLabel="Back"
            value="value"
          />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('able to set a default value', () => {
    render(
      <DefaultThemeProvider>
        <SearchInput onChangeText={onChangeTextSpy} testID={TEST_ID} value="value" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('searchbox')).toHaveValue('value');
  });

  /** Testing for existence of components */
  it('renders a search', () => {
    render(
      <DefaultThemeProvider>
        <SearchInput
          onChangeText={onChangeTextSpy}
          placeholder="Placeholder"
          testID={TEST_ID}
          value="value"
        />
      </DefaultThemeProvider>,
    );
    const search = screen.queryByRole(ROLE);
    expect(search).toBeDefined();
  });

  it('renders a Search IconButton at the start node', () => {
    render(
      <DefaultThemeProvider>
        <SearchInput
          onChangeText={onChangeTextSpy}
          placeholder="Placeholder"
          testID={TEST_ID}
          value="value"
        />
      </DefaultThemeProvider>,
    );
    const searchIconBtn = screen.getByTestId(`${TEST_ID}-search-icon`);
    expect(searchIconBtn).toBeDefined();
  });

  it('does not render a Search IconButton when hideStartIcon=true', () => {
    render(
      <DefaultThemeProvider>
        <SearchInput
          hideStartIcon
          onChangeText={onChangeTextSpy}
          placeholder="Placeholder"
          testID={TEST_ID}
          value="value"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.queryByTestId(`${TEST_ID}-search-icon`)).toBeNull();
  });

  it('does not render a End IconButton when hideEndIcon=true', () => {
    render(
      <DefaultThemeProvider>
        <SearchInput
          hideEndIcon
          onChangeText={onChangeTextSpy}
          placeholder="Placeholder"
          testID={TEST_ID}
          value="value"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.queryByTestId(`${TEST_ID}-close-iconbtn`)).toBeNull();
  });

  it('renders a End IconButton when hideEndIcon is undefined', () => {
    render(
      <DefaultThemeProvider>
        <SearchInput
          onChangeText={onChangeTextSpy}
          placeholder="Placeholder"
          testID={TEST_ID}
          value="value"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(`${TEST_ID}-close-iconbtn`)).toBeDefined();
  });

  it('renders a Custom End Node when endNode is defined', () => {
    render(
      <DefaultThemeProvider>
        <SearchInput
          end={
            <InputIconButton
              active
              accessibilityHint="Warning text"
              accessibilityLabel="Warning text"
              name="warning"
              onClick={() => console.log()}
              testID="custom-end-iconbtn"
            />
          }
          onChangeText={onChangeTextSpy}
          placeholder="Placeholder"
          testID={TEST_ID}
          value="value"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(`custom-end-iconbtn`)).toBeDefined();
  });

  it('renders a Close IconButton at the end node when there is value', () => {
    render(
      <DefaultThemeProvider>
        <SearchInput
          onChangeText={onChangeTextSpy}
          placeholder="Placeholder"
          testID={TEST_ID}
          value="value"
        />
      </DefaultThemeProvider>,
    );
    const closeIconBtn = screen.getByTestId(`${TEST_ID}-close-iconbtn`);
    expect(closeIconBtn).toBeDefined();
  });

  /** Testing for events */
  it('fires `onClear` when close icon button is pressed', () => {
    render(
      <DefaultThemeProvider>
        <SearchInput
          onChangeText={onChangeTextSpy}
          onClear={onClearSpy}
          placeholder="Placeholder"
          testID={TEST_ID}
          value="value"
        />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onClearSpy).toHaveBeenCalled();
  });
});
