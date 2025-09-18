import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { InputIconButton } from '../InputIconButton';
import { SearchInput } from '../SearchInput';

const TEST_ID = 'search';
const ROLE = 'search';

describe('Search', () => {
  let SearchComponent: React.ReactElement;
  const onClearSpy = jest.fn();
  const onChangeTextSpy = jest.fn();
  const onSearchSpy = jest.fn();

  beforeAll(() => {
    SearchComponent = (
      <DefaultThemeProvider>
        <SearchInput
          clearIconAccessibilityLabel="Clear text"
          onChangeText={onChangeTextSpy}
          onClear={onClearSpy}
          onSearch={onSearchSpy}
          placeholder="Placeholder"
          startIconAccessibilityLabel="Back"
          testID={TEST_ID}
          value="value"
        />
      </DefaultThemeProvider>
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('passes a11y', () => {
    render(SearchComponent);

    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders a search', () => {
    render(SearchComponent);

    expect(screen.getByRole(ROLE)).toBeDefined();
  });

  it('able to set a default value', () => {
    render(SearchComponent);

    expect(screen.getByRole('search').props.value).toBe('value');
  });

  it('renders a backArrow icon button at the start node', () => {
    render(
      <DefaultThemeProvider>
        <SearchInput
          clearIconAccessibilityLabel="Clear text"
          onChangeText={onChangeTextSpy}
          onClear={onClearSpy}
          onSearch={onSearchSpy}
          placeholder="Placeholder"
          startIcon="backArrow"
          startIconAccessibilityLabel="Back"
          testID={TEST_ID}
          value="value"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText(`Back`)).toBeDefined();
  });

  it('does not render a startIcon when hideStartIcon=true', () => {
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

    expect(screen.queryByTestId(`${TEST_ID}-searchinput-iconbtn`)).toBeNull();
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
              onPress={() => console.log()}
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

  it('announces a single search label (no-dupes test)', () => {
    render(SearchComponent);

    // This will throw if we find duplicates
    expect(screen.getByLabelText(`search`)).toBeAccessible();
  });

  it('announces the Back arrow icon button', () => {
    render(
      <DefaultThemeProvider>
        <SearchInput
          onChangeText={onChangeTextSpy}
          onClear={onClearSpy}
          onSearch={onSearchSpy}
          placeholder="Placeholder"
          startIcon="backArrow"
          startIconAccessibilityLabel="Back"
          testID={TEST_ID}
          value="value"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText(`Back`)).toBeAccessible();
  });

  it('renders a close icon button at the end node', () => {
    render(SearchComponent);

    expect(screen.getByTestId(`${TEST_ID}-close-iconbtn`)).toBeDefined();
  });

  it('fires `onSearch` when search btn is pressed', () => {
    render(SearchComponent);

    fireEvent.press(screen.getByTestId(`${TEST_ID}-searchinput-iconbtn`));

    expect(onSearchSpy).toHaveBeenCalled();
  });

  it('fires `onClear` when clear btn is pressed', () => {
    render(SearchComponent);

    fireEvent.press(screen.getByTestId(`${TEST_ID}-close-iconbtn`));

    expect(onClearSpy).toHaveBeenCalled();
  });
});
