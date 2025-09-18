const sleep = async (time: number) =>
  new Promise((res) => {
    setTimeout(res, time);
  });

function getUrl(platform: 'ios' | 'android') {
  const url = `http://localhost:8081/index.bundle?platform=${platform}&dev=true&minify=false&disableOnboarding=1`;
  return encodeURIComponent(url);
}

export async function openApp() {
  const platform = 'ios';
  const deepLinkUrl = `cds://expo-development-client/?url=${getUrl(platform)}`;

  if (platform === 'ios') {
    await device.launchApp({
      newInstance: true,
    });
    await sleep(3000);
    await device.openURL({
      url: deepLinkUrl,
    });
  } else {
    await device.launchApp({
      newInstance: true,
      url: deepLinkUrl,
    });
  }

  await sleep(3000);
}
