import type { Doc } from '../types';

import { formatPropItemType, formatString, getDocExample } from './docgenParser';

describe('formatString', () => {
  it('removes single and double quotes', () => {
    expect(formatString(`"hello" 'world'`)).toBe('hello world');
  });

  it('replaces newlines with spaces', () => {
    expect(formatString('line1\nline2\nline3')).toBe('line1 line2 line3');
  });

  it('removes backticks', () => {
    expect(formatString('`code`')).toBe('code');
  });

  it('handles all transformations together', () => {
    expect(formatString(`"hello"\n'world' \`code\``)).toBe('hello world code');
  });

  it('returns empty string for empty input', () => {
    expect(formatString('')).toBe('');
  });

  it('leaves normal text unchanged', () => {
    expect(formatString('just plain text')).toBe('just plain text');
  });
});

describe('formatPropItemType', () => {
  it('simplifies ReactElement type', () => {
    expect(formatPropItemType('ReactElement<any, string | JSXElementConstructor<any>>')).toBe(
      'ReactElement',
    );
  });

  it('simplifies ReactNode union type', () => {
    expect(
      formatPropItemType(
        'Iterable<ReactNode> | ReactElement<any, string | JSXElementConstructor<any>> | ReactPortal | false | null | number | string | true | {}',
      ),
    ).toBe('ReactNode');
  });

  it('simplifies Animated ViewStyle type', () => {
    expect(
      formatPropItemType(
        'false | RegisteredStyle<ViewStyle> | Value | AnimatedInterpolation | WithAnimatedObject<ViewStyle> | WithAnimatedArray<...> | null',
      ),
    ).toBe('Animated<ViewStyle> | ViewStyle');
  });

  it('passes unrecognized types through formatString', () => {
    expect(formatPropItemType('string')).toBe('string');
    expect(formatPropItemType('number | undefined')).toBe('number | undefined');
  });

  it('cleans quotes and backticks from unrecognized types', () => {
    expect(formatPropItemType(`"primary" | "secondary"`)).toBe('primary | secondary');
  });
});

describe('getDocExample', () => {
  function docWithExample(example?: string): Doc {
    return { tags: example !== undefined ? { example } : undefined } as unknown as Doc;
  }

  it('returns undefined when no tags exist', () => {
    expect(getDocExample({ tags: undefined } as unknown as Doc)).toBeUndefined();
  });

  it('returns undefined when no example tag exists', () => {
    expect(getDocExample(docWithExample(undefined))).toBeUndefined();
  });

  it('wraps plain code examples in tsx live fences', () => {
    const example = '<Button>Click</Button>';
    expect(getDocExample(docWithExample(example))).toBe('```tsx live\n<Button>Click</Button>\n```');
  });

  it('replaces tsx with tsx live in pre-fenced examples', () => {
    const example = '```tsx\n<Button>Click</Button>\n```';
    expect(getDocExample(docWithExample(example))).toBe('```tsx live\n<Button>Click</Button>\n```');
  });
});
