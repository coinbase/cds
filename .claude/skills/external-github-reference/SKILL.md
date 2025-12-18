---
name: external-github-reference
description: Use this skill when you need to clone or update an open source repository and cache it locally for context.
---

For varioius research-intensive tasks, it can be helpful to go straight to the source (i.e. the source code).

Open source repositories that have been researched are cached in the `temp/repo-cache` folder for future context.

To check if a repository has already been cloned:

```bash
ls temp/repo-cache | grep {{REPO NAME}}
```

When the repository has already been cloned, update it to the latest commit:

```bash
cd temp/repo-cache/{{REPO NAME}} && git pull --quiet
```

Clone the respository if it is not already cached:

```bash
git clone --depth 1 {{REPO URL}} temp/repo-cache/{{REPO NAME}} --quiet
```
