import { parseComponentName } from '../parseComponentName';

describe('parseComponentName', () => {
  it.each([
    ['Spot Square/baseErrorMedium', 'spotSquare', 'baseErrorMedium'],
    ['Hero Square/leverage', 'heroSquare', 'leverage'],
    ['HeroSquare/instoWeb3MobileSetupStart', 'heroSquare', 'instoWeb3MobileSetupStart'],
    ['SpotIcon/2fa', 'spotIcon', '2fa'],
    [' Spot Square/walletQuestsTrophy', 'spotSquare', 'walletQuestsTrophy'],
  ])('parses %p into type %p and name %p', (figmaName, type, name) => {
    expect(parseComponentName(figmaName)).toEqual({ type, name });
  });

  it('rejects names without a type prefix', () => {
    expect(() => parseComponentName('leverage')).toThrow('not in [type]/[name] format');
  });

  it('rejects names that are not camelCase', () => {
    expect(() => parseComponentName('Pictogram/Base Error')).toThrow('is not camelCase');
    expect(() => parseComponentName('Pictogram/BaseError')).toThrow('is not camelCase');
  });
});
