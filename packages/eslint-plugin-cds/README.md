# Overview

The CDS ESLint Plugin targets CDS best practices to ensure components are being used in accordance with our guidelines and remain accessible.

The CDS Eslint Plugin is integrated into the internal Coinbase eslint plugin and is utilized in two of its configurations:

- 🌐 React: Used in web repositories. Extends `airbnb/rules/react-a11y` which includes the [`jsx-a11y`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main) plugin.
- 📱 React Native: Used in React Native repositories and includes the `react-native-a11y` plugin.

# Setup

## EsLint 9 Flat Config

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

## Legacy _eslintrc_ Config

In order to use the CDS plugin in legacy `.eslintrc` configuration files, you will need to use the _legacy_ configurations.

```js
// .eslintrc.js
module.exports = {
  plugins: ['@typescript-eslint', '@coinbase/cds'],
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@coinbase/cds/web-legacy'],
};
```

# Development

## Building Locally

To build locally, run

```
yarn nx run eslint-plugin-cds:build
```

## Creating New Rules

You can scaffold a new rule using the generator script:

```
yarn node packages/eslint-plugin-cds/scripts/scaffold-new-rule.mjs <rule-name>
```

This creates the rule source file and a matching test file with boilerplate already in place.

To create a rule manually, follow the steps below.

### Step-by-step checklist

1. **Create the rule file** in `src/rules/`. Use `src/templates/custom-rule.ts` as a starting point, or copy an existing rule.
2. **Register the rule** by adding an import and entry in `src/rules.ts`.
3. **Add the rule to a config** in `src/configs/`. Choose the config that matches the rule's platform:
   - `web` -- rules targeting web / React codebases
   - `mobile` -- rules targeting mobile / React Native codebases
4. **Write tests** in `tests/`. Each rule should have a corresponding `<rule-name>.test.ts` file using `@typescript-eslint/rule-tester`.
5. **Document the rule** in this README under the appropriate category in the [CDS Rules](#cds-rules) section.
6. **Update the rules summary table** at the top of the [CDS Rules](#cds-rules) section.

### Authoring patterns

There are two patterns for defining a rule:

- **`TSESLint.RuleModule`** -- a plain rule module, good for simple rules (see `no-v7-imports.ts` for an example).
- **`ESLintUtils.RuleCreator`** -- a factory that generates documentation URLs from the rule name. Preferred for rules that benefit from linked documentation (see `control-has-associated-label-extended.ts` for an example).

### Useful resources

- [ESLint custom rule tutorial](https://eslint.org/docs/latest/extend/custom-rule-tutorial)
- [AST Explorer](https://astexplorer.net/) (set parser to `@typescript-eslint/parser`)
- [ESLint Explorer](https://explorer.eslint.org/)

### Available configs

- `web`: rules targeting web / React codebases (includes CDS web rules + `jsx-a11y`)
- `mobile`: rules targeting mobile / React Native codebases (includes CDS mobile rules + `react-native-a11y`)

## Testing on External Repos Locally

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

# CDS Rules

## Rules Overview

| Rule                                                                              | Category      | Platform | Included in Config |
| --------------------------------------------------------------------------------- | ------------- | -------- | ------------------ |
| [`controlHasAssociatedLabelExtended`](#-controlhasassociatedlabelextended-web)    | Accessibility | Web      | `web`              |
| [`hasValidA11yDescriptorsExtended`](#-hasvalida11ydescriptorsextended-mobile)     | Accessibility | Mobile   | `mobile`           |
| [`webChartScrubbingAccessibility`](#-webchartscrubbingaccessibility-web)          | Accessibility | Web      | `web`              |
| [`mobileChartScrubbingAccessibility`](#-mobilechartscrubbingaccessibility-mobile) | Accessibility | Mobile   | `mobile`           |
| [`webTooltipInteractiveContent`](#-webtooltipinteractivecontent-web)              | Accessibility | Web      | `web`              |
| [`noV7Imports`](#-nov7imports-web)                                                | Migration     | Web      | `web`              |

## Accessibility Rules

### 🔍 controlHasAssociatedLabelExtended (Web)

**Rule Description**:

The `controlHasAssociatedLabelExtended` rule checks for the presence of an `accessibilityLabel` or other specific a11yLabel props on designated web CDS components.

The `accessibilityLabel` is required for components listed under `componentsRequiringAccessibilityLabel`. The rule enforces that these components must have an `accessibilityLabel` attribute unless:

- They contain inner text, or
- They have props spread which might implicitly handle accessibility.

### 🔍 hasValidA11yDescriptorsExtended (Mobile)

**Rule Description**:

The `hasValidA11yDescriptorsExtended` rule verifies that mobile CDS components such as buttons and switches have an `accessibilityLabel` or other specific a11yLabel props on designated mobile CDS components. It does not flag components if:

- They contain inner text that serves as an implicit label.
- They have properties spread that can implicitly provide accessibility attributes.

### 🔍 webChartScrubbingAccessibility (web)

**Rule Description**:

The `webChartScrubbingAccessibility` rule enforces chart accessibility descriptors when web chart scrubbing is enabled with the `enableScrubbing` prop.

**Extended Targeted Components**

- `LineChart`, `BarChart`, `CartesianChart`, `AreaChart`
  - Checks for chart-level accessible naming via `accessibilityLabel` or `aria-labelledby`
  - Checks for scrubber-level labels via either:
    - `getScrubberAccessibilityLabel`, or
    - `<Scrubber accessibilityLabel={...} />` child

### 🔍 mobileChartScrubbingAccessibility (mobile)

**Rule Description**:

The `mobileChartScrubbingAccessibility` rule enforces chart accessibility descriptors when mobile chart scrubbing is enabled with the prop `enableScrubbing`.

**Extended Targeted Components**

- `LineChart`, `BarChart`, `CartesianChart`, `AreaChart`
  - Checks for chart-level accessible naming via `accessibilityLabel` or `aria-labelledby`
  - Checks for per-point labels via `getScrubberAccessibilityLabel`

### 🔍 webTooltipInteractiveContent (web)

**Rule Description**:

The `webTooltipInteractiveContent` rule requires `hasInteractiveContent` when tooltip `content` includes interactive elements (for example buttons or links), matching CDS tooltip accessibility guidance.
