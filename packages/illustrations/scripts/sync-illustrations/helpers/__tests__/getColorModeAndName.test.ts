import { getColorModeAndName } from '../getColorModeAndName';

describe('getColorModeAndName', () => {
  test('light ui style name', async () => {
    const { colorMode, name } = getColorModeAndName('🌞 light/palette/foreground');
    expect(colorMode).toBe('light');
    expect(name).toBe('palette-foreground');
  });

  test('dark ui style name', async () => {
    const { colorMode, name } = getColorModeAndName('🌚 dark/palette/backgroundAlternate');
    expect(colorMode).toBe('dark');
    expect(name).toBe('palette-backgroundAlternate');
  });

  test('light illustration style name', async () => {
    const { colorMode, name } = getColorModeAndName('🌞 illo/accent 1');
    expect(colorMode).toBe('light');
    expect(name).toBe('accent-1');
  });

  test('dark illustration style name', async () => {
    const { colorMode, name } = getColorModeAndName('🌚 illo/accent 1');
    expect(colorMode).toBe('dark');
    expect(name).toBe('accent-1');
  });
});
