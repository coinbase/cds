import { isRtl } from '../isRtl';

let windowSpy: jest.SpyInstance;

describe('isRtl.test', () => {
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('returns false if not browser', () => {
    windowSpy.mockReturnValue(undefined);

    expect(isRtl()).toBe(false);
  });

  it('returns true if rtl', () => {
    document.documentElement.dir = 'rtl';

    expect(isRtl()).toBe(true);
  });
});
