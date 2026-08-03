/* global afterAll, describe, it */

import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from './index.mjs';

// Set up test framework functions
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 1000,
        allowDefaultProject: ['*.ts*'],
      },
      tsconfigRootDir: __dirname,
    },
  },
});

describe("'safely-spread-props' rule", () => {
  /**
   * Test Suite Overview:
   * This file tests the safely-spread-props rule across different component patterns
   * and scenarios.
   *
   * Each test group includes both valid and invalid examples to verify that:
   * 1. Valid prop spreading (where only props that belong on a component are spread) passes
   * 2. Invalid prop spreading (where props that don't belong on a component are spread) fails
   *
   * The tests follow a consistent pattern:
   * - Two child components (Button and Label) with different prop requirements
   * - A parent component (FormItem) that combines both sets of props
   */
  // Group 1: Testing arrow function components
  ruleTester.run('safely-spread-props - arrow function components', rule, {
    valid: [
      {
        code: `
        // Button component with its own props
        type ButtonProps = {
          onClick?: () => void;
          type?: 'primary' | 'secondary';
        }

        const Button = (props: ButtonProps) => {
          return <button className={props.type}>{props.children}</button>;
        };

        // Label component with different props
        type LabelProps = {
          text: string;
        }

        const Label = (props: LabelProps) => {
          return <label>{props.text}</label>;
        };

        // Parent component combining both prop types
        type FormItemProps = ButtonProps & LabelProps & {
          id: string;
        }

        // Valid: correctly separates props for each child component
        export const FormItem = ({ id, text, ...buttonProps }: FormItemProps) => {
          return (
            <div id={id}>
              <Label text={text} />
              <Button {...buttonProps} />
            </div>
          );
        };
      `,
        filename: 'valid-arrow-function.tsx',
      },
    ],
    invalid: [
      {
        code: `
        // Button component with its own props
        type ButtonProps = {
          onClick?: () => void;
          type?: 'primary' | 'secondary';
        }

        const Button = (props: ButtonProps) => {
          return <button className={props.type}>{props.children}</button>;
        };

        // Label component with different props
        type LabelProps = {
          text: string;
        }

        const Label = (props: LabelProps) => {
          return <label>{props.text}</label>;
        };

        // Parent component combining both prop types
        type FormItemProps = ButtonProps & LabelProps & {
          id: string;
        }

        // Invalid: spreads all props to both components
        export const FormItem = ({ id, ...allProps }: FormItemProps) => {
          return (
            <div id={id}>
              <Label {...allProps} />
              <Button {...allProps} />
            </div>
          );
        };
      `,
        filename: 'invalid-arrow-function.tsx',
        errors: [
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'Label',
              invalidProps: 'onClick, type',
            },
          },
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'Button',
              invalidProps: 'text',
            },
          },
        ],
      },
    ],
  });

  // Group 2: Testing class components
  ruleTester.run('safely-spread-props - class components', rule, {
    valid: [
      {
        code: `
        // Button class component
        type ButtonProps = {
          onClick?: () => void;
          type?: 'primary' | 'secondary';
        }

        class Button extends React.Component<ButtonProps> {
          render() {
              return <button className={this.props.type}>{this.props.children}</button>;
          }
        };

        // Label class component
        type LabelProps = {
          text: string;
        }

        class Label extends React.Component<LabelProps> {
          render() {
              return <label>{this.props.text}</label>;
          }
        };

        // Parent component with combined props
        type FormItemProps = ButtonProps & LabelProps & {
          id: string;
        }

        // Valid: correctly separates props for each child
        export class FormItem extends React.Component<FormItemProps> {
            render() {
              const { id, text, ...buttonProps } = this.props;
              return (
                <div id={id}>
                  <Label text={text} />
                  <Button {...buttonProps} />
                </div>
              );
            }
        };
      `,
        filename: 'valid-class-component.tsx',
      },
    ],
    invalid: [
      {
        code: `
        // Button class component
        type ButtonProps = {
          onClick?: () => void;
          type?: 'primary' | 'secondary';
        }

        class Button extends React.Component<ButtonProps> {
          render() {
              return <button className={this.props.type}>{this.props.children}</button>;
          }
        };

        // Label class component
        type LabelProps = {
          text: string;
        }

        class Label extends React.Component<LabelProps> {
          render() {
              return <label>{this.props.text}</label>;
          }
        };

        // Parent component with combined props
        type FormItemProps = ButtonProps & LabelProps & {
          id: string;
        }

        // Invalid: spreads rest props to Button which includes text
        export class FormItem extends React.Component<FormItemProps> {
            render() {
              const { id, ...restProps } = this.props;
              return (
                <div id={id}>
                  <Label text={restProps.text} />
                  <Button {...restProps} />
                </div>
              );
            }
        };
      `,
        filename: 'invalid-class-component.tsx',
        errors: [
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'Button',
              invalidProps: 'text',
            },
          },
        ],
      },
    ],
  });

  // Group 3: Testing components with interface props
  ruleTester.run('safely-spread-props - interface props', rule, {
    valid: [
      {
        code: `
        // First child component using interface for props
        interface ButtonProps {
          onClick?: () => void;
          variant?: 'primary' | 'secondary';
        }

        function Button(props: ButtonProps) {
          return <button onClick={props.onClick}>{props.children}</button>;
        }

        // Second child component using interface for props
        interface LabelProps {
          text: string;
        }

        function Label(props: LabelProps) {
          return <label>{props.text}</label>;
        }

        // Parent interface extending the child interfaces
        interface FormItemProps extends ButtonProps, LabelProps {
          id: string;
        }

        // Valid: Destructures and passes only relevant props to each child
        export function FormItem({ id, text, ...buttonProps }: FormItemProps) {
          return (
            <div id={id}>
              <Label text={text} />
              <Button {...buttonProps} />
            </div>
          );
        }
      `,
        filename: 'valid-interface.tsx',
      },
    ],
    invalid: [
      {
        code: `
        // First child component using interface for props
        interface ButtonProps {
          onClick?: () => void;
          variant?: 'primary' | 'secondary';
        }

        function Button(props: ButtonProps) {
          return <button onClick={props.onClick}>{props.children}</button>;
        }

        // Second child component using interface for props
        interface LabelProps {
          text: string;
        }

        function Label(props: LabelProps) {
          return <label>{props.text}</label>;
        }

        // Parent interface extending the child interfaces
        interface FormItemProps extends ButtonProps, LabelProps {
          id: string;
        }

        // Invalid: Spreads all props to both components
        export function FormItem({ id, ...allProps }: FormItemProps) {
          return (
            <div id={id}>
              <Label {...allProps} />
              <Button {...allProps} />
            </div>
          );
        }
      `,
        filename: 'invalid-interface.tsx',
        errors: [
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'Label',
              invalidProps: 'onClick, variant',
            },
          },
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'Button',
              invalidProps: 'text',
            },
          },
        ],
      },
    ],
  });

  // Group 4: Testing React FC/FunctionComponent props
  ruleTester.run('safely-spread-props - React.FC props', rule, {
    valid: [
      {
        code: `
        // First child component with FC type
        type ButtonProps = {
          onClick?: () => void;
          variant?: 'primary' | 'secondary';
        };

        const Button: React.FC<ButtonProps> = (props) => {
          return <button onClick={props.onClick}>{props.children}</button>;
        };

        // Second child component with FunctionComponent type
        type LabelProps = {
          text: string;
        };

        const Label: React.FunctionComponent<LabelProps> = (props) => {
          return <label>{props.text}</label>;
        };

        // Parent component that combines both child prop types
        type FormItemProps = ButtonProps & LabelProps & {
          id: string;
        };

        // Valid: correctly separates props for each child
        export const FormItem: React.FC<FormItemProps> = ({ id, text, ...buttonProps }) => {
          return (
            <div id={id}>
              <Label text={text} />
              <Button {...buttonProps} />
            </div>
          );
        };
      `,
        filename: 'valid-fc.tsx',
      },
    ],
    invalid: [
      {
        code: `
        // First child component with FC type
        type ButtonProps = {
          onClick?: () => void;
          variant?: 'primary' | 'secondary';
        };

        const Button: React.FC<ButtonProps> = (props) => {
          return <button onClick={props.onClick}>{props.children}</button>;
        };

        // Second child component with FunctionComponent type
        type LabelProps = {
          text: string;
        };

        const Label: React.FunctionComponent<LabelProps> = (props) => {
          return <label>{props.text}</label>;
        };

        // Parent component that combines both child prop types
        type FormItemProps = ButtonProps & LabelProps & {
          id: string;
        };

        // Invalid: spreads all props to both components
        export const FormItem: React.FC<FormItemProps> = ({ id, ...allProps }) => {
          return (
            <div id={id}>
              <Label {...allProps} />
              <Button {...allProps} />
            </div>
          );
        };
      `,
        filename: 'invalid-fc.tsx',
        errors: [
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'Label',
              invalidProps: 'onClick, variant',
            },
          },
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'Button',
              invalidProps: 'text',
            },
          },
        ],
      },
    ],
  });

  // Group 5: Testing React special props (key, ref, children) handling
  ruleTester.run('safely-spread-props - React special props', rule, {
    valid: [
      {
        code: `
        // First child component with children support
        type ButtonProps = {
          onClick?: () => void;
          variant?: 'primary' | 'secondary';
          children?: React.ReactNode;
        }

        function Button(props: ButtonProps) {
          return <button onClick={props.onClick}>{props.children}</button>;
        }

        // Parent component with special React props
        type FormItemProps = {
          id: string;
          onClick?: () => void;
          variant?: 'primary' | 'secondary';
          children: React.ReactNode;
          key?: string;
          ref?: React.Ref<any>;
        }

        // Valid: explicitly passes only what Button can accept,
        // including children which is a special React prop
        function FormItem({ id, onClick, variant, children }: FormItemProps) {
          return (
            <div id={id}>
              <Button
                onClick={onClick}
                variant={variant}
                children={children}
              />
            </div>
          );
        }
      `,
        filename: 'valid-special-props.tsx',
      },
    ],
    invalid: [
      {
        code: `
        // First child component that accepts specific props only
        type ButtonProps = {
          onClick?: () => void;
          variant?: 'primary' | 'secondary';
        }

        function Button(props: ButtonProps) {
          return <button onClick={props.onClick}>{props.children}</button>;
        }

        // Parent with React special props plus extra props
        type FormItemProps = {
          id: string;
          onClick?: () => void;
          variant?: 'primary' | 'secondary';
          children: React.ReactNode;
          key?: string;
          ref?: React.Ref<any>;
          extraProp: string; // This doesn't belong on Button
        }

        // Invalid: spreads all props including extraProp
        function FormItem(props: FormItemProps) {
          return (
            <div id={props.id}>
              <Button {...props} />
            </div>
          );
        }
      `,
        filename: 'invalid-special-props.tsx',
        errors: [
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'Button',
              invalidProps: 'id, extraProp',
            },
          },
        ],
      },
    ],
  });

  // Group 6: Testing generic components
  ruleTester.run('safely-spread-props - generic components', rule, {
    valid: [
      {
        code: `
        // Generic list component that takes a type parameter
        type ListProps<T> = {
          items: T[];
          renderItem: (item: T) => React.ReactNode;
          keyExtractor: (item: T) => string;
        };

        function List<T>(props: ListProps<T>) {
          return (
            <ul>
              {props.items.map(item => (
                <li key={props.keyExtractor(item)}>
                  {props.renderItem(item)}
                </li>
              ))}
            </ul>
          );
        }

        // Usage with a specific type
        type User = { id: string; name: string };

        // Valid: spreads correctly typed props to the generic component
        function UserList() {
          const users: User[] = [{ id: '1', name: 'Alice' }];

          const listProps: ListProps<User> = {
            items: users,
            renderItem: (user) => <span>{user.name}</span>,
            keyExtractor: (user) => user.id
          };

          return <List<User> {...listProps} />;
        }
      `,
        filename: 'valid-generic-component.tsx',
      },
    ],
    invalid: [
      {
        code: `
        // Generic list component that takes a type parameter
        type ListProps<T> = {
          items: T[];
          renderItem: (item: T) => React.ReactNode;
          keyExtractor: (item: T) => string;
        };

        function List<T>(props: ListProps<T>) {
          return (
            <ul>
              {props.items.map(item => (
                <li key={props.keyExtractor(item)}>
                  {props.renderItem(item)}
                </li>
              ))}
            </ul>
          );
        }

        // Usage with a specific type
        type User = { id: string; name: string };

        // Invalid: spreads object with extra properties not in ListProps
        function UserList() {
          const users: User[] = [{ id: '1', name: 'Alice' }];

          const allProps = {
            items: users,
            renderItem: (user: User) => <span>{user.name}</span>,
            keyExtractor: (user: User) => user.id,
            title: 'User List',  // Not in ListProps
            showHeader: true     // Not in ListProps
          };

          return <List<User> {...allProps} />;
        }
      `,
        filename: 'invalid-generic-component.tsx',
        errors: [
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'List',
              invalidProps: 'title, showHeader',
            },
          },
        ],
      },
    ],
  });

  ruleTester.run('safely-spread-props - polymorphic components', rule, {
    valid: [
      {
        code: `
        type ExtendableProps<BaseProps, OverrideProps> = OverrideProps & Omit<BaseProps, keyof OverrideProps>;

        type PolymorphicProps<AsComponent extends React.ElementType, Props> = ExtendableProps<
          React.ComponentPropsWithoutRef<AsComponent>,
          Props & { as?: AsComponent }
        >;

        type StackBaseProps = {
          gap?: number;
        };

        type StackProps<AsComponent extends React.ElementType = 'div'> = PolymorphicProps<
          AsComponent,
          StackBaseProps
        >;

        const VStack = <AsComponent extends React.ElementType = 'div'>(
          props: StackProps<AsComponent>,
        ) => <div>{props.children}</div>;

        type HeadingProps = {
          className?: string;
          gap?: number;
        };

        function Heading({ ...stackProps }: HeadingProps) {
          return <VStack as="h3" {...stackProps} />;
        }
      `,
        filename: 'valid-polymorphic-class-name.tsx',
      },
      {
        code: `
        type PolymorphicProps<AsComponent extends React.ElementType> =
          React.ComponentPropsWithoutRef<AsComponent> & { as?: AsComponent };

        const VStack = <AsComponent extends React.ElementType = 'div'>(
          props: PolymorphicProps<AsComponent>,
        ) => <div>{props.children}</div>;

        type LinkProps = {
          href: string;
        };

        function Link({ ...linkProps }: LinkProps) {
          return <VStack as={'a'} {...linkProps} />;
        }
      `,
        filename: 'valid-polymorphic-expression-literal.tsx',
      },
      {
        code: `
        type PolymorphicProps<AsComponent extends React.ElementType> =
          React.ComponentPropsWithoutRef<AsComponent> & { as?: AsComponent };

        const VStack = <AsComponent extends React.ElementType = 'div'>(
          props: PolymorphicProps<AsComponent>,
        ) => <div>{props.children}</div>;

        type LinkProps = {
          href: string;
        };

        function Link({ ...linkProps }: LinkProps) {
          const tag: React.ElementType = 'a';
          return <VStack as={tag} {...linkProps} />;
        }
      `,
        filename: 'valid-polymorphic-dynamic-element.tsx',
      },
    ],
    invalid: [
      {
        code: `
        type ExtendableProps<BaseProps, OverrideProps> = OverrideProps & Omit<BaseProps, keyof OverrideProps>;

        type PolymorphicProps<AsComponent extends React.ElementType, Props> = ExtendableProps<
          React.ComponentPropsWithoutRef<AsComponent>,
          Props & { as?: AsComponent }
        >;

        type StackBaseProps = {
          gap?: number;
        };

        type StackProps<AsComponent extends React.ElementType = 'div'> = PolymorphicProps<
          AsComponent,
          StackBaseProps
        >;

        const VStack = <AsComponent extends React.ElementType = 'div'>(
          props: StackProps<AsComponent>,
        ) => <div>{props.children}</div>;

        type HeadingProps = {
          className?: string;
          gap?: number;
          trackingId: string;
        };

        function Heading({ ...stackProps }: HeadingProps) {
          return <VStack as="h3" {...stackProps} />;
        }
      `,
        filename: 'invalid-polymorphic-extra-prop.tsx',
        errors: [
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'VStack',
              invalidProps: 'trackingId',
            },
          },
        ],
      },
    ],
  });

  ruleTester.run('safely-spread-props - higher-order components', rule, {
    valid: [
      {
        code: `
        type ButtonProps = {
          label: string;
          onPress?: () => void;
        };

        function Button(props: ButtonProps) {
          return <button onClick={props.onPress}>{props.label}</button>;
        }

        declare function withStyle<Props>(
          component: (props: Props) => React.ReactNode,
        ): (props: { style?: React.CSSProperties }) => React.ReactNode;

        const styleHoc = withStyle;
        const ButtonAlias = Button;
        const StyledButton = styleHoc(ButtonAlias);
        const StyledButtonAlias = StyledButton;

        type StyledButtonProps = ButtonProps & {
          style?: React.CSSProperties;
        };

        function Example({ ...props }: StyledButtonProps) {
          return <StyledButtonAlias {...props} />;
        }
      `,
        filename: 'valid-arbitrary-hoc-alias.tsx',
      },
      {
        code: `
        type ButtonProps = {
          label: string;
        };

        function Button(props: ButtonProps) {
          return <button>{props.label}</button>;
        }

        declare function withStyle<Props>(
          component: (props: Props) => React.ReactNode,
        ): (props: { style?: React.CSSProperties }) => React.ReactNode;

        declare function withMotion<Props>(
          component: (props: Props) => React.ReactNode,
        ): (props: { motion?: boolean }) => React.ReactNode;

        const EnhancedButton = withStyle(withMotion(Button));

        type EnhancedButtonProps = ButtonProps & {
          style?: React.CSSProperties;
          motion?: boolean;
        };

        function Example({ ...props }: EnhancedButtonProps) {
          return <EnhancedButton {...props} />;
        }
      `,
        filename: 'valid-nested-hocs.tsx',
      },
      {
        code: `
        type ButtonProps = {
          label: string;
        };

        function Button(props: ButtonProps) {
          return <button>{props.label}</button>;
        }

        declare function withStyle<Props>(
          component: (props: Props) => React.ReactNode,
        ): (props: { style?: React.CSSProperties }) => React.ReactNode;

        declare function animated<Props>(
          component: (props: Props) => React.ReactNode,
        ): (props: { style?: React.CSSProperties }) => React.ReactNode;

        const AnimatedButton = animated(Button);

        type AnimatedButtonProps = ButtonProps & {
          style?: React.CSSProperties;
        };

        function Example({ ...props }: AnimatedButtonProps) {
          return <AnimatedButton {...props} />;
        }
      `,
        filename: 'valid-react-spring-style-hoc.tsx',
      },
    ],
    invalid: [
      {
        code: `
        type ButtonProps = {
          label: string;
        };

        function Button(props: ButtonProps) {
          return <button>{props.label}</button>;
        }

        declare function withStyle<Props>(
          component: (props: Props) => React.ReactNode,
        ): (props: { style?: React.CSSProperties }) => React.ReactNode;

        declare function withMotion<Props>(
          component: (props: Props) => React.ReactNode,
        ): (props: { motion?: boolean }) => React.ReactNode;

        const EnhancedButton = withStyle(withMotion(Button));

        type EnhancedButtonProps = ButtonProps & {
          style?: React.CSSProperties;
          motion?: boolean;
          trackingId: string;
        };

        function Example({ ...props }: EnhancedButtonProps) {
          return <EnhancedButton {...props} />;
        }
      `,
        filename: 'invalid-nested-hocs-extra-prop.tsx',
        errors: [
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'EnhancedButton',
              invalidProps: 'trackingId',
            },
          },
        ],
      },
      {
        code: `
        type ButtonProps = {
          buttonOnly: string;
        };

        type PublicProps = {
          publicOnly: string;
        };

        function Button(props: ButtonProps) {
          return <button>{props.buttonOnly}</button>;
        }

        declare function createComponent(
          component: (props: ButtonProps) => React.ReactNode,
        ): (props: PublicProps) => React.ReactNode;

        const PublicComponent = createComponent(Button);

        type ExampleProps = PublicProps & ButtonProps;

        function Example({ ...props }: ExampleProps) {
          return <PublicComponent {...props} />;
        }
      `,
        filename: 'invalid-non-forwarding-component-factory.tsx',
        errors: [
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'PublicComponent',
              invalidProps: 'buttonOnly',
            },
          },
        ],
      },
      {
        code: `
        type ButtonProps = {
          buttonOnly: string;
        };

        type PublicProps = {
          publicOnly: string;
        };

        function Button(props: ButtonProps) {
          return <button>{props.buttonOnly}</button>;
        }

        declare function withStyle<Props>(
          component: (props: Props) => React.ReactNode,
        ): (props: { style?: React.CSSProperties }) => React.ReactNode;

        declare function createComponent(
          component: (props: ButtonProps) => React.ReactNode,
        ): (props: PublicProps) => React.ReactNode;

        function Example({ ...props }: PublicProps & ButtonProps) {
          const withStyle = createComponent;
          const LocalComponent = withStyle(Button);
          return <LocalComponent {...props} />;
        }
      `,
        filename: 'invalid-shadowed-hoc-binding.tsx',
        errors: [
          {
            messageId: 'invalidSpreadPropsWithDetails',
            data: {
              componentName: 'LocalComponent',
              invalidProps: 'buttonOnly',
            },
          },
        ],
      },
    ],
  });
});
