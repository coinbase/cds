# @coinbase/eslint-plugin-cds

## Overview

The CDS ESLint Plugin targets gaps in existing accessibility linting and CDS Best Practices that were identified in our CDS A11y linting rules audit.

The CDS Eslint Plugin is integrated into the internal Coinbase eslint plugin and is utilized in two of its configurations:

- 🌐 React: Used in web repositories. Extends `airbnb/rules/react-a11y` which includes the [`jsx-a11y`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main) plugin.
- 📱 React Native: Used in React Native repositories and includes the `react-native-a11y` plugin.

In both react and react-native configurations there is a gap in the a11y ruleset that cannot target specific CDS components.

🎯 Our goal with the `eslint-plugin-cds` package is to create new rules to address these gaps in accessibility and to enforce CDS Best Practices.

## Setup

### EsLint 9 Flat Config

Eslint v9 introduced the modern _[Flat Config](https://eslint.org/docs/latest/use/configure/migration-guide)_ format for configuration files.

```js
// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import cds from '@coinbase/eslint-plugin-cds';

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended, cds.configs.web],
  plugins: {
    '@coinbase/cds': cds,
  },
  files: ['**/*.{ts,tsx}'],
});
```

### Legacy _eslintrc_ Config

In order to use the CDS plugin in legacy `.eslintrc` configuration files, you will need to use the _legacy_ configurations.

```js
// .eslintrc.js
module.exports = {
  plugins: ['@typescript-eslint', '@coinbase/cds'],
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@coinbase/cds/web-legacy'],
};
```

## Development

### Building Locally

To build locally, run

```
yarn nx run eslint-plugin-cds:build
```

### Creating New Rule

To create a new ESLint rule, you can add your rule from the `packages/eslint-plugin-cds/src/rules/` directory.

We have two configs:

- mobile: config containing rules targeting mobile / react-native
- web: config containing rules targeting web / react

After creating a rule, be sure to add it to the appropriate config.

Note: Use [AST Explorer](https://astexplorer.net/) with parser set to `@typescript-eslint/parser` to determine AST node types.

### Testing on Consumer Repos Locally

To test on consumer repos locally, you will need to build your `eslint-plugin-cds` package, add your package to the `package.json` and modify `eslintrc`.

1. Build your local package and pack it.

   ```
   yarn nx run eslint-plugin-cds:build
   cd packages/eslint-plugin-cds
   yarn pack
   ```

2. Add your package as a `devDependency` in the consumer's `package.json`. Use the path in your local directory.
   ```
   "@coinbase/eslint-plugin-cds": "file:../cds/packages/eslint-plugin-cds/package.tgz",
   ```
3. Add the plugin and extend a specific config in the `.eslintrc.js`/`eslint.confg.js` file.

   📝 Note: There are differences between `extends` and `plugins`:
   - `extends`: Allows you to use and build upon an existing set of ESLint rules defined in another configuration. Useful for adhering to standardized coding styles like Airbnb or Google.
     - By using the extends keyword, you're not just making rules available, but you are actively applying a set of predefined rules from another configuration. This means that the rules defined in the extended configurations are automatically enforced in your project, unless explicitly overridden.
   - `plugins`: Introduces new rules or environments to ESLint that extend its core capabilities, tailored for specific frameworks or libraries.
     - When you use plugins, you make a set of additional rules available to your configuration. However, simply including a plugin does not apply those rules. You must explicitly enable the rules provided by the plugin in your configuration file to enforce them in your project. Essentially, plugins expand the rule set that you can choose from, but they don't enforce any rules by default.

4. Run `yarn` in root directory or `workspace`.
5. Run `yarn nx run <target>:lint` or `npx eslint .` in root directory or `workspace`.
   - 💡 Tip: Run `npx eslint . > eslint_output.txt` to be able to see all the output.

## CDS Rules

### ♿ Accessibility Rules

We currently have several additional accessibility rules:

#### 🔍 controlHasAssociatedLabelExtended (Web)

**Rule Description**:

The `controlHasAssociatedLabelExtended` rule checks for the presence of an `accessibilityLabel` or other specific a11yLabel props on designated Web CDS components.

The `accessibilityLabel` is required for components listed under `componentsRequiringAccessibilityLabel`. The rule enforces that these components must have an `accessibilityLabel` attribute unless:

- They contain inner text, or
- They have props spread which might implicitly handle accessibility.

**Targeted Components** This rule specifically targets components such as:

- `Button`
- `Checkbox`
- `InputChip`
- `IconButton`
- `IconCounterButton`
- `Pressable`
- `Switch`
- `TextInput`
- `FeedCard`
- `ProgressBar`
- `Select`
- `NavigationBar`
- `Sidebar`
- `Popover`

**Extended A11y Lint Coverage**:

This rule also checks for other required a11y labels that need to be enforced outside of `accessibilityLabel`.

For components listed under `collapsibleCheckForControlledElementAccessibilityProps`, this rule ensures that `controlledElementAccessibilityProps` are provided to manage their accessibility state dynamically.

**Extended Targeted Components**

- `Collapsible`, `Dropdown`
  - Checks for presence of `controlledElementAccessibilityProps`
- `TextInput`, `SelectStack`
  - Checks for presence of `helperTextErrorIconAccessibilityLabel`
- `DatePicker`
  - Checks for presence of `calendarIconButtonAccessibilityLabel`
- `DatePicker`, `Calendar`, `TabNavigation`
  - Checks for presence of `nextArrowAccessibilityLabel` and `previousArrowAccessibilityLabel`
- `NudgeCard`, `UpsellCard`
  - Checks for presence of `accessibilityLabel` when `onDismissPress` is present
- `SearchInput`
  - Checks for presence of `startIconAccessibilityLabel` and `clearIconAccessibilityLabel`
- `Chip`, `MediaChip`, `ListCell`
  - Checks for presence of `accessibilityLabel` when interactive (`onClick`)
- `Combobox`
  - Checks for presence of `accessibilityLabel` / `accessibilityLabelledBy`
  - Checks for presence of `controlAccessibilityLabel`
  - Checks for presence of `removeSelectedOptionAccessibilityLabel` and `hiddenSelectedOptionsLabel` when `type="multi"`
- `Tray`
  - Checks for presence of `accessibilityLabel` or `accessibilityLabelledBy`
- `Table`
  - Checks for accessible table name via `TableCaption`, `accessibilityLabelledBy`, or `accessibilityLabel`
- `ModalHeader`
  - Checks for presence of `closeAccessibilityLabel`
  - Checks for presence of `backAccessibilityLabel` when `onBackButtonClick` is present
- `SegmentedTabs`
  - Checks for presence of `accessibilityLabel`

#### 🔍 hasValidA11yDescriptorsExtended (mobile)

**Rule Description**:

The `hasValidA11yDescriptorsExtended` rule verifies that mobile CDS components such as buttons and switches have an `accessibilityLabel` or other specific a11yLabel props on designated Mobile CDS components. It does not flag components if:

- They contain inner text that serves as an implicit label.
- They have properties spread that can implicitly provide accessibility attributes.

**Targeted Components** This rule specifically targets components such as:

- `Button`
- `Checkbox`
- `InputChip`
- `IconButton`
- `IconCounterButton`
- `Pressable`
- `Switch`
- `TextInput`
- `FeedCard`
- `StickyFooter`
- `ProgressBar`
- `Select`
- `NavigationBar`
- `Sidebar`
- `Popover`

**Extended A11y Lint Coverage**:

This rule also checks for other required a11y labels that need to be enforced outside of `accessibilityLabel`.

**Extended Targeted Components**

- `Drawer`, `SelectChip`, `Tray`
  - Checks for presence of `handleBarAccessibilityLabel`
- `TextInput`
  - Checks for presence of `helperTextErrorIconAccessibilityLabel`
- `DatePicker`
  - Checks for presence of `calendarIconButtonAccessibilityLabel`
- `NudgeCard`, `UpsellCard`
  - Checks for presence of `accessibilityLabel` when `onDismissPress` is present
- `SearchInput`
  - Checks for presence of `startIconAccessibilityLabel` and `clearIconAccessibilityLabel`
- `Chip`, `MediaChip`, `ListCell`
  - Checks for presence of `accessibilityLabel` when interactive (`onPress`/`onClick`)
- `Combobox`
  - Checks for presence of `accessibilityLabel` / `accessibilityLabelledBy`
  - Checks for presence of `accessibilityHint`
  - Checks for presence of `hiddenSelectedOptionsLabel` when `type="multi"`
- `Tray`
  - Checks for presence of `accessibilityLabel` or `accessibilityLabelledBy`
- `SegmentedTabs`
  - Checks for presence of `accessibilityLabel`

#### 🔍 webChartScrubbingAccessibility (web)

**Rule Description**:

The `webChartScrubbingAccessibility` rule enforces chart accessibility descriptors when web chart scrubbing is enabled (`enableScrubbing`).

**Extended Targeted Components**

- `LineChart`, `BarChart`, `CartesianChart`, `AreaChart`
  - Checks for chart-level accessible naming via `accessibilityLabel` or `aria-labelledby`
  - Checks for scrubber-level labels via either:
    - `getScrubberAccessibilityLabel`, or
    - `<Scrubber accessibilityLabel={...} />` child

#### 🔍 mobileChartScrubbingAccessibility (mobile)

**Rule Description**:

The `mobileChartScrubbingAccessibility` rule enforces chart accessibility descriptors when mobile chart scrubbing is enabled (`enableScrubbing`).

**Extended Targeted Components**

- `LineChart`, `BarChart`, `CartesianChart`, `AreaChart`
  - Checks for chart-level accessible naming via `accessibilityLabel` or `aria-labelledby`
  - Checks for per-point labels via `getScrubberAccessibilityLabel`

#### 🔍 webTooltipInteractiveContent (web)

**Rule Description**:

The `webTooltipInteractiveContent` rule requires `hasInteractiveContent` when tooltip `content` includes interactive elements (for example buttons or links), matching CDS tooltip accessibility guidance.

**Extended Targeted Components**

- `Tooltip`
  - Checks for presence of `hasInteractiveContent` when interactive content is detected in the `content` prop

### Current CDS Best Practices Rules

TBD

## Development

### Building Locally

To build locally, run

```
yarn nx run eslint-plugin-cds:build
```

### Creating New Rule

To create a new ESLint rule, you can add your rule from the `packages/eslint-plugin-cds/src/rules/` directory.

We have two configs:

- mobile: config containing rules targeting mobile / react-native
- web: config containing rules targeting web / react

After creating a rule, be sure to add it to the appropriate config.

Note: Use [AST Explorer](https://astexplorer.net/) with parser set to `@typescript-eslint/parser` to determine AST node types.

### Testing on Consumer Repos Locally

To test on consumer repos locally, you will need to build your `eslint-plugin-cds` package, add your package to the `package.json` and modify `eslintrc`.

1. Build your local package and pack it.

   ```
   yarn nx run eslint-plugin-cds:build
   cd packages/eslint-plugin-cds
   yarn pack
   ```

2. Add your package as a `devDependency` in the consumer's `package.json`. Use the path in your local directory.
   ```
   "@coinbase/eslint-plugin-cds": "file:../cds/packages/eslint-plugin-cds/package.tgz",
   ```
3. Add the plugin and extend a specific config in the `.eslintrc.js`/`eslint.confg.js` file.

   📝 Note: There are differences between `extends` and `plugins`:
   - `extends`: Allows you to use and build upon an existing set of ESLint rules defined in another configuration. Useful for adhering to standardized coding styles like Airbnb or Google.
     - By using the extends keyword, you're not just making rules available, but you are actively applying a set of predefined rules from another configuration. This means that the rules defined in the extended configurations are automatically enforced in your project, unless explicitly overridden.
   - `plugins`: Introduces new rules or environments to ESLint that extend its core capabilities, tailored for specific frameworks or libraries.
     - When you use plugins, you make a set of additional rules available to your configuration. However, simply including a plugin does not apply those rules. You must explicitly enable the rules provided by the plugin in your configuration file to enforce them in your project. Essentially, plugins expand the rule set that you can choose from, but they don't enforce any rules by default.

4. Run `yarn` in root directory or `workspace`.
5. Run `yarn nx run <target>:lint` or `npx eslint .` in root directory or `workspace`.
   - 💡 Tip: Run `npx eslint . > eslint_output.txt` to be able to see all the output.
