import { parseVariantName } from '../variantName';

describe('parseVariantName', () => {
  it('turns true and false into booleans and keeps other values as text', () => {
    expect(parseVariantName('size=24, active=false')).toEqual({ size: '24', active: false });
    expect(parseVariantName('state=hover, active=true')).toEqual({ state: 'hover', active: true });
  });

  it('turns the listed properties into numbers when they are whole numbers', () => {
    expect(parseVariantName('size=24, active=true', ['size'])).toEqual({ size: 24, active: true });
    expect(parseVariantName('size=-4', ['size'])).toEqual({ size: -4 });
  });

  it('leaves a listed property as text when it is not a whole number, and others as text', () => {
    expect(parseVariantName('size=large, width=12', ['size'])).toEqual({
      size: 'large',
      width: '12',
    });
    expect(parseVariantName('size=2.5', ['size'])).toEqual({ size: '2.5' });
  });

  it('reads a name with spaces around the equals sign', () => {
    expect(parseVariantName('size = 24 , active = true', ['size'])).toEqual({
      size: 24,
      active: true,
    });
    expect(parseVariantName('size = 24')).toEqual({ size: '24' });
  });

  it('takes everything after the first equals sign as the value', () => {
    expect(parseVariantName('label=a=b')).toEqual({ label: 'a=b' });
  });

  it('reads a name with spaces around the properties', () => {
    expect(parseVariantName('  size=24,   active=true ', ['size'])).toEqual({
      size: 24,
      active: true,
    });
  });

  it('keeps a property without a value as undefined, even when it is listed as numeric', () => {
    expect(parseVariantName('size', ['size'])).toEqual({ size: undefined });
    expect(parseVariantName('size, active=true', ['size'])).toEqual({
      size: undefined,
      active: true,
    });
  });
});
