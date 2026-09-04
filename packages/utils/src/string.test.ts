import { camelCase, capitalize, kebabCase, snakeCase, toCssVar, toCssVarFn, wordCase } from './string';

describe('capitalize', () => {
  it('uppercases the first character', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('leaves the rest of the string alone', () => {
    // The return type is Capitalize<T>, which only uppercases the first
    // character. Lowercasing the remainder contradicted that.
    expect(capitalize('helloWorld')).toBe('HelloWorld');
    expect(capitalize('USD')).toBe('USD');
    expect(capitalize('a11yLabel')).toBe('A11yLabel');
  });

  it('is unchanged for an already capitalized string', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('handles the empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('composes with wordCase as before', () => {
    // decamelize already lowercases, so this pairing is unaffected.
    expect(capitalize(wordCase('helloWorld'))).toBe('Hello world');
  });
});

describe('case helpers', () => {
  it('converts to camelCase', () => {
    expect(camelCase('hello_world')).toBe('helloWorld');
  });

  it('converts to kebabCase', () => {
    expect(kebabCase('helloWorld')).toBe('hello-world');
  });

  it('converts to snakeCase', () => {
    expect(snakeCase('helloWorld')).toBe('hello_world');
  });

  it('converts to wordCase', () => {
    expect(wordCase('helloWorld')).toBe('hello world');
  });
});

describe('css var helpers', () => {
  it('builds a custom property name', () => {
    expect(toCssVar('primaryColor')).toBe('--primary-color');
  });

  it('builds a var() reference', () => {
    expect(toCssVarFn('primaryColor')).toBe('var(--primary-color)');
  });
});
