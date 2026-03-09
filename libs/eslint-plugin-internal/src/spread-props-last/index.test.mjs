import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from './index.mjs';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

describe("'spread-props-last' rule", () => {
  ruleTester.run('spread-props-last', rule, {
    valid: [
      {
        code: `
          const Component = (props) => (
            <RenderedTab
              data-rendered-tab
              className="className"
              tabIndex={0}
              {...props}
            />
          );
        `,
        filename: 'valid-props-last.tsx',
      },
      {
        code: `
          const Component = () => {
            const animationProps = { animate: { opacity: 1 } };
            return <Button {...animationProps} testID="foo" />;
          };
        `,
        filename: 'valid-non-component-props-spread.tsx',
      },
      {
        code: `
          const Component = ({ role }) => {
            const roleBasedA11yProps =
              role === 'radiogroup'
                ? { 'aria-checked': true }
                : { 'aria-selected': true };

            return <Pressable {...roleBasedA11yProps} background="transparent" />;
          };
        `,
        filename: 'valid-local-helper-spread.tsx',
      },
      {
        code: `
          const Component = ({ tabs }) => {
            const getChildren = ({ label, ...props }) => {
              return <TabLabel active={props.id === 'tab-1'} {...props} variant="primary">{label}</TabLabel>;
            };

            return tabs.map(getChildren);
          };
        `,
        filename: 'valid-inner-callback-rest-props.tsx',
      },
      {
        code: `
          const Component = ({ size, strokeWidth }) => (
            <circle
              {...getProgressCircleParams({ size, strokeWidth })}
              className="circle"
            />
          );
        `,
        filename: 'valid-function-call-spread.tsx',
      },
      {
        code: `
          const Component = () => <Button variant="primary" disabled />;
        `,
        filename: 'valid-no-spread.tsx',
      },
    ],
    invalid: [
      {
        code: `
          const Component = (props) => (
            <RenderedTab
              {...props}
              data-rendered-tab
              className="className"
            />
          );
        `,
        output: `
          const Component = (props) => (
            <RenderedTab
              data-rendered-tab
              className="className"
              {...props}
            />
          );
        `,
        filename: 'invalid-spread-before-named-props.tsx',
        errors: [{ messageId: 'spreadPropsMustBeLast' }],
      },
      {
        code: `
          const Component = ({ testID, ...props }) => (
            <VStack testID={testID} {...props} padding={0} />
          );
        `,
        output: `
          const Component = ({ testID, ...props }) => (
            <VStack testID={testID} padding={0} {...props} />
          );
        `,
        filename: 'invalid-destructured-rest-props.tsx',
        errors: [{ messageId: 'spreadPropsMustBeLast' }],
      },
      {
        code: `
          const Component = (props) => {
            const tabs = ['a'];
            return tabs.map((tab) => <Button key={tab} {...props} disabled />);
          };
        `,
        output: `
          const Component = (props) => {
            const tabs = ['a'];
            return tabs.map((tab) => <Button key={tab} disabled {...props} />);
          };
        `,
        filename: 'invalid-outer-component-props-in-callback.tsx',
        errors: [{ messageId: 'spreadPropsMustBeLast' }],
      },
      {
        code: `
          const TabNavigationComponent = memo(
            forwardRef(({ testID, ...props }, ref) => {
              return <VStack testID={testID} {...props} padding={0} ref={ref} />;
            }),
          );
        `,
        output: `
          const TabNavigationComponent = memo(
            forwardRef(({ testID, ...props }, ref) => {
              return <VStack testID={testID} padding={0} ref={ref} {...props} />;
            }),
          );
        `,
        filename: 'invalid-forward-ref-component-props.tsx',
        errors: [{ messageId: 'spreadPropsMustBeLast' }],
      },
    ],
  });
});
