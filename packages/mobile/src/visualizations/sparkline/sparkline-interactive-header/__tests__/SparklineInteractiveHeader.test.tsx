import { DefaultThemeProvider } from '@coinbase/cds-mobile/utils/testHelpers';
import { render, screen } from '@testing-library/react-native';

import { SparklineInteractiveHeader } from '../SparklineInteractiveHeader';

const defaultSubHead = {
  percent: '20%',
  priceChange: '888.88',
  sign: 'positive',
  variant: 'positive',
} as const;

describe('SparklineInteractiveHeader.test', () => {
  it('renders text', () => {
    render(
      <DefaultThemeProvider>
        <SparklineInteractiveHeader
          defaultLabel="test label"
          defaultSubHead={defaultSubHead}
          defaultTitle="test title"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('SparklineInteractiveHeaderTitle').props.defaultValue).toBe(
      'test title',
    );
    expect(screen.getByTestId('SparklineInteractiveHeaderLabel').props.defaultValue).toBe(
      'test label',
    );
    expect(screen.getByTestId('SparklineInteractiveHeaderSubHeadIcon').props.defaultValue).toBe(
      '+',
    );
    expect(screen.getByTestId('SparklineInteractiveHeaderSubHead').props.defaultValue).toBe(
      '888.88 (20%)',
    );
  });

  it('renders without default label', () => {
    render(
      <DefaultThemeProvider>
        <SparklineInteractiveHeader defaultSubHead={defaultSubHead} defaultTitle="test title" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('SparklineInteractiveHeaderTitle').props.defaultValue).toBe(
      'test title',
    );
    expect(screen.getByTestId('SparklineInteractiveHeaderSubHeadIcon').props.defaultValue).toBe(
      '+',
    );
    expect(screen.getByTestId('SparklineInteractiveHeaderSubHead').props.defaultValue).toBe(
      '888.88 (20%)',
    );
  });

  it('renders without default subhead', () => {
    render(
      <DefaultThemeProvider>
        <SparklineInteractiveHeader defaultLabel="test label" defaultTitle="test title" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('SparklineInteractiveHeaderTitle').props.defaultValue).toBe(
      'test title',
    );
    expect(screen.getByTestId('SparklineInteractiveHeaderLabel').props.defaultValue).toBe(
      'test label',
    );
  });
});
