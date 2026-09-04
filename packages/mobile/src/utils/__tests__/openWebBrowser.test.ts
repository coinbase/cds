import { Linking, Platform } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

import type { Theme } from '../../core/theme';
import { defaultTheme } from '../../themes/defaultTheme';
import { CustomTabsHelper } from '../customTabsHelper';
import { openWebBrowser } from '../openWebBrowser';

const darkTheme = {
  ...defaultTheme,
  activeColorScheme: 'dark',
  spectrum: defaultTheme.darkSpectrum,
  color: defaultTheme.darkColor,
} satisfies Theme;

describe('openWebBrowser', () => {
  it('opens web browser outside of app', async () => {
    const spy = jest.spyOn(Linking, 'openURL');
    await openWebBrowser('https://www.google.com', {
      theme: darkTheme,
      forceOpenOutsideApp: true,
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('opens web browser within app', async () => {
    const spyIsAvailable = jest.spyOn(InAppBrowser, 'isAvailable').mockImplementation(async () => {
      return Promise.resolve(true);
    });
    const spyInAppBrowserOpen = jest.spyOn(InAppBrowser, 'open').mockImplementation();
    await openWebBrowser('https://www.google.com', {
      theme: darkTheme,
      forceOpenOutsideApp: false,
    });
    expect(spyIsAvailable).toHaveBeenCalledTimes(1);
    expect(spyInAppBrowserOpen).toHaveBeenCalledTimes(1);
  });
  it('dark mode configuration is applied in browserConfig', async () => {
    const selectPlatform = jest.spyOn(Platform, 'select').mockImplementation();
    await openWebBrowser('https://www.google.com', {
      theme: darkTheme,
      forceOpenOutsideApp: false,
    });
    expect(selectPlatform).toHaveBeenCalledWith({
      android: {
        theme: darkTheme,
        showTitle: true,
        toolbarColor: darkTheme.color.bg,
        secondaryToolbarColor: darkTheme.color.bgLineHeavy,
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        forceOpenOutsideApp: false,
      },
      ios: {
        theme: darkTheme,
        dismissButtonStyle: 'close',
        preferredBarTintColor: darkTheme.color.bg,
        preferredControlTintColor: darkTheme.color.bgPrimary,
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'crossDissolve',
        modalEnabled: true,
        enableBarCollapsing: false,
        forceOpenOutsideApp: false,
      },
    });
  });
  it('readerMode is configurable', async () => {
    const selectPlatform = jest.spyOn(Platform, 'select').mockImplementation();

    await openWebBrowser('https://www.google.com', {
      theme: darkTheme,
      readerMode: true,
      forceOpenOutsideApp: false,
    });
    expect(selectPlatform).toHaveBeenCalledWith({
      android: {
        theme: darkTheme,
        showTitle: true,
        toolbarColor: darkTheme.color.bg,
        secondaryToolbarColor: darkTheme.color.bgLineHeavy,
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        readerMode: true,
        forceOpenOutsideApp: false,
      },
      ios: {
        theme: darkTheme,
        dismissButtonStyle: 'close',
        preferredBarTintColor: darkTheme.color.bg,
        preferredControlTintColor: darkTheme.color.bgPrimary,
        readerMode: true,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'crossDissolve',
        modalEnabled: true,
        enableBarCollapsing: false,
        forceOpenOutsideApp: false,
      },
    });
  });
  it('preventRedirectionIntoApp flag is configurable', async () => {
    const spyPreventRedirection = jest
      .spyOn(CustomTabsHelper, 'preventRedirectionIntoApp')
      .mockImplementation();
    await openWebBrowser('https://www.google.com', {
      theme: darkTheme,
      preventRedirectionIntoApp: true,
      forceOpenOutsideApp: true,
    });
    expect(spyPreventRedirection).toHaveBeenCalledTimes(1);
  });
  it('can add InAppBrowser configruations', async () => {
    const selectPlatform = jest.spyOn(Platform, 'select').mockImplementation();

    await openWebBrowser('https://www.google.com', {
      // cds custom properties
      theme: darkTheme,
      preventRedirectionIntoApp: true,
      forceOpenOutsideApp: true,
      // iOS Properties
      dismissButtonStyle: 'cancel',
      readerMode: true,
      animated: false,
      modalPresentationStyle: 'fullScreen',
      modalTransitionStyle: 'coverVertical',
      modalEnabled: true,
      enableBarCollapsing: false,
      // Android Properties
      showTitle: true,
      navigationBarColor: 'black',
      navigationBarDividerColor: 'white',
      enableUrlBarHiding: true,
      enableDefaultShare: true,
      forceCloseOnRedirection: false,
      // Specify full animation resource identifier(package:anim/name)
      // or only resource name(in case of animation bundled with app).
      animations: {
        startEnter: 'slide_in_right',
        startExit: 'slide_out_left',
        endEnter: 'slide_in_left',
        endExit: 'slide_out_right',
      },
      headers: {
        'my-custom-header': 'my custom header value',
      },
    });
    expect(selectPlatform).toHaveBeenCalledWith({
      android: {
        toolbarColor: darkTheme.color.bg,
        secondaryToolbarColor: darkTheme.color.bgLineHeavy,
        // cds custom properties
        theme: darkTheme,
        preventRedirectionIntoApp: true,
        forceOpenOutsideApp: true,
        // iOS Properties
        dismissButtonStyle: 'cancel',
        readerMode: true,
        animated: false,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        headers: {
          'my-custom-header': 'my custom header value',
        },
      },
      ios: {
        preferredBarTintColor: darkTheme.color.bg,
        preferredControlTintColor: darkTheme.color.bgPrimary,
        // cds custom properties
        theme: darkTheme,
        preventRedirectionIntoApp: true,
        forceOpenOutsideApp: true,
        // iOS Properties
        dismissButtonStyle: 'cancel',
        readerMode: true,
        animated: false,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        headers: {
          'my-custom-header': 'my custom header value',
        },
      },
    });
  });

  it('should trigger onInvalidURL callback', async () => {
    const onInvalidURL = jest.fn();

    await openWebBrowser('/earn/something', {
      theme: darkTheme,
      preventRedirectionIntoApp: true,
      onInvalidURL,
    });

    expect(onInvalidURL).toHaveBeenCalledTimes(1);
  });

  it('should throw error', async () => {
    jest.spyOn(InAppBrowser, 'open').mockRejectedValueOnce(new Error('test error'));
    const closeSpy = jest.spyOn(InAppBrowser, 'close').mockImplementation();
    const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await openWebBrowser('https://www.google.com', {
      theme: darkTheme,
      preventRedirectionIntoApp: true,
    });

    expect(logSpy).toHaveBeenCalledWith('An error occurred: Error: test error');
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });
});
