# cds-code

Helps your agent write idiomatic Coinbase Design System (CDS) code for React or React Native projects. Also supports CDS code review — ask your agent to audit a feature or set of files for CDS adherence.

We recommend also installing the `cds-docs` Skill or the CDS MCP server for even better performance!

```bash
npx skills add https://github.com/coinbase/cds --skill cds-docs
```

## Performance

Evaluated against 10 real-world tasks across two benchmark cohorts: 8 coding/review output-quality tasks and 2 out-of-scope near-misses. The cohorts use different baselines, so their results are reported separately.

### Coding and review output quality (iteration 4, 2026-07-22)

| Metric     | With skill | Without skill | Delta  |
| ---------- | ---------- | ------------- | ------ |
| Pass rate  | **100%**   | 75.0%         | +25.0% |
| Avg time   | 204.4s     | 109.7s        | +94.8s |
| Avg tokens | n/a        | n/a           | n/a    |

Token counts were unavailable from the Cursor eval runner for this iteration.

#### Per-eval breakdown

| Task                                              | With skill | Without skill |
| ------------------------------------------------- | ---------- | ------------- |
| Profile card (Avatar, ListCell, tokens)           | 100%       | 89%           |
| Create team modal (Modal, Select alpha)           | 100%       | 86%           |
| Banner + progress visualizations                  | 100%       | 100%          |
| Sidebar nav (icon names, active state)            | 100%       | 100%          |
| Empty state + illustration sizing                 | 100%       | 40%           |
| React Native wallet screen (CDS mobile)           | 100%       | 83%           |
| Deprecated component trap (TextHeadline/TextBody) | 100%       | 17%           |
| CDS code review (structured lint output)          | 100%       | 86%           |

The biggest gains come from domain-specific knowledge the base model lacks: deprecated API awareness (TextHeadline/TextBody trap), illustration component selection and token hygiene, and structured ESLint-style audit output.

## Running evaluations

Use the `skill-creator` skill to run the evals.

First install the skill-creator skill if it is not already:

```bash
npx skills add https://github.com/anthropics/skills --skill skill-creator
```

Run evals by prompting your agent:

> Use the skill-creator skill to run the evals for the cds-code skill
