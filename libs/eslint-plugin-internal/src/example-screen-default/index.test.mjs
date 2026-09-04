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

describe("'example-screen-default' rule", () => {
  ruleTester.run('example-screen-default', rule, {
    valid: [
      {
        code: `
          const ExampleStories = () => (
            <ExampleScreen>
              <Example title="Banner">
                <Text>Content</Text>
              </Example>
            </ExampleScreen>
          );

          export default ExampleStories;
        `,
        filename: 'Banner.stories.tsx',
      },
      {
        code: `
          export default function ExampleStories() {
            return (
              <ExampleScreen>
                <Example title="Single child">
                  <Text>Inline text</Text>
                </Example>
              </ExampleScreen>
            );
          }
        `,
        filename: 'Inline.stories.tsx',
      },
      {
        code: `
          export default () => (
            <ExampleScreen>
              <Example title="Inline">Content</Example>
            </ExampleScreen>
          );
        `,
        filename: 'InlineDefault.stories.tsx',
      },
    ],
    invalid: [
      {
        code: `
          export default function ExampleStories() {
            return <View />;
          }
        `,
        filename: 'Invalid.stories.tsx',
        errors: [{ messageId: 'defaultExportMustReturnExampleScreen' }],
      },
      {
        code: `
          const ExampleStories = () => (
            <ExampleScreen>
              <Example title="Valid">
                <Text>Content</Text>
              </Example>
            </ExampleScreen>
          );
        `,
        filename: 'MissingDefault.stories.tsx',
        errors: [{ messageId: 'missingDefaultExport' }],
      },
      {
        code: `
          const ExampleStories = ExampleScreen;
          export default ExampleStories;
        `,
        filename: 'NotComponent.stories.tsx',
        errors: [{ messageId: 'defaultExportMustBeComponent' }],
      },
    ],
  });
});
