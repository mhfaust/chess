#!/bin/sh

# UNSTAGED_CHANGES_IN_STAGED_FILES=$(git diff --name-only --cached | xargs git diff --name-only)

# if [ ! -z "$UNSTAGED_CHANGES_IN_STAGED_FILES" ]; then
#     echo "There are unstaged changes in the following staged files:"
#     echo "$UNSTAGED_CHANGES_IN_STAGED_FILES"
#     exit 1

# fi

# if git diff --quiet; then
#   echo "Stashing unstaged changes..."
#   git stash save --keep-index --include-untracked
#   STASH_CREATED=1
# fi

# echo "Formatting staged changes..."
# dprint fmt

# git add .

# if [ "$STASH_CREATED" = 1 ]; then
#   echo "Popped stashed, unstaged changes..."
#   git stash pop
# fi

