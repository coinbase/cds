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

To create a new ESLint rule, you can add your rule from the `packages/eslint-plugin-cds/src/rules/` directory.

[This tutorial](https://eslint.org/docs/latest/extend/custom-rule-tutorial) from ESLint provides guidance for writing custom lint rules. The [ESLint Explorer](https://explorer.eslint.org/#eslint-explorer=IntcInN0YXRlXCI6e1widG9vbFwiOlwiYXN0XCIsXCJjb2RlXCI6e1wiamF2YXNjcmlwdFwiOlwiPEJ1dHRvbiBsYWJlbD0nSGVsbG8nIHsuLi5wcm9wc30gLz5cIixcImpzb25cIjpcIi8qKlxcbiAqIFR5cGUgb3IgcGFzdGUgc29tZSBKU09OIGhlcmUgdG8gbGVhcm4gbW9yZSBhYm91dFxcbiAqIHRoZSBzdGF0aWMgYW5hbHlzaXMgdGhhdCBFU0xpbnQgY2FuIGRvIGZvciB5b3UuXFxuICpcXG4gKiBUaGUgdGFicyBhcmU6XFxuICpcXG4gKiAtIEFTVCAtIFRoZSBBYnN0cmFjdCBTeW50YXggVHJlZSBvZiB0aGUgY29kZSwgd2hpY2ggY2FuXFxuICogICBiZSB1c2VmdWwgdG8gdW5kZXJzdGFuZCB0aGUgc3RydWN0dXJlIG9mIHRoZSBjb2RlLiBZb3VcXG4gKiAgIGNhbiB2aWV3IHRoaXMgc3RydWN0dXJlIGFzIEpTT04gb3IgaW4gYSB0cmVlIGZvcm1hdC5cXG4gKlxcbiAqIFlvdSBjYW4gY2hhbmdlIHRoZSB3YXkgdGhhdCB0aGUgSlNPTiBjb2RlIGlzIGludGVycHJldGVkXFxuICogYnkgY2xpY2tpbmcgXFxcIkpTT05cXFwiIGluIHRoZSBoZWFkZXIgYW5kIHNlbGVjdGluZyBkaWZmZXJlbnRcXG4gKiBvcHRpb25zLlxcbiAqXFxuICogVGhpcyBleGFtcGxlIGlzIGluIEpTT05DIG1vZGUsIHdoaWNoIGFsbG93cyBjb21tZW50cy5cXG4gKi9cXG5cXG57XFxuICAgIFxcXCJrZXkxXFxcIjogW3RydWUsIGZhbHNlLCBudWxsXSxcXG4gICAgXFxcImtleTJcXFwiOiB7XFxuICAgICAgICBcXFwia2V5M1xcXCI6IFsxLCAyLCBcXFwiM1xcXCIsIDFlMTAsIDFlLTNdXFxuICAgIH1cXG59XCIsXCJtYXJrZG93blwiOlwiPCEtLVxcblR5cGUgb3IgcGFzdGUgc29tZSBNYXJrZG93biBoZXJlIHRvIGxlYXJuIG1vcmUgYWJvdXRcXG50aGUgc3RhdGljIGFuYWx5c2lzIHRoYXQgRVNMaW50IGNhbiBkbyBmb3IgeW91LlxcblxcblRoZSB0YWJzIGFyZTpcXG5cXG4tIEFTVCAtIFRoZSBBYnN0cmFjdCBTeW50YXggVHJlZSBvZiB0aGUgY29kZSwgd2hpY2ggY2FuXFxuYmUgdXNlZnVsIHRvIHVuZGVyc3RhbmQgdGhlIHN0cnVjdHVyZSBvZiB0aGUgY29kZS4gWW91XFxuY2FuIHZpZXcgdGhpcyBzdHJ1Y3R1cmUgYXMgSlNPTiBvciBpbiBhIHRyZWUgZm9ybWF0LlxcblxcbllvdSBjYW4gY2hhbmdlIHRoZSB3YXkgdGhhdCB0aGUgTWFya2Rvd24gY29kZSBpcyBpbnRlcnByZXRlZFxcbmJ5IGNsaWNraW5nIFxcXCJNYXJrZG93blxcXCIgaW4gdGhlIGhlYWRlciBhbmQgc2VsZWN0aW5nIGRpZmZlcmVudFxcbm9wdGlvbnMuXFxuXFxuVGhpcyBleGFtcGxlIGlzIGluIENvbW1vbk1hcmsgbW9kZS5cXG4tLT5cXG5cXG4jIEVTTGludCBNYXJrZG93biBFeGFtcGxlXFxuXFxuVGhpcyBpcyBhbiBleGFtcGxlIG9mIGEgTWFya2Rvd24gZmlsZSB0aGF0IGNhbiBiZSBwYXJzZWRcXG5ieSBFU0xpbnQuIE1hcmtkb3duIGlzIGEgc2ltcGxlIG1hcmt1cCBsYW5ndWFnZSB0aGF0IGlzXFxub2Z0ZW4gdXNlZCBmb3IgZG9jdW1lbnRhdGlvbi5cXG5cXG4jIyBGZWF0dXJlc1xcblxcbi0gTWFrZSB0aGluZ3MgKml0YWxpYyosICoqYm9sZCoqLCBvciBgY29kZWBcXG4tIENyZWF0ZSBbbGlua3NdKGh0dHBzOi8vZXNsaW50Lm9yZylcXG4tIFN1cHBvcnRzIEhUTUwgPHNwYW4gc3R5bGU9XFxcImNvbG9yOiByZWQ7XFxcIj5lbGVtZW50czwvc3Bhbj5cXG4tIExpc3RzXFxuICAtIE5lc3RlZCBsaXN0c1wiLFwiY3NzXCI6XCIvKipcXG4gKiBUeXBlIG9yIHBhc3RlIHNvbWUgQ1NTIGhlcmUgdG8gbGVhcm4gbW9yZSBhYm91dFxcbiAqIHRoZSBzdGF0aWMgYW5hbHlzaXMgdGhhdCBFU0xpbnQgY2FuIGRvIGZvciB5b3UuXFxuICpcXG4gKiBUaGUgdGFicyBhcmU6XFxuICpcXG4gKiAtIEFTVCAtIFRoZSBBYnN0cmFjdCBTeW50YXggVHJlZSBvZiB0aGUgY29kZSwgd2hpY2ggY2FuXFxuICogICBiZSB1c2VmdWwgdG8gdW5kZXJzdGFuZCB0aGUgc3RydWN0dXJlIG9mIHRoZSBjb2RlLiBZb3VcXG4gKiAgIGNhbiB2aWV3IHRoaXMgc3RydWN0dXJlIGFzIEpTT04gb3IgaW4gYSB0cmVlIGZvcm1hdC5cXG4gKlxcbiAqIFlvdSBjYW4gY2hhbmdlIHRoZSB3YXkgdGhhdCB0aGUgQ1NTIGNvZGUgaXMgaW50ZXJwcmV0ZWRcXG4gKiBieSBjbGlja2luZyBcXFwiQ1NTXFxcIiBpbiB0aGUgaGVhZGVyIGFuZCBzZWxlY3RpbmcgZGlmZmVyZW50XFxuICogb3B0aW9ucy5cXG4gKi9cXG5cXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG86d2dodEA0MDA7NzAwJmRpc3BsYXk9c3dhcCcpO1xcblxcbmJvZHkge1xcblxcdGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbn1cXG5cXG5oMSB7XFxuXFx0Y29sb3I6ICMzMzM7XFxufVxcblxcbnAge1xcblxcdG1hcmdpbjogMWVtIDA7XFxufVwiLFwiaHRtbFwiOlwiPCFET0NUWVBFIGh0bWw%2BXFxuPCEtLVxcblR5cGUgb3IgcGFzdGUgc29tZSBIVE1MIGhlcmUgdG8gbGVhcm4gbW9yZSBhYm91dFxcbnRoZSBzdGF0aWMgYW5hbHlzaXMgdGhhdCBFU0xpbnQgY2FuIGRvIGZvciB5b3UuXFxuXFxuVGhlIHRhYnMgYXJlOlxcblxcbi0gQVNUIC0gVGhlIEFic3RyYWN0IFN5bnRheCBUcmVlIG9mIHRoZSBjb2RlLCB3aGljaCBjYW5cXG5iZSB1c2VmdWwgdG8gdW5kZXJzdGFuZCB0aGUgc3RydWN0dXJlIG9mIHRoZSBjb2RlLiBZb3VcXG5jYW4gdmlldyB0aGlzIHN0cnVjdHVyZSBhcyBKU09OIG9yIGluIGEgdHJlZSBmb3JtYXQuXFxuLS0%2BXFxuXFxuPGh0bWwgbGFuZz1cXFwiZW5cXFwiPlxcbiAgICA8aGVhZD5cXG4gICAgICAgIDxtZXRhIGNoYXJzZXQ9XFxcIlVURi04XFxcIj5cXG4gICAgICAgIDx0aXRsZT5IVE1MPC90aXRsZT5cXG4gICAgPC9oZWFkPlxcbiAgICA8Ym9keT5cXG4gICAgICAgIDxwPlRleHQ8L3A%2BXFxuICAgIDwvYm9keT5cXG48L2h0bWw%2BXCJ9LFwibGFuZ3VhZ2VcIjpcImphdmFzY3JpcHRcIixcImpzT3B0aW9uc1wiOntcInBhcnNlclwiOlwiZXNwcmVlXCIsXCJzb3VyY2VUeXBlXCI6XCJtb2R1bGVcIixcImVzVmVyc2lvblwiOlwibGF0ZXN0XCIsXCJpc0pTWFwiOnRydWV9LFwianNvbk9wdGlvbnNcIjp7XCJqc29uTW9kZVwiOlwianNvbmNcIn0sXCJjc3NPcHRpb25zXCI6e1wiY3NzTW9kZVwiOlwiY3NzXCIsXCJ0b2xlcmFudFwiOmZhbHNlfSxcIm1hcmtkb3duT3B0aW9uc1wiOntcIm1hcmtkb3duTW9kZVwiOlwiY29tbW9ubWFya1wifSxcImh0bWxPcHRpb25zXCI6e1widGVtcGxhdGVFbmdpbmVTeW50YXhcIjpcIm5vbmVcIixcImZyb250bWF0dGVyXCI6ZmFsc2V9LFwid3JhcFwiOnRydWUsXCJ2aWV3TW9kZXNcIjp7XCJhc3RWaWV3XCI6XCJ0cmVlXCIsXCJzY29wZVZpZXdcIjpcImZsYXRcIixcInBhdGhWaWV3XCI6XCJncmFwaFwifSxcInBhdGhJbmRleFwiOntcImluZGV4XCI6MCxcImluZGV4ZXNcIjoxfSxcImVzcXVlcnlTZWxlY3RvclwiOntcInNlbGVjdG9yXCI6XCJcIn19LFwidmVyc2lvblwiOjB9Ig%3D%3D) is useful for investigating the AST tree.

We have two configs:

- `web`: config containing rules targeting web / react
- `mobile`: config containing rules targeting mobile / react-native

After creating a rule, be sure to add it to the appropriate config.

Note: Use [AST Explorer](https://astexplorer.net/) with parser set to `@typescript-eslint/parser` to determine AST node types.

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

## ♿ Accessibility Rules

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
