export type ColorMode = 'light' | 'dark';

export function getColorModeAndName(name: string) {
  let colorMode: ColorMode = 'light';
  let nameWithoutColorMode = name;

  const isLightMode = name.includes('🌞');
  const isDarkMode = name.includes('🌚');

  if (isLightMode || isDarkMode) {
    colorMode = isLightMode ? 'light' : 'dark';
    const [, ...rest] = name.split('/');
    nameWithoutColorMode = rest.join('-'); //
  } else {
    nameWithoutColorMode = name;
  }

  return {
    colorMode,
    name: nameWithoutColorMode.replace(' ', '-'),
  };
}
