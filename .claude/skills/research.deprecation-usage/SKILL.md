---
name: research.deprecation-usage
description: |
  Audits how often deprecated CDS exports are actively used in customer codebases using Sourcegraph MCP search tools.
  Use this skill whenever asked to assess removal readiness for deprecated CDS APIs, investigate the
  blast radius of removing a deprecated component or hook, check Sourcegraph for customer usage of
  deprecated exports, or help the team decide which deprecated APIs are safe to remove in the next
  major version. Always invoke when asked to "audit deprecated APIs", "check Sourcegraph for deprecated
  usage", "find usages of deprecated exports", "analyze deprecation impact", or any similar request
  involving CDS deprecations and customer adoption.
---

## Objective

Your objective is to provide information to user about the extent to which deprecated members of CDS are used in customer repositories. This information should be as accurate as possible as it will be used to inform decisions on whether or not it is safe to drop certain exports in a release or hold them for the next major version.

Follow the

## 1 - Determining Research Scope

You may be asked to investigate a single, specific deprecation or all CDS deprecations in general.

If you need to perform a comprehensive audit, there is one additional preparation step:

```bash
yarn node scripts/findDeprecations.mjs --json
```

This script extracts the deprecations with metadata from all CDS packages in JSON format.

### 2 - Determining the Type of Deprecation

There are two common categories of deprecations in CDS packages:

1. A single prop of a React component
2. A whole React component, function or constant

If you are researching a single deprecation, find it in this monorepo's source code (DO NOT USE SOURCEGRAPH). It will be marked with the jsdoc `@deprecated` annotation. Inspect the code around the deprecation to determine which of the two categories it falls into. If the deprecation is found in multiple CDS packages you may ask the user to clarify which package is of interest to them.

If you are performing a comprehensive audit for all CDS deprecations, the output of the script you ran in Step 1 will have already classified the deprecaations for you.

## 3 - Using Sourcegraph

For every deprecation you must research, perform a search on Sourcegraph to find evidence of usage.

**IMPORTANT:** Only attempt to search for one deprecation at a time.

**IMPORTANT:** Do not attempt to search if you do not have the information to

You must perform a `keyword search` using the Sourcegraph MCP server. For the `query` parameter you must use the EXACT queries I share below, substituing in the name(s) of the deprecation you are investigating.

### Components, Functions, Constants

Replace `NAME_HERE` with the name of the deprecated component/function/constant

```
NOT repo:frontend/cds(-(internal|public|next))?$ file:..(t|j)sx?$ /import[^;'"]*?\bNAME_HERE\b[^;'"]*?from\s+['"][^'"]*(?:cds-web|cds-mobile)[^'"]*['"]/
```

### React prop

Replace `NAME_HERE` with the name of the React component and `PROP_HERE` with the name of the deprecated prop.

```
NOT repo:frontend/cds(-(internal|public|next))?$ file:..(t|j)sx?$ /<\\s*NAME_HERE\\b[^>]*?\\s+PROP_HERE[\\s=\/>]/
```

## 4 - Structured Output

Your output will depend on the number of deprecations you needed to audit:

### Single Deprecation Output

State the total number of usages found and output a markdown table with columns: Repo, Hits, Search Link — where each link uses a full Sourcegraph URL that will take the user directly to the relevant regex search for the deprecation, filtered by the repo represented in the row of the table.

### How to build per-repo Sourcegraph search

For the following sourcegraph search:

```
/<\\s*CellMedia\\b[^>]*\\stitle[\\s=\\/>]/ NOT repo:frontend/cds(-(internal|public|next))?$ file:\\.(t|j)sx?$
```

Here is an example for repo coinbase.ghe.com/payments/onramp-widget:

`https://sourcegraph.cbhq.net/search?q=NOT+repo%3Afrontend%2Fcds%28-%28internal%7Cpublic%7Cnext%29%29%3F%24+file%3A..%28t%7Cj%29sx%3F%24+%3C%5Cs*CellMedia%5Cb%5B%5E%3E%5D*%3F%5Cs%2Btitle%5B%5Cs%3D%2F%3E%5D&patternType=regexp&sm=0&__cc=1&df=%5B%22repo%22%2C%22coinbase.ghe.com%2Fpayments%2Fonramp-widget%22%2C%22repo%3A%5Ecoinbase%5C%5C.ghe%5C%5C.com%2Fpayments%2Fonramp-widget%24%22%5D`

### Multiple Deprecations Output

When you have analyzed more than one deprecation, simply list out every deprecation and the total number of matches that came back from its sourcegraph query.
