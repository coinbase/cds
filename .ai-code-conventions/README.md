This directory contains Code Conventions that will be enforced by the RAID system on pull requests. RAID is a tool that uses artificial intelligence to review PRs.

## How to add a new AI Code Convention

> [!TIP]
> Check out the examples in this directory (prefixed with EXAMPLE-) to see how a properly structured AI code convention looks.

1. Create a new directory inside of `.ai-code-conventions/` with a hyphenated name for your Code Convention.
   1. Run this command inside of `.ai-code-conventions/` (replace `my-new-convention` with actual new convention name)
   2. `mkdir my-new-convention && cd my-new-convention && touch rule.md && touch details.md`
2. Inside of the new directory you'll need a `rule.md` and `details.md` which should be created already if you ran the command above
3. The text content of `details.md` should be a simple description of the code convention and optionally some context/rationale on why we enforce this convention. The text you write in this file is what developers will see written on their PRs if their commits violate the code convention, so think about it from that perspective.
4. The text content of `rule.md` is the text that gets fed into the Large Language (AI) model in order to enforce your code convention. Check out the **Tips for writing new AI Code Convention Rules** section below for how to write your rule effectively.

## Tips for writing new AI Code Convention Rules

- Start by thinking about which files you want your code convention to be enforced on. For example a convention about testing should only run on test files. A convention for a specific library should only run on that library's source code. You can codify these filtering rules using Include and Exclude blocks like in `EXAMPLE-WITH-INCLUDE-EXCLUDE`.

- When writing the convention, imagine you are teaching a really smart college CS major about the convention for the first time. Assume they know a lot about general programming jargon and principles, but that they don't have strong subject matter expertise on specific language or framework quirks. They are great listeners and will follow your directions—but if you leave room for ambiguity or assume they know something that they don't—they are more prone to making mistakes. When it comes to specific intricacies of programming languages, frameworks, etc. it's really important that you educate them on all the necessary context. For example if I wanted to write a code convention that only applies to React Hooks, I first need to explain what a React Hook looks like and how it's different from a plain function or a React Component. Whereas if i'm writing a simple rule asking them to look for typos, I don't need to explain what a typo is!

- If you or one of your teammates reads the rule that you wrote and it would be confusing for a human, then it will also be confusing for the AI. Try to write clearly and with high specificity.

- When possible, avoid explicitly naming something that you don't want the AI to do. Sometimes there is no way around this, but if possible, it's better to tell the AI exactly what you _do_ want rather than explaining all the things you _don't_ want. For example instead of saying "don't use Python" it would be much better to say "only use TypeScript or Golang".

- The more general and ambiguous your code convention is, the more false positives you'll get. More specific is better! Educating the AI about the concept you're asking it to enforce can go a long way in improving performance. For example if I wanted to add a code convention that enforces the use of a common utility function called `useNativeCurrency` instead of directly accessing the `.nativeCurrency` property on a GraphQL query object, it would be smart to explain exactly what a graphql query object looks like, and what it looks like when someone does a direct property check in their code (e.g. it usually looks like `viewer?.userProperties?.nativeCurrency`).

4. Avoid pasting large code snippets into the code convention file (e.g. entire files or code blocks larger than ~30 consecutive lines). Some code snippets are okay, but you should make sure they have english text above them and below them to explain that they're examples and why they're good/bad examples based on the code convention. If you paste in snippets that are too large and don't provide context surrounding them, the AI can sometimes "get confused" and think that the code you're pasting as an example is actually code that you want it to run the code convention check on! `prefer-use-native-currency` and `required-i18n-descriptive-context` are good examples of how pasted code snippets should look in a `rule.md`.

## How to disable an AI Code Convention without deleting it

You can prefix the name of the directory with `EXAMPLE-` and this will prevent it from running on PR checks.

## How to only run a convention on specific files

`EXAMPLE-WITH-INCLUDE-EXCLUDE` demonstrates this. You can write Include and Exclude glob filters above your rule definition to ensure the convention only runs on specific files. `no-zero-default-balances` `prefer-use-native-currency`, `react-dot-memo-wrapper`, and `advanced-trade-currency-semantics` also provide good examples of using the include/exclude filters.
