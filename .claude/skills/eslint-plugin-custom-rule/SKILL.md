---
name: eslint-plugin-custom-rule
description: USE THIS when asked to create a new eslint plugin rule for the eslint-plugin-cds package
---

# Writing new rules

## Process

When asked to create a new custom rule for the package, follow these steps in order:

1. Run the scaffold-new-rule.mjs script found at packages/eslint-plugin-cds/scripts/scaffold-new-rule.mjs. The script should be used every time a new rule is created. This script will ensure that the same format is used for all custom rules created.
2. Ask the user what the custom rule should do. If the user doesn't provide enough context in the prompt, ask for clarification or follow up. Do not make assumptions about how a custom rule is meant to behave or what guideline it's supposed to enforce. After gathering the needed context, ask the user which package(s) the rule should be applied to.
3. Once you have all the needed context, ask the user to provide at least one valid and one invalid example demonstrating when the custom rule is being followed or not. This will help you to write tests for the custom rule in a future step. Similar to step 2, if the provided examples do not give you enough context to understand the difference between a valid versus invalid example, ask the user for clarification. Do not proceed until the user has provided at least one valid and one invalid example and you have enough needed context to understand a valid and invalid example.
4. Based on the user's provided context, fill in the rule file generated under the src/rules directory. The main section you should fill out is the create() function key that's in the rule object. You can refer to packages/eslint-plugin-cds/src/rules/custom-rule.ts for more documentation on how custom rules are formatted and information to enter. Custom rules should use the AST visitor methods to determine when rules have been violated and should report warnings in the linter. Custom rules should also verify the packages being imported before performing AST parsing. If a file doesn't import a package specified in step 2, do not report an error in the custom rule. Most custom rules already do this. As an example, you can refer to the ImportDeclaration() function in the no-v7-imports rule found here: packages/eslint-plugin-cds/src/rules/no-v7-imports.ts. The rule only reports an error when one of the CDS_PACKAGES packages is used,
5. Using the context from step 3, write in valid and invalid test cases for the test file generated from the scaffold-new-rule.mjs script. The valid and invalid examples provided in step 3 should be included. Based off those examples and the rule criteria provided in step 2, you can add additional valid or invalid examples.

## Directory placement

Custom rules should always be placed in the packages/eslint-plugin-cds/src/rules directory. Tests for each custom rule should be placed in the packages/eslint-plugin-cds/tests directory.
