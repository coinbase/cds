import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from './index.mjs';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

describe("'example-screen-contains-example' rule", () => {
  ruleTester.run('example-screen-contains-example', rule, {
    valid: [
      {
        code: `
          const ExampleStories = () => (
            <ExampleScreen>
              <Example title="Stack">
                <Text>Row 1</Text>
              </Example>
            </ExampleScreen>
          );

          export default ExampleStories;
        `,
        filename: 'Valid.stories.tsx',
      },
      {
        code: `
          const StackExample = () => (
            <Example title="Nested">
              <Text>Nested</Text>
            </Example>
          );

          const ExampleStories = () => (
            <ExampleScreen>
              <StackExample />
            </ExampleScreen>
          );

          export default ExampleStories;
        `,
        filename: 'Nested.stories.tsx',
      },
      {
        code: `
          const Wrapper = ({ children }) => <>{children}</>;

          const Inner = () => (
            <>
              <Wrapper>
                <Example title="Deep">
                  <Text>Deep child</Text>
                </Example>
              </Wrapper>
            </>
          );

          const Middle = () => <Inner />;

          export default function ExampleStories() {
            return (
              <ExampleScreen>
                <Middle />
              </ExampleScreen>
            );
          }
        `,
        filename: 'Deep.stories.tsx',
      },
      {
        code: `
          const items = ['a', 'b'];

          export default function ExampleStories() {
            return (
              <ExampleScreen>
                {items.map((item) => (
                  <Example key={item} title={item}>
                    <Text>{item}</Text>
                  </Example>
                ))}
              </ExampleScreen>
            );
          }
        `,
        filename: 'MapValid.stories.tsx',
      },
    ],
    invalid: [
      {
        code: `
          const Inner = () => (
            <Text>No example here</Text>
          );

          const ExampleStories = () => (
            <ExampleScreen>
              <Inner />
            </ExampleScreen>
          );

          export default ExampleStories;
        `,
        filename: 'NestedMissingExample.stories.tsx',
        errors: [{ messageId: 'missingExample' }],
      },
      {
        code: `
          const condition = true;
          const ConditionalExample = () => (condition ? <Text>No example</Text> : <Text>Still none</Text>);

          export default function ExampleStories() {
            return (
              <ExampleScreen>
                <ConditionalExample />
              </ExampleScreen>
            );
          }
        `,
        filename: 'ConditionalMissingExample.stories.tsx',
        errors: [{ messageId: 'missingExample' }],
      },
      {
        code: `
          const items = ['a', 'b'];

          export default function ExampleStories() {
            return (
              <ExampleScreen>
                {items.map((item) => (
                  <Text key={item}>{item}</Text>
                ))}
              </ExampleScreen>
            );
          }
        `,
        filename: 'MapMissingExample.stories.tsx',
        errors: [{ messageId: 'missingExample' }],
      },
    ],
  });
});
