import _debounce from 'lodash/debounce';

import { debounce } from '../debounce';

jest.mock('lodash/debounce');

describe('debounce', () => {
  it('should call debounce with the correct parameters', () => {
    const fn = jest.fn();
    const delay = 1000;

    debounce(fn, delay);

    expect(_debounce).toHaveBeenCalledWith(fn, delay, { leading: true, trailing: false });
  });

  it('should use a default delay of 500ms if no delay is provided', () => {
    const fn = jest.fn();

    debounce(fn);

    expect(_debounce).toHaveBeenCalledWith(fn, 500, { leading: true, trailing: false });
  });
});
