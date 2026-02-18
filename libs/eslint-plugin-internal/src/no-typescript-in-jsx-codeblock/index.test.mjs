import { containsTypeScript, findViolations, processor } from './index.mjs';

describe('containsTypeScript', () => {
  describe('detects TypeScript syntax', () => {
    it('detects destructured parameter type annotation', () => {
      expect(containsTypeScript('({ a, b }: Props) => {}')).toBe(true);
    });

    it('detects destructured param with spread and type annotation', () => {
      expect(containsTypeScript('({ ...rest }: SomeType) => {}')).toBe(true);
    });

    it('detects type alias declaration', () => {
      expect(containsTypeScript('type MyProps = { name: string };')).toBe(true);
    });

    it('detects exported type alias', () => {
      expect(containsTypeScript('export type ButtonProps = { label: string };')).toBe(true);
    });

    it('detects interface declaration', () => {
      expect(containsTypeScript('interface FooBar { name: string }')).toBe(true);
    });

    it('detects exported interface', () => {
      expect(containsTypeScript('export interface BarBaz {}')).toBe(true);
    });

    it('detects variable type annotation', () => {
      expect(containsTypeScript('const handler: EventHandler = () => {}')).toBe(true);
    });

    it('detects let type annotation', () => {
      expect(containsTypeScript('let count: Number = 0')).toBe(true);
    });

    it('detects function parameter with primitive type', () => {
      expect(containsTypeScript('function foo(x: number) {}')).toBe(true);
    });

    it('detects parameter with string type', () => {
      expect(containsTypeScript('(name: string) => name')).toBe(true);
    });

    it('detects parameter with boolean type', () => {
      expect(containsTypeScript('(flag: boolean) => flag')).toBe(true);
    });

    it('detects return type annotation before arrow', () => {
      expect(containsTypeScript('(x): ReactNode => <div/>')).toBe(true);
    });

    it('detects return type with primitive before arrow', () => {
      expect(containsTypeScript('(x): string => x.toString()')).toBe(true);
    });

    it('detects generic type argument on hook call', () => {
      expect(containsTypeScript('const ref = useRef<HTMLDivElement>(null)')).toBe(true);
    });

    it('detects generic type argument with primitive', () => {
      expect(containsTypeScript('const [val, setVal] = useState<string>("")')).toBe(true);
    });

    it('detects generic type argument with multiple params', () => {
      expect(containsTypeScript('const map = new Map<Foo, Bar>()')).toBe(true);
    });
  });

  describe('does not flag valid JSX patterns', () => {
    it('allows object literals with capitalized values', () => {
      expect(containsTypeScript('const x = { color: "red", size: 12 }')).toBe(false);
    });

    it('allows JSX with props', () => {
      expect(containsTypeScript('<Button variant="primary">Click</Button>')).toBe(false);
    });

    it('allows ternary expressions', () => {
      expect(containsTypeScript('const x = condition ? valueA : valueB')).toBe(false);
    });

    it('allows regular arrow functions', () => {
      expect(containsTypeScript('const fn = (a, b) => a + b')).toBe(false);
    });

    it('allows destructured parameters without types', () => {
      expect(containsTypeScript('const fn = ({ a, b }) => a + b')).toBe(false);
    });

    it('allows regular function declarations', () => {
      expect(containsTypeScript('function handleClick() { console.log("clicked") }')).toBe(false);
    });

    it('allows object methods', () => {
      expect(containsTypeScript('const obj = { render() { return <div/> } }')).toBe(false);
    });

    it('allows useState and hooks', () => {
      expect(containsTypeScript('const [state, setState] = useState(false)')).toBe(false);
    });

    it('allows array/object spread', () => {
      expect(containsTypeScript('const merged = { ...defaults, ...overrides }')).toBe(false);
    });

    it('allows JSX expressions followed by colon and capitalized text (ModalBody Lorem ipsum)', () => {
      const code = `function ScrollableExample() {
        return (
          <ModalBody>
            <VStack gap={3}>
              {Array.from({ length: 20 }, (_, i) => (
                <Text key={i}>
                  Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              ))}
            </VStack>
          </ModalBody>
        );
      }`;
      expect(containsTypeScript(code)).toBe(false);
    });
  });

  describe('real-world cases from the codebase', () => {
    it('detects props type annotation (DottedAreaProps)', () => {
      const code = `const MyGradient = memo((props: DottedAreaProps) => {
        return <DottedArea {...props} />;
      });`;
      expect(containsTypeScript(code)).toBe(true);
    });

    it('detects destructured params with type (AxisBounds)', () => {
      const code = `stops: ({ min, max }: AxisBounds) => [
        { offset: min, color: negativeColor, opacity: 1 },
      ]`;
      expect(containsTypeScript(code)).toBe(true);
    });

    it('detects const with component type annotation', () => {
      const code = `const BTCTab: TabComponent = memo(
        forwardRef(({ label, ...props }, ref) => {
          return <button ref={ref} {...props}>{label}</button>;
        }),
      );`;
      expect(containsTypeScript(code)).toBe(true);
    });

    it('detects type declaration in code block', () => {
      const code = `type CompactChartProps = {
        data: number[];
        showArea?: boolean;
        color?: string;
        referenceY: number;
      };`;
      expect(containsTypeScript(code)).toBe(true);
    });

    it('detects function param with number type', () => {
      const code = `function handleGoToPage(pageIndex: number) {
        if (carouselRef.current) {
          carouselRef.current.goToPage(pageIndex);
        }
      }`;
      expect(containsTypeScript(code)).toBe(true);
    });

    it('does not flag clean JSX code', () => {
      const code = `function MyComponent() {
        const [count, setCount] = useState(0);
        return (
          <div>
            <p>Count: {count}</p>
            <Button onPress={() => setCount(count + 1)}>Increment</Button>
          </div>
        );
      }`;
      expect(containsTypeScript(code)).toBe(false);
    });
  });
});

describe('findViolations', () => {
  it('returns empty array for MDX with no jsx code blocks', () => {
    const mdx = `# Hello

Some text here.

\`\`\`tsx live
const MyComponent = (props: FooProps) => <div />;
\`\`\`
`;
    expect(findViolations(mdx)).toEqual([]);
  });

  it('returns empty array for jsx code blocks without TypeScript', () => {
    const mdx = `# Hello

\`\`\`jsx live
function MyComponent() {
  return <div>Hello</div>;
}
\`\`\`
`;
    expect(findViolations(mdx)).toEqual([]);
  });

  it('detects a jsx code block with TypeScript syntax', () => {
    const mdx = `# Hello

\`\`\`jsx live
const MyComponent = memo((props: DottedAreaProps) => {
  return <div />;
});
\`\`\`
`;
    const violations = findViolations(mdx);
    expect(violations).toHaveLength(1);
    expect(violations[0].line).toBe(3);
  });

  it('detects multiple violations in a single file', () => {
    const mdx = `# Charts

\`\`\`jsx live
const A = memo((props: FooProps) => <div />);
\`\`\`

Some text.

\`\`\`jsx live
type BarProps = { name: string };
const B = memo(({ name }: BarProps) => <span>{name}</span>);
\`\`\`

\`\`\`jsx live
function C() {
  return <div>No types here</div>;
}
\`\`\`
`;
    const violations = findViolations(mdx);
    expect(violations).toHaveLength(2);
  });

  it('ignores tsx code blocks (correctly tagged)', () => {
    const mdx = `\`\`\`tsx live
const MyComponent = (props: FooProps) => <div />;
\`\`\`
`;
    expect(findViolations(mdx)).toEqual([]);
  });

  it('handles jsx code blocks without the live modifier', () => {
    const mdx = `\`\`\`jsx
type MyType = { value: number };
\`\`\`
`;
    const violations = findViolations(mdx);
    expect(violations).toHaveLength(1);
  });

  it('provides correct line numbers for violations', () => {
    const mdx = `line 1
line 2
line 3
\`\`\`jsx live
const x: MyType = 5;
\`\`\`
`;
    const violations = findViolations(mdx);
    expect(violations).toHaveLength(1);
    expect(violations[0].line).toBe(4);
  });
});

describe('processor', () => {
  it('preprocess returns a dummy JS file', () => {
    const result = processor.preprocess('# Hello\n```jsx\ncode\n```', 'test.mdx');
    expect(result).toHaveLength(1);
    expect(result[0].filename).toBe('0.js');
  });

  it('postprocess returns violations for jsx blocks with TypeScript', () => {
    const mdx = `# Example
\`\`\`jsx live
const MyGradient = memo((props: DottedAreaProps) => {
  return <DottedArea {...props} />;
});
\`\`\`
`;
    processor.preprocess(mdx, 'example.mdx');
    const messages = processor.postprocess([[]], 'example.mdx');

    expect(messages).toHaveLength(1);
    expect(messages[0].ruleId).toBe('internal/no-typescript-in-jsx-codeblock');
    expect(messages[0].severity).toBe(1);
    expect(messages[0].message).toContain('jsx');
    expect(messages[0].message).toContain('TypeScript');
    expect(messages[0].fix).toBeDefined();
    expect(messages[0].fix.text).toBe('tsx');
  });

  it('postprocess returns empty array for clean jsx blocks', () => {
    const mdx = `\`\`\`jsx live
function Hello() { return <div>Hi</div>; }
\`\`\`
`;
    processor.preprocess(mdx, 'clean.mdx');
    const messages = processor.postprocess([[]], 'clean.mdx');
    expect(messages).toHaveLength(0);
  });

  it('supports autofix', () => {
    expect(processor.supportsAutofix).toBe(true);
  });
});
