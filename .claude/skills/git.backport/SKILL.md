---
name: git.backport
description: Back-port a specific commit from master to a release branch via cherry-pick. Creates a dedicated backport branch, attempts the cherry-pick, and — if there are merge conflicts — diagnoses the root cause without attempting an autonomous resolution. Use when asked to "backport", "cherry-pick to release", or "port a fix to a release branch".
allowed-tools: Bash(git log:*), Bash(git show:*), Bash(git diff:*), Bash(git rev-parse:*), Bash(git cherry-pick:*), Bash(git checkout:*), Bash(git branch:*), Bash(git status:*), Bash(git fetch:*), Bash(git stash:*), Bash(git merge-base:*), Read, Grep, Glob
argument-hint: <commit-sha> <target-branch>
model: opus
---

## Your task

Back-port the commit given in `$ARGUMENTS` to a release branch using `git cherry-pick`. Your arguments are in the format `<commit-sha> <target-branch>`.

Parse `$ARGUMENTS` now: the first token is `COMMIT_SHA`, the second is `TARGET_BRANCH`.

---

## Step 1 — Validate inputs

1. Confirm `COMMIT_SHA` resolves to a real commit:
   ```
   git rev-parse --verify <COMMIT_SHA>^{commit}
   ```
   If it fails, stop and tell the user the SHA could not be resolved.

2. Confirm `TARGET_BRANCH` exists locally or on the remote:
   ```
   git rev-parse --verify <TARGET_BRANCH>
   git rev-parse --verify origin/<TARGET_BRANCH>
   ```
   If neither exists, stop and tell the user.

3. Check the working tree is clean (`git status --porcelain`). If it is not clean, stop and tell the user to stash or commit their in-progress work before proceeding.

---

## Step 2 — Summarize the commit

Show the user a brief summary of what they are about to cherry-pick:

```
git show --stat <COMMIT_SHA>
```

Print:
- The commit subject
- The author and date
- The list of files changed with their stat line

---

## Step 3 — Create the backport branch

Derive a short form of the SHA (first 8 chars). Create a backport branch from `TARGET_BRANCH`:

```
git checkout -b backport/<SHORT_SHA>-to-<TARGET_BRANCH> <TARGET_BRANCH>
```

or, if the branch only exists on the remote:

```
git checkout -b backport/<SHORT_SHA>-to-<TARGET_BRANCH> origin/<TARGET_BRANCH>
```

Tell the user the name of the new branch.

---

## Step 4 — Attempt the cherry-pick

Run:

```
git cherry-pick <COMMIT_SHA>
```

Capture the exit code and stdout/stderr.

### If the cherry-pick succeeds (exit code 0)

Report success:
- Print the new commit SHA (`git rev-parse HEAD`)
- Tell the user the backport branch is ready and that they can push and open a PR when ready

Stop here — do **not** push or open a PR autonomously.

### If the cherry-pick fails (exit code non-zero) — CONFLICT PATH

Immediately abort the cherry-pick to leave the repo in a clean state:

```
git cherry-pick --abort
```

Then proceed to **Step 5**.

---

## Step 5 — Diagnose the conflict (do NOT resolve it)

Your goal here is to explain *why* the conflict happened so the user can resolve it themselves. Do NOT attempt to modify any files or re-run the cherry-pick.

### 5a — Identify what the commit changed

```
git show --name-only <COMMIT_SHA>
```

Collect the list of files the commit touches.

### 5b — Find the merge base between the commit's branch and TARGET_BRANCH

```
git merge-base <COMMIT_SHA> <TARGET_BRANCH>
```

This gives you `MERGE_BASE`.

### 5c — Compare the relevant files across three points in history

For each file that was in the cherry-picked commit:

1. **What the commit changed** (the patch being applied):
   ```
   git show <COMMIT_SHA> -- <file>
   ```

2. **How the file looks on TARGET_BRANCH** (the destination):
   ```
   git show <TARGET_BRANCH>:<file>
   ```
   or `origin/<TARGET_BRANCH>:<file>` if the local branch doesn't exist.

3. **How the file looked at the merge base** (common ancestor):
   ```
   git show <MERGE_BASE>:<file>
   ```

4. **What has diverged on TARGET_BRANCH since the merge base**:
   ```
   git diff <MERGE_BASE>..<TARGET_BRANCH> -- <file>
   ```

### 5d — Reason about the conflict

Using the information gathered, determine the most likely cause from this list and explain it:

| Cause | Signs |
|---|---|
| **Code deleted on TARGET_BRANCH** | The lines the commit modifies no longer exist in the target file |
| **Code moved or refactored** | The lines exist but are in a different function, class, or file |
| **Conflicting parallel change** | TARGET_BRANCH already modified the same lines differently |
| **File renamed or deleted** | The file the commit touches does not exist on TARGET_BRANCH at all |
| **API / import change** | The commit references a symbol that was renamed or removed on the release branch |

### 5e — Report to the user

Write a clear conflict report:

```
## Backport conflict detected

Cherry-pick of <COMMIT_SHA> onto <TARGET_BRANCH> produced conflicts.
The cherry-pick has been aborted — your working tree is clean.

### Conflicting files
<list each file>

### Diagnosis

For each file, explain:
- What the cherry-picked commit was trying to do to this file
- What the current state of this file is on TARGET_BRANCH
- Why those two things conflict (pick the most precise cause from the table above)
- A suggested approach for the user to resolve it manually (e.g., "the function was renamed from X to Y on the release branch — apply the logic change to the renamed function")
```

Be specific. Quote relevant line ranges or symbol names when you can. The user will be doing the resolution manually — give them enough context to know exactly where to look and what to do.

---

## Important rules

- **Never resolve conflicts autonomously.** Your role in the conflict path is diagnosis and explanation only.
- **Never push any branch** unless the user explicitly asks after the cherry-pick succeeds.
- **Never create a PR** unless the user explicitly asks.
- **Always abort a failed cherry-pick** before reporting, so the repo is left clean.
- If the backport branch already exists (rare re-run scenario), tell the user and stop rather than overwriting it.
