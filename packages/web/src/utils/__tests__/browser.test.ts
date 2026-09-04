import { getBrowserGlobals, isBrowser, onBrowser, onSSR } from '../browser';

let windowSpy: jest.SpyInstance;

describe('browser.test', () => {
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('returns true when window is defined', () => {
    expect(isBrowser()).toBe(true);
  });

  it('returns false when window is not defined', () => {
    windowSpy.mockImplementation(() => undefined);

    expect(isBrowser()).toBe(false);
  });

  it('returns false when window document is not defined', () => {
    windowSpy.mockImplementation(() => ({ document: undefined }));

    expect(isBrowser()).toBe(false);
  });

  it('triggers browser callback', () => {
    const callback = jest.fn();
    const otherwise = jest.fn();

    onBrowser(callback, otherwise);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(otherwise).not.toHaveBeenCalled();

    windowSpy.mockImplementation(() => undefined);

    onBrowser(callback, otherwise);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(otherwise).toHaveBeenCalledTimes(1);
  });

  it('triggers ssr callback', () => {
    const callback = jest.fn();
    const otherwise = jest.fn();

    onSSR(callback, otherwise);
    expect(callback).not.toHaveBeenCalled();
    expect(otherwise).toHaveBeenCalledTimes(1);

    windowSpy.mockImplementation(() => undefined);

    onSSR(callback, otherwise);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(otherwise).toHaveBeenCalledTimes(1);
  });

  it('gets browser global', () => {
    expect(getBrowserGlobals()).toEqual({ window, document });

    windowSpy.mockImplementation(() => undefined);

    expect(getBrowserGlobals()).toBeUndefined();
  });
});
